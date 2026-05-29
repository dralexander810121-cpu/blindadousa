'use client'

import { useEffect, useState } from 'react'

export function WhatsappSettings() {
  const [telefono, setTelefono] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [configured, setConfigured] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/whatsapp/opt-in')
      .then((r) => r.json())
      .then((d) => {
        setConfigured(Boolean(d.configured))
        setTelefono(d.telefono_whatsapp?.replace('+1', '') ?? '')
        setOptIn(Boolean(d.whatsapp_opt_in))
      })
      .finally(() => setLoading(false))
  }, [])

  async function guardar() {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch('/api/whatsapp/opt-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp_opt_in: optIn,
          telefono_whatsapp: telefono ? `+1${telefono.replace(/\D/g, '')}` : null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setMsg('Preferencias guardadas.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-[var(--text-muted)]">Cargando…</p>

  return (
    <div className="card-3d dash-panel max-w-lg">
      <h2 className="dash-panel-title mb-2">Alertas por WhatsApp</h2>
      <p className="text-sm text-[var(--text-muted)] mb-4">
        Recibe avisos críticos de pagos y utilización alta (requiere número verificado en Twilio sandbox o
        producción).
      </p>

      {!configured && (
        <p className="text-xs text-amber-400/90 mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          Twilio no está configurado en el servidor. Añade TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN y
          TWILIO_WHATSAPP_FROM en .env.local.
        </p>
      )}

      <label className="flex items-center gap-3 text-sm mb-4 cursor-pointer">
        <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="w-4 h-4" />
        Quiero alertas por WhatsApp
      </label>

      {optIn && (
        <div className="mb-4">
          <label className="text-xs text-[var(--text-muted)] block mb-2">Tu celular (USA)</label>
          <div className="flex gap-2">
            <span className="px-3 py-2 rounded-lg bg-[var(--void)] border border-white/10 text-sm">+1</span>
            <input
              className="flex-1 px-3 py-2 rounded-lg bg-[var(--void)] border border-white/10 text-sm text-[var(--text-primary)]"
              placeholder="7135551234"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </div>
        </div>
      )}

      <button type="button" className="btn-3d-blue !min-h-[44px] !text-sm" disabled={saving} onClick={guardar}>
        {saving ? 'Guardando…' : 'Guardar preferencias'}
      </button>
      {msg && <p className="text-sm mt-3 text-[var(--emerald-400)]">{msg}</p>}
    </div>
  )
}
