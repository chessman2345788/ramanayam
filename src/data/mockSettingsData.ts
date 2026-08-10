export interface StoreSettingsData {
  // General
  storeName: string;
  storeLogo: string;
  favicon: string;
  businessDescription: string;
  contactEmail: string;
  supportPhone: string;
  timezone: string;
  currency: string;
  language: string;

  // Store Information
  businessName: string;
  gstNumber: string;
  panNumber: string;
  businessAddress: string;
  invoicePrefix: string;
  orderPrefix: string;

  // Payments
  razorpayEnabled: boolean;
  razorpayTestMode: boolean;
  razorpayWebhookStatus: "ACTIVE" | "PENDING" | "FAILED";
  codEnabled: boolean;
  codMinOrder: number;
  bankTransferEnabled: boolean;
  upiEnabled: boolean;

  // Shipping
  freeShippingLimit: number;
  defaultShippingCharge: number;
  deliveryTime: string;
  shippingZones: Array<{ id: string; name: string; charge: number; deliveryTime: string }>;

  // Taxes
  gstPercentage: number;
  taxInclusive: boolean;
  taxExclusive: boolean;
  invoiceFooterText: string;

  // Email
  smtpHost: string;
  smtpPort: number;
  senderName: string;
  senderEmail: string;
  smtpStatus: "CONNECTED" | "DISCONNECTED";

  // Notifications
  orderNotifications: boolean;
  lowStockAlerts: boolean;
  paymentAlerts: boolean;
  reviewAlerts: boolean;

  // Users & Roles
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: "SUPER_ADMIN" | "MERCHANT_ADMIN" | "MODERATOR";
    status: "ACTIVE" | "INVITED";
    lastActive: string;
  }>;

  // SEO
  metaTitle: string;
  metaDescription: string;
  googleVerification: string;
  facebookPixelId: string;
  googleAnalyticsId: string;

  // Security
  adminPasswordLastChanged: string;
  twoFactorEnabled: boolean;
  activeSessions: Array<{ id: string; device: string; ip: string; location: string; lastActive: string }>;
  loginHistory: Array<{ id: string; timestamp: string; ip: string; device: string; status: "SUCCESS" | "FAILED" }>;

  // Appearance
  primaryColor: string;
  accentColor: string;
  themeMode: "Luxury Light" | "Dark" | "System";

  // Backup
  lastBackupDate: string;
  backupFrequency: "Daily" | "Weekly" | "Monthly";
  autoBackupEnabled: boolean;

  // API Keys
  apiKeys: Array<{
    id: string;
    serviceName: string;
    maskedKey: string;
    fullKey: string;
    status: "ACTIVE" | "EXPIRED";
  }>;

  // About
  version: string;
  buildNumber: string;
  licenseType: string;
  supportContact: string;
}

export const initialStoreSettings: StoreSettingsData = {
  // General
  storeName: "Ramanayam Sacred Living",
  storeLogo: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=150&auto=format&fit=crop&q=80",
  favicon: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=50&auto=format&fit=crop&q=80",
  businessDescription: "Enterprise temple e-commerce platform offering handcrafted brass diyas, sacred rudraksha malas, puja thalis, sandalwood dhoop, and mandir decor.",
  contactEmail: "contact@ramanayam.com",
  supportPhone: "+91 98765 43210",
  timezone: "Asia/Kolkata (IST +5:30)",
  currency: "INR (₹)",
  language: "English (India)",

  // Store Information
  businessName: "Ramanayam Temple E-Commerce Pvt. Ltd.",
  gstNumber: "07AAAAA0000A1Z5",
  panNumber: "ABCDE1234F",
  businessAddress: "108 Sacred Veda Marg, Heritage District, Ayodhya, UP - 224123",
  invoicePrefix: "INV-RAM-",
  orderPrefix: "ORD-RAM-",

  // Payments
  razorpayEnabled: true,
  razorpayTestMode: false,
  razorpayWebhookStatus: "ACTIVE",
  codEnabled: true,
  codMinOrder: 499,
  bankTransferEnabled: true,
  upiEnabled: true,

  // Shipping
  freeShippingLimit: 799,
  defaultShippingCharge: 99,
  deliveryTime: "3-5 Business Days",
  shippingZones: [
    { id: "z1", name: "Metro Cities (Del/Bom/Blr)", charge: 49, deliveryTime: "2-3 Days" },
    { id: "z2", name: "Rest of India (Standard)", charge: 99, deliveryTime: "4-6 Days" },
    { id: "z3", name: "Express Temple Express", charge: 199, deliveryTime: "1-2 Days" },
  ],

  // Taxes
  gstPercentage: 18,
  taxInclusive: true,
  taxExclusive: false,
  invoiceFooterText: "Thank you for worshipping with Ramanayam. All products certified authentic.",

  // Email
  smtpHost: "smtp.resend.com",
  smtpPort: 587,
  senderName: "Ramanayam Official",
  senderEmail: "notifications@ramanayam.com",
  smtpStatus: "CONNECTED",

  // Notifications
  orderNotifications: true,
  lowStockAlerts: true,
  paymentAlerts: true,
  reviewAlerts: true,

  // Users & Roles
  users: [
    { id: "u1", name: "Pandit Rajesh Sharma", email: "rajesh.admin@ramanayam.com", role: "SUPER_ADMIN", status: "ACTIVE", lastActive: "Just now" },
    { id: "u2", name: "Meera Agarwal", email: "meera.mktg@ramanayam.com", role: "MERCHANT_ADMIN", status: "ACTIVE", lastActive: "2 hours ago" },
    { id: "u3", name: "Ananya Iyer", email: "ananya.mod@ramanayam.com", role: "MODERATOR", status: "ACTIVE", lastActive: "Yesterday" },
  ],

  // SEO
  metaTitle: "Ramanayam | Pure Sacred Temple Products & Puja Essentials",
  metaDescription: "Shop authentic brass diyas, 5 mukhi rudraksha malas, puja thalis, Mysore sandalwood dhoop, and carved mandirs online with fast express delivery.",
  googleVerification: "google-site-verification-ram-894210",
  facebookPixelId: "FB-PIXEL-RAM-9942",
  googleAnalyticsId: "G-RAMANAYAM99",

  // Security
  adminPasswordLastChanged: "15 days ago",
  twoFactorEnabled: true,
  activeSessions: [
    { id: "s1", device: "Chrome on macOS (Current)", ip: "103.21.124.8", location: "New Delhi, IN", lastActive: "Active now" },
    { id: "s2", device: "Safari on iPhone 15 Pro", ip: "49.36.88.12", location: "Ayodhya, IN", lastActive: "3 hours ago" },
  ],
  loginHistory: [
    { id: "l1", timestamp: "03 Aug 2026, 10:15 AM", ip: "103.21.124.8", device: "Chrome / macOS", status: "SUCCESS" },
    { id: "l2", timestamp: "02 Aug 2026, 06:40 PM", ip: "49.36.88.12", device: "Safari / iOS", status: "SUCCESS" },
    { id: "l3", timestamp: "01 Aug 2026, 11:20 AM", ip: "182.74.90.1", device: "Firefox / Windows", status: "FAILED" },
  ],

  // Appearance
  primaryColor: "#F57C00", // Saffron Accent
  accentColor: "#701A75", // Deep Maroon Accent
  themeMode: "Luxury Light",

  // Backup
  lastBackupDate: "Today, 03:00 AM",
  backupFrequency: "Daily",
  autoBackupEnabled: true,

  // API Keys
  apiKeys: [
    { id: "k1", serviceName: "Cloudinary Image CDN", maskedKey: "cld_live_994821********************", fullKey: "cld_live_994821739104829104829104", status: "ACTIVE" },
    { id: "k2", serviceName: "Razorpay Payment Gateway", maskedKey: "rzp_live_849201********************", fullKey: "rzp_live_849201849201849201849201", status: "ACTIVE" },
    { id: "k3", serviceName: "Google Maps Geocoding API", maskedKey: "AIzaSyA89421********************", fullKey: "AIzaSyA89421049281948201948201948", status: "ACTIVE" },
    { id: "k4", serviceName: "Google Analytics v4 (GA4)", maskedKey: "G-RAMANAYAM99********************", fullKey: "G-RAMANAYAM9948201948201948201948", status: "ACTIVE" },
  ],

  // About
  version: "v4.2.0 Enterprise",
  buildNumber: "Build 2026.08.03-RELEASE",
  licenseType: "Commercial Enterprise License",
  supportContact: "support@ramanayam.com",
};
