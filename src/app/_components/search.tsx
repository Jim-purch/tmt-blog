"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Post } from "@/interfaces/post";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

interface SearchProps {
  posts: Post[];
}

export default function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 搜索逻辑
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
    ).slice(0, 5); // 限制显示前5个结果
  }, [query, posts]);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.trim().length > 0);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="search-container relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="搜索文章..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:focus:border-blue-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
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
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-600 max-h-96 overflow-y-auto">
          {searchResults.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              onClick={handleResultClick}
              className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-100 dark:border-slate-700 last:border-b-0"
            >
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 line-clamp-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                  {formatDistanceToNow(new Date(post.date), { 
                    addSuffix: true, 
                    locale: zhCN 
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 无搜索结果 */}
      {isOpen && query.trim() && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-600">
          <div className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
            没有找到相关文章
          </div>
        </div>
      )}
    </div>
  );
}