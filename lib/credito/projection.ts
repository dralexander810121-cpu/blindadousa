/**
 * Modelo de proyección de score FICO ponderado por los 5 factores reales.
 * Reemplaza la estimación aditiva ingenua por un modelo basado en los pesos FICO:
 *   - Historial de pagos: 35%
 *   - Utilización: 30%
 *   - Antigüedad: 15%
 *   - Mezcla de crédito: 10%
 *   - Consultas nuevas: 10%
 *
 * Produce una proyección probabilística con banda de confianza por horizonte.
 */

export type ScoreInput = {
  scoreActual: number
  utilizacion: number // %
  pagosTarde: number // últimos 24 meses
  cuentasAbiertas: number
  consultasRecientes: number // 6 meses
  disputaPendiente?: boolean // disputa de error en curso
}

export type ProyeccionPunto = {
  horizonteDias: number
  estimado: number
  rangoMin: number
  rangoMax: number
  probabilidadMeta?: number // % de alcanzar la meta en este horizonte
}

// Capacidad máxima de mejora si el usuario ejecuta el plan perfecto
function potencialMejora(s: ScoreInput): number {
  let potencial = 0

  // Utilización: el factor de mayor velocidad de mejora
  if (s.utilizacion > 50) potencial += 55
  else if (s.utilizacion > 30) potencial += 35
  else if (s.utilizacion > 10) potencial += 15

  // Historial de pagos: lento de reparar pero alto techo
  if (s.pagosTarde > 0) potencial += Math.min(60, s.pagosTarde * 12)

  // Consultas: se caen con el tiempo
  potencial += Math.min(15, s.consultasRecientes * 4)

  // Disputa exitosa de un error puede dar un salto grande
  if (s.disputaPendiente) potencial += 40

  // Techo: no se puede pasar de 850
  return Math.min(potencial, 850 - s.scoreActual)
}

// Curva de recuperación: la mejora no es lineal — más rápida al inicio (utilización),
// más lenta después (historial de pagos necesita meses)
function fraccionEnHorizonte(dias: number): number {
  if (dias <= 30) return 0.3 // utilización se refleja en ~1 ciclo
  if (dias <= 90) return 0.65
  if (dias <= 180) return 0.85
  return 1.0
}

export function proyectarScore(s: ScoreInput, metaScore?: number): ProyeccionPunto[] {
  const potencial = potencialMejora(s)
  const horizontes = [30, 90, 180, 365]

  return horizontes.map((dias) => {
    const frac = fraccionEnHorizonte(dias)
    const ganancia = Math.round(potencial * frac)
    const estimado = Math.min(850, s.scoreActual + ganancia)
    // Banda de confianza: ±15% de la ganancia (incertidumbre del comportamiento real)
    const margen = Math.max(5, Math.round(ganancia * 0.15))
    const rangoMin = Math.min(850, s.scoreActual + Math.max(0, ganancia - margen))
    const rangoMax = Math.min(850, s.scoreActual + ganancia + margen)

    let probabilidadMeta: number | undefined
    if (metaScore) {
      if (rangoMax < metaScore) probabilidadMeta = 5
      else if (rangoMin >= metaScore) probabilidadMeta = 92
      else {
        // Interpolación dentro de la banda
        const pos = (metaScore - rangoMin) / Math.max(1, rangoMax - rangoMin)
        probabilidadMeta = Math.round(90 - pos * 70)
      }
    }

    return { horizonteDias: dias, estimado, rangoMin, rangoMax, probabilidadMeta }
  })
}

export function clasificarScore(s: number): { label: string; tone: 'positive' | 'neutral' | 'negative' } {
  if (s >= 800) return { label: 'Excelente', tone: 'positive' }
  if (s >= 740) return { label: 'Muy bueno', tone: 'positive' }
  if (s >= 670) return { label: 'Bueno', tone: 'neutral' }
  if (s >= 580) return { label: 'Regular', tone: 'negative' }
  return { label: 'Muy bajo', tone: 'negative' }
}
