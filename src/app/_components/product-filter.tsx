"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { getCategoryTranslationKey } from "@/lib/categoryUtils";

type Props = {
  categories: string[];
  brands: string[];
  onFilterChange: (filters: { category: string; brand: string; search: string }) => void;
};

export function ProductFilter({ categories, brands, onFilterChange }: Props) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilters: Partial<{ category: string; brand: string; search: string }>) => {
    const updatedFilters = {
      category: newFilters.category ?? selectedCategory,
      brand: newFilters.brand ?? selectedBrand,
      search: newFilters.search ?? searchTerm,
    };

    if (newFilters.category !== undefined) setSelectedCategory(newFilters.category);
    if (newFilters.brand !== undefined) setSelectedBrand(newFilters.brand);
    if (newFilters.search !== undefined) setSearchTerm(newFilters.search);

    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSearchTerm("");
    onFilterChange({ category: "", brand: "", search: "" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('filter.title')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 搜索框 */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('filter.search')}
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            placeholder={t('filter.searchPlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* 分类筛选 */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('filter.category')}
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleFilterChange({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('filter.allCategories')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {t(getCategoryTranslationKey(category))}
              </option>
            ))}
          </select>
        </div>

        {/* 品牌筛选 */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('filter.brand')}
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => handleFilterChange({ brand: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('filter.allBrands')}</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* 清除按钮 */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition-colors duration-200"
          >
            {t('filter.clearFilters')}
          </button>
        </div>
      </div>
    </div>
  );
}