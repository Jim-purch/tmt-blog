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
        hostname: 'image.toomotoo.online',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.toomotoo.online',
        port: '443',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig