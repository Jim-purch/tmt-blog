/**
 * 联系方式配置
 * 统一管理网站的联系信息，避免在多语言文件中硬编码
 */

export interface ContactInfo {
  email: string;
  phone: string;
  address?: string;
  workingHours?: string;
}

/**
 * 获取联系方式配置
 * 从环境变量中读取联系信息，如果环境变量不存在则使用默认值
 */
export function getContactInfo(): ContactInfo {
  return {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@toomotoo.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+86 400-123-4567',
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || '',
    workingHours: process.env.NEXT_PUBLIC_WORKING_HOURS || '周一至周五 9:00-18:00',
  };
}

/**
 * 格式化联系方式用于多语言显示
 * @param contactInfo 联系信息
 * @param locale 语言代码
 * @returns 格式化后的联系方式对象
 */
export function formatContactForLocale(contactInfo: ContactInfo, locale: string) {
  const emailLabels: Record<string, string> = {
    'zh-CN': '联系邮箱',
    'en': 'Contact Email',
    'ru': 'Контактный email',
    'ja': 'お問い合わせメール',
    'de': 'Kontakt E-Mail',
    'fr': 'Email de Contact',
    'es': 'Email de Contacto',
    'pt': 'Email de contato',
  };

  const phoneLabels: Record<string, string> = {
    'zh-CN': '联系电话',
    'en': 'Contact Phone',
    'ru': 'Контактный телефон',
    'ja': 'お問い合わせ電話',
    'de': 'Kontakt Telefon',
    'fr': 'Téléphone de Contact',
    'es': 'Teléfono de Contacto',
    'pt': 'Telefone de contato',
  };

  const emailLabel = emailLabels[locale] || emailLabels['en'];
  const phoneLabel = phoneLabels[locale] || phoneLabels['en'];

  return {
    email: `${emailLabel}: ${contactInfo.email}`,
    phone: `${phoneLabel}: ${contactInfo.phone}`,
    emailRaw: contactInfo.email,
    phoneRaw: contactInfo.phone,
    address: contactInfo.address,
    workingHours: contactInfo.workingHours,
  };
}

/**
 * 获取特定语言的联系方式
 * @param locale 语言代码
 * @returns 格式化后的联系方式
 */
export function getLocalizedContact(locale: string) {
  const contactInfo = getContactInfo();
  return formatContactForLocale(contactInfo, locale);
}