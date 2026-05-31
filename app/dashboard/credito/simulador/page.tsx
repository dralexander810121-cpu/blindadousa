'use client'
import { useEffect, useState } from 'react'
import { DashPanel, DashDisplay } from '@/components/dashboard/DashPanel'
import { proyectarScore, clasificarScore } from '@/lib/credito/projection'

export default function SimuladorPage() {
  const [score, setScore] = useState(580)
  const [utilizacion, setUtilizacion] = useState(75)
  const [pagosTarde, setPagosTarde] = useState(2)
  const [cuentasAbiertas, setCuentasAbiertas] = useState(3)
  const [consultasRecientes, setConsultasRecientes] = useState(2)
  const [disputaPendiente, setDisputaPendiente] = useState(false)
  const [metaScore, setMetaScore] = useState(720)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [proyeccionIA, setProyeccionIA] = useState('')

  // Pre-llena con el score real del perfil del usuario
  useEffect(() => {
    fetch('/api/perfil')
      .then((r) => r.json())
      .then((d) => {
        if (d.perfil?.credit_score) setScore(d.perfil.credit_score)
      })
      .catch(() => {})
  }, [])

  const proyeccion = proyectarScore(
    { scoreActual: score, utilizacion, pagosTarde, cuentasAbiertas, consultasRecientes, disputaPendiente },
    metaScore,
  )
  const claseActual = clasificarScore(score)

  async function simularConIA() {
    setLoading(true)
    setError('')
    setProyeccionIA('')
    try {
      const mensaje = `Simula la evolución de mi score de crédito con estos datos:
- Score actual: ${score}
- Utilización de crédito: ${utilizacion}%
- Pagos tarde últimos 24 meses: ${pagosTarde}
- Cuentas abiertas: ${cuentasAbiertas}
- Consultas recientes (6 meses): ${consultasRecientes}
- Disputa de error en curso: ${disputaPendiente ? 'sí' : 'no'}
- Mi meta: llegar a ${metaScore} puntos

Mi proyección calculada es: 30 días → ${proyeccion[0].estimado}, 90 días → ${proyeccion[1].estimado}, 180 días → ${proyeccion[2].estimado}, 1 año → ${proyeccion[3].estimado}.

Dame:
1. Las 3 acciones específicas de MAYOR impacto para MI caso, en orden
2. Plan semana a semana del primer mes
3. Cuándo realísticamente alcanzaré mi meta de ${metaScore}
4. Cuándo podría calificar para auto loan y mortgage con buena tasa`

      const res = await fetch('/api/ia/maestro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje, historial: [] }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setProyeccionIA(data.respuesta)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dash-page">
      <h1 className="dash-page-title">Simulador Predictivo de Score</h1>
      <p className="dash-page-date mb-6">
        Modelo ponderado por los 5 factores FICO reales + proyección con banda de probabilidad.
      </p>

      <div className="dash-grid-2 mb-6">
        <DashPanel>
          <h2 className="mb-4">Tu situación actual</h2>

          <label className="dash-form-label">Score de crédito actual</label>
          <div className="flex items-center gap-3 mb-4">
            <input type="range" min={300} max={850} step={5} value={score} onChange={(e) => setScore(+e.target.value)} className="flex-1 accent-[var(--cyan-bright)]" />
            <span className="font-bold text-xl text-[var(--text-primary)] w-12 text-right">{score}</span>
          </div>

          <label className="dash-form-label">Utilización del crédito ({utilizacion}%) · peso FICO 30%</label>
          <input type="range" min={0} max={100} step={1} value={utilizacion} onChange={(e) => setUtilizacion(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-4" />

          <label className="dash-form-label">Pagos tarde (24 meses) · peso FICO 35%</label>
          <input type="range" min={0} max={12} step={1} value={pagosTarde} onChange={(e) => setPagosTarde(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-1" />
          <p className="text-xs text-[var(--text-muted)] mb-4">{pagosTarde === 0 ? '✅ Sin pagos tarde' : `⚠️ ${pagosTarde} pago(s) tarde`}</p>

          <label className="dash-form-label">Cuentas abiertas</label>
          <input type="range" min={0} max={15} step={1} value={cuentasAbiertas} onChange={(e) => setCuentasAbiertas(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-4" />

          <label className="dash-form-label">Consultas recientes (6 meses) · peso FICO 10%</label>
          <input type="range" min={0} max={10} step={1} value={consultasRecientes} onChange={(e) => setConsultasRecientes(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-4" />

          <label className="flex items-center gap-3 text-sm cursor-pointer mb-4">
            <input type="checkbox" checked={disputaPendiente} onChange={(e) => setDisputaPendiente(e.target.checked)} className="w-4 h-4" />
            Tengo una disputa de error en curso (puede dar un salto grande)
          </label>

          <label className="dash-form-label">Mi meta de score</label>
          <div className="flex items-center gap-3 mb-6">
            <input type="range" min={580} max={850} step={5} value={metaScore} onChange={(e) => setMetaScore(+e.target.value)} className="flex-1 accent-[var(--cyan-bright)]" />
            <span className="font-bold text-xl text-[var(--text-primary)] w-12 text-right">{metaScore}</span>
          </div>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button onClick={simularConIA} disabled={loading} className="btn-accent w-full">
            {loading ? 'Simulando tu proyección...' : '🤖 Plan detallado con IA Maestra'}
          </button>
        </DashPanel>

        <div className="space-y-4">
          <DashPanel className="text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Score actual</p>
            <DashDisplay value={String(score)} tone={claseActual.tone} />
            <p className="text-xs text-[var(--text-muted)] mt-1">{claseActual.label}</p>
          </DashPanel>

          <DashPanel>
            <h3 className="mb-3">Proyección con banda de probabilidad</h3>
            {proyeccion.map((p) => {
              const label = p.horizonteDias === 365 ? '1 año' : `${p.horizonteDias} días`
              return (
                <div key={p.horizonteDias} className="py-2 border-b border-white/5 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--text-muted)]">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${p.estimado >= 740 ? 'text-green-400' : p.estimado >= 670 ? 'text-yellow-400' : 'text-orange-400'}`}>
                        {p.estimado}
                      </span>
                      <span className="text-xs text-green-400">+{p.estimado - score}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-[var(--text-muted)]">rango {p.rangoMin}–{p.rangoMax}</span>
                    {p.probabilidadMeta != null && (
                      <span className={`text-[10px] font-semibold ${p.probabilidadMeta >= 70 ? 'text-green-400' : p.probabilidadMeta >= 40 ? 'text-yellow-400' : 'text-orange-400'}`}>
                        {p.probabilidadMeta}% prob. meta {metaScore}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </DashPanel>

          <DashPanel tone="info">
            <h3 className="mb-2">¿Qué puedes hacer HOY?</h3>
            <ul className="space-y-1 text-sm">
              {utilizacion > 30 && <li className="text-yellow-400">⚡ Baja utilización al 30% — el cambio más rápido</li>}
              {pagosTarde > 0 && <li className="text-red-400">🚨 Paga todo a tiempo este mes</li>}
              {consultasRecientes > 2 && <li className="text-orange-400">⚠️ No solicites más crédito por 6 meses</li>}
              {!disputaPendiente && <li className="text-blue-400">🛡️ Revisa errores en tu buró → Disputas</li>}
              <li className="text-green-400">✅ Activa alertas de pago en tu banco</li>
            </ul>
          </DashPanel>
        </div>
      </div>

      {proyeccionIA && (
        <DashPanel tone="success" className="animate-fade-in">
          <h2 className="mb-4">🤖 Plan detallado de la IA Maestra</h2>
          <div>
            {proyeccionIA.split('\n').map((line, i) => (
              <p key={i} className={`mb-2 text-sm leading-relaxed ${line.startsWith('#') || /^\d+\./.test(line) ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                {line}
              </p>
            ))}
          </div>
        </DashPanel>
      )}
    </div>
  )
}
