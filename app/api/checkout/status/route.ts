import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { createAdmin } from '@/lib/supabase/server'

export async function GET() {
  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const db = createAdmin()
  const { data } = await db
    .from('usuarios')
    .select('acceso_pagado, mi_codigo')
    .eq('id', usuario.id)
    .single()

  return Response.json({
    acceso_pagado: Boolean(data?.acceso_pagado),
    mi_codigo: data?.mi_codigo || '',
  })
}

export const dynamic = 'force-dynamic'
