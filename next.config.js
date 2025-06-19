/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['docs.chronexio.com', 'api.chronexio.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Remove the API rewrites since we're calling the API directly
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;