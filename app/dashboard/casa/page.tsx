'use client'
import { useState } from 'react'

const LOANS: Record<string,{down:number,minScore:number,label:string,desc:string}> = {
  FHA:          { down: 3.5, minScore: 580, label: 'FHA', desc: 'El favorito de los hispanos. Solo 3.5% de enganche.' },
  Convencional: { down: 5,   minScore: 620, label: 'Convencional', desc: 'Más opciones pero necesitas más score.' },
  VA:           { down: 0,   minScore: 580, label: 'VA', desc: '0% de enganche. Solo para militares y veteranos.' },
  USDA:         { down: 0,   minScore: 640, label: 'USDA', desc: '0% de enganche. Solo en zonas rurales.' },
}

function getRate(score: number, tipo: string) {
  let base: Record<string,number> = { FHA: 7.0, Convencional: 6.6, VA: 6.1, USDA: 6.3 }
  let r = base[tipo] || 6.8
  if (score >= 760) r -= 0.7; else if (score >= 720) r -= 0.4; else if (score >= 680) r -= 0.1
  else if (score >= 640) r += 0.3; else if (score >= 600) r += 0.8; else r += 1.4
  return Math.max(r, 3)
}

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US') }

const DERECHOS = [
  { t: 'No pueden discriminarte', d: 'No puede dirigirte a ciertas áreas por tu raza, origen o idioma. Ley: Fair Housing Act.' },
  { t: 'Deben revelar defectos', d: 'El vendedor y el realtor deben decirte todos los problemas de la propiedad. Si no lo hacen, puedes demandar.' },
  { t: 'Tienes 3 días para cancelar', d: 'En ciertos contratos tienes el derecho de cancelar dentro de 3 días hábiles sin penalidad.' },
  { t: 'La comisión se negocia', d: 'Desde 2024 la comisión del realtor es negociable. Típica: 2.5-3% por agente. Pregunta siempre.' },
  { t: 'Necesitas un appraisal', d: 'Nunca pagues más de lo que vale la casa. El appraisal independiente protege tu inversión.' },
  { t: 'Exige el Loan Estimate', d: 'El prestamista tiene 3 días para darte este documento. Compara TODOS los términos entre lenders.' },
]

const GLOSARIO = [
  { en: 'Down Payment', es: 'Enganche', ej: 'El dinero que pagas por adelantado. Para una casa de $200,000 con FHA: $7,000.' },
  { en: 'APR', es: 'Tasa real total', ej: 'Incluye interés + todos los cargos. Siempre compara el APR, no solo la tasa de interés.' },
  { en: 'PMI', es: 'Seguro hipotecario privado', ej: 'Lo pagas si tu enganche es menor al 20%. Cuesta entre 0.5% y 1.5% al año.' },
  { en: 'Escrow', es: 'Cuenta de custodia', ej: 'El banco guarda parte de tu pago mensual para pagar impuestos y seguro automáticamente.' },
  { en: 'Equity', es: 'Plusvalía', ej: 'La parte de la casa que ya es tuya. Sube cuando pagas y cuando el valor de la casa sube.' },
  { en: 'Closing Costs', es: 'Costos de cierre', ej: 'Gastos adicionales: 2-5% del precio. Incluye fees del banco, appraisal, título, etc.' },
  { en: 'Pre-Approval', es: 'Pre-aprobación', ej: 'El banco verificó tus ingresos y crédito. Mucho más fuerte que la pre-calificación.' },
  { en: 'DTI', es: 'Relación deuda/ingreso', ej: 'Tus deudas mensuales ÷ tu ingreso bruto. Máximo para hipoteca: generalmente 43%.' },
  { en: 'Title Insurance', es: 'Seguro de título', ej: 'Protege contra problemas legales con la propiedad. Se paga una vez en el cierre.' },
  { en: 'Amortization', es: 'Amortización', ej: 'Al principio pagas más interés que capital. Con el tiempo se invierte.' },
]

export default function CasaPage() {
  const [precio, setPrecio] = useState(250000)
  const [score, setScore] = useState(680)
  const [ingreso, setIngreso] = useState(5000)
  const [deudas, setDeudas] = useState(400)
  const [tipo, setTipo] = useState('FHA')
  const [plazo, setPlazo] = useState(30)
  const [tab, setTab] = useState<'calc'|'guia'|'glosario'>('calc')

  const loan = LOANS[tipo]
  const downPct = loan.down
  const down = precio * (downPct / 100)
  const loanAmt = precio - down
  const rate = getRate(score, tipo) / 100 / 12
  const n = plazo * 12
  const monthly = loanAmt * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1)
  const pmi = (downPct < 20 && tipo !== 'VA') ? loanAmt * 0.008 / 12 : 0
  const tax = precio * 0.018 / 12  // Texas property tax ~1.8%
  const ins = precio * 0.006 / 12
  const piti = monthly + pmi + tax + ins
  const total = monthly * n
  const interest = total - loanAmt
  const dti = Math.round((piti + deudas) / ingreso * 100)
  const closing = precio * 0.03
  const eligible = score >= loan.minScore
  const dtiColor = dti > 43 ? '#D62828' : dti > 36 ? '#F77F00' : '#52B788'

  const S = (l: string, v: number, set: (n:number)=>void, min: number, max: number, step: number, fmt_fn: (n:number)=>string) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
        <span style={{ color: 'var(--gray)' }}>{l}</span>
        <span style={{ fontWeight: 600 }}>{fmt_fn(v)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)} style={{ width: '100%' }} />
    </div>
  )

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Comprar Casa 🏠</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 20 }}>Calculadora, tus derechos y todo lo que necesitas saber</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[{k:'calc',l:'Calculadora'},{k:'guia',l:'Tus Derechos'},{k:'glosario',l:'Glosario'}].map(t => (
          <button key={t.k} onClick={() => setTab(t.k as any)} style={{ padding: '10px 20px', borderRadius: 8, border: tab === t.k ? '2px solid var(--primary)' : '1px solid #E5E7EB', background: tab === t.k ? 'var(--pale-green)' : 'white', fontWeight: tab === t.k ? 700 : 400, fontSize: 14, cursor: 'pointer', color: 'var(--dark)' }}>{t.l}</button>
        ))}
      </div>

      {tab === 'calc' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {/* Inputs */}
          <div className="card">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Tu situación</h2>
            {S('Precio de la casa', precio, setPrecio, 100000, 800000, 5000, fmt)}
            {S('Tu puntaje de crédito', score, setScore, 500, 850, 10, n => String(n))}
            {S('Ingreso mensual bruto', ingreso, setIngreso, 2000, 15000, 250, fmt)}
            {S('Deudas mensuales', deudas, setDeudas, 0, 3000, 50, fmt)}

            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', marginBottom: 10 }}>Tipo de préstamo</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {Object.entries(LOANS).map(([k, v]) => (
                <div key={k} onClick={() => setTipo(k)} style={{ padding: '10px 12px', borderRadius: 8, border: tipo === k ? '2px solid var(--primary)' : '1px solid #E5E7EB', background: tipo === k ? 'var(--pale-green)' : 'white', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{v.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray)' }}>{v.down}% down · Mín {v.minScore}</div>
                </div>
              ))}
            </div>

            <select value={plazo} onChange={e => setPlazo(+e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 14, background: 'white' }}>
              <option value={30}>30 años (pago más bajo)</option>
              <option value={20}>20 años</option>
              <option value={15}>15 años (menos intereses)</option>
            </select>
          </div>

          {/* Results */}
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Tus números</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { l: 'Enganche', v: fmt(down), s: `${downPct}% del precio` },
                  { l: 'Préstamo total', v: fmt(loanAmt), s: `Tasa: ${getRate(score, tipo).toFixed(2)}%` },
                  { l: 'Pago mensual REAL', v: fmt(piti), s: 'P+I+Seguro+Tax' + (pmi > 0 ? '+PMI' : '') },
                  { l: 'Total en ' + plazo + ' años', v: fmt(total), s: `Solo intereses: ${fmt(interest)}` },
                ].map(m => (
                  <div key={m.l} style={{ background: 'var(--light)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 4 }}>{m.l}</div>
                    <div className="font-bebas" style={{ fontSize: 26, color: 'var(--primary)' }}>{m.v}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray)' }}>{m.s}</div>
                  </div>
                ))}
              </div>

              {/* DTI */}
              <div style={{ marginTop: 16, padding: 14, background: 'var(--light)', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                  <span style={{ color: 'var(--gray)' }}>Tu DTI (deuda/ingreso)</span>
                  <span style={{ fontWeight: 700, color: dtiColor }}>{dti}%</span>
                </div>
                <div className="progress"><div className="progress-fill" style={{ width: `${Math.min(dti, 100)}%`, background: dtiColor }} /></div>
                <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 4 }}>
                  {dti > 43 ? 'DTI muy alto — difícil calificar con la mayoría de lenders' : dti > 36 ? 'DTI al límite — califica pero ajustado' : 'DTI saludable — buenas opciones disponibles'}
                </div>
              </div>

              {/* Elegibilidad */}
              <div style={{ marginTop: 12, padding: 14, borderRadius: 10, background: eligible ? '#D1FAE5' : '#FEE2E2' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: eligible ? '#065F46' : '#991B1B' }}>
                  {eligible ? `✓ Con ${score} puntos y préstamo ${tipo} tienes opciones reales de aprobación` : `✗ Necesitas mínimo ${loan.minScore} de score para ${tipo}. Te faltan ${loan.minScore - score} puntos.`}
                </div>
              </div>
            </div>

            {/* Costos de cierre */}
            <div className="card">
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Costos de cierre estimados</h2>
              {[
                ['Fee del prestamista', precio * 0.01],
                ['Appraisal (tasación)', 500],
                ['Seguro de título', precio * 0.005],
                ['Impuestos prepagados', tax * 2],
                ['Inspección de la casa', 450],
                ['Attorney / cierre', 800],
              ].map(([name, amt]) => (
                <div key={name as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <span style={{ color: 'var(--gray)' }}>{name}</span>
                  <span>{fmt(amt as number)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, padding: '10px 0', fontSize: 14 }}>
                <span>Total estimado</span><span>{fmt(closing)}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>Esto es ADICIONAL al enganche. Necesitas esto el día del cierre.</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'guia' && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Lo que el realtor NO puede hacer legalmente</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {DERECHOS.map(d => (
              <div key={d.t} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--primary)' }}>{d.t}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.6 }}>{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'glosario' && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Términos de la casa explicados en simple</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {GLOSARIO.map(g => (
              <div key={g.en} className="card" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)' }}>{g.en}</span>
                  <span style={{ fontSize: 13, color: 'var(--gray)' }}>= {g.es}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--dark)', lineHeight: 1.6 }}>
                  <strong>Por ejemplo:</strong> {g.ej}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
