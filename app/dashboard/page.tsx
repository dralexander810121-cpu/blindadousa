'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { AccountsPanel, AlertsPanel } from '@/components/dashboard/AlertsPanel'
import { ActionPlanCard } from '@/components/dashboard/ActionPlanCard'
import { BannerTrial } from '@/components/dashboard/BannerTrial'
import { ModulesGrid } from '@/components/dashboard/ModulesGrid'
import { OnboardingBanner } from '@/components/dashboard/OnboardingBanner'
import { PlaidConnect } from '@/components/dashboard/PlaidConnect'
import { formatDollars } from '@/lib/utils'

type DashboardData = {
  usuario: {
    nombre: string | null
    trial_activo: boolean | null
    trial_fin: string | null
    acceso_pagado: boolean | null
  }
  metrics: {
    credit_score: number | null
    balance_total: number
    gastos_mes: number
    alertas_activas: number
    cuentas_conectadas: number
    deuda_tarjetas: number
  }
  cuentas: Parameters<typeof AccountsPanel>[0]['cuentas']
  alertas: Parameters<typeof AlertsPanel>[0]['alertas']
  plaid_configured: boolean
}

function MetricCard({
  label,
  value,
  sub,
  tone = 'neutral',
}: {
  label: string
  value: string
  sub?: string
  tone?: 'neutral' | 'positive' | 'negative' | 'gold'
}) {
  return (
    <div className={`dash-metric dash-metric--${tone}`}>
      <p className="dash-metric-label">{label}</p>
      <p className="dash-metric-value font-display">{value}</p>
      {sub && <p className="dash-metric-sub">{sub}</p>}
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/plaid/accounts')
      if (res.ok) {
        setData(await res.json())
        setLoadError(false)
      } else {
        setLoadError(true)
      }
    } catch {
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const nombre = data?.usuario?.nombre?.split(' ')[0] || 'amigo'
  const trialFin = data?.usuario?.trial_fin
  const diasTrial = trialFin
    ? Math.max(0, Math.ceil((new Date(trialFin).getTime() - Date.now()) / 86400000))
    : 0
  const enTrial = Boolean(data?.usuario?.trial_activo && !data?.usuario?.acceso_pagado)
  const connected = (data?.metrics.cuentas_conectadas ?? 0) > 0

  const score = data?.metrics.credit_score
  const scoreLabel = score ? `${score}` : '—'
  const scoreSub = score ? (score >= 670 ? 'Bueno' : score >= 580 ? 'Regular' : 'Construir') : 'Conecta perfil'

  return (
    <div className="dash-page dash-page--banana">
      <div className="dash-page-head">
        <div>
          <h1 className="dash-page-title">Bienvenido, {nombre} 👋</h1>
          <p className="dash-page-date">
            {new Date().toLocaleDateString('es-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Link href="/dashboard/asistente" className="dash-ia-input" aria-label="Abrir asistente de IA Maestra">
          ¿Qué necesitas hoy? Pregúntale a Blindado…
        </Link>
      </div>

      {enTrial && diasTrial > 0 && <BannerTrial diasRestantes={diasTrial} />}

      <OnboardingBanner />

      {loading ? (
        <div className="dash-loading">Cargando tu centro de comando…</div>
      ) : loadError ? (
        <div className="card-3d dash-panel text-center py-10 max-w-lg mx-auto">
          <p className="font-bold mb-2">No pudimos cargar tus datos</p>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Revisa tu conexión o vuelve a entrar.
          </p>
          <button type="button" onClick={() => { setLoading(true); load() }} className="btn-3d-gold !min-h-[44px] !text-sm">
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <div className="dash-metrics-grid">
            <MetricCard
              label="Score de crédito"
              value={scoreLabel}
              sub={scoreSub}
              tone={score && score >= 670 ? 'positive' : 'gold'}
            />
            <MetricCard
              label="Balance total"
              value={formatDollars(data?.metrics.balance_total ?? 0)}
              sub={`${data?.metrics.cuentas_conectadas ?? 0} cuenta(s) conectada(s)`}
            />
            <MetricCard
              label="Gastos este mes"
              value={formatDollars(data?.metrics.gastos_mes ?? 0)}
              sub="Actualiza en perfil financiero"
            />
            <MetricCard
              label="Alertas activas"
              value={String(data?.metrics.alertas_activas ?? 0)}
              sub={
                (data?.metrics.alertas_activas ?? 0) > 0 ? 'Revisa abajo' : 'Todo bajo control'
              }
              tone={(data?.metrics.alertas_activas ?? 0) > 0 ? 'negative' : 'positive'}
            />
          </div>

          <div className="dash-two-col">
            <div className="space-y-5">
              <AlertsPanel alertas={data?.alertas ?? []} />
              <AccountsPanel cuentas={data?.cuentas ?? []} />
            </div>

            <aside className="space-y-5">
              <ActionPlanCard
                score={data?.metrics.credit_score ?? null}
                alertasActivas={data?.metrics.alertas_activas ?? 0}
                cuentasConectadas={data?.metrics.cuentas_conectadas ?? 0}
                deudaTarjetas={data?.metrics.deuda_tarjetas ?? 0}
              />

              {data?.plaid_configured ? (
                <PlaidConnect connected={connected} onConnected={load} />
              ) : (
                <div className="card-3d dash-plaid-box">
                  <p className="text-sm font-bold mb-2">Conexión bancaria 🔒</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Estamos activando la conexión segura con tu banco para monitorear pagos,
                    cortes y utilización en automático. Disponible muy pronto.
                  </p>
                </div>
              )}

              <div className="chart-container banana-pro-panel">
                <h3 className="dash-panel-title">Resumen rápido</h3>
                <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <li className="flex justify-between">
                    <span>Deuda en tarjetas</span>
                    <strong className="text-[var(--text-primary)]">
                      {formatDollars(data?.metrics.deuda_tarjetas ?? 0)}
                    </strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Plan</span>
                    <strong className="text-[var(--gold-400)]">
                      {data?.usuario.acceso_pagado ? 'Activo' : enTrial ? 'Trial' : 'Gratis'}
                    </strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Monitor de pagos</span>
                    <strong className={connected ? 'text-[var(--emerald-400)]' : 'text-[var(--text-muted)]'}>
                      {connected ? 'Con cuentas' : 'Sin conectar'}
                    </strong>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <ModulesGrid />
        </>
      )}

      <p className="dash-disclaimer">
        Herramienta educativa. No constituye asesoría legal, contable ni financiera certificada.
      </p>
    </div>
  )
}

