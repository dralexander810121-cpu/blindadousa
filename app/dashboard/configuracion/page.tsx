import { WhatsappSettings } from '@/components/dashboard/WhatsappSettings'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'
import Link from 'next/link'

export default function ConfiguracionPage() {
  return (
    <DashModuleShell
      title="Configuración"
      subtitle="Alertas, perfil y preferencias de tu cuenta Blindado."
      backHref="/dashboard"
      backLabel="← Centro de Comando"
    >
      <div className="space-y-6">
        <WhatsappSettings />

        <div className="card-3d dash-panel max-w-lg">
          <h2 className="dash-panel-title mb-2">Perfil financiero</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Actualiza ingresos, score estimado y metas para que la IA Maestra te conozca mejor.
          </p>
          <Link href="/dashboard/onboarding" className="btn-glass inline-flex !min-h-[40px] !text-xs">
            Editar perfil →
          </Link>
        </div>
      </div>
    </DashModuleShell>
  )
}
