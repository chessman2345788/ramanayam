export type NotificationPriority = "critical" | "high" | "medium" | "low";

export type NotificationCategory =
  | "all"
  | "orders"
  | "inventory"
  | "payments"
  | "customers"
  | "reviews"
  | "coupons"
  | "cms"
  | "system"
  | "security";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  isRead: boolean;
  isArchived: boolean;
  relatedResource?: {
    label: string;
    href: string;
    type: "order" | "product" | "customer" | "coupon" | "review" | "cms" | "system";
  };
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundAlerts: boolean;
  lowStockAlerts: boolean;
  orderAlerts: boolean;
  paymentAlerts: boolean;
  reviewAlerts: boolean;
  securityAlerts: boolean;
}
