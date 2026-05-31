import type { CheckoutPlan } from '@/lib/stripe'
import { CODIGO_FIJO, checkoutAmountCents } from '@/lib/stripe'

export type PaymentMethod = 'paypal' | 'klarna' | 'card'

function paypalBase() {
  const mode = (process.env.PAYPAL_MODE || 'live').toLowerCase()
  return mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'
}

function paypalConfigured() {
  const id = getPayPalClientId()
  const secret = process.env.PAYPAL_CLIENT_SECRET?.trim()
  return Boolean(id && secret && !id.includes('placeholder'))
}

export function getPayPalClientId(): string | null {
  const pub = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim()
  const priv = process.env.PAYPAL_CLIENT_ID?.trim()
  const id = pub || priv
  if (!id || id.includes('placeholder')) return null
  return id
}

export function getHostedButtonId(plan: CheckoutPlan): string | null {
  const key =
    plan === 'anual'
      ? process.env.PAYPAL_HOSTED_BUTTON_ANUAL?.trim()
      : process.env.PAYPAL_HOSTED_BUTTON_MENSUAL?.trim()
  return key || null
}

export function isPayPalHostedConfigured(plan?: CheckoutPlan): boolean {
  if (!getPayPalClientId()) return false
  if (plan) return Boolean(getHostedButtonId(plan))
  return Boolean(getHostedButtonId('mensual') || getHostedButtonId('anual'))
}

export function isPayPalApiConfigured(): boolean {
  if (!paypalConfigured()) return false
  return Boolean(planId('mensual', false) || planId('anual', false))
}

export function isPayPalConfigured(): boolean {
  return isPayPalHostedConfigured() || isPayPalApiConfigured()
}

export function isPayPalWebhookReady(): boolean {
  return paypalConfigured()
}

async function paypalToken(): Promise<string> {
  const clientId = getPayPalClientId()
  const secret = process.env.PAYPAL_CLIENT_SECRET!
  if (!clientId) throw new Error('PayPal Client ID missing')
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')
  const res = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = (await res.json()) as { access_token?: string; error_description?: string }
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || 'PayPal auth failed')
  }
  return data.access_token
}

async function paypalFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await paypalToken()
  const res = await fetch(`${paypalBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  const data = (await res.json()) as T & { message?: string; details?: Array<{ description?: string }> }
  if (!res.ok) {
    const detail = data.details?.[0]?.description || data.message || res.statusText
    throw new Error(detail)
  }
  return data
}

function planId(plan: CheckoutPlan, conDescuento: boolean): string | null {
  if (plan === 'anual') {
    if (conDescuento) {
      return (
        process.env.PAYPAL_PLAN_ANUAL_REF?.trim() ||
        process.env.PAYPAL_PLAN_ANUAL?.trim() ||
        null
      )
    }
    return process.env.PAYPAL_PLAN_ANUAL?.trim() || null
  }
  if (conDescuento) {
    return (
      process.env.PAYPAL_PLAN_MENSUAL_REF?.trim() ||
      process.env.PAYPAL_PLAN_MENSUAL?.trim() ||
      null
    )
  }
  return process.env.PAYPAL_PLAN_MENSUAL?.trim() || null
}

export function encodePayPalCustom(input: {
  email: string
  plan: CheckoutPlan
  codigo?: string
  descuento: boolean
}) {
  return JSON.stringify({
    email: input.email.trim().toLowerCase(),
    plan: input.plan,
    codigo: input.codigo || '',
    descuento: input.descuento ? 'si' : 'no',
  }).slice(0, 127)
}

export function decodePayPalCustom(raw: string | undefined) {
  if (!raw) return null
  try {
    const j = JSON.parse(raw) as {
      email?: string
      plan?: string
      codigo?: string
      descuento?: string
    }
    const email = String(j.email || '').trim().toLowerCase()
    if (!email) return null
    const plan: CheckoutPlan = j.plan === 'anual' ? 'anual' : 'mensual'
    const codigo = String(j.codigo || '').trim()
    const descuento = j.descuento === 'si' || codigo.toUpperCase() === CODIGO_FIJO
    return { email, plan, codigo, descuento }
  } catch {
    return null
  }
}

export async function createPayPalSubscription(input: {
  email: string
  plan: CheckoutPlan
  codigo?: string
  esValido: boolean
}) {
  const plan_id = planId(input.plan, input.esValido)
  if (!plan_id) {
    throw new Error(
      'Faltan PAYPAL_PLAN_MENSUAL / PAYPAL_PLAN_ANUAL en Vercel. Créalos en developer.paypal.com',
    )
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'
  const custom_id = encodePayPalCustom({
    email: input.email,
    plan: input.plan,
    codigo: input.codigo,
    descuento: input.esValido,
  })

  const json = await paypalFetch<{
    id?: string
    links?: Array<{ rel: string; href: string }>
  }>('/v1/billing/subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      plan_id,
      custom_id,
      subscriber: { email_address: input.email.trim().toLowerCase() },
      application_context: {
        brand_name: 'BlindadoUSA',
        locale: 'es-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        return_url: `${appUrl}/pagar/exito?provider=paypal`,
        cancel_url: `${appUrl}/pagar?plan=${input.plan}`,
      },
    }),
  })

  const approve = json.links?.find((l) => l.rel === 'approve')?.href
  if (!approve || !json.id) throw new Error('PayPal no devolvió URL de aprobación')
  return { url: approve, subscriptionId: json.id }
}

export async function getPayPalSubscription(subscriptionId: string) {
  return paypalFetch<{
    id: string
    status: string
    custom_id?: string
    subscriber?: { email_address?: string }
  }>(`/v1/billing/subscriptions/${subscriptionId}`)
}

export async function getPayPalManageUrl(subscriptionId: string): Promise<string | null> {
  try {
    const sub = await getPayPalSubscription(subscriptionId)
    if (sub.status === 'ACTIVE' || sub.status === 'APPROVED') {
      return `https://www.paypal.com/myaccount/autopay/connect/${subscriptionId}`
    }
  } catch {
    /* fallback */
  }
  return 'https://www.paypal.com/myaccount/autopay/'
}

export function paypalPendingPlanKey(plan: CheckoutPlan) {
  return `paypal_pending:${plan}`
}

export function parsePaypalPendingPlan(stripeCustomerId: string | null | undefined): CheckoutPlan | null {
  const raw = stripeCustomerId?.trim() || ''
  if (raw === 'paypal_pending:anual') return 'anual'
  if (raw === 'paypal_pending:mensual') return 'mensual'
  return null
}
