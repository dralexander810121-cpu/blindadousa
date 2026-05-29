'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'

type NegocioPendiente = {
  id: string
  nombre: string
  categoria: string | null
  ciudad: string | null
  email: string | null
  telefono: string | null
  plan: string | null
  featured: boolean
  created_at: string
}

export default function AdminDirectorioPage() {
  const [items, setItems] = useState<NegocioPendiente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/directorio')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Sin acceso')
      setItems(data.pendientes || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function verificar(id: string) {
    setBusyId(id)
    try {
      const res = await fetch('/api/admin/directorio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, verificado: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setItems((prev) => prev.filter((n) => n.id !== id))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo verificar')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <DashModuleShell
      title="Admin — Directorio"
      subtitle="Aprueba listings B2B pagados antes de publicarlos en /directorio"
    >
      <Link href="/dashboard" className="text-sm text-[var(--text-muted)] hover:text-[var(--blue-300)] mb-4 inline-block">
        ← Dashboard
      </Link>

      {error && (
        <p className="text-sm text-red-400 mb-4">
          {error}
          {error.includes('autorizado') && (
            <span className="block text-xs mt-1 text-[var(--text-muted)]">
              Agrega tu email en ADMIN_EMAILS en Vercel.
            </span>
          )}
        </p>
      )}

      {loading && <p className="text-sm text-[var(--text-muted)]">Cargando pendientes…</p>}

      {!loading && !items.length && !error && (
        <p className="text-sm text-[var(--text-muted)]">No hay negocios pendientes de verificación.</p>
      )}

      <div className="space-y-3 max-w-2xl">
        {items.map((n) => (
          <div key={n.id} className="card-3d dash-panel p-4">
            <div className="flex flex-wrap justify-between gap-2 mb-2">
              <h2 className="font-bold text-[var(--text-primary)]">{n.nombre}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--gold-400)]/20 text-[var(--gold-400)] uppercase">
                {n.plan || 'basico'}
                {n.featured ? ' · destacado' : ''}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-2">
              {n.categoria} · {n.ciudad} · {new Date(n.created_at).toLocaleDateString('es-US')}
            </p>
            {(n.email || n.telefono) && (
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                {n.email}
                {n.email && n.telefono ? ' · ' : ''}
                {n.telefono}
              </p>
            )}
            <button
              type="button"
              className="btn-3d-gold !min-h-[40px] !text-xs"
              disabled={busyId === n.id}
              onClick={() => verificar(n.id)}
            >
              {busyId === n.id ? 'Guardando…' : 'Marcar verificado y publicar'}
            </button>
          </div>
        ))}
      </div>
    </DashModuleShell>
  )
}
