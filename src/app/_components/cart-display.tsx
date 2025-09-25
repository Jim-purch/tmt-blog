'use client';

import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { CartItem } from "@/interfaces/cart";
import { useTranslation } from "@/lib/i18n";

export function CartDisplay() {
  const { cart, clearCart } = useCart();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // 如果购物车为空，不显示组件
  if (!cart || cart.items.length === 0) {
    return null;
  }

  // 生成购物车文本内容（表格格式）
  const generateCartText = () => {
    const header = `${t('cart.title')}\t\t\t\t\n` +
                  `${t('cart.generatedAt')}: ${new Date().toLocaleString()}\t\t\t\t\n\n` +
                  `${t('cart.headers.index')}\t${t('cart.headers.productName')}\t${t('cart.headers.partNumber')}\t${t('cart.headers.brand')}\t${t('cart.headers.category')}\t${t('cart.headers.quantity')}\n`;
    
    const itemsList = cart.items.map((item: CartItem, index: number) => 
      `${index + 1}\t${item.product.title}\t${item.product.partNumber}\t${item.product.brand}\t${item.product.category}\t${item.quantity}`
    ).join('\n');
    
    const footer = `\n\n${t('cart.totalItems')}:\t${cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)} ${t('cart.items')}\t\t\t\t\n\n` +
                  `${t('cart.note')}\t\t\t\t\n` +
                  `${t('cart.contact.email')}\t\t\t\t\n` +
                  `${t('cart.contact.phone')}\t\t\t\t`;
    
    return header + itemsList + footer;
  };

  // 复制购物车内容到剪贴板
  const copyToClipboard = async () => {
    try {
      const cartText = generateCartText();
      await navigator.clipboard.writeText(cartText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      // 降级方案：创建临时文本区域
      const textArea = document.createElement('textarea');
      textArea.value = generateCartText();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="fixed right-2 sm:right-5 top-28 z-40">
      {/* 购物车图标 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg relative"
        >
          <div className="relative">
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
            {/* 数量徽章 */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[20px]">
              {cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
            </span>
          </div>
        </button>
      </div>

      {/* 购物车展开内容 */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-1rem)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">
              购物车 ({cart.items.length}项)
            </h3>
          </div>

          {/* 商品列表 */}
          <div className="max-h-64 overflow-y-auto">
            {cart.items.map((item: CartItem) => (
              <div key={`${item.product.slug}-${item.product.partNumber}`} className="p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                      型号: {item.product.partNumber}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      品牌: {item.product.brand}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      数量: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 底部操作区 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg space-y-3">
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
                  copySuccess 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
              >
                {copySuccess ? (
                  <div className="flex items-center justify-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('cart.copySuccess')}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{t('cart.copyList').replace('📋 ', '')}</span>
                  </div>
                )}
              </button>
              
              <button
                onClick={clearCart}
                className="px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                {t('cart.clear')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}