export type VendorStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "REJECTED" | "INACTIVE";

export interface VendorProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  salesCount: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export interface VendorOrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  paymentStatus: "PAID" | "PENDING" | "REFUNDED";
  orderStatus: "DELIVERED" | "SHIPPED" | "PROCESSING" | "PENDING" | "CANCELLED";
  createdAt: string;
}

export interface VendorSalesPoint {
  month: string;
  revenue: number;
  orders: number;
  productsSold: number;
}

export interface AdminVendorDetail {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  logo: string;
  status: VendorStatus;
  joinedDate: string;
  isPrimary?: boolean;

  // Tax & Business Info
  gstNumber: string;
  pan: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;

  // Statistics
  productsCount: number;
  activeProductsCount: number;
  ordersCount: number;
  totalRevenue: number;
  avgOrderValue: number;
  customerRating: number;

  // Related Sub-datasets
  products: VendorProductItem[];
  orders: VendorOrderItem[];
  salesHistory: VendorSalesPoint[];
}

export const mockVendorsList: AdminVendorDetail[] = [
  {
    id: "vend_001",
    name: "Acharya Ramanathan",
    businessName: "Ramanayam Store",
    businessType: "Primary Flagship Seller",
    email: "store@ramanayam.in",
    phone: "+91 98765 00108",
    logo: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=120&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    joinedDate: "2024-01-01",
    isPrimary: true,

    gstNumber: "09AAACR1080P1Z4",
    pan: "AAACR1080P",
    businessAddress: "108 Temple Road, Near Shri Ram Mandir Premises",
    city: "Ayodhya",
    state: "Uttar Pradesh",
    pincode: "224123",

    productsCount: 48,
    activeProductsCount: 45,
    ordersCount: 1420,
    totalRevenue: 2840000,
    avgOrderValue: 2000,
    customerRating: 4.9,

    products: [
      {
        id: "prod_01",
        name: "Handcrafted Antique Brass Peacock Diya (24-inch)",
        sku: "RAM-BRS-019",
        category: "Brass Diyas & Lamps",
        price: 12999,
        stock: 28,
        salesCount: 342,
        status: "IN_STOCK",
      },
      {
        id: "prod_03",
        name: "Pure Brass Ashtalakshmi Puja Thali Set with Bell",
        sku: "RAM-UTN-082",
        category: "Puja Utensils & Sets",
        price: 2899,
        stock: 45,
        salesCount: 240,
        status: "IN_STOCK",
      },
      {
        id: "prod_05",
        name: "Pure Desi Cow Ghee Diya Wicks (Box of 200)",
        sku: "RAM-FOOD-008",
        category: "Sacred Food & Prasadam",
        price: 499,
        stock: 0,
        salesCount: 710,
        status: "OUT_OF_STOCK",
      },
      {
        id: "prod_06",
        name: "Carved Teakwood Temple Mandir with Brass Bells",
        sku: "RAM-DEC-091",
        category: "Temple Decor & Idols",
        price: 18500,
        stock: 5,
        salesCount: 42,
        status: "LOW_STOCK",
      },
    ],
    orders: [
      {
        id: "ord_101",
        orderNumber: "ORD-94821",
        customerName: "Pandit Rajesh Sharma",
        amount: 12999,
        paymentStatus: "PAID",
        orderStatus: "DELIVERED",
        createdAt: "2026-08-01",
      },
      {
        id: "ord_102",
        orderNumber: "ORD-94710",
        customerName: "Sunita Deshmukh",
        amount: 3499,
        paymentStatus: "PAID",
        orderStatus: "SHIPPED",
        createdAt: "2026-07-25",
      },
      {
        id: "ord_103",
        orderNumber: "ORD-94612",
        customerName: "Meera Agarwal",
        amount: 699,
        paymentStatus: "PAID",
        orderStatus: "DELIVERED",
        createdAt: "2026-07-20",
      },
    ],
    salesHistory: [
      { month: "Jan", revenue: 380000, orders: 190, productsSold: 320 },
      { month: "Feb", revenue: 420000, orders: 210, productsSold: 350 },
      { month: "Mar", revenue: 580000, orders: 290, productsSold: 480 },
      { month: "Apr", revenue: 460000, orders: 230, productsSold: 390 },
      { month: "May", revenue: 490000, orders: 245, productsSold: 410 },
      { month: "Jun", revenue: 510000, orders: 255, productsSold: 430 },
    ],
  },
  {
    id: "vend_002",
    name: "Pandit Rajesh Sharma",
    businessName: "Varanasi Brass Crafts Guild",
    businessType: "Artisan Cooperative",
    email: "rajesh.sharma@brassguild.in",
    phone: "+91 98765 11002",
    logo: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=120&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    joinedDate: "2025-03-15",
    isPrimary: false,

    gstNumber: "09BBBBS2020B1Z8",
    pan: "BBBBS2020B",
    businessAddress: "42 Ghat Road, Kashi Vishwanath Corridor",
    city: "Varanasi",
    state: "Uttar Pradesh",
    pincode: "221001",

    productsCount: 24,
    activeProductsCount: 22,
    ordersCount: 680,
    totalRevenue: 1360000,
    avgOrderValue: 2000,
    customerRating: 4.8,

    products: [
      {
        id: "prod_02",
        name: "Original 5 Mukhi Nepali Rudraksha Mala (108 Beads)",
        sku: "RAM-MAL-004",
        category: "Mala & Rudraksha Beads",
        price: 3499,
        stock: 14,
        salesCount: 285,
        status: "LOW_STOCK",
      },
    ],
    orders: [
      {
        id: "ord_201",
        orderNumber: "ORD-94500",
        customerName: "Dr. Mahesh Kulkarni",
        amount: 4999,
        paymentStatus: "PAID",
        orderStatus: "PROCESSING",
        createdAt: "2026-07-18",
      },
    ],
    salesHistory: [
      { month: "Jan", revenue: 180000, orders: 90, productsSold: 140 },
      { month: "Feb", revenue: 210000, orders: 105, productsSold: 165 },
      { month: "Mar", revenue: 310000, orders: 155, productsSold: 240 },
      { month: "Apr", revenue: 220000, orders: 110, productsSold: 175 },
      { month: "May", revenue: 240000, orders: 120, productsSold: 190 },
      { month: "Jun", revenue: 200000, orders: 100, productsSold: 160 },
    ],
  },
  {
    id: "vend_003",
    name: "Vikram Sengupta",
    businessName: "Bengal Sacred Clay & Murti Emporium",
    businessType: "Registered Enterprise",
    email: "vikram@bengalsacredcrafts.org",
    phone: "+91 98765 22003",
    logo: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=120&auto=format&fit=crop&q=80",
    status: "PENDING",
    joinedDate: "2026-07-28",
    isPrimary: false,

    gstNumber: "19CCCCS3030C1Z2",
    pan: "CCCCS3030C",
    businessAddress: "12 Kumartuli Artisan Lane",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700005",

    productsCount: 12,
    activeProductsCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    customerRating: 0,

    products: [],
    orders: [],
    salesHistory: [],
  },
  {
    id: "vend_004",
    name: "Meera Agarwal",
    businessName: "Jaipur Organic Dhoop & Sugandh",
    businessType: "Artisan Enterprise",
    email: "meera.agarwal@jaipurdhoop.in",
    phone: "+91 98765 33004",
    logo: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=120&auto=format&fit=crop&q=80",
    status: "SUSPENDED",
    joinedDate: "2025-06-10",
    isPrimary: false,

    gstNumber: "08DDDDM4040D1Z6",
    pan: "DDDDM4040D",
    businessAddress: "88 Johari Bazaar Road",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302003",

    productsCount: 16,
    activeProductsCount: 0,
    ordersCount: 210,
    totalRevenue: 420000,
    avgOrderValue: 2000,
    customerRating: 3.8,

    products: [
      {
        id: "prod_04",
        name: "Organic Mysore Sandalwood Dhoop Cones (Pack of 100)",
        sku: "RAM-INC-012",
        category: "Incense & Pure Dhoop",
        price: 699,
        stock: 120,
        salesCount: 580,
        status: "IN_STOCK",
      },
    ],
    orders: [],
    salesHistory: [],
  },
  {
    id: "vend_005",
    name: "Sunita Deshmukh",
    businessName: "Maharashtra Temple Silverworks",
    businessType: "Sole Proprietor",
    email: "sunita@maharashtrasilver.com",
    phone: "+91 98765 44005",
    logo: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=120&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    joinedDate: "2025-09-01",
    isPrimary: false,

    gstNumber: "27EEEEP5050E1Z1",
    pan: "EEEEP5050E",
    businessAddress: "14 Sadashiv Peth",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411030",

    productsCount: 18,
    activeProductsCount: 16,
    ordersCount: 340,
    totalRevenue: 680000,
    avgOrderValue: 2000,
    customerRating: 4.7,

    products: [],
    orders: [],
    salesHistory: [],
  },
  {
    id: "vend_006",
    name: "Ananya Iyer",
    businessName: "Mysore Teakwood Mandir Artisans",
    businessType: "Artisan Co-op",
    email: "ananya.iyer@mysoremandir.org",
    phone: "+91 98765 55006",
    logo: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=120&auto=format&fit=crop&q=80",
    status: "REJECTED",
    joinedDate: "2026-06-15",
    isPrimary: false,

    gstNumber: "29FFFFA6060F1Z9",
    pan: "FFFFA6060F",
    businessAddress: "55 Palace Road",
    city: "Mysuru",
    state: "Karnataka",
    pincode: "570001",

    productsCount: 0,
    activeProductsCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    customerRating: 0,

    products: [],
    orders: [],
    salesHistory: [],
  },
];
