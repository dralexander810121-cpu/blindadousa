import { WhatsappSettings } from '@/components/dashboard/WhatsappSettings'
import { ManageSubscription } from '@/components/dashboard/ManageSubscription'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { isAdminEmail } from '@/lib/admin'
import { detectUserPaymentProvider, paymentProviderLabel } from '@/lib/payments/provider'
import { createAdmin } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ConfiguracionPage() {
  const { usuario, user } = await getAuthenticatedUsuario()
  const showAdmin = isAdminEmail(user?.email)
  let hasBillingAccount = false
  let providerLabel = 'PayPal'
  if (usuario) {
    const db = createAdmin()
    const { data } = await db
      .from('usuarios')
      .select('stripe_customer_id, external_subscription_id, acceso_pagado')
      .eq('id', usuario.id)
      .single()
    hasBillingAccount = Boolean(
      data?.acceso_pagado && (data?.external_subscription_id || data?.stripe_customer_id),
    )
    providerLabel = paymentProviderLabel(detectUserPaymentProvider(data?.external_subscription_id))
  }

  return (
    <DashModuleShell
      title="Configuración"
      subtitle="Alertas, perfil y preferencias de tu cuenta Blindado."
      backHref="/dashboard"
      backLabel="← Centro de Comando"
    >
      <div className="space-y-6">
        <ManageSubscription
          hasBillingAccount={hasBillingAccount}
          providerLabel={providerLabel}
        />
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

        {showAdmin && (
          <div className="card-3d dash-panel max-w-lg border border-amber-500/30">
            <h2 className="dash-panel-title mb-2">Administración</h2>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Aprueba negocios del directorio B2B y revisa listings pendientes.
            </p>
            <Link href="/dashboard/admin/directorio" className="btn-3d-gold inline-flex !min-h-[40px] !text-xs">
              Panel directorio →
            </Link>
          </div>
        )}
      </div>
    </DashModuleShell>
  )
}

