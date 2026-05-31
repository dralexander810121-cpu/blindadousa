/**
 * Generador de artículos SEO con IA (Gemini) para BlindadoUSA.
 * Crea contenido long-tail ultra-específico para hispanos en USA y lo escribe
 * en lib/blogPosts.generated.ts (estático → SEO perfecto, server-rendered).
 *
 * Uso:
 *   GEMINI_API_KEY=xxx node scripts/generate-seo-articles.mjs
 *
 * Los temas se eligen por intención de búsqueda real del nicho hispano.
 */
import { writeFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'lib', 'blogPosts.generated.ts')
const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
if (!KEY) {
  console.error('Falta GEMINI_API_KEY o GOOGLE_API_KEY')
  process.exit(1)
}

// Temas long-tail por intención de búsqueda del nicho hispano en USA
const TEMAS = [
  { tema: 'Cómo disputar un error en tu reporte de crédito siendo inmigrante', categoria: 'Credito' },
  { tema: 'Cómo comprar casa con ITIN sin SSN en Estados Unidos', categoria: 'Vivienda' },
  { tema: 'Qué hacer si un cobrador te llama al trabajo: tus derechos FDCPA', categoria: 'Derechos' },
  { tema: 'Cómo construir crédito desde cero recién llegado a USA', categoria: 'Credito' },
  { tema: 'Créditos de impuestos para familias hispanas con hijos en 2026', categoria: 'Taxes' },
  { tema: 'Cómo financiar un carro con buen interés teniendo crédito bajo', categoria: 'Carro' },
  { tema: 'Diferencia entre deuda buena y mala: guía para latinos en USA', categoria: 'Deudas' },
  { tema: 'Cómo enviar remesas pagando menos comisiones', categoria: 'Remesas' },
]

const SYSTEM = `Eres un redactor experto en finanzas personales para la comunidad hispana en USA.
Escribes en español claro, cálido y accionable (nivel de lectura accesible).
NO das consejo legal ni financiero personalizado: das educación general.
Cada artículo debe ser práctico, específico al contexto del inmigrante hispano, y optimizado para SEO.
Responde SOLO con JSON válido, sin markdown, en este formato exacto:
{"title":"título SEO 50-65 chars","excerpt":"resumen 1 frase","readMinutes":6,"content":["párrafo 1","párrafo 2","párrafo 3","párrafo 4","párrafo 5","párrafo 6"]}`

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 70)
}

async function generar(tema) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: 'user', parts: [{ text: `Escribe el artículo sobre: "${tema}". JSON.` }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 4000, responseMimeType: 'application/json' },
      }),
    },
  )
  const json = await res.json()
  const raw = json.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start < 0 || end < 0) throw new Error('Sin JSON: ' + raw.slice(0, 120))
  return JSON.parse(raw.slice(start, end + 1))
}

const hoy = new Date().toISOString().slice(0, 10)
const posts = []

for (const [i, { tema, categoria }] of TEMAS.entries()) {
  try {
    console.log(`[${i + 1}/${TEMAS.length}] Generando: ${tema}`)
    const art = await generar(tema)
    posts.push({
      slug: slugify(art.title || tema),
      title: art.title || tema,
      excerpt: art.excerpt || '',
      category: categoria,
      readMinutes: Number(art.readMinutes) || 6,
      publishedAt: hoy,
      content: Array.isArray(art.content) ? art.content : [],
    })
    await new Promise((r) => setTimeout(r, 1200)) // rate limit cortés
  } catch (e) {
    console.error(`  ✗ Falló "${tema}": ${e.message}`)
  }
}

const body = `import type { BlogPost } from '@/lib/blogPosts'

// AUTO-GENERADO por scripts/generate-seo-articles.mjs — no editar a mano.
// Generado: ${hoy} · ${posts.length} artículos SEO.
export const GENERATED_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)}
`

writeFileSync(OUT, body, 'utf8')
console.log(`\n✅ ${posts.length} artículos escritos en lib/blogPosts.generated.ts`)
