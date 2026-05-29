'use client'

type Props = {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: Props) {
  const now = new Date()
  const time = now.toLocaleTimeString('es-US', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('es-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="dash-header banana-pro-panel">
      <button type="button" className="dash-menu-btn" onClick={onMenuClick} aria-label="Abrir menú">
        ☰
      </button>
      <div className="dash-header-meta hidden sm:block">
        <span className="dash-live-dot" aria-hidden />
        Sistema activo · {date} · {time}
      </div>
      <div className="dash-header-ticker hidden lg:flex" aria-hidden>
        <span className="text-[var(--cyan-bright)]">BLINDADO IA</span>
        <span>Monitoreo de pagos y cortes</span>
        <span className="text-[var(--cyan-soft)]">24/7</span>
      </div>
    </header>
  )
}
