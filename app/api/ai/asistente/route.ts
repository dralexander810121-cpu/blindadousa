import { handleMaestroChat } from '@/lib/ia/maestro-handler'

export async function POST(req: Request) {
  try {
    const { mensaje, historial } = await req.json()
    const result = await handleMaestroChat(mensaje, historial)

    if ('error' in result && result.status !== 200) {
      return Response.json({ error: result.error }, { status: result.status })
    }

    return Response.json({ respuesta: result.respuesta, carta: result.carta })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error del servidor'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
