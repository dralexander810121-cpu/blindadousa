import { CODIGO_FIJO } from '@/lib/stripe'
import { createAdmin } from '@/lib/supabase/server'

export async function validateCheckoutUser(email: string) {
  const normalizedEmail = email.trim().toLowerCase()
  const db = createAdmin()
  const { data: cuenta } = await db
    .from('usuarios')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle()
  if (!cuenta) {
    return {
      ok: false as const,
      error:
        'No encontramos una cuenta con ese email. Crea tu trial gratis en /trial con el mismo email antes de pagar.',
    }
  }
  return { ok: true as const, email: normalizedEmail, db }
}

export async function validateReferralCode(
  db: ReturnType<typeof createAdmin>,
  codigo: string | undefined,
) {
  if (!codigo) return false
  if (codigo.toUpperCase() === CODIGO_FIJO) return true
  const { data } = await db
    .from('usuarios')
    .select('id')
    .eq('mi_codigo', codigo.toUpperCase())
    .single()
  return !!data
}
