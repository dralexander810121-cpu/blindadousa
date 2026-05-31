'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'

function ExitoContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [activating, setActivating] = useState(!!sessionId)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!sessionId) return

    let cancelled = false
    let attempts = 0

    async function poll() {
      try {
        const res = await fetch(
          `/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId!)}`,
        )
        const data = await res.json().catch(() => ({}))
        if (cancelled) return

        if (data.ok === true && data.pending !== true) {
          setVerified(true)
          setActivating(false)
          return
        }

        attempts += 1
        if (attempts < 12) {
          setTimeout(poll, 2000)
        } else {
          setActivating(false)
          setError('El pago tarda más de lo normal. Revisa tu email de Stripe o contacta soporte.')
        }
      } catch {
        if (!cancelled) {
          setActivating(false)
          setError('No pudimos confirmar el pago. Intenta recargar esta página.')
        }
      }
    }

    void poll()
    return () => {
      cancelled = true
    }
  }, [sessionId])

  return (
    <DashModuleShell
      title={activating ? 'Confirmando pago…' : verified || !sessionId ? '¡Pago recibido!' : 'Revisando pago'}
      subtitle={
        activating
          ? 'Esperando confirmación de Stripe. No cierres esta ventana.'
          : 'Estamos procesando tu listing en el directorio.'
      }
    >
      <div className="card-3d dash-panel max-w-lg text-center py-10">
        <p className="text-5xl mb-4">{activating ? '⏳' : verified || !sessionId ? '✅' : '⚠️'}</p>
        {error ? (
          <p className="text-[var(--red-400)] mb-6" role="alert">
            {error}
          </p>
        ) : (
          <p className="text-[var(--text-secondary)] mb-6">
            En 24–48 horas revisamos tu negocio y lo publicamos como verificado. Te contactaremos al email
            que usaste en Stripe si necesitamos algo más.
          </p>
        )}
        <Link href="/directorio" className="btn-3d-blue inline-flex !min-h-[44px] !text-sm">
          Ver directorio →
        </Link>
        {!sessionId && (
          <p className="text-xs text-[var(--text-muted)] mt-4">
            Si acabas de pagar, vuelve desde el enlace de confirmación de Stripe.
          </p>
        )}
      </div>
    </DashModuleShell>
  )
}

export default function NegocioExitoPage() {
  return (
    <Suspense
      fallback={
        <DashModuleShell title="Confirmando…" subtitle="">
          <p className="text-[var(--text-muted)]">Cargando…</p>
        </DashModuleShell>
      }
    >
      <ExitoContent />
    </Suspense>
  )
}
