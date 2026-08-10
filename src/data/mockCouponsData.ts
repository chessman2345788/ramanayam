export type CouponStatus = "ACTIVE" | "SCHEDULED" | "EXPIRED" | "DISABLED";
export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING" | "BUY_X_GET_Y";
export type CustomerTypeEligibility = "ALL" | "NEW" | "RETURNING" | "VIP";

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
  customerEligibility: CustomerTypeEligibility;
  
  startDate: string;
  endDate: string;
  timezone: string;
  createdBy: string;

  applicableCategories: string[];
  applicableProducts: string[];
  excludedProducts: string[];

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
    campaignName: "Sharad Navratri Free Express Shipping",
    description: "Free Shipping on All Akhand Diyas & Incense Orders",
    discountType: "FREE_SHIPPING",
    value: 0,
    minOrderValue: 799,
    color: "#D97706",
  },
  {
    id: "tmpl_shivratri",
    festivalName: "Maha Shivratri",
    recommendedCode: "SHIVRATRI15",
    campaignName: "Maha Shivratri Sacred Offer",
    description: "15% OFF on Narmada Shivling & Brass Yoni Base",
    discountType: "PERCENTAGE",
    value: 15,
    minOrderValue: 1299,
    color: "#4C1D95",
  },
  {
    id: "tmpl_raksha",
    festivalName: "Raksha Bandhan",
    recommendedCode: "RAKHI20",
    campaignName: "Divine Rakhi Thali Promotion",
    description: "20% OFF on Silver Coated Divine Rakhi Thalis",
    discountType: "PERCENTAGE",
    value: 20,
    minOrderValue: 899,
    color: "#BE185D",
  },
  {
    id: "tmpl_griha",
    festivalName: "Griha Pravesh",
    recommendedCode: "GRIHAPRAVESH500",
    campaignName: "Griha Pravesh Home Temple Blessing",
    description: "Flat ₹500 OFF on Carved Teakwood Mandir",
    discountType: "FIXED_AMOUNT",
    value: 500,
    minOrderValue: 4999,
    color: "#15803D",
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
    customerEligibility: "ALL",
    startDate: "2026-10-10",
    endDate: "2026-11-05",
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
    customerEligibility: "ALL",
    startDate: "2026-08-10",
    endDate: "2026-08-25",
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
    customerEligibility: "NEW",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
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
    customerEligibility: "ALL",
    startDate: "2026-03-20",
    endDate: "2026-03-30",
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
    customerEligibility: "VIP",
    startDate: "2026-05-01",
    endDate: "2026-12-31",
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
    code: "FREESHIP799",
    campaignName: "Monsoon Puja Free Express Shipping",
    description: "Free express shipping nationwide on orders above ₹799.",
    discountType: "FREE_SHIPPING",
    value: 0,
    minOrderValue: 799,
    usageCount: 650,
    usageLimit: 1000,
    perCustomerLimit: 2,
    usedTodayCount: 14,
    revenueGenerated: 975000,
    totalDiscountAmount: 65000,
    status: "DISABLED",
    customerEligibility: "ALL",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    timezone: "Asia/Kolkata (IST)",
    createdBy: "Logistics Admin",
    applicableCategories: ["Incense & Pure Dhoop", "Puja Utensils & Sets"],
    applicableProducts: [],
    excludedProducts: [],
    timeline: [
      {
        id: "t_1",
        title: "Campaign Disabled",
        description: "Disabled manually by Admin during courier partner renegotiation.",
        timestamp: "31 Jul 2026, 05:00 PM",
        actor: "Logistics Admin",
      },
    ],
  },
];
