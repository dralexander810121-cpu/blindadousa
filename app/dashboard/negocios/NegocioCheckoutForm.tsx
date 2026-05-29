'use client'

import { useState } from 'react'
import { CATEGORIAS_DIRECTORIO } from '@/lib/directorio/seed'

const PLANES = [
  { id: 'basico', name: 'Básico', price: '$299', desc: 'Listing en tu categoría y perfil verificado.', featured: false },
  {
    id: 'premium',
    name: 'Premium',
    price: '$500',
    desc: 'Destacado + recomendaciones de la IA Maestra.',
    featured: true,
  },
] as const

export function NegocioCheckoutForm() {
  const [plan, setPlan] = useState<'basico' | 'premium'>('premium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    categoria: 'abogado',
    ciudad: 'Houston',
    descripcion: '',
  })

  async function pagar() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout-negocio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      if (data.url) window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <div className="grid sm:grid-cols-2 gap-3">
        {PLANES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlan(p.id)}
            className={`card-3d dash-panel text-left p-4 border ${
              plan === p.id ? 'border-[var(--gold-400)]' : 'border-white/8'
            }`}
          >
            {p.featured && (
              <span className="text-[10px] uppercase text-[var(--gold-400)] font-bold">Recomendado</span>
            )}
            <p className="font-bold text-[var(--text-primary)] mt-1">
              {p.name} <span className="text-[var(--gold-400)]">{p.price}</span>
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{p.desc}</p>
          </button>
        ))}
      </div>

      <div className="card-3d dash-panel space-y-3">
        <h2 className="dash-panel-title">Datos del negocio</h2>
        <input
          className="dash-input"
          placeholder="Nombre del negocio *"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          className="dash-input"
          type="email"
          placeholder="Email de contacto *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="dash-input"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
        <select
          className="dash-input"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        >
          {CATEGORIAS_DIRECTORIO.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.label}
            </option>
          ))}
        </select>
        <input
          className="dash-input"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
        />
        <textarea
          className="dash-input min-h-[80px]"
          placeholder="Descripción breve (qué ofreces, idiomas, ITIN…)"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="button" className="btn-3d-gold w-full !min-h-[48px]" disabled={loading} onClick={pagar}>
        {loading ? 'Redirigiendo a Stripe…' : `Pagar ${plan === 'premium' ? '$500' : '$299'} y publicar →`}
      </button>
      <p className="text-xs text-[var(--text-muted)]">
        Tras el pago revisamos tu listing (24–48 h) y apareces en el directorio verificado.
      </p>
    </div>
  )
}
