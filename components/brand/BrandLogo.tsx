import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IMG } from '@/lib/images'

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'sidebar'

const SIZE_CLASS: Record<Size, string> = {
  sm: 'brand-logo--sm',
  md: 'brand-logo--md',
  lg: 'brand-logo--lg',
  xl: 'brand-logo--xl',
  sidebar: 'brand-logo--sidebar',
}

type Props = {
  href?: string | null
  className?: string
  size?: Size
  priority?: boolean
}

export function BrandLogo({ href = '/inicio', className, size = 'md', priority }: Props) {
  const image = (
    <Image
      src={IMG.logo}
      alt="BlindadoUSA — guardaespaldas financiero hispano"
      width={420}
      height={168}
      className={cn('brand-logo', SIZE_CLASS[size], className)}
      priority={priority}
    />
  )

  if (href) {
    return (
      <Link href={href} className="brand-logo-link" aria-label="BlindadoUSA — inicio">
        {image}
      </Link>
    )
  }

  return image
}
