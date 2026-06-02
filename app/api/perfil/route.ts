import { getAuthenticatedUsuario } from '@/lib/dashboard/auth'
import { normalizeMayorPreocupacion, perfilErrorMessage } from '@/lib/perfil/mayorPreocupacion'

export async function GET() {
  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data: perfil } = await supabase
    .from('perfil_financiero')
    .select('*')
    .eq('usuario_id', usuario.id)
    .maybeSingle()

  return Response.json({
    perfil,
    onboarding_completo: Boolean(perfil?.credit_score || perfil?.ingreso_mensual),
  })
}

export async function POST(req: Request) {
  const { supabase, usuario } = await getAuthenticatedUsuario()
  if (!usuario) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = (await req.json().catch(() => null)) ?? {}

  const row = {
    usuario_id: usuario.id,
    credit_score: body.credit_score != null ? Number(body.credit_score) : null,
    ingreso_mensual: body.ingreso_mensual != null ? Number(body.ingreso_mensual) : null,
    gastos_mensuales: body.gastos_mensuales != null ? Number(body.gastos_mensuales) : null,
    deuda_total: body.deuda_total != null ? Number(body.deuda_total) : null,
    tiene_ssn: Boolean(body.tiene_ssn),
    tiene_itin: Boolean(body.tiene_itin),
    tiene_cuenta_banco: Boolean(body.tiene_cuenta_banco),
    envia_remesas: Boolean(body.envia_remesas),
    monto_remesas: body.monto_remesas != null ? Number(body.monto_remesas) : null,
    pais_remesas: body.pais_remesas || null,
    tiene_carro: Boolean(body.tiene_carro),
    tiene_casa: Boolean(body.tiene_casa),
    mayor_preocupacion: normalizeMayorPreocupacion(body.mayor_preocupacion),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('perfil_financiero')
    .upsert(row, { onConflict: 'usuario_id' })
    .select()
    .single()

  if (error) {
    return Response.json({ error: perfilErrorMessage(error.message) }, { status: 500 })
  }

  if (body.estado && typeof body.estado === 'string') {
    await supabase.from('usuarios').update({ estado: body.estado }).eq('id', usuario.id)
  }

  if (body.telefono_whatsapp != null || body.whatsapp_opt_in != null) {
    const userPatch: Record<string, unknown> = {}
    if (body.whatsapp_opt_in != null) userPatch.whatsapp_opt_in = Boolean(body.whatsapp_opt_in)
    if (body.telefono_whatsapp) {
      const { normalizePhoneE164 } = await import('@/lib/whatsapp')
      userPatch.telefono_whatsapp = normalizePhoneE164(String(body.telefono_whatsapp))
    } else if (body.whatsapp_opt_in === false) {
      userPatch.telefono_whatsapp = null
    }
    if (Object.keys(userPatch).length) {
      await supabase.from('usuarios').update(userPatch).eq('id', usuario.id)
    }
  }

  return Response.json({ ok: true, perfil: data, onboarding_completo: true })
}

export const dynamic = 'force-dynamic'
