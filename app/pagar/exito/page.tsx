'use client'
import { useEffect, useState } from 'react'
import { AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { DashDisplay } from '@/components/dashboard/DashPanel'
import { IMG } from '@/lib/images'
import { PRICING } from '@/lib/siteFacts'
import { createClient } from '@/lib/supabase/client'

export default function ExitoPage() {
  const [codigo, setCodigo] = useState('')
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from('usuarios')
          .select('mi_codigo')
          .eq('auth_user_id', user.id)
          .single()
          .then(({ data }) => setCodigo(data?.mi_codigo || ''))
      }
    })
  }, [])

  return (
    <AuthShell
      title="¡Suscripción activa!"
      subtitle="Acceso completo al dashboard y todos los módulos publicados."
      badge="Pago confirmado"
      image={IMG.exito}
    >
      {codigo && (
        <div className="dash-panel dash-panel--success text-center mb-5">
          <p className="text-sm text-[var(--text-muted)] mb-1">Tu código de referido</p>
          <DashDisplay value={codigo} tone="neutral" className="!text-4xl tracking-widest" />
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Comparte tu código. Referidos con descuento de ${PRICING.referralPayout}.
          </p>
        </div>
      )}
      <Button3D href="/dashboard" variant="gold" className="w-full" pulse>
        Ir a mi panel →
      </Button3D>
    </AuthShell>
  )
}
