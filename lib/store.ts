'use client';

import { create } from 'zustand';
import { Product, PRODUCTS } from './products';

export interface CartItem {
  product: Product;
  size: '50ml' | '100ml';
  quantity: number;
}

interface AppStore {
  cart: CartItem[];
  isCartOpen: boolean;
  activeHeroIndex: number;
  selectedSample: string;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, size: '50ml' | '100ml') => void;
  removeFromCart: (productId: string, size: '50ml' | '100ml') => void;
  updateQuantity: (productId: string, size: '50ml' | '100ml', quantity: number) => void;
  clearCart: () => void;
  setSelectedSample: (sample: string) => void;
  setActiveHeroIndex: (index: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  cart: [
    {
      product: PRODUCTS[0],
      size: '50ml',
      quantity: 1,
    },
  ],
  isCartOpen: false,
  activeHeroIndex: 0,
  selectedSample: 'Discovery Sample: Oud Rouge (2ml)',

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: (product, size) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += 1;
        return { cart: newCart, isCartOpen: true };
      }
      return {
        cart: [...state.cart, { product, size, quantity: 1 }],
        isCartOpen: true,
      };
    }),

  removeFromCart: (productId, size) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.product.id === productId && item.size === size)
      ),
    })),

  updateQuantity: (productId, size, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        };
      }
      return {
        cart: state.cart.map((item) => {
          if (item.product.id === productId && item.size === size) {
            return { ...item, quantity };
          }
          return item;
        }),
      };
    }),

  clearCart: () => set({ cart: [] }),
  setSelectedSample: (sample) => set({ selectedSample: sample }),
  setActiveHeroIndex: (index) => set({ activeHeroIndex: index }),
}));
