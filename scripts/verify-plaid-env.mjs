import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

function loadEnvFile(file) {
  try {
    const text = readFileSync(resolve(process.cwd(), file), 'utf8')
    for (const line of text.split(/\r?\n/)) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const i = t.indexOf('=')
      if (i < 1) continue
      const key = t.slice(0, i).trim()
      let val = t.slice(i + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      process.env[key] = val
    }
  } catch {
    /* ignore */
  }
}

loadEnvFile('.env.vercel.production')

const id = process.env.PLAID_CLIENT_ID?.trim()
const secret = process.env.PLAID_SECRET?.trim()
const env = (process.env.PLAID_ENV || 'sandbox').toLowerCase()

if (!id || !secret) {
  console.error('FALTA PLAID_CLIENT_ID o PLAID_SECRET en .env.vercel.production')
  process.exit(1)
}

const plaid = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments[env] || PlaidEnvironments.sandbox,
    baseOptions: { headers: { 'PLAID-CLIENT-ID': id, 'PLAID-SECRET': secret } },
  }),
)

const t0 = Date.now()
const res = await plaid.linkTokenCreate({
  user: { client_user_id: 'smoke-test-user' },
  client_name: 'BlindadoUSA',
  products: ['auth', 'transactions', 'liabilities'],
  country_codes: ['US'],
  language: 'es',
})
console.log(`OK linkTokenCreate ${Date.now() - t0}ms env=${env} token_len=${res.data.link_token?.length ?? 0}`)
