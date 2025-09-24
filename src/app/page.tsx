import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import Search from "@/app/_components/search";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        
        {/* 产品搜索区域 */}
        <div className="mb-16 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 -mx-4 px-4 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              零配件产品搜索
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              快速找到您需要的零配件产品
            </p>
          </div>
          <Search posts={allPosts} />
        </div>

        {/* 产品展示区域 */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            推荐产品
          </h3>
          <HeroPost
            title={heroPost.title}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        </div>
        
        {morePosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              更多产品
            </h3>
            <MoreStories posts={morePosts} />
          </div>
        )}
      </Container>
    </main>
  );
}
