import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'

export async function GET() {
  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const [{ data: cuentas }, { data: perfil }, { data: alertas }] = await Promise.all([
    supabase
      .from('cuentas_conectadas')
      .select(
        'id, nombre_cuenta, tipo, mask, balance_actual, limite_credito, credito_disponible, pago_minimo, fecha_pago, fecha_corte, utilizacion, last_sync',
      )
      .eq('usuario_id', usuario.id)
      .eq('activa', true)
      .order('nombre_cuenta'),
    supabase
      .from('perfil_financiero')
      .select('credit_score, ingreso_mensual, gastos_mensuales')
      .eq('usuario_id', usuario.id)
      .maybeSingle(),
    supabase
      .from('alertas')
      .select('id, tipo, titulo, mensaje, nivel, leida, created_at')
      .eq('usuario_id', usuario.id)
      .eq('leida', false)
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const balanceTotal = (cuentas ?? []).reduce((sum, c) => {
    if (c.tipo === 'credit') return sum
    return sum + Number(c.balance_actual || 0)
  }, 0)

  const creditUsed = (cuentas ?? [])
    .filter((c) => c.tipo === 'credit')
    .reduce((sum, c) => sum + Math.abs(Number(c.balance_actual || 0)), 0)

  const gastosMes = Number(perfil?.gastos_mensuales || 0)

  return Response.json({
    usuario: {
      nombre: usuario.nombre,
      trial_activo: usuario.trial_activo,
      trial_fin: usuario.trial_fin,
      acceso_pagado: usuario.acceso_pagado,
    },
    metrics: {
      credit_score: perfil?.credit_score ?? null,
      balance_total: balanceTotal,
      gastos_mes: gastosMes,
      alertas_activas: alertas?.length ?? 0,
      cuentas_conectadas: cuentas?.length ?? 0,
      deuda_tarjetas: creditUsed,
    },
    cuentas: cuentas ?? [],
    alertas: alertas ?? [],
    plaid_configured: Boolean(process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET),
  })
}

export const dynamic = 'force-dynamic'
