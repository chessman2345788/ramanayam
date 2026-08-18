export type ReviewStatus = "PENDING" | "APPROVED" | "HIDDEN" | "REPORTED" | "REJECTED";

export interface TimelineEvent {
  id: string;
  type: "SUBMITTED" | "APPROVED" | "HIDDEN" | "REJECTED" | "REPORTED" | "EDITED";
  title: string;
  description: string;
  timestamp: string;
  actor: string;
}

export interface AdminReviewDetail {
  id: string;
  reviewNumber: string; // e.g. "REV-8921"
  rating: number; // 1 to 5
  title: string;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt?: string;
  moderatedAt?: string;
  rejectionReason?: string;
  moderatorNotes?: string;
  helpfulCount: number;
  reportedReason?: string;
  
  // Product Info
  productId: string;
  productName: string;
  productSku: string;
  productImage: string;
  productCategory: string;
  productPrice: number;
  productAverageRating: number;
  productTotalReviews: number;

  // Customer Info
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  customerLocation: string;
  isVerifiedPurchase: boolean;
  orderId?: string;
  orderDate?: string;

  // Uploaded Photos
  images?: string[];

  // Timeline
  timeline: TimelineEvent[];
}

export const mockReviewsList: AdminReviewDetail[] = [
  {
    id: "rev_001",
    reviewNumber: "REV-8921",
    rating: 5,
    title: "Exquisite craftsmanship! Truly divine addition to our home mandir.",
    comment:
      "The Handcrafted Antique Brass Peacock Diya exceeds all expectations. The weight of pure brass, intricate peacock feather carving, and traditional oil reservoir design make evening daily aarti a serene experience. Arrived safely packaged with brass polish sample.",
    status: "PENDING",
    createdAt: "2026-08-10T10:30:00Z",
    helpfulCount: 14,

    productId: "prod_01",
    productName: "Handcrafted Antique Brass Peacock Diya (24-inch)",
    productSku: "RAM-BRS-019",
    productImage: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=400&auto=format&fit=crop&q=80",
    productCategory: "Brass Diyas & Lamps",
    productPrice: 12999,
    productAverageRating: 4.9,
    productTotalReviews: 128,

    customerId: "cust_101",
    customerName: "Pandit Rajesh Sharma",
    customerEmail: "rajesh.sharma@templeorg.in",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    customerLocation: "Varanasi, Uttar Pradesh",
    isVerifiedPurchase: true,
    orderId: "ORD-94821",
    orderDate: "2026-08-01",

    images: [
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&auto=format&fit=crop&q=80",
    ],

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "Customer submitted 5-star review with 2 photos.",
        timestamp: "10 Aug 2026, 10:30 AM",
        actor: "Pandit Rajesh Sharma",
      },
    ],
  },
  {
    id: "rev_002",
    reviewNumber: "REV-8922",
    rating: 5,
    title: "100% Genuine Panchmukhi Rudraksha. Tested for density.",
    comment:
      "Received original 5 Mukhi Nepali Rudraksha Mala with authenticity certificate and silver capping. Each bead has natural 5 facets and sankh sound when struck lightly. Fast delivery before Shivratri.",
    status: "APPROVED",
    createdAt: "2026-08-08T16:45:00Z",
    moderatedAt: "2026-08-08T18:00:00Z",
    moderatorNotes: "Verified genuine purchase. Clear photos attached.",
    helpfulCount: 28,

    productId: "prod_02",
    productName: "Original 5 Mukhi Nepali Rudraksha Mala (108 Beads)",
    productSku: "RAM-MAL-004",
    productImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&auto=format&fit=crop&q=80",
    productCategory: "Mala & Rudraksha Beads",
    productPrice: 3499,
    productAverageRating: 4.8,
    productTotalReviews: 94,

    customerId: "cust_102",
    customerName: "Sunita Deshmukh",
    customerEmail: "sunita.d@gmail.com",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    customerLocation: "Pune, Maharashtra",
    isVerifiedPurchase: true,
    orderId: "ORD-94710",
    orderDate: "2026-07-25",

    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=80",
    ],

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "Customer submitted 5-star verified purchase review.",
        timestamp: "08 Aug 2026, 04:45 PM",
        actor: "Sunita Deshmukh",
      },
      {
        id: "t_2",
        type: "APPROVED",
        title: "Review Approved",
        description: "Approved by Moderator #4 (Ramanayam Quality Team).",
        timestamp: "08 Aug 2026, 06:00 PM",
        actor: "Moderator Admin",
      },
    ],
  },
  {
    id: "rev_003",
    reviewNumber: "REV-8923",
    rating: 1,
    title: "Contains promo link to external fake seller site. Spam!",
    comment:
      "Buy cheap brass diyas from cheapstore.com instead of this store. Call 9876543210 for discounts.",
    status: "REPORTED",
    createdAt: "2026-08-07T11:20:00Z",
    reportedReason: "Spam & External Promotional Link",
    helpfulCount: 0,

    productId: "prod_03",
    productName: "Pure Brass Ashtalakshmi Puja Thali Set with Bell",
    productSku: "RAM-UTN-082",
    productImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&auto=format&fit=crop&q=80",
    productCategory: "Puja Utensils & Sets",
    productPrice: 2899,
    productAverageRating: 4.7,
    productTotalReviews: 62,

    customerId: "cust_103",
    customerName: "Anonymous Spammer",
    customerEmail: "bot9921@tempmail.org",
    customerLocation: "Unknown Location",
    isVerifiedPurchase: false,

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "Unverified review posted.",
        timestamp: "07 Aug 2026, 11:20 AM",
        actor: "Bot Account",
      },
      {
        id: "t_2",
        type: "REPORTED",
        title: "Flagged by System Filter",
        description: "Automatic spam flag triggered: External URL detected.",
        timestamp: "07 Aug 2026, 11:21 AM",
        actor: "Automated Moderation Guard",
      },
    ],
  },
  {
    id: "rev_004",
    reviewNumber: "REV-8924",
    rating: 2,
    title: "Fragrance is nice but box arrived damaged in courier.",
    comment:
      "The Mysore Sandalwood Dhoop Cones smell divine, but outer box was squished during transport. Courier service in Jaipur needs improvement.",
    status: "REJECTED",
    createdAt: "2026-08-05T14:10:00Z",
    moderatedAt: "2026-08-05T16:30:00Z",
    rejectionReason: "Logistics Complaint (Non-Product Issue)",
    moderatorNotes: "Customer logistics complaint forwarded to support team. Review rejected per store guidelines.",
    helpfulCount: 2,

    productId: "prod_04",
    productName: "Organic Mysore Sandalwood Dhoop Cones (Pack of 100)",
    productSku: "RAM-INC-012",
    productImage: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&auto=format&fit=crop&q=80",
    productCategory: "Incense & Pure Dhoop",
    productPrice: 699,
    productAverageRating: 4.9,
    productTotalReviews: 215,

    customerId: "cust_104",
    customerName: "Meera Agarwal",
    customerEmail: "meera.agarwal@gmail.com",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    customerLocation: "Jaipur, Rajasthan",
    isVerifiedPurchase: true,
    orderId: "ORD-94612",
    orderDate: "2026-07-20",

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "2-star review posted regarding courier packaging.",
        timestamp: "05 Aug 2026, 02:10 PM",
        actor: "Meera Agarwal",
      },
      {
        id: "t_2",
        type: "REJECTED",
        title: "Review Rejected",
        description: "Rejected due to courier logistics focus. Support ticket #SUP-492 opened.",
        timestamp: "05 Aug 2026, 04:30 PM",
        actor: "Senior Moderator",
      },
    ],
  },
  {
    id: "rev_005",
    reviewNumber: "REV-8925",
    rating: 5,
    title: "Pure Desi Ghee wicks burn cleanly without black smoke!",
    comment:
      "We bought these wicks for Janmashtami puja. They stay lit for over 45 minutes continuously and produce a mild authentic ghee aroma.",
    status: "APPROVED",
    createdAt: "2026-08-04T09:15:00Z",
    moderatedAt: "2026-08-04T11:00:00Z",
    helpfulCount: 32,

    productId: "prod_05",
    productName: "Pure Desi Cow Ghee Diya Wicks (Box of 200)",
    productSku: "RAM-FOOD-008",
    productImage: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&auto=format&fit=crop&q=80",
    productCategory: "Sacred Food & Prasadam",
    productPrice: 499,
    productAverageRating: 4.8,
    productTotalReviews: 310,

    customerId: "cust_105",
    customerName: "Dr. Mahesh Kulkarni",
    customerEmail: "mkulkarni@aiims.edu",
    customerLocation: "New Delhi",
    isVerifiedPurchase: true,
    orderId: "ORD-94500",
    orderDate: "2026-07-18",

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "Customer posted 5-star review.",
        timestamp: "04 Aug 2026, 09:15 AM",
        actor: "Dr. Mahesh Kulkarni",
      },
      {
        id: "t_2",
        type: "APPROVED",
        title: "Review Approved",
        description: "Auto-approved verified purchase.",
        timestamp: "04 Aug 2026, 11:00 AM",
        actor: "Moderator System",
      },
    ],
  },
  {
    id: "rev_006",
    reviewNumber: "REV-8926",
    rating: 4,
    title: "Beautiful solid teakwood temple mandir. Heavy and sturdy.",
    comment:
      "The brass bells make a delightful soothing sound. Would appreciate clearer wall mounting instructions in the box.",
    status: "PENDING",
    createdAt: "2026-08-03T18:00:00Z",
    helpfulCount: 9,

    productId: "prod_06",
    productName: "Carved Teakwood Temple Mandir with Brass Bells",
    productSku: "RAM-DEC-091",
    productImage: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=400&auto=format&fit=crop&q=80",
    productCategory: "Temple Decor & Idols",
    productPrice: 18500,
    productAverageRating: 4.95,
    productTotalReviews: 42,

    customerId: "cust_106",
    customerName: "Ananya Iyer",
    customerEmail: "ananya.iyer@yahoo.com",
    customerLocation: "Bengaluru, Karnataka",
    isVerifiedPurchase: true,
    orderId: "ORD-94411",
    orderDate: "2026-07-12",

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "4-star review submitted for teakwood mandir.",
        timestamp: "03 Aug 2026, 06:00 PM",
        actor: "Ananya Iyer",
      },
    ],
  },
  {
    id: "rev_007",
    reviewNumber: "REV-8927",
    rating: 3,
    title: "Average finish on brass handle. Expected smoother polish.",
    comment:
      "The puja bell has a loud clear resonance, but the handle carving has slight rough edges. Needs better quality inspection before shipping.",
    status: "HIDDEN",
    createdAt: "2026-08-02T14:30:00Z",
    moderatedAt: "2026-08-02T15:45:00Z",
    moderatorNotes: "Review hidden temporarily while vendor addresses polish quality complaint.",
    helpfulCount: 4,

    productId: "prod_03",
    productName: "Pure Brass Ashtalakshmi Puja Thali Set with Bell",
    productSku: "RAM-UTN-082",
    productImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&auto=format&fit=crop&q=80",
    productCategory: "Puja Utensils & Sets",
    productPrice: 2899,
    productAverageRating: 4.7,
    productTotalReviews: 62,

    customerId: "cust_107",
    customerName: "Vikram Sengupta",
    customerEmail: "vikram.sengupta@kolkata.org",
    customerLocation: "Kolkata, West Bengal",
    isVerifiedPurchase: true,
    orderId: "ORD-94302",
    orderDate: "2026-07-10",

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "3-star review posted by customer.",
        timestamp: "02 Aug 2026, 02:30 PM",
        actor: "Vikram Sengupta",
      },
      {
        id: "t_2",
        type: "HIDDEN",
        title: "Review Hidden",
        description: "Hidden by admin for product inspection with artisan team.",
        timestamp: "02 Aug 2026, 03:45 PM",
        actor: "Admin Moderation Team",
      },
    ],
  },
  {
    id: "rev_008",
    reviewNumber: "REV-8928",
    rating: 5,
    title: "Mesmerizing divine aura! Sacred Camphor fragrance fills the entire home.",
    comment:
      "Bhimseni Camphor from Ramanayam is 100% natural. Leaves zero ash or residue in brass lamp. Highly recommended for daily morning sandhya aarti.",
    status: "APPROVED",
    createdAt: "2026-08-01T08:20:00Z",
    moderatedAt: "2026-08-01T09:00:00Z",
    helpfulCount: 45,

    productId: "prod_04",
    productName: "Organic Mysore Sandalwood Dhoop Cones (Pack of 100)",
    productSku: "RAM-INC-012",
    productImage: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&auto=format&fit=crop&q=80",
    productCategory: "Incense & Pure Dhoop",
    productPrice: 699,
    productAverageRating: 4.9,
    productTotalReviews: 215,

    customerId: "cust_108",
    customerName: "Rameshwar Prasad",
    customerEmail: "rameshwar.p@ayodhya.in",
    customerLocation: "Ayodhya, Uttar Pradesh",
    isVerifiedPurchase: true,
    orderId: "ORD-94219",
    orderDate: "2026-07-08",

    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&auto=format&fit=crop&q=80",
    ],

    timeline: [
      {
        id: "t_1",
        type: "SUBMITTED",
        title: "Review Submitted",
        description: "5-star verified purchase review with photo.",
        timestamp: "01 Aug 2026, 08:20 AM",
        actor: "Rameshwar Prasad",
      },
      {
        id: "t_2",
        type: "APPROVED",
        title: "Review Approved",
        description: "Approved by Admin Moderator.",
        timestamp: "01 Aug 2026, 09:00 AM",
        actor: "Admin Moderation Team",
      },
    ],
  }
];
