import { createAdmin } from '@/lib/supabase/server'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { verifyCronRequest } from '@/lib/ia/auth-cron'
import { runPaymentMonitor, syncAllUserAccounts } from '@/lib/plaid/sync'

async function syncOneUser(usuarioId: string) {
  const db = createAdmin()
  const synced = await syncAllUserAccounts(db, usuarioId)
  const alerts = await runPaymentMonitor(db, usuarioId)
  return { synced, alerts_created: alerts.length }
}

async function syncAllUsers() {
  const db = createAdmin()
  const { data: rows } = await db
    .from('cuentas_conectadas')
    .select('usuario_id')
    .eq('activa', true)

  const ids = (rows ?? []).map((r: { usuario_id: string }) => r.usuario_id).filter(Boolean)
  const userIds = Array.from(new Set(ids)) as string[]
  let synced = 0
  let alerts = 0

  for (const id of userIds) {
    try {
      const r = await syncOneUser(id)
      synced += r.synced
      alerts += r.alerts_created
    } catch (e) {
      console.error('plaid_sync_user_failed', id, e)
    }
  }

  return { users: userIds.length, synced, alerts_created: alerts }
}

async function handleSync(req: Request) {
  const isCron = verifyCronRequest(req)

  if (isCron) {
    const { searchParams } = new URL(req.url)
    const usuarioId = searchParams.get('usuario_id')
    if (usuarioId) {
      const result = await syncOneUser(usuarioId)
      return Response.json({ ok: true, ...result })
    }
    const result = await syncAllUsers()
    return Response.json({ ok: true, ...result })
  }

  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) return Response.json({ error: 'No autorizado' }, { status: 401 })

  const result = await syncOneUser(usuario.id)
  return Response.json({ ok: true, ...result })
}

export async function POST(req: Request) {
  return handleSync(req)
}

export async function GET(req: Request) {
  if (!verifyCronRequest(req)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }
  return handleSync(req)
}

export const dynamic = 'force-dynamic'
export const maxDuration = 300
