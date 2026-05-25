'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const MODULOS = [
  { href: '/dashboard/credito',     icon: '💳', name: 'Mi Crédito',        desc: 'Score, disputas y plan de mejora' },
  { href: '/dashboard/casa',        icon: '🏠', name: 'Comprar Casa',       desc: 'Hipotecas, costos y tus derechos' },
  { href: '/dashboard/carro',       icon: '🚗', name: 'Comprar Carro',      desc: 'Tasa justa y lo que no te dicen' },
  { href: '/dashboard/remesas',     icon: '💸', name: 'Remesas 2026',       desc: 'Evita el impuesto activo' },
  { href: '/dashboard/prestamos',   icon: '🚨', name: 'Préstamos',          desc: 'Escanea si te quieren engañar' },
  { href: '/dashboard/jubilacion',  icon: '🏦', name: 'Jubilación',         desc: '401K, IRA y calculadora' },
  { href: '/dashboard/banco',       icon: '🏧', name: 'Mi Banco',           desc: 'Primera cuenta sin SSN' },
  { href: '/dashboard/trabajo',     icon: '⚖️', name: 'Salario Justo',      desc: '¿Te están pagando lo justo?' },
  { href: '/dashboard/taxes',       icon: '📋', name: 'Taxes e ITIN',       desc: 'Declara y recupera tu dinero' },
  { href: '/dashboard/emergencia',  icon: '🆘', name: 'Emergencias',        desc: 'Plan de 90 días con IA' },
  { href: '/dashboard/derechos',    icon: '🛡️', name: 'Mis Derechos',       desc: 'Trabajo, casa, hospital, policía' },
  { href: '/dashboard/subsidios',   icon: '🎁', name: 'Subsidios y Ayudas', desc: 'SNAP, Medicaid, Section 8' },
  { href: '/dashboard/asistente',   icon: '🤖', name: 'Asistente IA',       desc: 'Chat en español 24/7' },
]

export default function DashboardPage() {
  const [usuario, setUsuario] = useState<any>(null)
  const [alertas, setAlertas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const [{ data: u }, { data: al }] = await Promise.all([
      supabase.from('usuarios').select('*').eq('auth_user_id', user.id).single(),
      supabase.from('alertas').select('*').eq('usuario_id', user.id).eq('leida', false).order('created_at', { ascending: false }).limit(5),
    ])
    setUsuario(u); setAlertas(al || [])
    setLoading(false)
  }

  const diasTrial = usuario?.trial_fin ? Math.max(0, Math.ceil((new Date(usuario.trial_fin).getTime() - Date.now()) / 86400000)) : 0
  const enTrial = usuario?.trial_activo && !usuario?.acceso_pagado

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>
          Hola, {usuario?.nombre?.split(' ')[0] || 'amigo'} 👋
        </h1>
        <p style={{ color: 'var(--gray)', fontSize: 15 }}>
          {new Date().toLocaleDateString('es-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Trial Banner */}
      {enTrial && (
        <div className="trial-banner" style={{ marginBottom: 24 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>⏰ Te quedan <strong>{diasTrial} día{diasTrial !== 1 ? 's' : ''}</strong> de prueba gratis</span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/pagar?codigo=AETHERIS" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Con AETHERIS → $15</button>
            </Link>
            <Link href="/pagar" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13, borderColor: 'var(--warning)' }}>Continuar por $20</button>
            </Link>
          </div>
        </div>
      )}

      {/* Alertas */}
      {alertas.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--dark)' }}>Tus alertas</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alertas.map((a: any) => (
              <div key={a.id} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'white', borderRadius: 10, border: `1px solid`, borderColor: a.nivel === 'rojo' ? '#FECACA' : a.nivel === 'verde' ? '#BBF7D0' : '#FEF3C7', alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{a.nivel === 'rojo' ? '🔴' : a.nivel === 'verde' ? '🟢' : '🟡'}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{a.titulo}</div>
                  <div style={{ color: 'var(--gray)', fontSize: 13 }}>{a.mensaje}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Módulos Grid */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--dark)' }}>Tus 13 herramientas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {MODULOS.map(m => (
            <Link key={m.href} href={m.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', transition: 'all .2s', padding: '18px 16px' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)', marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray)', lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
