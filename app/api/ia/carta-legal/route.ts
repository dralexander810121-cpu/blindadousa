import { z } from 'zod'
import { createAdmin } from '@/lib/supabase/server'
import { hasLlmKey, llmMissingMessage } from '@/lib/llm'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { generarCartaLegal } from '@/lib/ia/cartas'
import { CARTA_LABELS } from '@/lib/ia/prompts'

export async function POST(req: Request) {
  if (!hasLlmKey()) {
    return Response.json({ error: llmMissingMessage() }, { status: 503 })
  }

  const { usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { tipo, detalle, destinatario } = await req.json()
  if (!tipo || !detalle) {
    return Response.json({ error: 'tipo y detalle son requeridos' }, { status: 400 })
  }

  if (!CARTA_LABELS[tipo]) {
    return Response.json({ error: 'Tipo de carta no válido' }, { status: 400 })
  }

  try {
    const generada = await generarCartaLegal({
      tipo,
      detalle,
      destinatario: destinatario || 'A quien corresponda',
      nombreUsuario: usuario.nombre || 'Consumidor',
    })

    const db = createAdmin()
    const { data: saved, error } = await db
      .from('cartas')
      .insert({
        usuario_id: usuario.id,
        tipo,
        destinatario: generada.destinatario || destinatario,
        asunto: generada.asunto,
        cuerpo: generada.cuerpo_es,
        citas_legales: generada.citas_legales ?? [],
        estado: 'borrador',
      })
      .select('id, tipo, asunto, destinatario, cuerpo, citas_legales, estado, created_at')
      .single()

    if (error) throw error

    return Response.json({
      ok: true,
      carta: {
        ...saved,
        titulo: generada.titulo,
        cuerpo_es: generada.cuerpo_es,
        cuerpo_en: generada.cuerpo_en,
      },
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'No se pudo generar la carta'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export async function GET() {
  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data } = await supabase
    .from('cartas')
    .select('id, tipo, asunto, destinatario, cuerpo, estado, created_at')
    .eq('usuario_id', usuario.id)
    .order('created_at', { ascending: false })
    .limit(20)

  return Response.json({ cartas: data ?? [] })
}

export const dynamic = 'force-dynamic'

