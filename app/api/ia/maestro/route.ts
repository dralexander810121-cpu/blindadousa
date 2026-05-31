import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { handleMaestroChat } from '@/lib/ia/maestro-handler'
import { z } from 'zod'

const MaestroSchema = z.object({
  mensaje: z.string().min(1, 'Mensaje requerido').max(8000, 'Mensaje demasiado largo'),
  historial: z.array(z.object({ rol: z.string(), mensaje: z.string() })).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = MaestroSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' }, { status: 400 })
    }
    const { mensaje, historial } = parsed.data
    const result = await handleMaestroChat(mensaje, historial)

    if ('error' in result && result.status !== 200) {
      return Response.json({ error: result.error }, { status: result.status })
    }

    return Response.json({
      respuesta: result.respuesta,
      carta: result.carta,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error del servidor'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export async function GET() {
  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data } = await supabase
    .from('chat_historial')
    .select('rol, mensaje, created_at')
    .eq('usuario_id', usuario.id)
    .eq('modulo', 'maestro')
    .order('created_at', { ascending: true })
    .limit(40)

  return Response.json({ mensajes: data ?? [] })
}

export const dynamic = 'force-dynamic'

