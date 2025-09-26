'use client'

import { useEffect } from 'react'
import { getSEOConfig, generateStructuredData } from '@/config/seo'

interface EnhancedSEOHeadProps {
  locale: string
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  pageType?: 'website' | 'product' | 'article'
  pageData?: any
  noIndex?: boolean
}

const supportedLocales = [
  { code: 'zh-Hans', region: 'CN', language: 'zh' },
  { code: 'zh-Hant', region: 'TW', language: 'zh' },
  { code: 'en', region: 'US', language: 'en' },
  { code: 'ru', region: 'RU', language: 'ru' },
  { code: 'ja', region: 'JP', language: 'ja' },
  { code: 'de', region: 'DE', language: 'de' },
  { code: 'fr', region: 'FR', language: 'fr' },
  { code: 'es', region: 'ES', language: 'es' },
  { code: 'pt', region: 'BR', language: 'pt' },
]

export default function EnhancedSEOHead({ 
  locale,
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  pageType = 'website',
  pageData,
  noIndex = false
}: EnhancedSEOHeadProps) {
  const seoConfig = getSEOConfig(locale)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com'
  
  // 使用传入的值或配置的默认值
  const finalTitle = title || seoConfig.title
  const finalDescription = description || seoConfig.description
  const finalKeywords = keywords || seoConfig.keywords
  const finalOgImage = ogImage || seoConfig.ogImage
  
  // 生成当前页面的完整URL
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const currentUrl = canonicalUrl || `${baseUrl}${currentPath}`
  
  // 生成hreflang链接
  const generateHreflangLinks = () => {
    return supportedLocales.map(({ code, region, language }) => {
      const href = code === 'zh-Hans' 
        ? `${baseUrl}${currentPath}` 
        : `${baseUrl}/${code}${currentPath}`
      
      return {
        rel: 'alternate',
        hrefLang: `${language}-${region}`,
        href: href,
        key: code
      }
    })
  }

  // 生成结构化数据
  const structuredData = generateStructuredData(locale, pageType, pageData)

  useEffect(() => {
    // 动态更新页面元数据
    document.title = finalTitle
    
    // 更新meta标签
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // 基本SEO标签
    updateMetaTag('description', finalDescription)
    updateMetaTag('keywords', finalKeywords)
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    
    // Open Graph标签
    updateMetaTag('og:title', finalTitle, true)
    updateMetaTag('og:description', finalDescription, true)
    updateMetaTag('og:image', `${baseUrl}${finalOgImage}`, true)
    updateMetaTag('og:url', currentUrl, true)
    updateMetaTag('og:type', pageType === 'article' ? 'article' : 'website', true)
    updateMetaTag('og:site_name', 'TMT叉车配件', true)
    updateMetaTag('og:locale', locale.replace('-', '_'), true)
    
    // Twitter Card标签
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', finalTitle)
    updateMetaTag('twitter:description', finalDescription)
    updateMetaTag('twitter:image', `${baseUrl}${finalOgImage}`)
    
    // 语言和地区标签
    updateMetaTag('language', seoConfig.language)
    updateMetaTag('geo.region', seoConfig.region)
    updateMetaTag('geo.placename', seoConfig.region)
    
    // 更新canonical链接
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = currentUrl

    // 清除现有的hreflang链接
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]')
    existingHreflang.forEach(link => link.remove())

    // 添加新的hreflang链接
    const hreflangLinks = generateHreflangLinks()
    hreflangLinks.forEach((linkData: any) => {
      const link = document.createElement('link')
      link.rel = linkData.rel
      link.hreflang = linkData.hrefLang
      link.href = linkData.href
      document.head.appendChild(link)
    })

    // 添加x-default hreflang
    const defaultLink = document.createElement('link')
    defaultLink.rel = 'alternate'
    defaultLink.hreflang = 'x-default'
    defaultLink.href = `${baseUrl}${currentPath}`
    document.head.appendChild(defaultLink)

    // 更新结构化数据
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.type = 'application/ld+json'
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData, null, 2)

  }, [locale, finalTitle, finalDescription, finalKeywords, finalOgImage, currentUrl, pageType, noIndex])

  return null // 这个组件不渲染任何可见内容
}

// 导出用于服务端渲染的函数
export function generateSEOMetadata(locale: string, options: Partial<EnhancedSEOHeadProps> = {}) {
  const seoConfig = getSEOConfig(locale)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com'
  
  const title = options.title || seoConfig.title
  const description = options.description || seoConfig.description
  const keywords = options.keywords || seoConfig.keywords
  const ogImage = options.ogImage || seoConfig.ogImage
  
  return {
    title,
    description,
    keywords: keywords.split(','),
    openGraph: {
      title,
      description,
      images: [`${baseUrl}${ogImage}`],
      locale: locale.replace('-', '_'),
      type: options.pageType === 'article' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${ogImage}`],
    },
    robots: {
      index: !options.noIndex,
      follow: !options.noIndex,
    },
    alternates: {
      canonical: options.canonicalUrl,
      languages: supportedLocales.reduce((acc, { code, language, region }) => {
        const href = code === 'zh-Hans' 
          ? baseUrl 
          : `${baseUrl}/${code}`
        acc[`${language}-${region}`] = href
        return acc
      }, {} as Record<string, string>)
    }
  }
}