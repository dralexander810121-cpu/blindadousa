import Link from 'next/link'
import { BrandLogo } from '@/components/brand/BrandLogo'

const COLS = [
  {
    title: 'Producto',
    links: [
      { href: '/como-funciona', label: 'Cómo funciona' },
      { href: '/precios', label: 'Precios' },
      { href: '/que-incluye', label: 'Qué incluye' },
      { href: '/trial', label: 'Prueba gratis' },
      { href: '/dashboard/asistente', label: 'Asistente IA' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/directorio', label: 'Directorio' },
      { href: '/dashboard/credito', label: 'Crédito' },
      { href: '/dashboard/taxes', label: 'Taxes e ITIN' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/terminos', label: 'Términos' },
      { href: '/privacidad', label: 'Privacidad' },
      { href: '/descargo', label: 'Descargo' },
    ],
  },
  {
    title: 'Ecosistema',
    links: [
      { href: '/alexanderfigueredo', label: 'Dr. Alexander Figueredo' },
      { href: '/figueredomed', label: 'FigueredoMed · salud' },
      { href: '/aetheris', label: 'Aetheris Med' },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="marketing-footer" role="contentinfo">
      <div className="marketing-footer-grid">
        <div>
          <BrandLogo href="/inicio" size="lg" className="mb-3" />
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
            La IA que protege, guía y administra la vida financiera del hispano en USA.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="footer-heading">{col.title}</p>
            {col.links.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="marketing-footer-bottom">
        <p>© {new Date().getFullYear()} BlindadoUSA · Houston, TX</p>
        <p className="max-w-xl text-right leading-relaxed">
          Herramienta educativa. No constituye asesoría legal, contable ni financiera certificada.
        </p>
      </div>
    </footer>
  )
}
