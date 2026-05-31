'use client'
import { useState } from 'react'
import { DashPanel, DashDisplay } from '@/components/dashboard/DashPanel'

export default function SimuladorPage() {
  const [score, setScore] = useState(580)
  const [utilizacion, setUtilizacion] = useState(75)
  const [pagosTarde, setPagosTarde] = useState(2)
  const [cuentasAbiertas, setCuentasAbiertas] = useState(3)
  const [consultasRecientes, setConsultasRecientes] = useState(2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [proyeccion, setProyeccion] = useState('')

  // Estimación local instantánea
  const scoreEst30 = Math.min(850, score + (utilizacion > 30 ? 15 : 5) + (pagosTarde === 0 ? 10 : 0))
  const scoreEst90 = Math.min(850, scoreEst30 + (utilizacion > 30 ? 25 : 10) + (pagosTarde === 0 ? 15 : 5) - consultasRecientes * 3)
  const scoreEst180 = Math.min(850, scoreEst90 + 20 + (pagosTarde === 0 ? 20 : 5))

  function scoreColor(s: number) {
    if (s >= 740) return 'positive'
    if (s >= 670) return 'neutral'
    return 'negative'
  }

  async function simularConIA() {
    setLoading(true)
    setError('')
    setProyeccion('')
    try {
      const mensaje = `Simula la evolución de mi score de crédito con estos datos actuales:
- Score actual: ${score}
- Utilización de crédito: ${utilizacion}%
- Pagos tarde últimos 24 meses: ${pagosTarde}
- Cuentas abiertas: ${cuentasAbiertas}
- Consultas de crédito recientes (6 meses): ${consultasRecientes}

Si hago todo bien (pago a tiempo, bajo utilización al 10%, no abro cuentas nuevas, no más consultas):
1. Dame proyección semana a semana para los primeros 30 días
2. Proyección mes a mes para 3, 6 y 12 meses
3. Qué acciones específicas tienen MAYOR impacto para MI score
4. Cuántos puntos ganaría si disputo errores en el buró
5. Cuándo podría calificar para tarjeta con mejor tasa, auto loan y mortgage`

      const res = await fetch('/api/ia/maestro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje, historial: [] }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setProyeccion(data.respuesta)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dash-page">
      <h1 className="dash-page-title">Simulador de Score</h1>
      <p className="dash-page-date mb-6">Ve cómo subirá tu crédito si haces los movimientos correctos.</p>

      <div className="dash-grid-2 mb-6">
        <DashPanel>
          <h2 className="mb-4">Tu situación actual</h2>

          <label className="dash-form-label">Score de crédito actual</label>
          <div className="flex items-center gap-3 mb-4">
            <input type="range" min={300} max={850} step={5} value={score} onChange={e => setScore(+e.target.value)} className="flex-1 accent-[var(--cyan-bright)]" />
            <span className="font-bold text-xl text-[var(--text-primary)] w-12 text-right">{score}</span>
          </div>

          <label className="dash-form-label">Utilización del crédito ({utilizacion}%)</label>
          <input type="range" min={0} max={100} step={1} value={utilizacion} onChange={e => setUtilizacion(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-4" />

          <label className="dash-form-label">Pagos tarde últimos 24 meses</label>
          <input type="range" min={0} max={12} step={1} value={pagosTarde} onChange={e => setPagosTarde(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-4" />
          <p className="text-xs text-[var(--text-muted)] mb-4">{pagosTarde === 0 ? '✅ Sin pagos tarde' : `⚠️ ${pagosTarde} pago(s) tarde`}</p>

          <label className="dash-form-label">Cuentas de crédito abiertas</label>
          <input type="range" min={0} max={15} step={1} value={cuentasAbiertas} onChange={e => setCuentasAbiertas(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-4" />

          <label className="dash-form-label">Consultas recientes de crédito (6 meses)</label>
          <input type="range" min={0} max={10} step={1} value={consultasRecientes} onChange={e => setConsultasRecientes(+e.target.value)} className="w-full accent-[var(--cyan-bright)] mb-6" />

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button onClick={simularConIA} disabled={loading} className="btn-accent w-full">
            {loading ? 'Simulando tu proyección...' : '🤖 Simular con IA Maestra'}
          </button>
        </DashPanel>

        <div className="space-y-4">
          <DashPanel className="text-center">
            <p className="text-xs text-[var(--text-muted)] mb-1">Score actual</p>
            <DashDisplay value={String(score)} tone={scoreColor(score)} />
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {score < 580 ? 'Muy bajo' : score < 670 ? 'Regular' : score < 740 ? 'Bueno' : score < 800 ? 'Muy bueno' : 'Excelente'}
            </p>
          </DashPanel>

          <DashPanel>
            <h3 className="mb-3">Proyección estimada (si haces todo bien)</h3>
            {[
              { label: '30 días', score: scoreEst30 },
              { label: '90 días', score: scoreEst90 },
              { label: '180 días', score: scoreEst180 },
            ].map(({ label, score: s }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-[var(--text-muted)]">{label}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${s >= 740 ? 'text-green-400' : s >= 670 ? 'text-yellow-400' : 'text-red-400'}`}>{s}</span>
                  <span className="text-xs text-green-400">+{s - score}</span>
                </div>
              </div>
            ))}
          </DashPanel>

          <DashPanel tone="info">
            <h3 className="mb-2">¿Qué puedes hacer HOY?</h3>
            <ul className="space-y-1 text-sm">
              {utilizacion > 30 && <li className="text-yellow-400">⚡ Baja utilización al 30% — mayor impacto</li>}
              {pagosTarde > 0 && <li className="text-red-400">🚨 Paga todo a tiempo este mes</li>}
              {consultasRecientes > 2 && <li className="text-orange-400">⚠️ No solicites más crédito por 6 meses</li>}
              <li className="text-green-400">✅ Activa alertas de pago en tu banco</li>
              <li className="text-blue-400">🛡️ Revisa errores en tu buró con Blindado</li>
            </ul>
          </DashPanel>
        </div>
      </div>

      {proyeccion && (
        <DashPanel tone="success" className="animate-fade-in">
          <h2 className="mb-4">🤖 Proyección detallada de la IA Maestra</h2>
          <div>
            {proyeccion.split('\n').map((line, i) => (
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
