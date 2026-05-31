import type { SupabaseClient } from '@supabase/supabase-js'
import { generarCodigo, checkoutAmountCents, type CheckoutPlan } from '@/lib/stripe'
import { processReferralPayout } from '@/lib/referidos/payout'
import { ensureUsuarioByEmail } from '@/lib/usuarios/ensureByEmail'

type Db = SupabaseClient

export type ActivateSubscriptionInput = {
  email: string
  plan: CheckoutPlan
  codigo?: string | null
  descuento: boolean
  precioPagado?: number
  externalCustomerId?: string | null
  externalSubscriptionId?: string | null
  paymentProvider?: 'lemonsqueezy' | 'stripe' | 'paypal' | 'klarna'
}

export async function activateSubscriptionAccess(db: Db, input: ActivateSubscriptionInput) {
  const email = input.email.trim().toLowerCase()
  if (!email) return { ok: false as const, reason: 'no_email' as const }

  const user = await ensureUsuarioByEmail(db, email)
  if (!user) return { ok: false as const, reason: 'no_user' as const }

  const precioPagado =
    input.precioPagado ?? checkoutAmountCents(input.plan, input.descuento) / 100
  const codigo = input.codigo?.trim() || null
  const miCodigo = generarCodigo(user.nombre || email)

  await db
    .from('usuarios')
    .update({
      acceso_pagado: true,
      trial_activo: false,
      fecha_pago: new Date().toISOString(),
      precio_pagado: precioPagado,
      codigo_usado: codigo,
      mi_codigo: miCodigo,
      stripe_customer_id: input.externalCustomerId ?? null,
      stripe_subscription_id: input.externalSubscriptionId ?? null,
    })
    .eq('email', email)

  if (codigo && codigo.toUpperCase() !== 'AETHERIS') {
    const { data: ref } = await db
      .from('usuarios')
      .select('id,referidos_count')
      .eq('mi_codigo', codigo.toUpperCase())
      .single()
    if (ref) {
      await db
        .from('usuarios')
        .update({ referidos_count: (ref.referidos_count || 0) + 1 })
        .eq('id', ref.id)
      const { data: refRow } = await db
        .from('referidos')
        .insert({
          codigo,
          referidor_id: ref.id,
          referido_id: user.id,
          precio_pagado: precioPagado,
          referido_nombre: user.nombre || email,
        })
        .select('id')
        .single()
      if (refRow?.id) {
        await processReferralPayout(db, {
          referidorId: ref.id,
          referidoId: user.id,
          referidosId: refRow.id,
          referidoNombre: user.nombre || email,
        })
      }
    }
  }

  return { ok: true as const, userId: user.id }
}

export async function revokeSubscriptionAccess(db: Db, externalSubscriptionId: string) {
  await db
    .from('usuarios')
    .update({ acceso_pagado: false })
    .eq('stripe_subscription_id', externalSubscriptionId)
}
