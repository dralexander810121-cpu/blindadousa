import { PRECIOS_B2B, type PlanB2B } from '@/lib/stripe'
import { CATEGORIAS_DIRECTORIO } from '@/lib/directorio/seed'

const PLANES = new Set<string>(['basico', 'premium'])

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey || secretKey.includes('placeholder')) {
      return Response.json(
        { error: 'Stripe no está configurado. Añade STRIPE_SECRET_KEY en el servidor.' },
        { status: 503 },
      )
    }

    const body = await req.json()
    const plan = (body.plan || 'basico') as PlanB2B
    if (!PLANES.has(plan)) {
      return Response.json({ error: 'Plan no válido' }, { status: 400 })
    }

    const email = String(body.email || '').trim()
    const nombre = String(body.nombre || '').trim()
    const categoria = String(body.categoria || '').trim()
    const ciudad = String(body.ciudad || 'Houston').trim()
    const telefono = String(body.telefono || '').trim()
    const descripcion = String(body.descripcion || '').trim().slice(0, 500)

    if (!email || !nombre || !categoria) {
      return Response.json({ error: 'email, nombre y categoría son requeridos' }, { status: 400 })
    }

    const catOk = CATEGORIAS_DIRECTORIO.some((c) => c.id === categoria)
    if (!catOk) {
      return Response.json({ error: 'Categoría no válida' }, { status: 400 })
    }

    const Stripe = require('stripe')
    const stripe = new Stripe(secretKey, { apiVersion: '2026-04-22.dahlia' })
    const amount = PRECIOS_B2B[plan]
    const planLabel = plan === 'premium' ? 'Premium' : 'Básico'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: {
              name: `BlindadoUSA Directorio — Plan ${planLabel}`,
              description: `Listing verificado para ${nombre} (${categoria})`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        tipo: 'directorio_negocio',
        plan,
        email,
        nombre,
        categoria,
        ciudad,
        telefono,
        descripcion,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'}/dashboard/negocios/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'}/dashboard/negocios`,
    })

    return Response.json({ url: session.url })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error de Stripe'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
