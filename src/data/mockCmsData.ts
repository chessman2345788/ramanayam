export interface HeroSlide {
  id: string;
  bannerUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  overlayOpacity: number;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  rating: number;
  photo: string;
  reviewText: string;
  location: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CmsStorefrontState {
  // Announcement Bar
  announcement: {
    enabled: boolean;
    bgColor: string;
    textColor: string;
    message: string;
    buttonText: string;
    buttonLink: string;
    autoScroll: boolean;
  };

  // Header
  header: {
    logoUrl: string;
    navigationMenu: Array<{ id: string; label: string; link: string }>;
    megaMenuEnabled: boolean;
    searchToggle: boolean;
    wishlistToggle: boolean;
    cartToggle: boolean;
    stickyHeader: boolean;
  };

  // Hero Section
  heroSlides: HeroSlide[];

  // Categories Section
  categoriesSection: {
    enabled: boolean;
    displayStyle: "GRID" | "CAROUSEL" | "CARDS";
    selectedCategories: string[];
    limit: number;
  };

  // Collections
  featuredCollections: {
    selectedCollections: string[];
  };

  // Featured Products
  featuredProducts: {
    selectionMode: "MANUAL" | "AUTOMATIC";
    filterType: "FEATURED" | "BEST_SELLERS" | "NEW_ARRIVALS" | "TRENDING";
    limit: number;
  };

  // Festival Section
  festivalSection: {
    activeFestival: string;
    title: string;
    subtitle: string;
    bannerUrl: string;
    buttonText: string;
    buttonLink: string;
  };

  // Testimonials
  testimonials: TestimonialItem[];

  // Newsletter
  newsletter: {
    enabled: boolean;
    heading: string;
    description: string;
    buttonText: string;
  };

  // Footer
  footer: {
    companyName: string;
    phone: string;
    email: string;
    address: string;
    socialLinks: {
      instagram: string;
      youtube: string;
      facebook: string;
      whatsapp: string;
    };
    copyrightText: string;
  };

  // About Us
  aboutUs: {
    title: string;
    subtitle: string;
    content: string;
    mission: string;
    vision: string;
    imageUrl: string;
  };

  // Contact
  contact: {
    phone: string;
    email: string;
    address: string;
    mapEmbedUrl: string;
  };

  // FAQ
  faqs: FaqItem[];

  // Policies
  policies: {
    privacyPolicy: string;
    refundPolicy: string;
    shippingPolicy: string;
    termsOfService: string;
  };

  // SEO
  seo: {
    homepageTitle: string;
    metaDescription: string;
    keywords: string;
    openGraphImage: string;
    twitterCard: string;
    robotsTxt: string;
    canonicalUrl: string;
  };
}

export const initialCmsState: CmsStorefrontState = {
  // Announcement Bar
  announcement: {
    enabled: true,
    bgColor: "#701A75", // Deep Maroon
    textColor: "#FFFFFF",
    message: "🌸 Special Diwali Mahotsav: Free Express Shipping across India on orders above ₹799! Code: RAM799",
    buttonText: "Shop Now",
    buttonLink: "/collections/diwali-mahotsav-collection",
    autoScroll: true,
  },

  // Header
  header: {
    logoUrl: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=150&auto=format&fit=crop&q=80",
    navigationMenu: [
      { id: "nav1", label: "Home", link: "/" },
      { id: "nav2", label: "Festival Shop", link: "/collections/diwali-mahotsav-collection" },
      { id: "nav3", label: "Brass Diyas", link: "/categories/brass-diyas" },
      { id: "nav4", label: "Rudraksha", link: "/categories/rudraksha" },
      { id: "nav5", label: "Temple Utensils", link: "/categories/puja-utensils" },
      { id: "nav6", label: "About Us", link: "/about" },
    ],
    megaMenuEnabled: true,
    searchToggle: true,
    wishlistToggle: true,
    cartToggle: true,
    stickyHeader: true,
  },

  // Hero Section
  heroSlides: [
    {
      id: "slide1",
      bannerUrl: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=1200&auto=format&fit=crop&q=80",
      title: "Sacred Brass Diyas & Temple Decor",
      subtitle: "Handcrafted with devotion by heritage artisans of Ayodhya for your home mandir.",
      buttonText: "Explore Diwali Specials",
      buttonLink: "/collections/diwali-mahotsav-collection",
      overlayOpacity: 0.4,
    },
    {
      id: "slide2",
      bannerUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&auto=format&fit=crop&q=80",
      title: "Original 5 Mukhi Nepali Rudraksha",
      subtitle: "Lab certified 108 bead mala sets for meditation and spiritual wellness.",
      buttonText: "Shop Rudraksha Collection",
      buttonLink: "/categories/rudraksha",
      overlayOpacity: 0.35,
    },
  ],

  // Categories Section
  categoriesSection: {
    enabled: true,
    displayStyle: "GRID",
    selectedCategories: ["Brass Diyas & Lamps", "Mala & Rudraksha Beads", "Puja Utensils & Sets", "Incense & Pure Dhoop", "Temple Decor & Idols"],
    limit: 6,
  },

  // Collections
  featuredCollections: {
    selectedCollections: ["Diwali Mahotsav Deepawali Special", "Janmashtami Laddu Gopal Collection", "Daily Home Mandir Essentials", "Luxury Spiritual Gift Hampers"],
  },

  // Featured Products
  featuredProducts: {
    selectionMode: "AUTOMATIC",
    filterType: "BEST_SELLERS",
    limit: 8,
  },

  // Festival Section
  festivalSection: {
    activeFestival: "Diwali Mahotsav",
    title: "Diwali Mahotsav Deepawali Specials",
    subtitle: "Illuminate your home mandir with pure brass peacock diyas & hand-engraved thali sets.",
    bannerUrl: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=1200&auto=format&fit=crop&q=80",
    buttonText: "Explore Festival Specials",
    buttonLink: "/collections/diwali-mahotsav-collection",
  },

  // Testimonials
  testimonials: [
    {
      id: "t1",
      customerName: "Mrs. Sunita Sharma",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      reviewText: "The brass peacock diya I ordered for Diwali is truly divine! Heavy authentic quality and beautifully polished.",
      location: "New Delhi",
    },
    {
      id: "t2",
      customerName: "Dr. Ramesh Iyer",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      reviewText: "Original Nepali Rudraksha with lab certification certificate enclosed. Fast 2-day delivery to Bengaluru.",
      location: "Bengaluru",
    },
  ],

  // Newsletter
  newsletter: {
    enabled: true,
    heading: "Receive Sacred Blessings & Festival Offers",
    description: "Subscribe to receive monthly puja tithi calendars, mandir decor tips, and early festival discounts.",
    buttonText: "Subscribe Now",
  },

  // Footer
  footer: {
    companyName: "Ramanayam Sacred Living Pvt. Ltd.",
    phone: "+91 98765 43210",
    email: "contact@ramanayam.com",
    address: "108 Sacred Veda Marg, Heritage District, Ayodhya, UP - 224123",
    socialLinks: {
      instagram: "https://instagram.com/ramanayam.official",
      youtube: "https://youtube.com/@ramanayam",
      facebook: "https://facebook.com/ramanayam.sacred",
      whatsapp: "https://wa.me/919876543210",
    },
    copyrightText: "© 2026 Ramanayam Sacred Living. All Rights Reserved. Handcrafted in Ayodhya, Bharat.",
  },

  // About Us
  aboutUs: {
    title: "Preserving Sanatana Heritage Through Craft",
    subtitle: "Authentic temple essentials handcrafted by traditional Ayodhya artisans.",
    content: "Ramanayam was founded with a sacred vision to bring authentic, lab-certified temple items to every devotee's home mandir across the world. From hand-hammered brass Panchapatras to 108 bead Nepali Rudraksha malas, every product is consecrated and packaged with deep reverence.",
    mission: "To connect every household with pure, authentic Sanatana Dharma ritual essentials.",
    vision: "To empower Indian traditional metal artisans and preserve sacred heritage craftsmanship.",
    imageUrl: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=800&auto=format&fit=crop&q=80",
  },

  // Contact
  contact: {
    phone: "+91 98765 43210",
    email: "support@ramanayam.com",
    address: "108 Sacred Veda Marg, Heritage District, Ayodhya, UP - 224123",
    mapEmbedUrl: "https://maps.google.com/maps?q=Ayodhya&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },

  // FAQ
  faqs: [
    {
      id: "f1",
      question: "Are all Rudraksha beads lab certified for authenticity?",
      answer: "Yes, every single 5 Mukhi and higher Rudraksha bead from Ramanayam is tested and comes with a X-ray lab certificate.",
      category: "Authenticity",
    },
    {
      id: "f2",
      question: "What are the shipping timelines across India?",
      answer: "Orders in Metro cities are delivered within 2-3 business days. Rest of India standard shipping takes 4-5 business days.",
      category: "Shipping",
    },
    {
      id: "f3",
      question: "Is Cash on Delivery (COD) available?",
      answer: "Yes, COD is available pan-India for orders above ₹499.",
      category: "Payments",
    },
  ],

  // Policies
  policies: {
    privacyPolicy: "Ramanayam respects your privacy. All customer data, delivery addresses, and payment information are encrypted with 256-bit SSL security.",
    refundPolicy: "We offer a 7-day hassle-free replacement policy for any item damaged in transit. Please send unboxing photo to support@ramanayam.com.",
    shippingPolicy: "Free shipping on orders above ₹799. Standard delivery charge of ₹99 applies for orders below ₹799.",
    termsOfService: "By purchasing from Ramanayam, you agree to our spiritual product usage guidelines and sacred etiquette standards.",
  },

  // SEO
  seo: {
    homepageTitle: "Ramanayam | Pure Sacred Temple Products & Puja Essentials",
    metaDescription: "Shop authentic brass diyas, 5 mukhi rudraksha malas, puja thalis, Mysore sandalwood dhoop, and carved mandirs online with express delivery.",
    keywords: "brass diya, rudraksha mala, puja thali, sandalwood dhoop, temple mandir, ayodhya puja items",
    openGraphImage: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=1200&auto=format&fit=crop&q=80",
    twitterCard: "summary_large_image",
    robotsTxt: "index, follow, max-image-preview:large",
    canonicalUrl: "https://ramanayam.com",
  },
};
