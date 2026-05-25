import { generarCodigo } from '@/lib/stripe'
import { createAdmin } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  try {
    const Stripe = require('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', { apiVersion: '2026-04-22.dahlia' })
    const body = await req.text()
    const sig = (await headers()).get('stripe-signature') || ''
    let event: any
    try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '') }
    catch { return new Response('Bad signature', { status: 400 }) }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const { email, codigo } = session.metadata || {}
      const db = createAdmin()
      const { data: user } = await db.from('usuarios').select('*').eq('email', email).single()
      if (!user) return Response.json({ ok: true })
      const miCodigo = generarCodigo(user.nombre || email)
      await db.from('usuarios').update({ acceso_pagado: true, trial_activo: false, fecha_pago: new Date().toISOString(), precio_pagado: session.amount_total / 100, codigo_usado: codigo || null, mi_codigo: miCodigo, stripe_customer_id: session.customer }).eq('email', email)
      if (codigo && codigo.toUpperCase() !== 'AETHERIS') {
        const { data: ref } = await db.from('usuarios').select('id,referidos_count').eq('mi_codigo', codigo.toUpperCase()).single()
        if (ref) {
          await db.from('usuarios').update({ referidos_count: (ref.referidos_count || 0) + 1 }).eq('id', ref.id)
          await db.from('referidos').insert({ codigo, referidor_id: ref.id, referido_id: user.id, precio_pagado: session.amount_total / 100 })
        }
      }
    }
    return Response.json({ ok: true })
  } catch(e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
export const dynamic = 'force-dynamic'
