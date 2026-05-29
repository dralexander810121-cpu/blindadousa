'use client'
import { useState } from 'react'
import { DashDisplay, DashPanel, DashRangeRow } from '@/components/dashboard/DashPanel'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const TRABAJOS: Record<string, number> = {
  'Construcción': 19,
  'Limpieza / Housekeeping': 14,
  'Restaurante / Cocina': 16,
  'Cuidado de niños': 15,
  'Conducción / Delivery': 18,
  'Almacén / Warehouse': 17,
  'Agricultura / Landscaping': 16,
  'Manufactura': 18,
  'Retail / Tiendas': 15,
  'Plomería': 26,
  'Electricista': 28,
  'Pintura': 20,
  'Mecánico de carros': 22,
  'Carpintería': 23,
  'Enfermería / CNA': 17,
  'Seguridad': 16,
  'Lavado de carros': 13,
  'Mudanzas': 17,
}

const DERECHOS = [
  {
    t: 'Salario mínimo federal',
    d: '$7.25/hora (Texas usa el federal). Pero nadie debería aceptar menos de $12–15/hora en 2026.',
    tone: 'warn' as const,
  },
  {
    t: 'Overtime (horas extra)',
    d: 'Más de 40 horas por semana = 1.5 veces tu sueldo por hora. Obligatorio por ley federal.',
    tone: 'danger' as const,
  },
  {
    t: 'Discriminación por origen',
    d: 'Es ilegal pagarte menos por ser hispano o no hablar inglés perfecto. Reporta al EEOC.',
    tone: 'danger' as const,
  },
  {
    t: 'Represalias',
    d: 'Tu empleador no puede despedirte por quejarte de condiciones injustas. Es ilegal.',
    tone: 'danger' as const,
  },
  {
    t: 'Pago por todas las horas',
    d: 'Llegar temprano, limpiar después, esperar — todo eso es tiempo trabajado y debe pagarse.',
    tone: 'warn' as const,
  },
  {
    t: 'Seguridad en el trabajo',
    d: 'OSHA requiere que tu empleador provea equipo de seguridad y un ambiente sin peligros.',
    tone: 'success' as const,
  },
]

const AGENCIAS = [
  {
    n: 'EEOC',
    d: 'Discriminación laboral por origen, raza o idioma',
    url: 'https://www.eeoc.gov/es',
    tel: '1-800-669-4000',
  },
  {
    n: 'TWC',
    d: 'Texas Workforce Commission — robo de salario, desempleo',
    url: 'https://www.twc.texas.gov',
    tel: '512-463-2222',
  },
  {
    n: 'OSHA',
    d: 'Seguridad y salud en el trabajo',
    url: 'https://www.osha.gov/workers/file-complaint',
    tel: '1-800-321-6742',
  },
  {
    n: 'NLRB',
    d: 'Derecho a organizarte, represalias por quejarte',
    url: 'https://www.nlrb.gov',
    tel: '1-844-762-6572',
  },
]

export default function TrabajoPage() {
  const [trabajo, setTrabajo] = useState('Construcción')
  const [pago, setPago] = useState(16)
  const [horas, setHoras] = useState(45)
  const [pagadas, setPagadas] = useState(40)

  const mercado = TRABAJOS[trabajo] || 16
  const diff = pago - mercado
  const diffAnual = diff * 40 * 52
  const roboHoras = horas - pagadas
  const roboAnual = roboHoras * pago * 52

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Salario justo</h1>
      <p className="dash-page-date mb-6">
        ¿Te están pagando lo justo? Compara con el mercado y conoce tus derechos.
      </p>

      <div className="dash-grid-2">
        <DashPanel>
          <h2>¿Te pagan lo justo?</h2>
          <label className="dash-form-label">Tu tipo de trabajo</label>
          <select
            value={trabajo}
            onChange={(e) => setTrabajo(e.target.value)}
            className="dash-select mb-4"
          >
            {Object.keys(TRABAJOS).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <DashRangeRow label="¿Cuánto te pagan por hora?" value={`$${pago}/hr`}>
            <input
              type="range"
              min={7}
              max={40}
              step={0.5}
              value={pago}
              onChange={(e) => setPago(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>

          <div
            className={`dash-banner-inline mb-4 ${
              diff >= 0 ? 'dash-banner-inline--success' : 'dash-banner-inline--danger'
            }`}
          >
            <p className="text-sm text-[var(--text-secondary)] mb-2 m-0">
              Salario promedio del mercado para &quot;{trabajo}&quot; en Texas:
            </p>
            <DashDisplay value={`$${mercado}/hr`} className="!text-4xl" />
            <p className="text-sm font-semibold mt-2 mb-0">
              {diff >= 0
                ? `Te pagan ${fmt(Math.abs(diffAnual))}/año por encima del mercado`
                : `Te pagan ${fmt(Math.abs(diffAnual))}/año por debajo del mercado`}
            </p>
          </div>

          <h3 className="dash-panel-title">¿Te roban horas?</h3>
          <DashRangeRow label="Horas que trabajas por semana" value={`${horas}h`}>
            <input
              type="range"
              min={20}
              max={70}
              step={1}
              value={horas}
              onChange={(e) => setHoras(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>
          <DashRangeRow label="Horas que te pagan" value={`${pagadas}h`}>
            <input
              type="range"
              min={20}
              max={70}
              step={1}
              value={pagadas}
              onChange={(e) => setPagadas(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>

          {roboHoras > 0 && (
            <DashPanel tone="danger" className="text-center">
              <p className="font-bold text-sm mb-2">Te deben {roboHoras} horas por semana</p>
              <DashDisplay value={`${fmt(roboAnual)}/año`} tone="negative" className="!text-3xl" />
              <p className="text-xs text-[var(--text-muted)] mt-2 mb-0">
                Reporta al TWC: 512-463-2222 — es gratis y confidencial
              </p>
            </DashPanel>
          )}
        </DashPanel>

        <div>
          <h2 className="dash-section-title">Tus derechos laborales en Texas</h2>
          <div className="flex flex-col gap-3 mb-5">
            {DERECHOS.map((d) => (
              <DashPanel
                key={d.t}
                tone={d.tone}
                className={`!py-3 !px-4 border-l-4 ${
                  d.tone === 'success'
                    ? 'border-l-[var(--emerald-400)]'
                    : d.tone === 'warn'
                      ? 'border-l-[var(--amber-500)]'
                      : 'border-l-[var(--red-500)]'
                }`}
              >
                <p className="font-bold text-sm text-[var(--text-primary)] mb-1">{d.t}</p>
                <p className="text-sm m-0">{d.d}</p>
              </DashPanel>
            ))}
          </div>

          <h3 className="dash-panel-title">Agencias que te protegen</h3>
          {AGENCIAS.map((a) => (
            <DashPanel key={a.n} className="!py-3 !px-4 mb-2">
              <div className="flex justify-between items-center gap-3 flex-wrap">
                <div>
                  <p className="font-bold text-sm text-[var(--cyan-bright)] mb-0">{a.n}</p>
                  <p className="text-xs text-[var(--text-muted)] m-0">{a.d}</p>
                </div>
                <a
                  href={`tel:${a.tel}`}
                  className="btn-3d-blue !py-2 !px-3 !text-xs !min-h-0 shrink-0 no-underline"
                >
                  Llamar
                </a>
              </div>
            </DashPanel>
          ))}
        </div>
      </div>
    </div>
  )
}
