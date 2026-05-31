'use client'

import Link from 'next/link'
import { DASHBOARD_MODULE_GRID } from '@/lib/dashboard/moduleGrid'

export function ModulesGrid() {
  return (
    <div>
      <h2 className="dash-section-title">Acceso rápido — 13 módulos</h2>
      <div className="dash-modules-grid">
        {DASHBOARD_MODULE_GRID.map((m) => (
          <Link key={m.href} href={m.href} className="dash-module-card card-3d banana-pro-panel ux-focus-ring">
            <span className="text-2xl mb-2 block" aria-hidden>
              {m.icon}
            </span>
            <span className="font-bold text-sm text-[var(--text-primary)]">{m.name}</span>
            <span className="text-xs text-[var(--text-muted)] mt-1 block">{m.desc}</span>
          </Link>
        ))}
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-3">
        Escaneo de contratos y cartas:{' '}
        <Link href="/dashboard/documentos" className="text-[var(--cyan-bright)] underline">
          Documentos IA
        </Link>
        {' · '}
        <Link href="/dashboard/credito/disputas" className="text-[var(--cyan-bright)] underline">
          Disputas
        </Link>
      </p>
    </div>
  )
}
