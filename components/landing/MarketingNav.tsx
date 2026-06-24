import Link from 'next/link'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { Button3D } from '@/components/ui/Button3D'
import { PRICING } from '@/lib/siteFacts'

// Juego AETHERIS: Última Línea — desplegado como sitio estático propio.
const GAME_URL = 'https://aetheris-game-web.vercel.app'

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
  { href: '/libros', label: '📚 Libros' },
  { href: 'https://market.figueredomed.com', label: '🛒 Market', external: true },
  { href: GAME_URL, label: '🎮 Aetheris Game', external: true, highlight: true },
]

// Botón base para los enlaces del nav (look de botón, no de texto).
const navBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '8px 14px',
  borderRadius: 10,
  border: '1px solid rgba(34,211,238,0.32)',
  background: 'rgba(34,211,238,0.06)',
  color: '#d7eef4',
  fontWeight: 700,
  fontSize: 14,
  lineHeight: 1,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

const navBtnGame: React.CSSProperties = {
  ...navBtn,
  border: '1px solid rgba(168,85,247,0.6)',
  background: 'rgba(168,85,247,0.14)',
  color: '#e9d5ff',
}

export function MarketingNav() {
  return (
    <header className="marketing-nav" role="banner">
      <div className="marketing-nav-inner">
        <BrandLogo size="md" priority />

        <nav className="marketing-nav-links" aria-label="Principal" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="ux-focus-ring" style={navBtn}>
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

      <nav className="marketing-nav-mobile" aria-label="Menú móvil" style={{ display: 'flex', flexWrap: 'nowrap', gap: 8, overflowX: 'auto' }}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} style={navBtn}>
            {l.label}
          </Link>
        ))}
      </nav>

      <nav className="marketing-subnav" aria-label="Accesos rápidos" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SUBNAV.map((l, i) =>
          l.external ? (
            <a key={`${l.href}-${i}`} href={l.href} target="_blank" rel="noopener noreferrer" style={l.highlight ? navBtnGame : navBtn}>
              {l.label}
            </a>
          ) : (
            <Link key={`${l.href}-${i}`} href={l.href} style={navBtn}>
              {l.label}
            </Link>
          )
        )}
      </nav>
    </header>
  )
}
