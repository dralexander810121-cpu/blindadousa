import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  serverExternalPackages: ['stripe', 'plaid']
}
export default nextConfig
