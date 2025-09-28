'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supportedLocales, type Locale } from '@/lib/i18n';
import { autoDetectAndSetLanguage, markLanguagePreferenceSet, detectLanguageFromPath } from '@/lib/languageDetection';

export function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('zh-Hans');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 使用自动检测功能获取最佳语言
    const detectedLocale = autoDetectAndSetLanguage() as Locale;
    if (detectedLocale && supportedLocales.find(l => l.code === detectedLocale)) {
      setCurrentLocale(detectedLocale);
    }

    // 监听路径变化
    const handlePathChange = () => {
      const pathLanguage = detectLanguageFromPath();
      if (pathLanguage) {
        setCurrentLocale(pathLanguage as Locale);
      }
    };

    // 监听popstate事件（浏览器前进后退）
    window.addEventListener('popstate', handlePathChange);
    
    // 监听自定义语言变更事件
    const handleLocaleChange = (event: CustomEvent) => {
      setCurrentLocale(event.detail);
    };
    
    window.addEventListener('localeChange', handleLocaleChange as EventListener);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      window.removeEventListener('localeChange', handleLocaleChange as EventListener);
    };
  }, []); // 移除currentLocale依赖，避免无限循环

  const currentLocaleInfo = supportedLocales.find(l => l.code === currentLocale);

  const handleLanguageChange = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    markLanguagePreferenceSet(); // 标记用户已设置语言偏好
    setIsOpen(false);
    
    // 构建新的URL路径
    const currentPath = pathname;
    
    // 移除当前路径中的语言前缀（如果存在）
    const pathSegments = currentPath.split('/').filter(Boolean);
    const currentPathLanguage = detectLanguageFromPath();
    
    if (currentPathLanguage) {
      // 如果当前路径有语言前缀，移除它
      pathSegments.shift();
    }
    
    // 构建新路径
    let newPath = '';
    // 所有语言都使用语言前缀，确保URL一致性
    newPath = '/' + newLocale + (pathSegments.length > 0 ? '/' + pathSegments.join('/') : '');
    
    // 确保路径格式正确，避免双斜杠
    newPath = newPath.replace(/\/+/g, '/');
    if (newPath === '') newPath = '/';
    
    // 导航到新路径
    router.push(newPath);
    
    // 触发自定义事件，通知其他组件语言已更改
    window.dispatchEvent(new CustomEvent('localeChange', { detail: newLocale }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        title="切换语言"
      >
        <span className="text-lg">{currentLocaleInfo?.flag}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLocaleInfo?.code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
            {supportedLocales.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentLocale === lang.code 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{lang.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {lang.code}
                  </div>
                </div>
                {currentLocale === lang.code && (
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}