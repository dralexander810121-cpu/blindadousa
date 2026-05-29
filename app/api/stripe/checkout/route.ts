import {
  CODIGO_FIJO,
  checkoutAmountCents,
  type CheckoutPlan,
} from '@/lib/stripe'
import { MODULE_COUNT_LABEL } from '@/lib/productCatalog'
import { createAdmin } from '@/lib/supabase/server'

function parsePlan(raw: unknown): CheckoutPlan {
  return raw === 'anual' ? 'anual' : 'mensual'
}

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey || secretKey.includes('placeholder')) {
      return Response.json(
        { error: 'Stripe no está configurado en producción. Falta STRIPE_SECRET_KEY real en Vercel.' },
        { status: 503 },
      )
    }
    const Stripe = require('stripe')
    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const { email, codigo, plan: planRaw } = await req.json()
    const plan = parsePlan(planRaw)
    const db = createAdmin()
    let esValido = false

    if (codigo?.toUpperCase() === CODIGO_FIJO) {
      esValido = true
    } else if (codigo) {
      const { data } = await db
        .from('usuarios')
        .select('id')
        .eq('mi_codigo', codigo.toUpperCase())
        .single()
      esValido = !!data
    }

    const unitAmount = checkoutAmountCents(plan, esValido)
    const interval = plan === 'anual' ? 'year' : 'month'
    const planLabel = plan === 'anual' ? 'Plan anual' : 'Plan mensual'
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            recurring: { interval },
            product_data: {
              name: `BlindadoUSA — ${planLabel}`,
              description: `${MODULE_COUNT_LABEL}. Suscripción en español para hispanos en USA. Renovable automáticamente.`,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          email: email || '',
          plan,
          codigo: codigo || '',
        },
      },
      metadata: {
        email: email || '',
        plan,
        codigo: codigo || '',
        descuento: esValido ? 'si' : 'no',
      },
      success_url: `${appUrl}/pagar/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pagar?plan=${plan}`,
    })
    return Response.json({ url: session.url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al crear checkout'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
