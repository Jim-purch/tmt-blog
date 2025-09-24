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
  title: string;
  seo: string;
  weight: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  partNumber: string;
};