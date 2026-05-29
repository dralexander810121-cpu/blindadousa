import { hasAnthropicKey } from '@/lib/anthropic'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { analizarDisputaCredito } from '@/lib/ia/disputa'

export async function POST(req: Request) {
  if (!hasAnthropicKey()) {
    return Response.json({ error: 'ANTHROPIC_API_KEY no configurada' }, { status: 503 })
  }

  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const items = body.items
  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: 'items es requerido (array)' }, { status: 400 })
  }

  try {
    const result = await analizarDisputaCredito({
      usuarioId: usuario.id,
      nombreUsuario: usuario.nombre || 'Consumidor',
      bureaus: body.bureaus,
      items,
      generarCarta: body.generarCarta !== false,
    })
    return Response.json({ ok: true, ...result })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error al analizar disputa'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
