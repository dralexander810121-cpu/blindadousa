import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { createAdmin } from '@/lib/supabase/server'

export async function GET() {
  const { user, usuario } = await getAuthenticatedUsuario()
  if (!user || !usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const db = createAdmin()
  const { data: perfil } = await db
    .from('usuarios')
    .select('mi_codigo, referidos_count, ganancias_referidos')
    .eq('id', usuario.id)
    .single()

  const { data: historial } = await db
    .from('referidos')
    .select(
      'id, codigo, referido_nombre, precio_pagado, monto_comision, transferencia_estado, plaid_transfer_id, error_transferencia, created_at, pagado_at',
    )
    .eq('referidor_id', usuario.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return Response.json({
    codigo: perfil?.mi_codigo || '',
    referidos_count: perfil?.referidos_count || 0,
    ganancias_referidos: Number(perfil?.ganancias_referidos || 0),
    historial: historial || [],
  })
}

export const dynamic = 'force-dynamic'
