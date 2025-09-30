/** @type {import('next').NextConfig} */
const nextConfig = {
  // 优化CSS加载
  experimental: {
    optimizeCss: true,
  },
  // 压缩配置
  compress: true,
  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.blueant.top',
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
  // 静态资源优化
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // 启用SWC minify以获得更好的性能
  swcMinify: true,
}

module.exports = nextConfig