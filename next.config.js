/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.tmtparts.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'thumbnails.tmtparts.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    locales: ['zh-CN', 'en', 'ru', 'ja', 'de', 'fr', 'es', 'pt'],
    defaultLocale: 'zh-CN',
    localeDetection: false,
    domains: [
      {
        domain: 'tmtparts.com',
        defaultLocale: 'zh-CN',
      },
      {
        domain: 'en.tmtparts.com',
        defaultLocale: 'en',
      },
    ],
  },
}

module.exports = nextConfig