// 性能优化配置

export const PERFORMANCE_CONFIG = {
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1年
  },
  
  // 缓存策略
  cache: {
    // 静态资源缓存时间（秒）
    staticAssets: 60 * 60 * 24 * 365, // 1年
    // API响应缓存时间（秒）
    apiResponses: 60 * 5, // 5分钟
    // 页面缓存时间（秒）
    pages: 60 * 60, // 1小时
  },
  
  // 预加载策略
  preload: {
    // 关键CSS
    criticalCSS: true,
    // 字体预加载
    fonts: [
      '/fonts/inter-var.woff2',
    ],
    // 关键图片预加载
    images: [
      '/assets/logo.png',
      '/assets/hero-bg.jpg',
    ],
  },
  
  // 代码分割
  codeSplitting: {
    // 按路由分割
    routeBased: true,
    // 按组件分割
    componentBased: true,
    // 第三方库分割
    vendor: true,
  },
  
  // 压缩配置
  compression: {
    // Gzip压缩
    gzip: true,
    // Brotli压缩
    brotli: true,
    // 压缩级别
    level: 6,
  },
}

// 获取Core Web Vitals阈值
export const CORE_WEB_VITALS = {
  // Largest Contentful Paint (LCP) - 最大内容绘制
  LCP: {
    good: 2500, // 毫秒
    needsImprovement: 4000,
  },
  // First Input Delay (FID) - 首次输入延迟
  FID: {
    good: 100, // 毫秒
    needsImprovement: 300,
  },
  // Cumulative Layout Shift (CLS) - 累积布局偏移
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  // First Contentful Paint (FCP) - 首次内容绘制
  FCP: {
    good: 1800, // 毫秒
    needsImprovement: 3000,
  },
  // Time to Interactive (TTI) - 可交互时间
  TTI: {
    good: 3800, // 毫秒
    needsImprovement: 7300,
  },
}

// 移动端优化配置
export const MOBILE_OPTIMIZATION = {
  // 视口配置
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // 触摸优化
  touch: {
    // 最小触摸目标尺寸（像素）
    minTargetSize: 44,
    // 触摸延迟消除
    fastClick: true,
  },
  
  // 网络优化
  network: {
    // 预连接到外部域名
    preconnect: [
      'https://fonts.googleapis.com',
      'https://cdn.toomotoo.com',
    ],
    // DNS预解析
    dnsPrefetch: [
      'https://thumbnails.toomotoo.com',
    ],
  },
}

// 搜索引擎优化的性能建议
export const SEO_PERFORMANCE_TIPS = {
  // 页面加载速度建议
  pageSpeed: {
    target: '< 3秒',
    recommendations: [
      '使用CDN加速静态资源',
      '启用Gzip/Brotli压缩',
      '优化图片格式和大小',
      '减少HTTP请求数量',
      '使用浏览器缓存',
    ],
  },
  
  // 移动端友好性
  mobileFriendly: {
    requirements: [
      '响应式设计',
      '触摸友好的界面',
      '快速的移动端加载速度',
      '避免使用Flash',
      '合适的字体大小',
    ],
  },
  
  // 核心网页指标
  coreWebVitals: {
    importance: '直接影响搜索排名',
    monitoring: '建议使用Google PageSpeed Insights监控',
  },
}