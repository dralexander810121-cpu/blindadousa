import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { isAdminEmail } from '@/lib/admin'
import { createAdmin } from '@/lib/supabase/server'

export async function GET() {
  const { user } = await getAuthenticatedUsuario()
  if (!user || !isAdminEmail(user.email)) {
    return Response.json({ error: 'No autorizado' }, { status: 403 })
  }

  const db = createAdmin()
  const { data, error } = await db
    .from('directorio_negocios')
    .select('id, nombre, categoria, ciudad, email, telefono, plan, featured, verificado, activo, created_at')
    .eq('verificado', false)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ pendientes: data || [] })
}

export async function PATCH(req: Request) {
  const { user } = await getAuthenticatedUsuario()
  if (!user || !isAdminEmail(user.email)) {
    return Response.json({ error: 'No autorizado' }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return Response.json({ error: 'Body JSON inválido' }, { status: 400 })
  const { id, verificado, activo } = body
  if (!id) return Response.json({ error: 'id requerido' }, { status: 400 })

  const updates: Record<string, boolean> = {}
  if (typeof verificado === 'boolean') updates.verificado = verificado
  if (typeof activo === 'boolean') updates.activo = activo
  if (!Object.keys(updates).length) {
    return Response.json({ error: 'Nada que actualizar' }, { status: 400 })
  }

  const db = createAdmin()
  const { data, error } = await db
    .from('directorio_negocios')
    .update(updates)
    .eq('id', id)
    .select('id, nombre, verificado, activo')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ negocio: data })
}

export const dynamic = 'force-dynamic'
