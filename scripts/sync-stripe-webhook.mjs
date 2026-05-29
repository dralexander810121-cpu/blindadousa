#!/usr/bin/env node
/**
 * Sincroniza eventos del webhook de Stripe con lib/stripe/webhook-events.ts
 * Uso: node scripts/sync-stripe-webhook.mjs
 * Lee STRIPE_SECRET_KEY de .env.vercel.production o process.env
 */
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const REQUIRED_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.deleted',
  'customer.subscription.updated',
  'invoice.payment_failed',
]

const WEBHOOK_PATH = '/api/stripe/webhook'

function loadEnvFile(path) {
  if (!existsSync(path)) return {}
  const out = {}
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i === -1) continue
    const key = t.slice(0, i)
    let val = t.slice(i + 1)
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

function getSecretKey() {
  const fromEnv = process.env.STRIPE_SECRET_KEY
  if (fromEnv && !fromEnv.includes('placeholder')) return fromEnv
  const files = ['.env.vercel.production', '.env.local', '.env']
  for (const f of files) {
    const vars = loadEnvFile(resolve(root, f))
    if (vars.STRIPE_SECRET_KEY && !vars.STRIPE_SECRET_KEY.includes('placeholder')) {
      return vars.STRIPE_SECRET_KEY
    }
  }
  return null
}

async function stripeRequest(secret, method, path, body) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
  })
  const json = await res.json()
  if (!res.ok) {
    throw new Error(json.error?.message || res.statusText)
  }
  return json
}

function encodeEvents(events) {
  const params = {}
  events.forEach((ev, i) => {
    params[`enabled_events[${i}]`] = ev
  })
  return params
}

async function main() {
  const secret = getSecretKey()
  if (!secret) {
    console.error('❌ Falta STRIPE_SECRET_KEY (export o .env.vercel.production)')
    process.exit(1)
  }

  const list = await stripeRequest(secret, 'GET', '/webhook_endpoints?limit=100')
  const endpoints = list.data || []
  const matches = endpoints.filter((ep) => {
    try {
      const u = new URL(ep.url)
      return u.pathname === WEBHOOK_PATH || ep.url.includes('blindadousa.com/api/stripe/webhook')
    } catch {
      return ep.url?.includes(WEBHOOK_PATH)
    }
  })

  if (!matches.length) {
    console.log('⚠️  No hay webhook apuntando a', WEBHOOK_PATH)
    console.log('   Crea uno en Stripe → URL: https://blindadousa.com/api/stripe/webhook')
    console.log('   Eventos:', REQUIRED_EVENTS.join(', '))
    process.exit(1)
  }

  for (const ep of matches) {
    const merged = [...new Set([...(ep.enabled_events || []), ...REQUIRED_EVENTS])].sort()
    const missing = REQUIRED_EVENTS.filter((e) => !ep.enabled_events?.includes(e))
    if (!missing.length) {
      console.log(`✅ ${ep.id} — ya tiene todos los eventos (${ep.url})`)
      continue
    }
    const body = encodeEvents(merged)
    await stripeRequest(secret, 'POST', `/webhook_endpoints/${ep.id}`, body)
    console.log(`✅ ${ep.id} — actualizado (+${missing.join(', ')})`)
    console.log(`   ${ep.url}`)
  }
}

main().catch((e) => {
  console.error('❌', e.message)
  process.exit(1)
})
