'use client'

import Link from 'next/link'

type Alert = {
  id: string
  titulo: string
  mensaje: string
  nivel: string
}

const nivelClass: Record<string, string> = {
  rojo: 'dash-alert--critico',
  amarillo: 'dash-alert--warn',
  verde: 'dash-alert--ok',
}

export function AlertsPanel({ alertas }: { alertas: Alert[] }) {
  if (!alertas.length) {
    return (
      <div className="card-3d dash-panel banana-pro-panel">
        <h2 className="dash-panel-title">Alertas</h2>
        <p className="text-sm text-[var(--text-muted)]">Sin alertas críticas. Tu sistema está monitoreando 24/7.</p>
      </div>
    )
  }

  return (
    <div className="card-3d dash-panel banana-pro-panel">
      <h2 className="dash-panel-title">Alertas activas</h2>
      <ul className="space-y-3">
        {alertas.map((a) => (
          <li key={a.id} className={`dash-alert ${nivelClass[a.nivel] ?? 'dash-alert--warn'}`}>
            <p className="font-semibold text-sm text-[var(--text-primary)]">{a.titulo}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{a.mensaje}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

type Cuenta = {
  id: string
  nombre_cuenta: string | null
  tipo: string | null
  mask: string | null
  balance_actual: number | null
  limite_credito: number | null
  pago_minimo: number | null
  fecha_pago: string | null
  utilizacion: number | null
}

export function AccountsPanel({ cuentas }: { cuentas: Cuenta[] }) {
  if (!cuentas.length) return null

  return (
    <div className="card-3d dash-panel">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="dash-panel-title !mb-0">Tus cuentas</h2>
        <Link href="/dashboard/credito/tarjetas" className="text-xs text-[var(--blue-300)] hover:underline ux-focus-ring rounded-md px-1 py-0.5">
          Ver detalle →
        </Link>
      </div>
      <div className="table-holo">
        <table className="w-full">
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Balance</th>
              <th>Util.</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {cuentas.map((c) => (
              <tr key={c.id}>
                <td>
                  <span className="text-[var(--text-primary)] font-medium">{c.nombre_cuenta}</span>
                  {c.mask && <span className="text-[var(--text-muted)]"> ···{c.mask}</span>}
                </td>
                <td>${Number(c.balance_actual || 0).toLocaleString('en-US')}</td>
                <td>
                  {c.tipo === 'credit' ? (
                    <span className={Number(c.utilizacion) > 30 ? 'text-[var(--red-500)]' : 'text-[var(--emerald-400)]'}>
                      {Number(c.utilizacion || 0).toFixed(0)}%
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="text-xs">
                  {c.fecha_pago
                    ? new Date(c.fecha_pago).toLocaleDateString('es-US', { month: 'short', day: 'numeric' })
                    : '—'}
                  {c.pago_minimo ? ` · $${Number(c.pago_minimo).toFixed(0)}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
