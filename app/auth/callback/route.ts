import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createAdmin } from '@/lib/supabase/server'
import { PRICING } from '@/lib/siteFacts'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/entrar?error=auth`)
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    },
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return NextResponse.redirect(`${origin}/entrar?error=auth`)
  }

  // Activación de trial tras confirmar email (caso "confirmar email" donde el
  // signUp no devolvió sesión y /api/trial/activar respondió 401). Idempotente
  // y solo para el flujo de trial (next contiene trial=1). Nunca rompe el
  // redirect de auth: si algo falla, se ignora.
  if (next.includes('trial=1') && data?.user) {
    try {
      const u = data.user
      const db = createAdmin()
      const { data: existing } = await db
        .from('usuarios')
        .select('trial_usado, acceso_pagado')
        .eq('auth_user_id', u.id)
        .single()
      if (!existing?.trial_usado && !existing?.acceso_pagado) {
        const ahora = new Date()
        const fin = new Date(ahora.getTime() + PRICING.trialDays * 24 * 60 * 60 * 1000)
        await db.from('usuarios').upsert({
          auth_user_id: u.id,
          email: (u.email || '').trim().toLowerCase(),
          trial_activo: true,
          trial_inicio: ahora.toISOString(),
          trial_fin: fin.toISOString(),
          trial_usado: true,
          acceso_pagado: false,
        }, { onConflict: 'auth_user_id' })
      }
    } catch {
      // no-op: la activación de trial nunca debe impedir el login
    }
  }

  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard'
  return NextResponse.redirect(`${origin}${safeNext}`)
}

export const dynamic = 'force-dynamic'
