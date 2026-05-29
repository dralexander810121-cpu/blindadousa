'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { Button3D } from '@/components/ui/Button3D'

type Props = {
  connected: boolean
  onConnected: () => void
}

export function PlaidConnect({ connected, onConnected }: Props) {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  const fetchToken = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/plaid/create-link-token', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo iniciar Plaid')
      setLinkToken(data.link_token)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!connected) fetchToken()
  }, [connected, fetchToken])

  const onSuccess = useCallback(
    async (public_token: string) => {
      setSyncing(true)
      setError(null)
      try {
        const res = await fetch('/api/plaid/exchange-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error guardando cuentas')
        onConnected()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error conectando banco')
      } finally {
        setSyncing(false)
      }
    },
    [onConnected],
  )

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  })

  async function handleSync() {
    setSyncing(true)
    setError(null)
    try {
      const res = await fetch('/api/plaid/sync', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error sincronizando')
      onConnected()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error sincronizando')
    } finally {
      setSyncing(false)
    }
  }

  if (connected) {
    return (
      <div className="dash-plaid-box">
        <p className="text-sm text-[var(--emerald-400)] font-semibold mb-2">✓ Banco conectado</p>
        <Button3D variant="glass" className="!min-h-[44px] !text-sm w-full" onClick={handleSync}>
          {syncing ? 'Sincronizando…' : 'Sincronizar cuentas ahora'}
        </Button3D>
      </div>
    )
  }

  return (
    <div className="dash-plaid-box">
      <p className="text-sm font-bold text-[var(--text-primary)] mb-1">Conecta tu banco</p>
      <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
        Plaid encripta tus datos. Blindado monitorea pagos, cortes y utilización automáticamente.
      </p>
      {error && <p className="text-xs text-[var(--red-500)] mb-3">{error}</p>}
      <Button3D
        variant="blue"
        className="!min-h-[48px] w-full !text-sm"
        onClick={() => {
          if (ready) open()
          else fetchToken()
        }}
      >
        {loading || syncing ? 'Preparando…' : 'Conectar con Plaid →'}
      </Button3D>
    </div>
  )
}
