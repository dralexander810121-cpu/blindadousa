import Stripe from 'stripe'
import { checkoutAmountCents, type CheckoutPlan } from '@/lib/stripe'
import { activateSubscriptionAccess } from '@/lib/payments/activate-access'
import { createAdmin } from '@/lib/supabase/server'
import { headers } from 'next/headers'

const REVOKED_SUB_STATUSES = new Set(['canceled', 'unpaid', 'incomplete_expired'])
const ACTIVE_SUB_STATUSES = new Set(['active', 'trialing'])

function precioFromSession(session: {
  amount_total?: number | null
  metadata?: Record<string, string>
}) {
  if (typeof session.amount_total === 'number') return session.amount_total / 100
  const plan = (session.metadata?.plan === 'anual' ? 'anual' : 'mensual') as CheckoutPlan
  const descuento = session.metadata?.descuento === 'si'
  return checkoutAmountCents(plan, descuento) / 100
}

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!secretKey || secretKey.includes('placeholder')) {
      return Response.json(
        { error: 'Falta STRIPE_SECRET_KEY real para validar webhooks.' },
        { status: 503 },
      )
    }
    if (!webhookSecret || webhookSecret.includes('placeholder')) {
      return Response.json(
        { error: 'Falta STRIPE_WEBHOOK_SECRET real para validar webhooks.' },
        { status: 503 },
      )
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const body = await req.text()
    const sig = (await headers()).get('stripe-signature') || ''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let event: any
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch {
      return new Response('Bad signature', { status: 400 })
    }

    const db = createAdmin()

    // Idempotencia: ignorar eventos ya procesados
    const stripeEventId = (event as Record<string,unknown>).id || null
    if (stripeEventId) {
      const { data: existing } = await db
        .from('webhook_events')
        .select('id')
        .eq('event_id', stripeEventId)
        .eq('provider', 'stripe')
        .maybeSingle()
      if (existing) return Response.json({ ok: true, skipped: 'already_processed' })
      await db.from('webhook_events').insert({ event_id: stripeEventId, provider: 'stripe', processed_at: new Date().toISOString() })
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object
      const subId = sub.id as string
      await db.from('usuarios').update({ acceso_pagado: false }).eq('external_subscription_id', subId)
      return Response.json({ ok: true })
    }

    if (event.type === 'customer.subscription.updated') {
      const sub = event.data.object
      const subId = sub.id as string
      const status = String(sub.status || '')
      if (REVOKED_SUB_STATUSES.has(status)) {
        await db.from('usuarios').update({ acceso_pagado: false }).eq('external_subscription_id', subId)
      } else if (ACTIVE_SUB_STATUSES.has(status)) {
        await db.from('usuarios').update({ acceso_pagado: true }).eq('external_subscription_id', subId)
      }
      return Response.json({ ok: true })
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object
      const subId = invoice.subscription as string | undefined
      if (subId) {
        await db.from('usuarios').update({ acceso_pagado: false }).eq('external_subscription_id', subId)
      }
      return Response.json({ ok: true })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const metadata = (session.metadata || {}) as Record<string, string>

      if (metadata.tipo === 'directorio_negocio') {
        await db.from('directorio_negocios').insert({
          nombre: metadata.nombre || 'Negocio',
          categoria: metadata.categoria || 'otro',
          descripcion: metadata.descripcion || '',
          ciudad: metadata.ciudad || 'Houston',
          estado: 'TX',
          telefono: metadata.telefono || null,
          email: metadata.email || null,
          plan: metadata.plan === 'premium' ? 'premium' : 'basico',
          external_subscription_id: session.id as string,
          verificado: false,
          activo: true,
          featured: metadata.plan === 'premium',
        })
        return Response.json({ ok: true })
      }

      const email = (metadata.email || '').trim().toLowerCase()
      if (!email) return Response.json({ ok: true })

      const precioPagado = precioFromSession({
        amount_total: session.amount_total as number | null,
        metadata,
      })
      await activateSubscriptionAccess(db, {
        email,
        plan: (metadata.plan === 'anual' ? 'anual' : 'mensual'),
        codigo: metadata.codigo || null,
        descuento: metadata.descuento === 'si',
        precioPagado,
        externalCustomerId: session.customer as string | null,
        externalSubscriptionId: ((session.subscription as string) || (session.id as string)) ?? null,
        paymentProvider: 'stripe',
      })
    }

    return Response.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Webhook error'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'







