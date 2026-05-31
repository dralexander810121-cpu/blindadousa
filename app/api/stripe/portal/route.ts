import Stripe from 'stripe'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { createAdmin } from '@/lib/supabase/server'

export async function POST() {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey || secretKey.includes('placeholder')) {
      return Response.json({ error: 'Stripe no configurado en el servidor.' }, { status: 503 })
    }

    const { usuario } = await getAuthenticatedUsuario()
    if (!usuario) {
      return Response.json({ error: 'No autorizado' }, { status: 401 })
    }

    const db = createAdmin()
    const { data: row } = await db
      .from('usuarios')
      .select('stripe_customer_id, acceso_pagado')
      .eq('id', usuario.id)
      .single()

    if (!row?.stripe_customer_id) {
      return Response.json(
        { error: 'Aún no tienes suscripción activa en Stripe. Usa /pagar para activar.' },
        { status: 400 },
      )
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'

    const session = await stripe.billingPortal.sessions.create({
      customer: row.stripe_customer_id,
      return_url: `${appUrl}/dashboard/configuracion`,
    })

    return Response.json({ url: session.url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'No se pudo abrir el portal de Stripe'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

