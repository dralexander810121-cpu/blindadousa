'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', icon: '⬡', label: 'Panel Principal', exact: true },
  { href: '/dashboard/credito', icon: '💳', label: 'Mi Crédito' },
  { href: '/dashboard/casa', icon: '🏠', label: 'Comprar Casa' },
  { href: '/dashboard/carro', icon: '🚗', label: 'Comprar Carro' },
  { href: '/dashboard/remesas', icon: '💸', label: 'Remesas 2026' },
  { href: '/dashboard/prestamos', icon: '🚨', label: 'Préstamos' },
  { href: '/dashboard/jubilacion', icon: '🏦', label: 'Jubilación' },
  { href: '/dashboard/banco', icon: '🏧', label: 'Mi Banco' },
  { href: '/dashboard/trabajo', icon: '⚖️', label: 'Salario Justo' },
  { href: '/dashboard/taxes', icon: '📋', label: 'Taxes e ITIN' },
  { href: '/dashboard/emergencia', icon: '🆘', label: 'Emergencias' },
  { href: '/dashboard/derechos', icon: '🛡️', label: 'Mis Derechos' },
  { href: '/dashboard/subsidios', icon: '🎁', label: 'Subsidios' },
  { href: '/dashboard/asistente', icon: '🤖', label: 'Asistente IA' },
  { href: '/dashboard/referidos', icon: '📤', label: 'Mis Referidos' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isActive = (href: string, exact?: boolean) => exact ? path === href : path.startsWith(href)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--light)' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, minHeight: '100vh', background: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 50, overflowY: 'auto' }}>
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #F3F4F6' }}>
          <Link href="/inicio" style={{ textDecoration: 'none' }}>
            <span className="font-bebas" style={{ fontSize: 22, color: 'var(--primary)', letterSpacing: 2 }}>BLINDADO<span style={{ color: 'var(--accent)' }}>USA</span></span>
          </Link>
          <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 2 }}>La biblia del hispano en USA</div>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {NAV.map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div className={`sidebar-link${isActive(item.href, item.exact) ? ' active' : ''}`}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px', borderTop: '1px solid #F3F4F6' }}>
          <Link href="/inicio" style={{ textDecoration: 'none' }}>
            <div className="sidebar-link" style={{ fontSize: 13 }}>← Inicio</div>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, padding: '32px', minHeight: '100vh', maxWidth: 'calc(100vw - 240px)' }}>
        {children}
      </main>

      {/* Asistente flotante */}
      <Link href="/dashboard/asistente" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, textDecoration: 'none' }}>
        <div style={{ width: 56, height: 56, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 4px 20px rgba(27,67,50,.4)', cursor: 'pointer', transition: 'transform .2s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)') }
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)') }>
          🤖
        </div>
      </Link>
    </div>
  )
}
