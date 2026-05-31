'use client'

import Script from 'next/script'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { CheckoutPlan } from '@/lib/stripe'

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (opts: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void>
      }
    }
  }
}

type Props = {
  clientId: string
  hostedButtonId: string
  email: string
  codigo: string
  plan: CheckoutPlan
  onError: (msg: string) => void
}

export function PayPalHostedButton({
  clientId,
  hostedButtonId,
  email,
  codigo,
  plan,
  onError,
}: Props) {
  const reactId = useId().replace(/:/g, '')
  const containerId = `paypal-container-${hostedButtonId}-${reactId}`
  const [ready, setReady] = useState(false)
  const [intentOk, setIntentOk] = useState(false)
  const rendered = useRef(false)

  const registerIntent = useCallback(async () => {
    if (!email.trim()) {
      onError('Ingresa tu email antes de pagar con PayPal.')
      setIntentOk(false)
      return
    }
    onError('')
    try {
      const res = await fetch('/api/paypal/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo, plan }),
      })
      const data = await res.json()
      if (!res.ok) {
        onError(data.error || 'No se pudo preparar PayPal')
        setIntentOk(false)
        return
      }
      setIntentOk(true)
    } catch {
      onError('Error de conexión al preparar PayPal')
      setIntentOk(false)
    }
  }, [codigo, email, onError, plan])

  useEffect(() => {
    void registerIntent()
  }, [registerIntent])

  useEffect(() => {
    rendered.current = false
  }, [hostedButtonId, plan])

  useEffect(() => {
    if (!ready || !intentOk || rendered.current) return
    if (!window.paypal?.HostedButtons) return

    const el = document.getElementById(containerId)
    if (el) el.innerHTML = ''

    window.paypal
      .HostedButtons({ hostedButtonId })
      .render(`#${containerId}`)
      .then(() => {
        rendered.current = true
      })
      .catch(() => {
        onError('No se pudo cargar el botón de PayPal. Recarga la página.')
      })
  }, [containerId, hostedButtonId, intentOk, onError, ready])

  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&components=hosted-buttons&currency=USD`

  return (
    <div className="paypal-hosted-wrap">
      <Script src={sdkUrl} strategy="afterInteractive" onReady={() => setReady(true)} />
      {!email.trim() && (
        <p className="text-xs text-[var(--text-muted)] text-center mb-2">
          Escribe tu email arriba para habilitar PayPal.
        </p>
      )}
      {email.trim() && (
        <p className="text-xs text-[var(--text-muted)] text-center mb-2">
          En PayPal usa el mismo email: <strong>{email.trim().toLowerCase()}</strong>
        </p>
      )}
      <div
        id={containerId}
        className="min-h-[52px] rounded-xl overflow-hidden flex items-center justify-center"
      />
    </div>
  )
}
