import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/productApi'
import { getAllPosts } from '@/lib/api'

const supportedLocales = ['zh-Hans', 'en', 'ru', 'ja', 'de', 'fr', 'es', 'pt']

// 生成hreflang替代链接的辅助函数
function generateAlternates(baseUrl: string, path: string, locales: string[]) {
  const alternates: Record<string, string> = {}
  
  locales.forEach(locale => {
    const localePrefix = locale === 'zh-Hans' ? '' : `/${locale}`
    alternates[locale] = `${baseUrl}${localePrefix}${path}`
  })
  
  return alternates
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com'
  
  // 获取所有产品和文章
  const products = getAllProducts()
  const posts = getAllPosts()
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // 为每种语言生成静态页面
  supportedLocales.forEach(locale => {
    const localePrefix = locale === 'zh-Hans' ? '' : `/${locale}`
    
    // 静态页面
    const staticPages = [
      {
        url: `${baseUrl}${localePrefix}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
        alternates: {
          languages: generateAlternates(baseUrl, '', supportedLocales)
        }
      },
      {
        url: `${baseUrl}${localePrefix}/products`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
        alternates: {
          languages: generateAlternates(baseUrl, '/products', supportedLocales)
        }
      },
      {
        url: `${baseUrl}${localePrefix}/posts`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: {
          languages: generateAlternates(baseUrl, '/posts', supportedLocales)
        }
      },
      {
        url: `${baseUrl}${localePrefix}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: generateAlternates(baseUrl, '/about', supportedLocales)
        }
      },
    ]
    
    sitemapEntries.push(...staticPages)
  })
  
  // 产品页面
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.seo}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // 文章页面
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  // 分类页面
  const categories = [...new Set(products.map(p => p.category))]
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))
  
  return [
    ...sitemapEntries,
    ...productPages,
    ...postPages,
    ...categoryPages,
  ]
}