#!/usr/bin/env node
/**
 * Smoke test de rutas públicas en producción.
 * Uso: node scripts/smoke-production.mjs
 *      BASE_URL=https://blindadousa.com node scripts/smoke-production.mjs
 */
const BASE = (process.env.BASE_URL || 'https://blindadousa.com').replace(/\/$/, '')

const ROUTES = [
  '/',
  '/inicio',
  '/precios',
  '/que-incluye',
  '/como-funciona',
  '/pagar',
  '/trial',
  '/registrarse',
  '/entrar',
  '/recuperar',
  '/descargo',
  '/privacidad',
  '/terminos',
  '/blog',
  '/directorio',
  '/directorio/registrar-negocio',
  '/sitemap.xml',
]

async function check(path) {
  const url = `${BASE}${path}`
  const res = await fetch(url, { redirect: 'follow' })
  const ok = res.status >= 200 && res.status < 400
  return { path, status: res.status, ok }
}

async function main() {
  console.log(`Smoke: ${BASE}\n`)
  let failed = 0
  for (const path of ROUTES) {
    const { status, ok } = await check(path)
    const mark = ok ? '✅' : '❌'
    console.log(`${mark} ${status} ${path}`)
    if (!ok) failed++
  }
  if (failed) {
    console.log(`\n${failed} ruta(s) con error`)
    process.exit(1)
  }
  console.log('\nTodas las rutas respondieron OK')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
