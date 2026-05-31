'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  AuthError,
  AuthField,
  AuthInput,
  AuthShell,
  AuthSuccess,
} from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { createClient } from '@/lib/supabase/client'
import { mapAuthError } from '@/lib/authErrors'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/nueva-contrasena')}`,
    })
    if (resetError) setError(mapAuthError(resetError.message))
    else setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <AuthSuccess
        title="Revisa tu email"
        body={
          <>
            Te enviamos un enlace para restablecer tu contraseña.
            <br />
            Revisa también la carpeta de spam.
            <br />
            <Link href="/entrar" className="inline-block mt-4 text-[var(--cyan-bright)] underline">
              Volver al login
            </Link>
          </>
        }
      />
    )
  }

  return (
    <AuthShell
      title="Recuperar contraseña"
      subtitle="Ingresa tu email y te enviamos un enlace seguro para restablecerla."
    >
      <form onSubmit={handleSubmit}>
        {error && <AuthError message={error} />}
        <AuthField label="Email">
          <AuthInput
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </AuthField>
        <Button3D type="submit" variant="gold" className="w-full mt-2">
          {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
        </Button3D>
      </form>
      <div className="auth-footer">
        <Link href="/entrar">Volver al login</Link>
      </div>
    </AuthShell>
  )
}
