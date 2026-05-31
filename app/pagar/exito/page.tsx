'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { DashDisplay } from '@/components/dashboard/DashPanel'
import { IMG } from '@/lib/images'
import { PRICING } from '@/lib/siteFacts'

function providerLabel(provider: string) {
  switch (provider) {
    case 'paypal':
      return 'PayPal'
    case 'klarna':
      return 'Klarna'
    case 'stripe':
      return 'Stripe'
    default:
      return 'pagos'
  }
}

function ExitoContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const subscriptionId = searchParams.get('subscription_id')
  const providerParam = searchParams.get('provider')
  const provider =
    providerParam ||
    (subscriptionId ? 'paypal' : sessionId ? 'stripe' : 'lemonsqueezy')
  const [codigo, setCodigo] = useState('')
  const [activating, setActivating] = useState(true)

  useEffect(() => {
    let cancelled = false
    let attempts = 0

    async function pollStripe() {
      if (!sessionId) return false
      const res = await fetch(`/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      const data = await res.json().catch(() => ({}))
      if (cancelled) return true
      if (data.mi_codigo) setCodigo(data.mi_codigo)
      if (data.acceso_pagado) return true
      return false
    }

    async function pollPayPal() {
      if (!subscriptionId) return false
      const res = await fetch(
        `/api/paypal/verify?subscription_id=${encodeURIComponent(subscriptionId)}`,
      )
      const data = await res.json().catch(() => ({}))
      if (cancelled) return false
      if (data.mi_codigo) setCodigo(data.mi_codigo)
      return Boolean(data.acceso_pagado)
    }

    async function pollProfile() {
      const res = await fetch('/api/checkout/status')
      if (res.status === 401) return false
      const data = await res.json().catch(() => ({}))
      if (cancelled) return false
      if (data.mi_codigo) setCodigo(data.mi_codigo)
      return Boolean(data.acceso_pagado)
    }

    async function poll() {
      let done = false
      if (provider === 'stripe' && sessionId) {
        done = await pollStripe()
      } else if (provider === 'paypal' && subscriptionId) {
        done = await pollPayPal()
      } else if (provider === 'klarna') {
        done = await pollProfile()
      } else {
        done = await pollProfile()
      }

      if (cancelled) return
      if (done) {
        setActivating(false)
        return
      }
      attempts += 1
      if (attempts < 15) {
        setTimeout(poll, 2000)
      } else {
        setActivating(false)
      }
    }

    void poll()
    return () => {
      cancelled = true
    }
  }, [sessionId, subscriptionId, provider])

  return (
    <AuthShell
      title={activating ? 'Activando tu acceso…' : '¡Suscripción activa!'}
      subtitle={
        activating
          ? `Confirmando el pago (${providerLabel(provider)}). Esto tarda unos segundos.`
          : 'Acceso completo al dashboard y todos los módulos publicados.'
      }
      badge={activating ? 'Procesando' : 'Pago confirmado'}
      image={IMG.exito}
    >
      {activating && (
        <p className="text-center text-sm text-[var(--text-muted)] mb-6">
          No cierres esta ventana…
        </p>
      )}

      {codigo && !activating && (
        <div className="dash-panel dash-panel--success text-center mb-5">
          <p className="text-sm text-[var(--text-muted)] mb-1">Tu código de referido</p>
          <DashDisplay value={codigo} tone="neutral" className="!text-4xl tracking-widest" />
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Ganas ${PRICING.referralPayout} por cada amigo que se suscribe con tu código (ACH, según términos).
          </p>
        </div>
      )}

      {!activating && (
        <Button3D href="/dashboard" variant="gold" className="w-full" pulse>
          Ir a mi panel →
        </Button3D>
      )}

      {activating && (
        <button type="button" className="btn-3d-gold w-full opacity-70 cursor-wait" disabled>
          Esperando confirmación…
        </button>
      )}

      {!activating && !codigo && (
        <p className="text-sm text-[var(--text-muted)] text-center mt-4">
          Si el dashboard no refleja el pago, entra de nuevo desde{' '}
          <Link href="/entrar" className="text-[var(--cyan-bright)] underline">
            login
          </Link>
          .
        </p>
      )}
    </AuthShell>
  )
}

export default function ExitoPage() {
  return (
    <Suspense fallback={<AuthShell title="Cargando…" subtitle=""><span /></AuthShell>}>
      <ExitoContent />
    </Suspense>
  )
}
