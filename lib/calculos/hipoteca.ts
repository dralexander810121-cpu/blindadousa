/**
 * Calculadora de hipoteca FHA / Convencional / VA / USDA.
 * Todas las cantidades en USD.
 */

export type TipoPrestamo = 'fha' | 'convencional' | 'va' | 'usda'

export interface InputHipoteca {
  precioCasa: number       // ej 300000
  scoreFico: number        // 500-850
  plazoAnios: 15 | 20 | 30
  tipo: TipoPrestamo
  downPaymentPct?: number  // si se omite, usa el mínimo del tipo
  taxesAnualesPct?: number // ej 2.5 (Texas avg)
  seguroAnualPct?: number  // ej 0.5
  hoaMensual?: number      // opcional
}

export interface OutputHipoteca {
  downPayment: number
  downPaymentPct: number
  prestamoTotal: number
  apr: number              // tasa estimada según score
  pagoMensualPI: number    // principal + interés
  pmiMensual: number
  taxesMensuales: number
  seguroMensual: number
  hoaMensual: number
  pitiMensual: number      // PITI total
  costosClausura: number   // 2-5% del préstamo
  totalIntereses: number
  totalPagado: number
  elegible: boolean
  motivoNoElegible?: string
  semaforo: 'rojo' | 'amarillo' | 'verde'
}

const SCORE_MINIMO: Record<TipoPrestamo, number> = {
  fha: 580,
  convencional: 620,
  va: 600,
  usda: 640,
}
const DOWN_MIN: Record<TipoPrestamo, number> = {
  fha: 3.5,
  convencional: 5,
  va: 0,
  usda: 0,
}
const PMI_ANUAL_PCT: Record<TipoPrestamo, number> = {
  fha: 0.85,        // MIP FHA típico
  convencional: 0.5, // PMI si <20% down
  va: 0,            // VA no requiere PMI (funding fee aparte)
  usda: 0.35,       // USDA guarantee fee anual
}

/**
 * Tasa APR aproximada según FICO (datos públicos 2026 promedio market).
 */
function aprPorScore(score: number, tipo: TipoPrestamo): number {
  let base: number
  if (score >= 760) base = 6.5
  else if (score >= 700) base = 6.9
  else if (score >= 660) base = 7.4
  else if (score >= 620) base = 8.2
  else base = 9.5
  if (tipo === 'va') base -= 0.3
  if (tipo === 'usda') base -= 0.2
  return Number(base.toFixed(2))
}

function pagoMensualPI(prestamo: number, aprAnual: number, plazoAnios: number): number {
  const i = aprAnual / 100 / 12
  const n = plazoAnios * 12
  if (i === 0) return prestamo / n
  return (prestamo * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
}

export function calcularHipoteca(input: InputHipoteca): OutputHipoteca {
  const downPct = input.downPaymentPct ?? DOWN_MIN[input.tipo]
  const downPayment = input.precioCasa * (downPct / 100)
  const prestamoTotal = input.precioCasa - downPayment
  const apr = aprPorScore(input.scoreFico, input.tipo)
  const PI = pagoMensualPI(prestamoTotal, apr, input.plazoAnios)
  const pmiAnual = downPct < 20 ? prestamoTotal * (PMI_ANUAL_PCT[input.tipo] / 100) : 0
  const pmiMensual = pmiAnual / 12
  const taxesPct = input.taxesAnualesPct ?? 2.5
  const seguroPct = input.seguroAnualPct ?? 0.5
  const taxesMensuales = (input.precioCasa * (taxesPct / 100)) / 12
  const seguroMensual = (input.precioCasa * (seguroPct / 100)) / 12
  const hoaMensual = input.hoaMensual ?? 0
  const piti = PI + pmiMensual + taxesMensuales + seguroMensual + hoaMensual
  const costosClausura = prestamoTotal * 0.03 // ~3% promedio
  const totalIntereses = PI * input.plazoAnios * 12 - prestamoTotal
  const totalPagado = (PI + pmiMensual) * input.plazoAnios * 12

  let elegible = true
  let motivoNoElegible: string | undefined
  let semaforo: 'rojo' | 'amarillo' | 'verde' = 'verde'

  if (input.scoreFico < SCORE_MINIMO[input.tipo]) {
    elegible = false
    motivoNoElegible = `Tu score (${input.scoreFico}) está por debajo del mínimo ${SCORE_MINIMO[input.tipo]} para préstamo ${input.tipo.toUpperCase()}.`
    semaforo = 'rojo'
  } else if (input.scoreFico < SCORE_MINIMO[input.tipo] + 40) {
    semaforo = 'amarillo'
  }

  return {
    downPayment: Math.round(downPayment),
    downPaymentPct: downPct,
    prestamoTotal: Math.round(prestamoTotal),
    apr,
    pagoMensualPI: Math.round(PI),
    pmiMensual: Math.round(pmiMensual),
    taxesMensuales: Math.round(taxesMensuales),
    seguroMensual: Math.round(seguroMensual),
    hoaMensual: Math.round(hoaMensual),
    pitiMensual: Math.round(piti),
    costosClausura: Math.round(costosClausura),
    totalIntereses: Math.round(totalIntereses),
    totalPagado: Math.round(totalPagado),
    elegible,
    motivoNoElegible,
    semaforo,
  }
}
