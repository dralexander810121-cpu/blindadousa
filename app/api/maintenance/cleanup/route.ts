import { createAdmin } from '@/lib/supabase/server'
import { verifyCronRequest } from '@/lib/ia/auth-cron'

export async function GET(req: Request) {
  if (!verifyCronRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = createAdmin()

  // Limpiar webhook_events > 90 días
  const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  const { count: webhookCount } = await db
    .from('webhook_events')
    .delete({ count: 'exact' }).lt('processed_at', cutoff)

  // Limpiar chat_historial > 180 días
  const chatCutoff = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
  const { count: chatCount } = await db
    .from('chat_historial')
    .delete({ count: 'exact' }).lt('created_at', chatCutoff)

  return Response.json({
    ok: true,
    cleaned: {
      webhook_events: webhookCount ?? 0,
      chat_historial: chatCount ?? 0,
    }
  })
}

export const dynamic = 'force-dynamic'

