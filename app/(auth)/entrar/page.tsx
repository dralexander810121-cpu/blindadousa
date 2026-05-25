'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EntrarPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if (error) { setError('Email o contraseña incorrectos. Intenta de nuevo.'); setLoading(false); return }
    router.push('/dashboard')
  }

  const inp = { width: '100%', padding: '14px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 16, outline: 'none', fontFamily: 'Inter, sans-serif', marginBottom: 16 }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pale-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/inicio" style={{ textDecoration: 'none' }}>
            <span className="font-bebas" style={{ fontSize: 30, color: 'var(--primary)', letterSpacing: 2 }}>BLINDADO<span style={{ color: 'var(--accent)' }}>USA</span></span>
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginTop: 16, color: 'var(--dark)' }}>Bienvenido de vuelta</h1>
          <p style={{ color: 'var(--gray)', marginTop: 4 }}>Entra a tu cuenta para continuar</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          {error && <div style={{ background: '#FEE2E2', color: 'var(--danger)', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}
          <form onSubmit={handleLogin}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>Tu email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required style={inp} />
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>Contraseña</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Tu contraseña" required style={{ ...inp, marginBottom: 24 }} />
            <button type="submit" className="btn-green" style={{ width: '100%', fontSize: 16 }} disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar a mi cuenta →'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--gray)' }}>
            ¿No tienes cuenta? <Link href="/trial" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Prueba gratis 3 días</Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: 13 }}>
            <Link href="/recuperar" style={{ color: 'var(--gray)', textDecoration: 'none' }}>Olvidé mi contraseña</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
