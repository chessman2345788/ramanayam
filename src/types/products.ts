export interface Product {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  description: string;
  price: number;
  mrp: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  tags: string[];
  badges: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured: boolean;
  material?: string;
  weight?: string;
  pujaGuide?: string;
  ingredients?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  nameSanskrit: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Occasion {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  description: string;
  image: string;
  date: string;
  products: string[];
}

export interface Review {
  id: string;
  userName: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LiveDarshan {
  id: string;
  title: string;
  temple: string;
  deity: string;
  location: string;
  isLive: boolean;
  scheduledAt: string;
  viewerCount: number;
  thumbnailUrl: string;
  streamUrl?: string;
}
