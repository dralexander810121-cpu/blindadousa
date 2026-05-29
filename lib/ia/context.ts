import type { SupabaseClient } from '@supabase/supabase-js'

export async function buildUserContext(supabase: SupabaseClient, usuarioId: string): Promise<string> {
  const [{ data: perfil }, { data: cuentas }, { data: alertas }] = await Promise.all([
    supabase
      .from('perfil_financiero')
      .select('credit_score, ingreso_mensual, gastos_mensuales, deuda_total, tiene_ssn, tiene_itin, mayor_preocupacion')
      .eq('usuario_id', usuarioId)
      .maybeSingle(),
    supabase
      .from('cuentas_conectadas')
      .select('nombre_cuenta, tipo, balance_actual, utilizacion, fecha_pago, pago_minimo')
      .eq('usuario_id', usuarioId)
      .eq('activa', true)
      .limit(8),
    supabase
      .from('alertas')
      .select('titulo, nivel, tipo')
      .eq('usuario_id', usuarioId)
      .eq('leida', false)
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const lines: string[] = []

  if (perfil) {
    lines.push('PERFIL FINANCIERO:')
    if (perfil.credit_score) lines.push(`- Score FICO estimado: ${perfil.credit_score}`)
    if (perfil.ingreso_mensual) lines.push(`- Ingreso mensual: $${perfil.ingreso_mensual}`)
    if (perfil.gastos_mensuales) lines.push(`- Gastos mensuales: $${perfil.gastos_mensuales}`)
    if (perfil.deuda_total) lines.push(`- Deuda total: $${perfil.deuda_total}`)
    lines.push(`- Tiene SSN: ${perfil.tiene_ssn ? 'sí' : 'no'} | ITIN: ${perfil.tiene_itin ? 'sí' : 'no'}`)
    if (perfil.mayor_preocupacion) lines.push(`- Mayor preocupación: ${perfil.mayor_preocupacion}`)
  } else {
    lines.push('PERFIL FINANCIERO: aún no completado (onboarding pendiente).')
  }

  if (cuentas?.length) {
    lines.push('CUENTAS CONECTADAS (Plaid):')
    for (const c of cuentas) {
      const extra =
        c.tipo === 'credit'
          ? ` | util ${Number(c.utilizacion || 0).toFixed(0)}% | pago min $${Number(c.pago_minimo || 0).toFixed(0)}`
          : ''
      lines.push(`- ${c.nombre_cuenta}: $${Number(c.balance_actual || 0).toFixed(0)}${extra}`)
    }
  } else {
    lines.push('CUENTAS: ninguna conectada todavía.')
  }

  if (alertas?.length) {
    lines.push('ALERTAS ACTIVAS:')
    for (const a of alertas) {
      lines.push(`- [${a.nivel}] ${a.titulo} (${a.tipo})`)
    }
  }

  if (perfil?.mayor_preocupacion) {
    lines.push(`DIRECTORIO: si recomiendas servicios locales, menciona el directorio verificado en /directorio (categorías: abogado, taxes, dealer, banco, clínica).`)
  }

  return lines.join('\n')
}
