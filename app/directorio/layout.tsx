import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('directorio')

export default function DirectorioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
