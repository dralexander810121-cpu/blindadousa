import Link from 'next/link'
import { MarketingFooter } from '@/components/landing/MarketingFooter'
import { MarketingNav } from '@/components/landing/MarketingNav'
import { ImageHero4K } from '@/components/ui/ImageHero4K'
import { IMG } from '@/lib/images'

type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
  backHref?: string
  backLabel?: string
  image?: string
}

export function MarketingContentShell({
  title,
  subtitle,
  children,
  backHref = '/inicio',
  backLabel = '← Volver al inicio',
  image = IMG.hero,
}: Props) {
  return (
    <>
      <MarketingNav />
      <main id="main-content" className="pt-24">
        <ImageHero4K imageUrl={image} minHeight="min-h-[320px]">
          <div className="marketing-container py-14">
            <Link href={backHref} className="text-sm text-[var(--cyan-bright)] hover:underline mb-4 inline-block">
              {backLabel}
            </Link>
            <h1 className="hero-title font-display !text-4xl md:!text-5xl !mb-3">{title}</h1>
            {subtitle && <p className="hero-sub !mb-0">{subtitle}</p>}
          </div>
        </ImageHero4K>
        <section className="marketing-section bg-section-panel">
          <div className="marketing-container max-w-3xl marketing-prose">{children}</div>
        </section>
      </main>
      <MarketingFooter />
    </>
  )
}
