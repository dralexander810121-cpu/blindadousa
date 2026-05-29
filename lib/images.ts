import {
  banana2Jpg,
  banana2Png,
  banana2ScaffoldSvg,
  BLINDADO_BANANA2,
  BLINDADO_BY_SLUG,
  type Banana2Spec,
} from '@/lib/banana2pro'

/** Imagen 4K única por sección — Banana 2 JPG + SVG holo de respaldo. */
function b2(spec: Banana2Spec) {
  return banana2Jpg(spec.slug)
}

export const B2_FALLBACK: Record<string, string> = Object.fromEntries(
  BLINDADO_BANANA2.map((s) => [
    s.slug,
    banana2ScaffoldSvg(s.scaffold ?? s.slug),
  ]),
)

export const IMG = {
  logo: '/images/blindadousa-logo.png',
  hero: b2(BLINDADO_BY_SLUG.hero),
  ia_dios: b2(BLINDADO_BY_SLUG['ia-dios']),
  problema: b2(BLINDADO_BY_SLUG.problema),
  herramientas: b2(BLINDADO_BY_SLUG.herramientas),
  precio: b2(BLINDADO_BY_SLUG.precio),
  directorio: b2(BLINDADO_BY_SLUG.directorio),
  testimonios: b2(BLINDADO_BY_SLUG.testimonios),
  cta_final: b2(BLINDADO_BY_SLUG['cta-final']),
  login: b2(BLINDADO_BY_SLUG.auth),
  registro: b2(BLINDADO_BY_SLUG.auth),
  pagar: b2(BLINDADO_BY_SLUG.pago),
  exito: b2(BLINDADO_BY_SLUG.exito),
  credito: b2(BLINDADO_BY_SLUG.credito),
  casa: b2(BLINDADO_BY_SLUG.casa),
  carro: b2(BLINDADO_BY_SLUG.carro),
  remesas: b2(BLINDADO_BY_SLUG.remesas),
  prestamos: b2(BLINDADO_BY_SLUG.prestamos),
  jubilacion: b2(BLINDADO_BY_SLUG.jubilacion),
  banco: b2(BLINDADO_BY_SLUG.banco),
  trabajo: b2(BLINDADO_BY_SLUG.trabajo),
  taxes: b2(BLINDADO_BY_SLUG.taxes),
  emergencia: b2(BLINDADO_BY_SLUG.emergencia),
  derechos: b2(BLINDADO_BY_SLUG.derechos),
  subsidios: b2(BLINDADO_BY_SLUG.subsidios),
  asistente: b2(BLINDADO_BY_SLUG.asistente),
  seguros: b2(BLINDADO_BY_SLUG.seguros),
  referidos: b2(BLINDADO_BY_SLUG.referidos),
  blog: b2(BLINDADO_BY_SLUG.blog),
  como_funciona: b2(BLINDADO_BY_SLUG['como-funciona']),
  legal: b2(BLINDADO_BY_SLUG.legal),
  trial: b2(BLINDADO_BY_SLUG.trial),
  negocios: b2(BLINDADO_BY_SLUG.negocios),
  documentos: b2(BLINDADO_BY_SLUG.documentos),
  dir_abogados: b2(BLINDADO_BY_SLUG['dir-abogados']),
  dir_notarios: b2(BLINDADO_BY_SLUG['dir-notarios']),
  dir_dealers: b2(BLINDADO_BY_SLUG['dir-dealers']),
  dir_bancos: b2(BLINDADO_BY_SLUG['dir-bancos']),
  dir_taxes: b2(BLINDADO_BY_SLUG['dir-taxes']),
  dir_clinicas: b2(BLINDADO_BY_SLUG['dir-clinicas']),
  dir_seguros: b2(BLINDADO_BY_SLUG['dir-seguros']),
  dir_realtors: b2(BLINDADO_BY_SLUG['dir-realtors']),
} as const

export type ImageKey = keyof typeof IMG

/** Slug Banana 2 asociado a una clave IMG (para fallback en ImageHero4K). */
export function fallbackForImageKey(key: ImageKey): string {
  const map: Partial<Record<ImageKey, string>> = {
    ia_dios: B2_FALLBACK['ia-dios'],
    problema: B2_FALLBACK.problema,
    herramientas: B2_FALLBACK.herramientas,
    precio: B2_FALLBACK.precio,
    directorio: B2_FALLBACK.directorio,
    testimonios: B2_FALLBACK.testimonios,
    cta_final: B2_FALLBACK['cta-final'],
    login: B2_FALLBACK.auth,
    registro: B2_FALLBACK.auth,
    pagar: B2_FALLBACK.pago,
    exito: B2_FALLBACK.exito,
    credito: B2_FALLBACK.credito,
    casa: B2_FALLBACK.casa,
    carro: B2_FALLBACK.carro,
    remesas: B2_FALLBACK.remesas,
    prestamos: B2_FALLBACK.prestamos,
    jubilacion: B2_FALLBACK.jubilacion,
    banco: B2_FALLBACK.banco,
    trabajo: B2_FALLBACK.trabajo,
    taxes: B2_FALLBACK.taxes,
    emergencia: B2_FALLBACK.emergencia,
    derechos: B2_FALLBACK.derechos,
    subsidios: B2_FALLBACK.subsidios,
    asistente: B2_FALLBACK.asistente,
    seguros: B2_FALLBACK.seguros,
    referidos: B2_FALLBACK.referidos,
    blog: B2_FALLBACK.blog,
    como_funciona: B2_FALLBACK['como-funciona'],
    legal: B2_FALLBACK.legal,
    trial: B2_FALLBACK.trial,
    negocios: B2_FALLBACK.negocios,
    documentos: B2_FALLBACK.documentos,
    dir_abogados: B2_FALLBACK['dir-abogados'],
    dir_notarios: B2_FALLBACK['dir-notarios'],
    dir_dealers: B2_FALLBACK['dir-dealers'],
    dir_bancos: B2_FALLBACK['dir-bancos'],
    dir_taxes: B2_FALLBACK['dir-taxes'],
    dir_clinicas: B2_FALLBACK['dir-clinicas'],
    dir_seguros: B2_FALLBACK['dir-seguros'],
    dir_realtors: B2_FALLBACK['dir-realtors'],
  }
  return map[key] ?? B2_FALLBACK.hero
}

/** Capas de respaldo: PNG Stitch → SVG holo. */
export function banana2FallbacksForPrimary(url: string): string[] {
  const m = url.match(/\/banana2pro\/([\w-]+)-4k\.jpg$/)
  if (!m) return []
  const slug = m[1]
  const spec = BLINDADO_BY_SLUG[slug]
  return [
    banana2Png(slug),
    B2_FALLBACK[slug] ?? banana2ScaffoldSvg(spec?.scaffold ?? 'hero'),
  ]
}

/** @deprecated Usar banana2FallbacksForPrimary */
export function banana2FallbackForPrimary(url: string): string | undefined {
  return banana2FallbacksForPrimary(url)[0]
}
