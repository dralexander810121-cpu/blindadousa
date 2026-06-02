/**
 * Smoke test producción — sin credenciales de usuario.
 * node scripts/smoke-live.mjs
 */
const BASE = 'https://blindadousa.com'

async function check(name, url, opts = {}) {
  const t0 = Date.now()
  const res = await fetch(url, { redirect: 'manual', ...opts })
  const ms = Date.now() - t0
  const loc = res.headers.get('location')
  return { name, status: res.status, ms, location: loc }
}

async function main() {
  const routes = [
    ['home', `${BASE}/inicio`],
    ['onboarding', `${BASE}/dashboard/onboarding`],
    ['tarjetas', `${BASE}/dashboard/credito/tarjetas`],
    ['entrar', `${BASE}/entrar`],
  ]

  console.log('--- Rutas (redirect manual) ---')
  for (const [name, url] of routes) {
    const r = await check(name, url)
    console.log(`${name}: HTTP ${r.status} ${r.ms}ms${r.location ? ` → ${r.location}` : ''}`)
  }

  console.log('\n--- APIs sin sesión (esperado 401) ---')
  for (const path of ['/api/perfil', '/api/plaid/create-link-token']) {
    const res = await fetch(`${BASE}${path}`, {
      method: path.includes('perfil') ? 'GET' : 'POST',
    })
    const body = await res.text()
    console.log(`${path}: ${res.status} ${body.slice(0, 80)}`)
  }

  console.log('\n--- Plaid SDK (solo si hay .env.local con keys) ---')
  try {
    const { config } = await import('dotenv')
    const { resolve } = await import('node:path')
    config({ path: resolve(process.cwd(), '.env.local') })
  } catch {
    /* optional */
  }

  const id = process.env.PLAID_CLIENT_ID?.trim()
  const secret = process.env.PLAID_SECRET?.trim()
  if (!id || !secret) {
    console.log('Sin PLAID_* en .env.local — omitiendo test Plaid directo.')
    console.log('En Vercel Production: PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV están configurados.')
    return
  }

  const { Configuration, PlaidApi, PlaidEnvironments } = await import('plaid')
  const env = (process.env.PLAID_ENV || 'sandbox').toLowerCase()
  const plaid = new PlaidApi(
    new Configuration({
      basePath: PlaidEnvironments[env] || PlaidEnvironments.sandbox,
      baseOptions: {
        headers: { 'PLAID-CLIENT-ID': id, 'PLAID-SECRET': secret },
      },
    }),
  )
  const t0 = Date.now()
  const health = await plaid.institutionsGet({ count: 1, offset: 0, country_codes: ['US'] })
  console.log(`Plaid institutionsGet OK en ${Date.now() - t0}ms (env=${env})`)
  console.log(`Institución ejemplo: ${health.data.institutions[0]?.name ?? 'n/a'}`)
}

main().catch((e) => {
  console.error('FAIL', e.message)
  process.exit(1)
})
