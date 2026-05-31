import type { CheckoutPlan } from '@/lib/stripe'
import { validateCheckoutUser, validateReferralCode } from '@/lib/payments/checkout-shared'
import { paypalPendingPlanKey } from '@/lib/payments/paypal'

function parsePlan(raw: unknown): CheckoutPlan {
  return raw === 'anual' ? 'anual' : 'mensual'
}

/** Guarda email + código referido antes del botón PayPal (Hosted Button). */
export async function POST(req: Request) {
  try {
    const { email, codigo, plan: planRaw } = await req.json()
    const plan = parsePlan(planRaw)

    if (!email?.trim()) {
      return Response.json({ error: 'Ingresa tu email.' }, { status: 400 })
    }

    const userCheck = await validateCheckoutUser(email)
    if (!userCheck.ok) {
      return Response.json({ error: userCheck.error }, { status: 400 })
    }

    const esValido = codigo ? await validateReferralCode(userCheck.db, codigo) : false
    const codigoGuardar = esValido && codigo ? String(codigo).trim().toUpperCase() : null

    const update: { stripe_customer_id: string; codigo_usado?: string } = {
      stripe_customer_id: paypalPendingPlanKey(plan),
    }
    if (codigoGuardar) update.codigo_usado = codigoGuardar

    await userCheck.db
      .from('usuarios')
      .update(update)
      .eq('email', userCheck.email)
      .eq('acceso_pagado', false)

    return Response.json({ ok: true, plan })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al preparar PayPal'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
