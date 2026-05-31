'use client'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthError, AuthField, AuthInput, AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { PRICING } from '@/lib/siteFacts'
import { createClient } from '@/lib/supabase/client'

function EntrarForm() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const resetOk = searchParams.get('reset') === 'ok'
  const authErr = searchParams.get('error') === 'auth'
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password: pass })
    if (authError) {
      setError('Email o contraseña incorrectos. Intenta de nuevo.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
  }

  return (
    <AuthShell title="Bienvenido de vuelta" subtitle="Entra a tu cuenta para continuar">
      {resetOk && (
        <p className="auth-success-banner mb-4" role="status">
          ✓ Contraseña actualizada. Ya puedes entrar.
        </p>
      )}
      {authErr && !error && (
        <AuthError message="El enlace expiró o no es válido. Intenta de nuevo o recupera tu contraseña." />
      )}
      <form onSubmit={handleLogin}>
        {error && <AuthError message={error} />}
        <AuthField label="Tu email">
          <AuthInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            autoComplete="email"
          />
        </AuthField>
        <AuthField label="Contraseña">
          <AuthInput
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Tu contraseña"
            required
            autoComplete="current-password"
          />
        </AuthField>
        <Button3D type="submit" variant="gold" className="w-full mt-2" pulse={!loading}>
          {loading ? 'Entrando…' : 'Entrar a mi cuenta →'}
        </Button3D>
      </form>
      <div className="auth-footer">
        <p>
          ¿No tienes cuenta?{' '}
          <Link href="/trial">Prueba gratis {PRICING.trialDays} días</Link>
        </p>
        <p className="mt-2">
          <Link href="/recuperar">Olvidé mi contraseña</Link>
        </p>
      </div>
    </AuthShell>
  )
}

export default function EntrarPage() {
  return (
    <Suspense fallback={<AuthShell title="Entrando…" subtitle=""><span /></AuthShell>}>
      <EntrarForm />
    </Suspense>
  )
}
