'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NuevaContrasenaPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Las contrasenas no coinciden'); return }
    if (password.length < 6) { setError('Minimo 6 caracteres'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) setError(updateError.message)
    else router.push('/entrar?reset=ok')
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: 400, padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Nueva contrasena</h1>
        <input
          type="password"
          placeholder="Nueva contrasena (min. 6 caracteres)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#fff', fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="Confirmar contrasena"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#fff', fontSize: '1rem' }}
        />
        {error && <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.85rem', borderRadius: 8, background: '#22d3ee', color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}
        >
          {loading ? 'Guardando...' : 'Guardar nueva contrasena'}
        </button>
      </form>
    </main>
  )
}
