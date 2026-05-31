import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { HoloShell } from '@/components/brand/HoloShell'
import { IMG } from '@/lib/images'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'BlindadoUSA', template: '%s | BlindadoUSA' },
  description: 'Guardaespaldas financiero con IA para hispanos en USA. Crédito, taxes, derechos, casa y carro en español. Trial 3 días gratis · $20/mes · $100/año.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'),
  icons: {
    icon: IMG.logo,
    apple: IMG.logo,
  },
  keywords: ['credito hispanos usa','guia financiera hispanos','derechos hispanos estados unidos','comprar casa hispano usa','prestamos hispanos','score credito español','taxes itin hispanos','subsidios hispanos usa 2026'],
  openGraph: { type: 'website', locale: 'es_US', url: 'https://blindadousa.com', siteName: 'BlindadoUSA', title: 'BlindadoUSA — Guardaespaldas financiero con IA', description: 'IA educativa en español: crédito, taxes, casa y derechos. Trial 3 días gratis.', images:[{ url:'/opengraph-image', width:1200, height:630 }] },
  twitter: { card: 'summary_large_image', site: '@blindadousa', images: ['/twitter-image'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0a0e14',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BlindadoUSA',
    url: 'https://blindadousa.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'}${IMG.logo}`,
    sameAs: ['https://x.com/blindadousa'],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BlindadoUSA',
    url: 'https://blindadousa.com',
    inLanguage: 'es-US',
  }

  return (
    <html lang="es-US">
      <body className="holo-global antialiased">
        <HoloShell>
          <Script
            id="ld-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
          <Script
            id="ld-website"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          {children}
        </HoloShell>
      </body>
    </html>
  )
}
