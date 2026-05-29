import type { SupabaseClient } from '@supabase/supabase-js'
import { plaid } from '@/lib/plaid'
import { isWhatsAppConfigured, sendWhatsAppAlert } from '@/lib/whatsapp'

type Db = SupabaseClient

function daysUntil(dateStr: string | null | undefined): number | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return Math.ceil((d.getTime() - Date.now()) / 86400000)
}

function calcUtilization(balance: number, limit: number): number {
  if (!limit || limit <= 0) return 0
  return Math.round((Math.abs(balance) / limit) * 1000) / 10
}

export async function syncPlaidItem(
  db: Db,
  usuarioId: string,
  accessToken: string,
  itemId: string,
) {
  const [balanceRes, liabilitiesRes] = await Promise.all([
    plaid.accountsBalanceGet({ access_token: accessToken }),
    plaid.liabilitiesGet({ access_token: accessToken }).catch(() => null),
  ])

  const creditLiabilities = liabilitiesRes?.data.liabilities?.credit ?? []
  const liabilityByAccount = new Map(creditLiabilities.map((c) => [c.account_id, c]))

  const rows = balanceRes.data.accounts.map((acct) => {
    const bal = acct.balances.current ?? acct.balances.available ?? 0
    const limit = acct.balances.limit ?? 0
    const liability = liabilityByAccount.get(acct.account_id)
    const isCredit = acct.type === 'credit' || acct.subtype === 'credit card'

    return {
      usuario_id: usuarioId,
      plaid_account_id: acct.account_id,
      plaid_item_id: itemId,
      plaid_access_token: accessToken,
      institucion: balanceRes.data.item.institution_id ?? null,
      nombre_cuenta: acct.name,
      tipo: acct.type,
      mask: acct.mask,
      balance_actual: bal,
      limite_credito: limit,
      credito_disponible: acct.balances.available ?? 0,
      pago_minimo: liability?.minimum_payment_amount ?? 0,
      fecha_pago: liability?.next_payment_due_date ?? null,
      fecha_corte: liability?.last_payment_date ?? null,
      apr: liability?.aprs?.[0]?.apr_percentage ?? 0,
      utilizacion: isCredit ? calcUtilization(bal, limit) : 0,
      last_sync: new Date().toISOString(),
      activa: true,
    }
  })

  if (rows.length) {
    await db.from('cuentas_conectadas').upsert(rows, { onConflict: 'plaid_account_id' })
  }

  return rows.length
}

export async function syncAllUserAccounts(db: Db, usuarioId: string) {
  const { data: cuentas } = await db
    .from('cuentas_conectadas')
    .select('plaid_item_id, plaid_access_token')
    .eq('usuario_id', usuarioId)
    .eq('activa', true)

  const items = new Map<string, string>()
  for (const c of cuentas ?? []) {
    if (c.plaid_access_token && c.plaid_item_id) {
      items.set(c.plaid_item_id, c.plaid_access_token)
    }
  }

  let synced = 0
  for (const [itemId, token] of items) {
    synced += await syncPlaidItem(db, usuarioId, token, itemId)
  }
  return synced
}

async function alertExists(db: Db, usuarioId: string, tipo: string, titulo: string) {
  const { data } = await db
    .from('alertas')
    .select('id')
    .eq('usuario_id', usuarioId)
    .eq('tipo', tipo)
    .eq('titulo', titulo)
    .eq('leida', false)
    .limit(1)
  return (data?.length ?? 0) > 0
}

export async function runPaymentMonitor(db: Db, usuarioId: string) {
  const { data: cuentas } = await db
    .from('cuentas_conectadas')
    .select('*')
    .eq('usuario_id', usuarioId)
    .eq('activa', true)

  const created: string[] = []
  const forWhatsApp: { titulo: string; mensaje: string; nivel: string }[] = []

  for (const c of cuentas ?? []) {
    const name = c.nombre_cuenta ?? 'Tu cuenta'
    const payDays = daysUntil(c.fecha_pago)

    if (payDays !== null && payDays >= 0 && payDays <= 3) {
      const titulo = `Pago próximo — ${name}`
      if (!(await alertExists(db, usuarioId, 'pago_proximo', titulo))) {
        const nivel = payDays <= 1 ? 'rojo' : 'amarillo'
        const mensaje = `Vence en ${payDays === 0 ? 'hoy' : `${payDays} día(s)`}. Pago mínimo: $${Number(c.pago_minimo || 0).toFixed(0)}. Paga antes del corte para proteger tu score.`
        await db.from('alertas').insert({
          usuario_id: usuarioId,
          tipo: 'pago_proximo',
          titulo,
          mensaje,
          nivel,
        })
        created.push(titulo)
        forWhatsApp.push({ titulo, mensaje, nivel })
      }
    }

    if (c.fecha_corte) {
      const cutDays = daysUntil(c.fecha_corte)
      if (cutDays !== null && cutDays >= 0 && cutDays <= 1) {
        const titulo = `Corte hoy — ${name}`
        if (!(await alertExists(db, usuarioId, 'corte_hoy', titulo))) {
          await db.from('alertas').insert({
            usuario_id: usuarioId,
            tipo: 'corte_hoy',
            titulo,
            mensaje: `Utilización actual ${Number(c.utilizacion || 0).toFixed(0)}%. El buró reportará este balance en el corte.`,
            nivel: 'amarillo',
          })
          created.push(titulo)
        }
      }
    }

    if (Number(c.utilizacion) > 30) {
      const titulo = `Utilización alta — ${name}`
      if (!(await alertExists(db, usuarioId, 'utilizacion_alta', titulo))) {
        const nivel = Number(c.utilizacion) > 50 ? 'rojo' : 'amarillo'
        const mensaje = `Tu tarjeta está al ${Number(c.utilizacion).toFixed(0)}%. Baja de 30% mejora tu score FICO.`
        await db.from('alertas').insert({
          usuario_id: usuarioId,
          tipo: 'utilizacion_alta',
          titulo,
          mensaje,
          nivel,
        })
        created.push(titulo)
        if (nivel === 'rojo') forWhatsApp.push({ titulo, mensaje, nivel })
      }
    }
  }

  if (forWhatsApp.length && isWhatsAppConfigured()) {
    const { data: u } = await db
      .from('usuarios')
      .select('telefono_whatsapp, whatsapp_opt_in')
      .eq('id', usuarioId)
      .single()

    if (u?.whatsapp_opt_in && u.telefono_whatsapp) {
      const critica = forWhatsApp.find((a) => a.nivel === 'rojo') ?? forWhatsApp[0]
      await sendWhatsAppAlert(
        u.telefono_whatsapp,
        `🛡️ BlindadoUSA\n\n${critica.titulo}\n\n${critica.mensaje}\n\nEntra a tu dashboard para más detalles.`,
      )
    }
  }

  return created
}
