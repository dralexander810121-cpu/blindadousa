import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  premium?: boolean
}

export function Card3D({ children, className, premium }: Props) {
  return (
    <div className={cn(premium ? 'card-premium' : 'card-3d', className)}>
      {children}
    </div>
  )
}
