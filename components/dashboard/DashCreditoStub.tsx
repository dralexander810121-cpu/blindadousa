import Link from 'next/link'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'

type Props = {
  slug: string
  title: string
  icon: string
  description: string
}

export function DashCreditoStub({ slug, title, icon, description }: Props) {
  return (
    <DashModuleShell
      title={title}
      subtitle={description}
      backHref="/dashboard/credito"
      backLabel="← Mi Crédito"
    >
      <div className="card-3d dash-panel max-w-lg text-center py-12">
        <div className="text-5xl mb-4" aria-hidden>
          {icon}
        </div>
        <p className="text-[var(--text-secondary)] mb-6">
          Este módulo se conecta con la IA Maestra y Plaid. Mientras tanto, usa el asistente para un plan
          personalizado de {slug}.
        </p>
        <Link href="/dashboard/asistente" className="btn-3d-gold inline-flex !min-h-[44px] !text-sm">
          Ir a IA Maestra →
        </Link>
      </div>
    </DashModuleShell>
  )
}
