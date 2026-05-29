import { buildSitemapXml } from '@/lib/seo/sitemap-xml'

export const dynamic = 'force-static'
export const revalidate = 86400

export function GET() {
  const body = buildSitemapXml()
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
