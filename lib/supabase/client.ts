import { createBrowserClient } from '@supabase/ssr'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key-placeholder'

export const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey)

// Backward-compatible alias used by older pages/routes.
export const createSupabaseBrowserClient = createClient
