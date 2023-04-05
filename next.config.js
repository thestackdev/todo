const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'edge',
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_URL: process.env.BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXTAUTH_URL}/api/auth/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: `${process.env.NEXTAUTH_URL}/login?callbackUrl=${process.env.BASE_URL}`,
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
