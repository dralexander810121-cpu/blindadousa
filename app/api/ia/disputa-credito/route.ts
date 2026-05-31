import type { DisputaItem } from '@/lib/ia/disputa'
import { z } from 'zod'
import { hasLlmKey, llmMissingMessage } from '@/lib/llm'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { analizarDisputaCredito } from '@/lib/ia/disputa'

export async function POST(req: Request) {
  if (!hasLlmKey()) {
    return Response.json({ error: llmMissingMessage() }, { status: 503 })
  }

  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const DisputaSchema = z.object({
    items: z.array(z.object({ acreedor: z.string(), motivo: z.string(), cuenta: z.string().optional(), monto: z.string().optional() })).min(1, 'Se requiere al menos un item de disputa') as z.ZodType<DisputaItem[]>,
    bureaus: z.array(z.string()).optional(),
    generarCarta: z.boolean().optional().default(true),
  })
  const parsed = DisputaSchema.safeParse(await req.json())
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' }, { status: 400 })
  }
  const { items, bureaus, generarCarta } = parsed.data

  try {
    const result = await analizarDisputaCredito({
      usuarioId: usuario.id,
      nombreUsuario: usuario.nombre || 'Consumidor',
      bureaus,
      items,
      generarCarta,
    })
    return Response.json({ ok: true, ...result })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error al analizar disputa'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'



