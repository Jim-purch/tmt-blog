export interface SEOConfig {
  title: string
  description: string
  keywords: string
  ogImage?: string
  locale: string
  region: string
  language: string
  alternateUrls?: Record<string, string>
}

export const seoConfig: Record<string, SEOConfig> = {
  'zh-Hans': {
    title: 'TMT叉车配件 - 高品质叉车零部件和配件',
    description: '专业提供高品质叉车配件，服务全球叉车用户。品质保证，全球配送，专业支持。',
    keywords: '叉车配件,叉车零部件,TMT,叉车用品,叉车维修,叉车改装,液压系统,传动系统,制动系统',
    ogImage: '/assets/og-image-zh.jpg',
    locale: 'zh-Hans',
    region: 'CN',
    language: 'zh'
  },
  'zh-Hant': {
    title: 'TMT堆高機配件 - 高品質堆高機零部件和配件',
    description: '專業提供高品質堆高機配件，服務全球堆高機用戶。品質保證，全球配送，專業支持。',
    keywords: '堆高機配件,堆高機零部件,TMT,堆高機用品,堆高機維修,堆高機改裝,液壓系統,傳動系統,制動系統',
    ogImage: '/assets/og-image-zh-Hant.jpg',
    locale: 'zh-Hant',
    region: 'TW',
    language: 'zh'
  },
  'en': {
    title: 'TMT Forklift Parts - High Quality Forklift Parts & Accessories',
    description: 'Professional high-quality forklift parts serving forklift operators worldwide. Quality assurance, global shipping, expert support.',
    keywords: 'forklift parts,forklift components,TMT,forklift accessories,forklift repair,forklift maintenance,hydraulic system,transmission parts,brake system',
    ogImage: '/assets/og-image-en.jpg',
    locale: 'en',
    region: 'US',
    language: 'en'
  },
  'ru': {
    title: 'TMT Запчасти для погрузчиков - Высококачественные детали и аксессуары для погрузчиков',
    description: 'Профессиональные высококачественные запчасти для погрузчиков для операторов по всему миру. Гарантия качества, глобальная доставка, экспертная поддержка.',
    keywords: 'запчасти для погрузчиков,детали погрузчиков,TMT,аксессуары для погрузчиков,ремонт погрузчиков,обслуживание,гидравлическая система,трансмиссия,тормозная система',
    ogImage: '/assets/og-image-ru.jpg',
    locale: 'ru',
    region: 'RU',
    language: 'ru'
  },
  'ja': {
    title: 'TMTフォークリフト部品 - 高品質なフォークリフト部品とアクセサリー',
    description: '世界中のフォークリフトオペレーターに専門的な高品質フォークリフト部品を提供。品質保証、世界配送、専門サポート。',
    keywords: 'フォークリフト部品,フォークリフトパーツ,TMT,フォークリフトアクセサリー,フォークリフト修理,メンテナンス,油圧システム,トランスミッション,ブレーキシステム',
    ogImage: '/assets/og-image-ja.jpg',
    locale: 'ja',
    region: 'JP',
    language: 'ja'
  },
  'de': {
    title: 'TMT Gabelstaplerteile - Hochwertige Gabelstaplerteile und Zubehör',
    description: 'Professionelle hochwertige Gabelstaplerteile für Gabelstaplerfahrer weltweit. Qualitätssicherung, weltweiter Versand, Expertenunterstützung.',
    keywords: 'Gabelstaplerteile,Staplerteile,TMT,Gabelstaplerzubehör,Gabelstaplerreparatur,Wartung,Hydrauliksystem,Getriebeteile,Bremssystem',
    ogImage: '/assets/og-image-de.jpg',
    locale: 'de',
    region: 'DE',
    language: 'de'
  },
  'fr': {
    title: 'TMT Pièces de Chariot Élévateur - Pièces et accessoires de chariot élévateur de haute qualité',
    description: 'Pièces de chariot élévateur professionnelles de haute qualité pour les opérateurs de chariots élévateurs du monde entier. Assurance qualité, expédition mondiale, support expert.',
    keywords: 'pièces de chariot élévateur,pièces de chariot,TMT,accessoires de chariot élévateur,réparation de chariot élévateur,maintenance,système hydraulique,transmission,système de freinage',
    ogImage: '/assets/og-image-fr.jpg',
    locale: 'fr',
    region: 'FR',
    language: 'fr'
  },
  'es': {
    title: 'TMT Repuestos de Montacargas - Repuestos y accesorios de montacargas de alta calidad',
    description: 'Repuestos de montacargas profesionales de alta calidad para operadores de montacargas en todo el mundo. Garantía de calidad, envío mundial, soporte experto.',
    keywords: 'repuestos de montacargas,partes de montacargas,TMT,accesorios de montacargas,reparación de montacargas,mantenimiento,sistema hidráulico,transmisión,sistema de frenos',
    ogImage: '/assets/og-image-es.jpg',
    locale: 'es',
    region: 'ES',
    language: 'es'
  },
  'pt': {
    title: 'TMT Peças de Empilhadeira - Peças e acessórios de empilhadeira de alta qualidade',
    description: 'Peças de empilhadeira profissionais de alta qualidade para operadores de empilhadeira em todo o mundo. Garantia de qualidade, envio mundial, suporte especializado.',
    keywords: 'peças de empilhadeira,peças de empilhador,TMT,acessórios de empilhadeira,reparação de empilhadeira,manutenção,sistema hidráulico,transmissão,sistema de freios',
    ogImage: '/assets/og-image-pt.jpg',
    locale: 'pt',
    region: 'BR',
    language: 'pt'
  }
}

// 获取特定语言的SEO配置
export function getSEOConfig(locale: string): SEOConfig {
  return seoConfig[locale] || seoConfig['en']
}

// 生成多语言页面的结构化数据
export function generateStructuredData(locale: string, pageType: 'website' | 'product' | 'article', data?: any) {
  const config = getSEOConfig(locale)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com'
  
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": pageType === 'website' ? 'Organization' : pageType === 'product' ? 'Product' : 'Article',
    "name": config.title,
    "description": config.description,
    "url": baseUrl,
    "inLanguage": locale,
  }

  if (pageType === 'website') {
    return {
      ...baseStructuredData,
      "@type": "Organization",
      "logo": `${baseUrl}/assets/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": process.env.NEXT_PUBLIC_CONTACT_PHONE || "+86-400-123-4567",
        "contactType": "customer service",
        "availableLanguage": Object.keys(seoConfig)
      },
      "sameAs": [
        process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/tmtautoparts",
        process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/tmtautoparts",
        process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/tmtautoparts"
      ]
    }
  }

  if (pageType === 'product' && data) {
    return {
      ...baseStructuredData,
      "@type": "Product",
      "name": data.name,
      "description": data.description,
      "image": data.image,
      "brand": {
        "@type": "Brand",
        "name": "TMT"
      },
      "offers": {
        "@type": "Offer",
        "price": data.price,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  }

  if (pageType === 'article' && data) {
    return {
      ...baseStructuredData,
      "@type": "Article",
      "headline": data.title,
      "description": data.description,
      "author": {
        "@type": "Person",
        "name": data.author || "TMT Team"
      },
      "datePublished": data.publishedDate,
      "dateModified": data.modifiedDate || data.publishedDate,
      "publisher": {
        "@type": "Organization",
        "name": "TMT叉车配件",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/assets/logo.png`
        }
      }
    }
  }

  return baseStructuredData
}