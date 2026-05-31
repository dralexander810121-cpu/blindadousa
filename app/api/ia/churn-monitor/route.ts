import { createAdmin } from '@/lib/supabase/server'
import { verifyCronRequest } from '@/lib/ia/auth-cron'
import { calcularChurnRisk } from '@/lib/churn/score'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

function getResend() { const k = process.env.RESEND_API_KEY; return k ? new Resend(k) : null }
const FROM = `${process.env.RESEND_FROM_NAME || 'BlindadoUSA'} <${process.env.RESEND_FROM_EMAIL || 'hola@blindadousa.com'}>`

export async function GET(req: Request) {
  if (!verifyCronRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const resend = getResend()
  if (!resend) return Response.json({ ok: false, error: 'RESEND_API_KEY no configurada' }, { status: 503 })

  const db = createAdmin()

  // Usuarios en trial activo, sin pagar
  const { data: usuarios } = await db
    .from('usuarios')
    .select('id, email, nombre, trial_fin, churn_email_at')
    .eq('trial_activo', true)
    .eq('acceso_pagado', false)

  if (!usuarios?.length) return Response.json({ ok: true, evaluados: 0, emails: 0 })

  const ahora = Date.now()
  let emails = 0
  let altos = 0

  for (const u of usuarios) {
    // Señales de engagement en paralelo
    const [{ data: perfil }, { count: cuentas }, { count: mensajes }] = await Promise.all([
      db.from('perfil_financiero').select('credit_score').eq('usuario_id', u.id).maybeSingle(),
      db.from('cuentas_conectadas').select('*', { count: 'exact', head: true }).eq('usuario_id', u.id).eq('activa', true),
      db.from('chat_historial').select('*', { count: 'exact', head: true }).eq('usuario_id', u.id).eq('rol', 'user'),
    ])

    const horasParaFin = u.trial_fin
      ? (new Date(u.trial_fin).getTime() - ahora) / 3_600_000
      : null

    const riesgo = calcularChurnRisk({
      tienePerfil: Boolean(perfil?.credit_score),
      cuentasConectadas: cuentas ?? 0,
      mensajesIA: mensajes ?? 0,
      horasParaFinTrial: horasParaFin,
    })

    await db
      .from('usuarios')
      .update({ churn_risk: riesgo.score, churn_checked_at: new Date().toISOString() })
      .eq('id', u.id)

    if (riesgo.nivel === 'alto') altos++

    // Email de retención: solo riesgo alto, máximo 1 cada 48h, trial aún vigente
    const yaEnviado = u.churn_email_at && ahora - new Date(u.churn_email_at).getTime() < 48 * 3_600_000
    const trialVigente = horasParaFin == null || horasParaFin > 0
    if (riesgo.nivel === 'alto' && !yaEnviado && trialVigente) {
      try {
        await resend.emails.send({
          from: FROM,
          to: u.email,
          subject: 'No dejes tu dinero sobre la mesa 💸',
          html: `
            <p>Hola ${u.nombre || 'allí'},</p>
            <p>Vimos que empezaste tu prueba de <strong>BlindadoUSA</strong> pero aún no le has sacado provecho.</p>
            <p>${riesgo.gancho}</p>
            <p style="text-align:center; margin:24px 0;">
              <a href="https://blindadousa.com/dashboard" style="background:#2563eb;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">
                Entrar a mi cuenta →
              </a>
            </p>
            <p>Estamos aquí para ayudarte a blindar tu futuro financiero. Responde este email si tienes dudas.</p>
            <p>— El equipo de BlindadoUSA</p>
          `,
        })
        await db.from('usuarios').update({ churn_email_at: new Date().toISOString() }).eq('id', u.id)
        emails++
      } catch {
        /* continuar con el siguiente */
      }
    }
  }

  return Response.json({ ok: true, evaluados: usuarios.length, riesgo_alto: altos, emails })
}
