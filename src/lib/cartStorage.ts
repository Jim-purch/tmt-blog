'use client';

import { Cart, CartItem } from '@/interfaces/cart';
import { Product } from '@/interfaces/product';

const CART_STORAGE_KEY = 'tmt-cart';

// 获取购物车数据
export function getCartFromStorage(): Cart {
  if (typeof window === 'undefined') {
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      updatedAt: new Date()
    };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        updatedAt: new Date()
      };
    }

    const cart = JSON.parse(stored);
    // 转换日期字符串回Date对象
    cart.updatedAt = new Date(cart.updatedAt);
    cart.items = cart.items.map((item: any) => ({
      ...item,
      addedAt: new Date(item.addedAt)
    }));

    return cart;
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      updatedAt: new Date()
    };
  }
}

// 保存购物车数据
export function saveCartToStorage(cart: Cart): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

// 计算购物车总计
export function calculateCartTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.product.price) || 0;
    return sum + (price * item.quantity);
  }, 0);
  
  return { totalItems, totalPrice };
}

// 添加商品到购物车
export function addToCart(product: Product, quantity: number = 1): Cart {
  const cart = getCartFromStorage();
  const existingItemIndex = cart.items.findIndex(item => item.product.slug === product.slug);

  if (existingItemIndex >= 0) {
    // 如果商品已存在，增加数量
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // 如果商品不存在，添加新商品
    cart.items.push({
      product,
      quantity,
      addedAt: new Date()
    });
  }

  // 重新计算总计
  const totals = calculateCartTotals(cart.items);
  cart.totalItems = totals.totalItems;
  cart.totalPrice = totals.totalPrice;
  cart.updatedAt = new Date();

  saveCartToStorage(cart);
  return cart;
}

// 从购物车移除商品
export function removeFromCart(productSlug: string): Cart {
  const cart = getCartFromStorage();
  cart.items = cart.items.filter(item => item.product.slug !== productSlug);

  // 重新计算总计
  const totals = calculateCartTotals(cart.items);
  cart.totalItems = totals.totalItems;
  cart.totalPrice = totals.totalPrice;
  cart.updatedAt = new Date();

  saveCartToStorage(cart);
  return cart;
}

// 更新商品数量
export function updateCartItemQuantity(productSlug: string, quantity: number): Cart {
  const cart = getCartFromStorage();
  const itemIndex = cart.items.findIndex(item => item.product.slug === productSlug);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // 如果数量为0或负数，移除商品
      cart.items.splice(itemIndex, 1);
    } else {
      // 更新数量
      cart.items[itemIndex].quantity = quantity;
    }

    // 重新计算总计
    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;
    cart.updatedAt = new Date();

    saveCartToStorage(cart);
  }

  return cart;
}

// 清空购物车
export function clearCart(): Cart {
  const cart: Cart = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    updatedAt: new Date()
  };

  saveCartToStorage(cart);
  return cart;
}

// 获取特定商品在购物车中的信息
export function getCartItem(productSlug: string): CartItem | undefined {
  const cart = getCartFromStorage();
  return cart.items.find(item => item.product.slug === productSlug);
}