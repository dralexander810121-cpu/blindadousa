/**
 * Catálogo único de producto — fuente de verdad para marketing, precios y "qué incluye".
 */

export const MODULE_COUNT = 13

export const MODULE_COUNT_LABEL = `${MODULE_COUNT} módulos + IA Maestra`

export type PlanIncludeStatus = 'ready' | 'partial' | 'planned'

export type PlanIncludeRow = {
  name: string
  href: string
  status: PlanIncludeStatus
  note: string
}

export const PLAN_INCLUDES: PlanIncludeRow[] = [
  { name: 'Comprar carro (anti-dealer)', href: '/dashboard/carro', status: 'ready', note: 'Calculadora APR, trucos y regla 20/4/10' },
  { name: 'Remesas 2026', href: '/dashboard/remesas', status: 'ready', note: 'Impuesto 1% y métodos sin recargo' },
  { name: 'Subsidios (Texas)', href: '/dashboard/subsidios', status: 'ready', note: 'Quiz de elegibilidad + programas' },
  { name: 'Disputas de crédito (IA)', href: '/dashboard/credito/disputas', status: 'ready', note: 'Análisis FCRA + carta bilingüe' },
  { name: 'Escáner de contratos', href: '/dashboard/documentos', status: 'ready', note: 'Foto o texto → riesgos y reclamo' },
  { name: 'Cartas legales', href: '/dashboard/credito/cartas', status: 'ready', note: 'Historial de cartas generadas' },
  { name: 'Taxes e ITIN', href: '/dashboard/taxes', status: 'ready', note: 'Guías y organización (no e-file)' },
  { name: 'Comprar casa', href: '/dashboard/casa', status: 'ready', note: 'Hipoteca y derechos del comprador' },
  { name: 'Salario y trabajo', href: '/dashboard/trabajo', status: 'ready', note: 'Horas extra y derechos laborales' },
  { name: 'Emergencias 90 días', href: '/dashboard/emergencia', status: 'ready', note: 'Fondo y plan de acción' },
  { name: 'Mis derechos', href: '/dashboard/derechos', status: 'ready', note: 'Inquilino, trabajo, salud' },
  { name: 'Mi primera cuenta (banco)', href: '/dashboard/banco', status: 'ready', note: 'Tabla ITIN/pasaporte y pasos' },
  { name: 'IA Maestra 24/7', href: '/dashboard/asistente', status: 'ready', note: 'Chat en español con contexto USA' },
  { name: 'Crédito — estrategia / simulador', href: '/dashboard/credito/estrategia', status: 'partial', note: 'Usa IA Maestra mientras se expande' },
  { name: 'Conectar banco (Plaid)', href: '/dashboard', status: 'partial', note: 'En panel principal y tarjetas' },
  { name: 'Alertas WhatsApp', href: '/dashboard/configuracion', status: 'partial', note: 'Opt-in en configuración' },
  { name: 'Referidos $5 ACH', href: '/dashboard/referidos', status: 'partial', note: 'Requiere cuenta conectada y pago activo' },
  { name: 'Resumen anual PDF', href: '/precios', status: 'planned', note: 'Incluido en plan anual — próxima entrega' },
]

export const FIRST_10_MINUTES = [
  {
    step: 1,
    title: 'Calcula tu carro',
    body: 'Mira tu pago real y los trucos del dealer antes de firmar nada.',
    href: '/dashboard/carro',
    cta: 'Abrir calculadora',
  },
  {
    step: 2,
    title: 'Revisa tus remesas',
    body: 'Calcula si el impuesto del 1% te aplica y cómo evitarlo.',
    href: '/dashboard/remesas',
    cta: 'Calcular remesas',
  },
  {
    step: 3,
    title: 'Pregunta a la IA Maestra',
    body: 'Ejemplo: “¿Qué carta uso si un cobrador me llama?”',
    href: '/dashboard/asistente',
    cta: 'Abrir asistente',
    prompt: '¿Qué carta uso si un cobrador me llama?',
  },
] as const

export const STATUS_LABELS: Record<PlanIncludeStatus, string> = {
  ready: 'Listo',
  partial: 'Parcial',
  planned: 'Próximamente',
}
