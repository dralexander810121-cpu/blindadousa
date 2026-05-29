'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { EscanearContrato } from '@/components/ia/EscanearContrato'

function DocumentosInner() {
  const params = useSearchParams()
  const tipoInicial = params.get('tipo') || undefined

  return (
    <div className="dash-page dash-page--banana">
      <Link href="/dashboard" className="text-sm text-[var(--text-muted)] hover:text-[var(--blue-300)]">
        ← Centro de Comando
      </Link>
      <h1 className="dash-page-title mt-3">Escanear contratos</h1>
      <p className="dash-page-date mb-6 max-w-2xl">
        Sube una foto o pega el texto. La IA detecta cargos ocultos, cláusulas abusivas y puede generar una carta de reclamo.
      </p>
      <EscanearContrato tipoInicial={tipoInicial} />
      <p className="text-xs text-[var(--text-muted)] mt-6 max-w-xl">
        Herramienta educativa. Revisa siempre con un abogado antes de firmar contratos importantes.
      </p>
    </div>
  )
}

export default function DocumentosPage() {
  return (
    <Suspense fallback={<div className="dash-page dash-loading">Cargando…</div>}>
      <DocumentosInner />
    </Suspense>
  )
}
