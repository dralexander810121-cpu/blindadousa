'use client'
import { useState } from 'react'
import Link from 'next/link'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

export default function EmergenciaPage() {
  const [gastos, setGastos] = useState(2500)
  const [test, setTest] = useState<number | null>(null)
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const meta1 = 1000
  const meta2 = gastos
  const meta3 = gastos * 3
  const porSemana1 = Math.ceil(meta1 / 13)
  const porSemana2 = Math.ceil(meta2 / 13)
  const porSemana3 = Math.ceil(meta3 / 13)

  async function generarPlan() {
    setLoading(true)
    const res = await fetch('/api/ai/asistente', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensaje: `Mis gastos fijos mensuales son ${fmt(gastos)}. No tengo fondo de emergencia. Dame un plan detallado de 90 días, semana por semana, para crear un fondo de emergencia de $${meta1}. Incluye: dónde recortar gastos específicos, cuánto ahorrar cada semana, y dónde guardar el dinero.`, historial: [] }) })
    const data = await res.json()
    setPlan(data.respuesta)
    setLoading(false)
  }

  const TEST_RESULTS = [
    { label: 'Menos de 1 semana', icon: '🔴', msg: 'Estás en zona de peligro. Cualquier imprevisto te pone en deuda. Empieza hoy.' },
    { label: '1 a 4 semanas', icon: '🟡', msg: 'Tienes un pequeño colchón pero no es suficiente. Tu meta: 3 meses de gastos.' },
    { label: '1 a 3 meses', icon: '🟢', msg: 'Vas bien. Sigue ahorrando hasta tener 3 meses completos de gastos cubiertos.' },
    { label: 'Más de 3 meses', icon: '✅', msg: '¡Excelente! Tienes un fondo sólido. Ahora invierte el excedente.' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Plan de Emergencia 🆘</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Crea tu fondo de emergencia en 90 días con ayuda de la IA</p>

      {/* Test */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Si perdieras tu trabajo HOY, ¿cuánto tiempo podrías vivir?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
          {TEST_RESULTS.map((t, i) => (
            <div key={i} onClick={() => setTest(i)} style={{ padding: 16, borderRadius: 10, border: test === i ? '2px solid var(--primary)' : '1px solid #E5E7EB', background: test === i ? 'var(--pale-green)' : 'white', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{t.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4 }}>{t.label}</div>
            </div>
          ))}
        </div>
        {test !== null && (
          <div style={{ marginTop: 16, padding: 14, borderRadius: 10, background: test <= 1 ? '#FEE2E2' : '#D1FAE5' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: test <= 1 ? '#991B1B' : '#065F46' }}>{TEST_RESULTS[test].msg}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Calculator */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>¿Cuánto necesitas?</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: 'var(--gray)' }}>Tus gastos fijos mensuales</span><span style={{ fontWeight: 600 }}>{fmt(gastos)}</span>
            </div>
            <input type="range" min={500} max={6000} step={100} value={gastos} onChange={e => setGastos(+e.target.value)} style={{ width: '100%' }} />
          </div>

          {/* 3 metas */}
          {[
            { l: 'Meta 1: Seguridad básica', v: meta1, s: porSemana1, color: '#F77F00' },
            { l: 'Meta 2: Un mes de gastos', v: meta2, s: porSemana2, color: '#FFB703' },
            { l: 'Meta 3: Tres meses (ideal)', v: meta3, s: porSemana3, color: '#52B788' },
          ].map(m => (
            <div key={m.l} style={{ padding: 14, borderRadius: 10, border: `1px solid ${m.color}33`, background: m.color + '11', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{m.l}</span>
                <span className="font-bebas" style={{ fontSize: 22, color: m.color }}>{fmt(m.v)}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>Ahorra {fmt(m.s)}/semana para llegar en 90 días</div>
            </div>
          ))}

          <button onClick={generarPlan} disabled={loading} className="btn-green" style={{ width: '100%', marginTop: 8, fontSize: 15 }}>
            {loading ? 'Generando tu plan...' : '🤖 Generar mi plan de 90 días con IA →'}
          </button>
        </div>

        {/* Plan / Info */}
        <div>
          {plan ? (
            <div className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.8, color: 'var(--dark)', background: 'var(--pale-green)' }}>{plan}</div>
          ) : (
            <div>
              <div className="card" style={{ marginBottom: 14 }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Emergencia vs NO emergencia</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: '#FEE2E2', borderRadius: 10, padding: 14 }}>
                    <div style={{ fontWeight: 700, color: '#991B1B', fontSize: 14, marginBottom: 8 }}>SÍ es emergencia</div>
                    {['Reparación del carro', 'Emergencia médica', 'Pérdida de trabajo', 'Reparación urgente de la casa'].map(e => (
                      <div key={e} style={{ fontSize: 13, color: '#7F1D1D', padding: '3px 0' }}>🔴 {e}</div>
                    ))}
                  </div>
                  <div style={{ background: '#D1FAE5', borderRadius: 10, padding: 14 }}>
                    <div style={{ fontWeight: 700, color: '#065F46', fontSize: 14, marginBottom: 8 }}>NO es emergencia</div>
                    {['iPhone nuevo', 'Vacaciones', 'Ropa de marca', 'Muebles nuevos'].map(e => (
                      <div key={e} style={{ fontSize: 13, color: '#065F46', padding: '3px 0' }}>🟢 {e}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card">
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>¿Dónde guardar el fondo?</h3>
                <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>
                  En una cuenta de ahorros de <strong>alto rendimiento</strong> (high-yield savings) separada de tu cuenta principal. Ally Bank, Marcus o SoFi ofrecen 4%+ de interés anual. NO lo guardes en tu checking — lo vas a gastar.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
