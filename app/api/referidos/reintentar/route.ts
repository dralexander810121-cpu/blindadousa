import { verifyCronRequest } from '@/lib/ia/auth-cron'
import { retryPendingReferralPayouts } from '@/lib/referidos/payout'
import { createAdmin } from '@/lib/supabase/server'

export async function GET(req: Request) {
  if (!verifyCronRequest(req)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const db = createAdmin()
  const result = await retryPendingReferralPayouts(db, 30)
  return Response.json({ ok: true, ...result })
}

export const dynamic = 'force-dynamic'
