import { useState, useEffect } from 'react';
import zhCN from '@/locales/zh-CN.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

const translations = {
  'zh-CN': zhCN,
  'en': en,
  'ru': ru,
};

export type Locale = keyof typeof translations;

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('zh-CN');

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
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];