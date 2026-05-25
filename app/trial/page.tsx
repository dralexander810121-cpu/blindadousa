'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TrialPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleTrial(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { data, error: authErr } = await supabase.auth.signUp({ email, password: pass, options: { data: { nombre } } })
    if (authErr) { setError('Algo salió mal. Intenta de nuevo.'); setLoading(false); return }
    const res = await fetch('/api/trial/activar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, nombre, userId: data.user?.id }) })
    if (res.ok) { router.push('/onboarding') }
    else { setError('No se pudo activar el trial. Intenta de nuevo.'); setLoading(false) }
  }

  const inp = { width: '100%', padding: '14px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 16, outline: 'none', fontFamily: 'Inter, sans-serif', marginBottom: 16 }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/inicio" style={{ textDecoration: 'none' }}>
            <span className="font-bebas" style={{ fontSize: 30, color: 'white', letterSpacing: 2 }}>BLINDADO<span style={{ color: 'var(--accent)' }}>USA</span></span>
          </Link>
          <div style={{ background: 'rgba(244,162,97,.2)', border: '1px solid var(--accent)', borderRadius: 20, display: 'inline-block', padding: '6px 16px', marginTop: 16, color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
            🎁 3 DÍAS GRATIS — SIN TARJETA
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 16, color: 'white' }}>Empieza tu prueba gratis</h1>
          <p style={{ color: 'rgba(255,255,255,.7)', marginTop: 4 }}>Acceso completo a los 13 módulos. Sin cobros.</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          {error && <div style={{ background: '#FEE2E2', color: 'var(--danger)', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>}
          <form onSubmit={handleTrial}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>Tu nombre</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="María González" required style={inp} />
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>Tu email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required style={inp} />
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>Crea una contraseña</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Mínimo 6 caracteres" minLength={6} required style={{ ...inp, marginBottom: 24 }} />
            <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: 17, padding: '16px', justifyContent: 'center', display: 'flex' }} disabled={loading}>
              {loading ? 'Activando tu prueba...' : '✓ ACTIVAR MI PRUEBA GRATIS →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--gray)' }}>
            Después del trial: $20 de por vida · Código <strong>AETHERIS</strong>: $15
          </p>
          <p style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: 'var(--gray)' }}>
            ¿Ya tienes cuenta? <Link href="/entrar" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
