import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { getLemonSubscriptionPortalUrl, isLemonSqueezyConfigured } from '@/lib/payments/lemonsqueezy'
import { getPayPalManageUrl } from '@/lib/payments/paypal'
import { detectUserPaymentProvider, getPaymentProvider } from '@/lib/payments/provider'
import { createAdmin } from '@/lib/supabase/server'

export async function POST() {
  try {
    const { usuario } = await getAuthenticatedUsuario()
    if (!usuario) {
      return Response.json({ error: 'No autorizado' }, { status: 401 })
    }

    const db = createAdmin()
    const { data: row } = await db
      .from('usuarios')
      .select('stripe_customer_id, stripe_subscription_id, acceso_pagado')
      .eq('id', usuario.id)
      .single()

    if (!row?.acceso_pagado && !row?.stripe_subscription_id) {
      return Response.json(
        { error: 'Aún no tienes suscripción activa. Usa /pagar para activar.' },
        { status: 400 },
      )
    }

    const subId = row.stripe_subscription_id || ''
    const userProvider = detectUserPaymentProvider(subId)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'

    if (userProvider === 'paypal' && subId) {
      const url = await getPayPalManageUrl(subId)
      return Response.json({ url, provider: 'paypal' })
    }

    if (userProvider === 'klarna') {
      return Response.json({
        url: 'https://app.klarna.com/login',
        provider: 'klarna',
      })
    }

    const provider = getPaymentProvider()
    if (provider === 'lemonsqueezy' && isLemonSqueezyConfigured() && subId) {
      const url = await getLemonSubscriptionPortalUrl(subId)
      if (url) return Response.json({ url, provider: 'lemonsqueezy' })
    }

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey || secretKey.includes('placeholder') || !row.stripe_customer_id) {
      return Response.json(
        { error: 'Portal de facturación no disponible. Contacta soporte en hola@blindadousa.com.' },
        { status: 503 },
      )
    }

    const Stripe = require('stripe')
    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const session = await stripe.billingPortal.sessions.create({
      customer: row.stripe_customer_id,
      return_url: `${appUrl}/dashboard/configuracion`,
    })

    return Response.json({ url: session.url, provider: 'stripe' })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'No se pudo abrir el portal de facturación'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
