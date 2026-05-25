/**
 * Calculadora de financiamiento de auto + regla 20/4/10.
 */

export interface InputAuto {
  precioCarro: number
  scoreFico: number
  downPaymentPct: number   // 0-50
  tradeInValor: number     // valor del intercambio (puede ser 0)
  ingresoMensual: number   // para regla 20/4/10
  plazoMeses: 36 | 48 | 60 | 72 | 84
}

export interface OutputAuto {
  apr: number
  downPayment: number
  montoFinanciado: number
  pagoMensual: number
  totalPagado: number
  totalIntereses: number
  pctIngreso: number       // % del ingreso mensual
  cumple20: boolean        // 20% down
  cumple4: boolean         // <= 48 meses
  cumple10: boolean        // <= 10% del ingreso
  semaforoPagoVsIngreso: 'rojo' | 'amarillo' | 'verde'
  semaforoPlazoLargo: 'rojo' | 'amarillo' | 'verde'
}

function aprAuto(score: number): number {
  if (score >= 781) return 5.2
  if (score >= 661) return 7.1
  if (score >= 601) return 9.5
  if (score >= 501) return 13.8
  return 21.5
}

function pagoMensualAuto(monto: number, aprAnual: number, plazoMeses: number): number {
  const i = aprAnual / 100 / 12
  if (i === 0) return monto / plazoMeses
  return (monto * i * Math.pow(1 + i, plazoMeses)) / (Math.pow(1 + i, plazoMeses) - 1)
}

export function calcularAuto(input: InputAuto): OutputAuto {
  const apr = aprAuto(input.scoreFico)
  const downPayment = input.precioCarro * (input.downPaymentPct / 100)
  const montoFinanciado = Math.max(0, input.precioCarro - downPayment - input.tradeInValor)
  const pagoMensual = pagoMensualAuto(montoFinanciado, apr, input.plazoMeses)
  const totalPagado = pagoMensual * input.plazoMeses + downPayment
  const totalIntereses = pagoMensual * input.plazoMeses - montoFinanciado
  const pctIngreso = input.ingresoMensual > 0 ? (pagoMensual / input.ingresoMensual) * 100 : 0

  const cumple20 = input.downPaymentPct >= 20
  const cumple4 = input.plazoMeses <= 48
  const cumple10 = pctIngreso <= 10

  let semaforoPagoVsIngreso: 'rojo' | 'amarillo' | 'verde' = 'verde'
  if (pctIngreso > 15) semaforoPagoVsIngreso = 'rojo'
  else if (pctIngreso > 10) semaforoPagoVsIngreso = 'amarillo'

  let semaforoPlazoLargo: 'rojo' | 'amarillo' | 'verde' = 'verde'
  if (input.plazoMeses >= 84) semaforoPlazoLargo = 'rojo'
  else if (input.plazoMeses >= 72) semaforoPlazoLargo = 'amarillo'

  return {
    apr,
    downPayment: Math.round(downPayment),
    montoFinanciado: Math.round(montoFinanciado),
    pagoMensual: Math.round(pagoMensual),
    totalPagado: Math.round(totalPagado),
    totalIntereses: Math.round(totalIntereses),
    pctIngreso: Number(pctIngreso.toFixed(1)),
    cumple20,
    cumple4,
    cumple10,
    semaforoPagoVsIngreso,
    semaforoPlazoLargo,
  }
}
