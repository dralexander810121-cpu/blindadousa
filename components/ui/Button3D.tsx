import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'blue' | 'gold' | 'glass'

const variantClass: Record<Variant, string> = {
  blue: 'btn-3d-blue',
  gold: 'btn-3d-gold',
  glass: 'btn-glass',
}

type Props = {
  href?: string
  variant?: Variant
  pulse?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function Button3D({
  href,
  variant = 'blue',
  pulse,
  className,
  children,
  onClick,
  type = 'button',
}: Props) {
  const cls = cn(variantClass[variant], 'ux-focus-ring', pulse && 'pulse-cta', className)

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
