import { activateSubscriptionAccess, revokeSubscriptionAccess } from '@/lib/payments/activate-access'
import { createAdmin } from '@/lib/supabase/server'
import { createHmac, timingSafeEqual } from 'crypto'

function verifyKlarnaSignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.KLARNA_WEBHOOK_SECRET?.trim()
  if (!secret) {
    console.warn('[Klarna] KLARNA_WEBHOOK_SECRET no configurado — rechazando webhook')
    return false
  }
  if (!signatureHeader) return false
  try {
    const expected = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
    const received = Buffer.from(signatureHeader, 'hex')
    const expectedBuf = Buffer.from(expected, 'hex')
    if (received.length !== expectedBuf.length) return false
    return timingSafeEqual(received, expectedBuf)
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const sig = req.headers.get('klarna-signature') ?? req.headers.get('x-klarna-signature')

    if (!verifyKlarnaSignature(rawBody, sig)) {
      console.warn('[Klarna] Firma invalida — webhook rechazado')
      return Response.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody) as {
      event_type: string
      order_id?: string
      subscription_id?: string
      customer?: { email?: string }
      metadata?: Record<string, string>
    }

    const db = createAdmin()
    const eventType = event.event_type

    if (eventType === 'ORDER_COMPLETED' || eventType === 'SUBSCRIPTION_ACTIVATED') {
      const email = event.customer?.email?.trim().toLowerCase()
      if (!email) return Response.json({ ok: true })

      const meta = event.metadata || {}
      await activateSubscriptionAccess(db, {
        email,
        plan: (meta.plan === 'anual' ? 'anual' : 'mensual'),
        codigo: meta.codigo || null,
        descuento: meta.descuento === 'si',
        externalSubscriptionId: event.subscription_id || event.order_id || null,
        externalCustomerId: email,
        paymentProvider: 'klarna',
      })
    }

    if (
      eventType === 'SUBSCRIPTION_CANCELLED' ||
      eventType === 'SUBSCRIPTION_SUSPENDED' ||
      eventType === 'ORDER_EXPIRED'
    ) {
      const subId = event.subscription_id || event.order_id
      if (subId) await revokeSubscriptionAccess(db, subId)
    }

    return Response.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Webhook Klarna error'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
