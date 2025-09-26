"use client";

import { Product } from "@/interfaces/product";
import { IMAGE_CONFIG } from "@/lib/constants";
import { getCategoryTranslationKey } from "@/lib/categoryUtils";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-[450px] flex flex-col">
      <Link href={`/products/${product.seo}`} className="block flex-1 flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          {IMAGE_CONFIG.enabled ? (
            <Image
              src={product.thumbnailUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('product.imageNotAvailable')}</p>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
            ¥{product.price}
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="relative mb-2">
            <h3 
              className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-6 h-12"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              title={product.title}
            >
              {product.title}
            </h3>
            
            {/* Tooltip for full title */}
            {showTooltip && product.title.length > 40 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 p-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded shadow-lg opacity-95 pointer-events-none">
                {product.title}
                <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
              </div>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
              {t(getCategoryTranslationKey(product.category))}
            </span>
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs">
              {product.brand}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
            <span>{t('product.weight')} {product.weight}</span>
            <span>{t('product.partNumber')} {product.partNumber}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}