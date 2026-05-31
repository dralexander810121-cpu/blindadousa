'use client'
import { useState } from 'react'
import { DashDisplay, DashPanel } from '@/components/dashboard/DashPanel'

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
  {
    n: 'SNAP (Food Stamps)',
    icon: '🛒',
    quien: 'Familias con ingreso bajo',
    cuanto: '$200–$800/mes en comida',
    como: 'Aplica en yourtexasbenefits.com',
    afecta: 'NO afecta tu caso de inmigración en la mayoría de situaciones',
    req: ['ingresoBajo'],
  },
  {
    n: 'Medicaid / CHIP',
    icon: '🏥',
    quien: 'Niños, embarazadas, familias de bajo ingreso',
    cuanto: 'Seguro médico gratis o casi gratis',
    como: 'Aplica en yourtexasbenefits.com',
    afecta: 'Medicaid de emergencia NO afecta. CHIP para niños ciudadanos NO afecta.',
    req: ['hijos', 'ingresoBajo'],
  },
  {
    n: 'WIC',
    icon: '🍼',
    quien: 'Mujeres embarazadas y niños menores de 5',
    cuanto: '$50–$100/mes en alimentos específicos',
    como: 'Visita una clínica WIC. Busca en texaswic.org',
    afecta: 'NO afecta tu estatus migratorio',
    req: ['embarazada', 'hijos'],
  },
  {
    n: 'Section 8 / Vivienda',
    icon: '🏠',
    quien: 'Familias que pagan mucho en renta',
    cuanto: 'Reduce tu renta al 30% de tu ingreso',
    como: 'Aplica en tu Housing Authority local',
    afecta: 'Puede afectar en algunos casos — consulta con un abogado',
    req: ['rentaAlta', 'ingresoBajo'],
  },
  {
    n: 'LIHEAP (ayuda con la luz)',
    icon: '💡',
    quien: 'Familias con dificultad para pagar electricidad',
    cuanto: '$200–$800 al año para la factura de luz',
    como: 'Contacta a tu Community Action Agency local',
    afecta: 'NO afecta tu estatus',
    req: ['luz', 'ingresoBajo'],
  },
  {
    n: 'Head Start',
    icon: '📚',
    quien: 'Niños de 3–5 años de familias de bajo ingreso',
    cuanto: 'Educación preescolar GRATIS',
    como: 'Busca centros Head Start en eclkc.ohs.acf.hhs.gov',
    afecta: 'NO afecta tu estatus',
    req: ['preescolar', 'ingresoBajo'],
  },
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

  const programasCalifica = terminado
    ? PROGRAMAS.filter((p) => p.req.some((r) => respuestas[r] === true))
    : []

  return (
    <div className="dash-page dash-page--banana">
      <h1 className="dash-page-title">Subsidios y ayudas</h1>
      <p className="dash-page-date mb-6">Descubre qué ayudas del gobierno puedes recibir</p>

      {!terminado ? (
        <DashPanel className="max-w-lg mx-auto">
          <p className="text-sm text-[var(--text-muted)] text-center mb-2">
            Pregunta {paso + 1} de {PREGUNTAS.length}
          </p>
          <div className="progress mb-4">
            <div
              className="progress-fill"
              style={{ width: `${((paso + 1) / PREGUNTAS.length) * 100}%` }}
            />
          </div>
          <h2 className="text-center !text-lg mb-6">{PREGUNTAS[paso].q}</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => responder(PREGUNTAS[paso].key, true)}
              className="btn-3d-gold flex-1 !min-h-[52px]"
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => responder(PREGUNTAS[paso].key, false)}
              className="btn-glass flex-1 !min-h-[52px] text-base font-semibold"
            >
              No
            </button>
          </div>
        </DashPanel>
      ) : (
        <div>
          <div className="text-center mb-6">
            <DashDisplay
              value={
                programasCalifica.length > 0
                  ? `${programasCalifica.length} PROGRAMAS`
                  : 'SIN RESULTADOS'
              }
              tone={programasCalifica.length > 0 ? 'positive' : 'neutral'}
              className="!text-4xl"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {programasCalifica.length > 0
                ? 'Basado en tus respuestas, podrías calificar para estos programas:'
                : 'Según tus respuestas, no calificas para los programas principales. Consulta con un asesor local.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setPaso(0)
                setTerminado(false)
                setRespuestas({})
              }}
              className="btn-glass mt-3 text-sm"
            >
              Volver a hacer el quiz
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {programasCalifica.map((p) => (
              <DashPanel key={p.n} className="border-l-4 border-l-[var(--cyan-bright)]">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl" aria-hidden>
                    {p.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="!text-[var(--cyan-bright)] !mb-3">{p.n}</h3>
                    <div className="dash-grid-2 gap-3 text-sm">
                      <div>
                        <p className="font-semibold text-[var(--text-primary)] mb-1">
                          ¿Quién califica?
                        </p>
                        <p className="m-0">{p.quien}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)] mb-1">
                          ¿Cuánto ayuda?
                        </p>
                        <p className="m-0">{p.cuanto}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)] mb-1">
                          ¿Cómo aplicar?
                        </p>
                        <p className="m-0">{p.como}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)] mb-1">
                          ¿Afecta mi estatus?
                        </p>
                        <p className="m-0">{p.afecta}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DashPanel>
            ))}
          </div>

          <DashPanel tone="warn" className="mt-6">
            <h3>¿Usar estas ayudas me afecta para la residencia?</h3>
            <p className="m-0">
              La regla de &quot;public charge&quot; (carga pública) cambió en 2022.{' '}
              <strong className="text-[var(--text-primary)]">
                La mayoría de estos programas NO cuentan
              </strong>{' '}
              como carga pública: SNAP, Medicaid de emergencia, WIC, CHIP, LIHEAP, Head Start,
              cupones de vivienda. Lo que SÍ puede contar: usar asistencia monetaria en efectivo
              (TANF) o Medicaid de largo plazo como adulto sin hijos.{' '}
              <strong className="text-[var(--text-primary)]">
                Siempre consulta con un abogado de inmigración antes de aplicar si tienes dudas
                sobre tu caso específico.
              </strong>
            </p>
          </DashPanel>
        </div>
      )}
    </div>
  )
}
