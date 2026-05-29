export type CartaAction = {
  type: 'carta'
  carte_tipo: string
  titulo: string
  destinatario: string
  detalle: string
}

export function parseAccion(text: string): { respuesta: string; accion: CartaAction | null } {
  const marker = '---ACCION---'
  const idx = text.indexOf(marker)
  if (idx === -1) {
    return { respuesta: text.trim(), accion: null }
  }

  const respuesta = text.slice(0, idx).trim()
  const jsonPart = text.slice(idx + marker.length).trim()

  try {
    const parsed = JSON.parse(jsonPart) as CartaAction
    if (parsed.type === 'carta' && parsed.carte_tipo) {
      return { respuesta, accion: parsed }
    }
  } catch {
    /* ignore malformed action block */
  }

  return { respuesta: text.trim(), accion: null }
}
