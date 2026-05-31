import { hasLlmKey, llmMissingMessage } from '@/lib/llm'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { analizarTaxes } from '@/lib/ia/taxes-agent'

export async function POST(req: Request) {
  if (!hasLlmKey()) {
    return Response.json({ error: llmMissingMessage() }, { status: 503 })
  }

  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const ingresos = Number(body.ingresos)
  if (!Number.isFinite(ingresos) || ingresos < 0) {
    return Response.json({ error: 'ingresos inválido' }, { status: 400 })
  }

  try {
    const analisis = await analizarTaxes(supabase, usuario.id, {
      ingresos,
      hijos: Number(body.hijos) || 0,
      estadoCivil: body.estadoCivil === 'casado' ? 'casado' : 'soltero',
      retenido: Number(body.retenido) || 0,
      notas: body.notas,
    })
    return Response.json({ ok: true, analisis })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error al analizar taxes'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
