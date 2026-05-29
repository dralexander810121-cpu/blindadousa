import { fetchDirectorioNegocios } from '@/lib/directorio/query'
import { CATEGORIAS_DIRECTORIO } from '@/lib/directorio/seed'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const categoria = searchParams.get('categoria')
  const ciudad = searchParams.get('ciudad')

  const negocios = await fetchDirectorioNegocios(categoria, ciudad)

  return Response.json({
    categorias: CATEGORIAS_DIRECTORIO,
    negocios,
    total: negocios.length,
  })
}

export const dynamic = 'force-dynamic'
