import { cn } from '@/lib/utils'

type Tone = 'default' | 'success' | 'danger' | 'warn' | 'info'

export function DashPanel({
  children,
  className,
  tone = 'default',
}: {
  children: React.ReactNode
  className?: string
  tone?: Tone
}) {
  return (
    <div className={cn('dash-panel', tone !== 'default' && `dash-panel--${tone}`, className)}>
      {children}
    </div>
  )
}

export function DashDisplay({
  value,
  tone = 'neutral',
  className,
}: {
  value: string
  tone?: 'neutral' | 'positive' | 'negative'
  className?: string
}) {
  return (
    <p className={cn('dash-display', `dash-display--${tone}`, className)}>
      {value}
    </p>
  )
}

export function DashOption({
  selected,
  onClick,
  title,
  detail,
}: {
  selected: boolean
  onClick: () => void
  title: string
  detail?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('dash-option', selected && 'dash-option--active')}
    >
      <span className="dash-option-title">{title}</span>
      {detail && <span className="dash-option-detail">{detail}</span>}
    </button>
  )
}

export function DashRangeRow({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children: React.ReactNode
}) {
  return (
    <div className="dash-range-row">
      <div className="dash-range-header">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      {children}
    </div>
  )
}
