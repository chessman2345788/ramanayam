export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Refunded";

export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded"
  | "Partially Refunded";

export type PaymentMethod =
  | "UPI"
  | "Credit/Debit Card"
  | "Netbanking"
  | "Cash on Delivery";

export interface OrderLineItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  quantity: number;
  gstRate: number; // e.g. 5, 12, 18
  hsnCode: string;
  total: number;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CustomerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  badge: "VIP" | "Regular" | "New";
  joinedDate: string;
}

export interface TrackingInfo {
  courierName: "BlueDart" | "Delhivery" | "DTDC" | "India Post" | "Shadowfax";
  trackingId: string;
  status: "Manifested" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered" | "Return in Transit";
  expectedDelivery: string;
  trackingUrl?: string;
  lastUpdated: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  status: OrderStatus | "Payment Received" | "Order Placed";
  timestamp?: string;
  date: string;
  time?: string;
  actor: string; // e.g. "Customer (Online)", "System", "Admin (Rajesh Kumar)"
  note?: string;
}

export interface OrderNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  date: string;
  isSystem?: boolean;
}

export interface GSTSummary {
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
}

export interface DiscountSummary {
  code?: string;
  amount: number;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderLineItem[];
  itemsCount: number;
  subtotal: number;
  shippingCharges: number;
  gstSummary: GSTSummary;
  discountSummary: DiscountSummary;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  transactionId: string;
  paymentDate?: string;
  date: string;
  time: string;
  createdAtISO: string;
  trackingInfo?: TrackingInfo;
  timeline: TimelineEvent[];
  notes: OrderNote[];
}

export interface OrderFilterOptions {
  searchQuery: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  dateRange: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy: "newest" | "oldest" | "highest" | "lowest";
}
