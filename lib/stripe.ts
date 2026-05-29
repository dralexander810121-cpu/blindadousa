import { PRICING } from '@/lib/siteFacts'

/** Centavos USD — alineado con lib/siteFacts PRICING */
export const PRECIOS_CENTS = {
  mensual: {
    normal: PRICING.monthly * 100,
    referido: (PRICING.monthly - PRICING.referralPayout) * 100,
  },
  anual: {
    normal: PRICING.annual * 100,
    referido: (PRICING.annual - PRICING.referralPayout) * 100,
  },
} as const

export type CheckoutPlan = 'mensual' | 'anual'

export function checkoutAmountCents(plan: CheckoutPlan, conDescuento: boolean): number {
  const tier = PRECIOS_CENTS[plan]
  return conDescuento ? tier.referido : tier.normal
}

export function checkoutDisplayAmount(plan: CheckoutPlan, conDescuento: boolean): number {
  return checkoutAmountCents(plan, conDescuento) / 100
}

/** @deprecated Usar checkoutAmountCents('mensual', …) */
export const PRECIOS = {
  normal: PRECIOS_CENTS.mensual.normal,
  referido: PRECIOS_CENTS.mensual.referido,
}

/** Listings directorio B2B (centavos USD) */
export const PRECIOS_B2B = {
  basico: 29900,
  premium: 50000,
} as const

export type PlanB2B = keyof typeof PRECIOS_B2B
export const CODIGO_FIJO = 'AETHERIS'

export function generarCodigo(nombre: string): string {
  const base = (nombre || 'USER').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4).padEnd(4, 'X')
  const num = Math.floor(1000 + Math.random() * 9000)
  return base + num
}
