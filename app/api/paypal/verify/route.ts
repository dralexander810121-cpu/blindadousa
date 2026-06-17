import { activateSubscriptionAccess } from '@/lib/payments/activate-access'
import { decodePayPalCustom, getPayPalSubscription, parsePaypalPendingPlan } from '@/lib/payments/paypal'
import { createAdmin } from '@/lib/supabase/server'

export async function GET(req: Request) {
  try {
    const subscriptionId = new URL(req.url).searchParams.get('subscription_id')
    if (!subscriptionId) {
      return Response.json({ error: 'Falta subscription_id' }, { status: 400 })
    }

    const sub = await getPayPalSubscription(subscriptionId)
    // Solo ACTIVE concede acceso. APPROVAL_PENDING es el estado PREVIO al pago:
    // antes se aceptaba y permitía activar acceso sin haber pagado.
    const active = sub.status === 'ACTIVE'
    if (!active) {
      return Response.json({ ok: false, pending: true, acceso_pagado: false, status: sub.status })
    }

    let parsed = decodePayPalCustom(sub.custom_id)
    if (!parsed && sub.subscriber?.email_address) {
      const email = sub.subscriber.email_address.trim().toLowerCase()
      const db = createAdmin()
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

    if (!parsed) {
      return Response.json({ error: 'No se pudo leer datos de la suscripción' }, { status: 400 })
    }

    const db = createAdmin()
    await activateSubscriptionAccess(db, {
      email: parsed.email,
      plan: parsed.plan,
      codigo: parsed.codigo,
      descuento: parsed.descuento,
      externalCustomerId: sub.subscriber?.email_address || null,
      externalSubscriptionId: subscriptionId,
      paymentProvider: 'paypal',
    })

    const { data: user } = await db
      .from('usuarios')
      .select('acceso_pagado, mi_codigo')
      .eq('email', parsed.email)
      .single()

    return Response.json({
      ok: true,
      acceso_pagado: Boolean(user?.acceso_pagado),
      mi_codigo: user?.mi_codigo || '',
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al verificar PayPal'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
