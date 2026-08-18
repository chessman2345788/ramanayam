export interface PermissionItem {
  id: string; // e.g. 'products.create'
  name: string; // e.g. 'Create Products'
  description: string;
}

export interface PermissionGroupData {
  id: string; // e.g. 'products'
  name: string; // e.g. 'Products'
  description: string;
  permissions: PermissionItem[];
}

export interface AdminRoleDetail {
  id: string;
  name: string;
  description: string;
  isSystemRole?: boolean;
  status: "ACTIVE" | "INACTIVE";
  usersCount: number;
  permissions: string[]; // List of permission IDs, e.g. ['dashboard.view', 'products.view', ...]
  createdAt: string;
  updatedAt?: string;

  // Backward compatibility fields for legacy components
  color?: string;
  iconName?: string;
  permissionsCount?: number;
}

export interface StaffUserItem {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  status: "ACTIVE" | "INVITED" | "SUSPENDED";
  avatar?: string;
  joinedDate: string;
  lastActive?: string;
}

export const ALL_PERMISSION_GROUPS: PermissionGroupData[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Access to store overview and analytical performance widgets",
    permissions: [
      { id: "dashboard.view", name: "View Dashboard", description: "Access main admin overview dashboard" },
      { id: "dashboard.analytics", name: "View Analytics", description: "Access real-time sales and visitor metrics" },
    ],
  },
  {
    id: "products",
    name: "Products",
    description: "Manage sacred products, brassware, malas, and catalog pricing",
    permissions: [
      { id: "products.view", name: "View Products", description: "View catalog list and product details" },
      { id: "products.create", name: "Create Products", description: "Add new products to store catalog" },
      { id: "products.edit", name: "Edit Products", description: "Modify pricing, descriptions, and media" },
      { id: "products.delete", name: "Delete Products", description: "Permanently delete products from catalog" },
      { id: "products.publish", name: "Publish Products", description: "Toggle live visibility on storefront" },
    ],
  },
  {
    id: "categories",
    name: "Categories",
    description: "Organize product categories and sub-categories",
    permissions: [
      { id: "categories.view", name: "View Categories", description: "View category hierarchy" },
      { id: "categories.create", name: "Create Categories", description: "Add new product categories" },
      { id: "categories.edit", name: "Edit Categories", description: "Edit category names and banners" },
      { id: "categories.delete", name: "Delete Categories", description: "Remove categories" },
    ],
  },
  {
    id: "inventory",
    name: "Inventory",
    description: "Stock quantities, reorder alerts, and warehouse supply logs",
    permissions: [
      { id: "inventory.view", name: "View Inventory", description: "View stock levels and reorder alerts" },
      { id: "inventory.adjust", name: "Adjust Stock", description: "Update product stock counts" },
      { id: "inventory.history", name: "View Inventory History", description: "View stock adjustment audit history" },
    ],
  },
  {
    id: "orders",
    name: "Orders",
    description: "Fulfill customer orders, update tracking, and issue refunds",
    permissions: [
      { id: "orders.view", name: "View Orders", description: "View customer order details and history" },
      { id: "orders.status", name: "Update Order Status", description: "Mark orders as Processing, Shipped, Delivered" },
      { id: "orders.cancel", name: "Cancel Orders", description: "Cancel pending customer orders" },
      { id: "orders.refund", name: "Refund Orders", description: "Issue refunds via payment gateway" },
    ],
  },
  {
    id: "customers",
    name: "Customers",
    description: "Devotee records, order history, and account status",
    permissions: [
      { id: "customers.view", name: "View Customers", description: "View customer profiles and order history" },
      { id: "customers.edit", name: "Edit Customers", description: "Update customer contact details" },
      { id: "customers.block", name: "Block Customers", description: "Restrict customer account access" },
    ],
  },
  {
    id: "reviews",
    name: "Reviews",
    description: "Product reviews moderation and public rating approvals",
    permissions: [
      { id: "reviews.view", name: "View Reviews", description: "View customer ratings and reviews" },
      { id: "reviews.approve", name: "Approve Reviews", description: "Approve reviews for public storefront" },
      { id: "reviews.hide", name: "Hide Reviews", description: "Hide inappropriate customer reviews" },
      { id: "reviews.delete", name: "Delete Reviews", description: "Permanently delete reviews" },
    ],
  },
  {
    id: "coupons",
    name: "Coupons",
    description: "Promotional discount codes and festival campaign vouchers",
    permissions: [
      { id: "coupons.view", name: "View Coupons", description: "View active and expired promo codes" },
      { id: "coupons.create", name: "Create Coupons", description: "Create new discount codes" },
      { id: "coupons.edit", name: "Edit Coupons", description: "Modify discount rules and validity" },
      { id: "coupons.disable", name: "Disable Coupons", description: "Deactivate promo campaigns" },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Revenue intelligence, sales reports, and customer cohorts",
    permissions: [
      { id: "analytics.view", name: "View Analytics", description: "Access store sales charts and reporting" },
      { id: "analytics.export", name: "Export Reports", description: "Download CSV and PDF executive reports" },
    ],
  },
  {
    id: "vendors",
    name: "Vendors",
    description: "Marketplace seller onboarding, approval, and management",
    permissions: [
      { id: "vendors.view", name: "View Vendors", description: "View seller accounts and statistics" },
      { id: "vendors.approve", name: "Approve Vendors", description: "Approve pending seller applications" },
      { id: "vendors.suspend", name: "Suspend Vendors", description: "Suspend non-compliant sellers" },
    ],
  },
  {
    id: "security",
    name: "Settings & Security",
    description: "Store configuration, RBAC roles, and security audit logs",
    permissions: [
      { id: "settings.view", name: "View Settings", description: "View store preferences and rules" },
      { id: "settings.edit", name: "Edit Settings", description: "Modify store configuration and payment rules" },
      { id: "security.audit", name: "View Audit Logs", description: "View admin access and security logs" },
      { id: "security.roles", name: "Manage Roles", description: "Create and edit admin roles & permissions" },
    ],
  },
];

// Compatibility export for legacy components
export const permissionModulesList = ALL_PERMISSION_GROUPS.map((g) => ({
  id: g.id,
  name: g.name,
  actions: g.permissions.map((p) => ({ key: p.id.split(".")[1] || p.id, label: p.name })),
}));

// All permission IDs flattened
export const TOTAL_PERMISSIONS_COUNT = ALL_PERMISSION_GROUPS.reduce(
  (acc, g) => acc + g.permissions.length,
  0
);

export const ALL_PERMISSION_IDS = ALL_PERMISSION_GROUPS.flatMap((g) =>
  g.permissions.map((p) => p.id)
);

export const mockRolesList: AdminRoleDetail[] = [
  {
    id: "role_super_admin",
    name: "Super Admin",
    description: "Full unrestricted access to all store modules, settings, security, and staff management.",
    isSystemRole: true,
    status: "ACTIVE",
    usersCount: 2,
    permissions: ALL_PERMISSION_IDS,
    createdAt: "2026-01-01",
    updatedAt: "2026-08-01",
    color: "#701A75",
    iconName: "ShieldCheck",
    permissionsCount: ALL_PERMISSION_IDS.length,
  },
  {
    id: "role_admin_manager",
    name: "Admin / Manager",
    description: "Full operational access across Products, Categories, Inventory, Orders, Customers, Reviews, and Coupons.",
    isSystemRole: true,
    status: "ACTIVE",
    usersCount: 4,
    permissions: [
      "dashboard.view", "dashboard.analytics",
      "products.view", "products.create", "products.edit", "products.publish",
      "categories.view", "categories.create", "categories.edit",
      "inventory.view", "inventory.adjust", "inventory.history",
      "orders.view", "orders.status", "orders.refund",
      "customers.view", "customers.edit",
      "reviews.view", "reviews.approve", "reviews.hide",
      "coupons.view", "coupons.create", "coupons.edit",
      "analytics.view", "analytics.export",
      "settings.view",
    ],
    createdAt: "2026-01-15",
    updatedAt: "2026-07-20",
    color: "#F57C00",
    iconName: "UserCheck",
    permissionsCount: 26,
  },
  {
    id: "role_staff",
    name: "Staff / Moderator",
    description: "Limited operational permissions for order status updates, review moderation, and customer lookups.",
    isSystemRole: true,
    status: "ACTIVE",
    usersCount: 5,
    permissions: [
      "dashboard.view",
      "orders.view", "orders.status",
      "customers.view",
      "reviews.view", "reviews.approve", "reviews.hide",
      "inventory.view",
    ],
    createdAt: "2026-02-01",
    updatedAt: "2026-07-10",
    color: "#16A34A",
    iconName: "ShoppingBag",
    permissionsCount: 8,
  },
  {
    id: "role_vendor",
    name: "Vendor",
    description: "Future marketplace seller role. Restricted access to seller's own products, orders, and stock.",
    isSystemRole: true,
    status: "ACTIVE",
    usersCount: 3,
    permissions: [
      "dashboard.view",
      "products.view", "products.create", "products.edit",
      "orders.view", "orders.status",
      "inventory.view", "inventory.adjust",
    ],
    createdAt: "2026-03-01",
    updatedAt: "2026-06-15",
    color: "#0284C7",
    iconName: "Users",
    permissionsCount: 8,
  },
];

export const mockStaffUsersList: StaffUserItem[] = [
  {
    id: "usr_1",
    name: "Pandit Rajesh Sharma",
    email: "rajesh.admin@ramanayam.com",
    roleId: "role_super_admin",
    roleName: "Super Admin",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    joinedDate: "2026-01-01",
    lastActive: "Just now",
  },
  {
    id: "usr_2",
    name: "Meera Agarwal",
    email: "meera.mktg@ramanayam.com",
    roleId: "role_admin_manager",
    roleName: "Admin / Manager",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    joinedDate: "2026-01-15",
    lastActive: "2 hours ago",
  },
  {
    id: "usr_3",
    name: "Ananya Iyer",
    email: "ananya.mod@ramanayam.com",
    roleId: "role_staff",
    roleName: "Staff / Moderator",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    joinedDate: "2026-02-01",
    lastActive: "Yesterday",
  },
  {
    id: "usr_4",
    name: "Sanjay Verma",
    email: "sanjay.ops@ramanayam.com",
    roleId: "role_admin_manager",
    roleName: "Admin / Manager",
    status: "ACTIVE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    joinedDate: "2026-02-15",
    lastActive: "3 hours ago",
  },
  {
    id: "usr_5",
    name: "Pooja Hegde",
    email: "pooja.inv@ramanayam.com",
    roleId: "role_staff",
    roleName: "Staff / Moderator",
    status: "INVITED",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    joinedDate: "2026-03-01",
    lastActive: "Pending",
  },
];

export const mockStaffUsers = mockStaffUsersList;
