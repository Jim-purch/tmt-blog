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

// 辅助函数：根据brand、partNumber和description生成title和seo
export function generateProductTitle(brand: string, partNumber: string, description: string): string {
  return `${brand}-${partNumber}-${description}`;
}

export function generateProductSeo(brand: string, partNumber: string, description: string): string {
  return `${brand}-${partNumber}-${description}`.toLowerCase().replace(/\s+/g, '-');
}