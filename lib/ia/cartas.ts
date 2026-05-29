import { askLlm } from '@/lib/llm'
import { SISTEMA_CARTA_LEGAL, CARTA_LABELS } from '@/lib/ia/prompts'

export type CartaGenerada = {
  titulo: string
  asunto: string
  destinatario: string
  cuerpo_es: string
  cuerpo_en: string
  citas_legales: string[]
}

export async function generarCartaLegal(input: {
  tipo: string
  detalle: string
  destinatario: string
  nombreUsuario: string
}): Promise<CartaGenerada> {
  const tipoLabel = CARTA_LABELS[input.tipo] ?? input.tipo
  const prompt = `Genera carta tipo: ${tipoLabel} (${input.tipo})
Destinatario: ${input.destinatario}
Nombre del consumidor: ${input.nombreUsuario}
Detalle del caso: ${input.detalle}

La carta debe ser profesional, lista para imprimir y enviar por correo certificado cuando aplique.`

  const raw = await askLlm(SISTEMA_CARTA_LEGAL, prompt, 3500)
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
  return JSON.parse(cleaned) as CartaGenerada
}
