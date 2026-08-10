export type CollectionStatus = "ACTIVE" | "SCHEDULED" | "ARCHIVED" | "DRAFT";
export type CollectionType = "MANUAL" | "AUTOMATIC";
export type CollectionVisibility = "PUBLIC" | "HIDDEN" | "FESTIVAL";

export interface AutomaticRuleCondition {
  id: string;
  field: "category" | "festival" | "brand" | "featured" | "bestseller" | "price" | "stock";
  operator: "equals" | "greater_than" | "less_than" | "contains";
  value: string;
}

export interface CollectionProductItem {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  festival?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  stock: number;
}

export interface FestivalCollectionTemplate {
  id: string;
  templateName: string;
  slug: string;
  description: string;
  bannerImage: string;
  thumbnail: string;
  recommendedCategory: string;
  color: string;
}

export interface AdminCollectionDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  thumbnail: string;
  seoTitle: string;
  seoDescription: string;
  status: CollectionStatus;
  type: CollectionType;
  visibility: CollectionVisibility;
  productsCount: number;
  assignedProductIds: string[];
  automaticRules: AutomaticRuleCondition[];
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export const mockSelectableProducts: CollectionProductItem[] = [
  {
    id: "prod_01",
    name: "Handcrafted Antique Brass Peacock Diya (24-inch)",
    sku: "RAM-BRS-019",
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=300&auto=format&fit=crop&q=80",
    price: 12999,
    category: "Brass Diyas & Lamps",
    brand: "Ramanayam Heritage",
    festival: "Diwali",
    isFeatured: true,
    isBestSeller: true,
    stock: 28,
  },
  {
    id: "prod_02",
    name: "Original 5 Mukhi Nepali Rudraksha Mala (108 Beads)",
    sku: "RAM-MAL-004",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=300&auto=format&fit=crop&q=80",
    price: 3499,
    category: "Mala & Rudraksha Beads",
    brand: "Vedic Craft",
    festival: "Shivratri",
    isFeatured: true,
    isBestSeller: true,
    stock: 14,
  },
  {
    id: "prod_03",
    name: "Pure Brass Ashtalakshmi Puja Thali Set with Bell",
    sku: "RAM-UTN-082",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=300&auto=format&fit=crop&q=80",
    price: 2899,
    category: "Puja Utensils & Sets",
    brand: "Ramanayam Heritage",
    festival: "Ram Navami",
    isFeatured: false,
    isBestSeller: true,
    stock: 45,
  },
  {
    id: "prod_04",
    name: "Organic Mysore Sandalwood Dhoop Cones (Pack of 100)",
    sku: "RAM-INC-012",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=300&auto=format&fit=crop&q=80",
    price: 699,
    category: "Incense & Pure Dhoop",
    brand: "Sugandh Veda",
    festival: "Navratri",
    isFeatured: false,
    isBestSeller: true,
    stock: 120,
  },
  {
    id: "prod_05",
    name: "Pure Desi Cow Ghee Diya Wicks (Box of 200)",
    sku: "RAM-FOOD-008",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=300&auto=format&fit=crop&q=80",
    price: 499,
    category: "Sacred Food & Prasadam",
    brand: "Pavitra Organics",
    festival: "Janmashtami",
    isFeatured: true,
    isBestSeller: false,
    stock: 0,
  },
  {
    id: "prod_06",
    name: "Carved Teakwood Temple Mandir with Brass Bells",
    sku: "RAM-DEC-091",
    image: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=300&auto=format&fit=crop&q=80",
    price: 18500,
    category: "Temple Decor & Idols",
    brand: "Ayodhya Artisans",
    festival: "Griha Pravesh",
    isFeatured: true,
    isBestSeller: false,
    stock: 5,
  },
];

export const mockFestivalCollectionTemplates: FestivalCollectionTemplate[] = [
  {
    id: "tmpl_diwali_col",
    templateName: "Diwali Mahotsav Deepawali Special",
    slug: "diwali-mahotsav-collection",
    description: "Curated collection of handcrafted brass oil lamps, peacock diyas, and temple decor for Diwali.",
    bannerImage: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Brass Diyas & Lamps",
    color: "#F57C00",
  },
  {
    id: "tmpl_janmashtami_col",
    templateName: "Janmashtami Laddu Gopal Collection",
    slug: "janmashtami-laddu-gopal-collection",
    description: "Sacred brass Krishna murtis, silver jhulas, and pure ghee wicks for Janmashtami puja.",
    bannerImage: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Temple Decor & Idols",
    color: "#701A75",
  },
  {
    id: "tmpl_ramnavami_col",
    templateName: "Ram Navami Sacred Ayodhya Collection",
    slug: "ram-navami-ayodhya-collection",
    description: "Ram Darbar brass idols, engraved puja thalis, and sacred mala sets for Ram Navami.",
    bannerImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Puja Utensils & Sets",
    color: "#B45309",
  },
  {
    id: "tmpl_navratri_col",
    templateName: "Sharad Navratri Durga Puja Specials",
    slug: "sharad-navratri-durga-puja",
    description: "Akhand brass diyas, pure sandalwood dhoop, and red velvet chowki covers for Navratri.",
    bannerImage: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Incense & Pure Dhoop",
    color: "#D97706",
  },
  {
    id: "tmpl_shivratri_col",
    templateName: "Maha Shivratri Bholenath Collection",
    slug: "maha-shivratri-collection",
    description: "Narmada Shivlings, 5 Mukhi Nepali Rudraksha Mala, and brass yoni bases for Shivratri.",
    bannerImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Mala & Rudraksha Beads",
    color: "#4C1D95",
  },
  {
    id: "tmpl_raksha_col",
    templateName: "Divine Rakhi & Gift Hampers",
    slug: "divine-rakhi-hampers",
    description: "Silver coated divine Rakhi thalis with sacred sweets and dry fruit hampers.",
    bannerImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Puja Utensils & Sets",
    color: "#BE185D",
  },
  {
    id: "tmpl_pooja_col",
    templateName: "Daily Home Mandir Essentials",
    slug: "daily-home-mandir-essentials",
    description: "Must-have items for everyday home temple rituals, ghee wicks, and pure incense.",
    bannerImage: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Brass Diyas & Lamps",
    color: "#16A34A",
  },
  {
    id: "tmpl_hampers_col",
    templateName: "Luxury Spiritual Gift Hampers",
    slug: "luxury-spiritual-gift-hampers",
    description: "Premium boxed spiritual gift hampers for auspicious occasions and corporate gifting.",
    bannerImage: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Temple Decor & Idols",
    color: "#0284C7",
  },
  {
    id: "tmpl_temple_col",
    templateName: "Pure Brass & Copper Temple Utensils",
    slug: "pure-brass-copper-temple-utensils",
    description: "Traditional hand-hammered brass Panchapatra, bells, and abhishekam vessels.",
    bannerImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=200&auto=format&fit=crop&q=80",
    recommendedCategory: "Puja Utensils & Sets",
    color: "#15803D",
  },
];

export const mockCollectionsList: AdminCollectionDetail[] = [
  {
    id: "col_001",
    name: "Diwali Mahotsav Deepawali Special",
    slug: "diwali-mahotsav-collection",
    description: "Curated collection of handcrafted brass oil lamps, peacock diyas, and temple decor for Diwali.",
    bannerImage: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=200&auto=format&fit=crop&q=80",
    seoTitle: "Diwali Mahotsav Collection | Brass Diyas & Temple Decor - Ramanayam",
    seoDescription: "Shop authentic handcrafted antique brass peacock diyas, hanging bells, and temple decor for Diwali Mahotsav.",
    status: "ACTIVE",
    type: "AUTOMATIC",
    visibility: "FESTIVAL",
    productsCount: 24,
    assignedProductIds: ["prod_01", "prod_03"],
    automaticRules: [
      { id: "r1", field: "category", operator: "equals", value: "Brass Diyas & Lamps" },
      { id: "r2", field: "festival", operator: "equals", value: "Diwali" },
    ],
    startDate: "2026-10-10",
    endDate: "2026-11-05",
    createdAt: "2026-07-15",
  },
  {
    id: "col_002",
    name: "Janmashtami Laddu Gopal Collection",
    slug: "janmashtami-laddu-gopal-collection",
    description: "Sacred brass Krishna murtis, silver jhulas, and pure ghee wicks for Janmashtami puja.",
    bannerImage: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=200&auto=format&fit=crop&q=80",
    seoTitle: "Janmashtami Special Collection | Krishna Idols & Jhula - Ramanayam",
    seoDescription: "Explore pure brass Laddu Gopal murtis, silver carved jhulas, and authentic cow ghee wicks.",
    status: "SCHEDULED",
    type: "AUTOMATIC",
    visibility: "FESTIVAL",
    productsCount: 18,
    assignedProductIds: ["prod_05"],
    automaticRules: [
      { id: "r1", field: "festival", operator: "equals", value: "Janmashtami" },
    ],
    startDate: "2026-08-10",
    endDate: "2026-08-25",
    createdAt: "2026-07-20",
  },
  {
    id: "col_003",
    name: "Daily Home Mandir Essentials",
    slug: "daily-home-mandir-essentials",
    description: "Must-have items for everyday home temple rituals, ghee wicks, and pure incense.",
    bannerImage: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=200&auto=format&fit=crop&q=80",
    seoTitle: "Daily Home Mandir Essentials | Puja Items Online - Ramanayam",
    seoDescription: "Shop everyday sacred home temple supplies: organic Mysore sandalwood dhoop, ghee wicks, and puja thalis.",
    status: "ACTIVE",
    type: "MANUAL",
    visibility: "PUBLIC",
    productsCount: 32,
    assignedProductIds: ["prod_01", "prod_02", "prod_03", "prod_04"],
    automaticRules: [],
    createdAt: "2026-06-01",
  },
  {
    id: "col_004",
    name: "Maha Shivratri Bholenath Collection",
    slug: "maha-shivratri-collection",
    description: "Narmada Shivlings, 5 Mukhi Nepali Rudraksha Mala, and brass yoni bases for Shivratri.",
    bannerImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=200&auto=format&fit=crop&q=80",
    seoTitle: "Maha Shivratri Collection | Rudraksha Mala & Shivling - Ramanayam",
    seoDescription: "Authentic 5 Mukhi Nepali Rudraksha Malas, Narmada Shivlings, and Shivratri puja items.",
    status: "ARCHIVED",
    type: "AUTOMATIC",
    visibility: "HIDDEN",
    productsCount: 14,
    assignedProductIds: ["prod_02"],
    automaticRules: [
      { id: "r1", field: "category", operator: "equals", value: "Mala & Rudraksha Beads" },
    ],
    createdAt: "2026-02-10",
  },
  {
    id: "col_005",
    name: "Luxury Carved Mandirs & Shrines",
    slug: "luxury-carved-mandirs-shrines",
    description: "Teakwood and rosewood hand-carved home mandirs with solid brass bells.",
    bannerImage: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=800&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1545232979-fbf5880486c4?w=200&auto=format&fit=crop&q=80",
    seoTitle: "Teakwood Home Mandirs & Shrines | Teak Mandir Online - Ramanayam",
    seoDescription: "Handcrafted teakwood home mandirs with brass bells and antique finish.",
    status: "DRAFT",
    type: "MANUAL",
    visibility: "HIDDEN",
    productsCount: 6,
    assignedProductIds: ["prod_06"],
    automaticRules: [],
    createdAt: "2026-07-28",
  },
];
