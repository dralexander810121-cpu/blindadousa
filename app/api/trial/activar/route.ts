import { createAdmin } from '@/lib/supabase/server'
import { generarCodigo } from '@/lib/stripe'

export async function POST(req: Request) {
  const { email, nombre, userId } = await req.json()
  if (!userId || !email) return Response.json({ error: 'Datos incompletos' }, { status: 400 })
  const db = createAdmin()

  const { data: existing } = await db.from('usuarios').select('trial_usado, acceso_pagado').eq('auth_user_id', userId).single()
  if (existing?.trial_usado) return Response.json({ error: 'Ya usaste el trial. Continúa por $20.' }, { status: 400 })
  if (existing?.acceso_pagado) return Response.json({ ok: true, redirect: '/dashboard' })

  const ahora = new Date()
  const fin = new Date(ahora.getTime() + 3 * 24 * 60 * 60 * 1000)

  await db.from('usuarios').upsert({
    auth_user_id: userId, email, nombre,
    trial_activo: true, trial_inicio: ahora.toISOString(), trial_fin: fin.toISOString(), trial_usado: true,
    acceso_pagado: false,
  }, { onConflict: 'auth_user_id' })

  return Response.json({ ok: true })
}
export const dynamic = 'force-dynamic'
