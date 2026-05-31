'use client'
import { useState } from 'react'
import {
  DashDisplay,
  DashPanel,
  DashRangeRow,
} from '@/components/dashboard/DashPanel'
import { DashModuleShell, DashTabs } from '@/components/dashboard/DashModuleShell'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const TIPOS = [
  {
    n: 'Payday Loans',
    d: 'Te prestan $300–$1,000 hasta tu próximo cheque. APR real: 400%–600%. Si no pagas a tiempo, renuevas y pagas el doble.',
    p: 'Pide un adelanto de sueldo a tu empleador o un préstamo de tu credit union.',
  },
  {
    n: 'Title Loans',
    d: 'Usas el título de tu carro como garantía. Si no pagas, te quitan el carro. APR típico: 100%–300%.',
    p: 'Vende algo que no necesites, pide prestado a familiares, o negocia un plan de pagos con el acreedor original.',
  },
  {
    n: 'Rent-to-Own',
    d: 'Pagas mensual por un mueble o electrodoméstico. Al final pagas 2–3 veces el precio original.',
    p: 'Compra usado en Facebook Marketplace o espera a una venta. Nunca es urgente comprar un sofá nuevo.',
  },
  {
    n: 'Tax Refund Loans',
    d: 'Te adelantan tu devolución de impuestos pero cobran fees enormes. Podrías esperar 2–3 semanas y recibirlo gratis.',
    p: 'Declara con Free File del IRS (gratis) y recibe tu devolución en 2–3 semanas por depósito directo.',
  },
]

type Veredicto = 'razonable' | 'abusivo' | 'muy_abusivo'

export default function PrestamosPage() {
  const [monto, setMonto] = useState(1000)
  const [tasa, setTasa] = useState(15)
  const [pagos, setPagos] = useState(12)
  const [result, setResult] = useState<{
    pago: number
    total: number
    intereses: number
    exceso: number
    veredicto: Veredicto
    analisis?: string
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'scanner' | 'tipos'>('scanner')

  async function escanear() {
    setLoading(true)
    setError('')
    const r = tasa / 100 / 12
    const pago = (monto * (r * Math.pow(1 + r, pagos))) / (Math.pow(1 + r, pagos) - 1)
    const total = pago * pagos
    const intereses = total - monto
    const apporJusto = 8
    const rJusto = apporJusto / 100 / 12
    const pagoJusto = (monto * (rJusto * Math.pow(1 + rJusto, pagos))) / (Math.pow(1 + rJusto, pagos) - 1)
    const totalJusto = pagoJusto * pagos
    const exceso = total - totalJusto

    let veredicto: Veredicto = 'razonable'
    if (tasa > 36) veredicto = 'muy_abusivo'
    else if (tasa > 20) veredicto = 'abusivo'

    let analisis: string | undefined
    try {
      const res = await fetch('/api/ia/maestro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: `Me ofrecen un préstamo de ${fmt(monto)} a ${tasa}% APR a ${pagos} meses. El pago mensual sería ${fmt(pago)}. Total a pagar: ${fmt(total)}. ¿Es justo o abusivo? Dame tu opinión directa en 3-4 líneas y alternativas.`,
          historial: [],
        }),
      })
      const data = await res.json()
      if (res.ok) {
        analisis = data.respuesta
      } else {
        setError(data.error || 'No se pudo obtener el análisis de IA.')
      }
    } catch {
      setError('Error de conexión. Los números del escáner siguen siendo válidos.')
    }

    setResult({ pago, total, intereses, exceso, veredicto, analisis })
    setLoading(false)
  }

  const veredictoTone: Record<Veredicto, 'success' | 'warn' | 'danger'> = {
    razonable: 'success',
    abusivo: 'warn',
    muy_abusivo: 'danger',
  }
  const veredictoLabel: Record<Veredicto, string> = {
    razonable: 'Razonable',
    abusivo: 'Abusivo',
    muy_abusivo: 'Muy abusivo',
  }

  return (
    <DashModuleShell
      title="Escáner de préstamos"
      subtitle="¿Te ofrecieron un préstamo? Descubre si es justo o abusivo antes de firmar."
    >
      <DashTabs
        tabs={[
          { id: 'scanner', label: 'Escáner' },
          { id: 'tipos', label: 'Préstamos peligrosos' },
        ]}
        active={tab}
        onChange={(id) => setTab(id as 'scanner' | 'tipos')}
      />

      {tab === 'scanner' && (
        <div className="dash-grid-2">
          <DashPanel>
            <h2>Términos que te ofrecieron</h2>
            <DashRangeRow label="Monto del préstamo" value={fmt(monto)}>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={monto}
                onChange={(e) => setMonto(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <DashRangeRow label="Tasa de interés (APR %)" value={`${tasa}%`}>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={tasa}
                onChange={(e) => setTasa(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            <DashRangeRow label="Número de pagos (meses)" value={`${pagos} meses`}>
              <input
                type="range"
                min={1}
                max={84}
                step={1}
                value={pagos}
                onChange={(e) => setPagos(+e.target.value)}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
            {error && (
              <p className="text-sm text-[var(--red-400)] mb-2" role="alert">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={escanear}
              disabled={loading}
              className="btn-3d-gold w-full !min-h-[48px] mt-2"
            >
              {loading ? 'Analizando…' : 'Analizar préstamo'}
            </button>
          </DashPanel>

          <div>
            {result ? (
              <DashPanel tone={veredictoTone[result.veredicto]}>
                <div className="text-center mb-5">
                  <DashDisplay
                    value={veredictoLabel[result.veredicto]}
                    tone={result.veredicto === 'razonable' ? 'positive' : 'negative'}
                    className="!text-3xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { l: 'Pago mensual', v: fmt(result.pago) },
                    { l: 'Total a pagar', v: fmt(result.total) },
                    { l: 'Solo intereses', v: fmt(result.intereses) },
                    { l: 'De más vs justo', v: fmt(result.exceso) },
                  ].map((m) => (
                    <div key={m.l} className="dash-panel !p-3 text-center">
                      <p className="text-xs text-[var(--text-muted)] mb-1">{m.l}</p>
                      <p className="font-bold text-lg text-[var(--text-primary)] m-0">{m.v}</p>
                    </div>
                  ))}
                </div>

                {result.analisis && (
                  <div className="dash-result-box">
                    <p className="font-bold text-[var(--cyan-bright)] mb-2">Análisis de Blindado:</p>
                    {result.analisis}
                  </div>
                )}
              </DashPanel>
            ) : (
              <DashPanel className="py-12 text-center">
                <p className="text-5xl mb-3" aria-hidden>
                  🔍
                </p>
                <p className="text-[var(--text-muted)] m-0">
                  Ingresa los términos y presiona Analizar
                </p>
              </DashPanel>
            )}
          </div>
        </div>
      )}

      {tab === 'tipos' && (
        <div className="flex flex-col gap-4 max-w-2xl">
          {TIPOS.map((t) => (
            <DashPanel key={t.n} tone="danger" className="border-l-4 border-l-[var(--red-500)]">
              <h3 className="!text-[var(--red-500)] !mb-2">{t.n}</h3>
              <p className="mb-3">{t.d}</p>
              <div className="dash-panel dash-panel--success !p-3">
                <p className="text-sm m-0">
                  <strong className="text-[var(--cyan-bright)]">Alternativa segura:</strong> {t.p}
                </p>
              </div>
            </DashPanel>
          ))}
        </div>
      )}
    </DashModuleShell>
  )
}
