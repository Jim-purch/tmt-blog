import { NextRequest, NextResponse } from 'next/server'
import { detectOptimalLanguage } from '@/lib/languageDetection'

// 支持的语言列表
const locales = ['zh-Hans', 'zh-Hant', 'en', 'ru', 'ja', 'de', 'fr', 'es', 'pt']
const defaultLocale = 'zh-Hans'

// 获取路径名中的语言代码
function getLocaleFromPathname(pathname: string): string | undefined {
  const segments = pathname.split('/')
  const firstSegment = segments[1]
  return locales.includes(firstSegment) ? firstSegment : undefined
}

// 移除路径名中的语言代码
function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  if (locales.includes(segments[1])) {
    segments.splice(1, 1)
  }
  return segments.join('/') || '/'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 跳过API路由、静态文件和Next.js内部路径
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 检查路径是否已包含语言代码
  const localeInPath = getLocaleFromPathname(pathname)
  
  if (localeInPath) {
    // 如果路径已包含语言代码，继续处理
    const cleanPathname = removeLocaleFromPathname(pathname)
    
    // 重写URL以移除语言代码，让App Router正常处理
    const url = request.nextUrl.clone()
    url.pathname = cleanPathname
    
    const response = NextResponse.rewrite(url)
    
    // 设置语言cookie
    response.cookies.set('locale', localeInPath, {
      maxAge: 60 * 60 * 24 * 365, // 1年
      path: '/',
    })
    
    return response
  }

  // 如果路径不包含语言代码，检测用户语言偏好
  const acceptLanguage = request.headers.get('accept-language') || ''
  const cookieLocale = request.cookies.get('locale')?.value
  const userAgent = request.headers.get('user-agent') || ''
  
  // 检测最佳语言
  let detectedLocale = defaultLocale
  
  if (cookieLocale && locales.includes(cookieLocale)) {
    detectedLocale = cookieLocale
  } else {
    detectedLocale = detectOptimalLanguage(acceptLanguage) || defaultLocale
  }

  // 重定向到带语言代码的URL（包括默认语言）
  const url = request.nextUrl.clone()
  url.pathname = `/${detectedLocale}${pathname}`
  
  const response = NextResponse.redirect(url)
  response.cookies.set('locale', detectedLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  })
  
  return response
}

export const config = {
  matcher: [
    // 匹配所有路径，除了API路由和静态文件
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}