export interface SEOConfig {
  title: string
  description: string
  keywords: string
  ogImage?: string
}

export const seoConfig: Record<string, SEOConfig> = {
  'zh-CN': {
    title: 'TMT汽车配件 - 高品质汽车零部件和配件',
    description: '专业提供高品质汽车配件，服务全球汽车爱好者。品质保证，全球配送，专业支持。',
    keywords: '汽车配件,汽车零部件,TMT,汽车用品,汽车维修,汽车改装,发动机配件,刹车系统,悬挂系统',
    ogImage: '/assets/og-image-zh.jpg'
  },
  'en': {
    title: 'TMT Auto Parts - High Quality Automotive Parts & Accessories',
    description: 'Professional high-quality auto parts serving car enthusiasts worldwide. Quality assurance, global shipping, expert support.',
    keywords: 'auto parts,automotive parts,TMT,car accessories,car repair,car modification,engine parts,brake system,suspension system',
    ogImage: '/assets/og-image-en.jpg'
  },
  'ru': {
    title: 'TMT Автозапчасти - Высококачественные автомобильные детали и аксессуары',
    description: 'Профессиональные высококачественные автозапчасти для автолюбителей по всему миру. Гарантия качества, глобальная доставка, экспертная поддержка.',
    keywords: 'автозапчасти,автомобильные детали,TMT,автоаксессуары,ремонт автомобилей,тюнинг,детали двигателя,тормозная система,подвеска',
    ogImage: '/assets/og-image-ru.jpg'
  },
  'ja': {
    title: 'TMT自動車部品 - 高品質な自動車部品とアクセサリー',
    description: '世界中の自動車愛好家に専門的な高品質自動車部品を提供。品質保証、世界配送、専門サポート。',
    keywords: '自動車部品,自動車パーツ,TMT,カーアクセサリー,自動車修理,カスタマイズ,エンジン部品,ブレーキシステム,サスペンション',
    ogImage: '/assets/og-image-ja.jpg'
  },
  'de': {
    title: 'TMT Autoteile - Hochwertige Autoteile und Zubehör',
    description: 'Professionelle hochwertige Autoteile für Autoliebhaber weltweit. Qualitätssicherung, weltweiter Versand, Expertenunterstützung.',
    keywords: 'Autoteile,Fahrzeugteile,TMT,Autozubehör,Autoreparatur,Fahrzeugtuning,Motorteile,Bremssystem,Fahrwerk',
    ogImage: '/assets/og-image-de.jpg'
  },
  'fr': {
    title: 'TMT Pièces Auto - Pièces et accessoires automobiles de haute qualité',
    description: 'Pièces automobiles professionnelles de haute qualité pour les passionnés d\'automobile du monde entier. Assurance qualité, expédition mondiale, support expert.',
    keywords: 'pièces auto,pièces automobiles,TMT,accessoires auto,réparation automobile,tuning,pièces moteur,système de freinage,suspension',
    ogImage: '/assets/og-image-fr.jpg'
  },
  'es': {
    title: 'TMT Autopartes - Repuestos y accesorios automotrices de alta calidad',
    description: 'Autopartes profesionales de alta calidad para entusiastas del automóvil en todo el mundo. Garantía de calidad, envío mundial, soporte experto.',
    keywords: 'autopartes,repuestos automotrices,TMT,accesorios para autos,reparación de autos,tuning,partes del motor,sistema de frenos,suspensión',
    ogImage: '/assets/og-image-es.jpg'
  },
  'pt': {
    title: 'TMT Autopeças - Peças e acessórios automotivos de alta qualidade',
    description: 'Autopeças profissionais de alta qualidade para entusiastas automotivos em todo o mundo. Garantia de qualidade, envio mundial, suporte especializado.',
    keywords: 'autopeças,peças automotivas,TMT,acessórios para carros,reparação de carros,tuning,peças do motor,sistema de freios,suspensão',
    ogImage: '/assets/og-image-pt.jpg'
  }
}

// 获取特定语言的SEO配置
export function getSEOConfig(locale: string): SEOConfig {
  return seoConfig[locale] || seoConfig['zh-CN']
}

// 生成多语言页面的结构化数据
export function generateStructuredData(locale: string, pageType: 'website' | 'product' | 'article', data?: any) {
  const config = getSEOConfig(locale)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'
  
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
        "telephone": "+86-xxx-xxxx-xxxx",
        "contactType": "customer service",
        "availableLanguage": Object.keys(seoConfig)
      },
      "sameAs": [
        "https://facebook.com/tmtautoparts",
        "https://twitter.com/tmtautoparts",
        "https://instagram.com/tmtautoparts"
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
        "name": "TMT汽车配件",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/assets/logo.png`
        }
      }
    }
  }

  return baseStructuredData
}