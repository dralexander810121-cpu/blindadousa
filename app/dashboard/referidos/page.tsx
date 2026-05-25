'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ReferidosPage() {
  const [codigo, setCodigo] = useState('')
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) supabase.from('usuarios').select('mi_codigo,referidos_count').eq('auth_user_id', user.id).single()
        .then(({ data }) => { setCodigo(data?.mi_codigo || ''); setCount(data?.referidos_count || 0) })
    })
  }, [])

  const url = `https://blindadousa.com/pagar?codigo=${codigo}`
  const msgWA = `Mira esta página que me está ayudando MUCHO.\nExplica todo para hispanos en USA: crédito, casa, carro, taxes, tus derechos. En español y sin mentiras.\nPuedes probarla GRATIS 3 días. Y si quieres quedarte, con mi código ${codigo} pagas $15 en vez de $20.\nEntra aquí: blindadousa.com`

  function copiar() {
    navigator.clipboard.writeText(codigo)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ maxWidth: 580 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Mis Referidos 📤</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 28 }}>Comparte tu código. Tus amigos pagan $15 en vez de $20.</p>

      <div className="card" style={{ padding: 32, marginBottom: 20, textAlign: 'center' }}>
        <p style={{ color: 'var(--gray)', fontSize: 13, marginBottom: 8 }}>TU CÓDIGO PERSONAL</p>
        <div className="font-bebas" style={{ fontSize: 52, color: 'var(--primary)', letterSpacing: 4, marginBottom: 16 }}>{codigo || '——'}</div>
        <button onClick={copiar} className="btn-green" style={{ marginBottom: 12 }}>
          {copied ? '✓ ¡Copiado!' : '📋 Copiar mi código'}
        </button>
        <p style={{ color: 'var(--gray)', fontSize: 13 }}>Con este código tus amigos pagan <strong>$15</strong> en vez de $20</p>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 20, background: 'var(--pale-green)' }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📱 Comparte por WhatsApp</h3>
        <p style={{ fontSize: 13, color: 'var(--dark)', lineHeight: 1.7, marginBottom: 16, whiteSpace: 'pre-line', background: 'white', padding: 16, borderRadius: 10 }}>{msgWA}</p>
        <a href={`https://wa.me/?text=${encodeURIComponent(msgWA)}`} target="_blank" rel="noopener noreferrer">
          <button className="btn-green" style={{ width: '100%', background: '#25D366' }}>Compartir en WhatsApp →</button>
        </a>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📊 Tus estadísticas</h3>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div className="font-bebas" style={{ fontSize: 48, color: 'var(--primary)' }}>{count}</div>
            <div style={{ color: 'var(--gray)', fontSize: 13 }}>personas referidas</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div className="font-bebas" style={{ fontSize: 48, color: 'var(--success)' }}>{count >= 10 ? '🏆' : `${count}/10`}</div>
            <div style={{ color: 'var(--gray)', fontSize: 13 }}>{count >= 10 ? 'Embajador Blindado!' : 'para Embajador Blindado'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
