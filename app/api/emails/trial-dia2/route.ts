import { createAdmin } from '@/lib/supabase/server'
import { verifyCronRequest } from '@/lib/ia/auth-cron'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = `${process.env.RESEND_FROM_NAME || 'BlindadoUSA'} <${process.env.RESEND_FROM_EMAIL || 'hola@blindadousa.com'}>`

export async function GET(req: Request) {
  if (!verifyCronRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = createAdmin()
  const cutoffStart = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  const cutoffEnd   = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()

  const { data: usuarios } = await db
    .from('usuarios')
    .select('email, nombre')
    .eq('trial_activo', true)
    .eq('acceso_pagado', false)
    .gte('created_at', cutoffStart)
    .lt('created_at', cutoffEnd)

  if (!usuarios?.length) return Response.json({ ok: true, enviados: 0 })

  let enviados = 0
  for (const u of usuarios) {
    try {
      await resend.emails.send({
        from: FROM,
        to: u.email,
        subject: '¿Cómo va tu crédito? Te queda 1 día de prueba gratis',
        html: `
          <p>Hola ${u.nombre || 'allí'},</p>
          <p>Ya llevas 2 días usando <strong>BlindadoUSA</strong>. Mañana termina tu prueba gratuita.</p>
          <p>Muchos usuarios mejoran hasta <strong>80 puntos de crédito</strong> en 90 días usando nuestra IA Maestra todos los días.</p>
          <p style="text-align:center; margin:24px 0;">
            <a href="https://blindadousa.com/pagar" style="background:#2563eb;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Continuar por $19/mes →
            </a>
          </p>
          <p>Sin contratos. Cancela cuando quieras.</p>
          <p>— El equipo de BlindadoUSA</p>
        `,
      })
      enviados++
    } catch { /* continuar con el siguiente */ }
  }

  return Response.json({ ok: true, enviados })
}

export const dynamic = 'force-dynamic'
