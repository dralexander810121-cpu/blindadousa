'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ExitoPage() {
  const [codigo, setCodigo] = useState('')
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) supabase.from('usuarios').select('mi_codigo').eq('auth_user_id', user.id).single()
        .then(({ data }) => setCodigo(data?.mi_codigo || ''))
    })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--pale-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>¡Ya estás Blindado de por vida!</h1>
        <p style={{ color: 'var(--gray)', marginBottom: 32, fontSize: 16 }}>Acceso completo a los 13 módulos. Para siempre.</p>
        {codigo && (
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <p style={{ color: 'var(--gray)', fontSize: 13, marginBottom: 4 }}>Tu código de referido</p>
            <div className="font-bebas" style={{ fontSize: 40, color: 'var(--primary)', letterSpacing: 3 }}>{codigo}</div>
            <p style={{ fontSize: 13, color: 'var(--gray)', marginTop: 8 }}>Compártelo. Tus amigos pagan $15 con él.</p>
          </div>
        )}
        <Link href="/dashboard">
          <button className="btn-green" style={{ fontSize: 17, padding: '16px 48px', width: '100%', justifyContent: 'center', display: 'flex' }}>Ir a mi panel →</button>
        </Link>
      </div>
    </div>
  )
}
