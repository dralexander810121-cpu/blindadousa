import Link from 'next/link'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { Button3D } from '@/components/ui/Button3D'
import { PRICING } from '@/lib/siteFacts'

const LINKS = [
  { href: '/inicio', label: 'Inicio' },
  { href: '/como-funciona', label: 'Cómo Funciona' },
  { href: '/precios', label: 'Planes' },
  { href: '/que-incluye', label: 'Qué incluye' },
  { href: '/directorio', label: 'Directorio' },
  { href: '/blog', label: 'Blog' },
]

const SUBNAV = [
  { href: '/trial', label: 'Trial' },
  { href: '/precios', label: 'Precios' },
  { href: '/alexanderfigueredo', label: 'Dr. Figueredo' },
  { href: '/figueredomed', label: 'FigueredoMed' },
  { href: '/aetheris', label: 'Aetheris' },
  { href: 'https://market.figueredomed.com', label: '🛒 Market', external: true },
  { href: 'https://figueredomed.com/aetheris-game', label: '🎮 Aetheris Game', external: true },
]

export function MarketingNav() {
  return (
    <header className="marketing-nav" role="banner">
      <div className="marketing-nav-inner">
        <BrandLogo size="md" priority />

        <nav className="marketing-nav-links" aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="ux-focus-ring">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="marketing-nav-actions">
          <Button3D href="/entrar" variant="glass" className="!min-h-[44px] !py-2.5 !px-5 !text-sm">
            Entrar
          </Button3D>
          <Button3D href="/trial" variant="gold" pulse className="!min-h-[44px] !py-2.5 !px-5 !text-sm">
            {PRICING.trialDays} días gratis →
          </Button3D>
        </div>
      </div>

      <nav className="marketing-nav-mobile" aria-label="Menú móvil">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>

      <nav className="marketing-subnav" aria-label="Accesos rápidos">
        {SUBNAV.map((l) =>
          l.external ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ) : (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          )
        )}
      </nav>
    </header>
  )
}
