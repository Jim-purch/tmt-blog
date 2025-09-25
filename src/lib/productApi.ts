import { Product, ProductCSVRow, generateProductTitle, generateProductSeo, generateProductSlug } from "@/interfaces/product";
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

// 注意：现在直接使用seo字段作为slug，因为它已经是URL友好的格式

// 生成图片URL
function generateImageUrls(seo: string) {
  const filename = `${seo}.jpg`;
  return {
    imageUrl: `${IMAGE_CONFIG.baseUrl}/${filename}`,
    thumbnailUrl: `${IMAGE_CONFIG.thumbnailBaseUrl}/${filename}`,
  };
}

// 将CSV行转换为Product对象
function csvRowToProduct(row: ProductCSVRow): Product {
  const title = generateProductTitle(row.brand, row.partNumber, row.description);
  const slug = generateProductSlug(row.brand, row.partNumber, row.description); // 基础slug，不含前缀
  const seo = generateProductSeo(row.brand, row.partNumber, row.description); // 完整SEO路径，含前缀
  const { imageUrl, thumbnailUrl } = generateImageUrls(slug); // 图片使用基础slug
  
  return {
    slug,
    title,
    seo,
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

// 根据slug获取单个产品（支持通过seo字段查找）
export function getProductBySlug(slug: string): Product | null {
  const products = getAllProducts();
  // 首先尝试通过seo字段查找（完整路径）
  let product = products.find(product => product.seo === slug);
  // 如果没找到，再尝试通过基础slug查找
  if (!product) {
    product = products.find(product => product.slug === slug);
  }
  return product || null;
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