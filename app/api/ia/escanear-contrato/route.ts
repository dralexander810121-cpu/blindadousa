import { hasAnthropicKey } from '@/lib/anthropic'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { analizarContrato } from '@/lib/ia/contrato'

const TIPOS = new Set(['auto', 'renta', 'prestamo', 'medico', 'otro'])

export async function POST(req: Request) {
  if (!hasAnthropicKey()) {
    return Response.json({ error: 'ANTHROPIC_API_KEY no configurada' }, { status: 503 })
  }

  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const tipo = TIPOS.has(body.tipo) ? body.tipo : 'otro'

  try {
    const result = await analizarContrato({
      usuarioId: usuario.id,
      nombreUsuario: usuario.nombre || 'Consumidor',
      tipo,
      texto: body.texto,
      imagenBase64: body.imagenBase64,
      mediaType: body.mediaType,
      generarCarta: body.generarCarta !== false,
    })
    return Response.json({ ok: true, ...result })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error al escanear'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
