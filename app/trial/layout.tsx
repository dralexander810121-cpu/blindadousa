import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('trial')

export default function TrialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
