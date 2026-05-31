import type { CheckoutPlan } from '@/lib/stripe'
import { createLemonCheckout, isLemonSqueezyConfigured } from '@/lib/payments/lemonsqueezy'
import { createPayPalSubscription, getHostedButtonId, getPayPalClientId, isPayPalApiConfigured, isPayPalConfigured, isPayPalHostedConfigured } from '@/lib/payments/paypal'
import { createKlarnaSession, isKlarnaConfigured } from '@/lib/payments/klarna'
import { validateCheckoutUser, validateReferralCode } from '@/lib/payments/checkout-shared'
import { getPaymentProvider } from '@/lib/payments/provider'
import { MODULE_COUNT_LABEL } from '@/lib/productCatalog'
import { checkoutAmountCents } from '@/lib/stripe'

export type CheckoutMethod = 'paypal' | 'klarna' | 'card'

function parsePlan(raw: unknown): CheckoutPlan {
  return raw === 'anual' ? 'anual' : 'mensual'
}

function parseMethod(raw: unknown): CheckoutMethod {
  if (raw === 'paypal' || raw === 'klarna' || raw === 'card') return raw
  return 'paypal'
}

export async function POST(req: Request) {
  try {
    const { email, codigo, plan: planRaw, method: methodRaw } = await req.json()
    const plan = parsePlan(planRaw)
    const method = parseMethod(methodRaw)

    if (!email?.trim()) {
      return Response.json({ error: 'Ingresa tu email.' }, { status: 400 })
    }

    const userCheck = await validateCheckoutUser(email)
    if (!userCheck.ok) {
      return Response.json({ error: userCheck.error }, { status: 400 })
    }

    const esValido = await validateReferralCode(userCheck.db, codigo)

    if (method === 'paypal') {
      if (isPayPalHostedConfigured(plan) && !isPayPalApiConfigured()) {
        return Response.json(
          {
            error: 'Usa el botón de PayPal en esta página.',
            useHostedButton: true,
            hostedButtonId: getHostedButtonId(plan),
          },
          { status: 400 },
        )
      }
      if (!isPayPalApiConfigured()) {
        return Response.json(
          { error: 'PayPal no configurado. Añade credenciales en Vercel.' },
          { status: 503 },
        )
      }
      const checkout = await createPayPalSubscription({
        email: userCheck.email,
        plan,
        codigo,
        esValido,
      })
      return Response.json({ url: checkout.url, provider: 'paypal', subscriptionId: checkout.subscriptionId })
    }

    if (method === 'klarna') {
      if (!isKlarnaConfigured()) {
        return Response.json(
          { error: 'Klarna no configurado. Añade KLARNA_USERNAME y KLARNA_PASSWORD en Vercel.' },
          { status: 503 },
        )
      }
      const session = await createKlarnaSession({
        email: userCheck.email,
        plan,
        codigo,
        descuento: esValido,
      })
      return Response.json({
        provider: 'klarna',
        clientToken: session.clientToken,
        sessionId: session.sessionId,
      })
    }

    const provider = getPaymentProvider()
    if (provider === 'lemonsqueezy' && isLemonSqueezyConfigured()) {
      const checkout = await createLemonCheckout({
        email: userCheck.email,
        plan,
        codigo,
        esValido,
      })
      return Response.json({ url: checkout.url, provider: 'lemonsqueezy' })
    }

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey || secretKey.includes('placeholder')) {
      return Response.json(
        {
          error:
            'Tarjeta no disponible. Usa PayPal o Klarna (pago a plazos), o configura pagos en Vercel.',
        },
        { status: 503 },
      )
    }

    const Stripe = require('stripe')
    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const unitAmount = checkoutAmountCents(plan, esValido)
    const interval = plan === 'anual' ? 'year' : 'month'
    const planLabel = plan === 'anual' ? 'Plan anual' : 'Plan mensual'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: userCheck.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            recurring: { interval },
            product_data: {
              name: `BlindadoUSA — ${planLabel}`,
              description: `${MODULE_COUNT_LABEL}. Educación financiera en español.`,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: { email: userCheck.email, plan, codigo: codigo || '' },
      },
      metadata: {
        email: userCheck.email,
        plan,
        codigo: codigo || '',
        descuento: esValido ? 'si' : 'no',
      },
      success_url: `${appUrl}/pagar/exito?session_id={CHECKOUT_SESSION_ID}&provider=stripe`,
      cancel_url: `${appUrl}/pagar?plan=${plan}`,
    })

    return Response.json({ url: session.url, provider: 'stripe' })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al crear checkout'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export async function GET() {
  const clientId = getPayPalClientId()
  return Response.json({
    methods: {
      paypal: isPayPalConfigured(),
      klarna: isKlarnaConfigured(),
      card: isLemonSqueezyConfigured() || Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
    },
    paypalHosted: clientId
      ? {
          clientId,
          mensual: getHostedButtonId('mensual'),
          anual: getHostedButtonId('anual'),
        }
      : null,
    recommended: isPayPalConfigured() ? 'paypal' : isKlarnaConfigured() ? 'klarna' : 'card',
  })
}

export const dynamic = 'force-dynamic'
