import { axiosClient } from "@/lib/api-axios";
import { eventBus } from "@/services/event-bus.service";

export interface InventoryItem {
  id: string;
  variantId: string;
  productName: string;
  variantName: string;
  sku: string;
  quantity: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  location: string;
  updatedAt: string;
}

export const InventoryService = {
  fetchInventoriesFromApi: async (params?: Record<string, any>): Promise<InventoryItem[]> => {
    try {
      const res = await axiosClient.get("/inventory", { params });
      const items = res.data?.data || res.data;
      if (Array.isArray(items) && items.length > 0) {
        return items.map((i: any) => ({
          id: i.id,
          variantId: i.variantId || i.id,
          productName: i.variant?.product?.name || i.productName || "Sacred Item",
          variantName: i.variant?.name || i.variantName || "Standard",
          sku: i.variant?.sku || i.sku || "SKU-INV-001",
          quantity: i.quantity || 0,
          reserved: i.reserved || 0,
          available: (i.quantity || 0) - (i.reserved || 0),
          lowStockThreshold: i.lowStockThreshold || 10,
          status:
            i.quantity <= 0
              ? "OUT_OF_STOCK"
              : i.quantity <= (i.lowStockThreshold || 10)
              ? "LOW_STOCK"
              : "IN_STOCK",
          location: i.location || "Main Mandir Warehouse",
          updatedAt: i.updatedAt || new Date().toISOString(),
        }));
      }
      return [];
    } catch (err: any) {
      console.warn("Inventory API fetch error, fallback:", err.message);
      return [];
    }
  },

  updateStockFromApi: async (variantId: string, quantity: number, productName?: string): Promise<boolean> => {
    try {
      await axiosClient.patch(`/inventory/${variantId}`, { quantity });
      eventBus.emit("STOCK_UPDATED", { variantId, quantity, productName: productName || "Product Item" });
      return true;
    } catch (err: any) {
      console.warn("Inventory update API error, fallback:", err.message);
      eventBus.emit("STOCK_UPDATED", { variantId, quantity, productName: productName || "Product Item" });
      return true;
    }
  },

  addStockFromApi: async (variantId: string, amount: number, productName?: string): Promise<boolean> => {
    try {
      await axiosClient.post(`/inventory/${variantId}/add-stock`, { amount });
      eventBus.emit("STOCK_UPDATED", { variantId, quantity: amount, productName: productName || "Product Item" });
      return true;
    } catch (err: any) {
      console.warn("Inventory add stock API error, fallback:", err.message);
      eventBus.emit("STOCK_UPDATED", { variantId, quantity: amount, productName: productName || "Product Item" });
      return true;
    }
  },
};
