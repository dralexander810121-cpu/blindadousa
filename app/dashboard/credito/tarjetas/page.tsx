'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { AccountsPanel } from '@/components/dashboard/AlertsPanel'

const PlaidConnect = dynamic(
  () => import('@/components/dashboard/PlaidConnect').then((m) => m.PlaidConnect),
  {
    ssr: false,
    loading: () => (
      <div className="dash-plaid-box text-sm text-[var(--text-muted)]">Cargando conexión bancaria…</div>
    ),
  },
)

export default function TarjetasPage() {
  const [connected, setConnected] = useState(false)
  const [plaidConfigured, setPlaidConfigured] = useState<boolean | null>(null)
  const [cuentas, setCuentas] = useState<Parameters<typeof AccountsPanel>[0]['cuentas']>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/plaid/accounts')
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'No se pudieron cargar las cuentas.')
        return
      }
      setConnected((data.metrics?.cuentas_conectadas ?? 0) > 0)
      setPlaidConfigured(data.plaid_configured !== false)
      setCuentas(data.cuentas ?? [])
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="dash-page dash-page--banana">
      <Link href="/dashboard/credito" className="text-sm text-[var(--text-muted)] hover:text-[var(--blue-300)]">
        ← Mi Crédito
      </Link>
      <h1 className="dash-page-title mt-3">Mis Tarjetas (Plaid)</h1>
      <p className="dash-page-date mb-6">
        Conecta tus cuentas para monitorear pagos, cortes y utilización en tiempo real.
      </p>

      <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
        {plaidConfigured === null ? (
          <div className="dash-plaid-box text-sm text-[var(--text-muted)]">Cargando conexión bancaria…</div>
        ) : plaidConfigured ? (
          <PlaidConnect connected={connected} onConnected={load} />
        ) : (
          <div className="card-3d dash-plaid-box">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-2">Conexión bancaria 🔒</p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Estamos activando la conexión segura con tu banco. Muy pronto podrás conectar tus
              cuentas y monitorear pagos, cortes y utilización en automático.
            </p>
          </div>
        )}
        <div className="card-3d dash-plaid-box">
          <h2 className="dash-panel-title">Qué monitorea Blindado</h2>
          <ul className="text-sm text-[var(--text-secondary)] space-y-2">
            <li>• Pago próximo (3 días antes)</li>
            <li>• Fecha de corte y utilización reportada</li>
            <li>• Alerta si utilización &gt; 30%</li>
            <li>• Sincronización manual o automática cada 4h</li>
          </ul>
        </div>
      </div>

      {error && (
        <p className="text-sm text-[var(--red-400)] mt-4 max-w-4xl" role="alert">
          {error}{' '}
          <button type="button" className="underline" onClick={() => load()}>
            Reintentar
          </button>
        </p>
      )}

      {loading && !error ? (
        <p className="text-sm text-[var(--text-muted)] mt-6">Cargando cuentas…</p>
      ) : (
        <div className="mt-8">
          <AccountsPanel cuentas={cuentas} />
        </div>
      )}
    </div>
  )
}
