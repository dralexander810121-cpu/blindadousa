/**
 * Banana 2 (Nano Banana 2) — fondos 4K holo del sello Alex Figueredo.
 * Modelo: gemini-3.1-flash-image-preview · generar con `npm run images:banana2`
 */
export const BANANA2_DIR = '/images/banana2pro' as const

/** Modelo Google AI Studio / Gemini API */
export const BANANA2_MODEL = 'gemini-3.1-flash-image-preview'

export const BANANA2_STYLE =
  'Cinematic 4K 16:9 background plate for a dark fintech web app. ' +
  'Palette: deep navy #02070F, cyan holo glow #22d3ee, subtle gold accents, faint grid lines. ' +
  'No text, no logos, no watermarks, no readable faces. High contrast for dark UI overlay. Theme:'

export type Banana2Spec = {
  slug: string
  prompt: string
  /** SVG holo existente si aún no hay JPG */
  scaffold?: string
}

/** BlindadoUSA — un slug = una imagen (REGLA: sin repetir en rutas visibles). */
export const BLINDADO_BANANA2: Banana2Spec[] = [
  { slug: 'hero', prompt: 'Hispanic family financial freedom, city skyline at night, shield motif abstract', scaffold: 'hero' },
  { slug: 'ia-dios', prompt: 'AI neural network orb over financial dashboard hologram', scaffold: 'ia' },
  { slug: 'problema', prompt: 'Stressed bills and debt papers transforming into organized folders', scaffold: 'tools' },
  { slug: 'herramientas', prompt: 'Grid of financial tools icons abstract, calculator wallet house car', scaffold: 'tools' },
  { slug: 'precio', prompt: 'Premium subscription tiers abstract, coins and shield pricing', scaffold: 'pricing' },
  { slug: 'directorio', prompt: 'Map pins connecting Hispanic businesses across USA', scaffold: 'directory' },
  { slug: 'testimonios', prompt: 'Warm community success stories abstract silhouettes cyan rim light', scaffold: 'testimonials' },
  { slug: 'cta-final', prompt: 'Sunrise over American suburbs, hopeful financial new beginning', scaffold: 'cta' },
  { slug: 'auth', prompt: 'Secure login vault door, biometric glow abstract', scaffold: 'auth' },
  { slug: 'pago', prompt: 'Secure payment checkout shield with card chip abstract', scaffold: 'auth' },
  { slug: 'exito', prompt: 'Celebration confetti minimal, green checkmark hologram success', scaffold: 'cta' },
  { slug: 'credito', prompt: 'Credit score meter rising, credit cards and report holographic', scaffold: 'hero' },
  { slug: 'casa', prompt: 'House keys and suburban home golden hour, mortgage abstract', scaffold: 'directory' },
  { slug: 'carro', prompt: 'Modern sedan at dealership, auto loan financing abstract', scaffold: 'tools' },
  { slug: 'remesas', prompt: 'Money transfer LATAM to USA, remittance corridors glowing', scaffold: 'hero' },
  { slug: 'prestamos', prompt: 'Loan documents and APR calculator holographic warning safe lending', scaffold: 'pricing' },
  { slug: 'jubilacion', prompt: 'Retirement nest egg, 401k growth chart sunset years', scaffold: 'pricing' },
  { slug: 'banco', prompt: 'Mobile banking app interface abstract, Plaid connection glow', scaffold: 'hero' },
  { slug: 'trabajo', prompt: 'Workplace rights, paycheck and labor law scales abstract', scaffold: 'tools' },
  { slug: 'taxes', prompt: 'Tax forms W-2 1040 ITIN paperwork organized holographic', scaffold: 'auth' },
  { slug: 'emergencia', prompt: 'Emergency fund umbrella, crisis preparedness calm cyan light', scaffold: 'cta' },
  { slug: 'derechos', prompt: 'Legal rights scales gavel documents consumer protection', scaffold: 'directory' },
  { slug: 'subsidios', prompt: 'Government benefits assistance programs helping hands abstract', scaffold: 'testimonials' },
  { slug: 'asistente', prompt: 'AI chat assistant orb helping with documents Spanish English', scaffold: 'ia' },
  { slug: 'seguros', prompt: 'Health auto insurance shield policies family protection', scaffold: 'directory' },
  { slug: 'referidos', prompt: 'Referral network friends sharing rewards chain glow', scaffold: 'testimonials' },
  { slug: 'blog', prompt: 'Educational articles financial literacy open book holographic', scaffold: 'tools' },
  { slug: 'como-funciona', prompt: 'Three step onboarding journey path arrows abstract', scaffold: 'tools' },
  { slug: 'legal', prompt: 'Legal documents privacy terms abstract courthouse minimal', scaffold: 'auth' },
  { slug: 'trial', prompt: 'Free trial countdown gift box premium unlock', scaffold: 'cta' },
  { slug: 'negocios', prompt: 'B2B Hispanic small business storefront growth dashboard', scaffold: 'directory' },
  { slug: 'documentos', prompt: 'Folder of personal financial documents organized secure', scaffold: 'tools' },
  { slug: 'dir-abogados', prompt: 'Law office gavel legal counsel Hispanic community', scaffold: 'directory' },
  { slug: 'dir-notarios', prompt: 'Notary stamp official documents signing desk', scaffold: 'directory' },
  { slug: 'dir-dealers', prompt: 'Car dealership lot neon signs auto dealers', scaffold: 'tools' },
  { slug: 'dir-bancos', prompt: 'Bank branch ITIN friendly banking abstract', scaffold: 'hero' },
  { slug: 'dir-taxes', prompt: 'Tax preparer office seasonal filing organized', scaffold: 'auth' },
  { slug: 'dir-clinicas', prompt: 'Community clinic healthcare access charity care', scaffold: 'directory' },
  { slug: 'dir-seguros', prompt: 'Insurance agents office policies health auto', scaffold: 'directory' },
  { slug: 'dir-realtors', prompt: 'Real estate agent keys sold sign neighborhood', scaffold: 'directory' },
]

export function banana2File(slug: string, ext: 'jpg' | 'webp' | 'png' | 'svg') {
  return `${BANANA2_DIR}/${slug}-4k.${ext}`
}

export function banana2Jpg(slug: string) {
  return banana2File(slug, 'jpg')
}

export function banana2Png(slug: string) {
  return banana2File(slug, 'png')
}

export function banana2ScaffoldSvg(scaffold: string) {
  return banana2File(scaffold, 'svg')
}

export function fullBanana2Prompt(spec: Banana2Spec) {
  return `${BANANA2_STYLE} ${spec.prompt}`
}

/** Mapa slug → spec para scripts */
export const BLINDADO_BY_SLUG = Object.fromEntries(
  BLINDADO_BANANA2.map((s) => [s.slug, s]),
) as Record<string, Banana2Spec>
