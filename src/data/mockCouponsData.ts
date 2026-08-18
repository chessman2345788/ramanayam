export type CouponStatus = "ACTIVE" | "SCHEDULED" | "EXPIRED" | "DISABLED" | "DRAFT";
export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "FREE_SHIPPING";
export type ApplicabilityType = "ENTIRE_STORE" | "SPECIFIC_PRODUCTS" | "SPECIFIC_CATEGORIES" | "SPECIFIC_COLLECTIONS" | "SPECIFIC_CUSTOMERS";

export interface CouponUsageRecord {
  id: string;
  orderId: string;
  couponCode: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  discountAmount: number;
  orderAmount: number;
  usedAt: string;
}

export interface FestivalTemplate {
  id: string;
  festivalName: string;
  recommendedCode: string;
  campaignName: string;
  description: string;
  discountType: DiscountType;
  value: number;
  minOrderValue: number;
  color: string;
}

export interface CouponTimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
}

export interface AdminCouponDetail {
  id: string;
  code: string;
  campaignName: string;
  description: string;
  discountType: DiscountType;
  value: number;
  maxDiscount?: number;
  minOrderValue: number;
  
  usageCount: number;
  usageLimit: number;
  perCustomerLimit: number;
  usedTodayCount: number;
  revenueGenerated: number;
  totalDiscountAmount: number;

  status: CouponStatus;
  applicability: ApplicabilityType;
  
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  timezone?: string;
  createdBy: string;

  applicableCategories: string[];
  applicableProducts: string[];
  applicableCollections?: string[];
  applicableCustomers?: string[];
  excludedProducts?: string[];

  timeline: CouponTimelineEvent[];
}

export const mockFestivalTemplates: FestivalTemplate[] = [
  {
    id: "tmpl_diwali",
    festivalName: "Diwali Mahotsav",
    recommendedCode: "DIWALI2026",
    campaignName: "Diwali Mahotsav Festival Sale",
    description: "30% OFF on Brass Diyas & Mandir Decor for Diwali",
    discountType: "PERCENTAGE",
    value: 30,
    minOrderValue: 1999,
    color: "#F57C00",
  },
  {
    id: "tmpl_janmashtami",
    festivalName: "Janmashtami",
    recommendedCode: "JANMA25",
    campaignName: "Shri Krishna Janmashtami Special",
    description: "25% OFF on Laddu Gopal Murti & Jhula Sets",
    discountType: "PERCENTAGE",
    value: 25,
    minOrderValue: 1499,
    color: "#701A75",
  },
  {
    id: "tmpl_ramnavami",
    festivalName: "Ram Navami",
    recommendedCode: "RAMNAVAMI108",
    campaignName: "Ram Navami Blessing Discount",
    description: "Flat ₹108 OFF on Sacred Rudraksha Mala & Puja Thali",
    discountType: "FIXED_AMOUNT",
    value: 108,
    minOrderValue: 999,
    color: "#B45309",
  },
  {
    id: "tmpl_navratri",
    festivalName: "Sharad Navratri",
    recommendedCode: "NAVRATRIFREE",
    campaignName: "Sharad Navratri Special Offer",
    description: "Flat ₹250 OFF on All Akhand Diyas & Incense Orders",
    discountType: "FIXED_AMOUNT",
    value: 250,
    minOrderValue: 799,
    color: "#D97706",
  },
];

export const mockCouponsList: AdminCouponDetail[] = [
  {
    id: "coup_001",
    code: "DIWALI2026",
    campaignName: "Diwali Mahotsav Festival Sale",
    description: "30% OFF on Brass Diyas, Oil Lamps, & Temple Decor.",
    discountType: "PERCENTAGE",
    value: 30,
    maxDiscount: 1500,
    minOrderValue: 1999,
    usageCount: 1420,
    usageLimit: 3000,
    perCustomerLimit: 2,
    usedTodayCount: 84,
    revenueGenerated: 4260000,
    totalDiscountAmount: 890000,
    status: "ACTIVE",
    applicability: "SPECIFIC_CATEGORIES",
    startDate: "2026-10-10",
    startTime: "00:00",
    endDate: "2026-11-05",
    endTime: "23:59",
    timezone: "Asia/Kolkata (IST)",
    createdBy: "Ramanayam Marketing Lead",
    applicableCategories: ["Brass Diyas & Lamps", "Temple Decor & Idols"],
    applicableProducts: ["Handcrafted Antique Brass Peacock Diya"],
    excludedProducts: [],
    timeline: [
      {
        id: "t_1",
        title: "Campaign Created",
        description: "Created by Ramanayam Marketing Lead with 30% discount rule.",
        timestamp: "01 Jul 2026, 10:00 AM",
        actor: "Marketing Lead",
      },
      {
        id: "t_2",
        title: "Campaign Launched",
        description: "Status set to ACTIVE automatically on start date.",
        timestamp: "10 Oct 2026, 12:00 AM",
        actor: "System Automation",
      },
    ],
  },
  {
    id: "coup_002",
    code: "JANMA25",
    campaignName: "Shri Krishna Janmashtami Special",
    description: "25% OFF on Laddu Gopal Murti, Jhula & Sacred Prasadam.",
    discountType: "PERCENTAGE",
    value: 25,
    maxDiscount: 1000,
    minOrderValue: 1499,
    usageCount: 980,
    usageLimit: 2000,
    perCustomerLimit: 1,
    usedTodayCount: 42,
    revenueGenerated: 2940000,
    totalDiscountAmount: 612000,
    status: "SCHEDULED",
    applicability: "SPECIFIC_CATEGORIES",
    startDate: "2026-08-20",
    startTime: "09:00",
    endDate: "2026-08-28",
    endTime: "23:59",
    timezone: "Asia/Kolkata (IST)",
    createdBy: "Senior Merchant Admin",
    applicableCategories: ["Sacred Food & Prasadam", "Temple Decor & Idols"],
    applicableProducts: [],
    excludedProducts: [],
    timeline: [
      {
        id: "t_1",
        title: "Campaign Scheduled",
        description: "Scheduled for upcoming Janmashtami festival season.",
        timestamp: "15 Jul 2026, 02:30 PM",
        actor: "Senior Merchant Admin",
      },
    ],
  },
  {
    id: "coup_003",
    code: "WELCOME10",
    campaignName: "First Order Devotee Welcome Offer",
    description: "10% OFF for all first-time registered customers.",
    discountType: "PERCENTAGE",
    value: 10,
    maxDiscount: 500,
    minOrderValue: 499,
    usageCount: 2840,
    usageLimit: 5000,
    perCustomerLimit: 1,
    usedTodayCount: 28,
    revenueGenerated: 3410000,
    totalDiscountAmount: 341000,
    status: "ACTIVE",
    applicability: "ENTIRE_STORE",
    startDate: "2026-01-01",
    startTime: "00:00",
    endDate: "2026-12-31",
    endTime: "23:59",
    timezone: "Asia/Kolkata (IST)",
    createdBy: "Growth Manager",
    applicableCategories: ["All Categories"],
    applicableProducts: [],
    excludedProducts: [],
    timeline: [
      {
        id: "t_1",
        title: "Evergreen Campaign Active",
        description: "Acquisition offer for new buyer registrations.",
        timestamp: "01 Jan 2026, 12:00 AM",
        actor: "Growth Manager",
      },
    ],
  },
  {
    id: "coup_004",
    code: "RAMNAVAMI108",
    campaignName: "Ram Navami Blessing Offer",
    description: "Flat ₹108 OFF on Rudraksha Mala and Sacred Beads.",
    discountType: "FIXED_AMOUNT",
    value: 108,
    minOrderValue: 999,
    usageCount: 1950,
    usageLimit: 1950,
    perCustomerLimit: 1,
    usedTodayCount: 0,
    revenueGenerated: 2340000,
    totalDiscountAmount: 210600,
    status: "EXPIRED",
    applicability: "SPECIFIC_CATEGORIES",
    startDate: "2026-03-20",
    startTime: "00:00",
    endDate: "2026-03-30",
    endTime: "23:59",
    timezone: "Asia/Kolkata (IST)",
    createdBy: "Ramanayam Marketing Lead",
    applicableCategories: ["Mala & Rudraksha Beads"],
    applicableProducts: [],
    excludedProducts: [],
    timeline: [
      {
        id: "t_1",
        title: "Campaign Expired",
        description: "100% usage limit reached during Ram Navami week.",
        timestamp: "30 Mar 2026, 11:59 PM",
        actor: "System Automation",
      },
    ],
  },
  {
    id: "coup_005",
    code: "VIPDEVOTEE",
    campaignName: "VIP Patron Exclusive Discount",
    description: "Flat ₹500 OFF on orders above ₹3,999 for VIP buyers.",
    discountType: "FIXED_AMOUNT",
    value: 500,
    minOrderValue: 3999,
    usageCount: 420,
    usageLimit: 1000,
    perCustomerLimit: 5,
    usedTodayCount: 6,
    revenueGenerated: 2100000,
    totalDiscountAmount: 210000,
    status: "ACTIVE",
    applicability: "SPECIFIC_CUSTOMERS",
    startDate: "2026-05-01",
    startTime: "09:00",
    endDate: "2026-12-31",
    endTime: "23:59",
    timezone: "Asia/Kolkata (IST)",
    createdBy: "CRM Manager",
    applicableCategories: ["All Categories"],
    applicableProducts: [],
    excludedProducts: [],
    timeline: [
      {
        id: "t_1",
        title: "VIP Campaign Launched",
        description: "Exclusive promo code distributed via SMS & Email to VIP patrons.",
        timestamp: "01 May 2026, 09:00 AM",
        actor: "CRM Manager",
      },
    ],
  },
  {
    id: "coup_006",
    code: "PUJATIME50",
    campaignName: "Puja Utensils Special Promotion",
    description: "Flat ₹50 OFF on Ashtalakshmi Puja Thali Sets.",
    discountType: "PRODUCT_SPECIFIC",
    value: 50,
    minOrderValue: 500,
    usageCount: 120,
    usageLimit: 500,
    perCustomerLimit: 1,
    usedTodayCount: 2,
    revenueGenerated: 348000,
    totalDiscountAmount: 6000,
    status: "DISABLED",
    applicability: "SPECIFIC_PRODUCTS",
    startDate: "2026-07-01",
    startTime: "00:00",
    endDate: "2026-09-30",
    endTime: "23:59",
    timezone: "Asia/Kolkata (IST)",
    createdBy: "Merchant Ops",
    applicableCategories: ["Puja Utensils & Sets"],
    applicableProducts: ["Pure Brass Ashtalakshmi Puja Thali Set with Bell"],
    excludedProducts: [],
    timeline: [
      {
        id: "t_1",
        title: "Campaign Disabled",
        description: "Temporarily disabled for inventory audit.",
        timestamp: "01 Aug 2026, 11:00 AM",
        actor: "Merchant Ops",
      },
    ],
  },
];

export const mockCouponUsages: CouponUsageRecord[] = [
  {
    id: "usg_101",
    orderId: "ORD-94821",
    couponCode: "DIWALI2026",
    customerName: "Pandit Rajesh Sharma",
    customerEmail: "rajesh.sharma@templeorg.in",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    discountAmount: 1500,
    orderAmount: 12999,
    usedAt: "2026-08-01 14:32",
  },
  {
    id: "usg_102",
    orderId: "ORD-94710",
    couponCode: "DIWALI2026",
    customerName: "Sunita Deshmukh",
    customerEmail: "sunita.d@gmail.com",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    discountAmount: 1050,
    orderAmount: 3499,
    usedAt: "2026-07-25 11:15",
  },
  {
    id: "usg_103",
    orderId: "ORD-94612",
    couponCode: "WELCOME10",
    customerName: "Meera Agarwal",
    customerEmail: "meera.agarwal@gmail.com",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    discountAmount: 70,
    orderAmount: 699,
    usedAt: "2026-07-20 18:40",
  },
  {
    id: "usg_104",
    orderId: "ORD-94500",
    couponCode: "VIPDEVOTEE",
    customerName: "Dr. Mahesh Kulkarni",
    customerEmail: "mkulkarni@aiims.edu",
    discountAmount: 500,
    orderAmount: 4999,
    usedAt: "2026-07-18 09:20",
  },
];
