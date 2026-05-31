'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AuthError, AuthField, AuthInput, AuthShell } from '@/components/landing/AuthShell'
import { KlarnaPayButton } from '@/components/payments/KlarnaPayButton'
import { PayPalHostedButton } from '@/components/payments/PayPalHostedButton'
import { MODULE_COUNT_LABEL } from '@/lib/productCatalog'
import { checkoutDisplayAmount, type CheckoutPlan } from '@/lib/stripe'
import { PRICING } from '@/lib/siteFacts'
import { IMG } from '@/lib/images'
import { createClient } from '@/lib/supabase/client'

type PayMethods = { paypal: boolean; klarna: boolean; card: boolean }
type PayPalHosted = {
  clientId: string
  mensual: string | null
  anual: string | null
} | null

function PagarForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [codigoValido, setCodigoValido] = useState<boolean | null>(null)
  const [plan, setPlan] = useState<CheckoutPlan>('mensual')
  const [precio, setPrecio] = useState<number>(PRICING.monthly)
  const [loading, setLoading] = useState<'paypal' | 'card' | null>(null)
  const [error, setError] = useState('')
  const [methods, setMethods] = useState<PayMethods>({ paypal: true, klarna: true, card: false })
  const [paypalHosted, setPaypalHosted] = useState<PayPalHosted>(null)

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
    const planParam = searchParams.get('plan') === 'anual' ? 'anual' : 'mensual'
    setPlan(planParam)
    syncPrecio(planParam, null)
    const cod = searchParams.get('codigo') || ''
    if (cod) {
      setCodigo(cod)
      void validarCodigo(cod, planParam)
    }

    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setEmail(user.email)
        setLoggedIn(true)
      }
    })

    fetch('/api/checkout')
      .then((r) => r.json())
      .then((data: { methods?: PayMethods; paypalHosted?: PayPalHosted }) => {
        if (data.methods) setMethods(data.methods)
        if (data.paypalHosted) setPaypalHosted(data.paypalHosted)
      })
      .catch(() => {})
  }, [searchParams, syncPrecio, validarCodigo])

  function selectPlan(next: CheckoutPlan) {
    setPlan(next)
    syncPrecio(next, codigoValido)
    const url = new URL(window.location.href)
    url.searchParams.set('plan', next)
    window.history.replaceState({}, '', url.pathname + url.search)
  }

  async function payWith(method: 'paypal' | 'card') {
    if (!email.trim()) {
      setError('Ingresa tu email antes de pagar.')
      return
    }
    setLoading(method)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo, plan, method }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'No se pudo iniciar el pago. Intenta de nuevo.')
        setLoading(null)
        return
      }
      if (data.url) {
        window.location.href = data.url
        return
      }
      setError('No se recibió URL de pago. Intenta de nuevo.')
      setLoading(null)
    } catch {
      setError('Error de conexión con pagos. Revisa tu internet e intenta de nuevo.')
      setLoading(null)
    }
  }

  const hostedButtonId =
    plan === 'anual' ? paypalHosted?.anual : paypalHosted?.mensual
  const showHostedPayPal = Boolean(paypalHosted?.clientId && hostedButtonId)
  const showRedirectPayPal = methods.paypal && !showHostedPayPal
  const periodLabel = plan === 'anual' ? '/año' : '/mes'
  const planTitle = plan === 'anual' ? 'Plan anual' : 'Plan mensual'
  const busy = loading !== null

  return (
    <AuthShell
      title="Activa tu suscripción"
      subtitle="Elige cómo pagar: PayPal directo a la cuenta del negocio, Klarna a plazos, o tarjeta."
      image={IMG.pagar}
    >
      <div className="pay-plan-toggle" role="group" aria-label="Elige plan">
        <button
          type="button"
          className={`pay-plan-btn ${plan === 'mensual' ? 'pay-plan-btn--active' : ''}`}
          onClick={() => selectPlan('mensual')}
        >
          Mensual · ${PRICING.monthly}
        </button>
        <button
          type="button"
          className={`pay-plan-btn ${plan === 'anual' ? 'pay-plan-btn--active' : ''}`}
          onClick={() => selectPlan('anual')}
        >
          Anual · ${PRICING.annual}
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

      {!loggedIn && (
        <p className="text-sm text-[var(--text-muted)] mb-4 text-center">
          Usa el mismo email de tu cuenta en{' '}
          <Link href="/trial" className="text-[var(--cyan-bright)] underline">
            /trial
          </Link>
          .
        </p>
      )}

      {error && <AuthError message={error} />}

      <AuthField label="Tu email">
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          readOnly={loggedIn}
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

      <div className="space-y-3 mt-2">
        {showHostedPayPal && paypalHosted?.clientId && hostedButtonId && (
          <PayPalHostedButton
            clientId={paypalHosted.clientId}
            hostedButtonId={hostedButtonId}
            email={email}
            codigo={codigo}
            plan={plan}
            onError={setError}
          />
        )}

        {showHostedPayPal && plan === 'anual' && !paypalHosted?.anual && (
          <p className="text-sm text-[var(--text-muted)] text-center">
            Plan anual por PayPal próximamente. Elige mensual o paga con Klarna/tarjeta.
          </p>
        )}

        {showRedirectPayPal && (
          <button
            type="button"
            className="pay-method-btn pay-method-btn--paypal w-full"
            onClick={() => void payWith('paypal')}
            disabled={busy}
          >
            {loading === 'paypal' ? 'Abriendo PayPal…' : `Pagar con PayPal — $${precio}${periodLabel} →`}
          </button>
        )}

        {!showHostedPayPal && !showRedirectPayPal && methods.paypal && (
          <p className="text-sm text-[var(--text-muted)] text-center">
            Configura PayPal en Vercel (Client ID + botón o Plan ID).
          </p>
        )}

        {methods.klarna && (
          <KlarnaPayButton
            email={email}
            codigo={codigo}
            plan={plan}
            disabled={busy}
            onError={setError}
          />
        )}

        {methods.card && (
          <button
            type="button"
            className="btn-3d-gold w-full pulse-cta"
            onClick={() => !busy && void payWith('card')}
            disabled={busy}
          >
            {loading === 'card' ? 'Conectando…' : `Pagar con tarjeta — $${precio}${periodLabel} →`}
          </button>
        )}

        {!methods.paypal && !methods.klarna && !methods.card && (
          <p className="text-sm text-[var(--red-500)] text-center">
            Pagos en configuración. Escribe a hola@blindadousa.com y te activamos manualmente.
          </p>
        )}
      </div>

      <div className="auth-trust-row">
        <span>Pago seguro</span>
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

export default function PagarPage() {
  return (
    <Suspense fallback={<AuthShell title="Cargando…" subtitle=""><span /></AuthShell>}>
      <PagarForm />
    </Suspense>
  )
}
