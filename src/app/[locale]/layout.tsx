import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSEOConfig } from '@/config/seo'

// 支持的语言列表
const locales = ['zh-Hans', 'zh-Hant', 'en', 'ru', 'ja', 'de', 'fr', 'es', 'pt']

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  
  if (!locales.includes(locale)) {
    notFound()
  }

  const seoConfig = getSEOConfig(locale)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com'

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    openGraph: {
      title: seoConfig.title,
      description: seoConfig.description,
      images: seoConfig.ogImage ? [seoConfig.ogImage] : [],
      locale: seoConfig.locale,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${locale === 'zh-Hans' ? '' : locale}`,
      languages: {
        'zh-Hans': `${baseUrl}/`,
        'zh-Hant': `${baseUrl}/zh-Hant`,
        'en': `${baseUrl}/en`,
        'ru': `${baseUrl}/ru`,
        'ja': `${baseUrl}/ja`,
        'de': `${baseUrl}/de`,
        'fr': `${baseUrl}/fr`,
        'es': `${baseUrl}/es`,
        'pt': `${baseUrl}/pt`,
      },
    },
  }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params

  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}