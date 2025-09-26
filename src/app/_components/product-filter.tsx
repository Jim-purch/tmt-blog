"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { getCategoryTranslationKey } from "@/lib/categoryUtils";

type Props = {
  categories: string[];
  brands: string[];
  onFilterChange: (filters: { category: string; brand: string; search: string }) => void;
  initialCategory?: string;
  initialBrand?: string;
  initialSearch?: string;
};

export function ProductFilter({ 
  categories, 
  brands, 
  onFilterChange, 
  initialCategory = "", 
  initialBrand = "", 
  initialSearch = "" 
}: Props) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  
  // 品牌自动完成相关状态
  const [brandInput, setBrandInput] = useState(initialBrand);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
  const brandInputRef = useRef<HTMLInputElement>(null);
  const brandSuggestionsRef = useRef<HTMLDivElement>(null);

  // 当初始值改变时更新状态
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSelectedBrand(initialBrand);
    setBrandInput(initialBrand);
    setSearchTerm(initialSearch);
  }, [initialCategory, initialBrand, initialSearch]);

  // 品牌输入变化处理
  useEffect(() => {
    if (brandInput.trim() === '') {
      setFilteredBrands([]);
      setShowBrandSuggestions(false);
      return;
    }

    const filtered = brands.filter(brand => 
      brand.toLowerCase().includes(brandInput.toLowerCase())
    );
    setFilteredBrands(filtered);
    setShowBrandSuggestions(filtered.length > 0);
  }, [brandInput, brands]);

  // 点击外部关闭建议列表
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandInputRef.current && 
        !brandInputRef.current.contains(event.target as Node) &&
        brandSuggestionsRef.current &&
        !brandSuggestionsRef.current.contains(event.target as Node)
      ) {
        setShowBrandSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // 品牌输入处理
  const handleBrandInputChange = (value: string) => {
    setBrandInput(value);
    setSelectedBrand(value); // 实时更新选中的品牌，支持模糊搜索
    handleFilterChange({ brand: value });
  };

  // 选择品牌建议
  const handleBrandSelect = (brand: string) => {
    setBrandInput(brand);
    setSelectedBrand(brand);
    setShowBrandSuggestions(false);
    handleFilterChange({ brand });
  };

  // 品牌输入框获得焦点
  const handleBrandInputFocus = () => {
    if (brandInput.trim() !== '' && filteredBrands.length > 0) {
      setShowBrandSuggestions(true);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setBrandInput("");
    setSearchTerm("");
    setShowBrandSuggestions(false);
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

        {/* 品牌筛选 - 自动完成输入框 */}
        <div className="relative">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('filter.brand')}
          </label>
          <input
            ref={brandInputRef}
            type="text"
            id="brand"
            value={brandInput}
            onChange={(e) => handleBrandInputChange(e.target.value)}
            onFocus={handleBrandInputFocus}
            placeholder={t('filter.allBrands')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          
          {/* 品牌建议列表 */}
          {showBrandSuggestions && filteredBrands.length > 0 && (
            <div
              ref={brandSuggestionsRef}
              className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {filteredBrands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => handleBrandSelect(brand)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none text-gray-900 dark:text-white"
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
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