import { axiosClient } from "@/lib/api-axios";
import { eventBus } from "@/services/event-bus.service";

export interface InventoryItem {
  id: string;
  variantId: string;
  productName: string;
  variantName: string;
  sku: string;
  category: string;
  vendor: string;
  available: number;
  reserved: number;
  sold: number;
  lowStockThreshold: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  location: string;
  updatedAt: string;
}

export const InventoryService = {
  fetchInventoriesFromApi: async (params?: Record<string, any>): Promise<InventoryItem[]> => {
    try {
      const res = await axiosClient.get("/inventory", { params: { limit: 100, ...params } });
      const payload = res.data?.data || res.data;
      const rawItems = payload?.items || payload?.data || (Array.isArray(payload) ? payload : []);

      if (Array.isArray(rawItems) && rawItems.length > 0) {
        return rawItems.map((i: any) => {
          const avail = i.availableStock ?? i.available ?? 0;
          const resv = i.reservedStock ?? i.reserved ?? 0;
          const sold = i.soldStock ?? i.sold ?? 0;
          const threshold = i.lowStockAlert ?? i.lowStockThreshold ?? 5;

          let status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK";
          if (avail === 0) {
            status = "OUT_OF_STOCK";
          } else if (avail <= threshold) {
            status = "LOW_STOCK";
          }

          const variant = i.variant || {};
          const product = variant.product || {};
          const categoryName = product.category?.name || "Puja Essentials";
          const vendorName = product.vendor?.businessName || product.vendor?.name || "Ramanayam Artisans";

          return {
            id: i.id,
            variantId: i.variantId || variant.id || i.id,
            productName: product.name || i.productName || "Sacred Product",
            variantName: variant.variantName || variant.name || i.variantName || "Standard",
            sku: variant.sku || i.sku || "SKU-000",
            category: categoryName,
            vendor: vendorName,
            available: avail,
            reserved: resv,
            sold: sold,
            lowStockThreshold: threshold,
            status: status,
            location: i.location || "Main Mandir Warehouse",
            updatedAt: i.updatedAt || new Date().toISOString(),
          };
        });
      }
      return [];
    } catch (err: any) {
      console.warn("Inventory API fetch error:", err.message);
      return [];
    }
  },

  updateStockFromApi: async (variantId: string, availableStock: number, productName?: string): Promise<boolean> => {
    await axiosClient.patch(`/inventory/${variantId}`, { availableStock });
    eventBus.emit("STOCK_UPDATED", { variantId, quantity: availableStock, productName: productName || "Product Item" });
    return true;
  },

  addStockFromApi: async (variantId: string, amount: number, productName?: string): Promise<boolean> => {
    await axiosClient.post(`/inventory/${variantId}/add-stock`, { amount });
    eventBus.emit("STOCK_UPDATED", { variantId, quantity: amount, productName: productName || "Product Item" });
    return true;
  },

  decreaseStockFromApi: async (variantId: string, amount: number, productName?: string): Promise<boolean> => {
    await axiosClient.post(`/inventory/${variantId}/remove-stock`, { amount });
    eventBus.emit("STOCK_UPDATED", { variantId, quantity: -amount, productName: productName || "Product Item" });
    return true;
  },

  adjustStockFromApi: async (
    variantId: string,
    data: { availableStock?: number; reservedStock?: number; soldStock?: number; lowStockAlert?: number }
  ): Promise<boolean> => {
    await axiosClient.post(`/inventory/${variantId}/adjust-stock`, data);
    eventBus.emit("STOCK_UPDATED", { variantId, quantity: data.availableStock || 0, productName: "Product Item" });
    return true;
  },
};
