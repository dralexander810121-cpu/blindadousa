import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarketingContentShell } from '@/components/landing/MarketingContentShell'
import { BLOG_POSTS, BLOG_POSTS_BY_SLUG } from '@/lib/blogPosts'
import { routeMetadata } from '@/lib/seo/metadata'

export const dynamic = 'force-static'

type Params = { slug: string }

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS_BY_SLUG.get(slug)
  if (!post) {
    return routeMetadata({
      title: 'Artículo no encontrado | BlindadoUSA',
      description: 'El artículo solicitado no existe.',
      path: `/blog/${slug}`,
      index: false,
    })
  }
  return routeMetadata({
    title: `${post.title} | Blog BlindadoUSA`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = BLOG_POSTS_BY_SLUG.get(slug)
  if (!post) notFound()

  return (
    <MarketingContentShell
      title={post.title}
      subtitle={`${post.publishedAt} · ${post.category} · ${post.readMinutes} min de lectura`}
      backHref="/blog"
      backLabel="← Volver al blog"
    >
      <div
        className="aspect-video rounded-xl mb-6 not-prose"
        style={{ background: 'linear-gradient(135deg,#0A1628,#2563EB)' }}
        aria-hidden
      />
      <p className="text-lg text-[var(--text-primary)] font-medium">{post.excerpt}</p>
      {post.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p className="text-sm text-[var(--text-muted)] mt-8">
        Contenido educativo. Consulta profesionales licenciados para tu caso específico.
      </p>
      <Link href="/trial" className="inline-block mt-4 text-[var(--cyan-bright)] underline">
        Probar BlindadoUSA gratis →
      </Link>
    </MarketingContentShell>
  )
}
