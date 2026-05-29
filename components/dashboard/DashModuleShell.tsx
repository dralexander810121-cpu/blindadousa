import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  subtitle?: string
  backHref?: string
  backLabel?: string
  children: ReactNode
  className?: string
}

export function DashModuleShell({
  title,
  subtitle,
  backHref,
  backLabel = '← Volver',
  children,
  className,
}: Props) {
  return (
    <div className={cn('dash-page dash-page--banana', className)}>
      {backHref && (
        <Link href={backHref} className="text-sm text-[var(--text-muted)] hover:text-[var(--cyan-soft)] ux-focus-ring rounded-md px-1 py-0.5 inline-block">
          {backLabel}
        </Link>
      )}
      <h1 className={cn('dash-page-title', backHref && 'mt-3')}>{title}</h1>
      {subtitle && <p className="dash-page-date mb-6 max-w-2xl">{subtitle}</p>}
      {children}
    </div>
  )
}

type Tab = { id: string; label: string }

export function DashTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ux-focus-ring',
            active === t.id
              ? 'border-[var(--cyan-bright)] bg-[rgba(34,211,238,0.15)] text-[var(--text-primary)]'
              : 'border-white/10 text-[var(--text-muted)] hover:border-white/20',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
