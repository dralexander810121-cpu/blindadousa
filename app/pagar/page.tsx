'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PagarPage() {
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [codigoValido, setCodigoValido] = useState<boolean | null>(null)
  const [precio, setPrecio] = useState(20)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cod = params.get('codigo') || ''
    if (cod) { setCodigo(cod); validarCodigo(cod) }
  }, [])

  async function validarCodigo(cod: string) {
    if (!cod) { setCodigoValido(null); setPrecio(20); return }
    const res = await fetch('/api/referidos/validar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ codigo: cod }) })
    const data = await res.json()
    setCodigoValido(data.valido)
    setPrecio(data.valido ? 15 : 20)
  }

  async function handlePago(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const res = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, codigo }) })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(false)
  }

  const inp = { width: '100%', padding: '14px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 16, outline: 'none', fontFamily: 'Inter, sans-serif', marginBottom: 8 }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pale-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/inicio" style={{ textDecoration: 'none' }}>
            <span className="font-bebas" style={{ fontSize: 30, color: 'var(--primary)', letterSpacing: 2 }}>BLINDADO<span style={{ color: 'var(--accent)' }}>USA</span></span>
          </Link>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginTop: 16, color: 'var(--dark)' }}>Acceso completo de por vida</h1>
          <div className="font-bebas" style={{ fontSize: 72, color: 'var(--primary)', lineHeight: 1 }}>${precio}</div>
          <p style={{ color: 'var(--gray)', fontSize: 15 }}>Una sola vez. Para siempre. Los 13 módulos.</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={handlePago}>
            <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>Tu email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required style={inp} />
            <div style={{ marginBottom: 24, marginTop: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)', display: 'block', marginBottom: 6 }}>
                ¿Tienes un código? <span style={{ fontWeight: 400, color: 'var(--gray)' }}>(opcional — ahorra $5)</span>
              </label>
              <input type="text" value={codigo} onChange={e => { setCodigo(e.target.value.toUpperCase()); validarCodigo(e.target.value.toUpperCase()) }}
                placeholder="Ej: AETHERIS o ALEX1247" style={{ ...inp, marginBottom: 4, textTransform: 'uppercase', border: codigoValido === true ? '1.5px solid var(--success)' : codigoValido === false ? '1.5px solid var(--danger)' : '1.5px solid #E5E7EB' }} />
              {codigoValido === true && <p style={{ color: 'var(--success)', fontSize: 13, fontWeight: 600 }}>✓ Código válido — Pagas $15</p>}
              {codigoValido === false && <p style={{ color: 'var(--danger)', fontSize: 13 }}>Código no válido</p>}
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: 17, padding: '16px', justifyContent: 'center', display: 'flex', boxShadow: '0 8px 24px rgba(244,162,97,.35)' }} disabled={loading}>
              {loading ? 'Conectando con Stripe...' : `Pagar $${precio} con tarjeta →`}
            </button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
            {['🔒 Stripe SSL', '✓ Garantía 30 días', '⚡ Acceso inmediato'].map(b => (
              <span key={b} style={{ fontSize: 12, color: 'var(--gray)' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
