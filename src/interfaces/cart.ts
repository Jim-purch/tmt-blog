import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: Date;
}

export interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productSlug: string) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productSlug: string) => CartItem | undefined;
}