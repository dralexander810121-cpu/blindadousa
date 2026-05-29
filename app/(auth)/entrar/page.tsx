'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthError, AuthField, AuthInput, AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { createClient } from '@/lib/supabase/client'

export default function EntrarPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
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
          <Link href="/trial">Prueba gratis 3 días</Link>
        </p>
        <p className="mt-2">
          <Link href="/recuperar">Olvidé mi contraseña</Link>
        </p>
      </div>
    </AuthShell>
  )
}
