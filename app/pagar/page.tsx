'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { AuthError, AuthField, AuthInput, AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { MODULE_COUNT_LABEL } from '@/lib/productCatalog'
import { checkoutDisplayAmount, type CheckoutPlan } from '@/lib/stripe'
import { PRICING } from '@/lib/siteFacts'
import { IMG } from '@/lib/images'

export default function PagarPage() {
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [codigoValido, setCodigoValido] = useState<boolean | null>(null)
  const [plan, setPlan] = useState<CheckoutPlan>('mensual')
  const [precio, setPrecio] = useState<number>(PRICING.monthly)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const syncPrecio = useCallback((p: CheckoutPlan, valido: boolean | null) => {
    const conDescuento = valido === true
    setPrecio(checkoutDisplayAmount(p, conDescuento))
  }, [])

  const validarCodigo = useCallback(
    async (cod: string, planActual: CheckoutPlan) => {
      if (!cod) {
        setCodigoValido(null)
        syncPrecio(planActual, null)
        return
      }
      const res = await fetch('/api/referidos/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: cod }),
      })
      const data = await res.json()
      const valido = !!data.valido
      setCodigoValido(valido)
      syncPrecio(planActual, valido)
    },
    [syncPrecio],
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cod = params.get('codigo') || ''
    const planParam = params.get('plan') === 'anual' ? 'anual' : 'mensual'
    setPlan(planParam)
    syncPrecio(planParam, null)
    if (cod) {
      setCodigo(cod)
      void validarCodigo(cod, planParam)
    }
  }, [syncPrecio, validarCodigo])

  function selectPlan(next: CheckoutPlan) {
    setPlan(next)
    syncPrecio(next, codigoValido)
    const url = new URL(window.location.href)
    url.searchParams.set('plan', next)
    window.history.replaceState({}, '', url.pathname + url.search)
  }

  async function handlePago(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo, plan }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'No se pudo iniciar el pago. Intenta de nuevo.')
        setLoading(false)
        return
      }
      if (data.url) {
        window.location.href = data.url
        return
      }
      setError('Stripe no devolvió URL de pago. Intenta de nuevo.')
      setLoading(false)
    } catch {
      setError('Error de conexión con pagos. Revisa tu internet e intenta de nuevo.')
      setLoading(false)
    }
  }

  const periodLabel = plan === 'anual' ? '/año' : '/mes'
  const planTitle = plan === 'anual' ? 'Plan anual' : 'Plan mensual'

  return (
    <AuthShell
      title="Activa tu suscripción"
      subtitle="Suscripción renovable con Stripe. Acceso inmediato al dashboard."
      image={IMG.pagar}
    >
      <div className="pay-plan-toggle" role="group" aria-label="Elige plan">
        <button
          type="button"
          className={`pay-plan-btn ${plan === 'mensual' ? 'pay-plan-btn--active' : ''}`}
          onClick={() => selectPlan('mensual')}
        >
          Mensual · ${PRICING.monthly}/mes
        </button>
        <button
          type="button"
          className={`pay-plan-btn ${plan === 'anual' ? 'pay-plan-btn--active' : ''}`}
          onClick={() => selectPlan('anual')}
        >
          Anual · ${PRICING.annual}/año
        </button>
      </div>

      <div className="text-center mb-6">
        <p className="auth-price">
          ${precio}
          <span className="text-lg font-semibold text-[var(--text-secondary)]">{periodLabel}</span>
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {planTitle} · {MODULE_COUNT_LABEL}
        </p>
        {plan === 'anual' && (
          <p className="text-xs text-[var(--gold-400)] font-semibold mt-1">
            Equivale a ${PRICING.annualPerMonth}/mes · ahorras ${PRICING.annualSavings}
          </p>
        )}
      </div>

      <form onSubmit={handlePago}>
        {error && <AuthError message={error} />}
        <AuthField label="Tu email">
          <AuthInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </AuthField>
        <AuthField label="Código de referido (opcional)">
          <AuthInput
            type="text"
            value={codigo}
            onChange={(e) => {
              const v = e.target.value.toUpperCase()
              setCodigo(v)
              void validarCodigo(v, plan)
            }}
            placeholder="Ej: ALEX1247"
            style={{
              borderColor:
                codigoValido === true
                  ? 'rgba(16,185,129,0.5)'
                  : codigoValido === false
                    ? 'rgba(239,68,68,0.5)'
                    : undefined,
            }}
          />
        </AuthField>
        {codigoValido === true && (
          <p className="text-sm text-[var(--emerald-400)] font-semibold mb-3">
            ✓ Código válido — −${PRICING.referralPayout} en tu primer pago
          </p>
        )}
        {codigoValido === false && (
          <p className="text-sm text-[var(--red-500)] mb-3">Código no válido</p>
        )}
        <Button3D type="submit" variant="gold" className="w-full" pulse={!loading}>
          {loading ? 'Conectando con Stripe…' : `Suscribirme — $${precio}${periodLabel} →`}
        </Button3D>
      </form>
      <div className="auth-trust-row">
        <span>Stripe SSL</span>
        <span>Acceso inmediato</span>
        <span>Cancela cuando quieras</span>
      </div>
      <div className="auth-footer flex flex-col gap-2">
        <Link href="/que-incluye">Ver qué incluye tu plan →</Link>
        <Link href="/precios">Comparar todos los planes</Link>
      </div>
    </AuthShell>
  )
}
