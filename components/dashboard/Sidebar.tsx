'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard', icon: '⬡', label: 'Centro de Comando', exact: true },
  { href: '/dashboard/asistente', icon: '🤖', label: 'IA Maestra' },
  { href: '/dashboard/agente', icon: '⚡', label: 'Agente Autónomo' },
  { href: '/dashboard/documentos', icon: '🔍', label: 'Escanear' },
  { href: '/dashboard/credito', icon: '💳', label: 'Mi Crédito' },
  { href: '/dashboard/taxes', icon: '📋', label: 'Taxes e ITIN' },
  { href: '/dashboard/casa', icon: '🏠', label: 'Comprar Casa' },
  { href: '/dashboard/carro', icon: '🚗', label: 'Comprar Carro' },
  { href: '/dashboard/banco', icon: '🏧', label: 'Mi Banco' },
  { href: '/dashboard/remesas', icon: '💸', label: 'Remesas' },
  { href: '/dashboard/prestamos', icon: '🚨', label: 'Préstamos' },
  { href: '/dashboard/trabajo', icon: '⚖️', label: 'Salario Justo' },
  { href: '/dashboard/jubilacion', icon: '🏦', label: 'Jubilación' },
  { href: '/dashboard/emergencia', icon: '🆘', label: 'Emergencias' },
  { href: '/dashboard/derechos', icon: '🛡️', label: 'Mis Derechos' },
  { href: '/dashboard/subsidios', icon: '🎁', label: 'Subsidios' },
  { href: '/dashboard/referidos', icon: '💰', label: 'Referidos' },
  { href: '/dashboard/configuracion', icon: '⚙️', label: 'Configuración' },
]

type Props = {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: Props) {
  const path = usePathname()
  const isActive = (href: string, exact?: boolean) =>
    exact ? path === href : path === href || path.startsWith(`${href}/`)

  return (
    <>
      <div
        className={cn('dash-overlay', open && 'dash-overlay--open')}
        onClick={onClose}
        aria-hidden
      />
      <aside className={cn('dash-sidebar', open && 'dash-sidebar--open')} aria-label="Navegación">
        <div className="dash-sidebar-brand">
          <BrandLogo href="/inicio" size="sidebar" />
          <p className="text-xs text-[var(--text-muted)] mt-1">Centro de Comando IA</p>
        </div>

        <nav className="dash-sidebar-nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn('dash-nav-link', isActive(item.href, item.exact) && 'dash-nav-link--active')}
            >
              <span className="dash-nav-icon" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="dash-sidebar-foot">
          <Link href="/inicio" className="dash-nav-link text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </aside>
    </>
  )
}
