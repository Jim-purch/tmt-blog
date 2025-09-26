'use client'

import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
}

const supportedLocales = [
  { code: 'zh-Hans', region: 'CN' },
  { code: 'zh-Hant', region: 'TW' },
  { code: 'en', region: 'US' },
  { code: 'ru', region: 'RU' },
  { code: 'ja', region: 'JP' },
  { code: 'de', region: 'DE' },
  { code: 'fr', region: 'FR' },
  { code: 'es', region: 'ES' },
  { code: 'pt', region: 'BR' },
]

export default function SEOHead({ 
  title = 'TMT叉车配件 - 高品质叉车零部件和配件',
  description = '专业提供高品质叉车配件，服务全球叉车操作员。品质保证，全球配送，专业支持。',
  keywords = '叉车配件,叉车零部件,TMT,叉车用品,叉车维修,叉车保养',
  ogImage = '/assets/og-image.jpg',
  canonicalUrl
}: SEOHeadProps) {
  const router = useRouter()
  const { locale, asPath } = router
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'
  const currentUrl = canonicalUrl || `${baseUrl}${asPath}`
  
  // 生成hreflang链接
  const generateHreflangLinks = () => {
    return supportedLocales.map(({ code, region }) => {
      const href = code === 'zh-Hans' 
        ? `${baseUrl}${asPath}` 
        : `${baseUrl}/${code}${asPath}`
      
      return (
        <link
          key={code}
          rel="alternate"
          hrefLang={`${code.split('-')[0]}-${region}`}
          href={href}
        />
      )
    })
  }

  return (
    <Head>
      {/* 基本SEO标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* 规范链接 */}
      <link rel="canonical" href={currentUrl} />
      
      {/* hreflang标签 */}
      {generateHreflangLinks()}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${asPath}`} />
      
      {/* Open Graph标签 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TMT叉车配件" />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TMT叉车配件",
            "url": baseUrl,
            "logo": `${baseUrl}/assets/logo.png`,
            "description": description,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+86-xxx-xxxx-xxxx",
              "contactType": "customer service",
              "availableLanguage": supportedLocales.map(l => l.code)
            },
            "sameAs": [
              "https://facebook.com/tmtautoparts",
              "https://twitter.com/tmtautoparts",
              "https://instagram.com/tmtautoparts"
            ]
          })
        }}
      />
    </Head>
  )
}