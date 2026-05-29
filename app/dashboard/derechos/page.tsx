'use client'

import { useState } from 'react'
import { DashModuleShell, DashTabs } from '@/components/dashboard/DashModuleShell'
import { CARTA_LABELS } from '@/lib/ia/prompts'

const SECCIONES = [
  { id: 'ice', icon: '🚨', title: 'Si ICE llega' },
  { id: 'inquilino', icon: '🏠', title: 'Como inquilino' },
  { id: 'hospital', icon: '🏥', title: 'En el hospital' },
  { id: 'policia', icon: '👮', title: 'Con la policía' },
]

const CONTENIDO: Record<string, { titulo: string; items: { t: string; d: string }[] }> = {
  ice: {
    titulo: '¿Qué hacer si ICE llega a tu casa o trabajo?',
    items: [
      { t: 'NO abras la puerta', d: 'ICE necesita una orden JUDICIAL firmada por un juez. Pide que la pasen por debajo de la puerta.' },
      { t: 'Derecho al silencio', d: 'Di: "Ejerzo mi derecho a guardar silencio". No respondas sobre estatus migratorio.' },
      { t: 'No firmes nada', d: 'Sin abogado, no firmes documentos.' },
      { t: 'No corras', d: 'Mantén la calma. Repite: "Quiero hablar con un abogado".' },
      { t: 'Número de emergencia', d: 'RAICES Texas Houston: 713-481-8100.' },
      { t: 'En el trabajo', d: 'ICE necesita orden judicial para áreas no públicas.' },
    ],
  },
  inquilino: {
    titulo: 'Tus derechos como inquilino en Texas',
    items: [
      { t: 'Aviso de 24 horas', d: 'El landlord debe avisar antes de entrar (salvo emergencia real).' },
      { t: 'No pueden cortar servicios', d: 'Es ilegal cortar luz, agua o AC como presión.' },
      { t: 'Reparaciones', d: 'Pídelas por escrito. El landlord debe reparar en tiempo razonable.' },
      { t: 'Depósito', d: '30 días para devolverlo. Si no, puedes demandar por el triple.' },
      { t: 'Desalojo', d: 'Requiere aviso escrito y orden del juez.' },
      { t: 'Represalias', d: 'Quejarte no puede ser motivo para subir renta o echarte.' },
    ],
  },
  hospital: {
    titulo: 'Tus derechos en el hospital',
    items: [
      { t: 'Intérprete gratis', d: 'Hospitales con fondos federales deben darte intérprete.' },
      { t: 'Emergencia', d: 'No pueden negarte atención de emergencia por estatus o pago.' },
      { t: 'Charity care', d: 'Pregunta por ayuda financiera antes de pagar.' },
      { t: 'Itemized bill', d: 'Pide desglose de cargos — suele haber errores.' },
      { t: 'Negociar', d: 'Facturas médicas son negociables (20–50% menos).' },
      { t: 'Plan de pagos', d: 'Sin intereses si negocias con billing.' },
    ],
  },
  policia: {
    titulo: 'Tus derechos con la policía',
    items: [
      { t: 'Silencio', d: '"Ejerzo mi derecho a guardar silencio".' },
      { t: 'No consentir registros', d: '"No consiento ningún registro".' },
      { t: 'Abogado', d: 'Si te arrestan: "Quiero un abogado".' },
      { t: 'Grabar', d: 'Es legal grabar en público si no interfiere.' },
      { t: 'Identificación', d: 'En Texas puedes dar tu nombre si estás detenido.' },
    ],
  },
}

const TIPO_CARTA_MAP: Record<string, string> = {
  landlord: 'reclamo_landlord',
  empleador: 'carta_empleador',
  hospital: 'queja_factura_medica',
  'colector de deudas': 'queja_agencia_cobros',
  'empresa de servicios': 'queja_agencia_cobros',
}

export default function DerechosPage() {
  const [sec, setSec] = useState('ice')
  const [genLoading, setGenLoading] = useState(false)
  const [carta, setCarta] = useState('')
  const [tipoCarta, setTipoCarta] = useState('landlord')

  async function generarCarta() {
    setGenLoading(true)
    setCarta('')
    const tipo = TIPO_CARTA_MAP[tipoCarta] || 'reclamo_landlord'
    try {
      const res = await fetch('/api/ia/carta-legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo,
          destinatario: `Mi ${tipoCarta}`,
          detalle: `Queja formal por incumplimiento de mis derechos como consumidor/inquilino/paciente en Texas. Solicito respuesta en 14 días.`,
        }),
      })
      const data = await res.json()
      if (res.ok && data.carta) {
        setCarta(data.carta.cuerpo_es || data.carta.cuerpo)
      } else {
        setCarta(data.error || 'No se pudo generar')
      }
    } catch {
      setCarta('Error de conexión')
    } finally {
      setGenLoading(false)
    }
  }

  const contenido = CONTENIDO[sec]

  return (
    <DashModuleShell
      title="Mis derechos"
      subtitle="Lo que puedes y no puedes hacer. Tus derechos son tuyos, sin importar tu estatus."
    >
      <DashTabs
        tabs={SECCIONES.map((s) => ({ id: s.id, label: `${s.icon} ${s.title}` }))}
        active={sec}
        onChange={setSec}
      />

      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{contenido.titulo}</h2>
      <div className="flex flex-col gap-3 mb-8 max-w-3xl">
        {contenido.items.map((item, i) => (
          <div key={i} className="card-3d dash-panel border-l-4 border-l-[var(--blue-400)] py-4">
            <h3 className="font-bold text-sm text-[var(--blue-300)] mb-1">{item.t}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.d}</p>
          </div>
        ))}
      </div>

      <div className="card-3d dash-panel max-w-3xl">
        <h2 className="dash-panel-title mb-2">Generador de cartas con IA</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Carta formal bilingüe ({CARTA_LABELS[TIPO_CARTA_MAP[tipoCarta] || 'reclamo_landlord']}). Revísala antes de enviar.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(TIPO_CARTA_MAP).map((t) => (
            <button
              key={t}
              type="button"
              className={`dash-tab-btn capitalize ${tipoCarta === t ? 'dash-tab-btn--active' : ''}`}
              onClick={() => setTipoCarta(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button type="button" className="btn-3d-gold !min-h-[44px] !text-sm" disabled={genLoading} onClick={generarCarta}>
          {genLoading ? 'Generando…' : `Generar carta para ${tipoCarta} →`}
        </button>
        {carta && (
          <pre className="mt-4 text-xs whitespace-pre-wrap bg-[var(--void)] p-4 rounded-lg border border-white/5 max-h-80 overflow-y-auto text-[var(--text-secondary)]">
            {carta}
          </pre>
        )}
      </div>
    </DashModuleShell>
  )
}
