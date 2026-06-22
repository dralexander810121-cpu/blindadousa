import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login?next=' + pathname, request.url))
  }

  const { data: ent } = await supabase
    .from('user_entitlements')
    .select('has_blindado, subscription_status')
    .eq('user_id', user.id)
    .single()

  const hasBlindado = ent?.has_blindado && ent?.subscription_status === 'active'

  if (!hasBlindado) {
    return NextResponse.redirect(new URL('/precios', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
