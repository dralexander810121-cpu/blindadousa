'use client'
import { useState } from 'react'

const PREGUNTAS = [
  { q: '¿Tienes hijos menores de 18?', key: 'hijos' },
  { q: '¿Tu ingreso es menos de $3,000/mes?', key: 'ingresoBajo' },
  { q: '¿Estás embarazada?', key: 'embarazada' },
  { q: '¿Eres ciudadano o residente?', key: 'residente' },
  { q: '¿Pagas más del 30% en renta?', key: 'rentaAlta' },
  { q: '¿Tienes seguro médico?', key: 'seguro' },
  { q: '¿Tienes niños en edad escolar (3-5 años)?', key: 'preescolar' },
  { q: '¿Tienes dificultades para pagar la luz?', key: 'luz' },
]

const PROGRAMAS = [
  { n: 'SNAP (Food Stamps)', icon: '🛒', quien: 'Familias con ingreso bajo', cuanto: '$200-$800/mes en comida', como: 'Aplica en yourtexasbenefits.com', afecta: 'NO afecta tu caso de inmigración en la mayoría de situaciones', req: ['ingresoBajo'] },
  { n: 'Medicaid / CHIP', icon: '🏥', quien: 'Niños, embarazadas, familias de bajo ingreso', cuanto: 'Seguro médico gratis o casi gratis', como: 'Aplica en yourtexasbenefits.com', afecta: 'Medicaid de emergencia NO afecta. CHIP para niños ciudadanos NO afecta.', req: ['hijos', 'ingresoBajo'] },
  { n: 'WIC', icon: '🍼', quien: 'Mujeres embarazadas y niños menores de 5', cuanto: '$50-$100/mes en alimentos específicos', como: 'Visita una clínica WIC. Busca en texaswic.org', afecta: 'NO afecta tu estatus migratorio', req: ['embarazada', 'hijos'] },
  { n: 'Section 8 / Vivienda', icon: '🏠', quien: 'Familias que pagan mucho en renta', cuanto: 'Reduce tu renta al 30% de tu ingreso', como: 'Aplica en tu Housing Authority local', afecta: 'Puede afectar en algunos casos — consulta con un abogado', req: ['rentaAlta', 'ingresoBajo'] },
  { n: 'LIHEAP (ayuda con la luz)', icon: '💡', quien: 'Familias con dificultad para pagar electricidad', cuanto: '$200-$800 al año para la factura de luz', como: 'Contacta a tu Community Action Agency local', afecta: 'NO afecta tu estatus', req: ['luz', 'ingresoBajo'] },
  { n: 'Head Start', icon: '📚', quien: 'Niños de 3-5 años de familias de bajo ingreso', cuanto: 'Educación preescolar GRATIS', como: 'Busca centros Head Start en eclkc.ohs.acf.hhs.gov', afecta: 'NO afecta tu estatus', req: ['preescolar', 'ingresoBajo'] },
]

export default function SubsidiosPage() {
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({})
  const [paso, setPaso] = useState(0)
  const [terminado, setTerminado] = useState(false)

  function responder(key: string, value: boolean) {
    const nuevo = { ...respuestas, [key]: value }
    setRespuestas(nuevo)
    if (paso < PREGUNTAS.length - 1) setPaso(paso + 1)
    else setTerminado(true)
  }

  const programasCalifica = terminado ? PROGRAMAS.filter(p =>
    p.req.some(r => respuestas[r] === true)
  ) : []

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Subsidios y Ayudas 🎁</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Descubre qué ayudas del gobierno puedes recibir</p>

      {!terminado ? (
        <div className="card" style={{ maxWidth: 560, margin: '0 auto', padding: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 8 }}>Pregunta {paso + 1} de {PREGUNTAS.length}</div>
            <div className="progress" style={{ marginBottom: 16 }}>
              <div className="progress-fill" style={{ width: `${((paso + 1) / PREGUNTAS.length) * 100}%`, background: 'var(--primary)' }} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: 'var(--dark)' }}>{PREGUNTAS[paso].q}</h2>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={() => responder(PREGUNTAS[paso].key, true)} className="btn-green" style={{ flex: 1, fontSize: 18, padding: '18px', borderRadius: 12 }}>SÍ</button>
            <button onClick={() => responder(PREGUNTAS[paso].key, false)} className="btn-ghost" style={{ flex: 1, fontSize: 18, padding: '18px', borderRadius: 12 }}>NO</button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div className="font-bebas" style={{ fontSize: 48, color: 'var(--primary)' }}>
              {programasCalifica.length > 0 ? `${programasCalifica.length} PROGRAMAS DISPONIBLES` : 'SIN RESULTADOS'}
            </div>
            <p style={{ color: 'var(--gray)' }}>
              {programasCalifica.length > 0 ? 'Basado en tus respuestas, podrías calificar para estos programas:' : 'Según tus respuestas, no calificas para los programas principales. Consulta con un asesor local.'}
            </p>
            <button onClick={() => { setPaso(0); setTerminado(false); setRespuestas({}) }} className="btn-ghost" style={{ marginTop: 12, fontSize: 13 }}>Volver a hacer el quiz</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(programasCalifica.length > 0 ? programasCalifica : PROGRAMAS).map(p => (
              <div key={p.n} className="card" style={{ padding: 20, borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 32 }}>{p.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 4, color: 'var(--primary)' }}>{p.n}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, marginTop: 10 }}>
                      <div><span style={{ fontWeight: 600 }}>¿Quién califica?</span><p style={{ color: 'var(--gray)', lineHeight: 1.5, marginTop: 2 }}>{p.quien}</p></div>
                      <div><span style={{ fontWeight: 600 }}>¿Cuánto ayuda?</span><p style={{ color: 'var(--gray)', lineHeight: 1.5, marginTop: 2 }}>{p.cuanto}</p></div>
                      <div><span style={{ fontWeight: 600 }}>¿Cómo aplicar?</span><p style={{ color: 'var(--gray)', lineHeight: 1.5, marginTop: 2 }}>{p.como}</p></div>
                      <div><span style={{ fontWeight: 600 }}>¿Afecta mi estatus?</span><p style={{ color: 'var(--gray)', lineHeight: 1.5, marginTop: 2 }}>{p.afecta}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Public Charge */}
          <div className="card" style={{ marginTop: 24, background: '#FEF9C3', border: '1px solid #FDE68A' }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#92400E' }}>⚠️ ¿Usar estas ayudas me afecta para la residencia?</h3>
            <p style={{ fontSize: 14, color: '#78350F', lineHeight: 1.7 }}>
              La regla de "public charge" (carga pública) cambió en 2022. <strong>La mayoría de estos programas NO cuentan</strong> como carga pública: SNAP, Medicaid de emergencia, WIC, CHIP, LIHEAP, Head Start, cupones de vivienda. Lo que SÍ puede contar: usar asistencia monetaria en efectivo (TANF) o Medicaid de largo plazo como adulto sin hijos. <strong>Siempre consulta con un abogado de inmigración antes de aplicar si tienes dudas sobre tu caso específico.</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
