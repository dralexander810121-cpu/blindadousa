/** UI labels ↔ legacy DB codes (constraint dropped in migration 010; mapping kept for consistency). */

export const PREOCUPACIONES_UI = [
  'Subir mi score de crédito',
  'Pagar menos en taxes',
  'Comprar casa o carro',
  'Deudas y cobradores',
  'Salario o trabajo',
  'Emergencia / ahorro',
] as const

const LABEL_TO_CODE: Record<string, string> = {
  'Subir mi score de crédito': 'credito',
  'Pagar menos en taxes': 'taxes',
  'Comprar casa o carro': 'casa',
  'Deudas y cobradores': 'credito',
  'Salario o trabajo': 'derechos',
  'Emergencia / ahorro': 'emergencia',
}

const CODE_TO_LABEL: Record<string, string> = {
  credito: 'Subir mi score de crédito',
  casa: 'Comprar casa o carro',
  carro: 'Comprar casa o carro',
  remesas: 'Enviar remesas',
  taxes: 'Pagar menos en taxes',
  derechos: 'Salario o trabajo',
  jubilacion: 'Jubilación',
  emergencia: 'Emergencia / ahorro',
}

/** Normalize onboarding / API input to a safe stored value. */
export function normalizeMayorPreocupacion(raw: unknown): string | null {
  if (raw == null || raw === '') return null
  const s = String(raw).trim()
  if (PREOCUPACIONES_UI.includes(s as (typeof PREOCUPACIONES_UI)[number])) return s
  if (LABEL_TO_CODE[s]) return s
  if (CODE_TO_LABEL[s]) return CODE_TO_LABEL[s]
  return s.slice(0, 200)
}

export function perfilErrorMessage(dbError: string): string {
  if (dbError.includes('perfil_financiero_mayor_preocupacion_check')) {
    return 'No se pudo guardar tu meta. Vuelve a intentar; si persiste, contacta soporte (error de base de datos ya corregido en servidor).'
  }
  if (dbError.includes('credit_score_check')) {
    return 'El score debe estar entre 300 y 850.'
  }
  return dbError
}
