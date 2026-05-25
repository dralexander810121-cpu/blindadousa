/**
 * Calculadora de jubilación con interés compuesto.
 * Assume 7% annual real return (S&P 500 promedio histórico ajustado por inflación).
 */

export interface InputJubilacion {
  edadActual: number
  edadRetiro: number
  ingresoMensual: number
  ahorroMensual: number
  saldoActual?: number
  retornoAnualPct?: number  // default 7%
}

export interface OutputJubilacion {
  aniosHastaRetiro: number
  saldoEstimado: number
  ingresoMensualRetiro: number  // regla 4% withdrawal
  metaMinima: number             // 25x gastos anuales
  metaCumplida: boolean
  esperar5anios: { saldo: number; perdida: number }
}

export function calcularJubilacion(input: InputJubilacion): OutputJubilacion {
  const anios = Math.max(0, input.edadRetiro - input.edadActual)
  const r = (input.retornoAnualPct ?? 7) / 100 / 12
  const n = anios * 12
  const PMT = input.ahorroMensual
  const PV = input.saldoActual ?? 0

  // FV con aportes mensuales:  FV = PV(1+r)^n + PMT × [((1+r)^n - 1) / r]
  const futuroValor = PV * Math.pow(1 + r, n) + (r > 0 ? PMT * ((Math.pow(1 + r, n) - 1) / r) : PMT * n)

  // 4% withdrawal rule
  const ingresoAnualRetiro = futuroValor * 0.04
  const ingresoMensualRetiro = ingresoAnualRetiro / 12

  const gastosEstimadosAnuales = input.ingresoMensual * 12 * 0.7 // típico 70%
  const metaMinima = gastosEstimadosAnuales * 25

  // Costo de esperar 5 años (mismo ahorro mensual pero 5 años menos)
  const aniosTarde = Math.max(0, anios - 5)
  const nTarde = aniosTarde * 12
  const futuroTarde = PV * Math.pow(1 + r, nTarde) + (r > 0 ? PMT * ((Math.pow(1 + r, nTarde) - 1) / r) : PMT * nTarde)

  return {
    aniosHastaRetiro: anios,
    saldoEstimado: Math.round(futuroValor),
    ingresoMensualRetiro: Math.round(ingresoMensualRetiro),
    metaMinima: Math.round(metaMinima),
    metaCumplida: futuroValor >= metaMinima,
    esperar5anios: {
      saldo: Math.round(futuroTarde),
      perdida: Math.round(futuroValor - futuroTarde),
    },
  }
}
