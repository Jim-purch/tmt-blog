import Container from "@/app/_components/container";
import { ProductGrid } from "@/app/_components/product-grid";
import { ProductStructuredData } from "@/app/_components/product-structured-data";
import { getAllProducts, getProductBySlug, getProductsByCategory } from "@/lib/productApi";
import { IMAGE_CONFIG } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: Params) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // 获取相关产品（同分类的其他产品）
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <main>
      <ProductStructuredData product={product} />
      <Container>
        <div className="py-8">
          {/* 面包屑导航 */}
          <nav className="flex mb-8 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              首页
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              产品中心
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link 
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {product.category}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700 dark:text-gray-300">{product.title}</span>
          </nav>

          {/* 产品详情 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* 产品图片 */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {IMAGE_CONFIG.enabled ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">产品图片暂不可用</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">图片服务暂时关闭</p>
                  </div>
                )}
              </div>
            </div>

            {/* 产品信息 */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                    {product.brand}
                  </span>
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ¥{product.price}
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* 产品规格 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  产品规格
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">重量:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">品牌:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">零件号:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.partNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">分类:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.category}</span>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  立即购买
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  加入购物车
                </button>
              </div>
            </div>
          </div>

          {/* 相关产品 */}
          {relatedProducts.length > 0 && (
            <div>
              <ProductGrid
                products={relatedProducts}
                title="相关产品"
                showAll={true}
              />
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.seo, // 使用完整的seo路径作为URL参数
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "产品未找到",
    };
  }

  return {
    title: product.title,
    description: product.description,
    keywords: [product.brand, product.partNumber, product.category, 'TMT配件'],
    openGraph: {
      type: 'website',
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      url: `https://your-domain.com/products/${product.seo}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.imageUrl],
    },
    alternates: {
      canonical: `https://your-domain.com/products/${product.seo}`,
    },
  };
}