'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function OnboardingBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    fetch('/api/perfil')
      .then((r) => r.json())
      .then((d) => {
        if (!d.onboarding_completo) setShow(true)
      })
      .catch(() => {})
  }, [])

  if (!show) return null

  return (
    <div className="card-3d dash-panel mb-6 border border-[var(--cyan-bright)]/30 bg-[rgba(34,211,238,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-bold text-[var(--text-primary)]">Completa tu perfil en 2 minutos</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            La IA Maestra usará tus datos para alertas, taxes y recomendaciones personalizadas.
          </p>
        </div>
        <Link href="/dashboard/onboarding" className="btn-3d-blue !min-h-[44px] !text-sm shrink-0">
          Configurar ahora →
        </Link>
      </div>
    </div>
  )
}
