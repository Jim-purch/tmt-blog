"use client";

import { useTranslation } from "@/lib/i18n";
import { ProductGrid } from "@/app/_components/product-grid";
import TopSearch from "@/app/_components/top-search";
import { Product } from "@/interfaces/product";

interface HomeContentProps {
  featuredProducts: Product[];
}

export function HomeContent({ featuredProducts }: HomeContentProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* 顶部搜索区域 */}
      <div className="mb-12 py-8 bg-white dark:bg-gray-800 -mx-4 px-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('search.quickSearch')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('search.quickSearchDesc')}
          </p>
        </div>
        <TopSearch placeholder={t('search.placeholder')} />
      </div>
      
      {/* 产品展示区域 */}
      <div className="mb-16 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 -mx-4 px-4 rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.featuredProducts')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('home.featuredProductsDesc')}
          </p>
        </div>
        
        <ProductGrid 
          products={featuredProducts} 
          maxItems={8}
          showAll={false}
        />
      </div>

      {/* 产品分类展示 */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.productCategories')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('home.productCategoriesDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'brakeSystem',
            'engineSystem', 
            'suspensionSystem',
            'tireSystem',
            'lightingSystem',
            'exteriorAccessories'
          ].map((categoryKey) => {
            const categoryName = t(`home.categories.${categoryKey}`);
            return (
              <a
                key={categoryKey}
                href={`/products?category=${encodeURIComponent(categoryKey)}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-blue-500"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {categoryName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('home.viewAllProducts').replace('{category}', categoryName)}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}