import { PRECIOS, CODIGO_FIJO, generarCodigo } from '@/lib/stripe'
import { createAdmin } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const Stripe = require('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', { apiVersion: '2026-04-22.dahlia' })
    const { email, codigo } = await req.json()
    const db = createAdmin()
    let esValido = false

    if (codigo?.toUpperCase() === CODIGO_FIJO) {
      esValido = true
    } else if (codigo) {
      const { data } = await db.from('usuarios').select('id').eq('mi_codigo', codigo.toUpperCase()).single()
      esValido = !!data
    }

    const precio = esValido ? PRECIOS.referido : PRECIOS.normal
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price_data: { currency: 'usd', unit_amount: precio, product_data: { name: 'BlindadoUSA — Acceso de por vida', description: '13 módulos para siempre. La biblia financiera del hispano en USA.' } }, quantity: 1 }],
      metadata: { email, codigo: codigo || '', descuento: esValido ? 'si' : 'no' },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'}/pagar/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'}/pagar`,
    })
    return Response.json({ url: session.url })
  } catch(e: any) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
export const dynamic = 'force-dynamic'
