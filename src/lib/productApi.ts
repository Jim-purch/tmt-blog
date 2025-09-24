import { Product, ProductCSVRow } from "@/interfaces/product";
import { IMAGE_CONFIG } from "@/lib/constants";
import fs from "fs";
import { join } from "path";

const csvFilePath = join(process.cwd(), "public/data/products.csv");

// 解析CSV文件
function parseCSV(csvContent: string): ProductCSVRow[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || '';
    });
    
    return row as ProductCSVRow;
  });
}

// 生成产品slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 生成图片URL
function generateImageUrls(title: string) {
  const filename = `${generateSlug(title)}.jpg`;
  return {
    imageUrl: `${IMAGE_CONFIG.baseUrl}/${filename}`,
    thumbnailUrl: `${IMAGE_CONFIG.thumbnailBaseUrl}/${filename}`,
  };
}

// 将CSV行转换为Product对象
function csvRowToProduct(row: ProductCSVRow): Product {
  const slug = generateSlug(row.title);
  const { imageUrl, thumbnailUrl } = generateImageUrls(row.title);
  
  return {
    slug,
    title: row.title,
    seo: row.seo,
    weight: row.weight,
    price: row.price,
    description: row.description,
    category: row.category,
    brand: row.brand,
    partNumber: row.partNumber,
    imageUrl,
    thumbnailUrl,
  };
}

// 获取所有产品
export function getAllProducts(): Product[] {
  try {
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const csvRows = parseCSV(csvContent);
    return csvRows.map(csvRowToProduct);
  } catch (error) {
    console.error('Error reading products CSV:', error);
    return [];
  }
}

// 根据slug获取单个产品
export function getProductBySlug(slug: string): Product | null {
  const products = getAllProducts();
  return products.find(product => product.slug === slug) || null;
}

// 根据分类获取产品
export function getProductsByCategory(category: string): Product[] {
  const products = getAllProducts();
  return products.filter(product => product.category === category);
}

// 根据品牌获取产品
export function getProductsByBrand(brand: string): Product[] {
  const products = getAllProducts();
  return products.filter(product => product.brand === brand);
}

// 获取所有分类
export function getAllCategories(): string[] {
  const products = getAllProducts();
  const categories = [...new Set(products.map(product => product.category))];
  return categories.sort();
}

// 获取所有品牌
export function getAllBrands(): string[] {
  const products = getAllProducts();
  const brands = [...new Set(products.map(product => product.brand))];
  return brands.sort();
}

// 搜索产品
export function searchProducts(query: string): Product[] {
  const products = getAllProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.partNumber.toLowerCase().includes(searchTerm)
  );
}