import Container from "@/app/_components/container";
import { ProductGrid } from "@/app/_components/product-grid";
import { ProductStructuredData } from "@/app/_components/product-structured-data";
import StickySearchBar from "@/app/_components/sticky-search-bar";
import { getAllProducts, getProductBySlug, getProductsByCategory } from "@/lib/productApi";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageClient } from "./product-page-client";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // 获取相关产品（同分类的其他产品）
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      {/* 固定搜索栏 */}
      <StickySearchBar showOnScroll={true} />
      
      <main>
        <ProductStructuredData product={product} />
        <Container>
          <ProductPageClient product={product} relatedProducts={relatedProducts} />
        </Container>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.seo, // 使用完整的seo路径作为URL参数
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "产品未找到",
    };
  }

  return {
    title: product.title,
    description: product.description,
    keywords: `${product.brand}, ${product.partNumber}, ${product.category}, 叉车配件, TMT`,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `/products/${product.seo}`,
      siteName: "TMT叉车配件",
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      locale: "zh_CN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.imageUrl],
    },
    alternates: {
      canonical: `/products/${product.seo}`,
    },
  };
}