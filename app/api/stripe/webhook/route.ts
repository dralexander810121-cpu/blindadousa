import { generarCodigo } from '@/lib/stripe'
import { processReferralPayout } from '@/lib/referidos/payout'
import { createAdmin } from '@/lib/supabase/server'
import { headers } from 'next/headers'

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

    const Stripe = require('stripe')
    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const body = await req.text()
    const sig = (await headers()).get('stripe-signature') || ''
    let event: any
    try { event = stripe.webhooks.constructEvent(body, sig, webhookSecret) }
    catch { return new Response('Bad signature', { status: 400 }) }
    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object
      const subId = sub.id as string
      await createAdmin()
        .from('usuarios')
        .update({ acceso_pagado: false })
        .eq('stripe_subscription_id', subId)
      return Response.json({ ok: true })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const metadata = session.metadata || {}
      const db = createAdmin()

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
          stripe_subscription_id: session.id,
          verificado: false,
          activo: true,
          featured: metadata.plan === 'premium',
        })
        return Response.json({ ok: true })
      }

      const { email, codigo } = metadata
      const { data: user } = await db.from('usuarios').select('*').eq('email', email).single()
      if (!user) return Response.json({ ok: true })
      const miCodigo = generarCodigo(user.nombre || email)
      const precioPagado =
        typeof session.amount_total === 'number' ? session.amount_total / 100 : null
      await db
        .from('usuarios')
        .update({
          acceso_pagado: true,
          trial_activo: false,
          fecha_pago: new Date().toISOString(),
          precio_pagado: precioPagado,
          codigo_usado: codigo || null,
          mi_codigo: miCodigo,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription || session.id,
        })
        .eq('email', email)
      if (codigo && codigo.toUpperCase() !== 'AETHERIS') {
        const { data: ref } = await db
          .from('usuarios')
          .select('id,referidos_count')
          .eq('mi_codigo', codigo.toUpperCase())
          .single()
        if (ref) {
          await db
            .from('usuarios')
            .update({ referidos_count: (ref.referidos_count || 0) + 1 })
            .eq('id', ref.id)
          const { data: refRow } = await db
            .from('referidos')
            .insert({
              codigo,
              referidor_id: ref.id,
              referido_id: user.id,
              precio_pagado: session.amount_total / 100,
              referido_nombre: user.nombre || email,
            })
            .select('id')
            .single()
          if (refRow?.id) {
            await processReferralPayout(db, {
              referidorId: ref.id,
              referidoId: user.id,
              referidosId: refRow.id,
              referidoNombre: user.nombre || email,
            })
          }
        }
      }
    }
    return Response.json({ ok: true })
  } catch(e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
export const dynamic = 'force-dynamic'
