'use client'

import { useEffect, useState } from 'react'

type ActionItem = {
  title: string
  detail: string
  href: string
  cta: string
  priority: 'alta' | 'media' | 'baja'
}

type PlanIA = {
  resumen: string
  pasos: { titulo: string; detalle: string; modulo: string; prioridad: 'alta' | 'media' | 'baja' }[]
}

function pickActions(input: {
  score: number | null
  alertasActivas: number
  cuentasConectadas: number
  deudaTarjetas: number
}): ActionItem[] {
  const out: ActionItem[] = []

  if (input.cuentasConectadas === 0) {
    out.push({
      title: 'Conecta tus cuentas bancarias',
      detail: 'Sin cuentas conectadas la IA no puede detectar pagos, cortes ni cargos sospechosos.',
      href: '/dashboard',
      cta: 'Conectar ahora',
      priority: 'alta',
    })
  }

  if ((input.score ?? 0) > 0 && (input.score ?? 0) < 670) {
    out.push({
      title: 'Genera plan para subir tu score',
      detail: `Tu score actual (${input.score}) está por debajo de la zona "buena".`,
      href: '/dashboard/credito',
      cta: 'Abrir módulo crédito',
      priority: 'alta',
    })
  }

  if (input.alertasActivas > 0) {
    out.push({
      title: 'Revisa alertas críticas',
      detail: `Tienes ${input.alertasActivas} alerta(s) activa(s). Prioriza pagos y cargos inusuales hoy.`,
      href: '/dashboard',
      cta: 'Ver alertas',
      priority: 'alta',
    })
  }

  if (input.deudaTarjetas > 0) {
    out.push({
      title: 'Optimiza pago de tarjetas',
      detail: 'Reduce utilización antes del corte para proteger y mejorar tu score.',
      href: '/dashboard/credito/tarjetas',
      cta: 'Ver tarjetas',
      priority: 'media',
    })
  }

  if (out.length === 0) {
    out.push({
      title: 'Mantén tu sistema al día',
      detail: 'No hay urgencias detectadas. Revisa tu panel cada semana y actualiza objetivos.',
      href: '/dashboard/asistente',
      cta: 'Abrir IA Maestra',
      priority: 'baja',
    })
  }

  return out.slice(0, 3)
}

export function ActionPlanCard(props: {
  score: number | null
  alertasActivas: number
  cuentasConectadas: number
  deudaTarjetas: number
}) {
  const fallback = pickActions(props)
  const [planIA, setPlanIA] = useState<PlanIA | null>(null)

  useEffect(() => {
    let cancel = false
    fetch('/api/onboarding/plan')
      .then((r) => r.json())
      .then((d) => {
        if (!cancel && d.plan?.pasos?.length) {
          setPlanIA({ resumen: d.plan.resumen || '', pasos: d.plan.pasos })
        }
      })
      .catch(() => {})
    return () => {
      cancel = true
    }
  }, [])

  // Plan generado por IA según la meta del usuario (preferido sobre reglas)
  const actions: ActionItem[] = planIA
    ? planIA.pasos.map((p) => ({
        title: p.titulo,
        detail: p.detalle,
        href: p.modulo,
        cta: 'Empezar',
        priority: p.prioridad,
      }))
    : fallback

  return (
    <section className="card-3d dash-panel">
      <h3 className="dash-panel-title mb-2">Tu siguiente paso HOY</h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        {planIA?.resumen
          ? `🤖 ${planIA.resumen}`
          : 'Recomendaciones automáticas basadas en tu perfil actual.'}
      </p>
      <div className="space-y-3">
        {actions.map((a) => {
          return (
            <article key={a.title} className={`dash-action-item dash-action-item--${a.priority}`}>
              <p className="dash-action-priority">Prioridad {a.priority}</p>
              <p className="dash-action-title">{a.title}</p>
              <p className="dash-action-detail">{a.detail}</p>
              <a href={a.href} className="dash-action-link">
                {a.cta} →
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

