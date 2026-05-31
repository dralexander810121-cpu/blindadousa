/** Datos publicados verificables — no testimonios ni métricas inventadas. */
export const SITE_STATS = [
  {
    value: '65M+',
    label: 'hispanos en EE.UU.',
    source: 'U.S. Census Bureau',
  },
  {
    value: '$20',
    label: 'plan mensual publicado',
    source: 'Precio en /precios',
  },
  {
    value: '13',
    label: 'módulos en el dashboard',
    source: 'Menú del producto',
  },
  {
    value: '21',
    label: 'guías en el blog',
    source: 'Artículos publicados',
  },
] as const

export const PRICING = {
  trialDays: 3,
  monthly: 20,
  annual: 100,
  annualPerMonth: 8.33,
  annualSavings: 140,
  referralPayout: 5,
} as const

export const FEATURED_TOOLS = [
  { n: '01', t: 'Calculadora Anti-Abuso de Carro', d: 'APR real y trucos del dealer.', href: '/dashboard/carro' },
  { n: '02', t: 'Escáner de Contratos', d: 'Sube foto: la IA detecta cláusulas abusivas.', href: '/dashboard/documentos' },
  { n: '03', t: 'Carta de Disputa de Crédito', d: 'Formato FCRA listo para enviar.', href: '/dashboard/credito/disputas' },
  { n: '04', t: 'Carta al Cobrador', d: 'Validación de deuda y cese de llamadas.', href: '/dashboard/credito/cartas' },
  { n: '05', t: 'Reclamo al Landlord', d: 'Derechos de inquilino en Texas.', href: '/dashboard/derechos' },
  { n: '06', t: 'Checklist Compra de Carro', d: 'Pasos antes de firmar.', href: '/dashboard/carro' },
  { n: '07', t: 'Taxes con ITIN', d: 'Créditos EITC y Child Tax Credit.', href: '/dashboard/taxes' },
  { n: '08', t: 'Disputas de crédito', d: 'Análisis FCRA + carta bilingüe.', href: '/dashboard/credito/disputas' },
  { n: '09', t: 'Directorio verificado', d: 'Profesionales hispanos en Texas.', href: '/directorio' },
  { n: '10', t: 'Onboarding personalizado', d: 'Ruta según tu situación.', href: '/trial' },
] as const

export const TRUST_SIGNALS = [
  {
    title: 'Pagos con Stripe',
    body: 'Suscripciones procesadas con infraestructura PCI de Stripe. Sin almacenar datos de tarjeta en nuestros servidores.',
    href: '/precios',
    cta: 'Ver planes',
  },
  {
    title: 'Contenido educativo verificable',
    body: '21 guías publicadas sobre crédito, vivienda, taxes y derechos. Sin promesas de resultados garantizados.',
    href: '/blog',
    cta: 'Leer el blog',
  },
  {
    title: 'Transparencia legal',
    body: 'Descargo, términos y privacidad publicados. Herramienta educativa, no sustituye asesoría licenciada.',
    href: '/descargo',
    cta: 'Leer descargo',
  },
] as const

export const IA_MODULES = [
  { icon: '🏛️', t: 'Cartas legales', d: 'Disputas, cobradores, landlords e IRS.', href: '/dashboard/credito/cartas' },
  { icon: '📊', t: 'Taxes e ITIN', d: 'Organiza deducciones y créditos tributarios.', href: '/dashboard/taxes' },
  { icon: '💰', t: 'Préstamos seguros', d: 'Detecta APR abusivo antes de firmar.', href: '/dashboard/prestamos' },
  { icon: '🏦', t: 'Mi Banco', d: 'Cuentas, tarjetas y fechas de corte.', href: '/dashboard/banco' },
  { icon: '🛡️', t: 'Mis Derechos', d: 'Qué hacer en redadas, trabajo y salud.', href: '/dashboard/derechos' },
  { icon: '📋', t: 'Documentos IA', d: 'Escanea contratos y facturas médicas.', href: '/dashboard/documentos' },
  { icon: '🏠', t: 'Comprar Casa', d: 'FHA, VA, USDA y checklist de cierre.', href: '/dashboard/casa' },
  { icon: '💸', t: 'Remesas 2026', d: 'Calcula el impuesto del 1% y cómo evitarlo.', href: '/dashboard/remesas' },
  { icon: '📱', t: 'Alertas WhatsApp', d: 'Configura avisos de pagos y cargos.', href: '/dashboard/configuracion' },
  { icon: '🤖', t: 'IA Maestra 24/7', d: 'Pregunta en español y recibe pasos concretos.', href: '/dashboard/asistente' },
] as const

export const PRODUCT_MODULES = [
  { label: 'Crédito y disputas', href: '/dashboard/credito' },
  { label: 'Comprar casa', href: '/dashboard/casa' },
  { label: 'Comprar carro', href: '/dashboard/carro' },
  { label: 'Remesas 2026', href: '/dashboard/remesas' },
  { label: 'Préstamos seguros', href: '/dashboard/prestamos' },
  { label: 'Jubilación 401K', href: '/dashboard/jubilacion' },
  { label: 'Banco e ITIN', href: '/dashboard/banco' },
  { label: 'Salario justo', href: '/dashboard/trabajo' },
  { label: 'Taxes', href: '/dashboard/taxes' },
  { label: 'Emergencias', href: '/dashboard/emergencia' },
  { label: 'Derechos legales', href: '/dashboard/derechos' },
  { label: 'Subsidios', href: '/dashboard/subsidios' },
  { label: 'Asistente IA 24/7', href: '/dashboard/asistente' },
] as const
