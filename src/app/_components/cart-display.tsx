'use client';

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { CartItem } from "@/interfaces/cart";
import { useTranslation } from "@/lib/i18n";
import { getLocalizedContact } from "@/config/contact";

export function CartDisplay() {
  const { cart, clearCart, removeItem, updateQuantity } = useCart();
  const { t, locale } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // 获取本地化的联系方式
  const contact = getLocalizedContact(locale);

  // 计算购物车商品总数
  const totalItems = cart?.items?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0;

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
                  `${contact.email}\t\t\t\t\n` +
                  `${contact.phone}\t\t\t\t`;
    
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
    <div className="fixed right-4 bottom-4 z-40">
      {/* 购物车图标 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg relative"
        >
          <div className="relative">
            {/* 叉车图标 */}
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              {/* 叉车主体 */}
              <rect x="2" y="14" width="8" height="4" rx="0.5" />
              {/* 叉车驾驶室 */}
              <rect x="8" y="10" width="4" height="8" rx="0.5" />
              {/* 叉车叉子 */}
              <rect x="12" y="8" width="8" height="1" rx="0.5" />
              <rect x="12" y="11" width="8" height="1" rx="0.5" />
              {/* 叉车立柱 */}
              <rect x="12" y="6" width="1" height="8" rx="0.5" />
              {/* 前轮 */}
              <circle cx="4" cy="19" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* 后轮 */}
              <circle cx="8" cy="19" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* 货物 */}
              <rect x="14" y="6" width="4" height="2" rx="0.3" opacity="0.7" />
            </svg>
            {/* 数量徽章 */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[20px]">
                {totalItems}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* 购物车展开内容 */}
      {isExpanded && (
        <div className="absolute right-0 bottom-full mb-2 w-80 max-w-[calc(100vw-1rem)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {t('cart.title')} ({totalItems}{t('cart.items')})
            </h3>
          </div>

          {/* 商品列表 */}
          <div className="max-h-64 overflow-y-auto">
            {totalItems === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                {/* 空状态叉车图标 */}
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  {/* 叉车主体 */}
                  <rect x="2" y="14" width="8" height="4" rx="0.5" />
                  {/* 叉车驾驶室 */}
                  <rect x="8" y="10" width="4" height="8" rx="0.5" />
                  {/* 叉车叉子 */}
                  <rect x="12" y="8" width="8" height="1" rx="0.5" />
                  <rect x="12" y="11" width="8" height="1" rx="0.5" />
                  {/* 叉车立柱 */}
                  <rect x="12" y="6" width="1" height="8" rx="0.5" />
                  {/* 前轮 */}
                  <circle cx="4" cy="19" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
                  {/* 后轮 */}
                  <circle cx="8" cy="19" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
                <p className="text-sm">{t('cart.empty')}</p>
              </div>
            ) : (
              cart?.items?.map((item: CartItem) => (
              <div key={`${item.product.slug}-${item.product.partNumber}`} className="p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {t('product.model')} {item.product.partNumber}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {t('product.brand')} {item.product.brand}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {/* 数量调整控件 */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                    {/* 删除按钮 */}
                    <button
                      onClick={() => removeItem(item.product.slug)}
                      className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1"
                      title={t('cart.remove')}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>
              </div>
            )))}
          </div>

          {/* 底部操作区 */}
          {totalItems > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg space-y-3">
              <div className="flex space-x-2">
              {/* 立即联系按钮 */}
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
                title={t('cart.contactNow')}
                className="w-24 h-10 px-2 py-2.5 font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.875rem)' }}
              >
                <div className="flex items-center justify-center space-x-1 h-full">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">{t('cart.contactNow')}</span>
                </div>
              </button>
              
              <button
                onClick={copyToClipboard}
                title={copySuccess ? t('cart.copySuccess') : t('cart.copyList').replace('📋 ', '')}
                className={`w-28 h-10 px-2 py-2.5 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
                  copySuccess 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                }`}
                style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.875rem)' }}
              >
                {copySuccess ? (
                  <div className="flex items-center justify-center space-x-1 h-full">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">{t('cart.copySuccess')}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-1 h-full">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">{t('cart.copyList').replace('📋 ', '')}</span>
                  </div>
                )}
              </button>
              
              <button
                onClick={clearCart}
                title={t('cart.clear')}
                className="w-16 h-10 px-2 py-2.5 font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.875rem)' }}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis block">{t('cart.clear')}</span>
              </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}