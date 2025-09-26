"use client";

import { useTranslation } from "@/lib/i18n";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  const { t } = useTranslation();

  // 生成页码数组
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7; // 最多显示7个页码按钮
    
    if (totalPages <= maxVisiblePages) {
      // 如果总页数小于等于最大显示页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 复杂的分页逻辑
      if (currentPage <= 4) {
        // 当前页在前面
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // 当前页在后面
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null; // 不显示分页器
  }

  return (
    <nav className={`flex items-center justify-center space-x-2 ${className}`} aria-label="分页导航">
      {/* 上一页按钮 */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200
          ${currentPage === 1
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white'
          }
        `}
        aria-label="上一页"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 页码按钮 */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            className={`
              px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200
              ${page === currentPage
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600'
                : page === '...'
                ? 'bg-transparent text-gray-500 border-transparent cursor-default dark:text-gray-400'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white'
              }
            `}
            aria-label={page === '...' ? '更多页面' : `第 ${page} 页`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 下一页按钮 */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200
          ${currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white'
          }
        `}
        aria-label="下一页"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}

// 每页显示数量选择器组件
type PageSizeSelectorProps = {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  options?: number[];
  className?: string;
};

export function PageSizeSelector({ 
  pageSize, 
  onPageSizeChange, 
  options = [12, 24, 36, 60], 
  className = "" 
}: PageSizeSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-600 dark:text-gray-400">每页显示:</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-600 dark:text-gray-400">个</span>
    </div>
  );
}