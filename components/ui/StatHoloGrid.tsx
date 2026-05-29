import { cn } from '@/lib/utils'

type Stat = {
  value: string
  label: string
  source?: string
}

export function StatHoloGrid({
  stats,
  className,
}: {
  stats: readonly Stat[]
  className?: string
}) {
  return (
    <div className={cn('stat-holo-grid', className)}>
      {stats.map((s) => (
        <div key={s.label} className="stat-holo">
          <strong>{s.value}</strong>
          <span className="stat-holo-label">{s.label}</span>
          {s.source && <cite className="stat-holo-source">{s.source}</cite>}
        </div>
      ))}
    </div>
  )
}
