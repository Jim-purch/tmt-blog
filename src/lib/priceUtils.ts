// 货币配置接口
export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number;
  decimalPlaces: number;
  thousandSeparator: string;
  decimalSeparator: string;
  symbolPosition: 'before' | 'after';
}

/**
 * 根据货币配置格式化价格
 * @param price 原始价格（人民币）
 * @param currencyConfig 货币配置
 * @returns 格式化后的价格字符串
 */
export function formatPriceWithCurrency(price: string | number, currencyConfig: CurrencyConfig): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // 如果价格为0或NaN，返回空字符串
  if (numPrice === 0 || isNaN(numPrice)) {
    return '';
  }
  
  // 转换货币
  const convertedPrice = numPrice * currencyConfig.exchangeRate;
  
  // 格式化数字
  const formattedNumber = formatNumber(convertedPrice, currencyConfig);
  
  // 添加货币符号
  if (currencyConfig.symbolPosition === 'before') {
    return `${currencyConfig.symbol}${formattedNumber}`;
  } else {
    return `${formattedNumber} ${currencyConfig.symbol}`;
  }
}

/**
 * 格式化数字（添加千位分隔符和小数位）
 * @param num 数字
 * @param config 货币配置
 * @returns 格式化后的数字字符串
 */
function formatNumber(num: number, config: CurrencyConfig): string {
  const fixed = num.toFixed(config.decimalPlaces);
  const parts = fixed.split('.');
  
  // 添加千位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandSeparator);
  
  // 如果有小数部分且小数位数大于0，则用配置的小数分隔符连接
  if (parts[1] && config.decimalPlaces > 0) {
    return parts.join(config.decimalSeparator);
  }
  
  return parts[0];
}

/**
 * 格式化价格显示（兼容旧版本，使用人民币）
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