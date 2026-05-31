'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CARTA_LABELS } from '@/lib/ia/prompts'

type Carta = {
  id: string
  tipo: string
  asunto: string
  destinatario: string
  cuerpo: string
  estado: string
  created_at: string
}

export default function CartasPage() {
  const [cartas, setCartas] = useState<Carta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/ia/carta-legal')
      .then(async (r) => {
        const d = await r.json()
        if (r.ok) {
          setCartas(d.cartas ?? [])
        } else {
          setError(d.error || 'No se pudieron cargar tus cartas.')
        }
      })
      .catch(() => setError('Error de conexión al cargar cartas.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="dash-page dash-page--banana">
      <Link href="/dashboard/credito" className="text-sm text-[var(--text-muted)] hover:text-[var(--blue-300)]">
        ← Mi Crédito
      </Link>
      <h1 className="dash-page-title mt-3">Cartas generadas</h1>
      <p className="dash-page-date mb-6">
        Documentos creados por la IA Maestra. Revísalos antes de enviar.
      </p>

      {loading ? (
        <p className="text-[var(--text-muted)]">Cargando…</p>
      ) : error ? (
        <div className="card-3d dash-panel max-w-lg">
          <p className="text-[var(--red-400)] mb-4" role="alert">
            {error}
          </p>
          <button type="button" className="btn-glass !min-h-[44px] !text-sm" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      ) : cartas.length === 0 ? (
        <div className="card-3d dash-panel max-w-lg">
          <p className="text-[var(--text-secondary)] mb-4">
            Aún no tienes cartas. Pídele a la IA Maestra que genere una disputa, reclamo o carta legal.
          </p>
          <Link href="/dashboard/asistente" className="btn-3d-gold inline-flex !min-h-[44px] !text-sm">
            Ir a IA Maestra →
          </Link>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {cartas.map((c) => (
            <article key={c.id} className="card-3d dash-panel">
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <p className="font-bold text-[var(--text-primary)]">
                  {CARTA_LABELS[c.tipo] ?? c.tipo}
                </p>
                <span className="text-xs text-[var(--text-muted)]">
                  {new Date(c.created_at).toLocaleDateString('es-US')}
                </span>
              </div>
              {c.asunto && (
                <p className="text-sm text-[var(--gold-400)] mb-1">Asunto: {c.asunto}</p>
              )}
              {c.destinatario && (
                <p className="text-xs text-[var(--text-muted)] mb-3">Para: {c.destinatario}</p>
              )}
              <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap bg-[var(--void)] p-4 rounded-lg border border-white/5 max-h-64 overflow-y-auto">
                {c.cuerpo}
              </pre>
              <button
                type="button"
                className="btn-glass !min-h-[40px] !text-xs mt-3"
                onClick={() => navigator.clipboard.writeText(c.cuerpo)}
              >
                Copiar texto
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
