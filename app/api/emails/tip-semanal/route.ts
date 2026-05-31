import { createAdmin } from '@/lib/supabase/server'
import { verifyCronRequest } from '@/lib/ia/auth-cron'
import { Resend } from 'resend'

function getResend() { const k = process.env.RESEND_API_KEY; return k ? new Resend(k) : null }
const FROM = `${process.env.RESEND_FROM_NAME || 'BlindadoUSA'} <${process.env.RESEND_FROM_EMAIL || 'hola@blindadousa.com'}>`

const TIPS = [
  {
    asunto: 'Tip de crédito: el error #1 que baja tu score',
    cuerpo: 'Usar más del 30% de tu límite de crédito disponible es el error más común. La IA Maestra de BlindadoUSA te avisa antes de que pase.',
  },
  {
    asunto: 'Tip: disputa un error en tu reporte esta semana',
    cuerpo: '1 de cada 5 personas tiene un error en su reporte de crédito. Abre BlindadoUSA → Disputas → la IA lo redacta por ti en 2 minutos.',
  },
  {
    asunto: 'Tip: cómo subir 40 puntos en 60 días',
    cuerpo: 'El método más rápido: paga saldos para bajar utilización al 10%, disputa errores, y no abras tarjetas nuevas. Tu IA Maestra te guía paso a paso.',
  },
  {
    asunto: 'Tip: entiende tu reporte de crédito en 5 minutos',
    cuerpo: 'Equifax, Experian, TransUnion — los 3 reportes pueden ser diferentes. En BlindadoUSA puedes analizarlos con IA y saber exactamente qué mejorar.',
  },
]

export async function POST(req: Request) {
  if (!verifyCronRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const resend = getResend()
  if (!resend) return Response.json({ ok: false, error: 'RESEND_API_KEY no configurada' }, { status: 503 })

  const db = createAdmin()
  const { data: usuarios } = await db
    .from('usuarios')
    .select('email, nombre')
    .eq('acceso_pagado', true)

  if (!usuarios?.length) return Response.json({ ok: true, enviados: 0 })

  const tip = TIPS[new Date().getDate() % TIPS.length]
  let enviados = 0

  for (const u of usuarios) {
    try {
      await resend.emails.send({
        from: FROM,
        to: u.email,
        subject: tip.asunto,
        html: `
          <p>Hola ${u.nombre || 'allí'},</p>
          <p>${tip.cuerpo}</p>
          <p style="text-align:center; margin:24px 0;">
            <a href="https://blindadousa.com/dashboard" style="background:#2563eb;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Abrir BlindadoUSA →
            </a>
          </p>
          <p style="color:#6b7280;font-size:12px;">Recibes esto porque eres miembro de BlindadoUSA. <a href="https://blindadousa.com/dashboard/configuracion">Gestionar notificaciones</a></p>
        `,
      })
      enviados++
    } catch { /* continuar con el siguiente */ }
  }

  return Response.json({ ok: true, enviados })
}

export const dynamic = 'force-dynamic'
