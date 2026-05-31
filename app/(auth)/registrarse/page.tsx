'use client'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  AuthError,
  AuthField,
  AuthInput,
  AuthShell,
  AuthSuccess,
} from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { mapAuthError } from '@/lib/authErrors'
import { PRICING } from '@/lib/siteFacts'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

function RegistrarseForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/bienvenido?trial=1'
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsConfirm, setNeedsConfirm] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    const origin = window.location.origin
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre },
        emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (signUpError) {
      setLoading(false)
      setError(mapAuthError(signUpError.message))
      return
    }
    if (!data.user) {
      setLoading(false)
      setError('No se pudo crear la cuenta. Intenta de nuevo.')
      return
    }

    await supabase.from('usuarios').upsert(
      { auth_user_id: data.user.id, email: email.trim().toLowerCase(), nombre },
      { onConflict: 'auth_user_id' },
    )

    const trialRes = await fetch('/api/trial/activar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        nombre,
        userId: data.user.id,
      }),
    })

    setLoading(false)

    if (!trialRes.ok) {
      const trialErr = await trialRes.json().catch(() => ({}))
      if (trialErr.error?.includes('Ya usaste')) {
        router.push('/pagar')
        return
      }
      setError(trialErr.error || 'Cuenta creada pero no se activó el trial. Entra e intenta de nuevo.')
      return
    }

    if (data.session) {
      router.push(next)
      router.refresh()
      return
    }

    setNeedsConfirm(true)
  }

  if (needsConfirm) {
    return (
      <AuthSuccess
        title="Revisa tu email"
        body={
          <>
            Te enviamos un enlace para confirmar tu cuenta y activar tu trial de {PRICING.trialDays}{' '}
            días.
            <br />
            Revisa también la carpeta de spam.
            <br />
            <Link href="/entrar" className="inline-block mt-4 text-[var(--cyan-bright)] underline">
              Ya confirmé — entrar
            </Link>
          </>
        }
      />
    )
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

export default function RegistrarsePage() {
  return (
    <Suspense fallback={<AuthShell title="Cargando…" subtitle=""><span /></AuthShell>}>
      <RegistrarseForm />
    </Suspense>
  )
}
