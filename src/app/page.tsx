import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { ProductGrid } from "@/app/_components/product-grid";
import TopSearch from "@/app/_components/top-search";
import { getAllProducts } from "@/lib/productApi";
import { SITE_CONFIG } from "@/lib/constants";

export default function Index() {
  const allProducts = getAllProducts();
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <main>
      <Container>
        <Intro />
        
        {/* 顶部搜索区域 */}
        <div className="mb-12 py-8 bg-white dark:bg-gray-800 -mx-4 px-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              快速搜索产品
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              输入产品名称快速找到您需要的零配件
            </p>
          </div>
          <TopSearch placeholder="搜索产品名称..." />
        </div>
        
        {/* 产品展示区域 */}
        <div className="mb-16 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 -mx-4 px-4 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              精选产品
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              为您精心挑选的优质零配件产品
            </p>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            maxItems={8}
            showAll={false}
          />
        </div>

        {/* 产品分类展示 */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              产品分类
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              按分类浏览我们的产品
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['刹车系统', '发动机系统', '悬挂系统', '轮胎系统', '照明系统', '外观配件'].map((category) => (
              <a
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-blue-500"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  查看所有{category}产品
                </p>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
