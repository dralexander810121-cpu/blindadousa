'use client'

import Script from 'next/script'
import { useCallback, useRef, useState } from 'react'
import type { CheckoutPlan } from '@/lib/stripe'

declare global {
  interface Window {
    Klarna?: {
      Payments: {
        init: (opts: { client_token: string }) => void
        load: (
          opts: { container: string; payment_method_category: string },
          cb: (res: { show_form: boolean; error?: unknown }) => void,
        ) => void
        authorize: (
          opts: { payment_method_category: string },
          cb: (res: { approved: boolean; authorization_token?: string; error?: unknown }) => void,
        ) => void
      }
    }
  }
}

type Props = {
  email: string
  codigo: string
  plan: CheckoutPlan
  disabled?: boolean
  onError: (msg: string) => void
}

export function KlarnaPayButton({ email, codigo, plan, disabled, onError }: Props) {
  const [loading, setLoading] = useState(false)
  const [showWidget, setShowWidget] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [clientToken, setClientToken] = useState('')
  const [widgetReady, setWidgetReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sdkReady = useRef(false)

  const runAuthorize = useCallback(
    (sid: string) => {
      if (!window.Klarna?.Payments) {
        onError('Klarna no cargó. Recarga la página e intenta de nuevo.')
        setLoading(false)
        return
      }
      window.Klarna.Payments.authorize({ payment_method_category: 'pay_over_time' }, async (result) => {
        if (!result.approved || !result.authorization_token) {
          onError('Klarna no aprobó el pago. Prueba PayPal o otra forma de pago.')
          setLoading(false)
          return
        }
        try {
          const res = await fetch('/api/klarna/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              authorization_token: result.authorization_token,
              session_id: sid,
              email,
              codigo,
              plan,
            }),
          })
          const data = await res.json()
          if (!res.ok) {
            onError(data.error || 'No se pudo confirmar Klarna')
            setLoading(false)
            return
          }
          window.location.href = `/pagar/exito?provider=klarna`
        } catch {
          onError('Error de conexión al confirmar Klarna')
          setLoading(false)
        }
      })
    },
    [codigo, email, onError, plan],
  )

  const loadWidget = useCallback(
    (clientToken: string, sid: string) => {
      if (!window.Klarna?.Payments || !containerRef.current) {
        onError('Klarna no está listo. Espera un segundo e intenta de nuevo.')
        setLoading(false)
        return
      }
      window.Klarna.Payments.init({ client_token: clientToken })
      window.Klarna.Payments.load(
        { container: '#klarna-payments-container', payment_method_category: 'pay_over_time' },
        (res) => {
          if (!res.show_form) {
            onError('Klarna no está disponible para este monto o perfil. Prueba PayPal.')
            setShowWidget(false)
            setLoading(false)
            return
          }
          setLoading(false)
          setWidgetReady(true)
        },
      )
    },
    [onError],
  )

  function confirmKlarna() {
    if (!sessionId) return
    setLoading(true)
    runAuthorize(sessionId)
  }

  async function startKlarna() {
    if (!email.trim()) {
      onError('Ingresa tu email antes de pagar con Klarna.')
      return
    }
    setLoading(true)
    onError('')
    setShowWidget(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo, plan, method: 'klarna' }),
      })
      const data = await res.json()
      if (!res.ok || !data.clientToken) {
        onError(data.error || 'No se pudo iniciar Klarna')
        setShowWidget(false)
        setLoading(false)
        return
      }
      setSessionId(data.sessionId)
      setClientToken(data.clientToken)
      if (sdkReady.current && window.Klarna?.Payments) {
        loadWidget(data.clientToken, data.sessionId)
      } else {
        ;(window as Window & { __klarnaPending?: { token: string; sid: string } }).__klarnaPending = {
          token: data.clientToken,
          sid: data.sessionId,
        }
      }
    } catch {
      onError('Error de conexión con Klarna')
      setShowWidget(false)
      setLoading(false)
    }
  }

  function onSdkLoad() {
    sdkReady.current = true
    const pending = (window as Window & { __klarnaPending?: { token: string; sid: string } })
      .__klarnaPending
    if (pending) {
      loadWidget(pending.token, pending.sid)
      delete (window as Window & { __klarnaPending?: unknown }).__klarnaPending
    }
  }

  return (
    <>
      <Script
        src="https://x.klarnacdn.net/kp/lib/v1/api.js"
        strategy="lazyOnload"
        onLoad={onSdkLoad}
      />
      <button
        type="button"
        className="pay-method-btn pay-method-btn--klarna w-full"
        onClick={() => void startKlarna()}
        disabled={disabled || loading}
      >
        {loading ? 'Conectando con Klarna…' : 'Pagar a plazos con Klarna →'}
      </button>
      <p className="text-xs text-[var(--text-muted)] text-center mt-1 mb-3">
        Divide tu pago en cuotas sin intereses (según elegibilidad Klarna).
      </p>
      {showWidget && (
        <>
          <div
            id="klarna-payments-container"
            ref={containerRef}
            className="min-h-[120px] rounded-xl border border-white/10 bg-black/20 p-3 mb-3"
          />
          {widgetReady && clientToken && (
            <button
              type="button"
              className="pay-method-btn pay-method-btn--klarna w-full mb-3"
              onClick={() => confirmKlarna()}
              disabled={loading}
            >
              {loading ? 'Confirmando con Klarna…' : 'Confirmar pago a plazos →'}
            </button>
          )}
        </>
      )}
    </>
  )
}
