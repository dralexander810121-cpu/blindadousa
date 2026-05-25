import Link from 'next/link'

export default function TerminosPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem', color: '#fff', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
        Terminos de Uso
      </h1>
      <p style={{ color: '#aaa', lineHeight: 1.8 }}>
        BlindadoUSA es una plataforma educativa. La informacion proporcionada
        es de caracter educativo y no constituye asesoria legal, financiera
        ni fiscal. Al usar esta plataforma aceptas estos terminos.
        Para consultas especificas te recomendamos un profesional licenciado
        en tu jurisdiccion.
      </p>
      <p style={{ color: '#aaa', marginTop: '1rem' }}>
        © 2026 BlindadoUSA · Dr. Alexander Jesus Figueredo Izaguirre<br />
        Houston, Texas · Todos los derechos reservados.
      </p>
      <Link href="/" style={{ color: '#22d3ee', display: 'block', marginTop: '2rem' }}>
        Volver al inicio
      </Link>
    </main>
  )
}
