export interface KPIMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  avatarUrl?: string;
  amount: string;
  paymentMode: "UPI" | "Card" | "NetBanking" | "COD";
  status: "Completed" | "Processing" | "Pending" | "Cancelled";
  date: string;
}

export interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  category: string;
  imageUrl?: string;
}

export interface BestSellerProduct {
  id: string;
  name: string;
  category: string;
  salesCount: number;
  revenue: string;
  rating: number;
  imageUrl: string;
}

export interface RecentCustomer {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
  ordersCount: number;
}

export interface AdminActivity {
  id: string;
  type: "order" | "user" | "stock" | "payment" | "cancelled";
  title: string;
  time: string;
  description: string;
}

export interface SystemServiceHealth {
  id: string;
  name: string;
  status: "Healthy" | "Warning" | "Offline";
  latency: string;
  uptime: string;
}
