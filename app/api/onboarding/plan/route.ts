import { z } from 'zod'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { createAdmin } from '@/lib/supabase/server'
import { askLlm, hasLlmKey, llmMissingMessage } from '@/lib/llm'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Paso = { titulo: string; detalle: string; modulo: string; prioridad: 'alta' | 'media' | 'baja' }

const MODULOS_VALIDOS = [
  '/dashboard/credito',
  '/dashboard/credito/disputas',
  '/dashboard/credito/simulador',
  '/dashboard/credito/estrategia',
  '/dashboard/credito/tarjetas',
  '/dashboard/taxes',
  '/dashboard/casa',
  '/dashboard/carro',
  '/dashboard/prestamos',
  '/dashboard/asistente',
  '/dashboard',
]

const SYSTEM = `Eres la IA Maestra de BlindadoUSA, plataforma financiera para hispanos en USA.
Tu tarea: crear un PLAN DE ACCIÓN personalizado de 3 a 5 pasos concretos según la meta y el perfil del usuario.
Cada paso debe ser accionable HOY, específico a su situación, y apuntar a un módulo real de la plataforma.

Módulos disponibles (usa EXACTAMENTE estas rutas en el campo "modulo"):
- /dashboard/credito/disputas — disputar errores en el buró
- /dashboard/credito/simulador — simular subida de score
- /dashboard/credito/estrategia — plan de pago de deudas
- /dashboard/credito/tarjetas — optimizar utilización de tarjetas
- /dashboard/taxes — taxes e ITIN
- /dashboard/casa — comprar casa
- /dashboard/carro — financiar carro
- /dashboard/prestamos — préstamos
- /dashboard/asistente — chat con IA Maestra

Responde SOLO con JSON válido en este formato exacto:
{"resumen":"1 frase motivadora personalizada","pasos":[{"titulo":"...","detalle":"...","modulo":"/dashboard/...","prioridad":"alta"}]}`

export async function POST(req: Request) {
  if (!hasLlmKey()) return Response.json({ error: llmMissingMessage() }, { status: 503 })

  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) return Response.json({ error: 'No autorizado' }, { status: 401 })

  const parsed = z
    .object({
      meta: z.string().min(1).max(200),
      perfil: z
        .object({
          credit_score: z.number().nullable().optional(),
          ingreso_mensual: z.number().nullable().optional(),
          deuda_total: z.number().nullable().optional(),
          tiene_ssn: z.boolean().optional(),
          tiene_itin: z.boolean().optional(),
        })
        .optional(),
    })
    .safeParse(await req.json())
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' }, { status: 400 })
  }

  const { meta, perfil } = parsed.data
  const contexto = perfil
    ? `Perfil: score ${perfil.credit_score ?? 'N/D'}, ingreso $${perfil.ingreso_mensual ?? 'N/D'}/mes, deuda $${perfil.deuda_total ?? 'N/D'}, ${perfil.tiene_ssn ? 'tiene SSN' : perfil.tiene_itin ? 'tiene ITIN' : 'sin SSN/ITIN'}.`
    : 'Perfil no disponible.'

  try {
    const raw = await askLlm(SYSTEM, `Meta del usuario: "${meta}".\n${contexto}\nGenera el plan personalizado en JSON.`, 1500)
    const jsonStart = raw.indexOf('{')
    const jsonEnd = raw.lastIndexOf('}')
    const jsonStr = jsonStart >= 0 && jsonEnd > jsonStart ? raw.slice(jsonStart, jsonEnd + 1) : raw
    const plan = JSON.parse(jsonStr) as { resumen?: string; pasos?: Paso[] }

    const pasos: Paso[] = (plan.pasos ?? [])
      .slice(0, 5)
      .map((p) => ({
        titulo: String(p.titulo || '').slice(0, 120),
        detalle: String(p.detalle || '').slice(0, 300),
        modulo: MODULOS_VALIDOS.includes(p.modulo) ? p.modulo : '/dashboard/asistente',
        prioridad: ['alta', 'media', 'baja'].includes(p.prioridad) ? p.prioridad : 'media',
      }))

    if (!pasos.length) throw new Error('Plan vacío')

    const db = createAdmin()
    await db.from('planes_onboarding').upsert(
      {
        usuario_id: usuario.id,
        meta,
        pasos,
        resumen: plan.resumen ?? '',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'usuario_id' },
    )

    return Response.json({ ok: true, resumen: plan.resumen ?? '', pasos })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error al generar plan'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export async function GET() {
  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) return Response.json({ error: 'No autorizado' }, { status: 401 })

  const db = createAdmin()
  const { data } = await db
    .from('planes_onboarding')
    .select('meta, pasos, resumen, progreso')
    .eq('usuario_id', usuario.id)
    .maybeSingle()

  return Response.json({ plan: data ?? null })
}
