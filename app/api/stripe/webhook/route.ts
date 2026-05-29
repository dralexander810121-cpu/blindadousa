import { generarCodigo, checkoutAmountCents, type CheckoutPlan } from '@/lib/stripe'
import { processReferralPayout } from '@/lib/referidos/payout'
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

    const Stripe = require('stripe')
    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const body = await req.text()
    const sig = (await headers()).get('stripe-signature') || ''
    let event: { type: string; data: { object: Record<string, unknown> } }
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch {
      return new Response('Bad signature', { status: 400 })
    }

    const db = createAdmin()

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object
      const subId = sub.id as string
      await db.from('usuarios').update({ acceso_pagado: false }).eq('stripe_subscription_id', subId)
      return Response.json({ ok: true })
    }

    if (event.type === 'customer.subscription.updated') {
      const sub = event.data.object
      const subId = sub.id as string
      const status = String(sub.status || '')
      if (REVOKED_SUB_STATUSES.has(status)) {
        await db.from('usuarios').update({ acceso_pagado: false }).eq('stripe_subscription_id', subId)
      } else if (ACTIVE_SUB_STATUSES.has(status)) {
        await db.from('usuarios').update({ acceso_pagado: true }).eq('stripe_subscription_id', subId)
      }
      return Response.json({ ok: true })
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object
      const subId = invoice.subscription as string | undefined
      if (subId) {
        await db.from('usuarios').update({ acceso_pagado: false }).eq('stripe_subscription_id', subId)
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
          stripe_subscription_id: session.id as string,
          verificado: false,
          activo: true,
          featured: metadata.plan === 'premium',
        })
        return Response.json({ ok: true })
      }

      const email = metadata.email
      if (!email) return Response.json({ ok: true })

      const { data: user } = await db.from('usuarios').select('*').eq('email', email).single()
      if (!user) return Response.json({ ok: true })

      const miCodigo = generarCodigo(user.nombre || email)
      const precioPagado = precioFromSession({
        amount_total: session.amount_total as number | null,
        metadata,
      })
      const codigo = metadata.codigo

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
          stripe_subscription_id: (session.subscription as string) || (session.id as string),
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
              precio_pagado: precioPagado,
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
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Webhook error'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
