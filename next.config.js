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
    ],
  },
  i18n: {
    locales: ['zh-Hans', 'en', 'ru', 'ja', 'de', 'fr', 'es', 'pt'],
    defaultLocale: 'zh-Hans',
    localeDetection: false,
    domains: [
      {
        domain: 'tmtparts.com',
        defaultLocale: 'zh-Hans',
      },
      {
        domain: 'en.tmtparts.com',
        defaultLocale: 'en',
      },
    ],
  },
}

module.exports = nextConfig