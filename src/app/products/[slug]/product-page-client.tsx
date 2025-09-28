'use client';

import { ProductGrid } from "@/app/_components/product-grid";
import { IMAGE_CONFIG } from "@/lib/constants";
import { openEmailClient } from "@/lib/emailUtils";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/interfaces/product";
import { getCategoryTranslationKey } from "@/lib/categoryUtils";
import { useTranslation } from "@/lib/i18n";
import { useFormatPrice } from "@/lib/useCurrency";
import { OptimizedImage } from "@/app/_components/optimized-image";
import Link from "next/link";
import { useState } from "react";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const { t } = useTranslation();
  const { addItem, isInCart, getItemQuantity } = useCart();
  const formatPrice = useFormatPrice();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // 处理立即联系按钮点击
  const handleContactClick = () => {
    openEmailClient(product);
  };

  // 处理加入购物车按钮点击
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addItem(product, 1);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // 在渲染时动态计算购物车状态，确保实时更新
  const itemQuantity = getItemQuantity(product.slug);
  const isProductInCart = isInCart(product.slug);

  return (
    <div className="py-8">
      {/* 面包屑导航 */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          {t('common.home')}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href="/products" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          {t('common.products')}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link 
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t(getCategoryTranslationKey(product.category))}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700 dark:text-gray-300">{product.title}</span>
      </nav>

      {/* 产品详情 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* 产品图片 */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <OptimizedImage
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            priority
            checkExists={true}
          />
          </div>
        </div>

        {/* 产品信息 */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {t(getCategoryTranslationKey(product.category))}
              </span>
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                {product.brand}
              </span>
            </div>
          </div>

          {formatPrice(product.price) && (
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 产品规格 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('product.specifications')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('product.weight')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('product.brand')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('product.partNumber')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.partNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('product.category')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{t(getCategoryTranslationKey(product.category))}</span>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleContactClick}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('product.contactNow')}
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`flex-1 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isProductInCart 
                  ? 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300' 
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
              } ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAddingToCart ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('product.adding')}
                </>
              ) : isProductInCart ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('product.inCart').replace('{quantity}', itemQuantity.toString())}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
                  </svg>
                  {t('product.addToCart')}
                </>
              )}
            </button>
          </div>

          {/* 添加成功提示 */}
          {showAddedMessage && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t('product.addSuccess')}
            </div>
          )}
        </div>
      </div>

      {/* 相关产品 */}
      {relatedProducts.length > 0 && (
        <div>
          <ProductGrid
            products={relatedProducts}
            title={t('product.relatedProducts')}
            showAll={true}
          />
        </div>
      )}
    </div>
  );
}