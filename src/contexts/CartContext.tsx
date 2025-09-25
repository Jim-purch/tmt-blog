'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Cart, CartItem } from '@/interfaces/cart';
import { Product } from '@/interfaces/product';
import {
  getCartFromStorage,
  addToCart as addToCartStorage,
  removeFromCart as removeFromCartStorage,
  updateCartItemQuantity as updateCartItemQuantityStorage,
  clearCart as clearCartStorage
} from '@/lib/cartStorage';

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productSlug: string) => CartItem | undefined;
  isInCart: (productSlug: string) => boolean;
  getItemQuantity: (productSlug: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    updatedAt: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);

  // 初始化购物车数据
  useEffect(() => {
    const loadCart = () => {
      const storedCart = getCartFromStorage();
      setCart(storedCart);
      setIsLoading(false);
    };

    loadCart();
  }, []);

  // 添加商品到购物车
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    const updatedCart = addToCartStorage(product, quantity);
    setCart(updatedCart);
  }, []);

  // 从购物车移除商品
  const removeItem = useCallback((productSlug: string) => {
    const updatedCart = removeFromCartStorage(productSlug);
    setCart(updatedCart);
  }, []);

  // 更新商品数量
  const updateQuantity = useCallback((productSlug: string, quantity: number) => {
    const updatedCart = updateCartItemQuantityStorage(productSlug, quantity);
    setCart(updatedCart);
  }, []);

  // 清空购物车
  const clearCartHandler = useCallback(() => {
    const updatedCart = clearCartStorage();
    setCart(updatedCart);
  }, []);

  // 获取特定商品在购物车中的信息
  const getItem = useCallback((productSlug: string): CartItem | undefined => {
    return cart.items.find(item => item.product.slug === productSlug);
  }, [cart]);

  // 检查商品是否在购物车中
  const isInCart = useCallback((productSlug: string): boolean => {
    return cart.items.some(item => item.product.slug === productSlug);
  }, [cart]);

  // 获取商品在购物车中的数量
  const getItemQuantity = useCallback((productSlug: string): number => {
    const item = cart.items.find(item => item.product.slug === productSlug);
    return item ? item.quantity : 0;
  }, [cart]);

  const value: CartContextType = {
    cart,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart: clearCartHandler,
    getItem,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}