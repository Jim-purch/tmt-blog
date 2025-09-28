'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/interfaces/product'
import { getCategoryTranslationKey } from '@/lib/categoryUtils'
import { useTranslation } from '@/lib/i18n'
import { useFormatPrice } from '@/lib/useCurrency'

interface TopSearchProps {
  placeholder?: string
  showResults?: boolean
}

export default function TopSearch({ 
  placeholder, 
  showResults = true 
}: TopSearchProps) {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  
  // 使用国际化的默认占位符
  const searchPlaceholder = placeholder || t('search.placeholder')

  // 搜索产品
  const searchProducts = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/products?action=search&q=${encodeURIComponent(term)}`)
      if (!response.ok) {
        throw new Error(t('search.searchFailed'))
      }
      const filtered: Product[] = await response.json()
      setSearchResults(filtered.slice(0, 5)) // 只显示前5个结果
      setShowDropdown(showResults && filtered.length > 0)
    } catch (error) {
      console.error(t('search.searchError'), error)
      setSearchResults([])
      setShowDropdown(false)
    } finally {
      setIsSearching(false)
    }
  }

  // 防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setShowDropdown(false)
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  // 处理产品点击
  const handleProductClick = (product: Product) => {
    setShowDropdown(false)
    setSearchTerm('')
    router.push(`/products/${product.seo}`)
  }

  // 处理输入框失焦
  const handleBlur = () => {
    // 延迟隐藏下拉框，以便点击结果项
    setTimeout(() => setShowDropdown(false), 200)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm && searchResults.length > 0 && setShowDropdown(true)}
            onBlur={handleBlur}
            placeholder={searchPlaceholder}
            className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {isSearching && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </form>

      {/* 搜索结果下拉框 */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-3 py-2 border-b">
              {t('search.foundRelated').replace('{count}', searchResults.length.toString())}
            </div>
            {searchResults.map((product) => (
              <button
                key={product.slug}
                onClick={() => handleProductClick(product)}
                className="w-full text-left px-3 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {t(getCategoryTranslationKey(product.category))} • {product.brand}
                    </p>
                    {formatPrice(product.price) && (
                      <p className="text-sm font-semibold text-blue-600">
                        {formatPrice(product.price)}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
            {searchResults.length === 5 && (
              <button
                onClick={() => {
                  setShowDropdown(false)
                  router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
                }}
                className="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {t('search.viewAllResults')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}