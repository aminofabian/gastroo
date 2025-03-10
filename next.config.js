/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Remove runtime configuration as it's causing issues
    // runtime: 'nodejs',
  },
  images: {
    domains: ['...your-domains...'],
    unoptimized: true, // Add this for static exports
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add output configuration
  output: 'standalone',
  poweredByHeader: false,
  // Explicitly define environment variables to be available at runtime
  env: {
    PESAPAL_ENV: process.env.PESAPAL_ENV,
    PESAPAL_CONSUMER_KEY: process.env.PESAPAL_CONSUMER_KEY,
    PESAPAL_CONSUMER_SECRET: process.env.PESAPAL_CONSUMER_SECRET,
    PESAPAL_API_URL: process.env.PESAPAL_API_URL,
    PESAPAL_IPN_ID: process.env.PESAPAL_IPN_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
      {
        source: '/:all*(svg|jpg|png|webp|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
