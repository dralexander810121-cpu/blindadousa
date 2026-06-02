import Stripe from 'stripe'
import { createAdmin } from '@/lib/supabase/server'
import { activateSubscriptionAccess } from '@/lib/payments/activate-access'

export async function GET(req: Request) {
  try {
    const sessionId = new URL(req.url).searchParams.get('session_id')
    if (!sessionId) {
      return Response.json({ error: 'Falta session_id' }, { status: 400 })
    }

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey || secretKey.includes('placeholder')) {
      return Response.json({ error: 'Stripe no configurado' }, { status: 503 })
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return Response.json({ ok: false, pending: true, acceso_pagado: false })
    }

    const metadata = (session.metadata || {}) as Record<string, string>
    const db = createAdmin()

    // Flujo B2B (directorio de negocios): publica el listing aqui mismo, idempotente,
    // sin depender del webhook. NO otorga acceso de usuario.
    if (metadata.tipo === 'directorio_negocio') {
      const subId = session.id
      const { data: existing } = await db
        .from('directorio_negocios')
        .select('id')
        .eq('external_subscription_id', subId)
        .maybeSingle()
      if (!existing) {
        await db.from('directorio_negocios').insert({
          nombre: metadata.nombre || 'Negocio',
          categoria: metadata.categoria || 'otro',
          descripcion: metadata.descripcion || '',
          ciudad: metadata.ciudad || 'Houston',
          estado: 'TX',
          telefono: metadata.telefono || null,
          email: metadata.email || null,
          plan: metadata.plan === 'premium' ? 'premium' : 'basico',
          external_subscription_id: subId,
          verificado: false,
          activo: true,
          featured: metadata.plan === 'premium',
        })
      }
      return Response.json({ ok: true, tipo: 'negocio' })
    }

    const email = (metadata.email || session.customer_email || '').trim().toLowerCase()
    let acceso_pagado = false
    let mi_codigo = ''

    if (email) {
      // Activa el acceso AQUI mismo, sin depender solo del webhook. Idempotente:
      // si el webhook ya lo activo, esto no duplica el pago de referido.
      try {
        await activateSubscriptionAccess(db, {
          email,
          plan: metadata.plan === 'anual' ? 'anual' : 'mensual',
          codigo: metadata.codigo || null,
          descuento: metadata.descuento === 'si',
          precioPagado:
            typeof session.amount_total === 'number' ? session.amount_total / 100 : undefined,
          externalCustomerId: (session.customer as string | null) ?? null,
          externalSubscriptionId:
            ((session.subscription as string) || (session.id as string)) ?? null,
          paymentProvider: 'stripe',
        })
      } catch {
        // Si falla la activacion (DB transitoria), el cliente reintenta en el siguiente poll.
      }

      const { data: user } = await db
        .from('usuarios')
        .select('acceso_pagado, mi_codigo')
        .eq('email', email)
        .maybeSingle()
      acceso_pagado = Boolean(user?.acceso_pagado)
      mi_codigo = user?.mi_codigo || ''
    }

    return Response.json({
      ok: true,
      acceso_pagado,
      mi_codigo,
      email: email || null,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al verificar pago'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

