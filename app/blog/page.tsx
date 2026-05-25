import Link from 'next/link'

export default function BlogPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Blog BlindadoUSA</h1>
        <p style={{ color: '#aaa', lineHeight: 1.8 }}>
          Seccion en actualizacion. Aqui publicaremos guias, alertas legales y estrategias
          financieras para hispanos en Estados Unidos.
        </p>
        <Link href="/" style={{ color: '#22d3ee', display: 'inline-block', marginTop: '2rem' }}>
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
