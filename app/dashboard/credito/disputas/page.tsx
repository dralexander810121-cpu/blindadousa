'use client'

import Link from 'next/link'
import { useState } from 'react'

type DisputaItem = { acreedor: string; cuenta: string; motivo: string; monto: string }

type Analisis = {
  resumen: string
  violaciones: { ley: string; explicacion: string }[]
  probabilidad_exito: string
  pasos_inmediatos: string[]
}

const EMPTY: DisputaItem = { acreedor: '', cuenta: '', motivo: '', monto: '' }

export default function DisputasPage() {
  const [items, setItems] = useState<DisputaItem[]>([{ ...EMPTY }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analisis, setAnalisis] = useState<Analisis | null>(null)
  const [carta, setCarta] = useState<{
    id: string
    titulo: string
    cuerpo_es: string
    cuerpo_en: string
  } | null>(null)

  function updateItem(i: number, field: keyof DisputaItem, value: string) {
    setItems((prev) => prev.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)))
  }

  async function analizar() {
    const valid = items.filter((it) => it.acreedor.trim() && it.motivo.trim())
    if (!valid.length) {
      setError('Completa acreedor y motivo en al menos un ítem.')
      return
    }
    setError('')
    setLoading(true)
    setAnalisis(null)
    setCarta(null)
    try {
      const res = await fetch('/api/ia/disputa-credito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: valid, generarCarta: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setAnalisis(data.analisis)
      if (data.carta) setCarta(data.carta)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo analizar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dash-page dash-page--banana">
      <Link href="/dashboard/credito" className="text-sm text-[var(--text-muted)] hover:text-[var(--blue-300)]">
        ← Mi Crédito
      </Link>
      <h1 className="dash-page-title mt-3">Disputas al buró</h1>
      <p className="dash-page-date mb-6 max-w-2xl">
        Describe los errores en tu reporte. La IA detecta violaciones FCRA y puede generar tu carta de disputa.
      </p>

      <div className="card-3d dash-panel max-w-3xl mb-6">
        <h2 className="dash-panel-title mb-4">Ítems a disputar</h2>
        <div className="space-y-4">
          {items.map((it, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/8 bg-[var(--void)] space-y-3">
              <input
                className="w-full px-3 py-2 rounded-lg bg-[var(--glass-08)] border border-white/10 text-sm text-[var(--text-primary)]"
                placeholder="Acreedor (ej. Capital One)"
                value={it.acreedor}
                onChange={(e) => updateItem(i, 'acreedor', e.target.value)}
              />
              <input
                className="w-full px-3 py-2 rounded-lg bg-[var(--glass-08)] border border-white/10 text-sm"
                placeholder="Últimos 4 dígitos / cuenta (opcional)"
                value={it.cuenta}
                onChange={(e) => updateItem(i, 'cuenta', e.target.value)}
              />
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-[var(--glass-08)] border border-white/10 text-sm min-h-[80px]"
                placeholder="Por qué es incorrecto (ej. pagué en 2023, sigue como mora)"
                value={it.motivo}
                onChange={(e) => updateItem(i, 'motivo', e.target.value)}
              />
              <input
                className="w-full px-3 py-2 rounded-lg bg-[var(--glass-08)] border border-white/10 text-sm"
                placeholder="Monto en disputa (opcional)"
                value={it.monto}
                onChange={(e) => updateItem(i, 'monto', e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="button"
            className="btn-glass !min-h-[40px] !text-xs"
            onClick={() => setItems((p) => [...p, { ...EMPTY }])}
          >
            + Otro ítem
          </button>
          <button
            type="button"
            className="btn-3d-gold !min-h-[44px] !text-sm"
            disabled={loading}
            onClick={analizar}
          >
            {loading ? 'Analizando…' : 'Analizar y generar carta'}
          </button>
        </div>
        {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      </div>

      {analisis && (
        <div className="card-3d dash-panel max-w-3xl mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h2 className="dash-panel-title">Análisis FCRA</h2>
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--emerald-500)]/20 text-[var(--emerald-400)]">
              Probabilidad: {analisis.probabilidad_exito}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">{analisis.resumen}</p>
          {analisis.violaciones?.length > 0 && (
            <ul className="text-sm space-y-2 mb-4">
              {analisis.violaciones.map((v, i) => (
                <li key={i} className="text-[var(--text-secondary)]">
                  <strong className="text-[var(--gold-400)]">{v.ley}</strong> — {v.explicacion}
                </li>
              ))}
            </ul>
          )}
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Pasos inmediatos</h3>
          <ol className="list-decimal list-inside text-sm text-[var(--text-secondary)] space-y-1">
            {analisis.pasos_inmediatos?.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </div>
      )}

      {carta && (
        <div className="card-3d dash-panel max-w-3xl">
          <h2 className="dash-panel-title mb-2">{carta.titulo}</h2>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            Guardada en{' '}
            <Link href="/dashboard/credito/cartas" className="text-[var(--blue-300)]">
              Mis cartas
            </Link>
          </p>
          <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap bg-[var(--void)] p-4 rounded-lg border border-white/5 max-h-72 overflow-y-auto">
            {carta.cuerpo_es}
          </pre>
          <button
            type="button"
            className="btn-glass !min-h-[40px] !text-xs mt-3"
            onClick={() => navigator.clipboard.writeText(carta.cuerpo_es)}
          >
            Copiar carta (ES)
          </button>
        </div>
      )}

      <p className="text-xs text-[var(--text-muted)] mt-6 max-w-xl">
        Envía por correo certificado a cada buró. Tienes 30 días para que investiguen (FCRA §611).
      </p>
    </div>
  )
}
