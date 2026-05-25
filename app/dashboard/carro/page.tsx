'use client'
import { useState } from 'react'

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

const TASAS = [
  { min: 781, max: 850, rate: 5.2, label: 'Excepcional', color: '#52B788' },
  { min: 661, max: 780, rate: 7.1, label: 'Bueno', color: '#40916C' },
  { min: 601, max: 660, rate: 9.5, label: 'Regular', color: '#F77F00' },
  { min: 501, max: 600, rate: 13.8, label: 'Bajo', color: '#D62828' },
  { min: 300, max: 500, rate: 21.5, label: 'Muy bajo', color: '#9B1C1C' },
]

const TRUCOS = [
  { t: 'Inflan tu tasa de interés', d: 'El dealer puede marcar el APR hasta 2.5% sobre lo que aprobó el banco. Solución: ve a tu credit union ANTES y llega con una oferta.', q: 'Diles: "Ya tengo una oferta de mi banco al X%. ¿Pueden igualarla o mejorarla?"' },
  { t: 'Productos no solicitados', d: 'Agregan warranties, seguros o accesorios al contrato sin tu permiso. Solución: revisa el contrato línea por línea antes de firmar.', q: 'Diles: "Quiero ver el desglose de cada cargo. No autorizo nada que no haya pedido."' },
  { t: 'Spot delivery (entrega condicional)', d: 'Te llevas el carro antes de que el banco apruebe el préstamo. Luego te llaman para cambiar los términos.', q: 'Diles: "No me llevo el carro hasta que el financiamiento esté 100% aprobado por escrito."' },
  { t: 'Ocultan el precio OTD', d: 'Te muestran el precio del carro pero no el "Out The Door" — precio final con impuestos, fees y títulos.', q: 'Diles: "¿Cuál es el precio Out The Door? Ese es el único que me importa."' },
  { t: 'Trade-in por debajo del valor', d: 'Valúan tu carro actual muy por debajo de lo real. Revisa el valor en Kelley Blue Book (kbb.com) ANTES.', q: 'Diles: "KBB valora mi carro en $X. ¿Por qué su oferta es más baja?"' },
  { t: 'Pagos mensuales engañosos', d: 'Te preguntan "¿cuánto quieres pagar al mes?" y estiran el plazo a 84 meses. Siempre negocia el precio total.', q: 'Diles: "No negocio por pago mensual. Hablemos del precio total del carro."' },
]

export default function CarroPage() {
  const [precio, setPrecio] = useState(25000)
  const [score, setScore] = useState(680)
  const [downPct, setDownPct] = useState(10)
  const [tradeIn, setTradeIn] = useState(0)
  const [ingreso, setIngreso] = useState(4000)
  const [plazo, setPlazo] = useState(60)
  const [tab, setTab] = useState<'calc'|'trucos'|'regla'>('calc')

  const tasa = TASAS.find(t => score >= t.min && score <= t.max) || TASAS[4]
  const downAmt = precio * (downPct / 100)
  const loanAmt = Math.max(0, precio - downAmt - tradeIn)
  const rate = tasa.rate / 100 / 12
  const monthly = loanAmt > 0 ? loanAmt * (rate * Math.pow(1 + rate, plazo)) / (Math.pow(1 + rate, plazo) - 1) : 0
  const total = monthly * plazo
  const interest = total - loanAmt
  const pctIngreso = Math.round(monthly / ingreso * 100)

  const regla20 = downPct >= 20
  const regla4 = plazo <= 48
  const regla10 = pctIngreso <= 10

  const S = (l: string, v: number, set: (n:number)=>void, min: number, max: number, step: number, f: (n:number)=>string) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
        <span style={{ color: 'var(--gray)' }}>{l}</span><span style={{ fontWeight: 600 }}>{f(v)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)} style={{ width: '100%' }} />
    </div>
  )

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Comprar Carro 🚗</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 20 }}>Tasa justa, calculadora y lo que el dealer no te dice</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[{k:'calc',l:'📊 Calculadora'},{k:'trucos',l:'⚠️ Trucos del Dealer'},{k:'regla',l:'✅ Regla 20/4/10'}].map(t => (
          <button key={t.k} onClick={() => setTab(t.k as any)} style={{ padding: '10px 18px', borderRadius: 8, border: tab === t.k ? '2px solid var(--primary)' : '1px solid #E5E7EB', background: tab === t.k ? 'var(--pale-green)' : 'white', fontWeight: tab === t.k ? 700 : 400, fontSize: 14, cursor: 'pointer', color: 'var(--dark)' }}>{t.l}</button>
        ))}
      </div>

      {tab === 'calc' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          <div className="card">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Tu situación</h2>
            {S('Precio del carro', precio, setPrecio, 8000, 80000, 500, fmt)}
            {S('Tu puntaje de crédito', score, setScore, 500, 850, 10, n => String(n))}
            {S('Enganche (%)', downPct, setDownPct, 0, 30, 1, n => n + '%')}
            {S('Valor de trade-in', tradeIn, setTradeIn, 0, 20000, 500, fmt)}
            {S('Ingreso mensual', ingreso, setIngreso, 1500, 12000, 250, fmt)}
            <select value={plazo} onChange={e => setPlazo(+e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 14, background: 'white' }}>
              {[24,36,48,60,72,84].map(m => <option key={m} value={m}>{m} meses ({m/12} años){m >= 72 ? ' ⚠️ No recomendado' : ''}</option>)}
            </select>
          </div>

          <div>
            {/* Tasa badge */}
            <div style={{ background: 'var(--light)', borderRadius: 10, padding: 14, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: 'var(--gray)' }}>Con tu puntaje de <strong style={{ color: 'var(--dark)' }}>{score}</strong>:</span>
              <span style={{ background: tasa.color + '22', color: tasa.color, padding: '6px 14px', borderRadius: 20, fontWeight: 700, fontSize: 15 }}>~{tasa.rate}% APR</span>
            </div>

            {/* Results */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { l: 'Enganche real', v: fmt(downAmt), s: downPct + '% del precio' },
                  { l: 'Monto financiado', v: fmt(loanAmt), s: `APR: ${tasa.rate}%` },
                  { l: 'Pago mensual', v: fmt(monthly), s: `${pctIngreso}% de tu ingreso` },
                  { l: 'Total pagado', v: fmt(total), s: `Intereses: ${fmt(interest)}` },
                ].map(m => (
                  <div key={m.l} style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 4 }}>{m.l}</div>
                    <div className="font-bebas" style={{ fontSize: 24, color: 'var(--primary)' }}>{m.v}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray)' }}>{m.s}</div>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: pctIngreso > 15 || plazo >= 72 ? '#FEE2E2' : '#D1FAE5' }}>
                <p style={{ fontSize: 13, color: pctIngreso > 15 || plazo >= 72 ? '#991B1B' : '#065F46', fontWeight: 600 }}>
                  {plazo >= 72 ? `⚠️ Préstamo de ${plazo} meses: pagarías ${fmt(interest)} en intereses. El carro se deprecia más rápido de lo que pagas.`
                    : pctIngreso > 15 ? `⚠️ El pago es ${pctIngreso}% de tu ingreso. Lo recomendado es máximo 10-15%.`
                    : `✓ El pago es ${pctIngreso}% de tu ingreso. Dentro de lo recomendado.`}
                </p>
              </div>
            </div>

            {/* Tabla de tasas */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Tasas reales por score</h3>
              {TASAS.map(t => (
                <div key={t.min} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 8, marginBottom: 4, border: score >= t.min && score <= t.max ? `2px solid ${t.color}` : '1px solid transparent', background: score >= t.min && score <= t.max ? t.color + '11' : 'transparent' }}>
                  <span style={{ fontSize: 13, color: 'var(--gray)' }}>{t.label} ({t.min}–{t.max})</span>
                  <span style={{ fontWeight: 700, color: t.color }}>~{t.rate}% APR</span>
                </div>
              ))}
              <p style={{ fontSize: 11, color: 'var(--gray)', marginTop: 8 }}>Tasas referenciales para autos nuevos. Usados tienen APR 1-3% más alto.</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'trucos' && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Lo que el dealer NO puede hacerte</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TRUCOS.map(t => (
              <div key={t.t} className="card" style={{ borderLeft: '4px solid var(--danger)', padding: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--danger)', marginBottom: 6 }}>🚨 {t.t}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6, marginBottom: 10 }}>{t.d}</p>
                <div style={{ background: 'var(--pale-green)', borderRadius: 8, padding: '10px 14px' }}>
                  <p style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>💬 {t.q}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'regla' && (
        <div className="card" style={{ maxWidth: 600 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>La Regla del 20/4/10</h2>
          <p style={{ color: 'var(--gray)', marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>La regla de oro para comprar carro sin arruinarte. Cumple las 3 para estar seguro.</p>
          {[
            { r: '20% de enganche', v: regla20, actual: `Tu enganche: ${downPct}%`, meta: 'Meta: mínimo 20%' },
            { r: 'Máximo 4 años de préstamo', v: regla4, actual: `Tu plazo: ${plazo} meses (${(plazo/12).toFixed(1)} años)`, meta: 'Meta: máximo 48 meses' },
            { r: 'Máximo 10% de tu ingreso', v: regla10, actual: `Tu pago: ${pctIngreso}% del ingreso`, meta: 'Meta: máximo 10%' },
          ].map(r => (
            <div key={r.r} style={{ padding: 16, borderRadius: 10, marginBottom: 12, background: r.v ? '#D1FAE5' : '#FEE2E2', border: `1px solid ${r.v ? '#BBF7D0' : '#FECACA'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: r.v ? '#065F46' : '#991B1B' }}>{r.v ? '✓' : '✗'} {r.r}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray)' }}>{r.actual} · {r.meta}</div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <span className="font-bebas" style={{ fontSize: 36, color: regla20 && regla4 && regla10 ? '#52B788' : '#D62828' }}>
              {regla20 && regla4 && regla10 ? '✓ CUMPLES LAS 3' : `${[regla20,regla4,regla10].filter(Boolean).length}/3`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
