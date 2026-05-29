import type { Metadata } from 'next'
import { HomePage } from '@/components/landing/HomePage'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata('home')

export default function LandingPage() {
  return <HomePage />
}
