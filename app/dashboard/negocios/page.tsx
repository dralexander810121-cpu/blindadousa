import Link from 'next/link'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'
import { NegocioCheckoutForm } from './NegocioCheckoutForm'

export default function NegociosB2BPage() {
  return (
    <DashModuleShell
      title="Registrar negocio"
      subtitle="Aparece en el directorio verificado. La IA Maestra puede recomendarte cuando un usuario busque tu categoría."
      backHref="/directorio"
      backLabel="← Ver directorio público"
    >
      <NegocioCheckoutForm />
      <p className="text-xs text-[var(--text-muted)] mt-8">
        ¿Ya pagaste?{' '}
        <Link href="/dashboard/negocios/exito" className="text-[var(--blue-300)]">
          Confirmación de pago →
        </Link>
      </p>
    </DashModuleShell>
  )
}
