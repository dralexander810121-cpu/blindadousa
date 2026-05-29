import { createClient } from '@/lib/supabase/server'

export type UsuarioRow = {
  id: string
  auth_user_id: string
  email: string
  nombre: string | null
  trial_activo: boolean | null
  trial_fin: string | null
  acceso_pagado: boolean | null
  mi_codigo: string | null
}

export async function getAuthenticatedUsuario() {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { supabase, user: null, usuario: null as UsuarioRow | null }
  }

  const { data: usuario } = await supabase
    .from('usuarios')
    .select('id, auth_user_id, email, nombre, trial_activo, trial_fin, acceso_pagado, mi_codigo')
    .eq('auth_user_id', user.id)
    .single()

  return { supabase, user, usuario: usuario as UsuarioRow | null }
}
