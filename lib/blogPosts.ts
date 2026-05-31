import { GENERATED_POSTS } from '@/lib/blogPosts.generated'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readMinutes: number
  publishedAt: string
  content: string[]
}

const STATIC_POSTS: BlogPost[] = [
  {
    slug: 'subir-score-credito-90-dias',
    title: 'Como subir tu score de credito en 90 dias',
    excerpt: 'Plan simple para mejorar tu puntaje sin pagar "credit repair".',
    category: 'Credito',
    readMinutes: 6,
    publishedAt: '2026-05-01',
    content: [
      'Empieza por pagar a tiempo todas tus cuentas activas. Un pago tarde puede tumbar muchos puntos.',
      'Baja la utilizacion de tus tarjetas a menos del 30%, idealmente 10%.',
      'No cierres tarjetas viejas si no tienen cuota anual alta: la antiguedad ayuda al score.',
    ],
  },
  {
    slug: 'evitar-estafas-dealer-autos',
    title: 'Como evitar estafas del dealer al comprar carro',
    excerpt: 'Senales de alerta para no aceptar tasas infladas.',
    category: 'Carro',
    readMinutes: 5,
    publishedAt: '2026-05-02',
    content: [
      'Llega con preaprobacion del banco para comparar la tasa real.',
      'Pide la hoja de terminos completa antes de firmar.',
      'Nunca aceptes "extras" en mensualidad sin ver el costo total.',
    ],
  },
  {
    slug: 'hoa-derechos-inquilino-texas',
    title: 'HOA e inquilinos: lo que si puedes reclamar en Texas',
    excerpt: 'Guia rapida de derechos basicos frente a cobros injustos.',
    category: 'Vivienda',
    readMinutes: 7,
    publishedAt: '2026-05-03',
    content: [
      'Guarda todo por escrito: avisos, multas, y respuestas.',
      'Revisa reglas del HOA y leyes estatales para saber si el cobro aplica.',
      'Si hay abuso, busca ayuda legal comunitaria con evidencia organizada.',
    ],
  },
  {
    slug: 'itin-y-taxes-errores-caros',
    title: 'ITIN y taxes: 5 errores que te cuestan miles',
    excerpt: 'Errores comunes al declarar y como prevenirlos.',
    category: 'Taxes',
    readMinutes: 8,
    publishedAt: '2026-05-04',
    content: [
      'No mezcles ingresos personales y de negocio sin registro claro.',
      'Verifica dependientes y documentos antes de enviar.',
      'Si corriges tarde, puedes perder creditos importantes.',
    ],
  },
  {
    slug: 'remesas-impuesto-2026-como-ahorrar',
    title: 'Impuesto de remesas 2026: como pagar menos legalmente',
    excerpt: 'Opciones practicas para reducir comisiones e impuesto.',
    category: 'Remesas',
    readMinutes: 6,
    publishedAt: '2026-05-05',
    content: [
      'Compara proveedores por costo total, no solo por tipo de cambio.',
      'Evita envios en efectivo cuando exista alternativa digital segura.',
      'Consolida envios para reducir frecuencia de comisiones.',
    ],
  },
  {
    slug: 'prestamos-predatorios-senales',
    title: 'Prestamos predatorios: 7 senales para salir corriendo',
    excerpt: 'Aprende a detectar contratos abusivos antes de firmar.',
    category: 'Prestamos',
    readMinutes: 5,
    publishedAt: '2026-05-06',
    content: [
      'Si no te muestran APR real, es alerta roja.',
      'Si te presionan para firmar hoy mismo, no firmes.',
      'Lee penalidades por atraso y costo total del prestamo.',
    ],
  },
  {
    slug: 'fondo-emergencia-1000-primer-paso',
    title: 'Tu primer fondo de emergencia de $1,000',
    excerpt: 'Metodo en 4 semanas para crear tu colchon.',
    category: 'Emergencias',
    readMinutes: 4,
    publishedAt: '2026-05-07',
    content: [
      'Separa una cuenta solo para emergencias.',
      'Automatiza transferencias pequenas semanales.',
      'Recorta 2 gastos temporales hasta completar la meta.',
    ],
  },
  {
    slug: 'negociar-renta-sin-pelea',
    title: 'Como negociar tu renta sin pelear con el landlord',
    excerpt: 'Guion practico para bajar aumentos injustos.',
    category: 'Vivienda',
    readMinutes: 5,
    publishedAt: '2026-05-08',
    content: [
      'Presenta comparables del area con rentas similares.',
      'Ofrece renovar por mas tiempo a cambio de mejor precio.',
      'Mantente por escrito y con tono profesional.',
    ],
  },
  {
    slug: 'cuenta-bancaria-sin-ssn',
    title: 'Abrir cuenta bancaria sin SSN: pasos reales',
    excerpt: 'Documentos y bancos que suelen aceptar ITIN.',
    category: 'Banco',
    readMinutes: 6,
    publishedAt: '2026-05-09',
    content: [
      'Pregunta por requisitos para ITIN antes de ir en persona.',
      'Lleva identificacion vigente y comprobante de domicilio.',
      'Evita cuentas con cargos ocultos mensuales.',
    ],
  },
  {
    slug: 'disputa-reporte-credito-guia',
    title: 'Como disputar errores en tu reporte de credito',
    excerpt: 'Proceso paso a paso para corregir datos incorrectos.',
    category: 'Credito',
    readMinutes: 7,
    publishedAt: '2026-05-10',
    content: [
      'Descarga tu reporte de las 3 agencias y compara.',
      'Marca cuentas que no reconoces y junta evidencia.',
      'Envia disputa por escrito y guarda numero de caso.',
    ],
  },
  {
    slug: 'salario-justo-calculo-hora',
    title: 'Salario justo: como calcular lo que debes cobrar',
    excerpt: 'Formula simple para saber tu tarifa minima.',
    category: 'Trabajo',
    readMinutes: 5,
    publishedAt: '2026-05-11',
    content: [
      'Incluye transporte, comida y costos de salud en tu calculo.',
      'No compares solo sueldo bruto: mira neto real.',
      'Negocia con datos, no con suposiciones.',
    ],
  },
  {
    slug: 'planes-jubilacion-401k-ira',
    title: '401(k), IRA y Roth: cual te conviene primero',
    excerpt: 'Diferencias claras para decidir hoy.',
    category: 'Jubilacion',
    readMinutes: 6,
    publishedAt: '2026-05-12',
    content: [
      'Si tu empresa hace match, empieza por 401(k).',
      'IRA tradicional reduce impuestos hoy; Roth en retiro.',
      'Aporta constante aunque sea poco al inicio.',
    ],
  },
  {
    slug: 'child-tax-credit-como-reclamar',
    title: 'Child Tax Credit: como reclamarlo bien',
    excerpt: 'Evita perder dinero por errores de documentos.',
    category: 'Taxes',
    readMinutes: 5,
    publishedAt: '2026-05-13',
    content: [
      'Confirma elegibilidad de cada dependiente.',
      'Guarda records de escuela y residencia.',
      'Si te rechazan, apela con evidencia completa.',
    ],
  },
  {
    slug: 'seguro-auto-cobertura-minima',
    title: 'Seguro de auto: cobertura minima que no te deje quebrado',
    excerpt: 'Que cubrir para no pagar de tu bolsillo en un choque.',
    category: 'Carro',
    readMinutes: 6,
    publishedAt: '2026-05-14',
    content: [
      'Lo barato puede salir carisimo en un accidente serio.',
      'Compara deducible con tu capacidad de pago real.',
      'Revisa limites de responsabilidad civil.',
    ],
  },
  {
    slug: 'fraudes-comunes-inmigrantes',
    title: 'Fraudes comunes contra inmigrantes y como defenderte',
    excerpt: 'Patrones de estafa y pasos de proteccion.',
    category: 'Derechos',
    readMinutes: 7,
    publishedAt: '2026-05-15',
    content: [
      'Nunca pagues por promesas de resultados garantizados.',
      'Verifica licencias o certificaciones del proveedor.',
      'Reporta fraudes y guarda todos los recibos.',
    ],
  },
  {
    slug: 'historial-credito-con-itin',
    title: 'Construir historial de credito con ITIN',
    excerpt: 'Estrategia realista para empezar desde cero.',
    category: 'Credito',
    readMinutes: 6,
    publishedAt: '2026-05-16',
    content: [
      'Empieza con tarjeta asegurada y uso bajo.',
      'Paga total o puntual cada mes.',
      'Monitorea score para ajustar estrategia.',
    ],
  },
  {
    slug: 'comprar-casa-primeriza-guia',
    title: 'Primera casa en USA: checklist esencial',
    excerpt: 'Lo minimo que debes preparar antes de aplicar.',
    category: 'Vivienda',
    readMinutes: 8,
    publishedAt: '2026-05-17',
    content: [
      'Define presupuesto con pago mensual comodo.',
      'Evita deudas nuevas 3 a 6 meses antes.',
      'Compara prestamos FHA, convencional y asistencia local.',
    ],
  },
  {
    slug: 'negociar-deuda-medica',
    title: 'Como negociar deuda medica sin destruir tu credito',
    excerpt: 'Pasos para reducir deuda hospitalaria.',
    category: 'Salud financiera',
    readMinutes: 6,
    publishedAt: '2026-05-18',
    content: [
      'Pide itemizacion de cargos y errores facturados.',
      'Solicita programas de charity care si calificas.',
      'Acorda plan de pago por escrito.',
    ],
  },
  {
    slug: 'plan-90-dias-finanzas-familia',
    title: 'Plan de 90 dias para ordenar finanzas familiares',
    excerpt: 'Metodo semanal para cortar fugas de dinero.',
    category: 'Planificacion',
    readMinutes: 7,
    publishedAt: '2026-05-19',
    content: [
      'Semana 1: inventario total de ingresos y gastos.',
      'Semana 2-4: recorte de gastos no esenciales.',
      'Mes 2-3: deuda prioritaria y ahorro automatico.',
    ],
  },
  {
    slug: 'aplicar-subsidios-sin-errores',
    title: 'Como aplicar a subsidios sin errores que te rechacen',
    excerpt: 'Checklist de documentos y tiempos.',
    category: 'Subsidios',
    readMinutes: 5,
    publishedAt: '2026-05-20',
    content: [
      'Completa formularios con la misma informacion en todos.',
      'No omitas ingresos ni miembros del hogar.',
      'Entrega antes de fecha limite y guarda comprobante.',
    ],
  },
]

// Artículos estáticos + generados por IA (SEO long-tail para hispanos)
export const BLOG_POSTS: BlogPost[] = [...STATIC_POSTS, ...GENERATED_POSTS]

export const BLOG_POSTS_BY_SLUG = new Map(BLOG_POSTS.map((post) => [post.slug, post]))
