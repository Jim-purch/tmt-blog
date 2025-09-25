'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Post } from '@/interfaces/post';
import { useTranslation } from '@/lib/i18n';

interface SearchProps {
  posts: Post[];
}

// 产品元数据接口
interface ProductMetadata {
  slug: string;
  title: string;
  date: string;
}

export default function Search({ posts }: SearchProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ProductMetadata[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [productMetadata, setProductMetadata] = useState<ProductMetadata[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // 初始化产品元数据（仅包含标题、slug和日期）
  useEffect(() => {
    const metadata = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date
    }));
    setProductMetadata(metadata);
  }, [posts]);

  // 搜索逻辑 - 仅搜索标题
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const filteredProducts = productMetadata.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredProducts);
  }, [searchTerm, productMetadata]);

  // 点击外部关闭搜索结果
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 可以在这里添加搜索提交逻辑
  };

  const handleProductClick = () => {
    setIsSearching(false);
    setSearchTerm('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder={t('search.partNumberPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-blue-400 shadow-lg"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <svg
            className="h-6 w-6 text-gray-400"
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
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setIsSearching(false);
              }}
              className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* 搜索结果 */}
      {isSearching && searchTerm.trim() !== '' && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-10 max-h-80 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-600">
                {t('search.foundResults').replace('{count}', searchResults.length.toString())}
              </div>
              {searchResults.map((product) => (
                <Link
                  key={product.slug}
                  href={`/posts/${product.slug}`}
                  className="block px-6 py-4 hover:bg-blue-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors duration-200"
                  onClick={handleProductClick}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900 dark:text-white text-lg">
                      {product.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(product.date).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-gray-500 dark:text-gray-400 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <div className="text-lg font-medium mb-1">{t('search.noResults')}</div>
              <div className="text-sm">{t('search.tryOtherKeywords')}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}