'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DashDisplay, DashPanel, DashRangeRow } from '@/components/dashboard/DashPanel'

function ScoreGauge({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(1, (score - 300) / 550))
  const col =
    score >= 800
      ? 'var(--emerald-400)'
      : score >= 740
        ? 'var(--cyan-bright)'
        : score >= 670
          ? 'var(--amber-500)'
          : score >= 580
            ? 'var(--amber-500)'
            : 'var(--red-500)'
  const label =
    score >= 800
      ? 'Excepcional'
      : score >= 740
        ? 'Muy bueno'
        : score >= 670
          ? 'Bueno'
          : score >= 580
            ? 'Regular'
            : 'Bajo'
  const circumference = Math.PI * 90
  const offset = circumference * (1 - pct)
  return (
    <div className="text-center">
      <svg width="220" height="130" viewBox="0 0 220 130" className="mx-auto">
        <path
          d="M 25 115 A 90 90 0 0 1 195 115"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 25 115 A 90 90 0 0 1 195 115"
          fill="none"
          stroke={col}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease' }}
        />
        <text
          x="110"
          y="102"
          textAnchor="middle"
          style={{ fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', fontWeight: 800, fontSize: 48, fill: col }}
        >
          {score || '—'}
        </text>
        <text x="22" y="128" textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">
          300
        </text>
        <text x="198" y="128" textAnchor="middle" className="fill-[var(--text-muted)] text-[10px]">
          850
        </text>
      </svg>
      <p className="font-bold uppercase tracking-wide text-sm" style={{ color: col }}>
        {label}
      </p>
    </div>
  )
}

const FACTORES = [
  { pct: 35, icon: '📅', name: '¿Pagas a tiempo?', desc: 'Un solo pago tarde puede bajar tu score 50–100 puntos.' },
  { pct: 30, icon: '💰', name: 'Utilización', desc: 'Usa menos del 30% de tu límite. Lo ideal es menos del 10%.' },
  { pct: 15, icon: '🕐', name: 'Antigüedad', desc: 'Cuentas más viejas ayudan tu historial.' },
  { pct: 10, icon: '📝', name: 'Crédito nuevo', desc: 'Cada consulta dura puede bajar 5–10 puntos.' },
  { pct: 10, icon: '🎭', name: 'Mezcla', desc: 'Variedad de crédito (tarjeta, auto, casa) ayuda.' },
]

const LINKS = [
  { href: '/dashboard/credito/tarjetas', icon: '💳', name: 'Mis tarjetas (Plaid)', desc: 'Conecta y optimiza' },
  { href: '/dashboard/credito/disputas', icon: '⚡', name: 'Disputas al buró', desc: 'Errores FCRA' },
  { href: '/dashboard/credito/cartas', icon: '✉️', name: 'Cartas generadas', desc: 'Listas para enviar' },
  { href: '/dashboard/credito/simulador', icon: '🎯', name: 'Simulador', desc: 'Proyecciones' },
]

export default function CreditoPage() {
  const [score, setScore] = useState(680)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState('')

  useEffect(() => {
    fetch('/api/perfil')
      .then((r) => r.json())
      .then((d) => {
        if (d.perfil?.credit_score) setScore(Number(d.perfil.credit_score))
      })
      .catch(() => {})
  }, [])

  async function generarPlan() {
    setLoading(true)
    const res = await fetch('/api/ia/maestro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mensaje: `Mi score de crédito es ${score}. Dame un plan de 3 acciones concretas ordenadas por impacto para subir mi score. Sé específico con números y fechas.`,
        historial: [],
      }),
    })
    const data = await res.json()
    setPlan(data.respuesta || data.error || '')
    setLoading(false)
  }

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Mi crédito</h1>
      <p className="dash-page-date mb-8">Entiende tu score y mejóralo paso a paso</p>

      <div className="dash-grid-2 mb-8">
        <DashPanel>
          <p className="dash-form-label mb-3">Tu score actual</p>
          <ScoreGauge score={score} />
          <label className="dash-form-label mt-4">Simular otro score</label>
          <DashRangeRow label="Puntaje" value={String(score)}>
            <input
              type="range"
              min={300}
              max={850}
              value={score}
              onChange={(e) => setScore(+e.target.value)}
              className="w-full accent-[var(--cyan-bright)]"
            />
          </DashRangeRow>
        </DashPanel>

        <div className="flex flex-col gap-3">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="dash-panel flex gap-3 items-center hover:border-[var(--cyan-bright)]/40 transition-colors no-underline"
            >
              <span className="text-2xl" aria-hidden>
                {item.icon}
              </span>
              <div className="flex-1">
                <p className="font-bold text-sm text-[var(--text-primary)] mb-0">{item.name}</p>
                <p className="text-xs text-[var(--text-muted)] m-0">{item.desc}</p>
              </div>
              <span className="text-[var(--text-muted)]">→</span>
            </Link>
          ))}
        </div>
      </div>

      <DashPanel className="mb-6">
        <h2>¿Por qué está tu score así?</h2>
        {FACTORES.map((f) => (
          <div key={f.name} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-[var(--text-primary)]">
                {f.icon} {f.name}
              </span>
              <span className="text-[var(--cyan-bright)] font-bold">{f.pct}%</span>
            </div>
            <div className="progress mb-1">
              <div className="progress-fill" style={{ width: `${f.pct * 2}%` }} />
            </div>
            <p className="text-xs text-[var(--text-muted)] m-0">{f.desc}</p>
          </div>
        ))}
      </DashPanel>

      <DashPanel>
        <h2>¿Qué hago primero para subir mi score?</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          La IA analiza tu score ({score} puntos) y te da el plan exacto.
        </p>
        {!plan && (
          <button
            type="button"
            className="btn-3d-gold !min-h-[44px] !text-sm"
            disabled={loading}
            onClick={generarPlan}
          >
            {loading ? 'Generando…' : 'Generar mi plan con IA Maestra →'}
          </button>
        )}
        {plan && <div className="dash-result-box mt-4">{plan}</div>}
      </DashPanel>
    </div>
  )
}
