import { notFound } from 'next/navigation'
import Container from '@/app/_components/container'
import { HeroPost } from '@/app/_components/hero-post'
import { Intro } from '@/app/_components/intro'
import { MoreStories } from '@/app/_components/more-stories'
import { getAllPosts } from '@/lib/api'

// 支持的语言列表
const locales = ['zh-Hans', 'zh-Hant', 'en', 'ru', 'ja', 'de', 'fr', 'es', 'pt']

interface LocalePageProps {
  params: Promise<{ locale: string }>
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const allPosts = getAllPosts()
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <main>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  )
}