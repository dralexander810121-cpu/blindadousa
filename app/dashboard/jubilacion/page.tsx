'use client'
import { useState } from 'react'
import { DashDisplay, DashPanel, DashRangeRow } from '@/components/dashboard/DashPanel'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const CUENTAS = [
  {
    n: '401K',
    quien: 'Tu trabajo te lo da',
    como: 'Si tu empresa pone $1 por cada $1 tuyo (match) y no lo usas, estás regalando dinero gratis.',
    limite: '$23,500/año (2026)',
    tip: 'Pon al menos lo suficiente para recibir el match completo de tu empresa. Es dinero gratis.',
  },
  {
    n: 'IRA Tradicional',
    quien: 'Lo abres tú',
    como: 'Ahorras hoy y pagas menos impuestos este año. Pagas impuestos cuando lo sacas al retirarte.',
    limite: '$7,000/año (2026)',
    tip: 'Ideal si piensas que al retirarte ganarás menos que ahora (pagarás menos impuestos entonces).',
  },
  {
    n: 'Roth IRA',
    quien: 'Lo abres tú',
    como: 'Pagas impuestos ahora. Pero cuando te retires, TODO ese dinero es tuyo libre de impuestos.',
    limite: '$7,000/año (2026)',
    tip: 'Ideal si eres joven y piensas que en el futuro ganarás más. Es la favorita de muchos expertos.',
  },
]

export default function JubilacionPage() {
  const [edad, setEdad] = useState(35)
  const [retiro, setRetiro] = useState(65)
  const [ingreso, setIngreso] = useState(4000)
  const [ahorro, setAhorro] = useState(0)

  const anos = Math.max(1, retiro - edad)
  const meses = anos * 12
  const tasaAnual = 0.07
  const tasaMes = tasaAnual / 12

  const futuro =
    ahorro > 0 ? ahorro * ((Math.pow(1 + tasaMes, meses) - 1) / tasaMes) : 0
  const metaRetiro = ingreso * 12 * 25
  const faltante = Math.max(0, metaRetiro - futuro)
  const necesitaMes =
    faltante > 0 ? (faltante * tasaMes) / (Math.pow(1 + tasaMes, meses) - 1) : 0

  const futuroSi5 =
    ahorro > 0
      ? ahorro * ((Math.pow(1 + tasaMes, Math.max(1, retiro - edad - 5) * 12) - 1) / tasaMes)
      : 0
  const perdida = futuro - futuroSi5

  const ahorroDemo = ahorro || 200
  const futuroDemo =
    ahorro > 0
      ? futuro
      : ahorroDemo * ((Math.pow(1 + tasaMes, meses) - 1) / tasaMes)
  const futuroSi5Demo =
    ahorroDemo * ((Math.pow(1 + tasaMes, Math.max(1, anos - 5) * 12) - 1) / tasaMes)
  const perdidaDemo = (ahorro > 0 ? perdida : futuroDemo - futuroSi5Demo) || futuroDemo * 0.35

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Jubilación / retiro</h1>
      <p className="dash-page-date mb-5">
        El 83% de hispanos millennials no tiene nada ahorrado. Tú puedes cambiar eso hoy.
      </p>

      <div className="dash-banner-inline dash-banner-inline--danger mb-6">
        <strong>8 de cada 10 hispanos jóvenes no tienen ahorros para el retiro</strong>
      </div>

      <div className="dash-grid-2 mb-8">
        <DashPanel>
          <h2>Tu situación</h2>
          <DashRangeRow label="Tu edad actual" value={`${edad} años`}>
            <input
              type="range"
              min={18}
              max={60}
              step={1}
              value={edad}
              onChange={(e) => setEdad(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>
          <DashRangeRow label="¿A qué edad quieres retirarte?" value={`${retiro} años`}>
            <input
              type="range"
              min={55}
              max={75}
              step={1}
              value={retiro}
              onChange={(e) => setRetiro(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>
          <DashRangeRow label="Ingreso mensual actual" value={fmt(ingreso)}>
            <input
              type="range"
              min={1500}
              max={15000}
              step={250}
              value={ingreso}
              onChange={(e) => setIngreso(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>
          <DashRangeRow label="¿Cuánto ahorras al mes para retiro?" value={fmt(ahorro)}>
            <input
              type="range"
              min={0}
              max={2000}
              step={25}
              value={ahorro}
              onChange={(e) => setAhorro(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>
        </DashPanel>

        <div>
          <DashPanel className="mb-4">
            <h2>Tus números de retiro</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="dash-panel !p-4 text-center">
                <p className="text-xs text-[var(--text-muted)] mb-1">Años para retirarte</p>
                <DashDisplay value={String(anos)} className="!text-4xl" />
              </div>
              <div className="dash-panel !p-4 text-center">
                <p className="text-xs text-[var(--text-muted)] mb-1">Meta de ahorro</p>
                <DashDisplay value={fmt(metaRetiro)} className="!text-2xl" />
              </div>
              <div
                className={`dash-panel !p-4 text-center ${ahorro > 0 ? 'dash-panel--success' : 'dash-panel--danger'}`}
              >
                <p className="text-xs text-[var(--text-muted)] mb-1">Tendrás si sigues así</p>
                <DashDisplay
                  value={ahorro > 0 ? fmt(futuro) : '$0'}
                  tone={ahorro > 0 ? 'positive' : 'negative'}
                  className="!text-2xl"
                />
              </div>
              <div className="dash-panel !p-4 text-center">
                <p className="text-xs text-[var(--text-muted)] mb-1">Necesitas ahorrar/mes</p>
                <DashDisplay value={fmt(necesitaMes)} className="!text-2xl" />
              </div>
            </div>
          </DashPanel>

          <DashPanel tone="success">
            <h3>El poder del tiempo</h3>
            <p className="m-0">
              Si empiezas hoy ahorrando {fmt(ahorroDemo)}/mes → tendrás{' '}
              <strong className="text-[var(--text-primary)]">{fmt(futuroDemo)}</strong> a los {retiro}.
              <br />
              Si esperas 5 años → tendrás solo{' '}
              <strong className="text-[var(--text-primary)]">{fmt(futuroSi5Demo)}</strong>.
              <br />
              <strong className="text-[var(--red-500)]">
                Esperar 5 años te cuesta {fmt(perdidaDemo)} en dinero perdido.
              </strong>
            </p>
          </DashPanel>
        </div>
      </div>

      <h2 className="dash-section-title">Los 3 tipos de cuenta de retiro explicados simple</h2>
      <div className="dash-grid-2">
        {CUENTAS.map((c) => (
          <DashPanel key={c.n} className="border-t-4 border-t-[var(--cyan-bright)]">
            <h3 className="!text-[var(--cyan-bright)]">{c.n}</h3>
            <p className="text-sm mb-2">
              <strong className="text-[var(--text-primary)]">¿Quién lo abre?</strong> {c.quien}
            </p>
            <p className="mb-2">{c.como}</p>
            <p className="text-xs text-[var(--text-muted)] mb-3">Límite: {c.limite}</p>
            <div className="dash-panel dash-panel--info !p-3">
              <p className="text-sm m-0">
                <strong className="text-[var(--cyan-bright)]">Tip:</strong> {c.tip}
              </p>
            </div>
          </DashPanel>
        ))}
      </div>
    </div>
  )
}
