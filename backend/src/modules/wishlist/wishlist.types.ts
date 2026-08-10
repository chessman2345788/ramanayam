export interface WishlistItemRecord {
  id: string;
  productId: string;
  variantId?: string;
  addedAt: Date;
}

export interface FormattedWishlistItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  primaryImage?: string | null;
  status: string;
  isAvailable: boolean;
  addedAt: Date;
}

export interface WishlistResponse {
  items: FormattedWishlistItem[];
  itemCount: number;
  updatedAt: Date;
}
