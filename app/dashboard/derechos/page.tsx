'use client'
import { useState } from 'react'
import Link from 'next/link'

const SECCIONES = [
  { id: 'ice', icon: '🚨', title: 'Si ICE llega', color: '#D62828' },
  { id: 'inquilino', icon: '🏠', title: 'Como inquilino', color: '#F77F00' },
  { id: 'hospital', icon: '🏥', title: 'En el hospital', color: '#52B788' },
  { id: 'policia', icon: '👮', title: 'Con la policía', color: '#1B4332' },
]

const CONTENIDO: Record<string, { titulo: string, items: { t: string, d: string }[] }> = {
  ice: {
    titulo: '¿Qué hacer si ICE llega a tu casa o trabajo?',
    items: [
      { t: 'NO abras la puerta', d: 'ICE necesita una orden JUDICIAL firmada por un juez para entrar. Una orden administrativa de ICE NO es suficiente. Pide que la pasen por debajo de la puerta.' },
      { t: 'Tienes derecho a guardar silencio', d: 'Di: "Ejerzo mi derecho a guardar silencio". No respondas preguntas sobre tu estatus, dónde naciste o cómo llegaste.' },
      { t: 'No firmes nada', d: 'No firmes ningún documento sin hablar con un abogado. Firmar podría ser una renuncia a tus derechos.' },
      { t: 'No corras', d: 'Correr puede empeorar la situación. Mantente calmado y repite: "Quiero hablar con un abogado".' },
      { t: 'Memoriza un número de emergencia', d: 'Ten el número de un abogado de inmigración o de una organización de ayuda guardado. En Houston: RAICES Texas 713-481-8100.' },
      { t: 'En el trabajo', d: 'ICE necesita una orden judicial para entrar en áreas no públicas. Tu empleador puede pedirles que muestren la orden.' },
    ]
  },
  inquilino: {
    titulo: 'Tus derechos como inquilino en Texas',
    items: [
      { t: 'Aviso de 24 horas', d: 'El landlord NO puede entrar a tu casa sin avisarte al menos 24 horas antes, excepto en emergencias reales.' },
      { t: 'No pueden cortar servicios', d: 'Es ILEGAL que el landlord te corte la luz, agua o aire acondicionado como forma de presión o castigo.' },
      { t: 'Reparaciones obligatorias', d: 'Si algo se rompe (plomería, calefacción, electricidad), el landlord DEBE repararlo en tiempo razonable. Pídelo POR ESCRITO.' },
      { t: 'Depósito de seguridad', d: 'El landlord tiene 30 días para devolver tu depósito después de que te vayas. Si no lo hace, puedes demandar por el triple.' },
      { t: 'No te pueden echar sin aviso', d: 'El proceso de desalojo legal en Texas requiere aviso escrito de 3 días y una orden del juez. No pueden cambiar la cerradura sin orden.' },
      { t: 'Represalias son ilegales', d: 'Si te quejas de condiciones inseguras, el landlord NO puede subir la renta, amenazarte o echarte como represalia.' },
    ]
  },
  hospital: {
    titulo: 'Tus derechos en el hospital',
    items: [
      { t: 'Intérprete GRATIS', d: 'Por ley federal, TODOS los hospitales que reciben fondos federales (casi todos) DEBEN darte un intérprete gratuito. Pídelo.' },
      { t: 'Emergencia sin importar estatus', d: 'EMTALA: ningún hospital puede negarte atención de emergencia por tu estatus migratorio o capacidad de pago.' },
      { t: 'Charity care (ayuda del hospital)', d: 'Casi todos los hospitales tienen programas de ayuda financiera. Pregunta ANTES de pagar. Pueden reducir o eliminar tu factura.' },
      { t: 'Pide el itemized bill', d: 'Tienes derecho a ver cada cargo desglosado. Muchas veces hay errores o cargos duplicados. Pide la lista detallada.' },
      { t: 'Negocia la factura', d: 'Las facturas médicas son NEGOCIABLES. Llama al departamento de billing y pide un descuento. Típicamente bajan 20-50%.' },
      { t: 'Plan de pagos', d: 'Pide un plan de pagos sin intereses. Los hospitales prefieren eso a mandar tu cuenta a colecciones.' },
    ]
  },
  policia: {
    titulo: 'Tus derechos con la policía',
    items: [
      { t: 'Derecho a guardar silencio (5ta Enmienda)', d: 'Puedes decir: "Ejerzo mi derecho a guardar silencio". No estás obligado a responder preguntas.' },
      { t: 'No consientas registros', d: 'Di calmadamente: "No consiento a ningún registro". La policía necesita una orden o causa probable para registrarte.' },
      { t: 'Pide un abogado', d: 'Si te arrestan, di: "Quiero un abogado" y no digas NADA más hasta que llegue.' },
      { t: 'Puedes filmar a la policía', d: 'Es legal grabar a la policía en público siempre que no interfiereas con su trabajo. Tu celular es tu mejor testigo.' },
      { t: 'Identifícate si te lo piden', d: 'En Texas, si estás detenido o conduciendo, debes dar tu nombre. Pero NO tienes que responder sobre tu estatus migratorio.' },
    ]
  },
}

export default function DerechosPage() {
  const [sec, setSec] = useState('ice')
  const [genLoading, setGenLoading] = useState(false)
  const [carta, setCarta] = useState('')
  const [tipoCarta, setTipoCarta] = useState('landlord')

  async function generarCarta() {
    setGenLoading(true)
    const res = await fetch('/api/ai/asistente', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensaje: `Genera una carta formal de queja en inglés dirigida a mi ${tipoCarta}. La situación es que no están cumpliendo con mis derechos. La carta debe ser profesional, firme, citar las leyes aplicables en Texas, y solicitar una respuesta en 14 días. Incluye fecha, remitente (dejar espacio), destinatario, asunto, cuerpo y firma.`, historial: [] }) })
    const data = await res.json()
    setCarta(data.respuesta)
    setGenLoading(false)
  }

  const contenido = CONTENIDO[sec]

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Mis Derechos 🛡️</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 24 }}>Lo que puedes y no puedes hacer. Tus derechos son tuyos, no importa tu estatus.</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {SECCIONES.map(s => (
          <button key={s.id} onClick={() => setSec(s.id)} style={{ padding: '10px 18px', borderRadius: 8, border: sec === s.id ? `2px solid ${s.color}` : '1px solid #E5E7EB', background: sec === s.id ? s.color + '11' : 'white', fontWeight: sec === s.id ? 700 : 400, fontSize: 14, cursor: 'pointer', color: 'var(--dark)', display: 'flex', gap: 6, alignItems: 'center' }}>{s.icon} {s.title}</button>
        ))}
      </div>

      {/* Content */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: SECCIONES.find(s => s.id === sec)?.color }}>{contenido.titulo}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {contenido.items.map((item, i) => (
          <div key={i} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${SECCIONES.find(s => s.id === sec)?.color}` }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: SECCIONES.find(s => s.id === sec)?.color }}>{item.t}</h3>
            <p style={{ fontSize: 14, color: 'var(--gray)', lineHeight: 1.7 }}>{item.d}</p>
          </div>
        ))}
      </div>

      {/* Generador de cartas */}
      <div className="card">
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>✉️ Generador de cartas de queja con IA</h2>
        <p style={{ color: 'var(--gray)', marginBottom: 16, fontSize: 14 }}>La IA redacta una carta formal en inglés con citaciones legales. Solo imprime y envía.</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          {['landlord','empleador','hospital','colector de deudas','empresa de servicios'].map(t => (
            <button key={t} onClick={() => setTipoCarta(t)} style={{ padding: '8px 16px', borderRadius: 20, border: tipoCarta === t ? '2px solid var(--primary)' : '1px solid #E5E7EB', background: tipoCarta === t ? 'var(--pale-green)' : 'white', fontSize: 13, cursor: 'pointer', fontWeight: tipoCarta === t ? 700 : 400, textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>
        <button onClick={generarCarta} disabled={genLoading} className="btn-green" style={{ fontSize: 15 }}>
          {genLoading ? 'Generando carta...' : `🤖 Generar carta para mi ${tipoCarta} →`}
        </button>
        {carta && (
          <div style={{ marginTop: 16, background: 'var(--light)', borderRadius: 10, padding: 20, fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace' }}>{carta}</div>
        )}
      </div>
    </div>
  )
}
