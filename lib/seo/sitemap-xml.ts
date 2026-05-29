import { BLOG_POSTS } from '@/lib/blogPosts'

const SITE = 'https://blindadousa.com'

type SitemapEntry = {
  path: string
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '/inicio', changeFrequency: 'daily', priority: 1 },
  { path: '/precios', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/que-incluye', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/trial', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/como-funciona', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/directorio', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/directorio/registrar-negocio', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/terminos', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacidad', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/descargo', changeFrequency: 'yearly', priority: 0.3 },
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlNode(loc: string, lastmod: string, changeFrequency: string, priority: number): string {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changeFrequency}</changefreq>`,
    `    <priority>${priority.toFixed(2)}</priority>`,
    '  </url>',
  ].join('\n')
}

/** XML sitemap explícito (evita tags vacíos en algunos hosts). */
export function buildSitemapXml(lastModified = new Date()): string {
  const lastmod = lastModified.toISOString()

  const staticNodes = STATIC_ENTRIES.map((entry) =>
    urlNode(`${SITE}${entry.path}`, lastmod, entry.changeFrequency, entry.priority),
  )

  const blogNodes = BLOG_POSTS.map((post) =>
    urlNode(`${SITE}/blog/${post.slug}`, lastmod, 'monthly', 0.75),
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticNodes,
    ...blogNodes,
    '</urlset>',
  ].join('\n')
}
