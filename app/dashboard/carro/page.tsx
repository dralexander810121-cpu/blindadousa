'use client'
import { useState } from 'react'
import {
  DashDisplay,
  DashPanel,
  DashRangeRow,
} from '@/components/dashboard/DashPanel'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const TASAS = [
  { min: 781, max: 850, rate: 5.2, label: 'Excepcional', tone: 'success' as const },
  { min: 661, max: 780, rate: 7.1, label: 'Bueno', tone: 'success' as const },
  { min: 601, max: 660, rate: 9.5, label: 'Regular', tone: 'warn' as const },
  { min: 501, max: 600, rate: 13.8, label: 'Bajo', tone: 'danger' as const },
  { min: 300, max: 500, rate: 21.5, label: 'Muy bajo', tone: 'danger' as const },
]

const TRUCOS = [
  { t: 'Inflan tu tasa de interés', d: 'El dealer puede marcar el APR hasta 2.5% sobre lo que aprobó el banco. Solución: ve a tu credit union ANTES y llega con una oferta.', q: 'Diles: "Ya tengo una oferta de mi banco al X%. ¿Pueden igualarla o mejorarla?"' },
  { t: 'Productos no solicitados', d: 'Agregan warranties, seguros o accesorios al contrato sin tu permiso. Solución: revisa el contrato línea por línea antes de firmar.', q: 'Diles: "Quiero ver el desglose de cada cargo. No autorizo nada que no haya pedido."' },
  { t: 'Spot delivery (entrega condicional)', d: 'Te llevas el carro antes de que el banco apruebe el préstamo. Luego te llaman para cambiar los términos.', q: 'Diles: "No me llevo el carro hasta que el financiamiento esté 100% aprobado por escrito."' },
  { t: 'Ocultan el precio OTD', d: 'Te muestran el precio del carro pero no el "Out The Door" — precio final con impuestos, fees y títulos.', q: 'Diles: "¿Cuál es el precio Out The Door? Ese es el único que me importa."' },
  { t: 'Trade-in por debajo del valor', d: 'Valúan tu carro actual muy por debajo de lo real. Revisa el valor en Kelley Blue Book (kbb.com) ANTES.', q: 'Diles: "KBB valora mi carro en $X. ¿Por qué su oferta es más baja?"' },
  { t: 'Pagos mensuales engañosos', d: 'Te preguntan "¿cuánto quieres pagar al mes?" y estiran el plazo a 84 meses. Siempre negocia el precio total.', q: 'Diles: "No negocio por pago mensual. Hablemos del precio total del carro."' },
]

const TABS = [
  { k: 'calc', l: 'Calculadora' },
  { k: 'trucos', l: 'Trucos del dealer' },
  { k: 'regla', l: 'Regla 20/4/10' },
] as const

type TabKey = (typeof TABS)[number]['k']

export default function CarroPage() {
  const [precio, setPrecio] = useState(25000)
  const [score, setScore] = useState(680)
  const [downPct, setDownPct] = useState(10)
  const [tradeIn, setTradeIn] = useState(0)
  const [ingreso, setIngreso] = useState(4000)
  const [plazo, setPlazo] = useState(60)
  const [tab, setTab] = useState<TabKey>('calc')

  const tasa = TASAS.find((t) => score >= t.min && score <= t.max) || TASAS[4]
  const downAmt = precio * (downPct / 100)
  const loanAmt = Math.max(0, precio - downAmt - tradeIn)
  const rate = tasa.rate / 100 / 12
  const monthly =
    loanAmt > 0 ? (loanAmt * (rate * Math.pow(1 + rate, plazo))) / (Math.pow(1 + rate, plazo) - 1) : 0
  const total = monthly * plazo
  const interest = total - loanAmt
  const pctIngreso = Math.round((monthly / ingreso) * 100)

  const regla20 = downPct >= 20
  const regla4 = plazo <= 48
  const regla10 = pctIngreso <= 10

  const warningLong = plazo >= 72
  const warningIncome = pctIngreso > 15

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Comprar carro</h1>
      <p className="dash-page-date mb-5">
        Tasa justa, calculadora y lo que el dealer no te dice
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
            <DashRangeRow label="Precio del carro" value={fmt(precio)}>
              <input
                type="range"
                min={8000}
                max={80000}
                step={500}
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
            <DashRangeRow label="Enganche (%)" value={`${downPct}%`}>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={downPct}
                onChange={(e) => setDownPct(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <DashRangeRow label="Valor de trade-in" value={fmt(tradeIn)}>
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={tradeIn}
                onChange={(e) => setTradeIn(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <DashRangeRow label="Ingreso mensual" value={fmt(ingreso)}>
              <input
                type="range"
                min={1500}
                max={12000}
                step={250}
                value={ingreso}
                onChange={(e) => setIngreso(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <label className="dash-form-label">Plazo del préstamo</label>
            <select
              value={plazo}
              onChange={(e) => setPlazo(+e.target.value)}
              className="dash-select"
            >
              {[24, 36, 48, 60, 72, 84].map((m) => (
                <option key={m} value={m}>
                  {m} meses ({m / 12} años){m >= 72 ? ' — no recomendado' : ''}
                </option>
              ))}
            </select>
          </DashPanel>

          <div>
            <DashPanel className="mb-4 flex flex-wrap justify-between items-center gap-3">
              <p className="text-sm text-[var(--text-secondary)] m-0">
                Con tu puntaje de <strong className="text-[var(--text-primary)]">{score}</strong>:
              </p>
              <span
                className={`text-sm font-bold px-3 py-1.5 rounded-full ${
                  tasa.tone === 'success'
                    ? 'bg-[rgba(16,185,129,0.15)] text-[var(--emerald-400)]'
                    : tasa.tone === 'warn'
                      ? 'bg-[rgba(245,158,11,0.15)] text-[var(--amber-500)]'
                      : 'bg-[rgba(239,68,68,0.15)] text-[var(--red-500)]'
                }`}
              >
                ~{tasa.rate}% APR
              </span>
            </DashPanel>

            <DashPanel className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Enganche real', v: fmt(downAmt), s: `${downPct}% del precio` },
                  { l: 'Monto financiado', v: fmt(loanAmt), s: `APR: ${tasa.rate}%` },
                  { l: 'Pago mensual', v: fmt(monthly), s: `${pctIngreso}% de tu ingreso` },
                  { l: 'Total pagado', v: fmt(total), s: `Intereses: ${fmt(interest)}` },
                ].map((m) => (
                  <div key={m.l} className="dash-panel !p-4 text-center">
                    <p className="text-xs text-[var(--text-muted)] mb-1">{m.l}</p>
                    <DashDisplay value={m.v} className="!text-3xl" />
                    <p className="text-xs text-[var(--text-muted)] mt-1">{m.s}</p>
                  </div>
                ))}
              </div>

              <div
                className={`dash-banner-inline mt-4 mb-0 ${
                  warningLong || warningIncome
                    ? 'dash-banner-inline--danger'
                    : 'dash-banner-inline--success'
                }`}
              >
                <p className="text-sm font-semibold m-0">
                  {warningLong
                    ? `Préstamo de ${plazo} meses: pagarías ${fmt(interest)} en intereses. El carro se deprecia más rápido de lo que pagas.`
                    : warningIncome
                      ? `El pago es ${pctIngreso}% de tu ingreso. Lo recomendado es máximo 10–15%.`
                      : `El pago es ${pctIngreso}% de tu ingreso. Dentro de lo recomendado.`}
                </p>
              </div>
            </DashPanel>

            <DashPanel>
              <h3>Tasas reales por score</h3>
              {TASAS.map((t) => {
                const active = score >= t.min && score <= t.max
                return (
                  <div
                    key={t.min}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg mb-1 ${
                      active ? 'border border-[var(--cyan-bright)] bg-[var(--trust-teal-dim)]' : ''
                    }`}
                  >
                    <span className="text-sm text-[var(--text-secondary)]">
                      {t.label} ({t.min}–{t.max})
                    </span>
                    <span className="font-bold text-[var(--cyan-bright)]">~{t.rate}% APR</span>
                  </div>
                )
              })}
              <p className="text-xs text-[var(--text-muted)] mt-3 mb-0">
                Tasas referenciales para autos nuevos. Usados tienen APR 1–3% más alto.
              </p>
            </DashPanel>
          </div>
        </div>
      )}

      {tab === 'trucos' && (
        <div>
          <h2 className="dash-section-title">Lo que el dealer no puede hacerte</h2>
          <div className="flex flex-col gap-4">
            {TRUCOS.map((t) => (
              <DashPanel key={t.t} tone="danger" className="border-l-4 border-l-[var(--red-500)]">
                <h3 className="!text-[var(--red-500)] !mb-2">{t.t}</h3>
                <p className="mb-3">{t.d}</p>
                <div className="dash-panel dash-panel--success !p-3">
                  <p className="text-sm font-semibold text-[var(--cyan-bright)] m-0">{t.q}</p>
                </div>
              </DashPanel>
            ))}
          </div>
        </div>
      )}

      {tab === 'regla' && (
        <DashPanel className="max-w-xl">
          <h2>La regla del 20/4/10</h2>
          <p className="mb-6">
            La regla de oro para comprar carro sin arruinarte. Cumple las 3 para estar seguro.
          </p>
          {[
            {
              r: '20% de enganche',
              v: regla20,
              actual: `Tu enganche: ${downPct}%`,
              meta: 'Meta: mínimo 20%',
            },
            {
              r: 'Máximo 4 años de préstamo',
              v: regla4,
              actual: `Tu plazo: ${plazo} meses (${(plazo / 12).toFixed(1)} años)`,
              meta: 'Meta: máximo 48 meses',
            },
            {
              r: 'Máximo 10% de tu ingreso',
              v: regla10,
              actual: `Tu pago: ${pctIngreso}% del ingreso`,
              meta: 'Meta: máximo 10%',
            },
          ].map((r) => (
            <div
              key={r.r}
              className={`dash-banner-inline mb-3 ${
                r.v ? 'dash-banner-inline--success' : 'dash-banner-inline--danger'
              }`}
            >
              <p className="font-bold text-sm m-0 mb-1">
                {r.v ? '✓' : '✗'} {r.r}
              </p>
              <p className="text-sm m-0">
                {r.actual} · {r.meta}
              </p>
            </div>
          ))}
          <div className="text-center mt-4">
            <DashDisplay
              value={
                regla20 && regla4 && regla10
                  ? 'CUMPLES LAS 3'
                  : `${[regla20, regla4, regla10].filter(Boolean).length}/3`
              }
              tone={regla20 && regla4 && regla10 ? 'positive' : 'negative'}
            />
          </div>
        </DashPanel>
      )}
    </div>
  )
}
