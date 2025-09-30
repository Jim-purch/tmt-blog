/** @type {import('next').NextConfig} */
const nextConfig = {
  // 压缩配置
  compress: true,
  // 图片优化配置
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