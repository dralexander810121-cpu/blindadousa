import { fetchNegocioById } from '@/lib/directorio/query'
import { CATEGORIAS_DIRECTORIO } from '@/lib/directorio/seed'

type Params = { id: string }

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params
  const negocio = await fetchNegocioById(id)
  if (!negocio) {
    return Response.json({ error: 'No encontrado' }, { status: 404 })
  }
  const categoria = CATEGORIAS_DIRECTORIO.find((c) => c.id === negocio.categoria)
  return Response.json({ negocio, categoria })
}

export const dynamic = 'force-dynamic'
