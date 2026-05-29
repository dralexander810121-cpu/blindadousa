import { createAdmin } from '@/lib/supabase/server'
import { askLlm, hasLlmKey, llmMissingMessage } from '@/lib/llm'
import { generarCartaLegal } from '@/lib/ia/cartas'
import { SISTEMA_DISPUTA_CREDITO } from '@/lib/ia/prompts'

export type DisputaItem = {
  acreedor: string
  cuenta?: string
  motivo: string
  monto?: string
}

export type DisputaAnalisis = {
  resumen: string
  violaciones: { ley: string; explicacion: string }[]
  probabilidad_exito: string
  pasos_inmediatos: string[]
  recomendar_carta: boolean
  detalle_carta?: string
}

export async function analizarDisputaCredito(input: {
  usuarioId: string
  nombreUsuario: string
  bureaus?: string[]
  items: DisputaItem[]
  generarCarta?: boolean
}) {
  if (!hasLlmKey()) {
    throw new Error(llmMissingMessage())
  }
  if (!input.items?.length) {
    throw new Error('Agrega al menos un ítem a disputar')
  }

  const bureaus = input.bureaus?.length ? input.bureaus.join(', ') : 'Equifax, Experian, TransUnion'
  const listado = input.items
    .map(
      (it, i) =>
        `${i + 1}. Acreedor: ${it.acreedor}${it.cuenta ? ` | Cuenta: ${it.cuenta}` : ''} | Motivo: ${it.motivo}${it.monto ? ` | Monto: ${it.monto}` : ''}`,
    )
    .join('\n')

  const raw = await askLlm(
    SISTEMA_DISPUTA_CREDITO,
    `Burós a notificar: ${bureaus}\n\nÍtems a disputar:\n${listado}`,
    2400,
  )
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
  const analisis = JSON.parse(cleaned) as DisputaAnalisis

  let carta: {
    id: string
    titulo: string
    tipo: string
    cuerpo_es: string
    cuerpo_en: string
  } | null = null

  if (input.generarCarta !== false && analisis.recomendar_carta && analisis.detalle_carta) {
    const generada = await generarCartaLegal({
      tipo: 'disputa_credito',
      detalle: analisis.detalle_carta,
      destinatario: `Oficinas de crédito (${bureaus})`,
      nombreUsuario: input.nombreUsuario,
    })

    const db = createAdmin()
    const { data: saved } = await db
      .from('cartas')
      .insert({
        usuario_id: input.usuarioId,
        tipo: 'disputa_credito',
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
