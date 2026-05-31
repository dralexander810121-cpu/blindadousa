import Stripe from 'stripe'
import { createAdmin } from '@/lib/supabase/server'

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

    const email = (session.metadata?.email || session.customer_email || '') as string
    const db = createAdmin()
    let acceso_pagado = false
    let mi_codigo = ''

    if (email) {
      const { data: user } = await db
        .from('usuarios')
        .select('acceso_pagado, mi_codigo')
        .eq('email', email.trim().toLowerCase())
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

