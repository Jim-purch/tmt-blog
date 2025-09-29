import { useState, useEffect } from 'react';
import { autoDetectAndSetLanguage } from './languageDetection';
import zhHans from '@/locales/zh-Hans.json';
import zhHant from '@/locales/zh-Hant.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ja from '@/locales/ja.json';
import de from '@/locales/de.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';
import ar from '@/locales/ar.json';

const translations = {
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
  'en': en,
  'ru': ru,
  'ja': ja,
  'de': de,
  'fr': fr,
  'es': es,
  'pt': pt,
  'ar': ar,
};

export type Locale = keyof typeof translations;

export const supportedLocales: { code: Locale; name: string; flag: string }[] = [
  { code: 'zh-Hans', name: '简体中文', flag: '简' },
  { code: 'zh-Hant', name: '繁體中文', flag: '繁' },
  { code: 'en', name: 'English', flag: '🌐' },
  { code: 'ru', name: 'Русский', flag: 'Ру' },
  { code: 'ja', name: '日本語', flag: 'あ' },
  { code: 'de', name: 'Deutsch', flag: 'De' },
  { code: 'fr', name: 'Français', flag: 'Fr' },
  { code: 'es', name: 'Español', flag: 'Es' },
  { code: 'pt', name: 'Português', flag: 'Pt' },
  { code: 'ar', name: 'العربية', flag: 'ع' },
];

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // 自动检测并设置最佳语言（包括浏览器语言检测）
    const detectedLocale = autoDetectAndSetLanguage() as Locale;
    if (detectedLocale && supportedLocales.find(l => l.code === detectedLocale)) {
      setLocale(detectedLocale);
    }

    // 监听语言变更事件
    const handleLocaleChange = (event: CustomEvent) => {
      setLocale(event.detail as Locale);
    };

    window.addEventListener('localeChange', handleLocaleChange as EventListener);
    
    return () => {
      window.removeEventListener('localeChange', handleLocaleChange as EventListener);
    };
  }, []);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, locale };
}

export function getStaticTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}