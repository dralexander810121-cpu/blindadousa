import { createAdmin } from '@/lib/supabase/server'
import { verifyCronRequest } from '@/lib/ia/auth-cron'
import { runPaymentMonitor, syncAllUserAccounts } from '@/lib/plaid/sync'

async function runMonitorForAllUsers() {
  const db = createAdmin()
  const { data: rows } = await db
    .from('cuentas_conectadas')
    .select('usuario_id')
    .eq('activa', true)

  const ids = (rows ?? []).map((r: { usuario_id: string }) => r.usuario_id).filter(Boolean)
  const userIds = Array.from(new Set(ids)) as string[]
  let syncedAccounts = 0
  let alertsCreated = 0
  const errors: { usuario_id: string; error: string }[] = []

  for (const usuarioId of userIds) {
    try {
      syncedAccounts += await syncAllUserAccounts(db, usuarioId)
      const alerts = await runPaymentMonitor(db, usuarioId)
      alertsCreated += alerts.length
    } catch (e) {
      errors.push({
        usuario_id: usuarioId,
        error: e instanceof Error ? e.message : 'unknown',
      })
    }
  }

  return { users: userIds.length, syncedAccounts, alertsCreated, errors }
}

export async function GET(req: Request) {
  if (!verifyCronRequest(req)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const result = await runMonitorForAllUsers()
  return Response.json({ ok: true, ...result })
}

export const dynamic = 'force-dynamic'
export const maxDuration = 300
