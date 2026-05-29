'use client'
import { useState } from 'react'
import {
  DashDisplay,
  DashOption,
  DashPanel,
  DashRangeRow,
} from '@/components/dashboard/DashPanel'

const LOANS: Record<string, { down: number; minScore: number; label: string; desc: string }> = {
  FHA: { down: 3.5, minScore: 580, label: 'FHA', desc: 'El favorito de los hispanos. Solo 3.5% de enganche.' },
  Convencional: { down: 5, minScore: 620, label: 'Convencional', desc: 'Más opciones pero necesitas más score.' },
  VA: { down: 0, minScore: 580, label: 'VA', desc: '0% de enganche. Solo para militares y veteranos.' },
  USDA: { down: 0, minScore: 640, label: 'USDA', desc: '0% de enganche. Solo en zonas rurales.' },
}

function getRate(score: number, tipo: string) {
  const base: Record<string, number> = { FHA: 7.0, Convencional: 6.6, VA: 6.1, USDA: 6.3 }
  let r = base[tipo] || 6.8
  if (score >= 760) r -= 0.7
  else if (score >= 720) r -= 0.4
  else if (score >= 680) r -= 0.1
  else if (score >= 640) r += 0.3
  else if (score >= 600) r += 0.8
  else r += 1.4
  return Math.max(r, 3)
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const DERECHOS = [
  { t: 'No pueden discriminarte', d: 'No puede dirigirte a ciertas áreas por tu raza, origen o idioma. Ley: Fair Housing Act.' },
  { t: 'Deben revelar defectos', d: 'El vendedor y el realtor deben decirte todos los problemas de la propiedad. Si no lo hacen, puedes demandar.' },
  { t: 'Tienes 3 días para cancelar', d: 'En ciertos contratos tienes el derecho de cancelar dentro de 3 días hábiles sin penalidad.' },
  { t: 'La comisión se negocia', d: 'Desde 2024 la comisión del realtor es negociable. Típica: 2.5–3% por agente. Pregunta siempre.' },
  { t: 'Necesitas un appraisal', d: 'Nunca pagues más de lo que vale la casa. El appraisal independiente protege tu inversión.' },
  { t: 'Exige el Loan Estimate', d: 'El prestamista tiene 3 días para darte este documento. Compara TODOS los términos entre lenders.' },
]

const GLOSARIO = [
  { en: 'Down Payment', es: 'Enganche', ej: 'El dinero que pagas por adelantado. Para una casa de $200,000 con FHA: $7,000.' },
  { en: 'APR', es: 'Tasa real total', ej: 'Incluye interés + todos los cargos. Siempre compara el APR, no solo la tasa de interés.' },
  { en: 'PMI', es: 'Seguro hipotecario privado', ej: 'Lo pagas si tu enganche es menor al 20%. Cuesta entre 0.5% y 1.5% al año.' },
  { en: 'Escrow', es: 'Cuenta de custodia', ej: 'El banco guarda parte de tu pago mensual para pagar impuestos y seguro automáticamente.' },
  { en: 'Equity', es: 'Plusvalía', ej: 'La parte de la casa que ya es tuya. Sube cuando pagas y cuando el valor de la casa sube.' },
  { en: 'Closing Costs', es: 'Costos de cierre', ej: 'Gastos adicionales: 2–5% del precio. Incluye fees del banco, appraisal, título, etc.' },
  { en: 'Pre-Approval', es: 'Pre-aprobación', ej: 'El banco verificó tus ingresos y crédito. Mucho más fuerte que la pre-calificación.' },
  { en: 'DTI', es: 'Relación deuda/ingreso', ej: 'Tus deudas mensuales ÷ tu ingreso bruto. Máximo para hipoteca: generalmente 43%.' },
  { en: 'Title Insurance', es: 'Seguro de título', ej: 'Protege contra problemas legales con la propiedad. Se paga una vez en el cierre.' },
  { en: 'Amortization', es: 'Amortización', ej: 'Al principio pagas más interés que capital. Con el tiempo se invierte.' },
]

const TABS = [
  { k: 'calc', l: 'Calculadora' },
  { k: 'guia', l: 'Tus derechos' },
  { k: 'glosario', l: 'Glosario' },
] as const

type TabKey = (typeof TABS)[number]['k']

export default function CasaPage() {
  const [precio, setPrecio] = useState(250000)
  const [score, setScore] = useState(680)
  const [ingreso, setIngreso] = useState(5000)
  const [deudas, setDeudas] = useState(400)
  const [tipo, setTipo] = useState('FHA')
  const [plazo, setPlazo] = useState(30)
  const [tab, setTab] = useState<TabKey>('calc')

  const loan = LOANS[tipo]
  const downPct = loan.down
  const down = precio * (downPct / 100)
  const loanAmt = precio - down
  const rate = getRate(score, tipo) / 100 / 12
  const n = plazo * 12
  const monthly = (loanAmt * (rate * Math.pow(1 + rate, n))) / (Math.pow(1 + rate, n) - 1)
  const pmi = downPct < 20 && tipo !== 'VA' ? (loanAmt * 0.008) / 12 : 0
  const tax = (precio * 0.018) / 12
  const ins = (precio * 0.006) / 12
  const piti = monthly + pmi + tax + ins
  const total = monthly * n
  const interest = total - loanAmt
  const dti = Math.round(((piti + deudas) / ingreso) * 100)
  const closing = precio * 0.03
  const eligible = score >= loan.minScore

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Comprar casa</h1>
      <p className="dash-page-date mb-5">
        Calculadora, tus derechos y todo lo que necesitas saber
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.k}
            type="button"
            onClick={() => setTab(t.k)}
            className={`dash-tab-btn ${tab === t.k ? 'dash-tab-btn--active' : ''}`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {tab === 'calc' && (
        <div className="dash-grid-2">
          <DashPanel>
            <h2>Tu situación</h2>
            <DashRangeRow label="Precio de la casa" value={fmt(precio)}>
              <input
                type="range"
                min={100000}
                max={800000}
                step={5000}
                value={precio}
                onChange={(e) => setPrecio(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <DashRangeRow label="Tu puntaje de crédito" value={String(score)}>
              <input
                type="range"
                min={500}
                max={850}
                step={10}
                value={score}
                onChange={(e) => setScore(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <DashRangeRow label="Ingreso mensual bruto" value={fmt(ingreso)}>
              <input
                type="range"
                min={2000}
                max={15000}
                step={250}
                value={ingreso}
                onChange={(e) => setIngreso(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <DashRangeRow label="Deudas mensuales" value={fmt(deudas)}>
              <input
                type="range"
                min={0}
                max={3000}
                step={50}
                value={deudas}
                onChange={(e) => setDeudas(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>

            <p className="dash-form-label">Tipo de préstamo</p>
            <div className="dash-option-grid mb-4">
              {Object.entries(LOANS).map(([k, v]) => (
                <DashOption
                  key={k}
                  selected={tipo === k}
                  onClick={() => setTipo(k)}
                  title={v.label}
                  detail={`${v.down}% down · Mín ${v.minScore}`}
                />
              ))}
            </div>

            <label className="dash-form-label">Plazo</label>
            <select
              value={plazo}
              onChange={(e) => setPlazo(+e.target.value)}
              className="dash-select"
            >
              <option value={30}>30 años (pago más bajo)</option>
              <option value={20}>20 años</option>
              <option value={15}>15 años (menos intereses)</option>
            </select>
          </DashPanel>

          <div>
            <DashPanel className="mb-4">
              <h2>Tus números</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { l: 'Enganche', v: fmt(down), s: `${downPct}% del precio` },
                  { l: 'Préstamo total', v: fmt(loanAmt), s: `Tasa: ${getRate(score, tipo).toFixed(2)}%` },
                  {
                    l: 'Pago mensual real',
                    v: fmt(piti),
                    s: 'P+I+Seguro+Tax' + (pmi > 0 ? '+PMI' : ''),
                  },
                  { l: `Total en ${plazo} años`, v: fmt(total), s: `Solo intereses: ${fmt(interest)}` },
                ].map((m) => (
                  <div key={m.l} className="dash-panel !p-4 text-center">
                    <p className="text-xs text-[var(--text-muted)] mb-1">{m.l}</p>
                    <DashDisplay value={m.v} className="!text-2xl" />
                    <p className="text-xs text-[var(--text-muted)] mt-1">{m.s}</p>
                  </div>
                ))}
              </div>

              <DashRangeRow label="Tu DTI (deuda/ingreso)" value={`${dti}%`}>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(dti, 100)}%`,
                      background:
                        dti > 43
                          ? 'var(--red-500)'
                          : dti > 36
                            ? 'var(--amber-500)'
                            : 'var(--emerald-400)',
                    }}
                  />
                </div>
              </DashRangeRow>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                {dti > 43
                  ? 'DTI muy alto — difícil calificar con la mayoría de lenders'
                  : dti > 36
                    ? 'DTI al límite — califica pero ajustado'
                    : 'DTI saludable — buenas opciones disponibles'}
              </p>

              <div
                className={`dash-banner-inline mt-4 mb-0 ${
                  eligible ? 'dash-banner-inline--success' : 'dash-banner-inline--danger'
                }`}
              >
                <p className="text-sm font-semibold m-0">
                  {eligible
                    ? `Con ${score} puntos y préstamo ${tipo} tienes opciones reales de aprobación`
                    : `Necesitas mínimo ${loan.minScore} de score para ${tipo}. Te faltan ${loan.minScore - score} puntos.`}
                </p>
              </div>
            </DashPanel>

            <DashPanel>
              <h3>Costos de cierre estimados</h3>
              {[
                ['Fee del prestamista', precio * 0.01],
                ['Appraisal (tasación)', 500],
                ['Seguro de título', precio * 0.005],
                ['Impuestos prepagados', tax * 2],
                ['Inspección de la casa', 450],
                ['Attorney / cierre', 800],
              ].map(([name, amt]) => (
                <div
                  key={name as string}
                  className="flex justify-between text-sm py-2 border-b border-white/5"
                >
                  <span className="text-[var(--text-secondary)]">{name}</span>
                  <span className="text-[var(--text-primary)]">{fmt(amt as number)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold py-3 text-sm">
                <span>Total estimado</span>
                <span className="text-[var(--cyan-bright)]">{fmt(closing)}</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-0">
                Esto es adicional al enganche. Necesitas esto el día del cierre.
              </p>
            </DashPanel>
          </div>
        </div>
      )}

      {tab === 'guia' && (
        <div>
          <h2 className="dash-section-title">Lo que el realtor no puede hacer legalmente</h2>
          <div className="dash-grid-2">
            {DERECHOS.map((d) => (
              <DashPanel key={d.t} className="border-l-4 border-l-[var(--cyan-bright)]">
                <h3 className="!text-[var(--cyan-bright)] !mb-2">{d.t}</h3>
                <p className="m-0">{d.d}</p>
              </DashPanel>
            ))}
          </div>
        </div>
      )}

      {tab === 'glosario' && (
        <div>
          <h2 className="dash-section-title">Términos de la casa explicados en simple</h2>
          <div className="flex flex-col gap-3">
            {GLOSARIO.map((g) => (
              <DashPanel key={g.en}>
                <div className="flex flex-wrap gap-2 items-baseline mb-2">
                  <span className="font-bold text-[var(--cyan-bright)]">{g.en}</span>
                  <span className="text-sm text-[var(--text-muted)]">= {g.es}</span>
                </div>
                <p className="m-0">
                  <strong className="text-[var(--text-primary)]">Por ejemplo:</strong> {g.ej}
                </p>
              </DashPanel>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
