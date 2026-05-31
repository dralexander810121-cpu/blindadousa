'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DashPanel } from '@/components/dashboard/DashPanel'

type Paso = {
  orden: number
  titulo: string
  descripcion: string
  modulo: string
  accion: string
  estado: 'pendiente' | 'completado'
}
type Plan = { meta: string; horizonte: string; resumen: string; pasos: Paso[] }

const METAS_SUGERIDAS = [
  'Quiero calificar para un préstamo de auto de $25,000 en 6 meses',
  'Subir mi score de 580 a 700 para comprar casa en 1 año',
  'Salir de $15,000 de deuda de tarjetas en 18 meses',
  'Limpiar mi crédito de errores y colecciones este año',
]

export default function AgentePage() {
  const [meta, setMeta] = useState('')
  const [plan, setPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(false)
  const [cargandoPlan, setCargandoPlan] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/ia/agente-plan')
      .then((r) => r.json())
      .then((d) => {
        if (d.plan?.pasos?.length) setPlan(d.plan)
      })
      .catch(() => {})
      .finally(() => setCargandoPlan(false))
  }, [])

  async function generar(metaFinal: string) {
    if (!metaFinal.trim()) {
      setError('Escribe tu meta financiera.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/ia/agente-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta: metaFinal }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setPlan({ meta: metaFinal, horizonte: data.horizonte, resumen: data.resumen, pasos: data.pasos })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  async function togglePaso(orden: number, estadoActual: string) {
    const nuevo = estadoActual === 'completado' ? 'pendiente' : 'completado'
    setPlan((prev) =>
      prev ? { ...prev, pasos: prev.pasos.map((p) => (p.orden === orden ? { ...p, estado: nuevo } : p)) } : prev,
    )
    await fetch('/api/ia/agente-plan', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orden, estado: nuevo }),
    }).catch(() => {})
  }

  const completados = plan?.pasos.filter((p) => p.estado === 'completado').length ?? 0
  const total = plan?.pasos.length ?? 0
  const progreso = total > 0 ? Math.round((completados / total) * 100) : 0

  return (
    <div className="dash-page">
      <h1 className="dash-page-title">🤖 Agente Financiero Autónomo</h1>
      <p className="dash-page-date mb-6">
        Define tu meta. El agente la descompone en un plan ejecutable y rastrea tu progreso paso a paso.
      </p>

      {!plan && !cargandoPlan && (
        <DashPanel className="mb-6">
          <h2 className="mb-3">¿Cuál es tu meta financiera?</h2>
          <textarea
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            placeholder="Ej: Quiero comprar casa en 1 año pero mi score está en 590..."
            className="dash-textarea mb-3"
            rows={3}
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {METAS_SUGERIDAS.map((m) => (
              <button key={m} onClick={() => setMeta(m)} className="btn-ghost text-xs !py-1.5">
                {m.length > 45 ? m.slice(0, 45) + '…' : m}
              </button>
            ))}
          </div>
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button onClick={() => generar(meta)} disabled={loading} className="btn-accent w-full">
            {loading ? 'El agente está armando tu plan...' : '🚀 Crear mi plan autónomo'}
          </button>
        </DashPanel>
      )}

      {plan && (
        <>
          <DashPanel tone="info" className="mb-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <p className="text-xs text-[var(--text-muted)]">Tu meta</p>
                <h2 className="text-lg">{plan.meta}</h2>
                {plan.horizonte && <p className="text-sm text-[var(--cyan-bright)] mt-1">Horizonte: {plan.horizonte}</p>}
                {plan.resumen && <p className="text-sm text-[var(--text-secondary)] mt-2">{plan.resumen}</p>}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--cyan-bright)]">{progreso}%</div>
                <p className="text-xs text-[var(--text-muted)]">{completados}/{total} pasos</p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-4">
              <div className="h-full bg-[var(--cyan-bright)] transition-all duration-500" style={{ width: `${progreso}%` }} />
            </div>
          </DashPanel>

          <div className="space-y-3 mb-6">
            {plan.pasos.map((p) => (
              <DashPanel key={p.orden} className={p.estado === 'completado' ? 'opacity-60' : ''}>
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => togglePaso(p.orden, p.estado)}
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors ${
                      p.estado === 'completado'
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-[var(--cyan-bright)] text-[var(--cyan-bright)]'
                    }`}
                    aria-label={p.estado === 'completado' ? 'Marcar pendiente' : 'Marcar completado'}
                  >
                    {p.estado === 'completado' ? '✓' : p.orden}
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-bold ${p.estado === 'completado' ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                      {p.titulo}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{p.descripcion}</p>
                    <div className="mt-2 p-2 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs text-[var(--text-muted)]">Acción concreta:</p>
                      <p className="text-sm text-[var(--text-primary)]">{p.accion}</p>
                    </div>
                    <Link href={p.modulo} className="inline-block mt-2 text-sm text-[var(--cyan-bright)] underline">
                      Ir a la herramienta →
                    </Link>
                  </div>
                </div>
              </DashPanel>
            ))}
          </div>

          <button onClick={() => setPlan(null)} className="btn-ghost w-full">
            Definir una nueva meta
          </button>
        </>
      )}
    </div>
  )
}
