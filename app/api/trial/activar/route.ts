import { PRICING } from '@/lib/siteFacts'
import { createAdmin, createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return Response.json({ error: 'Body JSON inválido' }, { status: 400 })
  const { nombre } = body

  // El userId NUNCA viene del cliente: se deriva de la sesión en el servidor.
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) return Response.json({ error: 'No autenticado' }, { status: 401 })

  const userId = user.id
  const email = (user.email ?? '').trim().toLowerCase()
  if (!email) return Response.json({ error: 'Datos incompletos' }, { status: 400 })

  const db = createAdmin()

  const { data: existing } = await db.from('usuarios').select('trial_usado, acceso_pagado').eq('auth_user_id', userId).single()
  if (existing?.trial_usado) return Response.json({ error: 'Ya usaste el trial. Continúa por $20.' }, { status: 400 })
  if (existing?.acceso_pagado) return Response.json({ ok: true, redirect: '/dashboard' })

  const ahora = new Date()
  const fin = new Date(ahora.getTime() + PRICING.trialDays * 24 * 60 * 60 * 1000)

  await db.from('usuarios').upsert({
    auth_user_id: userId, email, nombre,
    trial_activo: true, trial_inicio: ahora.toISOString(), trial_fin: fin.toISOString(), trial_usado: true,
    acceso_pagado: false,
  }, { onConflict: 'auth_user_id' })

  return Response.json({ ok: true })
}
export const dynamic = 'force-dynamic'
