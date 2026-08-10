export type CustomerStatus = "Active" | "Blocked" | "VIP" | "Guest" | "Verified";

export type CustomerType = "Retail" | "Wholesale";

export interface CustomerAddress {
  id: string;
  type: "Billing" | "Shipping";
  isDefault: boolean;
  name: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CustomerOrderSummary {
  id: string;
  date: string;
  amount: number;
  itemsCount: number;
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded";
  orderStatus: "Pending" | "Confirmed" | "Packed" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  inStock: boolean;
  addedDate: string;
}

export interface CustomerReview {
  id: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export interface CustomerCoupon {
  code: string;
  discount: string;
  usedDate: string;
  orderId: string;
}

export interface CustomerTimelineEvent {
  id: string;
  title: string;
  type: "account_created" | "order_placed" | "review_submitted" | "password_changed" | "address_updated";
  date: string;
  time: string;
  actor: string;
  details?: string;
}

export interface Customer {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  isVerified: boolean;
  isGuest: boolean;
  customerType: CustomerType;
  ordersCount: number;
  totalSpent: number;
  avgOrderValue: number;
  joinedDate: string;
  lastOrderDate?: string;
  addresses: CustomerAddress[];
  recentOrders: CustomerOrderSummary[];
  wishlist: WishlistItem[];
  reviews: CustomerReview[];
  couponsUsed: CustomerCoupon[];
  recentlyViewed: { id: string; name: string; price: number; image: string }[];
  timeline: CustomerTimelineEvent[];
  notes?: string;
}

export interface CustomerFilterOptions {
  searchQuery: string;
  status: string;
  customerType: string;
  minOrders?: number;
  minSpent?: number;
  sortBy: "newest" | "oldest" | "highest_spending" | "most_orders";
}
