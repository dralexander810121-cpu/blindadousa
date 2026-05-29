'use client'
import { useState } from 'react'
import {
  DashDisplay,
  DashOption,
  DashPanel,
  DashRangeRow,
} from '@/components/dashboard/DashPanel'

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const SERVICIOS = [
  { n: 'Wise', fee: 4.5, feePct: 0.5, tiempo: '1-2 días', impuesto: false, url: 'https://wise.com' },
  { n: 'Remitly', fee: 3.99, feePct: 0, tiempo: 'Minutos', impuesto: false, url: 'https://remitly.com' },
  { n: 'Western Union (banco)', fee: 5, feePct: 0, tiempo: 'Minutos', impuesto: false, url: 'https://westernunion.com' },
  { n: 'Western Union (efectivo)', fee: 7, feePct: 0, tiempo: 'Minutos', impuesto: true, url: 'https://westernunion.com' },
  { n: 'MoneyGram (efectivo)', fee: 5, feePct: 0, tiempo: 'Minutos', impuesto: true, url: 'https://moneygram.com' },
  { n: 'Zelle', fee: 0, feePct: 0, tiempo: 'Minutos', impuesto: false, url: '' },
]

export default function RemesasPage() {
  const [monto, setMonto] = useState(500)
  const [metodo, setMetodo] = useState<'efectivo' | 'banco'>('efectivo')

  const impuestoMes = metodo === 'efectivo' ? monto * 0.01 : 0
  const impuestoAno = impuestoMes * 12
  const ahorroAnual = metodo === 'efectivo' ? monto * 0.01 * 12 : 0

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Remesas 2026</h1>
      <p className="dash-page-date mb-5">
        Impuesto federal del 1% sobre remesas en efectivo (vigente desde enero 2026). Calculadora basada en esa regla publicada.
      </p>

      <div className="dash-banner-inline dash-banner-inline--danger">
        <strong>Impuesto activo desde enero 2026</strong>
        <p className="mt-2">
          Efectivo y money order pagan 1%. Transferencias bancarias o con tarjeta de débito no pagan este impuesto.
        </p>
      </div>

      <div className="dash-grid-2">
        <DashPanel>
          <h2>¿Cuánto mandas al mes?</h2>
          <DashRangeRow label="Monto mensual" value={fmt(monto)}>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={monto}
              onChange={(e) => setMonto(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>
          <p className="dash-form-label mt-4 mb-2">¿Cómo lo envías?</p>
          <div className="dash-option-grid">
            <DashOption
              selected={metodo === 'efectivo'}
              onClick={() => setMetodo('efectivo')}
              title="Efectivo / Money Order"
              detail="Paga impuesto 1%"
            />
            <DashOption
              selected={metodo === 'banco'}
              onClick={() => setMetodo('banco')}
              title="Banco / Tarjeta"
              detail="No paga impuesto"
            />
          </div>
        </DashPanel>

        <div>
          <DashPanel
            tone={metodo === 'efectivo' ? 'danger' : 'success'}
            className="text-center mb-4"
          >
            {metodo === 'efectivo' ? (
              <>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Estás pagando impuesto cada mes
                </p>
                <DashDisplay value={`${fmt(impuestoAno)}/año`} tone="negative" />
                <p className="text-sm text-[var(--text-muted)] mt-2">
                  {fmt(impuestoMes)}/mes en impuesto
                </p>
                <div className="dash-panel dash-panel--success mt-4 text-left">
                  <p className="font-bold text-[var(--emerald-400)] mb-1">
                    Si cambias a transferencia bancaria
                  </p>
                  <p className="text-sm">
                    Ahorras <strong>{fmt(ahorroAnual)}/año</strong> en impuesto federal.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-4xl mb-2" aria-hidden>
                  ✓
                </p>
                <p className="font-bold text-[var(--emerald-400)] mb-2">
                  Tu método no paga el impuesto del 1%
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Las transferencias bancarias y por tarjeta están exentas según la regla federal.
                </p>
              </>
            )}
          </DashPanel>

          <DashPanel>
            <h3>Compara servicios de envío</h3>
            <div className="table-holo overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th className="text-right">Fee</th>
                    <th className="text-center">Tiempo</th>
                    <th className="text-center">Impuesto</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICIOS.map((s) => (
                    <tr key={s.n}>
                      <td className="font-semibold text-[var(--text-primary)]">
                        {s.url ? (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--cyan-bright)] hover:underline"
                          >
                            {s.n} ↗
                          </a>
                        ) : (
                          s.n
                        )}
                      </td>
                      <td className="text-right">
                        {s.fee > 0 ? fmt(s.fee) : 'Gratis'}
                        {s.feePct > 0 ? ` + ${s.feePct}%` : ''}
                      </td>
                      <td className="text-center">{s.tiempo}</td>
                      <td className="text-center">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            s.impuesto
                              ? 'bg-[rgba(239,68,68,0.15)] text-[var(--red-500)]'
                              : 'bg-[rgba(16,185,129,0.15)] text-[var(--emerald-400)]'
                          }`}
                        >
                          {s.impuesto ? 'Sí 1%' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashPanel>
        </div>
      </div>
    </div>
  )
}
