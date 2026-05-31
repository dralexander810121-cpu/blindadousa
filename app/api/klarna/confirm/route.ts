import type { CheckoutPlan } from '@/lib/stripe'
import { activateSubscriptionAccess } from '@/lib/payments/activate-access'
import { createKlarnaOrder } from '@/lib/payments/klarna'
import { validateCheckoutUser, validateReferralCode } from '@/lib/payments/checkout-shared'
import { createAdmin } from '@/lib/supabase/server'

function parsePlan(raw: unknown): CheckoutPlan {
  return raw === 'anual' ? 'anual' : 'mensual'
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      authorization_token: authorizationToken,
      session_id: sessionId,
      email,
      codigo,
      plan: planRaw,
    } = body

    if (!authorizationToken || !sessionId || !email?.trim()) {
      return Response.json({ error: 'Datos incompletos para Klarna' }, { status: 400 })
    }

    const plan = parsePlan(planRaw)
    const userCheck = await validateCheckoutUser(email)
    if (!userCheck.ok) {
      return Response.json({ error: userCheck.error }, { status: 400 })
    }

    const esValido = await validateReferralCode(userCheck.db, codigo)
    const order = await createKlarnaOrder(authorizationToken, sessionId)

    const db = createAdmin()
    await activateSubscriptionAccess(db, {
      email: userCheck.email,
      plan,
      codigo,
      descuento: esValido,
      externalCustomerId: order.order_id || null,
      externalSubscriptionId: `klarna_${order.order_id}`,
      paymentProvider: 'klarna',
    })

    return Response.json({ ok: true, orderId: order.order_id })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error al confirmar Klarna'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
