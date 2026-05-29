'use client'

import { cn } from '@/lib/utils'
import { banana2FallbacksForPrimary } from '@/lib/images'
import { useBanana2Background } from '@/lib/useBanana2Background'

type Props = {
  imageUrl: string
  /** SVG holo si el JPG Banana 2 aún no existe (opcional; se infiere del slug) */
  fallbackUrl?: string
  children: React.ReactNode
  className?: string
  minHeight?: string
  overlay?: 'dark' | 'card'
}

export function ImageHero4K({
  imageUrl,
  fallbackUrl,
  children,
  className,
  minHeight = 'min-h-[520px]',
  overlay = 'dark',
}: Props) {
  const fallbacks = fallbackUrl
    ? [fallbackUrl, ...banana2FallbacksForPrimary(imageUrl)]
    : banana2FallbacksForPrimary(imageUrl)
  const bg = useBanana2Background(imageUrl, fallbacks)

  return (
    <section
      className={cn('relative overflow-hidden bg-4k', minHeight, className)}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={overlay === 'card' ? 'bg-overlay-card' : 'bg-overlay-dark'} aria-hidden />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
