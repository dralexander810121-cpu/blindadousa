import { createAdmin } from '@/lib/supabase/server'
export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const { codigo } = body ?? {}
  if (!codigo) return Response.json({ valido: false })
  if (codigo.toUpperCase() === 'AETHERIS') return Response.json({ valido: true, tipo: 'fijo' })
  const db = createAdmin()
  const { data } = await db.from('usuarios').select('id').eq('mi_codigo', codigo.toUpperCase()).single()
  return Response.json({ valido: !!data, tipo: 'usuario' })
}
export const dynamic = 'force-dynamic'
