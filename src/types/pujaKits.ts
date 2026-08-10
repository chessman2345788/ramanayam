export interface PujaKitItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
}

export interface PujaKitCombo {
  id: string;
  name: string;
  sanskritName: string;
  sku: string;
  category: string;
  description: string;
  items: PujaKitItem[];
  originalPrice: number;
  bundlePrice: number;
  savingsPercentage: number;
  stockCount: number;
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";
  imageUrl: string;
}
