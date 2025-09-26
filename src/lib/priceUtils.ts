/**
 * 格式化价格显示
 * 当价格为0或"0"时返回空字符串，否则返回格式化的价格
 */
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // 如果价格为0或NaN，返回空字符串
  if (numPrice === 0 || isNaN(numPrice)) {
    return '';
  }
  
  return `¥${numPrice.toFixed(2)}`;
}

/**
 * 格式化价格显示（不带货币符号）
 * 当价格为0或"0"时返回空字符串，否则返回数字格式的价格
 */
export function formatPriceNumber(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // 如果价格为0或NaN，返回空字符串
  if (numPrice === 0 || isNaN(numPrice)) {
    return '';
  }
  
  return numPrice.toFixed(2);
}

/**
 * 检查价格是否为有效价格（大于0）
 */
export function isValidPrice(price: string | number): boolean {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(numPrice) && numPrice > 0;
}