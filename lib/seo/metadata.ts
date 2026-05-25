import type { Metadata } from 'next'

export const SEO_CONFIG = {
  siteName: 'BlindadoUSA',
  siteUrl: 'https://blindadousa.com',
  defaultTitle: 'BlindadoUSA — La guía financiera y legal del hispano en USA',
  defaultDescription:
    'Crédito, casa, carro, remesas, taxes, derechos. En español sin mentiras. Prueba gratis 3 días. $20 de por vida (con código AETHERIS: $15).',
  twitterHandle: '@blindadousa',
  locale: 'es_US',
  keywords: [
    'credito hispanos usa',
    'guia financiera hispanos',
    'derechos hispanos estados unidos',
    'comprar casa hispano usa',
    'prestamos hispanos',
    'remesas impuesto 2026',
    'score credito español',
    'taxes itin hispanos',
    'subsidios hispanos usa',
    'salario justo hispanos texas',
  ],
}

export const PAGE_SEO = {
  home: {
    title: 'BlindadoUSA — La biblia financiera del hispano en USA | $20 de por vida',
    description: 'La guía más completa en español para hispanos en Estados Unidos. Crédito, casa, carro, remesas, taxes, tus derechos. Solo $20 — con código AETHERIS $15.',
    path: '/',
  },
  comoFunciona: {
    title: 'Cómo funciona BlindadoUSA — 13 módulos en español',
    description: 'Conoce los 13 módulos de BlindadoUSA: crédito, casa, carro, remesas, préstamos, jubilación, banco, trabajo, taxes, emergencia, derechos, subsidios y asistente IA.',
    path: '/como-funciona',
  },
  precios: {
    title: 'Precios — $20 de por vida o $15 con código | BlindadoUSA',
    description: 'Acceso de por vida a todos los módulos por solo $20. Con código AETHERIS o un código de referido pagás solo $15.',
    path: '/precios',
  },
  trial: {
    title: 'Activa tu prueba gratis de 3 días | BlindadoUSA',
    description: '3 días gratis sin tarjeta. Acceso completo a los 13 módulos y al asistente IA.',
    path: '/trial',
  },
  credito: {
    title: 'Mejorar tu crédito en USA — Guía completa en español | BlindadoUSA',
    description: 'Aprende a subir tu score de crédito FICO paso a paso. Disputas, cartas, calculadoras. En español, sin jerga.',
    path: '/dashboard/credito',
  },
  casa: {
    title: 'Comprar casa en USA siendo hispano — Calculadora y guía legal | BlindadoUSA',
    description: 'Calculadora de hipoteca, tipos de préstamo FHA/VA/USDA, tus derechos al comprar casa. Lo que el realtor no te dice. En español.',
    path: '/dashboard/casa',
  },
  carro: {
    title: 'Comprar carro en USA — Tasa justa por score y calculadora | BlindadoUSA',
    description: 'Calcula tu pago mensual, conoce tu tasa real según tu crédito, y lo que el dealer no puede hacerte. En español.',
    path: '/dashboard/carro',
  },
  remesas: {
    title: 'Enviar dinero a tu familia — Impuesto remesas 2026 y cómo evitarlo | BlindadoUSA',
    description: 'El impuesto del 1% sobre remesas ya está activo. Calcula cuánto perdés y cómo evitarlo legalmente. Comparador de servicios en español.',
    path: '/dashboard/remesas',
  },
  prestamos: {
    title: 'Préstamos predatorios — Escáner IA para detectar estafas | BlindadoUSA',
    description: 'Analizá cualquier préstamo con IA. Detecta tasas abusivas, payday loans, title loans. Alternativas legales en Texas.',
    path: '/dashboard/prestamos',
  },
  jubilacion: {
    title: 'Jubilación para hispanos en USA — 401K, IRA, Roth | BlindadoUSA',
    description: 'Calcula cuánto necesitás para retirarte. 401K vs IRA vs Roth IRA explicados sin jerga. Aprovechá el interés compuesto.',
    path: '/dashboard/jubilacion',
  },
  banco: {
    title: 'Abrir cuenta de banco sin SSN — Bancos que aceptan ITIN | BlindadoUSA',
    description: 'Lista de bancos en USA que aceptan ITIN, pasaporte o matrícula consular. Guía paso a paso para abrir tu primera cuenta.',
    path: '/dashboard/banco',
  },
  trabajo: {
    title: 'Salario justo y derechos laborales — Hispanos en Texas | BlindadoUSA',
    description: '¿Te pagan lo justo? Calculadora de salario por ocupación. Robo de salario. Derechos laborales en Texas.',
    path: '/dashboard/trabajo',
  },
  taxes: {
    title: 'Taxes e ITIN para hispanos en USA — Guía completa 2026 | BlindadoUSA',
    description: 'Cómo declarar impuestos con o sin SSN, qué créditos reclamar (EITC, Child Tax Credit), calculadora de devolución.',
    path: '/dashboard/taxes',
  },
  emergencia: {
    title: 'Fondo de emergencia — Plan de 90 días con IA | BlindadoUSA',
    description: '¿Cuánto sobrevivirías sin trabajo? Plan personalizado de 90 días para construir tu fondo de emergencia.',
    path: '/dashboard/emergencia',
  },
  derechos: {
    title: 'Tus derechos legales en USA — Guía para hispanos | BlindadoUSA',
    description: 'Derechos laborales, como inquilino, en el hospital, con la policía, con ICE. Lo que nadie te explica. En español.',
    path: '/dashboard/derechos',
  },
  subsidios: {
    title: 'Subsidios y ayudas para hispanos en USA 2026 | BlindadoUSA',
    description: 'SNAP, Medicaid, Section 8, WIC y más. Descubre a qué ayudas calificas y cómo aplicar sin afectar tu estatus migratorio.',
    path: '/dashboard/subsidios',
  },
  asistente: {
    title: 'Asistente IA Blindado — Chat 24/7 en español | BlindadoUSA',
    description: 'Pregúntale a Blindado cualquier duda sobre crédito, casa, taxes, derechos. Respuestas en español, 24 horas al día.',
    path: '/dashboard/asistente',
  },
  directorio: {
    title: 'Directorio de profesionales en español — Hispanos USA | BlindadoUSA',
    description: 'Abogados de inmigración, bancos, dealers, realtors y notarios verificados que hablan español. Buscá por ciudad.',
    path: '/directorio',
  },
  blog: {
    title: 'Blog BlindadoUSA — Educación financiera y legal en español',
    description: 'Artículos en español sobre crédito, derechos, taxes, casa, carro y más para hispanos en USA.',
    path: '/blog',
  },
}

export type SeoPageKey = keyof typeof PAGE_SEO

/** Construye Metadata Next.js completo para una página. */
export function pageMetadata(key: SeoPageKey, overrides?: Partial<Metadata>): Metadata {
  const p = PAGE_SEO[key]
  const canonical = SEO_CONFIG.siteUrl + p.path
  return {
    title: p.title,
    description: p.description,
    keywords: SEO_CONFIG.keywords,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: SEO_CONFIG.locale,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      title: p.title,
      description: p.description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SEO_CONFIG.siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description,
      images: ['/twitter-image'],
    },
    ...overrides,
  }
}
