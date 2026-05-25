import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
export async function createClient() {
  const c = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return c.getAll() }, setAll(s) { try { s.forEach(({name,value,options}) => c.set(name,value,options)) } catch {} } } }
  )
}
export const createAdmin = () => { const {createClient:cc} = require('@supabase/supabase-js'); return cc(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!) }

// Backward-compatible alias used by older pages/routes.
export const createSupabaseServerClient = createClient
