export interface KPIItem {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  tooltip: string;
  category: "revenue" | "orders" | "customers" | "operations";
}

export interface TimeSeriesDataPoint {
  date: string;
  label: string;
  revenue: number;
  orders: number;
  netProfit: number;
  grossSales: number;
}

export interface CategoryBreakdown {
  name: string;
  revenue: number;
  orders: number;
  productsCount: number;
  growth: number;
  color: string;
}

export interface ProductBreakdown {
  id: string;
  name: string;
  sku: string;
  image: string;
  category: string;
  unitsSold: number;
  revenue: number;
  rating: number;
  views: number;
  stock: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export interface FestivalBreakdown {
  id: string;
  name: string;
  slug: string;
  dateRange: string;
  revenue: number;
  orders: number;
  growth: number;
  topProduct: string;
  color: string;
  bannerPattern: string;
}

export interface PaymentBreakdown {
  method: string;
  percentage: number;
  revenue: number;
  transactions: number;
  color: string;
}

export interface CustomerAnalyticsData {
  newCustomers: number;
  newCustomersChange: number;
  returningCustomers: number;
  returningCustomersChange: number;
  repeatPurchaseRate: number;
  topCustomers: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    ordersCount: number;
    totalSpent: number;
    favoriteCategory: string;
    lastOrderDate: string;
  }>;
}

export interface OrderStatusBreakdown {
  status: "Pending" | "Processing" | "Delivered" | "Cancelled" | "Returned" | "Refunded";
  count: number;
  value: number;
  color: string;
}

export interface RealtimeActivityItem {
  id: string;
  type: "order" | "payment" | "inventory" | "customer";
  title: string;
  description: string;
  timestamp: string;
  badge?: string;
  amount?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  type: "Sales" | "Inventory" | "Customer" | "Tax" | "GST" | "Product";
  lastGenerated: string;
  fileSize: string;
  format: "PDF" | "XLSX" | "CSV";
}

export const mockSummaryKPIs: KPIItem[] = [
  {
    id: "today_revenue",
    title: "Today's Revenue",
    value: "₹ 1,42,850",
    change: +18.4,
    changeType: "increase",
    period: "vs yesterday",
    tooltip: "Total revenue recorded today since midnight",
    category: "revenue",
  },
  {
    id: "monthly_revenue",
    title: "Monthly Revenue",
    value: "₹ 34,80,200",
    change: +12.6,
    changeType: "increase",
    period: "vs last month",
    tooltip: "Gross revenue generated in the current calendar month",
    category: "revenue",
  },
  {
    id: "yearly_revenue",
    title: "Yearly Revenue",
    value: "₹ 3.82 Cr",
    change: +24.8,
    changeType: "increase",
    period: "vs last fiscal year",
    tooltip: "Total sales revenue collected YTD",
    category: "revenue",
  },
  {
    id: "total_orders",
    title: "Orders",
    value: "1,842",
    change: +9.2,
    changeType: "increase",
    period: "vs previous period",
    tooltip: "Total orders placed across website & app",
    category: "orders",
  },
  {
    id: "aov",
    title: "Average Order Value",
    value: "₹ 2,450",
    change: +4.1,
    changeType: "increase",
    period: "vs previous period",
    tooltip: "Mean revenue per completed transaction",
    category: "orders",
  },
  {
    id: "conversion_rate",
    title: "Conversion Rate",
    value: "3.68%",
    change: +0.45,
    changeType: "increase",
    period: "vs previous 30 days",
    tooltip: "Percentage of total visitors completing a purchase",
    category: "customers",
  },
  {
    id: "returning_customers",
    title: "Returning Customers",
    value: "1,240",
    change: +15.3,
    changeType: "increase",
    period: "vs last month",
    tooltip: "Customers with 2+ completed purchases",
    category: "customers",
  },
  {
    id: "new_customers",
    title: "New Customers",
    value: "860",
    change: +8.9,
    changeType: "increase",
    period: "vs last month",
    tooltip: "First-time registered buyers",
    category: "customers",
  },
  {
    id: "net_profit",
    title: "Net Profit (Est.)",
    value: "₹ 11,48,500",
    change: +14.2,
    changeType: "increase",
    period: "33% profit margin",
    tooltip: "Estimated net earnings after COGS & shipping",
    category: "revenue",
  },
  {
    id: "gross_sales",
    title: "Gross Sales",
    value: "₹ 38,90,400",
    change: +11.8,
    changeType: "increase",
    period: "before refunds & discounts",
    tooltip: "Raw total sales volume prior to deductions",
    category: "revenue",
  },
  {
    id: "refunds",
    title: "Refunds",
    value: "₹ 62,400",
    change: -5.2,
    changeType: "decrease",
    period: "1.6% of gross sales",
    tooltip: "Total refund volume issued",
    category: "operations",
  },
  {
    id: "cancelled_orders",
    title: "Cancelled Orders",
    value: "48",
    change: -12.0,
    changeType: "decrease",
    period: "2.6% cancel rate",
    tooltip: "Orders cancelled prior to dispatch",
    category: "operations",
  },
];

export const mockTimeSeriesData: Record<"daily" | "weekly" | "monthly" | "yearly", TimeSeriesDataPoint[]> = {
  daily: [
    { date: "06:00", label: "6 AM", revenue: 14200, orders: 8, netProfit: 4680, grossSales: 15400 },
    { date: "09:00", label: "9 AM", revenue: 38500, orders: 22, netProfit: 12700, grossSales: 41200 },
    { date: "12:00", label: "12 PM", revenue: 64200, orders: 41, netProfit: 21180, grossSales: 69500 },
    { date: "15:00", label: "3 PM", revenue: 89100, orders: 58, netProfit: 29400, grossSales: 96400 },
    { date: "18:00", label: "6 PM", revenue: 124500, orders: 84, netProfit: 41000, grossSales: 135000 },
    { date: "21:00", label: "9 PM", revenue: 142850, orders: 98, netProfit: 47140, grossSales: 156000 },
  ],
  weekly: [
    { date: "Mon", label: "Monday", revenue: 320000, orders: 180, netProfit: 105600, grossSales: 345000 },
    { date: "Tue", label: "Tuesday", revenue: 410000, orders: 225, netProfit: 135300, grossSales: 440000 },
    { date: "Wed", label: "Wednesday", revenue: 380000, orders: 205, netProfit: 125400, grossSales: 410000 },
    { date: "Thu", label: "Thursday", revenue: 490000, orders: 260, netProfit: 161700, grossSales: 525000 },
    { date: "Fri", label: "Friday", revenue: 580000, orders: 310, netProfit: 191400, grossSales: 620000 },
    { date: "Sat", label: "Saturday", revenue: 720000, orders: 390, netProfit: 237600, grossSales: 780000 },
    { date: "Sun", label: "Sunday", revenue: 580200, orders: 272, netProfit: 191460, grossSales: 630000 },
  ],
  monthly: [
    { date: "Week 1", label: "Week 1", revenue: 780000, orders: 410, netProfit: 257400, grossSales: 840000 },
    { date: "Week 2", label: "Week 2", revenue: 890000, orders: 465, netProfit: 293700, grossSales: 960000 },
    { date: "Week 3", label: "Week 3", revenue: 1050000, orders: 540, netProfit: 346500, grossSales: 1140000 },
    { date: "Week 4", label: "Week 4", revenue: 760200, orders: 427, netProfit: 250860, grossSales: 810400 },
  ],
  yearly: [
    { date: "Jan", label: "Jan", revenue: 2400000, orders: 1200, netProfit: 792000, grossSales: 2600000 },
    { date: "Feb", label: "Feb", revenue: 2100000, orders: 1050, netProfit: 693000, grossSales: 2300000 },
    { date: "Mar (Ram Navami)", label: "Mar", revenue: 3800000, orders: 1950, netProfit: 1254000, grossSales: 4100000 },
    { date: "Apr", label: "Apr", revenue: 2600000, orders: 1300, netProfit: 858000, grossSales: 2800000 },
    { date: "May", label: "May", revenue: 2300000, orders: 1150, netProfit: 759000, grossSales: 2500000 },
    { date: "Jun", label: "Jun", revenue: 2800000, orders: 1400, netProfit: 924000, grossSales: 3000000 },
    { date: "Jul", label: "Jul", revenue: 3100000, orders: 1550, netProfit: 1023000, grossSales: 3300000 },
    { date: "Aug (Janmashtami)", label: "Aug", revenue: 4900000, orders: 2400, netProfit: 1617000, grossSales: 5300000 },
    { date: "Sep (Navratri)", label: "Sep", revenue: 4200000, orders: 2100, netProfit: 1386000, grossSales: 4500000 },
    { date: "Oct (Diwali)", label: "Oct", revenue: 6400000, orders: 3200, netProfit: 2112000, grossSales: 6900000 },
    { date: "Nov", label: "Nov", revenue: 3200000, orders: 1600, netProfit: 1056000, grossSales: 3500000 },
    { date: "Dec", label: "Dec", revenue: 2800000, orders: 1400, netProfit: 924000, grossSales: 3000000 },
  ],
};

export const mockCategories: CategoryBreakdown[] = [
  { name: "Brass Diyas & Lamps", revenue: 1140000, orders: 580, productsCount: 42, growth: 22.4, color: "#F57C00" },
  { name: "Puja Utensils & Sets", revenue: 712000, orders: 390, productsCount: 38, growth: 16.8, color: "#701A75" },
  { name: "Sacred Food & Prasadam", revenue: 426000, orders: 410, productsCount: 24, growth: 31.2, color: "#D4AF37" },
  { name: "Temple Decor & Idols", revenue: 341000, orders: 195, productsCount: 56, growth: 12.1, color: "#9A3412" },
  { name: "Mala & Rudraksha Beads", revenue: 226000, orders: 182, productsCount: 31, growth: 8.5, color: "#15803D" },
  { name: "Incense & Pure Dhoop", revenue: 195200, orders: 320, productsCount: 28, growth: 19.4, color: "#0284C7" },
];

export const mockTopProducts: ProductBreakdown[] = [
  {
    id: "prod_01",
    name: "Handcrafted Antique Brass Peacock Diya (24-inch)",
    sku: "RAM-BRS-019",
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=150&auto=format&fit=crop&q=80",
    category: "Brass Diyas & Lamps",
    unitsSold: 342,
    revenue: 444600,
    rating: 4.9,
    views: 4520,
    stock: 28,
    status: "IN_STOCK",
  },
  {
    id: "prod_02",
    name: "Original 5 Mukhi Nepali Rudraksha Mala (108 Beads)",
    sku: "RAM-MAL-004",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=150&auto=format&fit=crop&q=80",
    category: "Mala & Rudraksha Beads",
    unitsSold: 285,
    revenue: 356250,
    rating: 4.8,
    views: 3890,
    stock: 14,
    status: "LOW_STOCK",
  },
  {
    id: "prod_03",
    name: "Pure Brass Ashtalakshmi Puja Thali Set with Bell",
    sku: "RAM-UTN-082",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=150&auto=format&fit=crop&q=80",
    category: "Puja Utensils & Sets",
    unitsSold: 240,
    revenue: 312000,
    rating: 4.7,
    views: 3120,
    stock: 45,
    status: "IN_STOCK",
  },
  {
    id: "prod_04",
    name: "Organic Mysore Sandalwood Dhoop Cones (Pack of 100)",
    sku: "RAM-INC-012",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=150&auto=format&fit=crop&q=80",
    category: "Incense & Pure Dhoop",
    unitsSold: 580,
    revenue: 203000,
    rating: 4.9,
    views: 6890,
    stock: 120,
    status: "IN_STOCK",
  },
  {
    id: "prod_05",
    name: "Pure Desi Cow Ghee Diya Wicks (Box of 200)",
    sku: "RAM-FOOD-008",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=150&auto=format&fit=crop&q=80",
    category: "Sacred Food & Prasadam",
    unitsSold: 710,
    revenue: 198800,
    rating: 4.8,
    views: 8200,
    stock: 0,
    status: "OUT_OF_STOCK",
  },
  {
    id: "prod_06",
    name: "Carved Teakwood Temple Mandir with Brass Bells",
    sku: "RAM-DEC-091",
    image: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=150&auto=format&fit=crop&q=80",
    category: "Temple Decor & Idols",
    unitsSold: 42,
    revenue: 189000,
    rating: 4.95,
    views: 2940,
    stock: 5,
    status: "LOW_STOCK",
  },
];

export const mockFestivals: FestivalBreakdown[] = [
  {
    id: "fest_diwali",
    name: "Diwali Mahotsav",
    slug: "diwali",
    dateRange: "Oct 15 - Nov 05",
    revenue: 6400000,
    orders: 3200,
    growth: 42.5,
    topProduct: "Brass Peacock Diya 24\"",
    color: "#F57C00",
    bannerPattern: "gradient-diwali",
  },
  {
    id: "fest_janmashtami",
    name: "Shri Krishna Janmashtami",
    slug: "janmashtami",
    dateRange: "Aug 10 - Aug 25",
    revenue: 4900000,
    orders: 2400,
    growth: 36.2,
    topProduct: "Laddu Gopal Brass Murti & Jhula",
    color: "#701A75",
    bannerPattern: "gradient-krishna",
  },
  {
    id: "fest_navratri",
    name: "Sharad Navratri",
    slug: "navratri",
    dateRange: "Sep 20 - Oct 02",
    revenue: 4200000,
    orders: 2100,
    growth: 28.9,
    topProduct: "Durga Mata Chowki & Akhand Diya",
    color: "#D97706",
    bannerPattern: "gradient-navratri",
  },
  {
    id: "fest_ramnavami",
    name: "Ram Navami",
    slug: "ram-navami",
    dateRange: "Mar 20 - Mar 30",
    revenue: 3800000,
    orders: 1950,
    growth: 31.0,
    topProduct: "Ram Darbar Brass Idol Set",
    color: "#B45309",
    bannerPattern: "gradient-ram",
  },
  {
    id: "fest_shivratri",
    name: "Maha Shivratri",
    slug: "shivratri",
    dateRange: "Feb 18 - Mar 02",
    revenue: 2900000,
    orders: 1450,
    growth: 24.1,
    topProduct: "Narmada Shivling with Brass Yoni Base",
    color: "#4C1D95",
    bannerPattern: "gradient-shiva",
  },
  {
    id: "fest_raksha",
    name: "Raksha Bandhan",
    slug: "raksha-bandhan",
    dateRange: "Aug 01 - Aug 12",
    revenue: 2100000,
    orders: 1680,
    growth: 19.5,
    topProduct: "Silver Coated Divine Rakhi Thali",
    color: "#BE185D",
    bannerPattern: "gradient-rakhi",
  },
];

export const mockPaymentMethods: PaymentBreakdown[] = [
  { method: "UPI / QR Code", percentage: 54, revenue: 1879300, transactions: 994, color: "#10B981" },
  { method: "Credit / Debit Card", percentage: 22, revenue: 765600, transactions: 405, color: "#3B82F6" },
  { method: "Net Banking", percentage: 12, revenue: 417600, transactions: 221, color: "#8B5CF6" },
  { method: "Cash on Delivery (COD)", percentage: 8, revenue: 278400, transactions: 147, color: "#F57C00" },
  { method: "Wallets (Paytm/Amazon)", percentage: 4, revenue: 139300, transactions: 75, color: "#EC4899" },
];

export const mockCustomerAnalytics: CustomerAnalyticsData = {
  newCustomers: 860,
  newCustomersChange: 12.4,
  returningCustomers: 1240,
  returningCustomersChange: 18.2,
  repeatPurchaseRate: 59.0,
  topCustomers: [
    {
      id: "cust_1",
      name: "Pandit Rajesh Sharma",
      email: "rajesh.sharma@templeorg.in",
      ordersCount: 24,
      totalSpent: 184500,
      favoriteCategory: "Brass Diyas & Lamps",
      lastOrderDate: "2 hours ago",
    },
    {
      id: "cust_2",
      name: "Sunita Deshmukh",
      email: "sunita.d@gmail.com",
      ordersCount: 18,
      totalSpent: 142000,
      favoriteCategory: "Puja Utensils & Sets",
      lastOrderDate: "Yesterday",
    },
    {
      id: "cust_3",
      name: "Vikramaditya Trust",
      email: "purchases@vikramtrust.org",
      ordersCount: 12,
      totalSpent: 128900,
      favoriteCategory: "Temple Decor & Idols",
      lastOrderDate: "3 days ago",
    },
    {
      id: "cust_4",
      name: "Ananya Iyer",
      email: "ananya.iyer@yahoo.com",
      ordersCount: 15,
      totalSpent: 96400,
      favoriteCategory: "Mala & Rudraksha Beads",
      lastOrderDate: "4 days ago",
    },
    {
      id: "cust_5",
      name: "Dr. Mahesh Kulkarni",
      email: "mkulkarni@aiims.edu",
      ordersCount: 11,
      totalSpent: 84200,
      favoriteCategory: "Incense & Pure Dhoop",
      lastOrderDate: "1 week ago",
    },
  ],
};

export const mockOrderStatuses: OrderStatusBreakdown[] = [
  { status: "Delivered", count: 1340, value: 2546000, color: "#16A34A" },
  { status: "Processing", count: 280, value: 532000, color: "#2563EB" },
  { status: "Pending", count: 124, value: 235600, color: "#D97706" },
  { status: "Returned", count: 32, value: 60800, color: "#DC2626" },
  { status: "Refunded", count: 18, value: 34200, color: "#9333EA" },
  { status: "Cancelled", count: 48, value: 91200, color: "#6B7280" },
];

export const mockRealtimeActivities: RealtimeActivityItem[] = [
  {
    id: "act_1",
    type: "order",
    title: "New Order #RAM-8942",
    description: "Pandit Rajesh Sharma ordered Peacock Diya (24\")",
    timestamp: "Just now",
    badge: "New Order",
    amount: "₹ 12,999",
  },
  {
    id: "act_2",
    type: "payment",
    title: "Payment Received",
    description: "UPI Payment verified via Razorpay for Order #RAM-8941",
    timestamp: "3 mins ago",
    badge: "UPI Success",
    amount: "₹ 4,250",
  },
  {
    id: "act_3",
    type: "inventory",
    title: "Low Stock Alert",
    description: "Original 5 Mukhi Nepali Rudraksha Mala (14 items left)",
    timestamp: "12 mins ago",
    badge: "Low Stock",
  },
  {
    id: "act_4",
    type: "customer",
    title: "New Devotee Registered",
    description: "Meera Agarwal registered from Jaipur, Rajasthan",
    timestamp: "25 mins ago",
    badge: "Signup",
  },
  {
    id: "act_5",
    type: "order",
    title: "Order Delivered",
    description: "Order #RAM-8930 delivered successfully to Bengaluru",
    timestamp: "42 mins ago",
    badge: "Delivered",
    amount: "₹ 8,400",
  },
];

export const mockReportsList: ReportItem[] = [
  {
    id: "rep_sales",
    title: "Comprehensive Sales Report",
    description: "Detailed revenue breakdown by day, category, payment, and SKU.",
    type: "Sales",
    lastGenerated: "Today, 06:00 AM",
    fileSize: "4.2 MB",
    format: "PDF",
  },
  {
    id: "rep_inv",
    title: "Inventory & Stock Health Report",
    description: "Current stock counts, reorder points, low stock alerts & turnover rates.",
    type: "Inventory",
    lastGenerated: "Yesterday, 11:30 PM",
    fileSize: "2.8 MB",
    format: "XLSX",
  },
  {
    id: "rep_cust",
    title: "Customer Insights & Cohort Report",
    description: "Acquisition channels, repeat purchase rates, LTV, and VIP customers.",
    type: "Customer",
    lastGenerated: "02 Aug 2026",
    fileSize: "3.1 MB",
    format: "PDF",
  },
  {
    id: "rep_gst",
    title: "GST Return & Tax Summary (GSTR-1)",
    description: "B2B and B2C invoice level tax details ready for CA/GST filing.",
    type: "GST",
    lastGenerated: "01 Aug 2026",
    fileSize: "5.6 MB",
    format: "XLSX",
  },
  {
    id: "rep_tax",
    title: "TDS & Financial Audit Statement",
    description: "Quarterly tax compliance statement and payment gateway TDS logs.",
    type: "Tax",
    lastGenerated: "28 Jul 2026",
    fileSize: "1.9 MB",
    format: "PDF",
  },
  {
    id: "rep_prod",
    title: "Product Performance & Review Report",
    description: "Views, conversion rates, review ratings, and return metrics per item.",
    type: "Product",
    lastGenerated: "25 Jul 2026",
    fileSize: "3.4 MB",
    format: "CSV",
  },
];
