'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    })
    if (error) {
      setLoading(false)
      setError(error.message)
      return
    }
    // Crear row en tabla usuarios
    if (data.user) {
      await supabase.from('usuarios').upsert(
        { auth_user_id: data.user.id, email, nombre },
        { onConflict: 'auth_user_id' }
      )
    }
    setLoading(false)
    router.push('/trial')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-pale flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Crea tu cuenta</h1>
        <p className="text-muted mb-6">Empezás con 3 días gratis. Sin tarjeta de crédito.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-base" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña (mínimo 6 caracteres)</label>
            <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-base" />
          </div>
          {error && <p className="alert-rojo text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creando cuenta…' : 'Crear cuenta y activar trial gratis'}
          </button>
        </form>
        <p className="mt-6 text-sm text-center">
          ¿Ya tenés cuenta? <Link href="/entrar" className="text-primary font-bold hover:underline">Entrá</Link>
        </p>
      </div>
    </main>
  )
}
