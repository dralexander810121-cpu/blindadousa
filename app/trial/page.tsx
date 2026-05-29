'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthError, AuthField, AuthInput, AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { PRICING } from '@/lib/siteFacts'
import { createClient } from '@/lib/supabase/client'

export default function TrialPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleTrial(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error: authErr } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { nombre },
        emailRedirectTo: `${window.location.origin}/bienvenido`,
      },
    })
    if (authErr) {
      setError(authErr.message)
      setLoading(false)
      return
    }
    const res = await fetch('/api/trial/activar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, nombre, userId: data.user?.id }),
    })
    if (res.ok) router.push('/bienvenido?trial=1')
    else {
      setError('No se pudo activar el trial. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Empieza tu prueba gratis"
      subtitle={`Acceso completo a ${PRICING.trialDays} días. Sin cobros durante el trial.`}
      badge={`${PRICING.trialDays} días gratis · sin tarjeta`}
    >
      <form onSubmit={handleTrial}>
        {error && <AuthError message={error} />}
        <AuthField label="Tu nombre">
          <AuthInput
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </AuthField>
        <AuthField label="Tu email">
          <AuthInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </AuthField>
        <AuthField label="Crea una contraseña">
          <AuthInput
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            minLength={6}
            required
          />
        </AuthField>
        <Button3D type="submit" variant="gold" className="w-full mt-2" pulse={!loading}>
          {loading ? 'Activando tu prueba…' : 'Activar mi prueba gratis →'}
        </Button3D>
      </form>
      <div className="auth-footer">
        <p>
          Después del trial: <strong>${PRICING.monthly}/mes</strong> o{' '}
          <strong>${PRICING.annual}/año</strong>
        </p>
        <p className="mt-2">
          ¿Ya tienes cuenta? <Link href="/entrar">Entrar</Link>
        </p>
      </div>
    </AuthShell>
  )
}
