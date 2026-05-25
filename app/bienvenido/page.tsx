import Link from 'next/link'

export default function BienvenidoPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Bienvenido a BlindadoUSA</h1>
      <p style={{ color: '#aaa', maxWidth: 500, fontSize: '1.1rem' }}>
        Tu prueba gratuita de 3 dias esta activa.<br />
        Revisa tu email para confirmar tu cuenta si es necesario.
      </p>
      <Link href="/dashboard" style={{ padding: '0.85rem 2rem', background: '#22d3ee', color: '#000', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '1rem' }}>
        Entrar a la plataforma
      </Link>
    </main>
  )
}
