#!/usr/bin/env node
/**
 * Ejecuta lo automatizable del checklist BLOCKERS.md
 * Uso: npm run blockers:apply
 */
import { spawnSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function run(cmd, args) {
  console.log(`\n▶ ${cmd} ${args.join(' ')}`)
  const r = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', shell: true })
  return r.status === 0
}

console.log('BlindadoUSA — apply-blockers\n')

const ok = []
const manual = []

if (run('npm', ['run', 'stripe:sync-webhook'])) ok.push('Stripe webhook eventos sincronizados')
else manual.push('Stripe: npm run stripe:sync-webhook con STRIPE_SECRET_KEY válida')

if (run('npm', ['run', 'smoke:production'])) ok.push('Smoke production 10 rutas OK')
else manual.push('Revisar https://blindadousa.com manualmente')

console.log('\n--- Resumen ---')
console.log('\n✅ Automatizado:')
ok.forEach((x) => console.log(`  • ${x}`))

console.log('\n⚠️  Solo dashboard (5 min):')
console.log('  1. Supabase → Authentication → URL Configuration')
console.log('     Site URL: https://blindadousa.com')
console.log('     Redirects: ver SETUP-SUPABASE-AUTH.md')
console.log('  2. Auth → Providers → Email → desactivar Confirm email si bloquea trial')
console.log('  3. Prueba: https://blindadousa.com/trial → bienvenido → dashboard → pagar')

if (manual.length) {
  console.log('\n❌ Revisar:')
  manual.forEach((x) => console.log(`  • ${x}`))
}
