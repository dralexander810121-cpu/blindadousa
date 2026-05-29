'use client'

import Link from 'next/link'

export function IaFlotante() {
  return (
    <Link href="/dashboard/asistente" className="dash-ia-float" aria-label="Abrir IA Maestra">
      <span aria-hidden>🔮</span>
      <span className="dash-ia-float-label">IA</span>
    </Link>
  )
}
