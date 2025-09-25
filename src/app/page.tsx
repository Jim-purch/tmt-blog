import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { ProductGrid } from "@/app/_components/product-grid";
import TopSearch from "@/app/_components/top-search";
import StickySearchBar from "@/app/_components/sticky-search-bar";
import { getAllProducts } from "@/lib/productApi";
import { SITE_CONFIG } from "@/lib/constants";
import { HomeContent } from "@/app/_components/home-content";

export default function Index() {
  const allProducts = getAllProducts();
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <>
      {/* 固定搜索栏 */}
      <StickySearchBar showOnScroll={true} />
      
      <main>
        <Container>
          <Intro />
          <HomeContent featuredProducts={featuredProducts} />
        </Container>
      </main>
    </>
  );
}
