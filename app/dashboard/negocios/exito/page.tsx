import Link from 'next/link'
import { DashModuleShell } from '@/components/dashboard/DashModuleShell'

export default function NegocioExitoPage() {
  return (
    <DashModuleShell title="¡Pago recibido!" subtitle="Estamos procesando tu listing en el directorio.">
      <div className="card-3d dash-panel max-w-lg text-center py-10">
        <p className="text-5xl mb-4">✅</p>
        <p className="text-[var(--text-secondary)] mb-6">
          En 24–48 horas revisamos tu negocio y lo publicamos como verificado. Te contactaremos al email
          que usaste en Stripe si necesitamos algo más.
        </p>
        <Link href="/directorio" className="btn-3d-blue inline-flex !min-h-[44px] !text-sm">
          Ver directorio →
        </Link>
      </div>
    </DashModuleShell>
  )
}
