// SEO性能监控和优化配置

// 声明全局gtag函数
declare global {
  function gtag(...args: any[]): void
}

// 扩展PerformanceEntry接口
interface ExtendedPerformanceEntry extends PerformanceEntry {
  processingStart?: number
  hadRecentInput?: boolean
  value?: number
}

export interface SEOPerformanceConfig {
  coreWebVitals: {
    lcp: { good: number; needsImprovement: number }
    fid: { good: number; needsImprovement: number }
    cls: { good: number; needsImprovement: number }
    fcp: { good: number; needsImprovement: number }
    tti: { good: number; needsImprovement: number }
  }
  pageSpeed: {
    target: string
    mobileTarget: string
    desktopTarget: string
  }
  seoOptimizations: {
    imageOptimization: boolean
    lazyLoading: boolean
    preloading: boolean
    compression: boolean
    caching: boolean
    minification: boolean
  }
}

// SEO性能配置
export const SEO_PERFORMANCE_CONFIG: SEOPerformanceConfig = {
  coreWebVitals: {
    // Largest Contentful Paint (LCP) - 最大内容绘制
    lcp: {
      good: 2500, // 毫秒
      needsImprovement: 4000,
    },
    // First Input Delay (FID) - 首次输入延迟
    fid: {
      good: 100, // 毫秒
      needsImprovement: 300,
    },
    // Cumulative Layout Shift (CLS) - 累积布局偏移
    cls: {
      good: 0.1,
      needsImprovement: 0.25,
    },
    // First Contentful Paint (FCP) - 首次内容绘制
    fcp: {
      good: 1800, // 毫秒
      needsImprovement: 3000,
    },
    // Time to Interactive (TTI) - 可交互时间
    tti: {
      good: 3800, // 毫秒
      needsImprovement: 7300,
    },
  },
  pageSpeed: {
    target: '< 3秒',
    mobileTarget: '< 3秒',
    desktopTarget: '< 2秒',
  },
  seoOptimizations: {
    imageOptimization: true,
    lazyLoading: true,
    preloading: true,
    compression: true,
    caching: true,
    minification: true,
  },
}

// 性能监控函数
export function measureCoreWebVitals() {
  if (typeof window === 'undefined') return

  // 监控LCP
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        const lcp = entry.startTime
        console.log('LCP:', lcp)
        
        // 发送到分析服务
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lcp),
            event_category: 'Web Vitals',
          })
        }
      }
    }
  })

  observer.observe({ entryTypes: ['largest-contentful-paint'] })

  // 监控FID
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const extendedEntry = entry as ExtendedPerformanceEntry
      const fid = (extendedEntry.processingStart || 0) - entry.startTime
      console.log('FID:', fid)
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vitals', {
          name: 'FID',
          value: Math.round(fid),
          event_category: 'Web Vitals',
        })
      }
    }
  })

  fidObserver.observe({ entryTypes: ['first-input'] })

  // 监控CLS
  let clsValue = 0
  let clsEntries: PerformanceEntry[] = []

  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const extendedEntry = entry as ExtendedPerformanceEntry
      if (!extendedEntry.hadRecentInput) {
        const firstSessionEntry = clsEntries[0]
        const lastSessionEntry = clsEntries[clsEntries.length - 1]

        if (!firstSessionEntry || 
            entry.startTime - lastSessionEntry.startTime < 1000 ||
            entry.startTime - firstSessionEntry.startTime < 5000) {
          clsEntries.push(entry)
          clsValue += (entry as any).value
        } else {
          clsEntries = [entry]
          clsValue = (entry as any).value
        }
      }
    }

    console.log('CLS:', clsValue)
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        name: 'CLS',
        value: Math.round(clsValue * 1000),
        event_category: 'Web Vitals',
      })
    }
  })

  clsObserver.observe({ entryTypes: ['layout-shift'] })
}

// SEO性能检查清单
export const SEO_PERFORMANCE_CHECKLIST = {
  technical: [
    {
      item: '页面加载速度',
      description: '确保页面在3秒内加载完成',
      priority: 'high',
      tools: ['Google PageSpeed Insights', 'GTmetrix', 'WebPageTest'],
    },
    {
      item: '移动端友好性',
      description: '确保网站在移动设备上正常显示和操作',
      priority: 'high',
      tools: ['Google Mobile-Friendly Test', 'Chrome DevTools'],
    },
    {
      item: 'Core Web Vitals',
      description: '优化LCP、FID、CLS等核心网页指标',
      priority: 'high',
      tools: ['Google Search Console', 'Chrome DevTools'],
    },
    {
      item: 'HTTPS安全性',
      description: '确保网站使用HTTPS协议',
      priority: 'high',
      tools: ['SSL Labs', 'Chrome DevTools'],
    },
    {
      item: '图片优化',
      description: '使用WebP格式，启用懒加载',
      priority: 'medium',
      tools: ['ImageOptim', 'TinyPNG'],
    },
    {
      item: '代码压缩',
      description: '压缩CSS、JavaScript和HTML',
      priority: 'medium',
      tools: ['Webpack', 'Terser', 'cssnano'],
    },
    {
      item: '缓存策略',
      description: '设置合适的缓存头',
      priority: 'medium',
      tools: ['Chrome DevTools', 'GTmetrix'],
    },
  ],
  content: [
    {
      item: '内容质量',
      description: '提供高质量、原创的内容',
      priority: 'high',
      tools: ['Copyscape', 'Grammarly'],
    },
    {
      item: '关键词优化',
      description: '合理使用关键词，避免关键词堆砌',
      priority: 'high',
      tools: ['Google Keyword Planner', 'SEMrush'],
    },
    {
      item: '内容结构',
      description: '使用合适的标题标签(H1-H6)',
      priority: 'medium',
      tools: ['Screaming Frog', 'SEO Spider'],
    },
    {
      item: '内部链接',
      description: '建立合理的内部链接结构',
      priority: 'medium',
      tools: ['Ahrefs', 'Screaming Frog'],
    },
  ],
  multilingual: [
    {
      item: 'hreflang标签',
      description: '正确实现多语言页面的hreflang标签',
      priority: 'high',
      tools: ['Google Search Console', 'hreflang Tags Generator'],
    },
    {
      item: '语言检测',
      description: '实现智能的语言检测和切换',
      priority: 'medium',
      tools: ['Browser Language Detection'],
    },
    {
      item: '本地化内容',
      description: '为不同地区提供本地化的内容',
      priority: 'medium',
      tools: ['Google Translate', 'Professional Translation Services'],
    },
  ],
}

// 性能优化建议
export const PERFORMANCE_OPTIMIZATION_TIPS = {
  images: {
    formats: ['WebP', 'AVIF'],
    techniques: ['懒加载', '响应式图片', '图片压缩', 'CDN加速'],
    implementation: [
      '使用Next.js Image组件',
      '设置合适的图片尺寸',
      '启用图片优化',
      '使用适当的图片格式',
    ],
  },
  caching: {
    strategies: ['浏览器缓存', 'CDN缓存', '服务器缓存', '应用缓存'],
    headers: [
      'Cache-Control',
      'ETag',
      'Last-Modified',
      'Expires',
    ],
    implementation: [
      '设置静态资源长期缓存',
      '动态内容短期缓存',
      '使用CDN分发静态资源',
      '实现缓存失效策略',
    ],
  },
  codeSplitting: {
    techniques: ['路由级分割', '组件级分割', '第三方库分割'],
    benefits: ['减少初始包大小', '提高加载速度', '改善用户体验'],
    implementation: [
      '使用动态导入',
      '配置Webpack分割点',
      '优化bundle大小',
      '监控包大小变化',
    ],
  },
  compression: {
    algorithms: ['Gzip', 'Brotli'],
    targets: ['HTML', 'CSS', 'JavaScript', 'JSON'],
    implementation: [
      '服务器端启用压缩',
      '构建时预压缩',
      '选择合适的压缩级别',
      '监控压缩效果',
    ],
  },
}

// 导出性能监控初始化函数
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // 初始化Core Web Vitals监控
  measureCoreWebVitals()

  // 监控页面加载时间
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    console.log('Page Load Time:', loadTime)
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_load_time', {
        value: loadTime,
        event_category: 'Performance',
      })
    }
  })

  // 监控资源加载
  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 1000) { // 超过1秒的资源
        console.warn('Slow resource:', entry.name, entry.duration)
      }
    }
  })

  resourceObserver.observe({ entryTypes: ['resource'] })
}