/**
 * Modelo heurístico de riesgo de abandono (churn) para usuarios en trial.
 * Score 0-100: mayor = más probable que NO convierta a pago.
 *
 * Señales (ponderadas por impacto real en conversión SaaS):
 *  - Onboarding incompleto (no llenó perfil) → fuerte señal de abandono
 *  - Sin cuentas bancarias conectadas (Plaid) → bajo engagement
 *  - Sin uso de la IA Maestra (0 mensajes) → no encontró valor
 *  - Trial por vencer + baja actividad → urgencia
 */

export type ChurnSignals = {
  tienePerfil: boolean
  cuentasConectadas: number
  mensajesIA: number
  horasParaFinTrial: number | null
}

export type ChurnResult = {
  score: number
  nivel: 'bajo' | 'medio' | 'alto'
  razones: string[]
  gancho: string
}

export function calcularChurnRisk(s: ChurnSignals): ChurnResult {
  let score = 0
  const razones: string[] = []

  if (!s.tienePerfil) {
    score += 35
    razones.push('no completó su perfil')
  }
  if (s.cuentasConectadas === 0) {
    score += 25
    razones.push('no conectó cuentas bancarias')
  }
  if (s.mensajesIA === 0) {
    score += 30
    razones.push('no ha usado la IA Maestra')
  } else if (s.mensajesIA < 3) {
    score += 12
    razones.push('uso mínimo de la IA')
  }
  // Trial por vencer amplifica el riesgo si ya hay baja actividad
  if (s.horasParaFinTrial != null && s.horasParaFinTrial <= 24 && score >= 30) {
    score += 10
    razones.push('trial por vencer con poca actividad')
  }

  score = Math.min(100, score)
  const nivel = score >= 60 ? 'alto' : score >= 30 ? 'medio' : 'bajo'

  // Gancho de retención según la señal más fuerte
  let gancho = 'Tu prueba sigue activa — entra y prueba la IA Maestra con una pregunta real.'
  if (!s.tienePerfil) {
    gancho = 'Completa tu perfil en 2 minutos y la IA Maestra te dará un plan personalizado HOY.'
  } else if (s.mensajesIA === 0) {
    gancho = 'Pregúntale a la IA Maestra "¿por qué me niegan el crédito?" — te sorprenderá la respuesta.'
  } else if (s.cuentasConectadas === 0) {
    gancho = 'Conecta tu banco (seguro con Plaid) y recibe alertas antes de que tu score baje.'
  }

  return { score, nivel, razones, gancho }
}
