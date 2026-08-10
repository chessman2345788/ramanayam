export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" | "RESERVED";

export type StockAdjustmentReason =
  | "Purchase"
  | "Return"
  | "Damage"
  | "Manual Correction"
  | "Supplier Restock";

export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  barcode: string;
  category: string;
  vendor: string;
  warehouse: string;
  available: number;
  reserved: number;
  lowStockThreshold: number;
  unitCost: number; // In INR (₹)
  sellingPrice: number; // In INR (₹)
  status: StockStatus;
  image: string;
  updatedAt: string;
}

export interface InventoryHistoryEntry {
  id: string;
  inventoryId: string;
  date: string;
  user: string;
  action: "INCREASE" | "DECREASE" | "TRANSFER" | "THRESHOLD_CHANGE";
  quantityChanged: number;
  previousStock: number;
  newStock: number;
  reason: StockAdjustmentReason | string;
  notes: string;
}

export interface InventoryFilterState {
  searchQuery: string;
  category: string;
  vendor: string;
  warehouse: string;
  stockStatus: "ALL" | StockStatus;
  sortBy: "newest" | "name_asc" | "stock_desc" | "stock_asc";
}
