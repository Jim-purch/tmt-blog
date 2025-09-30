'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';

export function DynamicProductsMeta() {
  const { t, locale } = useTranslation();

  useEffect(() => {
    // 获取翻译内容
    const title = t('metadata.products.title');
    const description = t('metadata.products.description');
    const keywordsRaw = t('metadata.products.keywords');
    const ogTitle = t('metadata.products.ogTitle');
    const ogDescription = t('metadata.products.ogDescription');

    // 处理 keywords
    const keywords = Array.isArray(keywordsRaw) 
      ? keywordsRaw.join(', ')
      : typeof keywordsRaw === 'string' 
        ? keywordsRaw
        : '';

    // 更新页面标题
    document.title = title;

    // 更新或创建 meta 标签
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // 更新基础 meta 标签
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // 更新 OpenGraph 标签
    updateMetaTag('', ogTitle, 'og:title');
    updateMetaTag('', ogDescription, 'og:description');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', locale.replace('-', '_'), 'og:locale');

    // 构建当前页面URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.blueant.top';
    const currentUrl = locale === 'zh-Hans' 
      ? `${baseUrl}/products`
      : `${baseUrl}/${locale}/products`;
    
    updateMetaTag('', currentUrl, 'og:url');

    // 更新 canonical 链接
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 更新或创建 hreflang 链接
    const updateHreflangLink = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 添加多语言链接
    const languages = {
      'zh-Hans': `${baseUrl}/products`,
      'zh-Hant': `${baseUrl}/zh-Hant/products`,
      'en': `${baseUrl}/en/products`,
      'ru': `${baseUrl}/ru/products`,
      'ja': `${baseUrl}/ja/products`,
      'de': `${baseUrl}/de/products`,
      'fr': `${baseUrl}/fr/products`,
      'es': `${baseUrl}/es/products`,
      'pt': `${baseUrl}/pt/products`,
      'ar': `${baseUrl}/ar/products`,
    };

    Object.entries(languages).forEach(([lang, url]) => {
      updateHreflangLink(lang, url);
    });

  }, [t, locale]);

  return null; // 这个组件不渲染任何内容
}