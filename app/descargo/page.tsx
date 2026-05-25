import Link from 'next/link'

export default function DescargoPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem', color: '#fff', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>
        Descargo de responsabilidad
      </h1>
      <p style={{ color: '#aaa', lineHeight: 1.8 }}>
        El contenido de BlindadoUSA es informativo y educativo. No reemplaza
        asesoria legal, fiscal, migratoria, financiera o contable personalizada.
        Las decisiones que tomes son tu responsabilidad y deben validarse con
        profesionales autorizados en tu estado o jurisdiccion.
      </p>
      <p style={{ color: '#aaa', marginTop: '1rem', lineHeight: 1.8 }}>
        BlindadoUSA no garantiza resultados especificos y no se hace responsable
        por decisiones tomadas exclusivamente con base en este contenido.
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
