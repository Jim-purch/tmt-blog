import { useState, useEffect } from 'react';
import zhHans from '@/locales/zh-Hans.json';
import zhHant from '@/locales/zh-Hant.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ja from '@/locales/ja.json';
import de from '@/locales/de.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';

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
};

export type Locale = keyof typeof translations;

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('zh-Hans');

  useEffect(() => {
    // 从localStorage获取保存的语言设置
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && supportedLocales.find(l => l.code === savedLocale)) {
      setLocale(savedLocale);
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

export const supportedLocales: { code: Locale; name: string; flag: string }[] = [
  { code: 'zh-Hans', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-Hant', name: '繁體中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];