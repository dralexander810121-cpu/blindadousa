import Link from 'next/link'

export default function DirectorioPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Directorio</h1>
        <p style={{ color: '#aaa', lineHeight: 1.8 }}>
          Directorio de recursos y servicios para la comunidad hispana en construccion.
          Esta pagina se deja activa para evitar errores 404 en produccion.
        </p>
        <Link href="/" style={{ color: '#22d3ee', display: 'inline-block', marginTop: '2rem' }}>
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
