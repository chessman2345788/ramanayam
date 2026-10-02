import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartService } from "@/services/cart.service";
import { getAccessToken } from "@/lib/api";

export interface CartItem {
  id: string;           // variantId (unique key in cart)
  productId: string;    // product ID for linking
  name: string;         // product name
  variantName: string;  // e.g. "100g", "Size 3", "Brass + 5 inch"
  sku: string;          // e.g. "RAM-PS-KPR-STD"
  category: string;
  price: number;        // variant price
  mrp: number;
  image: string;
  slug: string;         // product slug for linking
  qty: number;
}

interface CartStore {
  items: CartItem[];
  drawerOpen: boolean;

  openDrawer: () => void;
  closeDrawer: () => void;

  // Accepts variant-aware payload
  addItem: (item: Record<string, unknown>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;

  // Computed convenience
  itemCount: number;
}

// Helper: extract CartItem fields from a Product + variant selection
function toCartFields(obj: Record<string, unknown>): Omit<CartItem, "qty"> {
  // If a variantId is passed, use it as the cart item ID
  const variantId = String(obj.variantId ?? obj.id ?? "");
  const productId = String(obj.productId ?? obj.id ?? "");

  return {
    id: variantId,
    productId,
    name: String(obj.name ?? ""),
    variantName: String(obj.variantName ?? obj.subtitle ?? "Standard"),
    sku: String(obj.sku ?? ""),
    category: String(obj.category ?? ""),
    price: Number(obj.price ?? 0),
    mrp: Number(obj.mrp ?? obj.price ?? 0),
    image: String(obj.image ?? ""),
    slug: String(obj.slug ?? ""),
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      itemCount: 0,

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      addItem: (item, quantity = 1) => {
        const fields = toCartFields(item);
        const exists = get().items.find((i) => i.id === fields.id);

        let newItems: CartItem[];
        if (exists) {
          newItems = get().items.map((i) =>
            i.id === fields.id ? { ...i, qty: i.qty + quantity } : i
          );
        } else {
          newItems = [...get().items, { ...fields, qty: quantity }];
        }

        const itemCount = newItems.reduce((sum, i) => sum + i.qty, 0);
        set({ items: newItems, itemCount, drawerOpen: true });

        if (getAccessToken()) {
          CartService.addItem(fields.id, quantity).catch(() => {});
        }
      },

      removeItem: (id) => {
        const newItems = get().items.filter((i) => i.id !== id);
        const itemCount = newItems.reduce((sum, i) => sum + i.qty, 0);
        set({ items: newItems, itemCount });

        if (getAccessToken()) {
          CartService.removeItem(id).catch(() => {});
        }
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        const newItems = get().items.map((i) =>
          i.id === id ? { ...i, qty } : i
        );
        const itemCount = newItems.reduce((sum, i) => sum + i.qty, 0);
        set({ items: newItems, itemCount });

        if (getAccessToken()) {
          CartService.updateItem(id, qty).catch(() => {});
        }
      },

      clearCart: () => {
        set({ items: [], itemCount: 0 });
        if (getAccessToken()) {
          CartService.clearCart().catch(() => {});
        }
      },

      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: "ramanayam-cart",
      version: 3, // bump version for migration
      partialize: (s) => ({ items: s.items }),
      // Ensure persisted scalars never overwrite store functions
      merge: (persisted, current) => {
        const p = (persisted as Partial<CartStore>) || {};
        return {
          ...current,
          items: Array.isArray(p.items) ? p.items : current.items,
          itemCount: Array.isArray(p.items)
            ? p.items.reduce((sum: number, i: CartItem) => sum + i.qty, 0)
            : current.itemCount,
        };
      },
    }
  )
);
