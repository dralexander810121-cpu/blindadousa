'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthError, AuthField, AuthInput, AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { PRICING } from '@/lib/siteFacts'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function RegistrarsePage() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    })
    if (signUpError) {
      setLoading(false)
      setError(signUpError.message)
      return
    }
    if (data.user) {
      await supabase.from('usuarios').upsert(
        { auth_user_id: data.user.id, email, nombre },
        { onConflict: 'auth_user_id' },
      )
    }
    setLoading(false)
    router.push('/trial')
    router.refresh()
  }

  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle={`Empiezas con ${PRICING.trialDays} días gratis. Sin tarjeta de crédito.`}
      badge={`Trial ${PRICING.trialDays} días gratis`}
    >
      <form onSubmit={onSubmit}>
        {error && <AuthError message={error} />}
        <AuthField label="Nombre">
          <AuthInput type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </AuthField>
        <AuthField label="Email">
          <AuthInput type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </AuthField>
        <AuthField label="Contraseña (mínimo 6 caracteres)">
          <AuthInput
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </AuthField>
        <Button3D type="submit" variant="gold" className="w-full mt-2" pulse={!loading}>
          {loading ? 'Creando cuenta…' : 'Crear cuenta y activar trial'}
        </Button3D>
      </form>
      <div className="auth-footer">
        ¿Ya tienes cuenta? <Link href="/entrar">Entrar</Link>
      </div>
    </AuthShell>
  )
}
