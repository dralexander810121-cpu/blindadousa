import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

export type StitchTemplate = {
  slug: string
  title: string
  hasScreen: boolean
}

const STITCH_ROOT = path.join(
  process.cwd(),
  'stitch_instant_delivery_system',
  'stitch_instant_delivery_system',
)

function normalizeTitle(slug: string) {
  return slug.replaceAll('_', ' ').trim()
}

function isSafeSlug(slug: string) {
  return /^[a-zA-Z0-9_-]+$/.test(slug)
}

export function listStitchTemplates(): StitchTemplate[] {
  if (!existsSync(STITCH_ROOT)) return []

  return readdirSync(STITCH_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name
      const dir = path.join(STITCH_ROOT, slug)
      const hasCode = existsSync(path.join(dir, 'code.html'))
      const hasScreen = existsSync(path.join(dir, 'screen.png'))
      if (!hasCode) return null
      return { slug, title: normalizeTitle(slug), hasScreen }
    })
    .filter((entry): entry is StitchTemplate => Boolean(entry))
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

function getTemplateDir(slug: string) {
  if (!isSafeSlug(slug)) return null
  const dir = path.join(STITCH_ROOT, slug)
  if (!existsSync(dir)) return null
  return dir
}

export function readStitchHtml(slug: string) {
  const dir = getTemplateDir(slug)
  if (!dir) return null
  const htmlPath = path.join(dir, 'code.html')
  if (!existsSync(htmlPath)) return null
  return readFileSync(htmlPath, 'utf8')
}

export function readStitchScreen(slug: string) {
  const dir = getTemplateDir(slug)
  if (!dir) return null
  const imagePath = path.join(dir, 'screen.png')
  if (!existsSync(imagePath)) return null
  return readFileSync(imagePath)
}
