import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { isWhatsAppConfigured, normalizePhoneE164 } from '@/lib/whatsapp'

export async function GET() {
  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data } = await supabase
    .from('usuarios')
    .select('telefono_whatsapp, whatsapp_opt_in')
    .eq('id', usuario.id)
    .single()

  return Response.json({
    configured: isWhatsAppConfigured(),
    telefono_whatsapp: data?.telefono_whatsapp ?? null,
    whatsapp_opt_in: Boolean(data?.whatsapp_opt_in),
  })
}

export async function POST(req: Request) {
  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const optIn = Boolean(body.whatsapp_opt_in)
  const telefono = body.telefono_whatsapp?.trim()

  if (optIn && !telefono) {
    return Response.json({ error: 'Número de WhatsApp requerido' }, { status: 400 })
  }

  const update: Record<string, unknown> = {
    whatsapp_opt_in: optIn,
    telefono_whatsapp: optIn && telefono ? normalizePhoneE164(telefono) : null,
  }

  const { error } = await supabase.from('usuarios').update(update).eq('id', usuario.id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true, ...update })
}

export const dynamic = 'force-dynamic'
