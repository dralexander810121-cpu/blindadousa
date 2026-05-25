'use client'
import { useState } from 'react'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

const TIPOS = [
  { n: 'Payday Loans', d: 'Te prestan $300-$1,000 hasta tu próximo cheque. APR real: 400%-600%. Si no pagas a tiempo, renuevas y pagas el doble.', p: 'Pide un adelanto de sueldo a tu empleador o un préstamo de tu credit union.' },
  { n: 'Title Loans', d: 'Usas el título de tu carro como garantía. Si no pagas, te quitan el carro. APR típico: 100%-300%.', p: 'Vende algo que no necesites, pide prestado a familiares, o negocia un plan de pagos con el acreedor original.' },
  { n: 'Rent-to-Own', d: 'Pagas mensual por un mueble o electrodoméstico. Al final pagas 2-3 veces el precio original.', p: 'Compra usado en Facebook Marketplace o espera a una venta. Nunca es urgente comprar un sofá nuevo.' },
  { n: 'Tax Refund Loans', d: 'Te adelantan tu devolución de impuestos pero cobran fees enormes. Podrías esperar 2-3 semanas y recibirlo gratis.', p: 'Declara con Free File del IRS (gratis) y recibe tu devolución en 2-3 semanas por depósito directo.' },
]

export default function PrestamosPage() {
  const [monto, setMonto] = useState(1000)
  const [tasa, setTasa] = useState(15)
  const [pagos, setPagos] = useState(12)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'scanner'|'tipos'>('scanner')

  async function escanear() {
    setLoading(true)
    const r = tasa / 100 / 12
    const pago = monto * (r * Math.pow(1 + r, pagos)) / (Math.pow(1 + r, pagos) - 1)
    const total = pago * pagos
    const intereses = total - monto
    const apporJusto = 8
    const rJusto = apporJusto / 100 / 12
    const pagoJusto = monto * (rJusto * Math.pow(1 + rJusto, pagos)) / (Math.pow(1 + rJusto, pagos) - 1)
    const totalJusto = pagoJusto * pagos
    const exceso = total - totalJusto

    let veredicto = 'razonable'
    if (tasa > 36) veredicto = 'muy_abusivo'
    else if (tasa > 20) veredicto = 'abusivo'

    const res = await fetch('/api/ai/asistente', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensaje: `Me ofrecen un préstamo de ${fmt(monto)} a ${tasa}% APR a ${pagos} meses. El pago mensual sería ${fmt(pago)}. Total a pagar: ${fmt(total)}. ¿Es justo o abusivo? Dame tu opinión directa en 3-4 líneas y alternativas.`, historial: [] }) })
    const data = await res.json()

    setResult({ pago, total, intereses, exceso, veredicto, totalJusto, analisis: data.respuesta })
    setLoading(false)
  }

  const vColor = { razonable: '#52B788', abusivo: '#F77F00', muy_abusivo: '#D62828' }
  const vLabel = { razonable: '✅ RAZONABLE', abusivo: '⚠️ ABUSIVO', muy_abusivo: '🚨 MUY ABUSIVO' }

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Escáner de Préstamos 🚨</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 20 }}>¿Te ofrecieron un préstamo? Aquí descubres si es justo o si te quieren engañar.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[{k:'scanner',l:'🔍 Escáner'},{k:'tipos',l:'⚠️ Préstamos Peligrosos'}].map(t => (
          <button key={t.k} onClick={() => setTab(t.k as any)} style={{ padding: '10px 18px', borderRadius: 8, border: tab === t.k ? '2px solid var(--primary)' : '1px solid #E5E7EB', background: tab === t.k ? 'var(--pale-green)' : 'white', fontWeight: tab === t.k ? 700 : 400, fontSize: 14, cursor: 'pointer', color: 'var(--dark)' }}>{t.l}</button>
        ))}
      </div>

      {tab === 'scanner' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          <div className="card">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Ingresa los términos que te ofrecieron</h2>
            {[
              { l: 'Monto del préstamo', v: monto, set: setMonto, min: 100, max: 50000, step: 100, f: fmt },
              { l: 'Tasa de interés (APR %)', v: tasa, set: setTasa, min: 1, max: 100, step: 1, f: (n:number) => n + '%' },
              { l: 'Número de pagos (meses)', v: pagos, set: setPagos, min: 1, max: 84, step: 1, f: (n:number) => n + ' meses' },
            ].map(s => (
              <div key={s.l} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                  <span style={{ color: 'var(--gray)' }}>{s.l}</span><span style={{ fontWeight: 600 }}>{s.f(s.v)}</span>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.v} onChange={e => s.set(+e.target.value)} style={{ width: '100%' }} />
              </div>
            ))}
            <button onClick={escanear} disabled={loading} className="btn-primary" style={{ width: '100%', fontSize: 16, marginTop: 8 }}>
              {loading ? 'Analizando...' : '🔍 ANALIZAR ESTE PRÉSTAMO'}
            </button>
          </div>

          <div>
            {result && (
              <div className="card" style={{ border: `2px solid ${(vColor as any)[result.veredicto]}` }}>
                {/* Veredicto */}
                <div style={{ textAlign: 'center', marginBottom: 20, padding: 20, background: (vColor as any)[result.veredicto] + '11', borderRadius: 10 }}>
                  <div className="font-bebas" style={{ fontSize: 36, color: (vColor as any)[result.veredicto] }}>{(vLabel as any)[result.veredicto]}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                  <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>Pago mensual</div>
                    <div className="font-bebas" style={{ fontSize: 26, color: 'var(--dark)' }}>{fmt(result.pago)}</div>
                  </div>
                  <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>Total a pagar</div>
                    <div className="font-bebas" style={{ fontSize: 26, color: 'var(--dark)' }}>{fmt(result.total)}</div>
                  </div>
                  <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>Solo intereses</div>
                    <div className="font-bebas" style={{ fontSize: 26, color: '#D62828' }}>{fmt(result.intereses)}</div>
                  </div>
                  <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--gray)' }}>De más vs justo</div>
                    <div className="font-bebas" style={{ fontSize: 26, color: '#D62828' }}>{fmt(result.exceso)}</div>
                  </div>
                </div>

                {result.analisis && (
                  <div style={{ background: 'var(--pale-green)', borderRadius: 10, padding: 16, fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--primary)' }}>🤖 Análisis de Blindado:</div>
                    {result.analisis}
                  </div>
                )}
              </div>
            )}
            {!result && (
              <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <p style={{ color: 'var(--gray)' }}>Ingresa los términos del préstamo y presiona "Analizar"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'tipos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {TIPOS.map(t => (
            <div key={t.n} className="card" style={{ borderLeft: '4px solid #D62828', padding: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: '#D62828', marginBottom: 6 }}>🚨 {t.n}</h3>
              <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6, marginBottom: 10 }}>{t.d}</p>
              <div style={{ background: '#D1FAE5', borderRadius: 8, padding: '10px 14px' }}>
                <p style={{ fontSize: 13, color: '#065F46' }}><strong>💡 Alternativa segura:</strong> {t.p}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
