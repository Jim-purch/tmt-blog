'use client';

import { Product } from '@/interfaces/product';
import { CONTACT_CONFIG } from './constants';

// 邮件配置
const EMAIL_CONFIG = {
  // 使用统一的联系邮箱
  contactEmail: CONTACT_CONFIG.email,
  subject: '产品咨询 - BAT叉车配件',
};

// 生成邮件内容
export function generateEmailContent(product: Product): string {
  const emailBody = `
尊敬的BAT叉车配件团队，

我对以下产品感兴趣，希望获得更多信息：

产品信息：
- 产品名称：${product.title}
- 品牌：${product.brand}
- 零件号：${product.partNumber}
- 分类：${product.category}
- 价格：¥${product.price}
- 重量：${product.weight}

产品描述：
${product.description}

请联系我提供以下信息：
□ 详细产品规格
□ 库存情况
□ 交货时间
□ 批量采购优惠
□ 技术支持

期待您的回复。

此致
敬礼

---
此邮件通过BAT叉车配件网站生成
产品链接：${window.location.href}
  `.trim();

  return emailBody;
}

// 打开邮件客户端
export function openEmailClient(product: Product): void {
  const subject = encodeURIComponent(`${EMAIL_CONFIG.subject} - ${product.brand} ${product.partNumber}`);
  const body = encodeURIComponent(generateEmailContent(product));
  const mailtoUrl = `mailto:${EMAIL_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  
  // 打开默认邮件客户端
  window.location.href = mailtoUrl;
}

// 复制联系信息到剪贴板
export async function copyContactInfo(product: Product): Promise<boolean> {
  try {
    const contactInfo = `
联系邮箱：${EMAIL_CONFIG.contactEmail}
咨询产品：${product.brand} ${product.partNumber} - ${product.title}
产品链接：${window.location.href}
    `.trim();

    await navigator.clipboard.writeText(contactInfo);
    return true;
  } catch (error) {
    console.error('Failed to copy contact info:', error);
    return false;
  }
}

// 检查是否支持邮件客户端
export function isEmailClientSupported(): boolean {
  return typeof window !== 'undefined' && 'location' in window;
}

// 检查是否支持剪贴板API
export function isClipboardSupported(): boolean {
  return typeof navigator !== 'undefined' && 'clipboard' in navigator;
}