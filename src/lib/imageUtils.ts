// 图片存在性检查缓存
const imageExistsCache = new Map<string, boolean>();

/**
 * 检查图片是否存在
 * @param url 图片URL
 * @returns Promise<boolean> 图片是否存在
 */
export async function checkImageExists(url: string): Promise<boolean> {
  // 检查缓存
  if (imageExistsCache.has(url)) {
    console.log(`[ImageUtils] 从缓存获取结果: ${url} -> ${imageExistsCache.get(url)}`);
    return imageExistsCache.get(url)!;
  }

  console.log(`[ImageUtils] 检查图片存在性: ${url}`);

  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'cors', // 明确设置CORS模式
      cache: 'force-cache' // 使用缓存避免重复请求
    });
    const exists = response.ok;
    
    console.log(`[ImageUtils] 检查结果: ${url} -> ${exists} (状态码: ${response.status})`);
    
    // 缓存结果
    imageExistsCache.set(url, exists);
    return exists;
  } catch (error) {
    console.warn(`[ImageUtils] 检查图片时出错: ${url}`, error);
    
    // 如果是CORS错误，我们假设图片存在（因为服务器可能不支持CORS HEAD请求）
    if (error instanceof TypeError && error.message.includes('CORS')) {
      console.log(`[ImageUtils] CORS错误，假设图片存在: ${url}`);
      imageExistsCache.set(url, true);
      return true;
    }
    
    // 其他网络错误时假设图片不存在
    imageExistsCache.set(url, false);
    return false;
  }
}

/**
 * 预检查图片URL，如果不存在则返回默认图片
 * @param url 原始图片URL
 * @param defaultUrl 默认图片URL
 * @returns Promise<string> 最终使用的图片URL
 */
export async function getValidImageUrl(url: string, defaultUrl: string): Promise<string> {
  if (!url || url === defaultUrl) {
    return defaultUrl;
  }

  // 对于外部URL（非本地资源），我们采用更宽松的策略
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.log(`[ImageUtils] 外部图片URL，跳过存在性检查: ${url}`);
    // 对于外部图片，我们直接返回原URL，让浏览器处理加载失败的情况
    return url;
  }

  const exists = await checkImageExists(url);
  return exists ? url : defaultUrl;
}

/**
 * 清除图片存在性缓存
 */
export function clearImageCache(): void {
  imageExistsCache.clear();
}

/**
 * 批量预检查图片存在性（用于优化性能）
 * @param urls 图片URL数组
 * @returns Promise<Map<string, boolean>> URL到存在性的映射
 */
export async function batchCheckImageExists(urls: string[]): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();
  
  // 过滤出未缓存的URL
  const uncachedUrls = urls.filter(url => !imageExistsCache.has(url));
  
  // 并发检查未缓存的图片
  const promises = uncachedUrls.map(async (url) => {
    const exists = await checkImageExists(url);
    return { url, exists };
  });

  const checkResults = await Promise.allSettled(promises);
  
  // 处理结果
  checkResults.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const { url, exists } = result.value;
      results.set(url, exists);
    } else {
      // 失败的请求假设图片不存在
      const url = uncachedUrls[index];
      results.set(url, false);
      imageExistsCache.set(url, false);
    }
  });

  // 添加已缓存的结果
  urls.forEach(url => {
    if (imageExistsCache.has(url)) {
      results.set(url, imageExistsCache.get(url)!);
    }
  });

  return results;
}