import { activateSubscriptionAccess, revokeSubscriptionAccess } from '@/lib/payments/activate-access'
import { decodePayPalCustom, getPayPalSubscription, parsePaypalPendingPlan } from '@/lib/payments/paypal'
import { createAdmin } from '@/lib/supabase/server'

async function getPayPalAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!id || !secret) throw new Error('PayPal credentials not configured')
  const base = (process.env.PAYPAL_MODE || 'live') === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json() as { access_token?: string }
  if (!data.access_token) throw new Error('PayPal token fetch failed')
  return data.access_token
}

async function verifyPayPalSignature(req: Request, rawBody: string): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) {
    console.warn('[PayPal] PAYPAL_WEBHOOK_ID no configurado — rechazando webhook')
    return false
  }
  try {
    const token = await getPayPalAccessToken()
    const base = (process.env.PAYPAL_MODE || 'live') === 'sandbox'
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com'
    const verifyRes = await fetch(`${base}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_algo:         req.headers.get('paypal-auth-algo'),
        cert_url:          req.headers.get('paypal-cert-url'),
        transmission_id:   req.headers.get('paypal-transmission-id'),
        transmission_sig:  req.headers.get('paypal-transmission-sig'),
        transmission_time: req.headers.get('paypal-transmission-time'),
        webhook_id:        webhookId,
        webhook_event:     JSON.parse(rawBody),
      }),
    })
    const result = await verifyRes.json() as { verification_status?: string }
    return result.verification_status === 'SUCCESS'
  } catch (e) {
    console.error('[PayPal] Error verificando firma:', e)
    return false
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()

    const isValid = await verifyPayPalSignature(req, rawBody)
    if (!isValid) {
      console.warn('[PayPal] Firma invalida — webhook rechazado')
      return Response.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    const eventType = event.event_type as string
    const resource = event.resource as { id?: string; custom_id?: string; status?: string }
    const eventId = (event.id as string | undefined) || null

    const db = createAdmin()

    // Idempotencia: ignorar eventos ya procesados
    if (eventId) {
      const { data: existing } = await db
        .from('webhook_events')
        .select('id')
        .eq('event_id', eventId)
        .eq('provider', 'paypal')
        .maybeSingle()
      if (existing) return Response.json({ ok: true, skipped: 'already_processed' })
      await db.from('webhook_events').insert({ event_id: eventId, provider: 'paypal', processed_at: new Date().toISOString() })
    }

    if (
      eventType === 'BILLING.SUBSCRIPTION.ACTIVATED' ||
      eventType === 'BILLING.SUBSCRIPTION.RE-ACTIVATED'
    ) {
      const subId = resource.id
      if (!subId) return Response.json({ ok: true })

      const sub = await getPayPalSubscription(subId)
      let parsed = decodePayPalCustom(sub.custom_id)
      if (!parsed && sub.subscriber?.email_address) {
        const email = sub.subscriber.email_address.trim().toLowerCase()
        const { data: row } = await db
          .from('usuarios')
          .select('codigo_usado, stripe_customer_id')
          .eq('email', email)
          .maybeSingle()
        const pendingPlan = parsePaypalPendingPlan(row?.stripe_customer_id)
        parsed = {
          email,
          plan: pendingPlan || 'mensual',
          codigo: row?.codigo_usado || '',
          descuento: false,
        }
      }
      if (parsed) {
        await activateSubscriptionAccess(db, {
          email: parsed.email,
          plan: parsed.plan,
          codigo: parsed.codigo,
          descuento: parsed.descuento,
          externalCustomerId: sub.subscriber?.email_address || null,
          externalSubscriptionId: subId,
          paymentProvider: 'paypal',
        })
      }
    }

    if (
      eventType === 'BILLING.SUBSCRIPTION.CANCELLED' ||
      eventType === 'BILLING.SUBSCRIPTION.SUSPENDED' ||
      eventType === 'BILLING.SUBSCRIPTION.EXPIRED'
    ) {
      const subId = resource.id
      if (subId) await revokeSubscriptionAccess(db, subId)
    }

    return Response.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Webhook PayPal error'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

