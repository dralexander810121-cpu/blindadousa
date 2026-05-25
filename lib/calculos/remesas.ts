/**
 * Calculadora de remesas + impacto del impuesto 1% (vigente desde enero 2026).
 *
 * El impuesto del 1% aplica a remesas pagadas EN EFECTIVO o money order.
 * NO aplica a transferencias bancarias (ACH) o tarjeta de débito/crédito.
 */

export const REMESAS_IMPUESTO_2026_PCT = 1.0

export type MetodoRemesa =
  | 'efectivo'       // Western Union, MoneyGram cash → APLICA IMPUESTO
  | 'money_order'    // money order → APLICA IMPUESTO
  | 'banco_directo'  // ACH bank transfer → NO aplica
  | 'tarjeta'        // débito/crédito → NO aplica
  | 'app'            // Wise/Remitly app pay → NO aplica si funded via bank

export interface InputRemesa {
  montoMensual: number
  metodo: MetodoRemesa
}

export interface OutputRemesa {
  pagaImpuesto: boolean
  impuestoMensual: number
  impuestoAnual: number
  totalEnviadoAnual: number
  ahorroPotencialAnual: number  // si cambia a método sin impuesto
  recomendacion: string
}

export function calcularRemesa(input: InputRemesa): OutputRemesa {
  const APLICAN_IMPUESTO: MetodoRemesa[] = ['efectivo', 'money_order']
  const pagaImpuesto = APLICAN_IMPUESTO.includes(input.metodo)
  const impuestoMensual = pagaImpuesto ? input.montoMensual * (REMESAS_IMPUESTO_2026_PCT / 100) : 0
  const impuestoAnual = impuestoMensual * 12
  const totalEnviadoAnual = input.montoMensual * 12
  const ahorroPotencialAnual = pagaImpuesto ? impuestoAnual : 0

  let recomendacion: string
  if (pagaImpuesto) {
    recomendacion = `Estás pagando $${impuestoAnual.toFixed(0)} al año en impuesto sobre tus remesas. Si cambiás a transferencia bancaria, ahorrás esa cantidad cada año.`
  } else if (input.metodo === 'app') {
    recomendacion = 'Tu método (app financiada con cuenta bancaria) NO paga el impuesto del 1%. Buen método.'
  } else {
    recomendacion = 'Tu método NO paga el impuesto del 1%. Buen método. Compará tarifas entre proveedores.'
  }

  return {
    pagaImpuesto,
    impuestoMensual: Number(impuestoMensual.toFixed(2)),
    impuestoAnual: Math.round(impuestoAnual),
    totalEnviadoAnual: Math.round(totalEnviadoAnual),
    ahorroPotencialAnual: Math.round(ahorroPotencialAnual),
    recomendacion,
  }
}

/**
 * Comparador de servicios — datos públicos aproximados (verificar tarifas oficiales).
 * Si una tarifa cambia, actualizar acá.
 */
export const SERVICIOS_REMESA = [
  {
    id: 'wise',
    nombre: 'Wise',
    tarifaPct: 0.5,           // ~0.5% promedio
    tarifaFija: 0,
    tiempoHoras: 24,
    pagaImpuesto: false,
    appEspanol: true,
    minimoUsd: 1,
    url: 'https://wise.com',
  },
  {
    id: 'remitly',
    nombre: 'Remitly',
    tarifaPct: 1.0,
    tarifaFija: 3.99,
    tiempoHoras: 4,
    pagaImpuesto: false,
    appEspanol: true,
    minimoUsd: 10,
    url: 'https://www.remitly.com',
  },
  {
    id: 'western_union',
    nombre: 'Western Union',
    tarifaPct: 4.5,
    tarifaFija: 5,
    tiempoHoras: 1,
    pagaImpuesto: true,
    appEspanol: true,
    minimoUsd: 1,
    url: 'https://www.westernunion.com',
  },
  {
    id: 'moneygram',
    nombre: 'MoneyGram',
    tarifaPct: 4.0,
    tarifaFija: 4.99,
    tiempoHoras: 1,
    pagaImpuesto: true,
    appEspanol: true,
    minimoUsd: 1,
    url: 'https://www.moneygram.com',
  },
  {
    id: 'xoom',
    nombre: 'Xoom (PayPal)',
    tarifaPct: 1.5,
    tarifaFija: 0,
    tiempoHoras: 2,
    pagaImpuesto: false,
    appEspanol: true,
    minimoUsd: 10,
    url: 'https://www.xoom.com',
  },
] as const

export function calcularCuantoLlega(monto: number, servicioId: string): {
  servicio: string
  tarifaTotal: number
  impuesto: number
  cantidadDestino: number
} | null {
  const s = SERVICIOS_REMESA.find(x => x.id === servicioId)
  if (!s) return null
  const tarifaTotal = monto * (s.tarifaPct / 100) + s.tarifaFija
  const impuesto = s.pagaImpuesto ? monto * (REMESAS_IMPUESTO_2026_PCT / 100) : 0
  const cantidadDestino = monto - tarifaTotal - impuesto
  return {
    servicio: s.nombre,
    tarifaTotal: Number(tarifaTotal.toFixed(2)),
    impuesto: Number(impuesto.toFixed(2)),
    cantidadDestino: Number(cantidadDestino.toFixed(2)),
  }
}
