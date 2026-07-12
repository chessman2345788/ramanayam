import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,

      addItem: (product: Product) => {
        const items = get().items;
        if (!items.find((p) => p.id === product.id)) {
          const newItems = [...items, product];
          set({ items: newItems, itemCount: newItems.length });
        }
      },

      removeItem: (productId: string) => {
        const newItems = get().items.filter((p) => p.id !== productId);
        set({ items: newItems, itemCount: newItems.length });
      },

      toggleItem: (product: Product) => {
        const items = get().items;
        if (items.find((p) => p.id === product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.some((p) => p.id === productId);
      },
    }),
    {
      name: "ramanayam-wishlist",
    }
  )
);
