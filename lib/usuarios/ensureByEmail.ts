import type { SupabaseClient } from '@supabase/supabase-js'

type UsuarioRow = {
  id: string
  email: string
  nombre: string | null
  auth_user_id: string
  [key: string]: unknown
}

/** Busca usuario por email; si existe en Auth pero no en `usuarios`, crea la fila. */
export async function ensureUsuarioByEmail(
  db: SupabaseClient,
  email: string,
): Promise<UsuarioRow | null> {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return null

  const { data: existing } = await db.from('usuarios').select('*').eq('email', normalized).maybeSingle()
  if (existing) return existing as UsuarioRow

  const { data: listed, error: listErr } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 })
  if (listErr) return null

  const authUser = listed.users.find((u) => u.email?.toLowerCase() === normalized)
  if (!authUser) return null

  const nombre =
    (typeof authUser.user_metadata?.nombre === 'string' && authUser.user_metadata.nombre) ||
    authUser.user_metadata?.full_name ||
    null

  const { data: created, error: upsertErr } = await db
    .from('usuarios')
    .upsert(
      {
        auth_user_id: authUser.id,
        email: normalized,
        nombre,
      },
      { onConflict: 'auth_user_id' },
    )
    .select('*')
    .single()

  if (upsertErr || !created) return null
  return created as UsuarioRow
}
