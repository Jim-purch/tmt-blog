// 分类翻译工具函数

/**
 * 获取分类的翻译键名
 * @param categoryKey 分类的英文键名（如 "brakeSystem"）
 * @returns 翻译键名（如 "home.categories.brakeSystem"）
 */
export function getCategoryTranslationKey(categoryKey: string): string {
  return `home.categories.${categoryKey}`;
}

/**
 * 分类键名映射，用于验证和转换
 */
export const CATEGORY_KEYS = {
  brakeSystem: 'brakeSystem',
  coolingSystem: 'coolingSystem',
  durability: 'durability',
  electricalSystem: 'electricalSystem',
  engineSystem: 'engineSystem',
  exhaustSystem: 'exhaustSystem',
  exteriorAccessories: 'exteriorAccessories',
  fuelSystem: 'fuelSystem',
  interiorAccessories: 'interiorAccessories',
  lightingSystem: 'lightingSystem',
  specifications: 'specifications',
  suspensionSystem: 'suspensionSystem',
  tireSystem: 'tireSystem',
  transmissionSystem: 'transmissionSystem'
} as const;

/**
 * 验证分类键名是否有效
 * @param categoryKey 分类键名
 * @returns 是否为有效的分类键名
 */
export function isValidCategoryKey(categoryKey: string): categoryKey is keyof typeof CATEGORY_KEYS {
  return categoryKey in CATEGORY_KEYS;
}

/**
 * 获取所有有效的分类键名
 * @returns 分类键名数组
 */
export function getAllCategoryKeys(): string[] {
  return Object.keys(CATEGORY_KEYS);
}