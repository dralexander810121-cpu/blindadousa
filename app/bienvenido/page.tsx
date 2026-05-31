import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AuthShell } from '@/components/landing/AuthShell'
import { First10Minutes } from '@/components/onboarding/First10Minutes'
import { Button3D } from '@/components/ui/Button3D'
import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { PRICING } from '@/lib/siteFacts'

export default async function BienvenidoPage() {
  const { user } = await getAuthenticatedUsuario()

  if (!user) {
    redirect('/trial')
  }

  return (
    <AuthShell
      title="Bienvenido a BlindadoUSA"
      subtitle={`Tu prueba gratuita de ${PRICING.trialDays} días está activa. Revisa tu email si necesitas confirmar la cuenta.`}
      badge="Cuenta creada"
    >
      <Button3D href="/dashboard" variant="gold" className="w-full" pulse>
        Entrar a la plataforma →
      </Button3D>
      <First10Minutes />
      <div className="auth-footer mt-4">
        <Link href="/dashboard/onboarding">Completar perfil primero →</Link>
        <span className="mx-2 text-[var(--text-muted)]">·</span>
        <Link href="/que-incluye">Qué incluye tu plan</Link>
      </div>
    </AuthShell>
  )
}
