'use client'

import { useTranslation } from './i18n';
import { CurrencyConfig } from './priceUtils';

/**
 * 获取当前语言的货币配置
 * @returns 当前语言的货币配置
 */
export function useCurrency(): CurrencyConfig {
  const { t } = useTranslation();
  
  return {
    code: t('currency.code'),
    symbol: t('currency.symbol'),
    name: t('currency.name'),
    exchangeRate: parseFloat(t('currency.exchangeRate')),
    decimalPlaces: parseInt(t('currency.decimalPlaces')),
    thousandSeparator: t('currency.thousandSeparator'),
    decimalSeparator: t('currency.decimalSeparator'),
    symbolPosition: t('currency.symbolPosition') as 'before' | 'after'
  };
}

/**
 * 格式化价格的Hook
 * @param price 原始价格（人民币）
 * @returns 格式化后的价格字符串
 */
export function useFormatPrice() {
  const currencyConfig = useCurrency();
  
  return (price: string | number): string => {
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
  };
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