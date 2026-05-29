import type { Metadata } from 'next'
import Link from 'next/link'
import { Card3DLink } from '@/components/ui/Card3DLink'
import { MarketingContentShell } from '@/components/landing/MarketingContentShell'
import { BLOG_POSTS } from '@/lib/blogPosts'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('blog')

export default function BlogPage() {
  return (
    <MarketingContentShell
      title="BLOG BLINDADOUSA"
      subtitle={`${BLOG_POSTS.length} guías publicadas sobre crédito, vivienda, taxes y protección financiera.`}
      backHref="/inicio"
      backLabel="← Volver al inicio"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
        {BLOG_POSTS.map((post) => (
          <Card3DLink key={post.slug} href={`/blog/${post.slug}`} className="!p-0 overflow-hidden">
            <div
              className="aspect-video"
              style={{ background: 'linear-gradient(135deg,#0A1628,#1A3470)' }}
              aria-hidden
            />
            <div className="p-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wide text-[var(--cyan-bright)] mb-2">
                {post.category}
              </span>
              <h2 className="text-base font-bold text-[var(--text-primary)] leading-snug mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-3">{post.excerpt}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {post.publishedAt} · {post.readMinutes} min
              </p>
            </div>
          </Card3DLink>
        ))}
      </div>
      <p className="mt-8 text-sm">
        ¿Primera vez aquí?{' '}
        <Link href="/trial" className="text-[var(--cyan-bright)] underline">
          Activa tu trial de 3 días
        </Link>
      </p>
    </MarketingContentShell>
  )
}
