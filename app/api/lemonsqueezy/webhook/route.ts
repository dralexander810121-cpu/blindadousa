import crypto from 'crypto'
import { activateSubscriptionAccess, revokeSubscriptionAccess } from '@/lib/payments/activate-access'
import { parseLemonCustomData } from '@/lib/payments/lemonsqueezy'
import { createAdmin } from '@/lib/supabase/server'

const ACTIVE = new Set(['active', 'on_trial', 'paused'])
const REVOKED = new Set(['cancelled', 'expired', 'unpaid', 'past_due'])

export async function POST(req: Request) {
  try {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET?.trim()
    if (!secret || secret.includes('placeholder')) {
      return Response.json({ error: 'Webhook Lemon Squeezy no configurado' }, { status: 503 })
    }

    const rawBody = await req.text()
    const signature = req.headers.get('x-signature') || ''
    const digest = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')

    if (!signature || digest.length !== signature.length) {
      return new Response('Invalid signature', { status: 401 })
    }
    if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
      return new Response('Invalid signature', { status: 401 })
    }

    const event = JSON.parse(rawBody) as {
      meta?: { event_name?: string; custom_data?: Record<string, unknown> }
      data?: {
        id?: string
        attributes?: Record<string, unknown>
      }
    }

    const eventName = event.meta?.event_name || ''
    const attrs = event.data?.attributes || {}
    const eventId = event.data?.id || null

    const db = createAdmin()

    // Idempotencia: ignorar eventos ya procesados
    if (eventId) {
      const { data: existing } = await db
        .from('webhook_events')
        .select('id')
        .eq('event_id', eventId)
        .eq('provider', 'lemonsqueezy')
        .maybeSingle()
      if (existing) return Response.json({ ok: true, skipped: 'already_processed' })
      await db.from('webhook_events').insert({ event_id: eventId, provider: 'lemonsqueezy', processed_at: new Date().toISOString() })
    }

    if (eventName === 'subscription_created' || eventName === 'subscription_payment_success') {
      const custom = {
        ...(event.meta?.custom_data || {}),
        ...((attrs.custom_data as Record<string, unknown>) || {}),
      }
      const { email, plan, codigo, descuento } = parseLemonCustomData(custom)
      if (email) {
        const total = typeof attrs.total === 'number' ? attrs.total / 100 : undefined
        await activateSubscriptionAccess(db, {
          email,
          plan,
          codigo,
          descuento,
          precioPagado: total,
          externalCustomerId: attrs.customer_id ? String(attrs.customer_id) : null,
          externalSubscriptionId: event.data?.id || null,
          paymentProvider: 'lemonsqueezy',
        })
      }
    }

    if (eventName === 'subscription_updated') {
      const subId = event.data?.id
      const status = String(attrs.status || '')
      if (subId && REVOKED.has(status)) {
        await revokeSubscriptionAccess(db, subId)
      } else if (subId && ACTIVE.has(status)) {
        await db.from('usuarios').update({ acceso_pagado: true }).eq('external_subscription_id', subId)
      }
    }

    if (eventName === 'subscription_expired' || eventName === 'subscription_cancelled') {
      const subId = event.data?.id
      if (subId) await revokeSubscriptionAccess(db, subId)
    }

    return Response.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Webhook error'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'


