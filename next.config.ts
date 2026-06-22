import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  serverExternalPackages: ['stripe', 'plaid'],
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // Aetheris Med → website oficial (investor & client brief)
      { source: '/aetheris', destination: 'https://aetheris-investor-deploy.vercel.app', permanent: false },
      { source: '/aetheris/:path*', destination: 'https://aetheris-investor-deploy.vercel.app', permanent: false },
    ]
  },
}
export default nextConfig
