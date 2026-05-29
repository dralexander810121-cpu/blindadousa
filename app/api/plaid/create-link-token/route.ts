import { CountryCode, Products } from 'plaid'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { plaid } from '@/lib/plaid'

export async function POST() {
  const { user, usuario } = await getAuthenticatedUsuario()
  if (!user || !usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
    return Response.json(
      { error: 'Plaid no configurado. Añade PLAID_CLIENT_ID y PLAID_SECRET en .env.local' },
      { status: 503 },
    )
  }

  try {
    const res = await plaid.linkTokenCreate({
      user: { client_user_id: usuario.id },
      client_name: 'BlindadoUSA',
      products: [Products.Auth, Products.Transactions, Products.Liabilities],
      country_codes: [CountryCode.Us],
      language: 'es',
    })

    return Response.json({ link_token: res.data.link_token })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error creando link token'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
