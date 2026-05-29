import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { buildBrandOgImage, ogContentType, ogSize } from '@/lib/og-brand-image'

export const runtime = 'nodejs'
export const size = ogSize
export const contentType = ogContentType

export default async function OpenGraphImage() {
  const buf = await readFile(join(process.cwd(), 'public/images/blindadousa-logo.png'))
  const logoSrc = `data:image/png;base64,${buf.toString('base64')}`
  return buildBrandOgImage(logoSrc)
}
