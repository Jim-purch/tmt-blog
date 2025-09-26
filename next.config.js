/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.toomotoo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbnails.toomotoo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '43.160.247.85',
        port: '7791',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig