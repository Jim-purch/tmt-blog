'use client';

import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export function CartIcon() {
  const { cart } = useCart();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
        </svg>
        
        {/* 购物车数量徽章 */}
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {cart.totalItems > 99 ? '99+' : cart.totalItems}
          </span>
        )}
      </button>

      {/* 悬停提示 */}
      {showTooltip && cart.totalItems > 0 && (
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-64 z-50">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            购物车 ({cart.totalItems} 件商品)
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cart.items.slice(0, 3).map((item) => (
              <div key={item.product.slug} className="flex items-center gap-2 text-xs">
                <span className="flex-1 text-gray-600 dark:text-gray-300 truncate">
                  {item.product.brand} {item.product.partNumber}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  x{item.quantity}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  ¥{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            {cart.items.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-1">
                还有 {cart.items.length - 3} 件商品...
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-gray-900 dark:text-white">总计:</span>
              <span className="text-blue-600 dark:text-blue-400">¥{cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}