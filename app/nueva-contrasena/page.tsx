'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthError, AuthField, AuthInput, AuthShell } from '@/components/landing/AuthShell'
import { Button3D } from '@/components/ui/Button3D'
import { mapAuthError } from '@/lib/authErrors'
import { createClient } from '@/lib/supabase/client'

export default function NuevaContrasenaPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
      else setError('Enlace expirado o inválido. Solicita uno nuevo.')
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('Mínimo 6 caracteres')
      return
    }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) setError(mapAuthError(updateError.message))
    else router.push('/entrar?reset=ok')
    setLoading(false)
  }

  return (
    <AuthShell title="Nueva contraseña" subtitle="Elige una contraseña segura de al menos 6 caracteres.">
      <form onSubmit={handleSubmit}>
        {error && <AuthError message={error} />}
        <AuthField label="Nueva contraseña">
          <AuthInput
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!ready && !!error}
          />
        </AuthField>
        <AuthField label="Confirmar contraseña">
          <AuthInput
            type="password"
            placeholder="Repite la contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            disabled={!ready && !!error}
          />
        </AuthField>
        <Button3D type="submit" variant="gold" className="w-full mt-2">
          {loading ? 'Guardando…' : 'Guardar nueva contraseña'}
        </Button3D>
      </form>
      <div className="auth-footer">
        <Link href="/recuperar">Solicitar nuevo enlace</Link>
        {' · '}
        <Link href="/entrar">Volver al login</Link>
      </div>
    </AuthShell>
  )
}
