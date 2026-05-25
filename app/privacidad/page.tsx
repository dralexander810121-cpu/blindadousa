import Link from 'next/link'

export default function PrivacidadPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem', color: '#fff', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
        Politica de Privacidad
      </h1>
      <p style={{ color: '#aaa', lineHeight: 1.8 }}>
        En BlindadoUSA protegemos tus datos personales. Solo recopilamos la
        informacion necesaria para ofrecer la plataforma, mejorar la experiencia
        y procesar pagos de forma segura. No vendemos informacion personal a terceros.
      </p>
      <p style={{ color: '#aaa', marginTop: '1rem', lineHeight: 1.8 }}>
        Puedes solicitar acceso, correccion o eliminacion de tus datos escribiendo a
        hola@blindadousa.com.
      </p>
      <p style={{ color: '#aaa', marginTop: '1rem' }}>
        © 2026 BlindadoUSA · Dr. Alexander Jesus Figueredo Izaguirre
      </p>
      <Link href="/" style={{ color: '#22d3ee', display: 'block', marginTop: '2rem' }}>
        Volver al inicio
      </Link>
    </main>
  )
}
