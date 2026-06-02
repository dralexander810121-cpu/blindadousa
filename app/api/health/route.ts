import { isPlaidConfigured } from '@/lib/plaid/config'
import { hasLlmKey } from '@/lib/llm'
import { isKlarnaConfigured } from '@/lib/payments/klarna'
import { isLemonSqueezyConfigured } from '@/lib/payments/lemonsqueezy'
import { getPayPalClientId, isPayPalConfigured } from '@/lib/payments/paypal'
import { getPaymentProvider } from '@/lib/payments/provider'

function stripeKeyMode(): 'live' | 'test' | 'missing' | 'unknown' {
  const sk = process.env.STRIPE_SECRET_KEY?.trim() ?? ''
  if (!sk || sk.includes('placeholder')) return 'missing'
  if (sk.startsWith('sk_live_')) return 'live'
  if (sk.startsWith('sk_test_')) return 'test'
  return 'unknown'
}

function stripePublishableMode(): 'live' | 'test' | 'missing' | 'unknown' {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? ''
  if (!pk) return 'missing'
  if (pk.startsWith('pk_live_')) return 'live'
  if (pk.startsWith('pk_test_')) return 'test'
  return 'unknown'
}

function paypalEnvMode(): 'live' | 'sandbox' | 'missing' {
  if (!getPayPalClientId()) return 'missing'
  const mode = (process.env.PAYPAL_MODE || 'live').toLowerCase()
  return mode === 'sandbox' ? 'sandbox' : 'live'
}

/** Estado público de integraciones (sin secretos). */
export async function GET() {
  const stripeSecret = stripeKeyMode()
  const stripePublishable = stripePublishableMode()
  const paypalMode = paypalEnvMode()
  const cardProvider = getPaymentProvider()

  return Response.json({
    ok: true,
    plaid_configured: isPlaidConfigured(),
    plaid_env: process.env.PLAID_ENV?.trim() || 'sandbox',
    plaid_detail: {
      client_id: Boolean(process.env.PLAID_CLIENT_ID?.trim()),
      secret: Boolean(process.env.PLAID_SECRET?.trim()),
      enc_key_64hex: /^[0-9a-fA-F]{64}$/.test((process.env.PLAID_TOKEN_ENCRYPTION_KEY || '').trim()),
    },
    llm_configured: hasLlmKey(),
    supabase_configured: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
    ),
    pagos: {
      paypal: {
        configurado: isPayPalConfigured(),
        modo: paypalMode,
        cobro_real: paypalMode === 'live',
      },
      stripe: {
        configurado: stripeSecret !== 'missing',
        secret_mode: stripeSecret,
        publishable_mode: stripePublishable,
        cobro_real: stripeSecret === 'live' && stripePublishable === 'live',
        usado_como_tarjeta: cardProvider === 'stripe' || Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
      },
      lemonsqueezy: {
        configurado: isLemonSqueezyConfigured(),
        proveedor_tarjeta_por_defecto: cardProvider === 'lemonsqueezy',
      },
      klarna: { configurado: isKlarnaConfigured() },
      metodo_recomendado_en_pagar: isPayPalConfigured()
        ? 'paypal'
        : isKlarnaConfigured()
          ? 'klarna'
          : 'card',
    },
  })
}

export const dynamic = 'force-dynamic'
