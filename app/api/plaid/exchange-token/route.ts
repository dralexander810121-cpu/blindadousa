import { createAdmin } from '@/lib/supabase/server'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { syncPlaidItem, runPaymentMonitor } from '@/lib/plaid/sync'
import { plaid } from '@/lib/plaid'

export async function POST(req: Request) {
  const { user, usuario } = await getAuthenticatedUsuario()
  if (!user || !usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { public_token } = await req.json()
  if (!public_token) {
    return Response.json({ error: 'public_token requerido' }, { status: 400 })
  }

  try {
    const exchange = await plaid.itemPublicTokenExchange({ public_token })
    const accessToken = exchange.data.access_token
    const itemId = exchange.data.item_id

    const db = createAdmin()
    const count = await syncPlaidItem(db, usuario.id, accessToken, itemId)
    await runPaymentMonitor(db, usuario.id)

    const { data: depository } = await db
      .from('cuentas_conectadas')
      .select('plaid_account_id')
      .eq('usuario_id', usuario.id)
      .eq('tipo', 'depository')
      .eq('activa', true)
      .limit(1)
      .maybeSingle()
    if (depository?.plaid_account_id) {
      await db
        .from('usuarios')
        .update({ cuenta_pago_plaid_id: depository.plaid_account_id })
        .eq('id', usuario.id)
    }

    return Response.json({ ok: true, accounts: count })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error conectando banco'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
