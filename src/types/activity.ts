export type ActivitySeverity = "critical" | "high" | "medium" | "low";

export type ActivityActionType =
  | "Created"
  | "Updated"
  | "Deleted"
  | "Published"
  | "Archived"
  | "Login"
  | "Logout"
  | "Password Changed"
  | "Permission Changed"
  | "Status Updated"
  | "Refund Issued";

export type ActivityModule =
  | "Authentication"
  | "Products"
  | "Inventory"
  | "Orders"
  | "Payments"
  | "Customers"
  | "Reviews"
  | "Coupons"
  | "CMS"
  | "Settings"
  | "System"
  | "Security";

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  module: ActivityModule;
  action: ActivityActionType;
  target: string;
  ipAddress: string;
  severity: ActivitySeverity;
  status: "SUCCESS" | "FAILED";
  metadata: {
    browser: string;
    os: string;
    device: string;
    location: string;
    before?: Record<string, any> | string | null;
    after?: Record<string, any> | string | null;
  };
}
