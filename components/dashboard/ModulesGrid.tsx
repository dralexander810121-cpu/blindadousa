'use client'

import Link from 'next/link'

const MODULOS = [
  { href: '/dashboard/documentos', icon: '🔍', name: 'Escanear', desc: 'Contratos y facturas' },
  { href: '/dashboard/credito', icon: '💳', name: 'Mi Crédito', desc: 'Score, disputas y plan' },
  { href: '/dashboard/casa', icon: '🏠', name: 'Comprar Casa', desc: 'Hipotecas y derechos' },
  { href: '/dashboard/carro', icon: '🚗', name: 'Comprar Carro', desc: 'Anti-abuso dealer' },
  { href: '/dashboard/taxes', icon: '📋', name: 'Taxes e ITIN', desc: 'Organiza tu declaración' },
  { href: '/dashboard/remesas', icon: '💸', name: 'Remesas 2026', desc: 'Impuesto y ahorro' },
  { href: '/dashboard/prestamos', icon: '🚨', name: 'Préstamos', desc: 'Detector de estafas' },
  { href: '/dashboard/trabajo', icon: '⚖️', name: 'Salario Justo', desc: 'Derechos laborales' },
  { href: '/dashboard/emergencia', icon: '🆘', name: 'Emergencias', desc: 'Plan 90 días' },
]

export function ModulesGrid() {
  return (
    <div>
      <h2 className="dash-section-title">Acceso rápido — 13 módulos</h2>
      <div className="dash-modules-grid">
        {MODULOS.map((m) => (
          <Link key={m.href} href={m.href} className="dash-module-card card-3d banana-pro-panel ux-focus-ring">
            <span className="text-2xl mb-2 block" aria-hidden>
              {m.icon}
            </span>
            <span className="font-bold text-sm text-[var(--text-primary)]">{m.name}</span>
            <span className="text-xs text-[var(--text-muted)] mt-1 block">{m.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
