import zhHans from '@/locales/zh-Hans.json';
import zhHant from '@/locales/zh-Hant.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ja from '@/locales/ja.json';
import de from '@/locales/de.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';

// 翻译资源配置
export const translations = {
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

// 支持的语言类型
export type Locale = keyof typeof translations;

// 默认语言
export const defaultLocale: Locale = 'en';

// 支持的语言列表配置
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

// 语言代码数组
export const locales = supportedLocales.map(locale => locale.code);

// 检查是否为支持的语言
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// 获取语言显示名称
export function getLocaleName(locale: Locale): string {
  const localeConfig = supportedLocales.find(l => l.code === locale);
  return localeConfig?.name || locale;
}

// 获取语言标志
export function getLocaleFlag(locale: Locale): string {
  const localeConfig = supportedLocales.find(l => l.code === locale);
  return localeConfig?.flag || '🌐';
}