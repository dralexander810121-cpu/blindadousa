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

function isPlaceholderKey(key) {
  const k = key.trim()
  if (!k || k.includes('placeholder') || k.includes('...')) return true
  if (/^sk_(live|test)_\.{2,}$/i.test(k)) return true
  if (!/^sk_(live|test)_[A-Za-z0-9]{20,}$/.test(k)) return true
  return false
}

function getSecretKey() {
  const fromEnv = process.env.STRIPE_SECRET_KEY
  if (fromEnv && !isPlaceholderKey(fromEnv)) return fromEnv.trim()
  const files = ['.env.local', '.env.vercel.production', '.env']
  for (const f of files) {
    const vars = loadEnvFile(resolve(root, f))
    const key = vars.STRIPE_SECRET_KEY?.trim()
    if (key && !isPlaceholderKey(key)) return key
  }
  return null
}

function explainMissingKey() {
  console.error('❌ No hay una Secret key válida de Stripe.')
  console.error('')
  console.error('El comando falló porque usaste el EJEMPLO "sk_live_..." — eso no es tu clave real.')
  console.error('')
  console.error('Opción A — PowerShell (pega la clave COMPLETA, ~100+ caracteres):')
  console.error('  1. https://dashboard.stripe.com/apikeys → modo Live → Reveal secret key')
  console.error('  2. $env:STRIPE_SECRET_KEY = "sk_live_51xxxxxxxx..."  ← sin "..." al final')
  console.error('  3. npm run stripe:sync-webhook')
  console.error('')
  console.error('Opción B — .env.local en la carpeta del proyecto:')
  console.error('  STRIPE_SECRET_KEY=sk_live_51...')
  console.error('  (una sola línea, sin comillas) → npm run stripe:sync-webhook')
  console.error('')
  console.error('Opción C — Sin script: Stripe Dashboard → Webhooks → tu endpoint →')
  console.error('  Añadir eventos: checkout.session.completed, customer.subscription.deleted,')
  console.error('  customer.subscription.updated, invoice.payment_failed')
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
  const raw = process.env.STRIPE_SECRET_KEY?.trim()
  if (raw && isPlaceholderKey(raw)) {
    explainMissingKey()
    process.exit(1)
  }

  const secret = getSecretKey()
  if (!secret) {
    explainMissingKey()
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
    console.log('⚠️  No hay webhook — creando endpoint en Stripe…')
    const params = new URLSearchParams()
    params.set('url', 'https://blindadousa.com/api/stripe/webhook')
    params.set('description', 'BlindadoUSA production')
    REQUIRED_EVENTS.forEach((ev, i) => params.set(`enabled_events[${i}]`, ev))
    const created = await stripeRequest(secret, 'POST', '/webhook_endpoints', Object.fromEntries(params))
    console.log(`✅ Webhook creado: ${created.id}`)
    console.log(`   URL: ${created.url}`)
    if (created.secret) {
      console.log('')
      console.log('⚠️  Copia el Signing secret (whsec_…) a Vercel → STRIPE_WEBHOOK_SECRET')
      console.log(`   Prefijo: ${created.secret.slice(0, 12)}…`)
    }
    matches.push(created)
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
  const msg = e.message || String(e)
  console.error('❌', msg)
  if (/invalid api key/i.test(msg)) {
    console.error('')
    console.error('La clave no es válida. Usa la Secret key completa de Live (sk_live_51...), no el texto de ejemplo.')
  }
  process.exit(1)
})
