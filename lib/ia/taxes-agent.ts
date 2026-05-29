import { askLlm, hasLlmKey, llmMissingMessage } from '@/lib/llm'
import { buildUserContext } from '@/lib/ia/context'
import { SISTEMA_TAXES_IA } from '@/lib/ia/prompts'
import type { SupabaseClient } from '@supabase/supabase-js'

export type TaxesInput = {
  ingresos: number
  hijos: number
  estadoCivil: 'soltero' | 'casado'
  retenido: number
  notas?: string
}

export type TaxesAnalisis = {
  resumen: string
  estimado_devolucion: string
  creditos_aplicables: string[]
  checklist_documentos: string[]
  recursos_gratis: string[]
  siguiente_paso_hoy: string
}

export async function analizarTaxes(
  supabase: SupabaseClient,
  usuarioId: string,
  input: TaxesInput,
) {
  if (!hasLlmKey()) {
    throw new Error(llmMissingMessage())
  }

  const contexto = await buildUserContext(supabase, usuarioId)
  const prompt = `Contexto de cuenta:\n${contexto}\n\nDatos declarados por el usuario:
- Ingresos anuales: $${input.ingresos}
- Hijos menores de 17: ${input.hijos}
- Estado civil: ${input.estadoCivil}
- Impuestos retenidos (W-2): $${input.retenido}
${input.notas ? `\nNotas adicionales: ${input.notas}` : ''}`

  const raw = await askLlm(SISTEMA_TAXES_IA, prompt, 2000)
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
  return JSON.parse(cleaned) as TaxesAnalisis
}
