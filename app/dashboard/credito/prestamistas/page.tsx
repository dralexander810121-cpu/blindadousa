'use client'
import Link from 'next/link'
export default function SubPage() {
  const n = 'prestamistas'
  return (
    <div>
      <Link href="/dashboard/credito" style={{ color:'var(--gray)', fontSize:13, textDecoration:'none' }}>← Mi Crédito</Link>
      <h1 style={{ fontSize:24, fontWeight:700, margin:'12px 0 24px', textTransform:'capitalize' }}>{n}</h1>
      <div className="card" style={{ padding:40, textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🚧</div>
        <p style={{ color:'var(--gray)' }}>Módulo en desarrollo</p>
        <Link href="/dashboard/asistente"><button className="btn-green" style={{ marginTop:16 }}>Pregúntale al Asistente →</button></Link>
      </div>
    </div>
  )
}
