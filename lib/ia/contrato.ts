import { askClaudeWithContent, hasAnthropicKey, type ClaudeContentBlock } from '@/lib/anthropic'
import { askLlm, hasLlmKey, llmMissingMessage } from '@/lib/llm'
import { createAdmin } from '@/lib/supabase/server'
import { generarCartaLegal } from '@/lib/ia/cartas'
import { SISTEMA_ESCANER_CONTRATO } from '@/lib/ia/prompts'

export type ContratoAnalisis = {
  resumen: string
  nivel_riesgo: string
  problemas: { titulo: string; explicacion: string; gravedad: string }[]
  clausulas_sospechosas: string[]
  preguntas_antes_firmar: string[]
  recomendar_carta: boolean
  tipo_carta?: string
  detalle_carta?: string
}

const TIPO_LABELS: Record<string, string> = {
  auto: 'contrato de compra/financiamiento de vehículo',
  renta: 'contrato de arrendamiento (lease)',
  prestamo: 'contrato de préstamo personal o payday',
  medico: 'factura o acuerdo de pago médico',
  otro: 'contrato de consumidor',
}

export async function analizarContrato(input: {
  usuarioId: string
  nombreUsuario: string
  tipo: string
  texto?: string
  imagenBase64?: string
  mediaType?: 'image/jpeg' | 'image/png' | 'image/webp'
  generarCarta?: boolean
}) {
  if (!hasLlmKey()) {
    throw new Error(llmMissingMessage())
  }
  if (input.imagenBase64 && !hasAnthropicKey()) {
    throw new Error('Para escanear fotos de contratos configura ANTHROPIC_API_KEY (visión). GEMINI solo soporta texto por ahora.')
  }

  const tipoLabel = TIPO_LABELS[input.tipo] ?? TIPO_LABELS.otro
  const instruccion = `Tipo de documento: ${tipoLabel}.\nAnaliza y señala riesgos concretos para el consumidor.`

  let raw: string
  if (input.imagenBase64) {
    const media = input.mediaType ?? 'image/jpeg'
    const content: ClaudeContentBlock = [
      {
        type: 'image',
        source: {
          type: 'base64',
          media_type: media,
          data: input.imagenBase64.replace(/^data:image\/\w+;base64,/, ''),
        },
      },
      { type: 'text', text: instruccion },
    ]
    if (input.texto?.trim()) {
      content.push({ type: 'text', text: `Notas del usuario:\n${input.texto.trim()}` })
    }
    raw = await askClaudeWithContent(SISTEMA_ESCANER_CONTRATO, content, 3200)
  } else if (input.texto?.trim()) {
    raw = await askLlm(
      SISTEMA_ESCANER_CONTRATO,
      `${instruccion}\n\nTexto del contrato:\n${input.texto.trim()}`,
      3200,
    )
  } else {
    throw new Error('Sube una foto o pega el texto del contrato')
  }

  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
  const analisis = JSON.parse(cleaned) as ContratoAnalisis

  let carta: {
    id: string
    titulo: string
    tipo: string
    cuerpo_es: string
    cuerpo_en: string
  } | null = null

  if (
    input.generarCarta !== false &&
    analisis.recomendar_carta &&
    analisis.tipo_carta &&
    analisis.detalle_carta
  ) {
    const generada = await generarCartaLegal({
      tipo: analisis.tipo_carta,
      detalle: analisis.detalle_carta,
      destinatario: 'A quien corresponda',
      nombreUsuario: input.nombreUsuario,
    })

    const db = createAdmin()
    const { data: saved } = await db
      .from('cartas')
      .insert({
        usuario_id: input.usuarioId,
        tipo: analisis.tipo_carta,
        destinatario: generada.destinatario,
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
        titulo: generada.titulo,
        tipo: saved.tipo,
        cuerpo_es: generada.cuerpo_es,
        cuerpo_en: generada.cuerpo_en,
      }
    }
  }

  return { analisis, carta }
}
