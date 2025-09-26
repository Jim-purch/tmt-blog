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
  const productTitle = `${partNumber}-${brand}-${description}`;
  return `${productTitle}${PRODUCT_CONFIG.titleSeparator}${PRODUCT_CONFIG.titlePrefix}`;
}

// 生成产品的基础slug（不包含前缀）- 使用partNumber-brand-description格式
export function generateProductSlug(brand: string, partNumber: string, description: string): string {
  const baseSlug = `${partNumber}-${brand}-${description}`;
  
  // 转换为URL友好的格式
  return baseSlug
    .toLowerCase() // 转为小写
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '') // 移除特殊字符，保留中文、英文、数字、空格和连字符
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/-+/g, '-') // 将多个连字符合并为一个
    .replace(/^-|-$/g, ''); // 移除开头和结尾的连字符
}

// 生成完整的SEO路径（包含业务前缀）- 使用partNumber-brand-description格式
export function generateProductSeo(brand: string, partNumber: string, description: string): string {
  const slug = generateProductSlug(brand, partNumber, description);
  return `${PRODUCT_CONFIG.seoPrefix}${PRODUCT_CONFIG.seoSeparator}${slug}`;
}

// 生成图片文件名（仅使用partNumber-brand格式）
export function generateImageSlug(brand: string, partNumber: string): string {
  const imageSlug = `${partNumber}-${brand}`;
  
  // 转换为URL友好的格式
  return imageSlug
    .toLowerCase() // 转为小写
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '') // 移除特殊字符，保留中文、英文、数字、空格和连字符
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/-+/g, '-') // 将多个连字符合并为一个
    .replace(/^-|-$/g, ''); // 移除开头和结尾的连字符
}