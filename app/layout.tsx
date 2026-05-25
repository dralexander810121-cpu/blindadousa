import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'BlindadoUSA', template: '%s | BlindadoUSA' },
  description: 'La guía financiera y legal más completa para hispanos en USA. Crédito, casa, carro, remesas, taxes, derechos. En español sin mentiras. 3 días gratis.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://blindadousa.com'),
  keywords: ['credito hispanos usa','guia financiera hispanos','derechos hispanos estados unidos','comprar casa hispano usa','prestamos hispanos','score credito español','taxes itin hispanos','subsidios hispanos usa 2026'],
  openGraph: { type: 'website', locale: 'es_US', url: 'https://blindadousa.com', siteName: 'BlindadoUSA', title: 'BlindadoUSA — La Biblia Financiera del Hispano en USA', description: 'Todo lo que necesitas saber para vivir bien en USA. En español, sin mentiras. 3 días gratis.', images:[{ url:'/opengraph-image', width:1200, height:630 }] },
  twitter: { card: 'summary_large_image', site: '@blindadousa', images: ['/twitter-image'] },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
