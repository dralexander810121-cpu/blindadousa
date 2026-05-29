import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  premium?: boolean
}

export function Card3DLink({ href, children, className, premium }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        premium ? 'card-premium' : 'card-3d',
        'card-3d-link block no-underline text-inherit',
        className,
      )}
    >
      {children}
    </Link>
  )
}
