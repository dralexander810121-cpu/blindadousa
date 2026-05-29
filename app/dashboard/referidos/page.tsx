'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'

type ReferidoRow = {
  id: string
  referido_nombre: string | null
  precio_pagado: number | null
  monto_comision: number | null
  transferencia_estado: string | null
  error_transferencia: string | null
  created_at: string
}

const ESTADO_LABEL: Record<string, string> = {
  completada: 'Depositado (ACH)',
  programado: 'Acreditado — conecta banco',
  procesando: 'Procesando ACH…',
  pendiente: 'Pendiente',
  sin_cuenta: 'Conecta tu banco',
  error: 'Revisar',
}

function estadoColor(estado: string | null) {
  if (estado === 'completada') return 'text-[var(--emerald-400)]'
  if (estado === 'sin_cuenta' || estado === 'error') return 'text-amber-400'
  return 'text-[var(--text-muted)]'
}

export default function ReferidosPage() {
  const [codigo, setCodigo] = useState('')
  const [count, setCount] = useState(0)
  const [ganancias, setGanancias] = useState(0)
  const [historial, setHistorial] = useState<ReferidoRow[]>([])
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/referidos')
      const data = await res.json()
      if (res.ok) {
        setCodigo(data.codigo || '')
        setCount(data.referidos_count || 0)
        setGanancias(Number(data.ganancias_referidos || 0))
        setHistorial(data.historial || [])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const msgWA = `BlindadoUSA te ayuda con crédito, casa, carro, taxes y derechos — todo en español.\n3 días gratis. Con mi código ${codigo} pagas $15 en vez de $20.\nhttps://blindadousa.com/pagar?codigo=${codigo}`

  function copiar() {
    navigator.clipboard.writeText(codigo)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashModuleShell
      title="Mis referidos"
      subtitle="Gana $5 por cada amigo que paga. El depósito va a tu cuenta bancaria (ACH)."
    >
      <div className="card-3d dash-panel max-w-md text-center py-8 mb-6">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Tu código personal</p>
        <p className="font-display text-5xl text-[var(--cyan-bright)] tracking-wide mb-4">{codigo || '——'}</p>
        <button type="button" className="btn-3d-gold !min-h-[44px] !text-sm mb-2" onClick={copiar} disabled={!codigo}>
          {copied ? '✓ Copiado' : 'Copiar código'}
        </button>
        <p className="text-xs text-[var(--text-muted)]">Tus amigos pagan $15 con tu código (tú ganas $5)</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mb-6">
        <div className="card-3d dash-panel text-center py-4">
          <p className="font-display text-4xl text-[var(--blue-300)]">{count}</p>
          <p className="text-xs text-[var(--text-muted)]">referidos</p>
        </div>
        <div className="card-3d dash-panel text-center py-4">
          <p className="font-display text-4xl text-[var(--emerald-400)]">${ganancias.toFixed(0)}</p>
          <p className="text-xs text-[var(--text-muted)]">ganado total</p>
        </div>
        <div className="card-3d dash-panel text-center py-4">
          <p className="font-display text-4xl text-[var(--gold-400)]">{count >= 10 ? '🏆' : `${count}/10`}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {count >= 10 ? 'Embajador' : 'hacia Embajador'}
          </p>
        </div>
      </div>

      <div className="card-3d dash-panel max-w-md mb-6">
        <h2 className="dash-panel-title mb-2">Recibe tus $5</h2>
        <p className="text-sm text-[var(--text-muted)] mb-3">
          Conecta tu cuenta de cheques con Plaid para depositar comisiones automáticamente.
        </p>
        <Link href="/dashboard/credito/tarjetas" className="btn-3d-blue inline-flex !min-h-[40px] !text-xs">
          Conectar banco →
        </Link>
      </div>

      <div className="card-3d dash-panel max-w-md mb-6">
        <h2 className="dash-panel-title mb-3">Compartir por WhatsApp</h2>
        <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap bg-[var(--void)] p-4 rounded-lg border border-white/5 mb-4">
          {msgWA}
        </pre>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(msgWA)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-blue w-full inline-flex justify-center !min-h-[44px] !text-sm !bg-[#25D366] !border-[#128C7E]"
        >
          Compartir en WhatsApp →
        </a>
      </div>

      <div className="card-3d dash-panel max-w-2xl">
        <h2 className="dash-panel-title mb-4">Historial de depósitos</h2>
        {loading && <p className="text-sm text-[var(--text-muted)]">Cargando…</p>}
        {!loading && historial.length === 0 && (
          <p className="text-sm text-[var(--text-muted)]">Aún no tienes referidos que hayan pagado.</p>
        )}
        <ul className="space-y-3">
          {historial.map((r) => (
            <li
              key={r.id}
              className="flex flex-wrap justify-between gap-2 py-3 border-b border-white/5 last:border-0"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {r.referido_nombre || 'Referido'}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {new Date(r.created_at).toLocaleDateString('es-US')} · pagó ${r.precio_pagado ?? '—'}
                </p>
                {r.error_transferencia && r.transferencia_estado !== 'completada' && (
                  <p className="text-xs text-amber-400/90 mt-1">{r.error_transferencia}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[var(--gold-400)]">
                  +${Number(r.monto_comision ?? 5).toFixed(0)}
                </p>
                <p className={`text-xs ${estadoColor(r.transferencia_estado)}`}>
                  {ESTADO_LABEL[r.transferencia_estado || 'pendiente'] || r.transferencia_estado}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashModuleShell>
  )
}
