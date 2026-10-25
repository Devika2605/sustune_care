/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL || 'http://localhost:8000'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The browser only ever talks to this origin; Next forwards /api/* to FastAPI.
  // That keeps the login cookie first-party and removes the need for CORS in production.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_URL}/api/:path*` }]
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [{ source: '/portal/demo', destination: '/portal-preview', permanent: true }]
  },
}
export default nextConfig
