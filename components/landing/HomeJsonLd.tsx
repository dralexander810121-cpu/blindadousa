import { SEO_CONFIG } from '@/lib/seo/metadata'

const FAQ = [
  {
    q: '¿Qué es BlindadoUSA?',
    a: 'Una plataforma educativa con IA en español para organizar tu vida financiera en USA: crédito, taxes, casa, carro, derechos y documentos. No reemplaza a un abogado ni contador licenciado.',
  },
  {
    q: '¿Cuánto cuesta BlindadoUSA?',
    a: 'Trial de 3 días gratis sin tarjeta. Después $20 al mes o $100 al año (equivale a $8.33/mes y ahorras $140).',
  },
  {
    q: '¿Necesito tarjeta de crédito para el trial?',
    a: 'No. Activas 3 días de acceso completo solo con email y contraseña.',
  },
  {
    q: '¿Cómo funcionan los referidos?',
    a: 'Recibes un código único al pagar. Por cada amigo que se suscribe, depositamos $5 en tu cuenta bancaria vía ACH. Sin límite de referidos.',
  },
  {
    q: '¿BlindadoUSA es un abogado o contador certificado?',
    a: 'No. Es una plataforma educativa con IA que te ayuda a organizar tu caso y tomar decisiones informadas. Para casos específicos consulta un profesional licenciado.',
  },
]

export function HomeJsonLd() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/blindadousa-logo.png`,
    description: SEO_CONFIG.defaultDescription,
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsLanguage: ['es', 'en'],
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SEO_CONFIG.siteName,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Trial 3 días gratis',
      },
      {
        '@type': 'Offer',
        price: '20',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '20',
          priceCurrency: 'USD',
          billingDuration: 'P1M',
        },
      },
      {
        '@type': 'Offer',
        price: '100',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '100',
          priceCurrency: 'USD',
          billingDuration: 'P1Y',
        },
      },
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    inLanguage: 'es-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SEO_CONFIG.siteUrl}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const schemas = [orgSchema, websiteSchema, productSchema, faqSchema]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export { FAQ as HOME_FAQ }
