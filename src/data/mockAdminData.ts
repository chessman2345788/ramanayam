export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK" | "ARCHIVED";
  vendor: string;
  rating: number;
  salesCount: number;
  image: string;
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  status: "ACTIVE" | "INACTIVE";
  description: string;
}

export interface AdminInventoryItem {
  id: string;
  productName: string;
  sku: string;
  category: string;
  available: number;
  reserved: number;
  sold: number;
  lowStockAlert: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  itemsCount: number;
  total: number;
  paymentMethod: "UPI" | "CARD" | "COD" | "NETBANKING";
  paymentStatus: "SUCCESS" | "PENDING" | "FAILED" | "REFUNDED";
  orderStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  date: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "ADMIN" | "VENDOR";
  ordersCount: number;
  totalSpent: number;
  status: "ACTIVE" | "BLOCKED" | "PENDING";
  joinedDate: string;
}

export interface AdminReview {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: "APPROVED" | "PENDING" | "FLAGGED";
  date: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number;
  usageCount: number;
  usageLimit: number;
  status: "ACTIVE" | "EXPIRED" | "DISABLED";
  expiresAt: string;
}

export interface AdminVendor {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  productsCount: number;
  totalPayout: number;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  verified: boolean;
  joinedDate: string;
}

export const mockAdminStats = {
  totalRevenue: 2845900,
  revenueChange: +14.2,
  totalOrders: 1482,
  ordersChange: +8.7,
  totalCustomers: 3940,
  customersChange: +18.4,
  conversionRate: 3.42,
  conversionChange: +0.6,
};

export const mockAdminProducts: AdminProduct[] = [
  {
    id: "prod-001",
    name: "Handcrafted Brass Diya Set",
    sku: "DIYA-BRS-01",
    category: "Brass Diyas & Lamps",
    price: 1499,
    stock: 45,
    status: "ACTIVE",
    vendor: "Varanasi Artisan Cooperative",
    rating: 4.9,
    salesCount: 320,
    image: "/images/products/brass-diya.jpg",
    createdAt: "2026-07-15",
  },
  {
    id: "prod-002",
    name: "Pure Copper Kalash & Coconut Set",
    sku: "KAL-COP-02",
    category: "Puja Utensils",
    price: 1899,
    stock: 28,
    status: "ACTIVE",
    vendor: "Jaipur Heritage Metalcraft",
    rating: 4.8,
    salesCount: 215,
    image: "/images/products/copper-kalash.jpg",
    createdAt: "2026-07-12",
  },
  {
    id: "prod-003",
    name: "Organic A2 Desi Cow Ghee (500ml)",
    sku: "GHEE-A2-500",
    category: "Sacred Food & Offerings",
    price: 899,
    stock: 120,
    status: "ACTIVE",
    vendor: "Vrindavan Organic Farms",
    rating: 5.0,
    salesCount: 640,
    image: "/images/products/cow-ghee.jpg",
    createdAt: "2026-07-10",
  },
  {
    id: "prod-004",
    name: "Handmade Marigold Toran Door Hanging",
    sku: "TOR-MAR-04",
    category: "Temple Decor",
    price: 599,
    stock: 6,
    status: "ACTIVE",
    vendor: "Mathura Craft Guild",
    rating: 4.7,
    salesCount: 180,
    image: "/images/products/toran.jpg",
    createdAt: "2026-07-08",
  },
  {
    id: "prod-005",
    name: "Original 5 Mukhi Rudraksha Mala",
    sku: "RUD-5M-108",
    category: "Mala & Beads",
    price: 2499,
    stock: 0,
    status: "OUT_OF_STOCK",
    vendor: "Rishikesh Sacred Beads",
    rating: 4.9,
    salesCount: 410,
    image: "/images/products/brass-diya.jpg",
    createdAt: "2026-07-01",
  },
  {
    id: "prod-006",
    name: "Natural Sandalwood Dhoop Cones",
    sku: "DHO-SAN-20",
    category: "Incense & Dhoop",
    price: 349,
    stock: 200,
    status: "ACTIVE",
    vendor: "Mysore Perfumes Co.",
    rating: 4.8,
    salesCount: 890,
    image: "/images/products/cow-ghee.jpg",
    createdAt: "2026-06-25",
  },
];

export const mockAdminCategories: AdminCategory[] = [
  { id: "cat-1", name: "Brass Diyas & Lamps", slug: "brass-diyas-lamps", productCount: 24, status: "ACTIVE", description: "Hand-carved brass oil lamps and peacock diyas." },
  { id: "cat-2", name: "Puja Utensils", slug: "puja-utensils", productCount: 18, status: "ACTIVE", description: "Pure copper kalash, thalis, bell, and chanchaman." },
  { id: "cat-3", name: "Sacred Food & Offerings", slug: "sacred-food-offerings", productCount: 12, status: "ACTIVE", description: "Pure A2 desi ghee, brij mishri, and organic saffron." },
  { id: "cat-4", name: "Temple Decor", slug: "temple-decor", productCount: 30, status: "ACTIVE", description: "Marigold torans, velvet altar cloths, and brass wall hangings." },
  { id: "cat-5", name: "Mala & Beads", slug: "mala-beads", productCount: 15, status: "ACTIVE", description: "Certified Nepali Rudraksha, Tulsi, and Sphatik malas." },
  { id: "cat-6", name: "Incense & Dhoop", slug: "incense-dhoop", productCount: 22, status: "ACTIVE", description: "Charcoal-free incense sticks and pure dhoop cones." },
];

export const mockAdminInventory: AdminInventoryItem[] = [
  { id: "inv-1", productName: "Handcrafted Brass Diya Set", sku: "DIYA-BRS-01", category: "Brass Diyas & Lamps", available: 45, reserved: 3, sold: 320, lowStockAlert: 10, status: "IN_STOCK" },
  { id: "inv-2", productName: "Pure Copper Kalash Set", sku: "KAL-COP-02", category: "Puja Utensils", available: 28, reserved: 2, sold: 215, lowStockAlert: 10, status: "IN_STOCK" },
  { id: "inv-3", productName: "Organic A2 Desi Cow Ghee", sku: "GHEE-A2-500", category: "Sacred Food", available: 120, reserved: 8, sold: 640, lowStockAlert: 20, status: "IN_STOCK" },
  { id: "inv-4", productName: "Handmade Marigold Toran", sku: "TOR-MAR-04", category: "Temple Decor", available: 4, reserved: 2, sold: 180, lowStockAlert: 5, status: "LOW_STOCK" },
  { id: "inv-5", productName: "Original 5 Mukhi Rudraksha Mala", sku: "RUD-5M-108", category: "Mala & Beads", available: 0, reserved: 0, sold: 410, lowStockAlert: 8, status: "OUT_OF_STOCK" },
];

export const mockAdminOrders: AdminOrder[] = [
  { id: "ORD-94821", customerName: "Rajesh Sharma", email: "rajesh.s@gmail.com", itemsCount: 3, total: 4297, paymentMethod: "UPI", paymentStatus: "SUCCESS", orderStatus: "PROCESSING", date: "2026-07-31 18:42" },
  { id: "ORD-94820", customerName: "Priya Sundaram", email: "priya.sun@outlook.com", itemsCount: 1, total: 1499, paymentMethod: "CARD", paymentStatus: "SUCCESS", orderStatus: "SHIPPED", date: "2026-07-31 16:15" },
  { id: "ORD-94819", customerName: "Ananya Iyer", email: "ananya.i@yahoo.com", itemsCount: 2, total: 2798, paymentMethod: "UPI", paymentStatus: "SUCCESS", orderStatus: "DELIVERED", date: "2026-07-31 14:02" },
  { id: "ORD-94818", customerName: "Vikram Malhotra", email: "v.malhotra@corp.in", itemsCount: 5, total: 8950, paymentMethod: "NETBANKING", paymentStatus: "SUCCESS", orderStatus: "PENDING", date: "2026-07-31 11:20" },
  { id: "ORD-94817", customerName: "Sanjay Gupta", email: "sanjay.g@gmail.com", itemsCount: 1, total: 899, paymentMethod: "COD", paymentStatus: "PENDING", orderStatus: "PENDING", date: "2026-07-30 21:05" },
];

export const mockAdminCustomers: AdminCustomer[] = [
  { id: "usr-101", name: "Rajesh Sharma", email: "rajesh.s@gmail.com", phone: "+91 98765 43210", role: "CUSTOMER", ordersCount: 8, totalSpent: 18450, status: "ACTIVE", joinedDate: "2026-01-14" },
  { id: "usr-102", name: "Priya Sundaram", email: "priya.sun@outlook.com", phone: "+91 98123 45678", role: "CUSTOMER", ordersCount: 4, totalSpent: 7890, status: "ACTIVE", joinedDate: "2026-03-22" },
  { id: "usr-103", name: "Ananya Iyer", email: "ananya.i@yahoo.com", phone: "+91 97654 32109", role: "CUSTOMER", ordersCount: 12, totalSpent: 34200, status: "ACTIVE", joinedDate: "2025-11-05" },
  { id: "usr-104", name: "Vikram Malhotra", email: "v.malhotra@corp.in", phone: "+91 99887 76655", role: "VENDOR", ordersCount: 2, totalSpent: 4500, status: "ACTIVE", joinedDate: "2026-02-18" },
  { id: "usr-105", name: "Amit Verma", email: "amit.v@spam.com", phone: "+91 91122 33445", role: "CUSTOMER", ordersCount: 0, totalSpent: 0, status: "BLOCKED", joinedDate: "2026-07-02" },
];

export const mockAdminReviews: AdminReview[] = [
  { id: "rev-1", productName: "Handcrafted Brass Diya Set", customerName: "Meera Joshi", rating: 5, comment: "Exquisite craftsmanship! The brass finish is divine.", status: "APPROVED", date: "2026-07-30" },
  { id: "rev-2", productName: "Organic A2 Desi Cow Ghee", customerName: "Alok Nanda", rating: 5, comment: "Authentic aroma. Perfect for our daily morning havan.", status: "APPROVED", date: "2026-07-29" },
  { id: "rev-3", productName: "Original 5 Mukhi Rudraksha Mala", customerName: "Kavita Reddy", rating: 2, comment: "Packaging was damaged during shipping.", status: "PENDING", date: "2026-07-28" },
];

export const mockAdminCoupons: AdminCoupon[] = [
  { id: "coup-1", code: "RAMANAYAM10", discountType: "PERCENTAGE", value: 10, usageCount: 420, usageLimit: 1000, status: "ACTIVE", expiresAt: "2026-12-31" },
  { id: "coup-2", code: "DIWALI2026", discountType: "PERCENTAGE", value: 20, usageCount: 185, usageLimit: 500, status: "ACTIVE", expiresAt: "2026-11-15" },
  { id: "coup-3", code: "WELCOME500", discountType: "FIXED_AMOUNT", value: 500, usageCount: 890, usageLimit: 1000, status: "ACTIVE", expiresAt: "2026-09-30" },
];

export const mockAdminVendors: AdminVendor[] = [
  { id: "ven-1", businessName: "Varanasi Artisan Cooperative", ownerName: "Shri Mahadev Prasad", email: "varanasi.coop@artisans.org", phone: "+91 94150 12345", productsCount: 18, totalPayout: 485000, status: "ACTIVE", verified: true, joinedDate: "2025-08-10" },
  { id: "ven-2", businessName: "Jaipur Heritage Metalcraft", ownerName: "Rameshwar Singh", email: "jaipur.metal@heritage.in", phone: "+91 98290 67890", productsCount: 12, totalPayout: 320000, status: "ACTIVE", verified: true, joinedDate: "2025-10-01" },
  { id: "ven-3", businessName: "Vrindavan Organic Farms", ownerName: "Radha Raman Das", email: "info@vrindavanorganics.com", phone: "+91 97190 43210", productsCount: 8, totalPayout: 640000, status: "ACTIVE", verified: true, joinedDate: "2025-06-15" },
];
