'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nueva-contrasena`,
    })
    if (resetError) setError(resetError.message)
    else setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', flexDirection: 'column', gap: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Revisa tu email</h1>
      <p style={{ color: '#aaa', textAlign: 'center', maxWidth: 400 }}>
        Te enviamos un enlace para restablecer tu contrasena.<br />
        Revisa tambien la carpeta de spam.
      </p>
      <Link href="/entrar" style={{ color: '#22d3ee', textDecoration: 'underline' }}>
        Volver al login
      </Link>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: 400, padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Recuperar contrasena
        </h1>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
          Ingresa tu email y te enviamos un enlace para restablecer tu contrasena.
        </p>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#fff', fontSize: '1rem' }}
        />
        {error && <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.85rem', borderRadius: 8, background: '#22d3ee', color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem' }}
        >
          {loading ? 'Enviando...' : 'Enviar enlace de recuperacion'}
        </button>
        <Link href="/entrar" style={{ color: '#aaa', fontSize: '0.85rem', textAlign: 'center' }}>
          Volver al login
        </Link>
      </form>
    </main>
  )
}
