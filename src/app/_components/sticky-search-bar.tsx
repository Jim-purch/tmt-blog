'use client'

import { useState, useEffect } from 'react'
import TopSearch from './top-search'
import { useTranslation } from '@/lib/i18n'
import { SITE_CONFIG } from '@/lib/constants'

interface StickySearchBarProps {
  placeholder?: string
  showOnScroll?: boolean
}

export default function StickySearchBar({ 
  placeholder, 
  showOnScroll = true 
}: StickySearchBarProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(!showOnScroll)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (!showOnScroll) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // 当向下滚动超过100px时显示搜索栏
      if (currentScrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showOnScroll, lastScrollY])

  if (!isVisible && showOnScroll) {
    return null
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ${
      showOnScroll ? 'animate-slide-down' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* 桌面端布局 */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo/品牌名称 */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {SITE_CONFIG.title}
            </a>
          </div>
          
          {/* 搜索框 */}
          <div className="flex-1 max-w-2xl mx-8">
            <TopSearch 
              placeholder={placeholder || t('search.placeholder')} 
              showResults={true}
            />
          </div>
          
          {/* 导航链接 */}
          <div className="flex items-center space-x-6">
            <a 
              href="/products" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t('nav.products')}
            </a>
            <button 
              onClick={() => {
                const footer = document.getElementById('contact-footer');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth' });
                  // 添加突出显示效果
                  const contactSection = footer.querySelector('.contact-section');
                  if (contactSection) {
                    contactSection.classList.add('highlight-contact');
                    setTimeout(() => {
                      contactSection.classList.remove('highlight-contact');
                    }, 3000);
                  }
                }
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium cursor-pointer"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>

        {/* 移动端布局 */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            {/* Logo */}
            <a href="/" className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {SITE_CONFIG.title}
            </a>
            
            {/* 移动端导航 */}
            <div className="flex items-center space-x-4">
              <a 
                href="/products" 
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {t('nav.products')}
              </a>
              <button 
                onClick={() => {
                  const footer = document.getElementById('contact-footer');
                  if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                    // 添加突出显示效果
                    const contactSection = footer.querySelector('.contact-section');
                    if (contactSection) {
                      contactSection.classList.add('highlight-contact');
                      setTimeout(() => {
                        contactSection.classList.remove('highlight-contact');
                      }, 3000);
                    }
                  }
                }}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium cursor-pointer"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
          
          {/* 移动端搜索框 */}
          <div className="w-full">
            <TopSearch 
              placeholder={placeholder || t('search.placeholder')} 
              showResults={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}