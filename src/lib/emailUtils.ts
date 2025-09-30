'use client';

import { Product } from '@/interfaces/product';
import { CONTACT_CONFIG } from './constants';

// Email configuration
const EMAIL_CONFIG = {
  // Use unified contact email
  contactEmail: CONTACT_CONFIG.email,
  subject: 'Product Inquiry - BAT Forklift Parts',
};

// Generate email content
export function generateEmailContent(product: Product): string {
  const emailBody = `
Dear BAT Forklift Parts Team,

I am interested in the following product and would like to get more information:

Product Information:
- Product Name: ${product.title}
- Brand: ${product.brand}
- Part Number: ${product.partNumber}
- Category: ${product.category}
- Price: ¥${product.price}
- Weight: ${product.weight}

Product Description:
${product.description}

Please contact me to provide the following information:
□ Detailed product specifications
□ Stock availability
□ Delivery time
□ Bulk purchase discounts
□ Technical support

Looking forward to your reply.

Best regards

---
This email was generated through BAT Forklift Parts website
Product link: ${window.location.href}
  `.trim();

  return emailBody;
}

// Open email client
export function openEmailClient(product: Product): void {
  const subject = encodeURIComponent(`${EMAIL_CONFIG.subject} - ${product.brand} ${product.partNumber}`);
  const body = encodeURIComponent(generateEmailContent(product));
  const mailtoUrl = `mailto:${EMAIL_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  
  // Open default email client
  window.location.href = mailtoUrl;
}

// Copy contact information to clipboard
export async function copyContactInfo(product: Product): Promise<boolean> {
  try {
    const contactInfo = `
Contact Email: ${EMAIL_CONFIG.contactEmail}
Product Inquiry: ${product.brand} ${product.partNumber} - ${product.title}
Product Link: ${window.location.href}
    `.trim();

    await navigator.clipboard.writeText(contactInfo);
    return true;
  } catch (error) {
    console.error('Failed to copy contact info:', error);
    return false;
  }
}

// Check if email client is supported
export function isEmailClientSupported(): boolean {
  return typeof window !== 'undefined' && 'location' in window;
}

// Check if clipboard API is supported
export function isClipboardSupported(): boolean {
  return typeof navigator !== 'undefined' && 'clipboard' in navigator;
}