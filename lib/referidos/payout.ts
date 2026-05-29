import type { SupabaseClient } from '@supabase/supabase-js'
import { isWhatsAppConfigured, sendWhatsAppAlert } from '@/lib/whatsapp'

type Db = SupabaseClient

export const COMISION_REFERIDO_USD = 5

const PLAID_BASE: Record<string, string> = {
  sandbox: 'https://sandbox.plaid.com',
  development: 'https://development.plaid.com',
  production: 'https://production.plaid.com',
}

function plaidBaseUrl() {
  const env = (process.env.PLAID_ENV || 'sandbox').toLowerCase()
  return PLAID_BASE[env] || PLAID_BASE.sandbox
}

function plaidSecret() {
  return process.env.PLAID_TRANSFER_SECRET?.trim() || process.env.PLAID_SECRET?.trim()
}

export function isPlaidTransferEnabled(): boolean {
  return (
    process.env.PLAID_TRANSFER_ENABLED === 'true' &&
    Boolean(process.env.PLAID_CLIENT_ID?.trim() && plaidSecret())
  )
}

async function plaidPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${plaidBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
      'PLAID-SECRET': plaidSecret()!,
    },
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as T & { error_message?: string; error_code?: string }
  if (!res.ok) {
    throw new Error(data.error_message || data.error_code || `Plaid ${res.status}`)
  }
  return data
}

type PayoutAccount = {
  plaid_account_id: string
  plaid_access_token: string
  nombre_cuenta: string | null
}

async function findPayoutAccount(db: Db, usuarioId: string): Promise<PayoutAccount | null> {
  const { data: cuentas } = await db
    .from('cuentas_conectadas')
    .select('plaid_account_id, plaid_access_token, nombre_cuenta, tipo')
    .eq('usuario_id', usuarioId)
    .eq('activa', true)

  const depository =
    cuentas?.find((c) => c.tipo === 'depository') ||
    cuentas?.find((c) => (c.tipo || '').includes('checking')) ||
    cuentas?.[0]

  if (!depository?.plaid_access_token || !depository.plaid_account_id) return null
  return depository as PayoutAccount
}

async function createAchCredit(
  accessToken: string,
  accountId: string,
  legalName: string,
  amountUsd: number,
): Promise<string> {
  const amount = amountUsd.toFixed(2)
  const auth = await plaidPost<{ authorization: { id: string } }>(
    '/transfer/authorization/create',
    {
      access_token: accessToken,
      account_id: accountId,
      type: 'credit',
      network: 'ach',
      amount,
      ach_class: 'ppd',
      user: { legal_name: legalName.slice(0, 100) || 'BlindadoUSA User' },
    },
  )

  const transfer = await plaidPost<{ transfer: { id: string } }>('/transfer/create', {
    access_token: accessToken,
    account_id: accountId,
    authorization_id: auth.authorization.id,
    description: 'BlindadoUSA referido',
  })

  return transfer.transfer.id
}

export type ProcessReferralPayoutInput = {
  referidorId: string
  referidoId: string
  referidosId: string
  referidoNombre?: string
  /** En reintentos: no volver a sumar ganancias si ya estaba programado/completada */
  creditGanancias?: boolean
  notifyWhatsApp?: boolean
}

export async function processReferralPayout(db: Db, input: ProcessReferralPayoutInput) {
  const {
    referidorId,
    referidosId,
    referidoNombre,
    creditGanancias = true,
    notifyWhatsApp = true,
  } = input

  const { data: existing } = await db
    .from('referidos')
    .select('transferencia_estado')
    .eq('id', referidosId)
    .maybeSingle()
  if (existing?.transferencia_estado === 'completada') {
    return { ok: true, estado: 'completada' as const, plaidTransferId: null }
  }

  const { data: referidor } = await db
    .from('usuarios')
    .select('id, nombre, email, telefono_whatsapp, whatsapp_opt_in, ganancias_referidos, cuenta_pago_plaid_id')
    .eq('id', referidorId)
    .single()

  if (!referidor) return { ok: false, estado: 'error' as const, reason: 'referidor_no_encontrado' }

  let cuenta = await findPayoutAccount(db, referidorId)
  if (!cuenta && referidor.cuenta_pago_plaid_id) {
    const { data: pinned } = await db
      .from('cuentas_conectadas')
      .select('plaid_account_id, plaid_access_token, nombre_cuenta')
      .eq('usuario_id', referidorId)
      .eq('plaid_account_id', referidor.cuenta_pago_plaid_id)
      .eq('activa', true)
      .maybeSingle()
    if (pinned?.plaid_access_token) cuenta = pinned as PayoutAccount
  }

  const legalName = referidor.nombre || referidor.email?.split('@')[0] || 'Usuario BlindadoUSA'
  let estado = 'pendiente'
  let plaidTransferId: string | null = null
  let errorMsg: string | null = null

  if (!cuenta) {
    estado = 'sin_cuenta'
    errorMsg = 'Conecta tu cuenta bancaria en el dashboard para recibir los $5.'
  } else if (isPlaidTransferEnabled()) {
    try {
      estado = 'procesando'
      await db.from('referidos').update({ transferencia_estado: estado }).eq('id', referidosId)
      plaidTransferId = await createAchCredit(
        cuenta.plaid_access_token,
        cuenta.plaid_account_id,
        legalName,
        COMISION_REFERIDO_USD,
      )
      estado = 'completada'
      const userUpdate: Record<string, unknown> = {
        cuenta_pago_plaid_id: cuenta.plaid_account_id,
      }
      if (creditGanancias) {
        userUpdate.ganancias_referidos = Number(referidor.ganancias_referidos || 0) + COMISION_REFERIDO_USD
      }
      await db.from('usuarios').update(userUpdate).eq('id', referidorId)
    } catch (e) {
      estado = 'error'
      errorMsg = e instanceof Error ? e.message : 'transfer_failed'
      console.error('referral_payout_plaid', errorMsg)
    }
  } else if (existing?.transferencia_estado === 'programado' && cuenta) {
    estado = 'programado'
    errorMsg = 'Plaid Transfer aún no está activo. Tu comisión ya está acreditada en el dashboard.'
  } else {
    estado = 'programado'
    errorMsg = 'Depósito en cola — se procesará cuando Plaid Transfer esté activo en producción.'
    if (creditGanancias) {
      await db
        .from('usuarios')
        .update({
          ganancias_referidos: Number(referidor.ganancias_referidos || 0) + COMISION_REFERIDO_USD,
        })
        .eq('id', referidorId)
    }
  }

  await db
    .from('referidos')
    .update({
      transferencia_estado: estado,
      plaid_transfer_id: plaidTransferId,
      error_transferencia: errorMsg,
      referido_nombre: referidoNombre || null,
      monto_comision: COMISION_REFERIDO_USD,
      pagado_at: estado === 'completada' || estado === 'programado' ? new Date().toISOString() : null,
    })
    .eq('id', referidosId)

  if (
    notifyWhatsApp &&
    referidor.whatsapp_opt_in &&
    referidor.telefono_whatsapp &&
    isWhatsAppConfigured() &&
    (estado === 'completada' || (estado === 'programado' && creditGanancias))
  ) {
    const nombre = referidoNombre || 'tu amigo'
    await sendWhatsAppAlert(
      referidor.telefono_whatsapp,
      estado === 'completada'
        ? `¡${nombre} se unió a BlindadoUSA con tu código! Depositamos $${COMISION_REFERIDO_USD} en tu cuenta (llega en 1-3 días hábiles).`
        : `¡${nombre} pagó con tu código! Tienes $${COMISION_REFERIDO_USD} acreditados — conecta tu banco en el dashboard para el depósito ACH.`,
    )
  }

  return { ok: estado === 'completada' || estado === 'programado', estado, plaidTransferId }
}

/** Reintenta depósitos pendientes (cron). */
export async function retryPendingReferralPayouts(db: Db, limit = 25) {
  const { data: rows } = await db
    .from('referidos')
    .select('id, referidor_id, referido_id, referido_nombre, transferencia_estado')
    .in('transferencia_estado', ['sin_cuenta', 'programado', 'error', 'pendiente'])
    .order('created_at', { ascending: true })
    .limit(limit)

  let processed = 0
  let completed = 0

  for (const row of rows ?? []) {
    if (!row.referidor_id || !row.referido_id) continue
    const alreadyCredited = row.transferencia_estado === 'programado'
    const result = await processReferralPayout(db, {
      referidorId: row.referidor_id,
      referidoId: row.referido_id,
      referidosId: row.id,
      referidoNombre: row.referido_nombre ?? undefined,
      creditGanancias: !alreadyCredited,
      notifyWhatsApp: !alreadyCredited && row.transferencia_estado === 'sin_cuenta',
    })
    processed++
    if (result.estado === 'completada') completed++
  }

  return { processed, completed }
}
