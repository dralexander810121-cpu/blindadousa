'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { PlaidConnect } from '@/components/dashboard/PlaidConnect'
import { AccountsPanel } from '@/components/dashboard/AlertsPanel'

export default function TarjetasPage() {
  const [connected, setConnected] = useState(false)
  const [cuentas, setCuentas] = useState<Parameters<typeof AccountsPanel>[0]['cuentas']>([])

  const load = useCallback(async () => {
    const res = await fetch('/api/plaid/accounts')
    if (!res.ok) return
    const data = await res.json()
    setConnected((data.metrics?.cuentas_conectadas ?? 0) > 0)
    setCuentas(data.cuentas ?? [])
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
        <PlaidConnect connected={connected} onConnected={load} />
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

      <div className="mt-8">
        <AccountsPanel cuentas={cuentas} />
      </div>
    </div>
  )
}
