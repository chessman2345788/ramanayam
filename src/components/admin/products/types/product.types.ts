export type ProductStatus = "Active" | "Draft" | "Archived" | "Out of Stock" | "Low Stock";

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  size?: string;
  color?: string;
  material?: string;
  weight?: string;
  price: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameHi?: string;
  slug: string;
  sku: string;
  barcode?: string;
  shortDesc: string;
  fullDesc: string;
  description?: string;
  category: string;
  categorySlug?: string;
  categoryId?: string;
  subcategory?: string;
  brand: string;
  vendor: string;
  vendorId?: string;
  price: number;
  mrp: number;
  image?: string;
  costPrice?: number;
  gstRate: number;
  stock: number;
  inStock?: boolean;
  lowStockLimit: number;
  status: ProductStatus;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isTrending: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  badges?: string[];
  material?: string;
  occasion?: string;
  deity?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilterState {
  search: string;
  category: string;
  subcategory: string;
  brand: string;
  status: string;
  featured: boolean | null;
  stockFilter: "all" | "inStock" | "lowStock" | "outOfStock";
  vendor: string;
  material: string;
  occasion: string;
  deity: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: "newest" | "oldest" | "name" | "priceLow" | "priceHigh" | "stock" | "popularity";
}

export type BulkActionType =
  | "delete"
  | "archive"
  | "publish"
  | "unpublish"
  | "assignCategory";
