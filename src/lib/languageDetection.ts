// 语言检测和重定向工具

export interface LanguageMapping {
  code: string
  name: string
  region: string
  flag: string
  searchEngines: string[]
}

export const languageMappings: LanguageMapping[] = [
  {
    code: 'zh-Hans',
    name: '简体中文',
    region: 'CN',
    flag: '🇨🇳',
    searchEngines: ['baidu.com', 'sogou.com', '360.cn', 'bing.cn']
  },
  {
    code: 'zh-Hant',
    name: '繁體中文',
    region: 'TW',
    flag: '🇨🇳',
    searchEngines: ['google.com.tw', 'yahoo.com.tw', 'bing.com', 'pchome.com.tw']
  },
  {
    code: 'en',
    name: 'English',
    region: 'US',
    flag: '🇺🇸',
    searchEngines: ['google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com']
  },
  {
    code: 'ru',
    name: 'Русский',
    region: 'RU',
    flag: '🇷🇺',
    searchEngines: ['yandex.ru', 'mail.ru', 'rambler.ru', 'google.ru']
  },
  {
    code: 'ja',
    name: '日本語',
    region: 'JP',
    flag: '🇯🇵',
    searchEngines: ['google.co.jp', 'yahoo.co.jp', 'bing.com', 'goo.ne.jp']
  },
  {
    code: 'de',
    name: 'Deutsch',
    region: 'DE',
    flag: '🇩🇪',
    searchEngines: ['google.de', 'bing.com', 'yahoo.de', 'web.de']
  },
  {
    code: 'fr',
    name: 'Français',
    region: 'FR',
    flag: '🇫🇷',
    searchEngines: ['google.fr', 'bing.com', 'yahoo.fr', 'orange.fr']
  },
  {
    code: 'es',
    name: 'Español',
    region: 'ES',
    flag: '🇪🇸',
    searchEngines: ['google.es', 'bing.com', 'yahoo.es', 'terra.es']
  },
  {
    code: 'pt',
    name: 'Português',
    region: 'BR',
    flag: '🇵🇹',
    searchEngines: ['google.com.br', 'bing.com', 'yahoo.com.br', 'uol.com.br']
  }
]

// 根据用户的Accept-Language头检测首选语言
export function detectLanguageFromHeaders(acceptLanguage: string): string {
  if (!acceptLanguage) return 'zh-Hans'
  
  // 解析Accept-Language头
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, quality = '1'] = lang.trim().split(';q=')
      return {
        code: code.toLowerCase(),
        quality: parseFloat(quality)
      }
    })
    .sort((a, b) => b.quality - a.quality)
  
  // 查找匹配的语言
  for (const lang of languages) {
    const mapping = languageMappings.find(m => 
      m.code.toLowerCase() === lang.code ||
      m.code.toLowerCase().startsWith(lang.code.split('-')[0])
    )
    if (mapping) {
      return mapping.code
    }
  }
  
  return 'zh-Hans' // 默认语言
}

// 根据IP地址检测地理位置（需要配合地理位置API）
export function detectLanguageFromGeoLocation(countryCode: string): string {
  const geoMapping: Record<string, string> = {
    'CN': 'zh-Hans',
    'TW': 'zh-Hans',
    'HK': 'zh-Hans',
    'US': 'en',
    'GB': 'en',
    'CA': 'en',
    'AU': 'en',
    'RU': 'ru',
    'BY': 'ru',
    'KZ': 'ru',
    'JP': 'ja',
    'DE': 'de',
    'AT': 'de',
    'CH': 'de',
    'FR': 'fr',
    'BE': 'fr',
    'ES': 'es',
    'MX': 'es',
    'AR': 'es',
    'CO': 'es',
    'BR': 'pt',
    'PT': 'pt'
  }
  
  return geoMapping[countryCode.toUpperCase()] || 'en'
}

// 根据搜索引擎来源检测语言
export function detectLanguageFromReferrer(referrer: string): string | null {
  if (!referrer) return null
  
  try {
    const url = new URL(referrer)
    const hostname = url.hostname.toLowerCase()
    
    for (const mapping of languageMappings) {
      if (mapping.searchEngines.some(engine => hostname.includes(engine))) {
        return mapping.code
      }
    }
  } catch (error) {
    console.error('Error parsing referrer URL:', error)
  }
  
  return null
}

// 综合语言检测
export function detectOptimalLanguage(
  acceptLanguage?: string,
  countryCode?: string,
  referrer?: string,
  userPreference?: string
): string {
  // 1. 用户明确设置的偏好
  if (userPreference && languageMappings.find(m => m.code === userPreference)) {
    return userPreference
  }
  
  // 2. 搜索引擎来源
  if (referrer) {
    const referrerLang = detectLanguageFromReferrer(referrer)
    if (referrerLang) return referrerLang
  }
  
  // 3. 浏览器语言设置
  if (acceptLanguage) {
    const headerLang = detectLanguageFromHeaders(acceptLanguage)
    if (headerLang !== 'zh-Hans') return headerLang
  }
  
  // 4. 地理位置
  if (countryCode) {
    const geoLang = detectLanguageFromGeoLocation(countryCode)
    if (geoLang !== 'en') return geoLang
  }
  
  // 5. 默认语言
  return 'zh-Hans'
}

// 生成语言切换URL
export function generateLanguageUrls(currentPath: string, baseUrl: string) {
  return languageMappings.map(mapping => ({
    ...mapping,
    url: mapping.code === 'zh-Hans' 
      ? `${baseUrl}${currentPath}`
      : `${baseUrl}/${mapping.code}${currentPath}`
  }))
}