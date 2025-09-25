export type Product = {
  slug: string;
  title: string;
  seo: string;
  weight: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  partNumber: string;
  imageUrl: string;
  thumbnailUrl: string;
};

export type ProductCSVRow = {
  weight: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  partNumber: string;
};

import { PRODUCT_CONFIG } from "@/lib/constants";

// 辅助函数：根据brand、partNumber和description生成title和seo
export function generateProductTitle(brand: string, partNumber: string, description: string): string {
  const productTitle = `${brand}-${partNumber}-${description}`;
  return `${PRODUCT_CONFIG.titlePrefix}${PRODUCT_CONFIG.titleSeparator}${productTitle}`;
}

export function generateProductSeo(brand: string, partNumber: string, description: string): string {
  // 生成基础SEO字符串
  const baseSeo = `${brand}-${partNumber}-${description}`;
  
  // 转换为小写并优化SEO格式
  const cleanSeo = baseSeo
    .toLowerCase() // 转为小写
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '') // 移除特殊字符，保留中文、英文、数字、空格和连字符
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/-+/g, '-') // 将多个连字符合并为一个
    .replace(/^-|-$/g, ''); // 移除开头和结尾的连字符
  
  return `${PRODUCT_CONFIG.seoPrefix}${PRODUCT_CONFIG.seoSeparator}${cleanSeo}`;
}