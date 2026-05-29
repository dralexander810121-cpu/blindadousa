import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC = ['/', '/inicio', '/como-funciona', '/precios', '/blog', '/directorio', '/entrar', '/registrarse', '/recuperar', '/trial', '/pagar']

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()
  const path = req.nextUrl.pathname
  const isPublic = PUBLIC.some(
    (p) =>
      path === p ||
      path.startsWith(`${p}/`) ||
      path.startsWith('/api/') ||
      path.startsWith('/_next/') ||
      path.startsWith('/og/'),
  )
  if (isPublic) return res

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (setters) =>
          setters.forEach(({ name, value, options }) => res.cookies.set(name, value, options)),
      },
    },
  )
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/entrar', req.url))

  const { data: usuario } = await supabase
    .from('usuarios')
    .select('trial_activo,trial_fin,acceso_pagado')
    .eq('auth_user_id', user.id)
    .single()
  if (!usuario) return NextResponse.redirect(new URL('/trial', req.url))

  const trialOk = usuario.trial_activo && usuario.trial_fin && new Date(usuario.trial_fin) > new Date()
  if (!usuario.acceso_pagado && !trialOk) return NextResponse.redirect(new URL('/pagar', req.url))

  return res
}

export const config = { matcher: ['/dashboard/:path*'] }
