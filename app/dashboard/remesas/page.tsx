'use client'
import { useState } from 'react'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

const SERVICIOS = [
  { n: 'Wise', fee: 4.5, feePct: 0.5, tiempo: '1-2 días', impuesto: false, app: true, url: 'https://wise.com' },
  { n: 'Remitly', fee: 3.99, feePct: 0, tiempo: 'Minutos', impuesto: false, app: true, url: 'https://remitly.com' },
  { n: 'Western Union (banco)', fee: 5, feePct: 0, tiempo: 'Minutos', impuesto: false, app: true, url: 'https://westernunion.com' },
  { n: 'Western Union (efectivo)', fee: 7, feePct: 0, tiempo: 'Minutos', impuesto: true, app: false, url: 'https://westernunion.com' },
  { n: 'MoneyGram (efectivo)', fee: 5, feePct: 0, tiempo: 'Minutos', impuesto: true, app: false, url: 'https://moneygram.com' },
  { n: 'Zelle', fee: 0, feePct: 0, tiempo: 'Minutos', impuesto: false, app: true, url: '' },
]

export default function RemesasPage() {
  const [monto, setMonto] = useState(500)
  const [metodo, setMetodo] = useState<'efectivo'|'banco'>('efectivo')

  const impuestoMes = metodo === 'efectivo' ? monto * 0.01 : 0
  const impuestoAno = impuestoMes * 12
  const ahorroAnual = metodo === 'efectivo' ? monto * 0.01 * 12 : 0

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Remesas 2026 💸</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 20 }}>El impuesto ya está activo. Calcula cuánto pierdes y cómo evitarlo.</p>

      {/* Alerta */}
      <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#991B1B', marginBottom: 4 }}>⚠️ IMPUESTO ACTIVO desde enero 2026</div>
        <p style={{ fontSize: 14, color: '#7F1D1D', lineHeight: 1.6 }}>
          Si mandas dinero en <strong>efectivo</strong> o <strong>money order</strong>, pagas 1% de impuesto.
          Las transferencias por <strong>banco o tarjeta de débito NO pagan</strong>.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>¿Cuánto mandas al mes?</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
            <span style={{ color: 'var(--gray)' }}>Monto mensual</span>
            <span style={{ fontWeight: 700 }}>{fmt(monto)}</span>
          </div>
          <input type="range" min={50} max={2000} step={50} value={monto} onChange={e => setMonto(+e.target.value)} style={{ width: '100%', marginBottom: 20 }} />

          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, color: 'var(--dark)' }}>¿Cómo lo mandas actualmente?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { k: 'efectivo' as const, l: '💵 Efectivo / Money Order', d: 'Paga impuesto 1%' },
              { k: 'banco' as const, l: '🏦 Banco / Tarjeta', d: 'NO paga impuesto' },
            ].map(m => (
              <div key={m.k} onClick={() => setMetodo(m.k)} style={{ padding: 14, borderRadius: 10, border: metodo === m.k ? '2px solid var(--primary)' : '1px solid #E5E7EB', background: metodo === m.k ? 'var(--pale-green)' : 'white', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{m.l}</div>
                <div style={{ fontSize: 12, color: metodo === m.k ? 'var(--primary)' : 'var(--gray)' }}>{m.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Result */}
          <div className="card" style={{ marginBottom: 16, padding: 28, textAlign: 'center', background: metodo === 'efectivo' ? '#FEF2F2' : '#ECFDF5' }}>
            {metodo === 'efectivo' ? (
              <>
                <div style={{ fontSize: 15, color: '#991B1B', fontWeight: 600, marginBottom: 8 }}>Estás perdiendo dinero cada mes</div>
                <div className="font-bebas" style={{ fontSize: 56, color: '#D62828' }}>{fmt(impuestoAno)}/año</div>
                <div style={{ fontSize: 14, color: '#991B1B', marginBottom: 16 }}>{fmt(impuestoMes)}/mes en impuesto</div>
                <div style={{ background: '#D1FAE5', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 700, color: '#065F46', fontSize: 15 }}>💡 Si cambias a transferencia bancaria:</div>
                  <div style={{ fontSize: 14, color: '#065F46', marginTop: 4 }}>Ahorras <strong>{fmt(ahorroAnual)}/año</strong> — el impuesto NO aplica</div>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 56, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#065F46', marginBottom: 4 }}>¡Bien! Tu método NO paga impuesto</div>
                <div style={{ fontSize: 14, color: 'var(--gray)' }}>Las transferencias bancarias y por tarjeta están exentas del impuesto del 1%</div>
              </>
            )}
          </div>

          {/* Comparador */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Compara servicios de envío</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--primary)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 700 }}>Servicio</th>
                    <th style={{ textAlign: 'right', padding: '8px 6px' }}>Fee</th>
                    <th style={{ textAlign: 'center', padding: '8px 6px' }}>Tiempo</th>
                    <th style={{ textAlign: 'center', padding: '8px 6px' }}>¿Impuesto?</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICIOS.map(s => (
                    <tr key={s.n} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '10px 6px', fontWeight: 600 }}>
                        {s.url ? <a href={s.url} target="_blank" rel="noopener" style={{ color: 'var(--primary)', textDecoration: 'none' }}>{s.n} ↗</a> : s.n}
                      </td>
                      <td style={{ textAlign: 'right', padding: '10px 6px' }}>{s.fee > 0 ? fmt(s.fee) : 'Gratis'}{s.feePct > 0 ? ` + ${s.feePct}%` : ''}</td>
                      <td style={{ textAlign: 'center', padding: '10px 6px' }}>{s.tiempo}</td>
                      <td style={{ textAlign: 'center', padding: '10px 6px' }}>
                        <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.impuesto ? '#FEE2E2' : '#D1FAE5', color: s.impuesto ? '#991B1B' : '#065F46' }}>{s.impuesto ? 'SÍ 1%' : 'NO'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
