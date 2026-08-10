import { api } from "@/lib/api";

export const CartService = {
  getCart: async () => {
    try {
      const res = await api.get("/cart");
      return res.data?.cart || res.data || res;
    } catch {
      return null;
    }
  },

  getSummary: async () => {
    try {
      const res = await api.get("/cart/summary");
      return res.data?.summary || res.data || res;
    } catch {
      return null;
    }
  },

  addItem: async (variantId: string, quantity = 1) => {
    try {
      const res = await api.post("/cart/items", { variantId, quantity });
      return res.data?.cart || res.data || res;
    } catch (error) {
      console.error("Failed to sync item to backend cart:", error);
      return null;
    }
  },

  updateItem: async (itemId: string, quantity: number) => {
    try {
      const res = await api.patch(`/cart/items/${itemId}`, { quantity });
      return res.data?.cart || res.data || res;
    } catch (error) {
      console.error("Failed to update item in backend cart:", error);
      return null;
    }
  },

  removeItem: async (itemId: string) => {
    try {
      const res = await api.delete(`/cart/items/${itemId}`);
      return res.data?.cart || res.data || res;
    } catch (error) {
      console.error("Failed to remove item from backend cart:", error);
      return null;
    }
  },

  clearCart: async () => {
    try {
      await api.delete("/cart/clear");
    } catch {
      // Ignore clear errors
    }
  },
};
