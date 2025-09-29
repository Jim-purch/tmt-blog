'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { detectBrowserLanguage, isFirstVisit, markLanguagePreferenceSet, detectLanguageFromPath } from '@/lib/languageDetection';
import { supportedLocales, type Locale } from '@/lib/i18n';

export function LanguageAutoDetector() {
  const [showDetectionPrompt, setShowDetectionPrompt] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<Locale>('en');
  const [currentLanguage, setCurrentLanguage] = useState<Locale>('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 检查是否为首次访问
    if (isFirstVisit()) {
      const detected = detectBrowserLanguage() as Locale;
      // 优先从URL路径获取当前语言，如果没有则从localStorage获取，最后默认为'en'
      const pathLanguage = detectLanguageFromPath();
      const storedLanguage = localStorage.getItem('locale');
      const current = (pathLanguage || storedLanguage || 'en') as Locale;
      
      // 如果检测到的语言与当前语言不同，且不是默认语言，显示提示
      if (detected !== current && detected !== 'en') {
        setDetectedLanguage(detected);
        setCurrentLanguage(current);
        setShowDetectionPrompt(true);
      }
    }
  }, [pathname]);

  const handleAcceptDetection = () => {
    // 接受检测到的语言
    localStorage.setItem('locale', detectedLanguage);
    markLanguagePreferenceSet();
    
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
    newPath = '/' + detectedLanguage + (pathSegments.length > 0 ? '/' + pathSegments.join('/') : '');
    
    // 确保路径格式正确，避免双斜杠
    newPath = newPath.replace(/\/+/g, '/');
    if (newPath === '') newPath = '/';
    
    // 导航到新路径
    router.push(newPath);
    
    // 触发语言变更事件
    window.dispatchEvent(new CustomEvent('localeChange', { 
      detail: detectedLanguage 
    }));
    
    setShowDetectionPrompt(false);
  };

  const handleKeepCurrent = () => {
    // 保持当前语言，标记用户已做出选择
    markLanguagePreferenceSet();
    setShowDetectionPrompt(false);
  };

  const handleDismiss = () => {
    // 暂时关闭提示，但不标记为已设置
    setShowDetectionPrompt(false);
  };

  if (!showDetectionPrompt) {
    return null;
  }

  const detectedLocaleInfo = supportedLocales.find(l => l.code === detectedLanguage);
  const currentLocaleInfo = supportedLocales.find(l => l.code === currentLanguage);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="font-medium">语言检测</span>
            </div>
            <div className="text-sm">
              我们检测到您的浏览器语言是 
              <span className="mx-1 font-semibold">
                {detectedLocaleInfo?.flag} {detectedLocaleInfo?.name}
              </span>
              ，是否切换到该语言？
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptDetection}
              className="px-4 py-1.5 bg-white text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              切换到 {detectedLocaleInfo?.name}
            </button>
            <button
              onClick={handleKeepCurrent}
              className="px-4 py-1.5 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              保持 {currentLocaleInfo?.name}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-blue-700 rounded-md transition-colors"
              title="关闭"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}