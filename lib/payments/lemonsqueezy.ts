import { CODIGO_FIJO, type CheckoutPlan } from '@/lib/stripe'

const API_BASE = 'https://api.lemonsqueezy.com/v1'

function apiKey() {
  const key = process.env.LEMONSQUEEZY_API_KEY?.trim()
  if (!key || key.includes('placeholder')) return null
  return key
}

function storeId() {
  return process.env.LEMONSQUEEZY_STORE_ID?.trim() || null
}

function variantForPlan(plan: CheckoutPlan, conDescuento: boolean): string | null {
  if (plan === 'anual') {
    if (conDescuento) {
      return (
        process.env.LEMONSQUEEZY_VARIANT_ANUAL_REF?.trim() ||
        process.env.LEMONSQUEEZY_VARIANT_ANUAL?.trim() ||
        null
      )
    }
    return process.env.LEMONSQUEEZY_VARIANT_ANUAL?.trim() || null
  }
  if (conDescuento) {
    return (
      process.env.LEMONSQUEEZY_VARIANT_MENSUAL_REF?.trim() ||
      process.env.LEMONSQUEEZY_VARIANT_MENSUAL?.trim() ||
      null
    )
  }
  return process.env.LEMONSQUEEZY_VARIANT_MENSUAL?.trim() || null
}

export function isLemonSqueezyConfigured(): boolean {
  return Boolean(apiKey() && storeId() && process.env.LEMONSQUEEZY_VARIANT_MENSUAL?.trim())
}

type LemonResponse = {
  data?: {
    id?: string
    attributes?: {
      url?: string
      urls?: { customer_portal?: string; update_payment_method?: string }
      status?: string
      customer_id?: number
      renews_at?: string
      ends_at?: string | null
      total?: number
      first_order_item?: { price?: number }
    }
  }
  errors?: Array<{ detail?: string; title?: string }>
}

async function lemonFetch(path: string, init?: RequestInit): Promise<LemonResponse> {
  const key = apiKey()
  if (!key) throw new Error('LEMONSQUEEZY_API_KEY no configurada')

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${key}`,
      ...(init?.headers || {}),
    },
  })
  const json = (await res.json()) as LemonResponse
  if (!res.ok) {
    const msg = json.errors?.[0]?.detail || json.errors?.[0]?.title || res.statusText
    throw new Error(msg)
  }
  return json
}

export async function createLemonCheckout(input: {
  email: string
  plan: CheckoutPlan
  codigo?: string
  esValido: boolean
}) {
  const store = storeId()
  const variant = variantForPlan(input.plan, input.esValido)
  if (!store || !variant) {
    throw new Error(
      'Faltan LEMONSQUEEZY_STORE_ID o variant IDs (MENSUAL/ANUAL) en Vercel.',
    )
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'
  const normalizedEmail = input.email.trim().toLowerCase()

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_options: { embed: false, media: false, logo: true },
        checkout_data: {
          email: normalizedEmail,
          custom: {
            email: normalizedEmail,
            plan: input.plan,
            codigo: input.codigo || '',
            descuento: input.esValido ? 'si' : 'no',
          },
        },
        product_options: {
          redirect_url: `${appUrl}/pagar/exito?provider=lemonsqueezy`,
        },
      },
      relationships: {
        store: { data: { type: 'stores', id: store } },
        variant: { data: { type: 'variants', id: variant } },
      },
    },
  }

  const json = await lemonFetch('/checkouts', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  const url = json.data?.attributes?.url
  if (!url) throw new Error('Lemon Squeezy no devolvió URL de checkout')
  return { url, checkoutId: json.data?.id }
}

export async function getLemonSubscriptionPortalUrl(subscriptionId: string): Promise<string | null> {
  const json = await lemonFetch(`/subscriptions/${subscriptionId}`)
  return json.data?.attributes?.urls?.customer_portal ?? null
}

export async function getLemonSubscription(subscriptionId: string) {
  const json = await lemonFetch(`/subscriptions/${subscriptionId}`)
  return json.data
}

export function parseLemonCustomData(custom: Record<string, unknown> | undefined) {
  const email = String(custom?.email || '').trim().toLowerCase()
  const plan = custom?.plan === 'anual' ? ('anual' as CheckoutPlan) : ('mensual' as CheckoutPlan)
  const codigo = String(custom?.codigo || '').trim()
  const descuento = custom?.descuento === 'si' || codigo.toUpperCase() === CODIGO_FIJO
  return { email, plan, codigo, descuento }
}
