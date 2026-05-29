import { createAdmin } from '@/lib/supabase/server'
import { hasAnthropicKey, askClaude } from '@/lib/anthropic'
import { hasGeminiKey, askGemini } from '@/lib/gemini-llm'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { parseAccion } from '@/lib/ia/actions'
import { generarCartaLegal } from '@/lib/ia/cartas'
import { buildUserContext } from '@/lib/ia/context'
import { SISTEMA_IA_MAESTRA } from '@/lib/ia/prompts'

type HistorialMsg = { rol: string; mensaje: string }

export async function handleMaestroChat(mensaje: string, historial?: HistorialMsg[]) {
  if (!hasAnthropicKey() && !hasGeminiKey()) {
    return {
      error:
        'Configura ANTHROPIC_API_KEY o GEMINI_API_KEY en Vercel (Production) para activar la IA Maestra.',
      status: 503 as const,
    }
  }

  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return { error: 'No autorizado', status: 401 as const }
  }

  if (!mensaje?.trim()) {
    return { error: 'Mensaje vacío', status: 400 as const }
  }

  const contexto = await buildUserContext(supabase, usuario.id)
  const system = SISTEMA_IA_MAESTRA.replace('{contexto_usuario}', contexto)

  const historialTexto =
    historial
      ?.slice(-8)
      .map((m) => `${m.rol === 'user' ? 'Usuario' : 'Blindado'}: ${m.mensaje}`)
      .join('\n') || ''

  const prompt = historialTexto
    ? `Conversación reciente:\n${historialTexto}\n\nNueva pregunta:\n${mensaje}`
    : mensaje

  const raw = hasAnthropicKey() ? await askClaude(system, prompt, 2200) : await askGemini(system, prompt, 2200)
  const { respuesta, accion } = parseAccion(raw)

  const db = createAdmin()
  let carta: {
    id: string
    titulo: string
    tipo: string
    cuerpo_es: string
    cuerpo_en: string
  } | null = null

  if (accion?.type === 'carta') {
    try {
      const generada = await generarCartaLegal({
        tipo: accion.carte_tipo,
        detalle: accion.detalle,
        destinatario: accion.destinatario,
        nombreUsuario: usuario.nombre || 'Consumidor',
      })

      const { data: saved } = await db
        .from('cartas')
        .insert({
          usuario_id: usuario.id,
          tipo: accion.carte_tipo,
          destinatario: generada.destinatario || accion.destinatario,
          asunto: generada.asunto,
          cuerpo: generada.cuerpo_es,
          citas_legales: generada.citas_legales ?? [],
          estado: 'borrador',
        })
        .select('id, tipo')
        .single()

      if (saved) {
        carta = {
          id: saved.id,
          titulo: generada.titulo || accion.titulo,
          tipo: saved.tipo,
          cuerpo_es: generada.cuerpo_es,
          cuerpo_en: generada.cuerpo_en,
        }
      }
    } catch (e) {
      console.error('carta_generation_failed', e)
    }
  }

  const respuestaFinal =
    respuesta +
    (carta
      ? `\n\n✅ Generé tu carta "${carta.titulo}". Descárgala abajo o en Mi Crédito → Cartas.`
      : '')

  await db.from('chat_historial').insert([
    { usuario_id: usuario.id, modulo: 'maestro', rol: 'user', mensaje: mensaje.trim() },
    { usuario_id: usuario.id, modulo: 'maestro', rol: 'assistant', mensaje: respuestaFinal },
  ])

  return {
    status: 200 as const,
    respuesta: respuestaFinal,
    carta,
  }
}
