"use client";

import { Product } from "@/interfaces/product";
import { ProductCard } from "./product-card";
import { useTranslation } from "@/lib/i18n";

type Props = {
  products: Product[];
  title?: string;
  showAll?: boolean;
  maxItems?: number;
};

export function ProductGrid({ products, title, showAll = false, maxItems = 8 }: Props) {
  const { t } = useTranslation();
  const displayProducts = showAll ? products : products.slice(0, maxItems);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">{t('product.noProducts')}</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-blue-600 rounded"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      
      {!showAll && products.length > maxItems && (
        <div className="text-center mt-8">
          <a
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {t('product.viewMore').replace('{count}', `${products.length - maxItems}`)}
          </a>
        </div>
      )}
    </section>
  );
}