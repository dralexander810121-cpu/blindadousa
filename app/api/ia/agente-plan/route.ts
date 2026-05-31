import { z } from 'zod'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { createAdmin } from '@/lib/supabase/server'
import { askLlm, hasLlmKey, llmMissingMessage } from '@/lib/llm'
import { buildUserContext } from '@/lib/ia/context'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

type Paso = {
  orden: number
  titulo: string
  descripcion: string
  modulo: string
  accion: string
  estado: 'pendiente' | 'completado'
}

const MODULOS = [
  '/dashboard/credito',
  '/dashboard/credito/disputas',
  '/dashboard/credito/simulador',
  '/dashboard/credito/estrategia',
  '/dashboard/credito/tarjetas',
  '/dashboard/taxes',
  '/dashboard/casa',
  '/dashboard/carro',
  '/dashboard/prestamos',
  '/dashboard/banco',
  '/dashboard/subsidios',
  '/dashboard/asistente',
]

const SYSTEM = `Eres el Agente Financiero Autónomo de BlindadoUSA. Recibes una META compleja de un usuario hispano en USA y la descompones en un PLAN DE ACCIÓN ejecutable de 4 a 7 pasos ordenados.

Cada paso debe:
- Ser concreto y verificable
- Apuntar a un módulo real de la plataforma (campo "modulo", usa EXACTAMENTE una de estas rutas):
  /dashboard/credito/disputas, /dashboard/credito/simulador, /dashboard/credito/estrategia, /dashboard/credito/tarjetas, /dashboard/taxes, /dashboard/casa, /dashboard/carro, /dashboard/prestamos, /dashboard/banco, /dashboard/subsidios, /dashboard/asistente
- Incluir una "accion" = la instrucción concreta que el usuario (o la IA) ejecuta en ese módulo

Ordena los pasos por dependencia lógica (lo que desbloquea lo demás va primero).
Responde SOLO con JSON válido:
{"horizonte":"ej: 6 meses","resumen":"1-2 frases del plan global","pasos":[{"orden":1,"titulo":"...","descripcion":"...","modulo":"/dashboard/...","accion":"..."}]}`

export async function POST(req: Request) {
  if (!hasLlmKey()) return Response.json({ error: llmMissingMessage() }, { status: 503 })

  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) return Response.json({ error: 'No autorizado' }, { status: 401 })

  const parsed = z.object({ meta: z.string().min(5).max(300) }).safeParse(await req.json())
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Meta inválida' }, { status: 400 })
  }

  const contexto = await buildUserContext(supabase, usuario.id)

  try {
    const raw = await askLlm(
      SYSTEM,
      `META DEL USUARIO: "${parsed.data.meta}"\n\nCONTEXTO FINANCIERO DEL USUARIO:\n${contexto}\n\nGenera el plan multi-paso en JSON.`,
      2200,
    )
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    const plan = JSON.parse(raw.slice(start, end + 1)) as {
      horizonte?: string
      resumen?: string
      pasos?: Omit<Paso, 'estado'>[]
    }

    const pasos: Paso[] = (plan.pasos ?? []).slice(0, 7).map((p, i) => ({
      orden: i + 1,
      titulo: String(p.titulo || '').slice(0, 120),
      descripcion: String(p.descripcion || '').slice(0, 350),
      modulo: MODULOS.includes(p.modulo) ? p.modulo : '/dashboard/asistente',
      accion: String(p.accion || '').slice(0, 250),
      estado: 'pendiente',
    }))

    if (!pasos.length) throw new Error('Plan vacío')

    const db = createAdmin()
    await db.from('agente_planes').upsert(
      {
        usuario_id: usuario.id,
        meta: parsed.data.meta,
        horizonte: plan.horizonte ?? null,
        resumen: plan.resumen ?? '',
        pasos,
        estado: 'activo',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'usuario_id' },
    )

    return Response.json({ ok: true, horizonte: plan.horizonte ?? '', resumen: plan.resumen ?? '', pasos })
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : 'Error al generar plan' }, { status: 500 })
  }
}

export async function GET() {
  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) return Response.json({ error: 'No autorizado' }, { status: 401 })
  const db = createAdmin()
  const { data } = await db
    .from('agente_planes')
    .select('meta, horizonte, resumen, pasos, estado')
    .eq('usuario_id', usuario.id)
    .maybeSingle()
  return Response.json({ plan: data ?? null })
}

// Marca un paso como completado / pendiente
export async function PATCH(req: Request) {
  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) return Response.json({ error: 'No autorizado' }, { status: 401 })

  const parsed = z
    .object({ orden: z.number().int().min(1), estado: z.enum(['pendiente', 'completado']) })
    .safeParse(await req.json())
  if (!parsed.success) return Response.json({ error: 'Datos inválidos' }, { status: 400 })

  const db = createAdmin()
  const { data: plan } = await db
    .from('agente_planes')
    .select('pasos')
    .eq('usuario_id', usuario.id)
    .maybeSingle()
  if (!plan) return Response.json({ error: 'Sin plan activo' }, { status: 404 })

  const pasos = (plan.pasos as Paso[]).map((p) =>
    p.orden === parsed.data.orden ? { ...p, estado: parsed.data.estado } : p,
  )
  const todosCompletos = pasos.every((p) => p.estado === 'completado')

  await db
    .from('agente_planes')
    .update({ pasos, estado: todosCompletos ? 'completado' : 'activo', updated_at: new Date().toISOString() })
    .eq('usuario_id', usuario.id)

  return Response.json({ ok: true, pasos, completado: todosCompletos })
}
