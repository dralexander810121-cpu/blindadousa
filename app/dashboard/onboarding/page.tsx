'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DashOption, DashPanel, DashRangeRow } from '@/components/dashboard/DashPanel'
import { PREOCUPACIONES_UI } from '@/lib/perfil/mayorPreocupacion'

const PREOCUPACIONES = [...PREOCUPACIONES_UI]

type Form = {
  estado: string
  credit_score: number
  ingreso_mensual: number
  gastos_mensuales: number
  deuda_total: number
  tiene_ssn: boolean
  tiene_itin: boolean
  tiene_cuenta_banco: boolean
  envia_remesas: boolean
  monto_remesas: number
  pais_remesas: string
  tiene_carro: boolean
  tiene_casa: boolean
  mayor_preocupacion: string
}

const INITIAL: Form = {
  estado: 'TX',
  credit_score: 650,
  ingreso_mensual: 3500,
  gastos_mensuales: 2800,
  deuda_total: 5000,
  tiene_ssn: false,
  tiene_itin: false,
  tiene_cuenta_banco: true,
  envia_remesas: true,
  monto_remesas: 300,
  pais_remesas: 'México',
  tiene_carro: false,
  tiene_casa: false,
  mayor_preocupacion: PREOCUPACIONES[0],
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [whatsappOptIn, setWhatsappOptIn] = useState(false)
  const [telefono, setTelefono] = useState('')

  const steps = ['Bienvenida', 'Finanzas', 'Identidad', 'Metas', 'Listo']
  const progress = ((step + 1) / steps.length) * 100

  function patch<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function guardar(destino: 'tarjetas' | 'dashboard') {
    if (loading) return false
    setLoading(true)
    setError('')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 25_000)
    try {
      const res = await fetch('/api/perfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          ...form,
          whatsapp_opt_in: whatsappOptIn,
          telefono_whatsapp: whatsappOptIn && telefono ? telefono.replace(/\D/g, '').slice(-10) : null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')

      void fetch('/api/onboarding/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meta: form.mayor_preocupacion,
          perfil: {
            credit_score: form.credit_score,
            ingreso_mensual: form.ingreso_mensual,
            deuda_total: form.deuda_total,
            tiene_ssn: form.tiene_ssn,
            tiene_itin: form.tiene_itin,
          },
        }),
      }).catch(() => {})

      const href =
        destino === 'tarjetas' ? '/dashboard/credito/tarjetas' : '/dashboard'
      router.replace(href)
      return true
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        setError('Tardó demasiado. Revisa tu internet e intenta de nuevo.')
      } else {
        setError(e instanceof Error ? e.message : 'No se pudo guardar')
      }
      return false
    } finally {
      window.clearTimeout(timeout)
      setLoading(false)
    }
  }

  return (
    <div className="dash-page dash-page--banana max-w-xl mx-auto">
      <div className="mb-6">
        <div className="h-2 rounded-full bg-[var(--glass-08)] overflow-hidden">
          <div
            className="h-full bg-[var(--grad-blue)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Paso {step + 1} de {steps.length}: {steps[step]}
        </p>
      </div>

      {step === 0 && (
        <DashPanel className="text-center">
          <h1 className="dash-page-title mb-3">Configura tu perfil</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            En 2 minutos la IA Maestra conoce tu situación y te da mejores respuestas.
          </p>
          <label className="dash-form-label text-left">Tu estado</label>
          <select
            className="dash-select mb-6"
            value={form.estado}
            onChange={(e) => patch('estado', e.target.value)}
          >
            {['TX', 'CA', 'FL', 'NY', 'IL', 'AZ', 'GA', 'NC', 'NJ', 'CO'].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="button" className="btn-3d-blue w-full" onClick={() => setStep(1)}>
            Empezar →
          </button>
        </DashPanel>
      )}

      {step === 1 && (
        <DashPanel>
          <h2>Tu situación financiera</h2>
          {[
            {
              key: 'credit_score' as const,
              label: 'Score de crédito (estimado)',
              min: 300,
              max: 850,
              step: 10,
              fmt: (n: number) => String(n),
            },
            {
              key: 'ingreso_mensual' as const,
              label: 'Ingreso mensual',
              min: 500,
              max: 20000,
              step: 100,
              fmt: (n: number) => `$${n.toLocaleString()}`,
            },
            {
              key: 'gastos_mensuales' as const,
              label: 'Gastos mensuales',
              min: 200,
              max: 15000,
              step: 100,
              fmt: (n: number) => `$${n.toLocaleString()}`,
            },
            {
              key: 'deuda_total' as const,
              label: 'Deuda total aprox.',
              min: 0,
              max: 100000,
              step: 500,
              fmt: (n: number) => `$${n.toLocaleString()}`,
            },
          ].map((s) => (
            <DashRangeRow key={s.key} label={s.label} value={s.fmt(form[s.key])}>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={form[s.key]}
                onChange={(e) => patch(s.key, Number(e.target.value))}
                className="w-full accent-[var(--cyan-bright)]"
              />
            </DashRangeRow>
          ))}
          <div className="flex gap-3 mt-4">
            <button type="button" className="btn-glass flex-1" onClick={() => setStep(0)}>
              ← Atrás
            </button>
            <button type="button" className="btn-3d-blue flex-1" onClick={() => setStep(2)}>
              Siguiente →
            </button>
          </div>
        </DashPanel>
      )}

      {step === 2 && (
        <DashPanel>
          <h2>Identidad y banco</h2>
          {[
            { key: 'tiene_ssn' as const, label: 'Tengo SSN' },
            { key: 'tiene_itin' as const, label: 'Tengo ITIN' },
            { key: 'tiene_cuenta_banco' as const, label: 'Tengo cuenta de banco en USA' },
            { key: 'envia_remesas' as const, label: 'Envío remesas al extranjero' },
          ].map((t) => (
            <label key={t.key} className="flex items-center gap-3 text-sm cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={form[t.key]}
                onChange={(e) => patch(t.key, e.target.checked)}
                className="w-4 h-4"
              />
              {t.label}
            </label>
          ))}
          {form.envia_remesas && (
            <>
              <input
                className="dash-input mb-3"
                placeholder="País principal"
                value={form.pais_remesas}
                onChange={(e) => patch('pais_remesas', e.target.value)}
              />
              <DashRangeRow label="Monto mensual en remesas" value={`$${form.monto_remesas}`}>
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={50}
                  value={form.monto_remesas}
                  onChange={(e) => patch('monto_remesas', Number(e.target.value))}
                  className="w-full accent-[var(--cyan-bright)]"
                />
              </DashRangeRow>
            </>
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" className="btn-glass flex-1" onClick={() => setStep(1)}>
              ← Atrás
            </button>
            <button type="button" className="btn-3d-blue flex-1" onClick={() => setStep(3)}>
              Siguiente →
            </button>
          </div>
        </DashPanel>
      )}

      {step === 3 && (
        <DashPanel>
          <h2>¿Qué te preocupa más?</h2>
          <div className="flex flex-col gap-2 mb-4">
            {PREOCUPACIONES.map((p) => (
              <DashOption
                key={p}
                selected={form.mayor_preocupacion === p}
                onClick={() => patch('mayor_preocupacion', p)}
                title={p}
              />
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.tiene_carro}
              onChange={(e) => patch('tiene_carro', e.target.checked)}
            />
            Ya tengo carro financiado
          </label>
          <label className="flex items-center gap-3 text-sm mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={form.tiene_casa}
              onChange={(e) => patch('tiene_casa', e.target.checked)}
            />
            Renta o soy dueño de casa
          </label>
          <div className="flex gap-3">
            <button type="button" className="btn-glass flex-1" onClick={() => setStep(2)}>
              ← Atrás
            </button>
            <button type="button" className="btn-3d-blue flex-1" onClick={() => setStep(4)}>
              Siguiente →
            </button>
          </div>
        </DashPanel>
      )}

      {step === 4 && (
        <DashPanel className="text-center">
          <h2>¡Listo!</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Guardamos tu perfil. El siguiente paso recomendado es conectar tu banco con Plaid para
            alertas de pagos y utilización.
          </p>
          <label className="flex items-center justify-center gap-3 text-sm mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={whatsappOptIn}
              onChange={(e) => setWhatsappOptIn(e.target.checked)}
            />
            Alertas críticas por WhatsApp
          </label>
          {whatsappOptIn && (
            <div className="flex justify-center gap-2 mb-4 max-w-xs mx-auto">
              <span className="dash-input !w-auto !py-2 !px-3 text-sm">+1</span>
              <input
                className="dash-input flex-1 text-sm"
                placeholder="7135551234"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
          )}
          {error && <p className="text-sm text-[var(--red-500)] mb-4">{error}</p>}
          <button
            type="button"
            className="btn-3d-gold w-full mb-3"
            disabled={loading}
            onClick={() => void guardar('tarjetas')}
          >
            {loading ? 'Guardando…' : 'Guardar y conectar banco →'}
          </button>
          <button
            type="button"
            className="btn-glass w-full text-sm"
            disabled={loading}
            onClick={() => void guardar('dashboard')}
          >
            Guardar e ir al dashboard
          </button>
          <Link href="/dashboard" className="block text-xs text-[var(--text-muted)] mt-4">
            Saltar por ahora
          </Link>
        </DashPanel>
      )}
    </div>
  )
}
