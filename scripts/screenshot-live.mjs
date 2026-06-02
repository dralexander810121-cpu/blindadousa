import { chromium } from 'playwright'

const BASE = 'https://blindadousa.com'

async function shot(page, path, out) {
  const t0 = Date.now()
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 45_000 })
  await page.waitForTimeout(2000)
  const ms = Date.now() - t0
  await page.screenshot({ path: out, fullPage: false })
  const title = await page.title()
  const url = page.url()
  console.log(`${path} → ${url} (${ms}ms) title="${title}" screenshot=${out}`)
}

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

try {
  await shot(page, '/entrar', 'scripts/out-entrar.png')
  await shot(page, '/dashboard/onboarding', 'scripts/out-onboarding.png')
  await shot(page, '/dashboard/credito/tarjetas', 'scripts/out-tarjetas.png')
} finally {
  await browser.close()
}
