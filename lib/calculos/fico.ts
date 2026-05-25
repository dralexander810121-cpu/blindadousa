/**
 * Calculadora FICO 8 — factores y utilización ideal.
 *
 * Pesos FICO 8 oficiales:
 *   Payment History       35%
 *   Amounts Owed (utiliz) 30%
 *   Length of Credit Hist 15%
 *   New Credit (hard pulls) 10%
 *   Credit Mix            10%
 */

export interface CuentaCredito {
  balance: number
  limite: number
  fechaApertura?: string  // ISO
}

export interface InputUtilizacion {
  cuentas: CuentaCredito[]
}

export interface OutputUtilizacion {
  totalBalance: number
  totalLimite: number
  utilizacionGlobalPct: number
  cuentaMasUsadaPct: number
  semaforo: 'rojo' | 'amarillo' | 'verde'
  recomendacionMonto: number  // cuánto bajar el balance para llegar a <30%
  recomendacionOptima: number // cuánto para llegar a <8%
}

export function calcularUtilizacion(input: InputUtilizacion): OutputUtilizacion {
  const totalBalance = input.cuentas.reduce((s, c) => s + c.balance, 0)
  const totalLimite = input.cuentas.reduce((s, c) => s + c.limite, 0)
  const utilizacionGlobalPct = totalLimite > 0 ? (totalBalance / totalLimite) * 100 : 0
  const cuentaMasUsadaPct = input.cuentas.reduce((max, c) => {
    if (c.limite <= 0) return max
    const pct = (c.balance / c.limite) * 100
    return Math.max(max, pct)
  }, 0)

  let semaforo: 'rojo' | 'amarillo' | 'verde' = 'verde'
  if (utilizacionGlobalPct > 50 || cuentaMasUsadaPct > 80) semaforo = 'rojo'
  else if (utilizacionGlobalPct > 30 || cuentaMasUsadaPct > 50) semaforo = 'amarillo'

  const targetMonto30 = totalLimite * 0.3
  const targetMonto8 = totalLimite * 0.08
  const recomendacionMonto = Math.max(0, totalBalance - targetMonto30)
  const recomendacionOptima = Math.max(0, totalBalance - targetMonto8)

  return {
    totalBalance: Math.round(totalBalance),
    totalLimite: Math.round(totalLimite),
    utilizacionGlobalPct: Number(utilizacionGlobalPct.toFixed(1)),
    cuentaMasUsadaPct: Number(cuentaMasUsadaPct.toFixed(1)),
    semaforo,
    recomendacionMonto: Math.round(recomendacionMonto),
    recomendacionOptima: Math.round(recomendacionOptima),
  }
}

export function ficoRangeLabel(score: number): { label: string; color: string; descripcion: string } {
  if (score >= 800) return { label: 'Excepcional', color: '#10b981', descripcion: 'Las mejores tasas. Aprobaciones casi automáticas.' }
  if (score >= 740) return { label: 'Muy Bueno', color: '#22c55e', descripcion: 'Tasas mejores que el promedio.' }
  if (score >= 670) return { label: 'Bueno', color: '#84cc16', descripcion: 'Aprobaciones normales con tasas regulares.' }
  if (score >= 580) return { label: 'Regular', color: '#f59e0b', descripcion: 'Aprobaciones con tasas más altas.' }
  return { label: 'Pobre', color: '#dc2626', descripcion: 'Difícil aprobación. Hay caminos para mejorar.' }
}
