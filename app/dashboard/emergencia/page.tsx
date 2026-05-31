'use client'
import { useState } from 'react'
import { DashDisplay, DashOption, DashPanel, DashRangeRow } from '@/components/dashboard/DashPanel'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const TEST_RESULTS = [
  {
    label: 'Menos de 1 semana',
    icon: '🔴',
    msg: 'Estás en zona de peligro. Cualquier imprevisto te pone en deuda. Empieza hoy.',
    danger: true,
  },
  {
    label: '1 a 4 semanas',
    icon: '🟡',
    msg: 'Tienes un pequeño colchón pero no es suficiente. Tu meta: 3 meses de gastos.',
    danger: false,
  },
  {
    label: '1 a 3 meses',
    icon: '🟢',
    msg: 'Vas bien. Sigue ahorrando hasta tener 3 meses completos de gastos cubiertos.',
    danger: false,
  },
  {
    label: 'Más de 3 meses',
    icon: '✅',
    msg: 'Tienes un fondo sólido. Ahora invierte el excedente con criterio.',
    danger: false,
  },
]

export default function EmergenciaPage() {
  const [gastos, setGastos] = useState(2500)
  const [test, setTest] = useState<number | null>(null)
  const [plan, setPlan] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const meta1 = 1000
  const meta2 = gastos
  const meta3 = gastos * 3
  const porSemana1 = Math.ceil(meta1 / 13)
  const porSemana2 = Math.ceil(meta2 / 13)
  const porSemana3 = Math.ceil(meta3 / 13)

  async function generarPlan() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/ia/maestro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: `Mis gastos fijos mensuales son ${fmt(gastos)}. No tengo fondo de emergencia. Dame un plan detallado de 90 días, semana por semana, para crear un fondo de emergencia de $${meta1}. Incluye: dónde recortar gastos específicos, cuánto ahorrar cada semana, y dónde guardar el dinero.`,
          historial: [],
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setPlan(data.respuesta)
      } else {
        setError(data.error || 'No se pudo generar el plan. Intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión. Revisa tu internet e intenta otra vez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Plan de emergencia</h1>
      <p className="dash-page-date mb-6">
        Crea tu fondo de emergencia en 90 días con ayuda de la IA
      </p>

      <DashPanel className="mb-6">
        <h2>Si perdieras tu trabajo hoy, ¿cuánto tiempo podrías vivir?</h2>
        <div className="dash-option-grid">
          {TEST_RESULTS.map((t, i) => (
            <DashOption
              key={t.label}
              selected={test === i}
              onClick={() => setTest(i)}
              title={`${t.icon} ${t.label}`}
            />
          ))}
        </div>
        {test !== null && (
          <div
            className={`dash-banner-inline mt-4 mb-0 ${
              TEST_RESULTS[test].danger
                ? 'dash-banner-inline--danger'
                : 'dash-banner-inline--success'
            }`}
          >
            <p className="text-sm font-semibold m-0">{TEST_RESULTS[test].msg}</p>
          </div>
        )}
      </DashPanel>

      <div className="dash-grid-2 mb-6">
        <DashPanel>
          <h2>¿Cuánto necesitas?</h2>
          <DashRangeRow label="Tus gastos fijos mensuales" value={fmt(gastos)}>
            <input
              type="range"
              min={500}
              max={6000}
              step={100}
              value={gastos}
              onChange={(e) => setGastos(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>

          {[
            { l: 'Meta 1: Seguridad básica', v: meta1, s: porSemana1, tone: 'warn' as const },
            { l: 'Meta 2: Un mes de gastos', v: meta2, s: porSemana2, tone: 'default' as const },
            { l: 'Meta 3: Tres meses (ideal)', v: meta3, s: porSemana3, tone: 'success' as const },
          ].map((m) => (
            <DashPanel key={m.l} tone={m.tone} className="!p-4 mb-3">
              <div className="flex justify-between items-center gap-2">
                <span className="font-semibold text-sm text-[var(--text-primary)]">{m.l}</span>
                <DashDisplay value={fmt(m.v)} className="!text-2xl" />
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1 mb-0">
                Ahorra {fmt(m.s)}/semana para llegar en 90 días
              </p>
            </DashPanel>
          ))}

          {error && (
            <p className="text-sm text-[var(--red-400)] mb-2" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={generarPlan}
            disabled={loading}
            className="btn-3d-gold w-full !min-h-[48px] mt-2"
          >
            {loading ? 'Generando tu plan…' : 'Generar mi plan de 90 días con IA →'}
          </button>
        </DashPanel>

        <div>
          {plan ? (
            <div className="dash-result-box">{plan}</div>
          ) : (
            <>
              <DashPanel className="mb-4">
                <h3>Emergencia vs NO emergencia</h3>
                <div className="dash-grid-2 gap-3">
                  <div className="dash-panel dash-panel--danger !p-4">
                    <p className="font-bold text-sm text-[var(--red-500)] mb-2">Sí es emergencia</p>
                    {['Reparación del carro', 'Emergencia médica', 'Pérdida de trabajo', 'Reparación urgente de la casa'].map(
                      (e) => (
                        <p key={e} className="text-sm m-0 py-0.5">
                          {e}
                        </p>
                      ),
                    )}
                  </div>
                  <div className="dash-panel dash-panel--success !p-4">
                    <p className="font-bold text-sm text-[var(--emerald-400)] mb-2">
                      No es emergencia
                    </p>
                    {['iPhone nuevo', 'Vacaciones', 'Ropa de marca', 'Muebles nuevos'].map((e) => (
                      <p key={e} className="text-sm m-0 py-0.5">
                        {e}
                      </p>
                    ))}
                  </div>
                </div>
              </DashPanel>
              <DashPanel>
                <h3>¿Dónde guardar el fondo?</h3>
                <p className="m-0">
                  En una cuenta de ahorros de <strong className="text-[var(--text-primary)]">alto rendimiento</strong>{' '}
                  separada de tu cuenta principal. Ally Bank, Marcus o SoFi ofrecen tasas competitivas.
                  No lo guardes en tu checking — lo vas a gastar.
                </p>
              </DashPanel>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
