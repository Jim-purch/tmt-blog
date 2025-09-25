// URL结构和SEO友好性分析配置

export interface URLStructureConfig {
  patterns: {
    homepage: string
    products: string
    productDetail: string
    posts: string
    postDetail: string
    categories: string
    search: string
    about: string
  }
  seoFriendly: {
    useHyphens: boolean
    avoidUnderscores: boolean
    lowercaseOnly: boolean
    descriptiveUrls: boolean
    shortUrls: boolean
    avoidParameters: boolean
  }
  multilingual: {
    structure: 'subdirectory' | 'subdomain' | 'parameter'
    defaultLocale: string
    localeInUrl: boolean
  }
}

// 当前URL结构配置
export const CURRENT_URL_STRUCTURE: URLStructureConfig = {
  patterns: {
    homepage: '/',
    products: '/products',
    productDetail: '/products/[slug]',
    posts: '/posts',
    postDetail: '/posts/[slug]',
    categories: '/products?category=[category]',
    search: '/products?q=[query]',
    about: '/about',
  },
  seoFriendly: {
    useHyphens: true,
    avoidUnderscores: true,
    lowercaseOnly: true,
    descriptiveUrls: true,
    shortUrls: true,
    avoidParameters: false, // 目前分类和搜索使用查询参数
  },
  multilingual: {
    structure: 'subdirectory',
    defaultLocale: 'zh-CN',
    localeInUrl: true,
  },
}

// URL SEO分析结果
export const URL_SEO_ANALYSIS = {
  strengths: [
    {
      aspect: '描述性URL',
      description: '产品和文章URL使用描述性slug，有利于SEO',
      examples: [
        '/products/forklift-parts-brake-pad-123',
        '/posts/ai-and-tmt-sales',
      ],
      impact: 'high',
    },
    {
      aspect: '连字符分隔',
      description: '使用连字符分隔单词，符合SEO最佳实践',
      examples: [
        '/products/forklift-parts-brake-pad-123',
        '/posts/nextjs-static-blog-guide',
      ],
      impact: 'medium',
    },
    {
      aspect: '小写字母',
      description: '所有URL使用小写字母，避免大小写混淆',
      examples: [
        '/products/engine-parts',
        '/posts/welcome-to-tmt-blog',
      ],
      impact: 'medium',
    },
    {
      aspect: '多语言支持',
      description: '使用子目录结构实现多语言URL',
      examples: [
        '/ (zh-CN)',
        '/en/products',
        '/ru/posts',
      ],
      impact: 'high',
    },
    {
      aspect: '静态路径生成',
      description: '使用generateStaticParams预生成所有产品和文章页面',
      examples: [
        'generateStaticParams for products',
        'generateStaticParams for posts',
      ],
      impact: 'high',
    },
  ],
  weaknesses: [
    {
      aspect: '查询参数依赖',
      description: '分类和搜索功能依赖查询参数，不够SEO友好',
      examples: [
        '/products?category=engine-parts',
        '/products?q=brake+pad',
      ],
      impact: 'medium',
      solution: '考虑使用 /products/category/[category] 和 /search/[query] 结构',
    },
    {
      aspect: '缺少面包屑URL',
      description: '没有实现层级化的URL结构',
      examples: [
        '当前: /products/forklift-parts-brake-pad-123',
        '建议: /products/brake-parts/brake-pad-123',
      ],
      impact: 'low',
      solution: '考虑实现分类层级URL结构',
    },
    {
      aspect: '缺少分页URL',
      description: '产品列表分页可能需要更好的URL结构',
      examples: [
        '当前: /products?page=2',
        '建议: /products/page/2',
      ],
      impact: 'low',
      solution: '实现SEO友好的分页URL',
    },
  ],
  recommendations: [
    {
      priority: 'high',
      title: '优化分类页面URL结构',
      description: '将查询参数改为路径参数',
      implementation: [
        '创建 /products/category/[category] 路由',
        '实现分类页面的静态生成',
        '添加分类页面的SEO元数据',
        '设置301重定向从旧URL到新URL',
      ],
      benefits: [
        '更好的SEO表现',
        '更清晰的URL结构',
        '更好的用户体验',
      ],
    },
    {
      priority: 'medium',
      title: '实现搜索结果页面SEO优化',
      description: '为搜索结果创建更好的URL结构',
      implementation: [
        '创建 /search/[query] 路由',
        '实现搜索结果页面的SEO元数据',
        '添加搜索结果的结构化数据',
        '实现搜索历史和热门搜索',
      ],
      benefits: [
        '搜索结果页面可被索引',
        '提高长尾关键词排名',
        '改善用户搜索体验',
      ],
    },
    {
      priority: 'medium',
      title: '添加产品品牌页面',
      description: '为每个品牌创建专门的页面',
      implementation: [
        '创建 /products/brand/[brand] 路由',
        '实现品牌页面的SEO优化',
        '添加品牌相关的结构化数据',
        '创建品牌索引页面',
      ],
      benefits: [
        '提高品牌相关关键词排名',
        '更好的产品组织结构',
        '增加页面权重分布',
      ],
    },
    {
      priority: 'low',
      title: '实现层级化URL结构',
      description: '为产品创建更深层的分类结构',
      implementation: [
        '分析产品分类层级',
        '设计 /products/[category]/[subcategory]/[product] 结构',
        '实现面包屑导航',
        '优化内部链接结构',
      ],
      benefits: [
        '更清晰的信息架构',
        '更好的用户导航体验',
        '提高页面权重传递',
      ],
    },
  ],
}

// URL优化最佳实践
export const URL_OPTIMIZATION_BEST_PRACTICES = {
  structure: {
    principles: [
      '保持URL简短且描述性',
      '使用连字符分隔单词',
      '避免使用下划线',
      '使用小写字母',
      '避免不必要的参数',
    ],
    examples: {
      good: [
        '/products/brake-parts',
        '/posts/seo-optimization-guide',
        '/en/products/engine-parts',
      ],
      bad: [
        '/products/Brake_Parts',
        '/posts/seo_optimization_guide',
        '/products?id=123&cat=brake',
      ],
    },
  },
  seo: {
    keywords: [
      '在URL中包含目标关键词',
      '避免关键词堆砌',
      '保持URL与页面内容相关',
      '使用规范的URL结构',
    ],
    metadata: [
      '为每个页面设置唯一的title',
      '编写描述性的meta description',
      '使用合适的heading标签层级',
      '实现结构化数据标记',
    ],
  },
  performance: {
    optimization: [
      '使用静态生成减少服务器负载',
      '实现适当的缓存策略',
      '优化图片和资源加载',
      '减少重定向链',
    ],
    monitoring: [
      '监控页面加载速度',
      '跟踪Core Web Vitals',
      '分析用户行为数据',
      '定期检查死链接',
    ],
  },
  multilingual: {
    implementation: [
      '使用hreflang标签指示语言版本',
      '为每种语言创建独立的URL',
      '实现语言切换功能',
      '保持URL结构一致性',
    ],
    seo: [
      '为每种语言优化关键词',
      '本地化URL slug',
      '实现地区特定的内容',
      '设置正确的语言标记',
    ],
  },
}

// URL结构检查清单
export const URL_STRUCTURE_CHECKLIST = [
  {
    category: '基础结构',
    items: [
      { item: 'URL使用HTTPS协议', status: 'completed', priority: 'high' },
      { item: 'URL结构清晰且一致', status: 'completed', priority: 'high' },
      { item: '使用描述性的URL路径', status: 'completed', priority: 'high' },
      { item: '避免使用特殊字符', status: 'completed', priority: 'medium' },
    ],
  },
  {
    category: 'SEO优化',
    items: [
      { item: '包含目标关键词', status: 'completed', priority: 'high' },
      { item: '避免重复内容URL', status: 'completed', priority: 'high' },
      { item: '实现规范化URL', status: 'completed', priority: 'high' },
      { item: '设置适当的重定向', status: 'needs_improvement', priority: 'medium' },
    ],
  },
  {
    category: '多语言支持',
    items: [
      { item: '实现hreflang标签', status: 'completed', priority: 'high' },
      { item: '语言URL结构一致', status: 'completed', priority: 'high' },
      { item: '默认语言处理正确', status: 'completed', priority: 'medium' },
      { item: '语言切换功能完善', status: 'completed', priority: 'medium' },
    ],
  },
  {
    category: '技术实现',
    items: [
      { item: '静态路径预生成', status: 'completed', priority: 'high' },
      { item: '动态路由正确处理', status: 'completed', priority: 'high' },
      { item: '404页面处理', status: 'completed', priority: 'medium' },
      { item: '分页URL优化', status: 'needs_improvement', priority: 'low' },
    ],
  },
]

// 导出URL分析函数
export function analyzeURLStructure(url: string) {
  const analysis = {
    isValid: true,
    issues: [] as string[],
    suggestions: [] as string[],
    score: 0,
  }

  // 检查URL长度
  if (url.length > 100) {
    analysis.issues.push('URL过长，建议控制在100字符以内')
    analysis.score -= 10
  }

  // 检查特殊字符
  if (/[A-Z]/.test(url)) {
    analysis.issues.push('URL包含大写字母，建议全部使用小写')
    analysis.score -= 5
  }

  // 检查下划线
  if (url.includes('_')) {
    analysis.issues.push('URL包含下划线，建议使用连字符')
    analysis.score -= 5
  }

  // 检查查询参数
  if (url.includes('?') && !url.includes('/search/')) {
    analysis.suggestions.push('考虑将查询参数改为路径参数以提高SEO友好性')
    analysis.score -= 3
  }

  // 检查描述性
  if (!/[a-z-]+/.test(url.split('/').pop() || '')) {
    analysis.issues.push('URL缺乏描述性，建议使用有意义的关键词')
    analysis.score -= 10
  }

  // 计算最终分数
  analysis.score = Math.max(0, 100 + analysis.score)

  return analysis
}