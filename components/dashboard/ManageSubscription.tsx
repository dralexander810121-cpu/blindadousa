'use client'

import { useState } from 'react'

export function ManageSubscription({
  hasBillingAccount,
  providerLabel,
}: {
  hasBillingAccount: boolean
  providerLabel: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!hasBillingAccount) {
    return (
      <div className="card-3d dash-panel max-w-lg">
        <h2 className="dash-panel-title mb-2">Suscripción</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Cuando actives un plan de pago podrás cancelar o cambiar tu método de pago desde el portal
          seguro.
        </p>
        <a href="/pagar?plan=mensual" className="btn-glass inline-flex !min-h-[40px] !text-xs">
          Activar plan →
        </a>
      </div>
    )
  }

  async function openPortal() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error || 'No se pudo abrir el portal')
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <div className="card-3d dash-panel max-w-lg">
      <h2 className="dash-panel-title mb-2">Suscripción y facturación</h2>
      <p className="text-sm text-[var(--text-muted)] mb-4">
        Cancela, actualiza tu tarjeta o descarga facturas en el portal seguro ({providerLabel}).
      </p>
      {error && <p className="text-sm text-[var(--red-500)] mb-3">{error}</p>}
      <button
        type="button"
        className="btn-3d-gold !min-h-[44px] !text-sm w-full sm:w-auto"
        onClick={() => void openPortal()}
        disabled={loading}
      >
        {loading ? 'Abriendo portal…' : `Gestionar suscripción →`}
      </button>
    </div>
  )
}
