'use client'
import { useState } from 'react'
import Link from 'next/link'

function ScoreGauge({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(1, (score - 300) / 550))
  const col = score >= 800 ? '#52B788' : score >= 740 ? '#40916C' : score >= 670 ? '#FFB703' : score >= 580 ? '#F77F00' : '#D62828'
  const label = score >= 800 ? 'Excepcional' : score >= 740 ? 'Muy Bueno' : score >= 670 ? 'Bueno' : score >= 580 ? 'Regular' : 'Bajo'
  const circumference = Math.PI * 90
  const offset = circumference * (1 - pct)
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="220" height="130" viewBox="0 0 220 130">
        <path d="M 25 115 A 90 90 0 0 1 195 115" fill="none" stroke="#E5E7EB" strokeWidth="14" strokeLinecap="round"/>
        <path d="M 25 115 A 90 90 0 0 1 195 115" fill="none" stroke={col} strokeWidth="14" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.2s ease, stroke .5s' }} />
        <text x="110" y="102" textAnchor="middle" style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 52, fill: col }}>{score || '—'}</text>
        <text x="22" y="128" textAnchor="middle" style={{ fontSize: 10, fill: '#9CA3AF' }}>300</text>
        <text x="198" y="128" textAnchor="middle" style={{ fontSize: 10, fill: '#9CA3AF' }}>850</text>
      </svg>
      <div style={{ fontWeight: 700, color: col, fontSize: 15, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

const FACTORES = [
  { pct: 35, icon: '📅', name: '¿Pagas a tiempo?', desc: 'El factor más importante. Un solo pago tarde puede bajar tu score 50-100 puntos.' },
  { pct: 30, icon: '💰', name: '¿Cuánto debes vs cuánto puedes?', desc: 'Usa menos del 30% de tu límite. Lo ideal es menos del 10%.' },
  { pct: 15, icon: '🕐', name: '¿Cuánto tiempo llevas?', desc: 'Cuanto más tiempo tienes tus cuentas abiertas, mejor.' },
  { pct: 10, icon: '📝', name: '¿Pediste crédito nuevo?', desc: 'Cada solicitud de crédito puede bajar el score 5-10 puntos.' },
  { pct: 10, icon: '🎭', name: '¿Tienes variedad?', desc: 'Tener tarjetas, un auto, y una hipoteca muestra que puedes manejar diferentes tipos de crédito.' },
]

export default function CreditoPage() {
  const [score, setScore] = useState(680)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState('')

  async function generarPlan() {
    setLoading(true)
    const res = await fetch('/api/ai/asistente', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensaje: `Mi score de crédito es ${score}. Dame un plan de 3 acciones concretas ordenadas por impacto para subir mi score. Sé muy específico con números y fechas.`, historial: [] }) })
    const data = await res.json()
    setPlan(data.respuesta)
    setLoading(false)
  }

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Mi Crédito 💳</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 28 }}>Entiende tu score y mejóralo paso a paso</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Score Card */}
        <div className="card" style={{ padding: 28, gridColumn: 'span 1' }}>
          <div style={{ fontSize: 13, color: 'var(--gray)', marginBottom: 8, fontWeight: 600 }}>TU SCORE ACTUAL</div>
          <ScoreGauge score={score} />
          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 13, color: 'var(--gray)', display: 'block', marginBottom: 6 }}>Ajusta para simular:</label>
            <input type="range" min={300} max={850} value={score} onChange={e => setScore(+e.target.value)} />
          </div>
        </div>

        {/* Acceso rápido */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { href: '/dashboard/credito/tarjetas', icon: '💳', name: 'Mis Tarjetas (Plaid)', desc: 'Conecta y optimiza tus tarjetas' },
            { href: '/dashboard/credito/disputas', icon: '⚡', name: 'Disputas al Buró', desc: 'Encuentra y disputa errores' },
            { href: '/dashboard/credito/cartas', icon: '✉️', name: 'Cartas Generadas', desc: 'Cartas listas para enviar' },
            { href: '/dashboard/credito/simulador', icon: '🎯', name: 'Simulador', desc: '¿Qué pasa si pago X?' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer', transition: 'border-color .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#E5E7EB'}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray)' }}>{item.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--gray)' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Factores FICO */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>¿Por qué está tu score así?</h2>
        {FACTORES.map(f => (
          <div key={f.name} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{f.icon} {f.name}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13 }}>{f.pct}% del score</span>
            </div>
            <div className="progress" style={{ marginBottom: 4 }}>
              <div className="progress-fill" style={{ width: `${f.pct * 2}%`, background: f.pct >= 30 ? 'var(--primary)' : 'var(--primary-light)' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--gray)', lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Plan IA */}
      <div className="card">
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>¿Qué hago PRIMERO para subir mi score?</h2>
        <p style={{ color: 'var(--gray)', fontSize: 14, marginBottom: 16 }}>La IA analiza tu score actual ({score} puntos) y te da el plan exacto.</p>
        {!plan && <button className="btn-green" onClick={generarPlan} disabled={loading} style={{ fontSize: 15 }}>{loading ? 'Generando tu plan...' : '🤖 Generar mi plan personalizado →'}</button>}
        {plan && <div style={{ background: 'var(--pale-green)', borderRadius: 12, padding: 20, fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap', color: 'var(--dark)' }}>{plan}</div>}
      </div>
    </div>
  )
}
