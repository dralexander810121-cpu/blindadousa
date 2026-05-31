import { createAdmin } from '@/lib/supabase/server'
import { verifyCronRequest } from '@/lib/ia/auth-cron'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = `${process.env.RESEND_FROM_NAME || 'BlindadoUSA'} <${process.env.RESEND_FROM_EMAIL || 'hola@blindadousa.com'}>`

export async function GET(req: Request) {
  if (!verifyCronRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = createAdmin()
  const now = new Date()
  const windowStart = new Date(now.getTime() - 60 * 60 * 1000).toISOString()
  const windowEnd   = new Date(now.getTime() + 60 * 60 * 1000).toISOString()

  const { data: usuarios } = await db
    .from('usuarios')
    .select('email, nombre')
    .eq('trial_activo', true)
    .eq('acceso_pagado', false)
    .gte('trial_fin', windowStart)
    .lt('trial_fin', windowEnd)

  if (!usuarios?.length) return Response.json({ ok: true, enviados: 0 })

  let enviados = 0
  for (const u of usuarios) {
    try {
      await resend.emails.send({
        from: FROM,
        to: u.email,
        subject: '⚠️ Tu prueba de BlindadoUSA termina hoy',
        html: `
          <p>Hola ${u.nombre || 'allí'},</p>
          <p>Tu prueba gratuita de <strong>BlindadoUSA</strong> termina <strong>hoy</strong>.</p>
          <p>No pierdas el acceso a tu IA Maestra de crédito, análisis de cuentas y disputas automáticas.</p>
          <p style="text-align:center; margin:24px 0;">
            <a href="https://blindadousa.com/pagar" style="background:#dc2626;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">
              Activar mi cuenta ahora →
            </a>
          </p>
          <p>Si tienes preguntas, responde este email. Te contestamos en minutos.</p>
          <p>— El equipo de BlindadoUSA</p>
        `,
      })
      enviados++
    } catch { /* continuar con el siguiente */ }
  }

  return Response.json({ ok: true, enviados })
}

export const dynamic = 'force-dynamic'
