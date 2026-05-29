import { readStitchScreen } from '@/lib/stitchTemplates'

export const dynamic = 'force-dynamic'

type Params = { slug: string }

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params
  const image = readStitchScreen(slug)
  if (!image) {
    return Response.json({ error: 'Captura no encontrada' }, { status: 404 })
  }

  return new Response(image, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
