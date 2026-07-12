import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "@/data/products";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  savings: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number = 1) => {
        const items = get().items;
        const existing = items.find((item) => item.product.id === product.id);

        let newItems: CartItem[];
        if (existing) {
          newItems = items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...items, { product, quantity }];
        }

        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const savings = newItems.reduce((sum, item) => sum + (item.product.mrp - item.product.price) * item.quantity, 0);

        set({ items: newItems, itemCount, total, savings });
      },

      removeItem: (productId: string) => {
        const newItems = get().items.filter((item) => item.product.id !== productId);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const savings = newItems.reduce((sum, item) => sum + (item.product.mrp - item.product.price) * item.quantity, 0);

        set({ items: newItems, itemCount, total, savings });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const newItems = get().items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const savings = newItems.reduce((sum, item) => sum + (item.product.mrp - item.product.price) * item.quantity, 0);

        set({ items: newItems, itemCount, total, savings });
      },

      clearCart: () => set({ items: [], itemCount: 0, total: 0, savings: 0 }),

      itemCount: 0,
      total: 0,
      savings: 0,
    }),
    {
      name: "ramanayam-cart",
    }
  )
);
