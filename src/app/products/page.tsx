"use client";

import Container from "@/app/_components/container";
import { ProductFilter } from "@/app/_components/product-filter";
import { ProductGrid } from "@/app/_components/product-grid";
import TopSearch from "@/app/_components/top-search";
import StickySearchBar from "@/app/_components/sticky-search-bar";
import { useTranslation } from "@/lib/i18n";
import { Product } from "@/interfaces/product";
import { getCategoryTranslationKey } from "@/lib/categoryUtils";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ProductsPageContent() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');
  const searchParam = searchParams.get('search');

  useEffect(() => {
    // 加载数据
    const loadData = async () => {
      try {
        // 并行加载所有数据
        const [productsRes, categoriesRes, brandsRes] = await Promise.all([
          fetch('/api/products?action=all'),
          fetch('/api/products?action=categories'),
          fetch('/api/products?action=brands')
        ]);

        if (!productsRes.ok || !categoriesRes.ok || !brandsRes.ok) {
          throw new Error('加载数据失败');
        }

        const allProducts: Product[] = await productsRes.json();
        const allCategories: string[] = await categoriesRes.json();
        const allBrands: string[] = await brandsRes.json();
        
        setProducts(allProducts);
        setCategories(allCategories);
        setBrands(allBrands);
        
        // 根据URL参数过滤产品
        let filtered = allProducts;
        
        // 处理搜索参数
        if (searchParam) {
          try {
            const searchResponse = await fetch(`/api/products?action=search&q=${encodeURIComponent(searchParam)}`);
            if (searchResponse.ok) {
              filtered = await searchResponse.json();
            }
          } catch (error) {
            console.error('搜索时出错:', error);
          }
        }
        
        // 处理分类参数
        if (categoryParam) {
          filtered = filtered.filter(product => product.category === categoryParam);
        }
        
        // 处理品牌参数
        if (brandParam) {
          filtered = filtered.filter(product => product.brand === brandParam);
        }
        
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('加载数据时出错:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryParam, brandParam, searchParam]);

  const handleFilterChange = async (filters: { category: string; brand: string; search: string }) => {
    let filtered = products;

    // 应用搜索过滤
    if (filters.search) {
      try {
        const response = await fetch(`/api/products?action=search&q=${encodeURIComponent(filters.search)}`);
        if (response.ok) {
          filtered = await response.json();
        }
      } catch (error) {
        console.error('搜索时出错:', error);
      }
    }

    // 应用分类过滤
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // 应用品牌过滤
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <main>
        <Container>
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <>
      {/* 固定搜索栏 - 始终显示在顶部 */}
      <StickySearchBar showOnScroll={true} />
      
      <main>
        <Container>
          <div className="py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('page.productsTitle')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('page.productsDesc')}
              </p>
            </div>

            {/* 原有的搜索区域保留，但样式调整 */}
            <div className="mb-8 py-6 bg-white dark:bg-gray-800 -mx-4 px-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('search.quickSearch')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {t('search.quickSearchDesc')}
                </p>
              </div>
              <TopSearch placeholder={t('search.placeholder')} />
            </div>

          <ProductFilter
            categories={categories}
            brands={brands}
            onFilterChange={handleFilterChange}
            initialCategory={categoryParam || ""}
            initialBrand={brandParam || ""}
            initialSearch={searchParam || ""}
          />

          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400">
              {t('page.foundProducts').replace('{count}', filteredProducts.length.toString())}
              {searchParam && (
                <span className="ml-2">
                  - {t('search.searchFor')} <span className="font-semibold">"{searchParam}"</span>
                </span>
              )}
              {categoryParam && (
                <span className="ml-2">
                  - {t('page.categoryFilter')} <span className="font-semibold">{t(getCategoryTranslationKey(categoryParam))}</span>
                </span>
              )}
              {brandParam && (
                <span className="ml-2">
                  - {t('page.brandFilter')} <span className="font-semibold">{brandParam}</span>
                </span>
              )}
            </p>
          </div>

          <ProductGrid
            products={filteredProducts}
            showAll={true}
          />
        </div>
      </Container>
    </main>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main>
        <Container>
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">加载中...</p>
            </div>
          </div>
        </Container>
      </main>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}