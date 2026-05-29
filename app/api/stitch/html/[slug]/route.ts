import { readStitchHtml } from '@/lib/stitchTemplates'

export const dynamic = 'force-dynamic'

type Params = { slug: string }

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params
  const html = readStitchHtml(slug)
  if (!html) {
    return Response.json({ error: 'Plantilla no encontrada' }, { status: 404 })
  }

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
