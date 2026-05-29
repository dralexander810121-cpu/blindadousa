#!/usr/bin/env node
/**
 * Genera fondos 4K con Banana 2 (Nano Banana 2 / gemini-3.1-flash-image-preview).
 *
 * Uso:
 *   GEMINI_API_KEY=... node scripts/generate-banana2pro.mjs
 *   GEMINI_API_KEY=... node scripts/generate-banana2pro.mjs credito casa carro
 *   GEMINI_API_KEY=... node scripts/generate-banana2pro.mjs --all
 *
 * Obtén la clave en https://aistudio.google.com/apikey
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'public/images/banana2pro')

const MODELS = [
  'gemini-3.1-flash-image-preview',
  'gemini-2.5-flash-image',
]

async function loadEnvLocal() {
  for (const name of ['.env.local', '.env']) {
    try {
      const raw = await readFile(join(ROOT, name), 'utf8')
      for (const line of raw.split('\n')) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
        if (!m || process.env[m[1]]) continue
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
      }
    } catch {
      /* missing file */
    }
  }
}

function getApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
}

const BANANA2_STYLE =
  'Cinematic 4K 16:9 background plate for a dark fintech web app. ' +
  'Palette: deep navy #02070F, cyan holo glow #22d3ee, subtle gold accents, faint grid lines. ' +
  'No text, no logos, no watermarks, no readable faces. High contrast for dark UI overlay. Theme:'

/** Duplicado mínimo del catálogo (evita import TS en script). */
const ASSETS = [
  { slug: 'hero', prompt: 'Hispanic family financial freedom, city skyline at night, shield motif abstract' },
  { slug: 'ia-dios', prompt: 'AI neural network orb over financial dashboard hologram' },
  { slug: 'problema', prompt: 'Stressed bills and debt papers transforming into organized folders' },
  { slug: 'herramientas', prompt: 'Grid of financial tools icons abstract, calculator wallet house car' },
  { slug: 'precio', prompt: 'Premium subscription tiers abstract, coins and shield pricing' },
  { slug: 'directorio', prompt: 'Map pins connecting Hispanic businesses across USA' },
  { slug: 'testimonios', prompt: 'Warm community success stories abstract silhouettes cyan rim light' },
  { slug: 'cta-final', prompt: 'Sunrise over American suburbs, hopeful financial new beginning' },
  { slug: 'auth', prompt: 'Secure login vault door, biometric glow abstract' },
  { slug: 'pago', prompt: 'Secure payment checkout shield with card chip abstract' },
  { slug: 'exito', prompt: 'Celebration confetti minimal, green checkmark hologram success' },
  { slug: 'credito', prompt: 'Credit score meter rising, credit cards and report holographic' },
  { slug: 'casa', prompt: 'House keys and suburban home golden hour, mortgage abstract' },
  { slug: 'carro', prompt: 'Modern sedan at dealership, auto loan financing abstract' },
  { slug: 'remesas', prompt: 'Money transfer LATAM to USA, remittance corridors glowing' },
  { slug: 'prestamos', prompt: 'Loan documents and APR calculator holographic warning safe lending' },
  { slug: 'jubilacion', prompt: 'Retirement nest egg, 401k growth chart sunset years' },
  { slug: 'banco', prompt: 'Mobile banking app interface abstract, Plaid connection glow' },
  { slug: 'trabajo', prompt: 'Workplace rights, paycheck and labor law scales abstract' },
  { slug: 'taxes', prompt: 'Tax forms W-2 1040 ITIN paperwork organized holographic' },
  { slug: 'emergencia', prompt: 'Emergency fund umbrella, crisis preparedness calm cyan light' },
  { slug: 'derechos', prompt: 'Legal rights scales gavel documents consumer protection' },
  { slug: 'subsidios', prompt: 'Government benefits assistance programs helping hands abstract' },
  { slug: 'asistente', prompt: 'AI chat assistant orb helping with documents Spanish English' },
  { slug: 'seguros', prompt: 'Health auto insurance shield policies family protection' },
  { slug: 'referidos', prompt: 'Referral network friends sharing rewards chain glow' },
  { slug: 'blog', prompt: 'Educational articles financial literacy open book holographic' },
  { slug: 'como-funciona', prompt: 'Three step onboarding journey path arrows abstract' },
  { slug: 'legal', prompt: 'Legal documents privacy terms abstract courthouse minimal' },
  { slug: 'trial', prompt: 'Free trial countdown gift box premium unlock' },
  { slug: 'negocios', prompt: 'B2B Hispanic small business storefront growth dashboard' },
  { slug: 'documentos', prompt: 'Folder of personal financial documents organized secure' },
  { slug: 'dir-abogados', prompt: 'Law office gavel legal counsel Hispanic community' },
  { slug: 'dir-notarios', prompt: 'Notary stamp official documents signing desk' },
  { slug: 'dir-dealers', prompt: 'Car dealership lot neon signs auto dealers' },
  { slug: 'dir-bancos', prompt: 'Bank branch ITIN friendly banking abstract' },
  { slug: 'dir-taxes', prompt: 'Tax preparer office seasonal filing organized' },
  { slug: 'dir-clinicas', prompt: 'Community clinic healthcare access charity care' },
  { slug: 'dir-seguros', prompt: 'Insurance agents office policies health auto' },
  { slug: 'dir-realtors', prompt: 'Real estate agent keys sold sign neighborhood' },
]

async function exists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function generateOne(asset, apiKey) {
  const outPath = join(OUT_DIR, `${asset.slug}-4k.jpg`)
  if (await exists(outPath)) {
    console.log(`⏭  ${asset.slug}-4k.jpg ya existe`)
    return
  }

  const prompt = `${BANANA2_STYLE} ${asset.prompt}`
  const sizes = ['2K', '1K']

  for (const model of MODELS) {
    for (const imageSize of sizes) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE'],
          imageConfig: {
            aspectRatio: '16:9',
            imageSize,
          },
        },
      }

      console.log(`🍌 ${asset.slug} (${model}, ${imageSize})…`)
      let res
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(300_000),
          })
          break
        } catch (err) {
          const msg = err?.message || String(err)
          if (attempt < 3) {
            console.warn(`   red ${attempt}/3: ${msg} — reintento…`)
            await new Promise((r) => setTimeout(r, 5000 * attempt))
            continue
          }
          throw new Error(`${asset.slug}: fetch failed — ${msg}`)
        }
      }

      if (!res.ok) {
        const errText = await res.text()
        if (res.status === 429 || res.status === 503) {
          console.warn(`   ${res.status} en ${model}/${imageSize}, reintento en 15s…`)
          await new Promise((r) => setTimeout(r, 15000))
          continue
        }
        console.warn(`   ${res.status} en ${model}: ${errText.slice(0, 120)}`)
        continue
      }

      const data = await res.json()
      const parts = data?.candidates?.[0]?.content?.parts ?? []
      const imagePart = parts.find((p) => p.inlineData?.data)

      if (!imagePart) continue

      const buf = Buffer.from(imagePart.inlineData.data, 'base64')
      await writeFile(outPath, buf)
      console.log(`✓  ${outPath} (${Math.round(buf.length / 1024)} KB, ${model})`)
      return
    }
  }

  throw new Error(`${asset.slug}: no se pudo generar con ningún modelo. Revisa billing en AI Studio.`)
}

async function main() {
  await loadEnvLocal()
  const apiKey = getApiKey()
  if (!apiKey) {
    console.error('Falta GEMINI_API_KEY en .env.local. https://aistudio.google.com/apikey')
    process.exit(1)
  }

  await mkdir(OUT_DIR, { recursive: true })

  const args = process.argv.slice(2)
  const all = args.includes('--all') || args.length === 0
  const slugs = all ? ASSETS.map((a) => a.slug) : args.filter((a) => !a.startsWith('--'))

  const queue = ASSETS.filter((a) => slugs.includes(a.slug))
  if (queue.length === 0) {
    console.error('Slugs no reconocidos. Ej: credito casa --all')
    process.exit(1)
  }

  console.log(`Generando ${queue.length} imágenes Banana 2…`)

  let failed = 0
  for (const asset of queue) {
    try {
      await generateOne(asset, apiKey)
    } catch (e) {
      failed++
      console.error(`✗  ${e.message || e}`)
    }
    await new Promise((r) => setTimeout(r, 2000))
  }

  console.log(failed ? `Listo con ${failed} error(es). Vuelve a ejecutar para reintentar faltantes.` : 'Listo.')
  if (failed) process.exit(1)
}

main().catch((e) => {
  console.error(e.message || e)
  process.exit(1)
})
