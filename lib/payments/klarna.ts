import type { CheckoutPlan } from '@/lib/stripe'
import { checkoutAmountCents } from '@/lib/stripe'

function klarnaBase() {
  const region = (process.env.KLARNA_REGION || 'na').toLowerCase()
  if (region === 'eu') return 'https://api.klarna.com'
  return 'https://api-na.klarna.com'
}

function klarnaAuthHeader() {
  const user = process.env.KLARNA_USERNAME?.trim()
  const pass = process.env.KLARNA_PASSWORD?.trim()
  if (!user || !pass || user.includes('placeholder')) return null
  return `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`
}

export function isKlarnaConfigured(): boolean {
  return Boolean(klarnaAuthHeader())
}

export function klarnaAmountCents(plan: CheckoutPlan, descuento: boolean) {
  return checkoutAmountCents(plan, descuento)
}

export async function createKlarnaSession(input: {
  email: string
  plan: CheckoutPlan
  codigo?: string
  descuento: boolean
}) {
  const auth = klarnaAuthHeader()
  if (!auth) throw new Error('KLARNA_USERNAME / KLARNA_PASSWORD no configurados en Vercel.')

  const amount = klarnaAmountCents(input.plan, input.descuento)
  const planLabel = input.plan === 'anual' ? 'Plan anual BlindadoUSA' : 'Plan mensual BlindadoUSA'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'

  const res = await fetch(`${klarnaBase()}/payments/v1/sessions`, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      purchase_country: 'US',
      purchase_currency: 'USD',
      locale: 'es-US',
      order_amount: amount,
      order_tax_amount: 0,
      merchant_reference1: input.email.trim().toLowerCase(),
      merchant_reference2: `${input.plan}|${input.codigo || ''}|${input.descuento ? 'si' : 'no'}`,
      order_lines: [
        {
          type: 'digital',
          name: planLabel,
          quantity: 1,
          unit_price: amount,
          total_amount: amount,
        },
      ],
      merchant_urls: {
        confirmation: `${appUrl}/pagar/exito?provider=klarna`,
        notification: `${appUrl}/api/klarna/webhook`,
      },
    }),
  })

  const data = (await res.json()) as {
    session_id?: string
    client_token?: string
    error_messages?: string[]
  }

  if (!res.ok || !data.client_token) {
    const msg = data.error_messages?.join(', ') || 'No se pudo crear sesión Klarna'
    throw new Error(msg)
  }

  return { clientToken: data.client_token, sessionId: data.session_id! }
}

export async function createKlarnaOrder(authorizationToken: string, sessionId: string) {
  const auth = klarnaAuthHeader()
  if (!auth) throw new Error('Klarna no configurado')

  const res = await fetch(`${klarnaBase()}/payments/v1/authorizations/${authorizationToken}/order`, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_id: sessionId }),
  })

  const data = (await res.json()) as {
    order_id?: string
    fraud_status?: string
    error_messages?: string[]
  }

  if (!res.ok || !data.order_id) {
    throw new Error(data.error_messages?.join(', ') || 'Klarna rechazó el pago')
  }

  return data
}

export function parseKlarnaReferences(email: string, ref2: string) {
  const [planRaw, codigo, descuentoRaw] = ref2.split('|')
  const plan: CheckoutPlan = planRaw === 'anual' ? 'anual' : 'mensual'
  return {
    email: email.trim().toLowerCase(),
    plan,
    codigo: codigo || '',
    descuento: descuentoRaw === 'si',
  }
}
