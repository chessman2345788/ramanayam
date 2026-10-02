import type { Product, Category, Occasion, Review, CartItem, LiveDarshan } from "@/types/products";
export type { Product, Category, Occasion, Review, CartItem, LiveDarshan };

/**
 * OFFICIAL RAMANAYAM CATALOGUE DATA
 * Source of truth: Ramayanam_Product_Catalogue_No6Rule.pdf
 * Contains 20 sacred categories and all official products with real pricing and variants.
 */
export const categories: Category[] = [
  {
    "id": "cat-1-pooja-samagri",
    "slug": "pooja-samagri",
    "name": "Pooja Samagri",
    "nameHi": "पूजा सामग्री",
    "nameSanskrit": "पूजा द्रव्य",
    "description": "Essential essentials for daily puja, worship and rituals.",
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "productCount": 26
  },
  {
    "id": "cat-2-pooja-thali-accessories",
    "slug": "pooja-thali-accessories",
    "name": "Pooja Thali & Accessories",
    "nameHi": "पूजा थाली एवं सहायक सामग्री",
    "nameSanskrit": "पूजा थाली एवं उपकरणाणि",
    "description": "Thoughtful accessories for puja and aarti.",
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "productCount": 14
  },
  {
    "id": "cat-3-temple-decoration",
    "slug": "temple-decoration",
    "name": "Temple Decoration",
    "nameHi": "मंदिर सजावट",
    "nameSanskrit": "देवालय अलङ्करणम्",
    "description": "Elegant decor for temples and sacred spaces.",
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "productCount": 10
  },
  {
    "id": "cat-4-bhagwan-vastra",
    "slug": "bhagwan-vastra",
    "name": "Bhagwan Vastra",
    "nameHi": "भगवान के वस्त्र",
    "nameSanskrit": "देव परिधानम्",
    "description": "Traditional and festive attire for deities.",
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "productCount": 12
  },
  {
    "id": "cat-5-mukut-shringar",
    "slug": "mukut-shringar",
    "name": "Mukut & Shringar",
    "nameHi": "मुकुट एवं श्रृंगार",
    "nameSanskrit": "मुकुट एवं शृङ्गार",
    "description": "Ornaments and accents for divine shringar.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "productCount": 14
  },
  {
    "id": "cat-6-mala",
    "slug": "mala",
    "name": "Mala",
    "nameHi": "माला",
    "nameSanskrit": "जपमाला",
    "description": "Malas for chanting, meditation and spiritual practice.",
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "productCount": 7
  },
  {
    "id": "cat-7-murti",
    "slug": "murti",
    "name": "Murti",
    "nameHi": "मूर्ति",
    "nameSanskrit": "देवमूर्ति",
    "description": "Deity idols for puja and home temples.",
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "productCount": 12
  },
  {
    "id": "cat-8-mandir",
    "slug": "mandir",
    "name": "Mandir",
    "nameHi": "मंदिर",
    "nameSanskrit": "काष्ठ मन्दिरम्",
    "description": "Home temples in varied styles and sizes.",
    "image": "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80",
    "productCount": 6
  },
  {
    "id": "cat-9-shankh-bells",
    "slug": "shankh-bells",
    "name": "Shankh & Bells",
    "nameHi": "शंख एवं घंटियां",
    "nameSanskrit": "शङ्ख एवं घण्टा",
    "description": "Conch shells and bells for traditional puja rituals.",
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "productCount": 5
  },
  {
    "id": "cat-10-brass-copper-items",
    "slug": "brass-copper-items",
    "name": "Brass & Copper Items",
    "nameHi": "पीतल एवं तांबे की सामग्री",
    "nameSanskrit": "पित्तल एवं ताम्र पात्राणि",
    "description": "Traditional brass and copper puja essentials.",
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "productCount": 8
  },
  {
    "id": "cat-11-rudraksha-collection",
    "slug": "rudraksha-collection",
    "name": "Rudraksha Collection",
    "nameHi": "रुद्राक्ष संग्रह",
    "nameSanskrit": "रुद्राक्ष संग्रहः",
    "description": "Rudraksha pieces for spiritual practice.",
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "productCount": 8
  },
  {
    "id": "cat-12-yantra",
    "slug": "yantra",
    "name": "Yantra",
    "nameHi": "यंत्र",
    "nameSanskrit": "सिद्ध यन्त्रम्",
    "description": "Yantras used in traditional puja and spiritual practice.",
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "productCount": 6
  },
  {
    "id": "cat-13-books-scriptures",
    "slug": "books-scriptures",
    "name": "Books & Scriptures",
    "nameHi": "पुस्तकें एवं धर्मग्रंथ",
    "nameSanskrit": "पवित्र ग्रन्थाः",
    "description": "Selected scriptures for reading, recitation and study.",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "productCount": 8
  },
  {
    "id": "cat-14-festival-special",
    "slug": "festival-special",
    "name": "Festival Special",
    "nameHi": "पर्व विशेष",
    "nameSanskrit": "उत्सव सम्भारः",
    "description": "Ready puja and celebration kits for major festivals.",
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "productCount": 9
  },
  {
    "id": "cat-15-pooja-kits",
    "slug": "pooja-kits",
    "name": "Pooja Kits",
    "nameHi": "पूजा किट",
    "nameSanskrit": "सम्पूर्ण पूजा किट",
    "description": "Convenient kits for special puja and ceremonies.",
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "productCount": 7
  },
  {
    "id": "cat-16-bhog-prasad",
    "slug": "bhog-prasad",
    "name": "Bhog & Prasad",
    "nameHi": "भोग एवं प्रसाद",
    "nameSanskrit": "नैवेद्य एवं प्रसादः",
    "description": "Offerings and prasad essentials for sacred occasions.",
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "productCount": 7
  },
  {
    "id": "cat-17-clothing-religious-wear",
    "slug": "clothing-religious-wear",
    "name": "Clothing & Religious Wear",
    "nameHi": "वस्त्र एवं धार्मिक परिधान",
    "nameSanskrit": "धार्मिक वस्त्रम्",
    "description": "Traditional wear for puja, rituals and devotional occasions.",
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "productCount": 7
  },
  {
    "id": "cat-18-spiritual-accessories",
    "slug": "spiritual-accessories",
    "name": "Spiritual Accessories",
    "nameHi": "आध्यात्मिक सामग्री",
    "nameSanskrit": "आध्यात्मिक साधना",
    "description": "Distinctive products for spiritual traditions and practice.",
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "productCount": 7
  },
  {
    "id": "cat-19-home-fragrance",
    "slug": "home-fragrance",
    "name": "Home Fragrance",
    "nameHi": "गृह सुगंध",
    "nameSanskrit": "सुगन्ध द्रव्य",
    "description": "Fragrance essentials for a serene home and puja space.",
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "productCount": 5
  },
  {
    "id": "cat-20-gift-items",
    "slug": "gift-items",
    "name": "Gift Items",
    "nameHi": "उपहार सामग्री",
    "nameSanskrit": "मङ्गलमय उपहारः",
    "description": "Thoughtful devotional gifts for special occasions.",
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "productCount": 5
  }
];

export const products: Product[] = [
  {
    "id": "prod-agarbatti",
    "slug": "agarbatti",
    "name": "Agarbatti",
    "nameHi": "अगरबत्ती",
    "description": "Agarbatti (अगरबत्ती) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack (16–170 sticks).",
    "price": 171,
    "mrp": 205,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "quantity",
    "tags": [
      "Pooja Samagri",
      "Agarbatti",
      "अगरबत्ती",
      "per pack (16–170 sticks)"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.8,
    "reviewCount": 15,
    "inStock": true,
    "isFeatured": true,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-agarbatti-p1",
        "sku": "RAM-AGB-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack (16–170 sticks)"
        },
        "price": 171,
        "compareAtPrice": 205,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-agarbatti-p2",
        "sku": "RAM-AGB-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack (16–170 sticks)"
        },
        "price": 332,
        "compareAtPrice": 415,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-dhoop-batti",
    "slug": "dhoop-batti",
    "name": "Dhoop Batti",
    "nameHi": "धूप बत्ती",
    "description": "Dhoop Batti (धूप बत्ती) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack (75g–140g).",
    "price": 100,
    "mrp": 120,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Dhoop Batti",
      "धूप बत्ती",
      "per pack (75g–140g)"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.85,
    "reviewCount": 18,
    "inStock": true,
    "isFeatured": true,
    "weight": "per pack (75g–140g)",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-dhoop-batti-w1",
        "sku": "RAM-DHB-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per pack (75g–140g)"
        },
        "price": 100,
        "compareAtPrice": 120,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-dhoop-batti-w2",
        "sku": "RAM-DHB-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per pack (75g–140g)"
        },
        "price": 150,
        "compareAtPrice": 188,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kapoor",
    "slug": "kapoor",
    "name": "Kapoor",
    "nameHi": "कपूर",
    "description": "Kapoor (कपूर) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 100g.",
    "price": 240,
    "mrp": 288,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Kapoor",
      "कपूर",
      "per 100g"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 21,
    "inStock": true,
    "isFeatured": true,
    "weight": "per 100g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-kapoor-w1",
        "sku": "RAM-KPR-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 100g"
        },
        "price": 240,
        "compareAtPrice": 288,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kapoor-w2",
        "sku": "RAM-KPR-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 100g"
        },
        "price": 280,
        "compareAtPrice": 350,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ghee-batti",
    "slug": "ghee-batti",
    "name": "Ghee Batti",
    "nameHi": "घी बत्ती",
    "description": "Ghee Batti (घी बत्ती) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: pack of ~100 pcs.",
    "price": 262,
    "mrp": 314,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "pack",
    "tags": [
      "Pooja Samagri",
      "Ghee Batti",
      "घी बत्ती",
      "pack of ~100 pcs"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.95,
    "reviewCount": 24,
    "inStock": true,
    "isFeatured": true,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-ghee-batti-p1",
        "sku": "RAM-GHB-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "pack of ~100 pcs"
        },
        "price": 262,
        "compareAtPrice": 314,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-ghee-batti-p2",
        "sku": "RAM-GHB-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "pack of ~100 pcs"
        },
        "price": 360,
        "compareAtPrice": 450,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-cotton-batti",
    "slug": "cotton-batti",
    "name": "Cotton Batti",
    "nameHi": "कॉटन बत्ती",
    "description": "Cotton Batti (कॉटन बत्ती) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack (25g to 1100 pcs).",
    "price": 102,
    "mrp": 122,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "quantity",
    "tags": [
      "Pooja Samagri",
      "Cotton Batti",
      "कॉटन बत्ती",
      "per pack (25g to 1100 pcs)"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 5,
    "reviewCount": 27,
    "inStock": true,
    "isFeatured": true,
    "weight": "per pack (25g to 1100 pcs)",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-cotton-batti-p1",
        "sku": "RAM-CTB-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack (25g to 1100 pcs)"
        },
        "price": 102,
        "compareAtPrice": 122,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-cotton-batti-p2",
        "sku": "RAM-CTB-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack (25g to 1100 pcs)"
        },
        "price": 164,
        "compareAtPrice": 205,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-havan-samagri",
    "slug": "havan-samagri",
    "name": "Havan Samagri",
    "nameHi": "हवन सामग्री",
    "description": "Havan Samagri (हवन सामग्री) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 500g.",
    "price": 86,
    "mrp": 103,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Havan Samagri",
      "हवन सामग्री",
      "per 500g"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.8,
    "reviewCount": 30,
    "inStock": true,
    "isFeatured": true,
    "weight": "per 500g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-havan-samagri-w1",
        "sku": "RAM-HVS-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 500g"
        },
        "price": 86,
        "compareAtPrice": 103,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-havan-samagri-w2",
        "sku": "RAM-HVS-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 500g"
        },
        "price": 132,
        "compareAtPrice": 165,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-samidha",
    "slug": "samidha",
    "name": "Samidha",
    "nameHi": "समिधा",
    "description": "Samidha (समिधा) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 125,
    "mrp": 150,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "pack",
    "tags": [
      "Pooja Samagri",
      "Samidha",
      "समिधा",
      "per pack"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.85,
    "reviewCount": 33,
    "inStock": true,
    "isFeatured": true,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-samidha-p1",
        "sku": "RAM-SMD-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack"
        },
        "price": 125,
        "compareAtPrice": 150,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-samidha-p2",
        "sku": "RAM-SMD-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack"
        },
        "price": 200,
        "compareAtPrice": 250,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-roli",
    "slug": "roli",
    "name": "Roli",
    "nameHi": "रोली",
    "description": "Roli (रोली) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 25g.",
    "price": 29,
    "mrp": 35,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Roli",
      "रोली",
      "per 25g"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 36,
    "inStock": true,
    "isFeatured": true,
    "weight": "per 25g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-roli-w1",
        "sku": "RAM-ROL-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 25g"
        },
        "price": 29,
        "compareAtPrice": 35,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-roli-w2",
        "sku": "RAM-ROL-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 25g"
        },
        "price": 33,
        "compareAtPrice": 41,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kumkum",
    "slug": "kumkum",
    "name": "Kumkum",
    "nameHi": "कुमकुम",
    "description": "Kumkum (कुमकुम) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack (powder to paste).",
    "price": 127,
    "mrp": 152,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "pack",
    "tags": [
      "Pooja Samagri",
      "Kumkum",
      "कुमकुम",
      "per pack (powder to paste)"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 4.95,
    "reviewCount": 39,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-kumkum-p1",
        "sku": "RAM-KMK-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack (powder to paste)"
        },
        "price": 127,
        "compareAtPrice": 152,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kumkum-p2",
        "sku": "RAM-KMK-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack (powder to paste)"
        },
        "price": 229,
        "compareAtPrice": 286,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-haldi",
    "slug": "haldi",
    "name": "Haldi",
    "nameHi": "हल्दी",
    "description": "Haldi (हल्दी) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 100g.",
    "price": 60,
    "mrp": 72,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Haldi",
      "हल्दी",
      "per 100g"
    ],
    "badges": [
      "Featured"
    ],
    "rating": 5,
    "reviewCount": 42,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 100g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-haldi-w1",
        "sku": "RAM-HLD-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 100g"
        },
        "price": 60,
        "compareAtPrice": 72,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-haldi-w2",
        "sku": "RAM-HLD-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 100g"
        },
        "price": 100,
        "compareAtPrice": 125,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-chandan-powder",
    "slug": "chandan-powder",
    "name": "Chandan Powder",
    "nameHi": "चंदन पाउडर",
    "description": "Chandan Powder (चंदन पाउडर) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 25–50g.",
    "price": 315,
    "mrp": 378,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Chandan Powder",
      "चंदन पाउडर",
      "per 25–50g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 45,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 25–50g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-chandan-powder-w1",
        "sku": "RAM-CDP-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 25–50g"
        },
        "price": 315,
        "compareAtPrice": 378,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-chandan-powder-w2",
        "sku": "RAM-CDP-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 25–50g"
        },
        "price": 600,
        "compareAtPrice": 750,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-chandan-stick",
    "slug": "chandan-stick",
    "name": "Chandan Stick",
    "nameHi": "चंदन स्टिक",
    "description": "Chandan Stick (चंदन स्टिक) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 260,
    "mrp": 312,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "pack",
    "tags": [
      "Pooja Samagri",
      "Chandan Stick",
      "चंदन स्टिक",
      "per pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 48,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-chandan-stick-p1",
        "sku": "RAM-CDS-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack"
        },
        "price": 260,
        "compareAtPrice": 312,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-chandan-stick-p2",
        "sku": "RAM-CDS-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-sindoor",
    "slug": "sindoor",
    "name": "Sindoor",
    "nameHi": "सिन्दूर",
    "description": "Sindoor (सिन्दूर) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 25g.",
    "price": 55,
    "mrp": 66,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Sindoor",
      "सिन्दूर",
      "per 25g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 51,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 25g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-sindoor-w1",
        "sku": "RAM-SDR-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 25g"
        },
        "price": 55,
        "compareAtPrice": 66,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-sindoor-w2",
        "sku": "RAM-SDR-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 25g"
        },
        "price": 100,
        "compareAtPrice": 125,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-gulal",
    "slug": "gulal",
    "name": "Gulal",
    "nameHi": "गुलाल",
    "description": "Gulal (गुलाल) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 100g / 1 pc.",
    "price": 38,
    "mrp": 46,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Gulal",
      "गुलाल",
      "per 100g / 1 pc"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 54,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 100g / 1 pc",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-gulal-w1",
        "sku": "RAM-GUL-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 100g / 1 pc"
        },
        "price": 38,
        "compareAtPrice": 46,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-gulal-w2",
        "sku": "RAM-GUL-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 100g / 1 pc"
        },
        "price": 46,
        "compareAtPrice": 58,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-akshat-rice",
    "slug": "akshat-rice",
    "name": "Akshat (Rice)",
    "nameHi": "अक्षत (चावल)",
    "description": "Akshat (Rice) (अक्षत (चावल)) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 250g pack.",
    "price": 65,
    "mrp": 78,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Akshat (Rice)",
      "अक्षत (चावल)",
      "per 250g pack"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 5,
    "reviewCount": 17,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 250g pack",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-akshat-rice-w1",
        "sku": "RAM-AKS-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 250g pack"
        },
        "price": 65,
        "compareAtPrice": 78,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-akshat-rice-w2",
        "sku": "RAM-AKS-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 250g pack"
        },
        "price": 100,
        "compareAtPrice": 125,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-janeu",
    "slug": "janeu",
    "name": "Janeu",
    "nameHi": "जनेऊ",
    "description": "Janeu (जनेऊ) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pc / pack.",
    "price": 53,
    "mrp": 64,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "pack",
    "tags": [
      "Pooja Samagri",
      "Janeu",
      "जनेऊ",
      "per pc / pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 20,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-janeu-p1",
        "sku": "RAM-JNU-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pc / pack"
        },
        "price": 53,
        "compareAtPrice": 64,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-janeu-p2",
        "sku": "RAM-JNU-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pc / pack"
        },
        "price": 100,
        "compareAtPrice": 125,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kalawa-mauli",
    "slug": "kalawa-mauli",
    "name": "Kalawa / Mauli",
    "nameHi": "कलावा / मौली",
    "description": "Kalawa / Mauli (कलावा / मौली) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per reel / pack.",
    "price": 35,
    "mrp": 42,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "pack",
    "tags": [
      "Pooja Samagri",
      "Kalawa / Mauli",
      "कलावा / मौली",
      "per reel / pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 23,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-kalawa-mauli-p1",
        "sku": "RAM-KLW-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per reel / pack"
        },
        "price": 35,
        "compareAtPrice": 42,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kalawa-mauli-p2",
        "sku": "RAM-KLW-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per reel / pack"
        },
        "price": 60,
        "compareAtPrice": 75,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-gangajal",
    "slug": "gangajal",
    "name": "Gangajal",
    "nameHi": "गंगाजल",
    "description": "Gangajal (गंगाजल) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 100–500 ml.",
    "price": 140,
    "mrp": 168,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Gangajal",
      "गंगाजल",
      "per 100–500 ml"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 26,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-gangajal-w1",
        "sku": "RAM-GJL-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 100–500 ml"
        },
        "price": 140,
        "compareAtPrice": 168,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-gangajal-w2",
        "sku": "RAM-GJL-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 100–500 ml"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ganga-mitti",
    "slug": "ganga-mitti",
    "name": "Ganga Mitti",
    "nameHi": "गंगा मिट्टी",
    "description": "Ganga Mitti (गंगा मिट्टी) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 90,
    "mrp": 108,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "pack",
    "tags": [
      "Pooja Samagri",
      "Ganga Mitti",
      "गंगा मिट्टी",
      "per pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 29,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-ganga-mitti-p1",
        "sku": "RAM-GMT-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack"
        },
        "price": 90,
        "compareAtPrice": 108,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-ganga-mitti-p2",
        "sku": "RAM-GMT-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack"
        },
        "price": 150,
        "compareAtPrice": 188,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-panchamrit-kit",
    "slug": "panchamrit-kit",
    "name": "Panchamrit Kit",
    "nameHi": "पंचामृत किट",
    "description": "Panchamrit Kit (पंचामृत किट) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 250,
    "mrp": 313,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "single",
    "tags": [
      "Pooja Samagri",
      "Panchamrit Kit",
      "पंचामृत किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 32,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-panchamrit-kit-std",
        "sku": "RAM-PMK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-honey",
    "slug": "honey",
    "name": "Honey",
    "nameHi": "शहद",
    "description": "Honey (शहद) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 250g.",
    "price": 275,
    "mrp": 330,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Honey",
      "शहद",
      "per 250g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 35,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 250g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-honey-w1",
        "sku": "RAM-HNY-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 250g"
        },
        "price": 275,
        "compareAtPrice": 330,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-honey-w2",
        "sku": "RAM-HNY-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 250g"
        },
        "price": 450,
        "compareAtPrice": 563,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-cow-ghee",
    "slug": "cow-ghee",
    "name": "Cow Ghee",
    "nameHi": "गौ घी",
    "description": "Cow Ghee (गौ घी) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 1 litre.",
    "price": 1195,
    "mrp": 1434,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Cow Ghee",
      "गौ घी",
      "per 1 litre"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.85,
    "reviewCount": 38,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-cow-ghee-w1",
        "sku": "RAM-CGH-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 1 litre"
        },
        "price": 1195,
        "compareAtPrice": 1434,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-cow-ghee-w2",
        "sku": "RAM-CGH-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 1 litre"
        },
        "price": 1699,
        "compareAtPrice": 2124,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-camphor-tablets",
    "slug": "camphor-tablets",
    "name": "Camphor Tablets",
    "nameHi": "कपूर टैबलेट",
    "description": "Camphor Tablets (कपूर टैबलेट) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 100g.",
    "price": 190,
    "mrp": 228,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Camphor Tablets",
      "कपूर टैबलेट",
      "per 100g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 41,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 100g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-camphor-tablets-w1",
        "sku": "RAM-CPT-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 100g"
        },
        "price": 190,
        "compareAtPrice": 228,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-camphor-tablets-w2",
        "sku": "RAM-CPT-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 100g"
        },
        "price": 280,
        "compareAtPrice": 350,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-supari",
    "slug": "supari",
    "name": "Supari",
    "nameHi": "सुपारी",
    "description": "Supari (सुपारी) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 50g.",
    "price": 60,
    "mrp": 72,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Supari",
      "सुपारी",
      "per 50g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 44,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 50g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-supari-w1",
        "sku": "RAM-SPR-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 50g"
        },
        "price": 60,
        "compareAtPrice": 72,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-supari-w2",
        "sku": "RAM-SPR-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 50g"
        },
        "price": 100,
        "compareAtPrice": 125,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-elaichi",
    "slug": "elaichi",
    "name": "Elaichi",
    "nameHi": "इलायची",
    "description": "Elaichi (इलायची) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 25g.",
    "price": 155,
    "mrp": 186,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Elaichi",
      "इलायची",
      "per 25g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 47,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 25g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-elaichi-w1",
        "sku": "RAM-ELC-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 25g"
        },
        "price": 155,
        "compareAtPrice": 186,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-elaichi-w2",
        "sku": "RAM-ELC-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 25g"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-laung",
    "slug": "laung",
    "name": "Laung",
    "nameHi": "लौंग",
    "description": "Laung (लौंग) — Authentic pooja samagri essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 25g.",
    "price": 75,
    "mrp": 90,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Samagri",
    "categorySlug": "pooja-samagri",
    "variantType": "weight",
    "tags": [
      "Pooja Samagri",
      "Laung",
      "लौंग",
      "per 25g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 50,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 25g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "ingredients": [
      "Natural Extracts",
      "Pure Herbs",
      "Vedic Minerals"
    ],
    "variants": [
      {
        "id": "var-laung-w1",
        "sku": "RAM-LNG-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 25g"
        },
        "price": 75,
        "compareAtPrice": 90,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-laung-w2",
        "sku": "RAM-LNG-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 25g"
        },
        "price": 120,
        "compareAtPrice": 150,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-pooja-thali",
    "slug": "pooja-thali",
    "name": "Pooja Thali",
    "nameHi": "पूजा थाली",
    "description": "Pooja Thali (पूजा थाली) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: steel budget set to large brass set.",
    "price": 4055,
    "mrp": 4866,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "material_size",
    "tags": [
      "Pooja Thali & Accessories",
      "Pooja Thali",
      "पूजा थाली",
      "steel budget set to large brass set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 53,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "weight": "steel budget set to large brass set",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-pooja-thali-small",
        "sku": "RAM-PTH-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "steel budget set to large brass set"
        },
        "price": 4055,
        "compareAtPrice": 4866,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-pooja-thali-large",
        "sku": "RAM-PTH-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "steel budget set to large brass set"
        },
        "price": 8000,
        "compareAtPrice": 10000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-aarti-thali",
    "slug": "aarti-thali",
    "name": "Aarti Thali",
    "nameHi": "आरती थाली",
    "description": "Aarti Thali (आरती थाली) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per thali.",
    "price": 1658,
    "mrp": 1990,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Aarti Thali",
      "आरती थाली",
      "per thali"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 16,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-aarti-thali-std",
        "sku": "RAM-ATH-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per thali"
        },
        "price": 1658,
        "compareAtPrice": 1990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-aarti-thali-prm",
        "sku": "RAM-ATH-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per thali"
        },
        "price": 2815,
        "compareAtPrice": 3519,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-bell-ghanti",
    "slug": "bell-ghanti",
    "name": "Bell (Ghanti)",
    "nameHi": "घंटी",
    "description": "Bell (Ghanti) (घंटी) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 675,
    "mrp": 810,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Bell (Ghanti)",
      "घंटी",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.95,
    "reviewCount": 19,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-bell-ghanti-std",
        "sku": "RAM-BGL-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 675,
        "compareAtPrice": 810,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-bell-ghanti-prm",
        "sku": "RAM-BGL-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1199,
        "compareAtPrice": 1499,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-diya",
    "slug": "diya",
    "name": "Diya",
    "nameHi": "दीया",
    "description": "Diya (दीया) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 361,
    "mrp": 433,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Diya",
      "दीया",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 22,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-diya-std",
        "sku": "RAM-DYA-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 361,
        "compareAtPrice": 433,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-diya-prm",
        "sku": "RAM-DYA-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 572,
        "compareAtPrice": 715,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-akhand-diya",
    "slug": "akhand-diya",
    "name": "Akhand Diya",
    "nameHi": "अखंड दीया",
    "description": "Akhand Diya (अखंड दीया) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1630,
    "mrp": 1956,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Akhand Diya",
      "अखंड दीया",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 25,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-akhand-diya-std",
        "sku": "RAM-AKD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1630,
        "compareAtPrice": 1956,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-akhand-diya-prm",
        "sku": "RAM-AKD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 3199,
        "compareAtPrice": 3999,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-panchmukhi-diya",
    "slug": "panchmukhi-diya",
    "name": "Panchmukhi Diya",
    "nameHi": "पंचमुखी दीया",
    "description": "Panchmukhi Diya (पंचमुखी दीया) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece (brass).",
    "price": 1293,
    "mrp": 1552,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Panchmukhi Diya",
      "पंचमुखी दीया",
      "per piece (brass)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 28,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-panchmukhi-diya-std",
        "sku": "RAM-PMD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece (brass)"
        },
        "price": 1293,
        "compareAtPrice": 1552,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-panchmukhi-diya-prm",
        "sku": "RAM-PMD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece (brass)"
        },
        "price": 2090,
        "compareAtPrice": 2613,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-oil-lamp",
    "slug": "oil-lamp",
    "name": "Oil Lamp",
    "nameHi": "तेल दीपक",
    "description": "Oil Lamp (तेल दीपक) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Oil Lamp",
      "तेल दीपक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 31,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-oil-lamp-std",
        "sku": "RAM-OLP-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-oil-lamp-prm",
        "sku": "RAM-OLP-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-samai-lamp",
    "slug": "samai-lamp",
    "name": "Samai Lamp",
    "nameHi": "समई दीपक",
    "description": "Samai Lamp (समई दीपक) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Samai Lamp",
      "समई दीपक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 34,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-samai-lamp-std",
        "sku": "RAM-SML-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-samai-lamp-prm",
        "sku": "RAM-SML-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-incense-holder",
    "slug": "incense-holder",
    "name": "Incense Holder",
    "nameHi": "धूपदान",
    "description": "Incense Holder (धूपदान) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 425,
    "mrp": 510,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Incense Holder",
      "धूपदान",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 37,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-incense-holder-std",
        "sku": "RAM-IHD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 425,
        "compareAtPrice": 510,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-incense-holder-prm",
        "sku": "RAM-IHD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kapoor-dani",
    "slug": "kapoor-dani",
    "name": "Kapoor Dani",
    "nameHi": "कपूर दानी",
    "description": "Kapoor Dani (कपूर दानी) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Kapoor Dani",
      "कपूर दानी",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 40,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-kapoor-dani-std",
        "sku": "RAM-KPD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kapoor-dani-prm",
        "sku": "RAM-KPD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kumkum-box",
    "slug": "kumkum-box",
    "name": "Kumkum Box",
    "nameHi": "कुमकुम डब्बी",
    "description": "Kumkum Box (कुमकुम डब्बी) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 325,
    "mrp": 390,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Kumkum Box",
      "कुमकुम डब्बी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 43,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-kumkum-box-std",
        "sku": "RAM-KMB-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 325,
        "compareAtPrice": 390,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kumkum-box-prm",
        "sku": "RAM-KMB-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 600,
        "compareAtPrice": 750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-chandan-box",
    "slug": "chandan-box",
    "name": "Chandan Box",
    "nameHi": "चंदन डब्बी",
    "description": "Chandan Box (चंदन डब्बी) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Chandan Box",
      "चंदन डब्बी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 46,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-chandan-box-std",
        "sku": "RAM-CDB-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-chandan-box-prm",
        "sku": "RAM-CDB-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-puja-spoon",
    "slug": "puja-spoon",
    "name": "Spoon",
    "nameHi": "चम्मच",
    "description": "Spoon (चम्मच) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 160,
    "mrp": 192,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Spoon",
      "चम्मच",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 49,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-puja-spoon-std",
        "sku": "RAM-SPN-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 160,
        "compareAtPrice": 192,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-puja-spoon-prm",
        "sku": "RAM-SPN-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 300,
        "compareAtPrice": 375,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-coconut-stand",
    "slug": "coconut-stand",
    "name": "Coconut Stand",
    "nameHi": "नारियल स्टैंड",
    "description": "Coconut Stand (नारियल स्टैंड) — Authentic pooja thali & accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Thali & Accessories",
    "categorySlug": "pooja-thali-accessories",
    "variantType": "piece",
    "tags": [
      "Pooja Thali & Accessories",
      "Coconut Stand",
      "नारियल स्टैंड",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 52,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-coconut-stand-std",
        "sku": "RAM-CST-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-coconut-stand-prm",
        "sku": "RAM-CST-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-artificial-flowers",
    "slug": "artificial-flowers",
    "name": "Artificial Flowers",
    "nameHi": "कृत्रिम फूल",
    "description": "Artificial Flowers (कृत्रिम फूल) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bunch / string.",
    "price": 275,
    "mrp": 330,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "pack",
    "tags": [
      "Temple Decoration",
      "Artificial Flowers",
      "कृत्रिम फूल",
      "per bunch / string"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 15,
    "inStock": true,
    "isFeatured": false,
    "weight": "per bunch / string",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-artificial-flowers-p1",
        "sku": "RAM-AFL-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per bunch / string"
        },
        "price": 275,
        "compareAtPrice": 330,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-artificial-flowers-p2",
        "sku": "RAM-AFL-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per bunch / string"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-fresh-flower-garland",
    "slug": "fresh-flower-garland",
    "name": "Fresh Flower Garland",
    "nameHi": "ताजे फूलों की माला",
    "description": "Fresh Flower Garland (ताजे फूलों की माला) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per garland (seasonal).",
    "price": 265,
    "mrp": 318,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "piece",
    "tags": [
      "Temple Decoration",
      "Fresh Flower Garland",
      "ताजे फूलों की माला",
      "per garland (seasonal)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 18,
    "inStock": true,
    "isFeatured": false,
    "weight": "per garland (seasonal)",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-fresh-flower-garland-std",
        "sku": "RAM-FFG-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per garland (seasonal)"
        },
        "price": 265,
        "compareAtPrice": 318,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-fresh-flower-garland-prm",
        "sku": "RAM-FFG-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per garland (seasonal)"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-toran",
    "slug": "toran",
    "name": "Toran",
    "nameHi": "तोरण",
    "description": "Toran (तोरण) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 650,
    "mrp": 780,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "piece",
    "tags": [
      "Temple Decoration",
      "Toran",
      "तोरण",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 21,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-toran-std",
        "sku": "RAM-TRN-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 650,
        "compareAtPrice": 780,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-toran-prm",
        "sku": "RAM-TRN-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1200,
        "compareAtPrice": 1500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-bandarwal",
    "slug": "bandarwal",
    "name": "Bandarwal",
    "nameHi": "बंदनवार",
    "description": "Bandarwal (बंदनवार) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 500,
    "mrp": 600,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "piece",
    "tags": [
      "Temple Decoration",
      "Bandarwal",
      "बंदनवार",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 24,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-bandarwal-std",
        "sku": "RAM-BDW-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 500,
        "compareAtPrice": 600,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-bandarwal-prm",
        "sku": "RAM-BDW-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 900,
        "compareAtPrice": 1125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-door-hanging",
    "slug": "door-hanging",
    "name": "Door Hanging",
    "nameHi": "दरवाज़ा सजावट",
    "description": "Door Hanging (दरवाज़ा सजावट) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 550,
    "mrp": 660,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "piece",
    "tags": [
      "Temple Decoration",
      "Door Hanging",
      "दरवाज़ा सजावट",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 27,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-door-hanging-std",
        "sku": "RAM-DHG-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 550,
        "compareAtPrice": 660,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-door-hanging-prm",
        "sku": "RAM-DHG-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1000,
        "compareAtPrice": 1250,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-decorative-lights",
    "slug": "decorative-lights",
    "name": "Decorative Lights",
    "nameHi": "सजावटी लाइट्स",
    "description": "Decorative Lights (सजावटी लाइट्स) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per set.",
    "price": 800,
    "mrp": 960,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "pack",
    "tags": [
      "Temple Decoration",
      "Decorative Lights",
      "सजावटी लाइट्स",
      "per set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 30,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-decorative-lights-p1",
        "sku": "RAM-DLT-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per set"
        },
        "price": 800,
        "compareAtPrice": 960,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-decorative-lights-p2",
        "sku": "RAM-DLT-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per set"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-led-diyas",
    "slug": "led-diyas",
    "name": "LED Diyas",
    "nameHi": "एलईडी दीये",
    "description": "LED Diyas (एलईडी दीये) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "pack",
    "tags": [
      "Temple Decoration",
      "LED Diyas",
      "एलईडी दीये",
      "per pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 33,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-led-diyas-p1",
        "sku": "RAM-LED-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-led-diyas-p2",
        "sku": "RAM-LED-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-rangoli-stickers",
    "slug": "rangoli-stickers",
    "name": "Rangoli Stickers",
    "nameHi": "रंगोली स्टिकर",
    "description": "Rangoli Stickers (रंगोली स्टिकर) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 225,
    "mrp": 270,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "pack",
    "tags": [
      "Temple Decoration",
      "Rangoli Stickers",
      "रंगोली स्टिकर",
      "per pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 36,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-rangoli-stickers-p1",
        "sku": "RAM-RGS-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack"
        },
        "price": 225,
        "compareAtPrice": 270,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-rangoli-stickers-p2",
        "sku": "RAM-RGS-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack"
        },
        "price": 400,
        "compareAtPrice": 500,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-flower-strings",
    "slug": "flower-strings",
    "name": "Flower Strings",
    "nameHi": "फूलों की लड़ियां",
    "description": "Flower Strings (फूलों की लड़ियां) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per string.",
    "price": 275,
    "mrp": 330,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "piece",
    "tags": [
      "Temple Decoration",
      "Flower Strings",
      "फूलों की लड़ियां",
      "per string"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 39,
    "inStock": true,
    "isFeatured": false,
    "weight": "per string",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-flower-strings-std",
        "sku": "RAM-FLS-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per string"
        },
        "price": 275,
        "compareAtPrice": 330,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-flower-strings-prm",
        "sku": "RAM-FLS-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per string"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-temple-curtains",
    "slug": "temple-curtains",
    "name": "Temple Curtains",
    "nameHi": "मंदिर परदे",
    "description": "Temple Curtains (मंदिर परदे) — Authentic temple decoration essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 850,
    "mrp": 1020,
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Temple Decoration",
    "categorySlug": "temple-decoration",
    "variantType": "piece",
    "tags": [
      "Temple Decoration",
      "Temple Curtains",
      "मंदिर परदे",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 5,
    "reviewCount": 42,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-temple-curtains-std",
        "sku": "RAM-TCR-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 850,
        "compareAtPrice": 1020,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-temple-curtains-prm",
        "sku": "RAM-TCR-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-laddu-gopal-dress",
    "slug": "laddu-gopal-dress",
    "name": "Laddu Gopal Dress",
    "nameHi": "लड्डू गोपाल पोशाक",
    "description": "Laddu Gopal Dress (लड्डू गोपाल पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per dress (size 0–5).",
    "price": 1600,
    "mrp": 1920,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "size",
    "tags": [
      "Bhagwan Vastra",
      "Laddu Gopal Dress",
      "लड्डू गोपाल पोशाक",
      "per dress (size 0–5)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 45,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-laddu-gopal-dress-small",
        "sku": "RAM-LGD-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per dress (size 0–5)"
        },
        "price": 1600,
        "compareAtPrice": 1920,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-laddu-gopal-dress-large",
        "sku": "RAM-LGD-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per dress (size 0–5)"
        },
        "price": 3000,
        "compareAtPrice": 3750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-radha-krishna-dress",
    "slug": "radha-krishna-dress",
    "name": "Radha Krishna Dress",
    "nameHi": "राधा कृष्ण पोशाक",
    "description": "Radha Krishna Dress (राधा कृष्ण पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pair set.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Radha Krishna Dress",
      "राधा कृष्ण पोशाक",
      "per pair set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 48,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-radha-krishna-dress-std",
        "sku": "RAM-RKD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per pair set"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-radha-krishna-dress-prm",
        "sku": "RAM-RKD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per pair set"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ram-darbar-dress",
    "slug": "ram-darbar-dress",
    "name": "Ram Darbar Dress",
    "nameHi": "राम दरबार पोशाक",
    "description": "Ram Darbar Dress (राम दरबार पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per set.",
    "price": 1700,
    "mrp": 2040,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Ram Darbar Dress",
      "राम दरबार पोशाक",
      "per set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 51,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-ram-darbar-dress-std",
        "sku": "RAM-RDD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per set"
        },
        "price": 1700,
        "compareAtPrice": 2040,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-ram-darbar-dress-prm",
        "sku": "RAM-RDD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per set"
        },
        "price": 3000,
        "compareAtPrice": 3750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-hanuman-dress",
    "slug": "hanuman-dress",
    "name": "Hanuman Dress",
    "nameHi": "हनुमान पोशाक",
    "description": "Hanuman Dress (हनुमान पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 850,
    "mrp": 1020,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Hanuman Dress",
      "हनुमान पोशाक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 54,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-hanuman-dress-std",
        "sku": "RAM-HND-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 850,
        "compareAtPrice": 1020,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-hanuman-dress-prm",
        "sku": "RAM-HND-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-shiv-ji-vastra",
    "slug": "shiv-ji-vastra",
    "name": "Shiv Ji Vastra",
    "nameHi": "शिव जी वस्त्र",
    "description": "Shiv Ji Vastra (शिव जी वस्त्र) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 675,
    "mrp": 810,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Shiv Ji Vastra",
      "शिव जी वस्त्र",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 17,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-shiv-ji-vastra-std",
        "sku": "RAM-SJV-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 675,
        "compareAtPrice": 810,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-shiv-ji-vastra-prm",
        "sku": "RAM-SJV-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1200,
        "compareAtPrice": 1500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ganesh-dress",
    "slug": "ganesh-dress",
    "name": "Ganesh Dress",
    "nameHi": "गणेश पोशाक",
    "description": "Ganesh Dress (गणेश पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Ganesh Dress",
      "गणेश पोशाक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 20,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-ganesh-dress-std",
        "sku": "RAM-GND-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-ganesh-dress-prm",
        "sku": "RAM-GND-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-durga-dress",
    "slug": "durga-dress",
    "name": "Durga Dress",
    "nameHi": "दुर्गा पोशाक",
    "description": "Durga Dress (दुर्गा पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Durga Dress",
      "दुर्गा पोशाक",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.85,
    "reviewCount": 23,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-durga-dress-std",
        "sku": "RAM-DGD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-durga-dress-prm",
        "sku": "RAM-DGD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-balaji-dress",
    "slug": "balaji-dress",
    "name": "Balaji Dress",
    "nameHi": "बालाजी पोशाक",
    "description": "Balaji Dress (बालाजी पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Balaji Dress",
      "बालाजी पोशाक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 26,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-balaji-dress-std",
        "sku": "RAM-BLD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-balaji-dress-prm",
        "sku": "RAM-BLD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-sai-baba-dress",
    "slug": "sai-baba-dress",
    "name": "Sai Baba Dress",
    "nameHi": "साईं बाबा पोशाक",
    "description": "Sai Baba Dress (साईं बाबा पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Sai Baba Dress",
      "साईं बाबा पोशाक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 29,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-sai-baba-dress-std",
        "sku": "RAM-SBD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-sai-baba-dress-prm",
        "sku": "RAM-SBD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-seasonal-dresses",
    "slug": "seasonal-dresses",
    "name": "Seasonal Dresses",
    "nameHi": "मौसमी पोशाक",
    "description": "Seasonal Dresses (मौसमी पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1100,
    "mrp": 1320,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Seasonal Dresses",
      "मौसमी पोशाक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 32,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-seasonal-dresses-std",
        "sku": "RAM-SSD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1100,
        "compareAtPrice": 1320,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-seasonal-dresses-prm",
        "sku": "RAM-SSD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2000,
        "compareAtPrice": 2500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-silk-dresses",
    "slug": "silk-dresses",
    "name": "Silk Dresses",
    "nameHi": "रेशमी पोशाक",
    "description": "Silk Dresses (रेशमी पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1950,
    "mrp": 2340,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Silk Dresses",
      "रेशमी पोशाक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 35,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-silk-dresses-std",
        "sku": "RAM-SKD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1950,
        "compareAtPrice": 2340,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-silk-dresses-prm",
        "sku": "RAM-SKD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 3500,
        "compareAtPrice": 4375,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-cotton-dresses",
    "slug": "cotton-dresses",
    "name": "Cotton Dresses",
    "nameHi": "सूती पोशाक",
    "description": "Cotton Dresses (सूती पोशाक) — Authentic bhagwan vastra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 675,
    "mrp": 810,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhagwan Vastra",
    "categorySlug": "bhagwan-vastra",
    "variantType": "piece",
    "tags": [
      "Bhagwan Vastra",
      "Cotton Dresses",
      "सूती पोशाक",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 38,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-cotton-dresses-std",
        "sku": "RAM-CTD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 675,
        "compareAtPrice": 810,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-cotton-dresses-prm",
        "sku": "RAM-CTD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1200,
        "compareAtPrice": 1500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-mukut",
    "slug": "mukut",
    "name": "Mukut",
    "nameHi": "मुकुट",
    "description": "Mukut (मुकुट) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Mukut",
      "मुकुट",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 41,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-mukut-std",
        "sku": "RAM-MKT-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-mukut-prm",
        "sku": "RAM-MKT-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-mor-mukut",
    "slug": "mor-mukut",
    "name": "Mor Mukut",
    "nameHi": "मोर मुकुट",
    "description": "Mor Mukut (मोर मुकुट) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 325,
    "mrp": 390,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Mor Mukut",
      "मोर मुकुट",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.95,
    "reviewCount": 44,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-mor-mukut-std",
        "sku": "RAM-MMK-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 325,
        "compareAtPrice": 390,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-mor-mukut-prm",
        "sku": "RAM-MMK-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 600,
        "compareAtPrice": 750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-crown",
    "slug": "crown",
    "name": "Crown",
    "nameHi": "क्राउन",
    "description": "Crown (क्राउन) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Crown",
      "क्राउन",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 47,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-crown-std",
        "sku": "RAM-CRN-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-crown-prm",
        "sku": "RAM-CRN-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-tilak",
    "slug": "tilak",
    "name": "Tilak",
    "nameHi": "तिलक",
    "description": "Tilak (तिलक) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece / pack.",
    "price": 160,
    "mrp": 192,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "pack",
    "tags": [
      "Mukut & Shringar",
      "Tilak",
      "तिलक",
      "per piece / pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 50,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-tilak-p1",
        "sku": "RAM-TLK-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per piece / pack"
        },
        "price": 160,
        "compareAtPrice": 192,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-tilak-p2",
        "sku": "RAM-TLK-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per piece / pack"
        },
        "price": 300,
        "compareAtPrice": 375,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-necklace",
    "slug": "necklace",
    "name": "Necklace",
    "nameHi": "हार",
    "description": "Necklace (हार) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 800,
    "mrp": 960,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Necklace",
      "हार",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 53,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-necklace-std",
        "sku": "RAM-NKL-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 800,
        "compareAtPrice": 960,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-necklace-prm",
        "sku": "RAM-NKL-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-shringar-mala",
    "slug": "shringar-mala",
    "name": "Shringar Mala",
    "nameHi": "माला",
    "description": "Shringar Mala (माला) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 425,
    "mrp": 510,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Shringar Mala",
      "माला",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 16,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-shringar-mala-std",
        "sku": "RAM-SML-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 425,
        "compareAtPrice": 510,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-shringar-mala-prm",
        "sku": "RAM-SML-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-earrings",
    "slug": "earrings",
    "name": "Earrings",
    "nameHi": "कान की बालियां",
    "description": "Earrings (कान की बालियां) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pair.",
    "price": 275,
    "mrp": 330,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Earrings",
      "कान की बालियां",
      "per pair"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 19,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-earrings-std",
        "sku": "RAM-ERG-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per pair"
        },
        "price": 275,
        "compareAtPrice": 330,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-earrings-prm",
        "sku": "RAM-ERG-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per pair"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-bangles",
    "slug": "bangles",
    "name": "Bangles",
    "nameHi": "चूड़ियां",
    "description": "Bangles (चूड़ियां) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pair.",
    "price": 325,
    "mrp": 390,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Bangles",
      "चूड़ियां",
      "per pair"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 22,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-bangles-std",
        "sku": "RAM-BNG-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per pair"
        },
        "price": 325,
        "compareAtPrice": 390,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-bangles-prm",
        "sku": "RAM-BNG-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per pair"
        },
        "price": 600,
        "compareAtPrice": 750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-waist-belt",
    "slug": "waist-belt",
    "name": "Waist Belt",
    "nameHi": "कमरबंध",
    "description": "Waist Belt (कमरबंध) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Waist Belt",
      "कमरबंध",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 25,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-waist-belt-std",
        "sku": "RAM-WBT-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-waist-belt-prm",
        "sku": "RAM-WBT-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-armlet",
    "slug": "armlet",
    "name": "Armlet",
    "nameHi": "बाजूबंद",
    "description": "Armlet (बाजूबंद) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pair.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Armlet",
      "बाजूबंद",
      "per pair"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 28,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-armlet-std",
        "sku": "RAM-ARM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per pair"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-armlet-prm",
        "sku": "RAM-ARM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per pair"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-anklets",
    "slug": "anklets",
    "name": "Anklets",
    "nameHi": "पायल",
    "description": "Anklets (पायल) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pair.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Anklets",
      "पायल",
      "per pair"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 31,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-anklets-std",
        "sku": "RAM-ANK-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per pair"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-anklets-prm",
        "sku": "RAM-ANK-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per pair"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-hair-accessories",
    "slug": "hair-accessories",
    "name": "Hair Accessories",
    "nameHi": "केश सज्जा",
    "description": "Hair Accessories (केश सज्जा) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 275,
    "mrp": 330,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Hair Accessories",
      "केश सज्जा",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 34,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-hair-accessories-std",
        "sku": "RAM-HAC-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 275,
        "compareAtPrice": 330,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-hair-accessories-prm",
        "sku": "RAM-HAC-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-peacock-feather",
    "slug": "peacock-feather",
    "name": "Peacock Feather",
    "nameHi": "मोर पंख",
    "description": "Peacock Feather (मोर पंख) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 55,
    "mrp": 66,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Peacock Feather",
      "मोर पंख",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 37,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-peacock-feather-std",
        "sku": "RAM-PKF-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 55,
        "compareAtPrice": 66,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-peacock-feather-prm",
        "sku": "RAM-PKF-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 100,
        "compareAtPrice": 125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-stone-jewelry-set",
    "slug": "stone-jewelry-set",
    "name": "Stone Jewelry Set",
    "nameHi": "स्टोन ज्वेलरी सेट",
    "description": "Stone Jewelry Set (स्टोन ज्वेलरी सेट) — Authentic mukut & shringar essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per set.",
    "price": 1353,
    "mrp": 1624,
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mukut & Shringar",
    "categorySlug": "mukut-shringar",
    "variantType": "piece",
    "tags": [
      "Mukut & Shringar",
      "Stone Jewelry Set",
      "स्टोन ज्वेलरी सेट",
      "per set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 40,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-stone-jewelry-set-std",
        "sku": "RAM-SJS-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per set"
        },
        "price": 1353,
        "compareAtPrice": 1624,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-stone-jewelry-set-prm",
        "sku": "RAM-SJS-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per set"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-tulsi-mala",
    "slug": "tulsi-mala",
    "name": "Tulsi Mala",
    "nameHi": "तुलसी माला",
    "description": "Tulsi Mala (तुलसी माला) — Authentic mala essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per mala.",
    "price": 275,
    "mrp": 330,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mala",
    "categorySlug": "mala",
    "variantType": "piece",
    "tags": [
      "Mala",
      "Tulsi Mala",
      "तुलसी माला",
      "per mala"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 43,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-tulsi-mala-std",
        "sku": "RAM-TLM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per mala"
        },
        "price": 275,
        "compareAtPrice": 330,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-tulsi-mala-prm",
        "sku": "RAM-TLM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per mala"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-sphatik-mala",
    "slug": "sphatik-mala",
    "name": "Sphatik Mala",
    "nameHi": "स्फटिक माला",
    "description": "Sphatik Mala (स्फटिक माला) — Authentic mala essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per mala.",
    "price": 1650,
    "mrp": 1980,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mala",
    "categorySlug": "mala",
    "variantType": "piece",
    "tags": [
      "Mala",
      "Sphatik Mala",
      "स्फटिक माला",
      "per mala"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 46,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-sphatik-mala-std",
        "sku": "RAM-SPM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per mala"
        },
        "price": 1650,
        "compareAtPrice": 1980,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-sphatik-mala-prm",
        "sku": "RAM-SPM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per mala"
        },
        "price": 3000,
        "compareAtPrice": 3750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-chandan-mala",
    "slug": "chandan-mala",
    "name": "Chandan Mala",
    "nameHi": "चंदन माला",
    "description": "Chandan Mala (चंदन माला) — Authentic mala essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per mala.",
    "price": 800,
    "mrp": 960,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mala",
    "categorySlug": "mala",
    "variantType": "piece",
    "tags": [
      "Mala",
      "Chandan Mala",
      "चंदन माला",
      "per mala"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 49,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-chandan-mala-std",
        "sku": "RAM-CDM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per mala"
        },
        "price": 800,
        "compareAtPrice": 960,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-chandan-mala-prm",
        "sku": "RAM-CDM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per mala"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-lotus-seed-mala",
    "slug": "lotus-seed-mala",
    "name": "Lotus Seed Mala",
    "nameHi": "कमल बीज माला",
    "description": "Lotus Seed Mala (कमल बीज माला) — Authentic mala essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per mala.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mala",
    "categorySlug": "mala",
    "variantType": "piece",
    "tags": [
      "Mala",
      "Lotus Seed Mala",
      "कमल बीज माला",
      "per mala"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 52,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-lotus-seed-mala-std",
        "sku": "RAM-LSM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per mala"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-lotus-seed-mala-prm",
        "sku": "RAM-LSM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per mala"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-vaijanti-mala",
    "slug": "vaijanti-mala",
    "name": "Vaijanti Mala",
    "nameHi": "वैजयन्ती माला",
    "description": "Vaijanti Mala (वैजयन्ती माला) — Authentic mala essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per mala.",
    "price": 325,
    "mrp": 390,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mala",
    "categorySlug": "mala",
    "variantType": "piece",
    "tags": [
      "Mala",
      "Vaijanti Mala",
      "वैजयन्ती माला",
      "per mala"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 15,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-vaijanti-mala-std",
        "sku": "RAM-VJM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per mala"
        },
        "price": 325,
        "compareAtPrice": 390,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-vaijanti-mala-prm",
        "sku": "RAM-VJM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per mala"
        },
        "price": 600,
        "compareAtPrice": 750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-crystal-mala",
    "slug": "crystal-mala",
    "name": "Crystal Mala",
    "nameHi": "क्रिस्टल माला",
    "description": "Crystal Mala (क्रिस्टल माला) — Authentic mala essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per mala.",
    "price": 1900,
    "mrp": 2280,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mala",
    "categorySlug": "mala",
    "variantType": "piece",
    "tags": [
      "Mala",
      "Crystal Mala",
      "क्रिस्टल माला",
      "per mala"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 18,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-crystal-mala-std",
        "sku": "RAM-CRM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per mala"
        },
        "price": 1900,
        "compareAtPrice": 2280,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-crystal-mala-prm",
        "sku": "RAM-CRM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per mala"
        },
        "price": 3500,
        "compareAtPrice": 4375,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-pearl-mala",
    "slug": "pearl-mala",
    "name": "Pearl Mala",
    "nameHi": "मोती माला",
    "description": "Pearl Mala (मोती माला) — Authentic mala essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per mala.",
    "price": 1600,
    "mrp": 1920,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mala",
    "categorySlug": "mala",
    "variantType": "piece",
    "tags": [
      "Mala",
      "Pearl Mala",
      "मोती माला",
      "per mala"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 21,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-pearl-mala-std",
        "sku": "RAM-PRM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per mala"
        },
        "price": 1600,
        "compareAtPrice": 1920,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-pearl-mala-prm",
        "sku": "RAM-PRM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per mala"
        },
        "price": 3000,
        "compareAtPrice": 3750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ram-darbar-murti",
    "slug": "ram-darbar-murti",
    "name": "Ram Darbar",
    "nameHi": "राम दरबार",
    "description": "Ram Darbar (राम दरबार) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: brass 5 in to marble 4 ft.",
    "price": 125200,
    "mrp": 150240,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Ram Darbar",
      "राम दरबार",
      "brass 5 in to marble 4 ft"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 24,
    "inStock": true,
    "isFeatured": true,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-ram-darbar-murti-brass",
        "sku": "RAM-RDM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "brass 5 in to marble 4 ft"
        },
        "price": 125200,
        "compareAtPrice": 150240,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-ram-darbar-murti-marble",
        "sku": "RAM-RDM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "brass 5 in to marble 4 ft"
        },
        "price": 250000,
        "compareAtPrice": 312500,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-radha-krishna-murti",
    "slug": "radha-krishna-murti",
    "name": "Radha Krishna",
    "nameHi": "राधा कृष्ण",
    "description": "Radha Krishna (राधा कृष्ण) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: marble, 1 ft to 3.5 ft (per pair).",
    "price": 82001,
    "mrp": 98401,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Radha Krishna",
      "राधा कृष्ण",
      "marble, 1 ft to 3.5 ft (per pair)"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 5,
    "reviewCount": 27,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-radha-krishna-murti-brass",
        "sku": "RAM-RKM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "marble, 1 ft to 3.5 ft (per pair)"
        },
        "price": 82001,
        "compareAtPrice": 98401,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-radha-krishna-murti-marble",
        "sku": "RAM-RKM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "marble, 1 ft to 3.5 ft (per pair)"
        },
        "price": 151001,
        "compareAtPrice": 188751,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-laddu-gopal-murti",
    "slug": "laddu-gopal-murti",
    "name": "Laddu Gopal",
    "nameHi": "लड्डू गोपाल",
    "description": "Laddu Gopal (लड्डू गोपाल) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece (brass/ashtadhatu).",
    "price": 1550,
    "mrp": 1860,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Laddu Gopal",
      "लड्डू गोपाल",
      "per piece (brass/ashtadhatu)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 30,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-laddu-gopal-murti-brass",
        "sku": "RAM-LGM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "per piece (brass/ashtadhatu)"
        },
        "price": 1550,
        "compareAtPrice": 1860,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-laddu-gopal-murti-marble",
        "sku": "RAM-LGM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "per piece (brass/ashtadhatu)"
        },
        "price": 3000,
        "compareAtPrice": 3750,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-hanuman-ji-murti",
    "slug": "hanuman-ji-murti",
    "name": "Hanuman Ji",
    "nameHi": "हनुमान जी",
    "description": "Hanuman Ji (हनुमान जी) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: brass Panchmukhi to marble 3 ft.",
    "price": 63825,
    "mrp": 76590,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Hanuman Ji",
      "हनुमान जी",
      "brass Panchmukhi to marble 3 ft"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 33,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-hanuman-ji-murti-brass",
        "sku": "RAM-HJM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "brass Panchmukhi to marble 3 ft"
        },
        "price": 63825,
        "compareAtPrice": 76590,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-hanuman-ji-murti-marble",
        "sku": "RAM-HJM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "brass Panchmukhi to marble 3 ft"
        },
        "price": 125000,
        "compareAtPrice": 156250,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-shiv-ji-murti",
    "slug": "shiv-ji-murti",
    "name": "Shiv Ji",
    "nameHi": "शिव जी",
    "description": "Shiv Ji (शिव जी) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 50250,
    "mrp": 60300,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Shiv Ji",
      "शिव जी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 36,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-shiv-ji-murti-brass",
        "sku": "RAM-SJM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "per piece"
        },
        "price": 50250,
        "compareAtPrice": 60300,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-shiv-ji-murti-marble",
        "sku": "RAM-SJM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "per piece"
        },
        "price": 100000,
        "compareAtPrice": 125000,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ganesh-ji-murti",
    "slug": "ganesh-ji-murti",
    "name": "Ganesh Ji",
    "nameHi": "गणेश जी",
    "description": "Ganesh Ji (गणेश जी) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: brass small to marble large.",
    "price": 60558,
    "mrp": 72670,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Ganesh Ji",
      "गणेश जी",
      "brass small to marble large"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 39,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "weight": "brass small to marble large",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-ganesh-ji-murti-brass",
        "sku": "RAM-GJM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "brass small to marble large"
        },
        "price": 60558,
        "compareAtPrice": 72670,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-ganesh-ji-murti-marble",
        "sku": "RAM-GJM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "brass small to marble large"
        },
        "price": 121000,
        "compareAtPrice": 151250,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-durga-mata-murti",
    "slug": "durga-mata-murti",
    "name": "Durga Mata",
    "nameHi": "दुर्गा माता",
    "description": "Durga Mata (दुर्गा माता) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 50400,
    "mrp": 60480,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Durga Mata",
      "दुर्गा माता",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 42,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-durga-mata-murti-brass",
        "sku": "RAM-DMM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "per piece"
        },
        "price": 50400,
        "compareAtPrice": 60480,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-durga-mata-murti-marble",
        "sku": "RAM-DMM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "per piece"
        },
        "price": 100000,
        "compareAtPrice": 125000,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-lakshmi-ji-murti",
    "slug": "lakshmi-ji-murti",
    "name": "Lakshmi Ji",
    "nameHi": "लक्ष्मी जी",
    "description": "Lakshmi Ji (लक्ष्मी जी) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 50250,
    "mrp": 60300,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Lakshmi Ji",
      "लक्ष्मी जी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 45,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-lakshmi-ji-murti-brass",
        "sku": "RAM-LJM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "per piece"
        },
        "price": 50250,
        "compareAtPrice": 60300,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-lakshmi-ji-murti-marble",
        "sku": "RAM-LJM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "per piece"
        },
        "price": 100000,
        "compareAtPrice": 125000,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-saraswati-ji-murti",
    "slug": "saraswati-ji-murti",
    "name": "Saraswati Ji",
    "nameHi": "सरस्वती जी",
    "description": "Saraswati Ji (सरस्वती जी) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 50250,
    "mrp": 60300,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Saraswati Ji",
      "सरस्वती जी",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.85,
    "reviewCount": 48,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-saraswati-ji-murti-brass",
        "sku": "RAM-SRM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "per piece"
        },
        "price": 50250,
        "compareAtPrice": 60300,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-saraswati-ji-murti-marble",
        "sku": "RAM-SRM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "per piece"
        },
        "price": 100000,
        "compareAtPrice": 125000,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-balaji-murti",
    "slug": "balaji-murti",
    "name": "Balaji",
    "nameHi": "बालाजी",
    "description": "Balaji (बालाजी) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 25400,
    "mrp": 30480,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Balaji",
      "बालाजी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 51,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-balaji-murti-brass",
        "sku": "RAM-BLM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "per piece"
        },
        "price": 25400,
        "compareAtPrice": 30480,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-balaji-murti-marble",
        "sku": "RAM-BLM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "per piece"
        },
        "price": 50000,
        "compareAtPrice": 62500,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-sai-baba-murti",
    "slug": "sai-baba-murti",
    "name": "Sai Baba",
    "nameHi": "साईं बाबा",
    "description": "Sai Baba (साईं बाबा) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: small to marble large.",
    "price": 97750,
    "mrp": 117300,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Sai Baba",
      "साईं बाबा",
      "small to marble large"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 54,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "weight": "small to marble large",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-sai-baba-murti-brass",
        "sku": "RAM-SBM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "small to marble large"
        },
        "price": 97750,
        "compareAtPrice": 117300,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-sai-baba-murti-marble",
        "sku": "RAM-SBM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "small to marble large"
        },
        "price": 195000,
        "compareAtPrice": 243750,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-nandi-murti",
    "slug": "nandi-murti",
    "name": "Nandi",
    "nameHi": "नंदी",
    "description": "Nandi (नंदी) — Authentic murti essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 15150,
    "mrp": 18180,
    "image": "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Murti",
    "categorySlug": "murti",
    "variantType": "material_size",
    "tags": [
      "Murti",
      "Nandi",
      "नंदी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 17,
    "inStock": true,
    "isFeatured": false,
    "material": "Pure Brass / Makrana Marble",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-nandi-murti-brass",
        "sku": "RAM-NDM-STD-BRS",
        "variantName": "Brass (Medium)",
        "attributes": {
          "material": "Brass",
          "size": "Medium",
          "unit": "per piece"
        },
        "price": 15150,
        "compareAtPrice": 18180,
        "stock": 10,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-nandi-murti-marble",
        "sku": "RAM-NDM-STD-MBL",
        "variantName": "Marble (Large)",
        "attributes": {
          "material": "Marble",
          "size": "Large",
          "unit": "per piece"
        },
        "price": 30000,
        "compareAtPrice": 37500,
        "stock": 5,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-wooden-temple",
    "slug": "wooden-temple",
    "name": "Wooden Temple",
    "nameHi": "लकड़ी का मंदिर",
    "description": "Wooden Temple (लकड़ी का मंदिर) — Authentic mandir essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 18825,
    "mrp": 22590,
    "image": "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mandir",
    "categorySlug": "mandir",
    "variantType": "size",
    "tags": [
      "Mandir",
      "Wooden Temple",
      "लकड़ी का मंदिर",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 20,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-wooden-temple-small",
        "sku": "RAM-WDT-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per piece"
        },
        "price": 18825,
        "compareAtPrice": 22590,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-wooden-temple-large",
        "sku": "RAM-WDT-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per piece"
        },
        "price": 35999,
        "compareAtPrice": 44999,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-marble-temple",
    "slug": "marble-temple",
    "name": "Marble Temple",
    "nameHi": "संगमरमर का मंदिर",
    "description": "Marble Temple (संगमरमर का मंदिर) — Authentic mandir essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 82500,
    "mrp": 99000,
    "image": "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mandir",
    "categorySlug": "mandir",
    "variantType": "size",
    "tags": [
      "Mandir",
      "Marble Temple",
      "संगमरमर का मंदिर",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 23,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-marble-temple-small",
        "sku": "RAM-MBT-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per piece"
        },
        "price": 82500,
        "compareAtPrice": 99000,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-marble-temple-large",
        "sku": "RAM-MBT-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per piece"
        },
        "price": 150000,
        "compareAtPrice": 187500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-mdf-temple",
    "slug": "mdf-temple",
    "name": "MDF Temple",
    "nameHi": "एमडीएफ मंदिर",
    "description": "MDF Temple (एमडीएफ मंदिर) — Authentic mandir essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 9125,
    "mrp": 10950,
    "image": "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mandir",
    "categorySlug": "mandir",
    "variantType": "size",
    "tags": [
      "Mandir",
      "MDF Temple",
      "एमडीएफ मंदिर",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 26,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-mdf-temple-small",
        "sku": "RAM-MDT-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per piece"
        },
        "price": 9125,
        "compareAtPrice": 10950,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-mdf-temple-large",
        "sku": "RAM-MDT-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per piece"
        },
        "price": 18000,
        "compareAtPrice": 22500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-wall-mounted-temple",
    "slug": "wall-mounted-temple",
    "name": "Wall Mounted Temple",
    "nameHi": "वॉल माउंटेड मंदिर",
    "description": "Wall Mounted Temple (वॉल माउंटेड मंदिर) — Authentic mandir essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 6285,
    "mrp": 7542,
    "image": "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mandir",
    "categorySlug": "mandir",
    "variantType": "size",
    "tags": [
      "Mandir",
      "Wall Mounted Temple",
      "वॉल माउंटेड मंदिर",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.95,
    "reviewCount": 29,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-wall-mounted-temple-small",
        "sku": "RAM-WMT-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per piece"
        },
        "price": 6285,
        "compareAtPrice": 7542,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-wall-mounted-temple-large",
        "sku": "RAM-WMT-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per piece"
        },
        "price": 12219,
        "compareAtPrice": 15274,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-floor-temple",
    "slug": "floor-temple",
    "name": "Floor Temple",
    "nameHi": "फ्लोर मंदिर",
    "description": "Floor Temple (फ्लोर मंदिर) — Authentic mandir essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 18409,
    "mrp": 22091,
    "image": "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mandir",
    "categorySlug": "mandir",
    "variantType": "size",
    "tags": [
      "Mandir",
      "Floor Temple",
      "फ्लोर मंदिर",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 32,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-floor-temple-small",
        "sku": "RAM-FLT-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per piece"
        },
        "price": 18409,
        "compareAtPrice": 22091,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-floor-temple-large",
        "sku": "RAM-FLT-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per piece"
        },
        "price": 30499,
        "compareAtPrice": 38124,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-foldable-temple",
    "slug": "foldable-temple",
    "name": "Foldable Temple",
    "nameHi": "फोल्डेबल मंदिर",
    "description": "Foldable Temple (फोल्डेबल मंदिर) — Authentic mandir essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece (MDF, ~1 ft).",
    "price": 425,
    "mrp": 531,
    "image": "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1545232979-fbf5929de441?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Mandir",
    "categorySlug": "mandir",
    "variantType": "single",
    "tags": [
      "Mandir",
      "Foldable Temple",
      "फोल्डेबल मंदिर",
      "per piece (MDF, ~1 ft)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 35,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-foldable-temple-std",
        "sku": "RAM-FDT-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece (MDF, ~1 ft)"
        },
        "price": 425,
        "compareAtPrice": 531,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-dakshinavarti-shankh",
    "slug": "dakshinavarti-shankh",
    "name": "Dakshinavarti Shankh",
    "nameHi": "दक्षिणावर्ती शंख",
    "description": "Dakshinavarti Shankh (दक्षिणावर्ती शंख) — Authentic shankh & bells essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece (size dependent).",
    "price": 5593,
    "mrp": 6712,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Shankh & Bells",
    "categorySlug": "shankh-bells",
    "variantType": "size",
    "tags": [
      "Shankh & Bells",
      "Dakshinavarti Shankh",
      "दक्षिणावर्ती शंख",
      "per piece (size dependent)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 38,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-dakshinavarti-shankh-small",
        "sku": "RAM-DSH-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per piece (size dependent)"
        },
        "price": 5593,
        "compareAtPrice": 6712,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-dakshinavarti-shankh-large",
        "sku": "RAM-DSH-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per piece (size dependent)"
        },
        "price": 11000,
        "compareAtPrice": 13750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-puja-shankh",
    "slug": "puja-shankh",
    "name": "Puja Shankh",
    "nameHi": "पूजा शंख",
    "description": "Puja Shankh (पूजा शंख) — Authentic shankh & bells essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Shankh & Bells",
    "categorySlug": "shankh-bells",
    "variantType": "piece",
    "tags": [
      "Shankh & Bells",
      "Puja Shankh",
      "पूजा शंख",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 41,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-puja-shankh-std",
        "sku": "RAM-PSH-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-puja-shankh-prm",
        "sku": "RAM-PSH-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-brass-bell",
    "slug": "brass-bell",
    "name": "Brass Bell",
    "nameHi": "पीतल की घंटी",
    "description": "Brass Bell (पीतल की घंटी) — Authentic shankh & bells essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 675,
    "mrp": 810,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Shankh & Bells",
    "categorySlug": "shankh-bells",
    "variantType": "piece",
    "tags": [
      "Shankh & Bells",
      "Brass Bell",
      "पीतल की घंटी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 44,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-brass-bell-std",
        "sku": "RAM-BBL-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 675,
        "compareAtPrice": 810,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-brass-bell-prm",
        "sku": "RAM-BBL-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1199,
        "compareAtPrice": 1499,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-hanging-bell",
    "slug": "hanging-bell",
    "name": "Hanging Bell",
    "nameHi": "लटकन घंटी",
    "description": "Hanging Bell (लटकन घंटी) — Authentic shankh & bells essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 500g to 11 kg.",
    "price": 9768,
    "mrp": 11722,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Shankh & Bells",
    "categorySlug": "shankh-bells",
    "variantType": "weight",
    "tags": [
      "Shankh & Bells",
      "Hanging Bell",
      "लटकन घंटी",
      "500g to 11 kg"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 47,
    "inStock": true,
    "isFeatured": false,
    "weight": "500g to 11 kg",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-hanging-bell-w1",
        "sku": "RAM-HBL-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "500g to 11 kg"
        },
        "price": 9768,
        "compareAtPrice": 11722,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-hanging-bell-w2",
        "sku": "RAM-HBL-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "500g to 11 kg"
        },
        "price": 18370,
        "compareAtPrice": 22963,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-brass-ghanti",
    "slug": "brass-ghanti",
    "name": "Brass Ghanti",
    "nameHi": "पीतल की घण्टी",
    "description": "Brass Ghanti (पीतल की घण्टी) — Authentic shankh & bells essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1099,
    "mrp": 1319,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Shankh & Bells",
    "categorySlug": "shankh-bells",
    "variantType": "piece",
    "tags": [
      "Shankh & Bells",
      "Brass Ghanti",
      "पीतल की घण्टी",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 50,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-brass-ghanti-std",
        "sku": "RAM-BGH-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1099,
        "compareAtPrice": 1319,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-brass-ghanti-prm",
        "sku": "RAM-BGH-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1199,
        "compareAtPrice": 1499,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-lota",
    "slug": "lota",
    "name": "Lota",
    "nameHi": "लोटा",
    "description": "Lota (लोटा) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 900,
    "mrp": 1080,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "piece",
    "tags": [
      "Brass & Copper Items",
      "Lota",
      "लोटा",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 53,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-lota-std",
        "sku": "RAM-LTA-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 900,
        "compareAtPrice": 1080,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-lota-prm",
        "sku": "RAM-LTA-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kalash",
    "slug": "kalash",
    "name": "Kalash",
    "nameHi": "कलश",
    "description": "Kalash (कलश) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1350,
    "mrp": 1620,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "piece",
    "tags": [
      "Brass & Copper Items",
      "Kalash",
      "कलश",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 16,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-kalash-std",
        "sku": "RAM-KLS-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1350,
        "compareAtPrice": 1620,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kalash-prm",
        "sku": "RAM-KLS-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-panchpatra",
    "slug": "panchpatra",
    "name": "Panchpatra",
    "nameHi": "पंचपात्र",
    "description": "Panchpatra (पंचपात्र) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 330,
    "mrp": 396,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "piece",
    "tags": [
      "Brass & Copper Items",
      "Panchpatra",
      "पंचपात्र",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 19,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-panchpatra-std",
        "sku": "RAM-PNP-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 330,
        "compareAtPrice": 396,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-panchpatra-prm",
        "sku": "RAM-PNP-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-achmani",
    "slug": "achmani",
    "name": "Achmani",
    "nameHi": "अचमनी",
    "description": "Achmani (अचमनी) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece (copper).",
    "price": 85,
    "mrp": 102,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "piece",
    "tags": [
      "Brass & Copper Items",
      "Achmani",
      "अचमनी",
      "per piece (copper)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 22,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-achmani-std",
        "sku": "RAM-ACM-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece (copper)"
        },
        "price": 85,
        "compareAtPrice": 102,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-achmani-prm",
        "sku": "RAM-ACM-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece (copper)"
        },
        "price": 120,
        "compareAtPrice": 150,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-aarti-stand",
    "slug": "aarti-stand",
    "name": "Aarti Stand",
    "nameHi": "आरती स्टैंड",
    "description": "Aarti Stand (आरती स्टैंड) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1400,
    "mrp": 1680,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "piece",
    "tags": [
      "Brass & Copper Items",
      "Aarti Stand",
      "आरती स्टैंड",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 25,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-aarti-stand-std",
        "sku": "RAM-AST-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1400,
        "compareAtPrice": 1680,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-aarti-stand-prm",
        "sku": "RAM-AST-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-brass-copper-bell",
    "slug": "brass-copper-bell",
    "name": "Brass/Copper Bell",
    "nameHi": "घंटी",
    "description": "Brass/Copper Bell (घंटी) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1099,
    "mrp": 1319,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "piece",
    "tags": [
      "Brass & Copper Items",
      "Brass/Copper Bell",
      "घंटी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 28,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-brass-copper-bell-std",
        "sku": "RAM-BCB-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1099,
        "compareAtPrice": 1319,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-brass-copper-bell-prm",
        "sku": "RAM-BCB-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1199,
        "compareAtPrice": 1499,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-brass-plate",
    "slug": "brass-plate",
    "name": "Brass Plate",
    "nameHi": "थाली",
    "description": "Brass Plate (थाली) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: brass plate 8–10 in.",
    "price": 1295,
    "mrp": 1554,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "size",
    "tags": [
      "Brass & Copper Items",
      "Brass Plate",
      "थाली",
      "brass plate 8–10 in"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 31,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-brass-plate-small",
        "sku": "RAM-BPL-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "brass plate 8–10 in"
        },
        "price": 1295,
        "compareAtPrice": 1554,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-brass-plate-large",
        "sku": "RAM-BPL-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "brass plate 8–10 in"
        },
        "price": 1570,
        "compareAtPrice": 1963,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-brass-bowl",
    "slug": "brass-bowl",
    "name": "Bowl",
    "nameHi": "कटोरी",
    "description": "Bowl (कटोरी) — Authentic brass & copper items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 450,
    "mrp": 540,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Brass & Copper Items",
    "categorySlug": "brass-copper-items",
    "variantType": "piece",
    "tags": [
      "Brass & Copper Items",
      "Bowl",
      "कटोरी",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 34,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-brass-bowl-std",
        "sku": "RAM-BWL-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 450,
        "compareAtPrice": 540,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-brass-bowl-prm",
        "sku": "RAM-BWL-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 800,
        "compareAtPrice": 1000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-1-mukhi-rudraksha",
    "slug": "1-mukhi-rudraksha",
    "name": "1 Mukhi Rudraksha",
    "nameHi": "1 मुखी",
    "description": "1 Mukhi Rudraksha (1 मुखी) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bead (half-moon/Indian type).",
    "price": 7825,
    "mrp": 9390,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "1 Mukhi Rudraksha",
      "1 मुखी",
      "per bead (half-moon/Indian type)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 37,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-1-mukhi-rudraksha-std",
        "sku": "RAM-R01-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bead (half-moon/Indian type)"
        },
        "price": 7825,
        "compareAtPrice": 9390,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-1-mukhi-rudraksha-prm",
        "sku": "RAM-R01-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per bead (half-moon/Indian type)"
        },
        "price": 15000,
        "compareAtPrice": 18750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-2-mukhi-rudraksha",
    "slug": "2-mukhi-rudraksha",
    "name": "2 Mukhi Rudraksha",
    "nameHi": "2 मुखी",
    "description": "2 Mukhi Rudraksha (2 मुखी) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bead.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "2 Mukhi Rudraksha",
      "2 मुखी",
      "per bead"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 40,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-2-mukhi-rudraksha-std",
        "sku": "RAM-R02-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bead"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-2-mukhi-rudraksha-prm",
        "sku": "RAM-R02-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per bead"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-3-mukhi-rudraksha",
    "slug": "3-mukhi-rudraksha",
    "name": "3 Mukhi Rudraksha",
    "nameHi": "3 मुखी",
    "description": "3 Mukhi Rudraksha (3 मुखी) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bead.",
    "price": 1000,
    "mrp": 1200,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "3 Mukhi Rudraksha",
      "3 मुखी",
      "per bead"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 43,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-3-mukhi-rudraksha-std",
        "sku": "RAM-R03-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bead"
        },
        "price": 1000,
        "compareAtPrice": 1200,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-3-mukhi-rudraksha-prm",
        "sku": "RAM-R03-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per bead"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-5-mukhi-rudraksha",
    "slug": "5-mukhi-rudraksha",
    "name": "5 Mukhi Rudraksha",
    "nameHi": "5 मुखी",
    "description": "5 Mukhi Rudraksha (5 मुखी) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bead.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "5 Mukhi Rudraksha",
      "5 मुखी",
      "per bead"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 46,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-5-mukhi-rudraksha-std",
        "sku": "RAM-R05-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bead"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-5-mukhi-rudraksha-prm",
        "sku": "RAM-R05-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per bead"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-7-mukhi-rudraksha",
    "slug": "7-mukhi-rudraksha",
    "name": "7 Mukhi Rudraksha",
    "nameHi": "7 मुखी",
    "description": "7 Mukhi Rudraksha (7 मुखी) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bead.",
    "price": 1150,
    "mrp": 1380,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "7 Mukhi Rudraksha",
      "7 मुखी",
      "per bead"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 49,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-7-mukhi-rudraksha-std",
        "sku": "RAM-R07-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bead"
        },
        "price": 1150,
        "compareAtPrice": 1380,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-7-mukhi-rudraksha-prm",
        "sku": "RAM-R07-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per bead"
        },
        "price": 1800,
        "compareAtPrice": 2250,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-11-mukhi-rudraksha",
    "slug": "11-mukhi-rudraksha",
    "name": "11 Mukhi Rudraksha",
    "nameHi": "11 मुखी",
    "description": "11 Mukhi Rudraksha (11 मुखी) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bead.",
    "price": 7900,
    "mrp": 9480,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "11 Mukhi Rudraksha",
      "11 मुखी",
      "per bead"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 5,
    "reviewCount": 52,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-11-mukhi-rudraksha-std",
        "sku": "RAM-R11-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bead"
        },
        "price": 7900,
        "compareAtPrice": 9480,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-11-mukhi-rudraksha-prm",
        "sku": "RAM-R11-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per bead"
        },
        "price": 13799,
        "compareAtPrice": 17249,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-rudraksha-bracelet",
    "slug": "rudraksha-bracelet",
    "name": "Rudraksha Bracelet",
    "nameHi": "रुद्राक्ष ब्रेसलेट",
    "description": "Rudraksha Bracelet (रुद्राक्ष ब्रेसलेट) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1813,
    "mrp": 2176,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "Rudraksha Bracelet",
      "रुद्राक्ष ब्रेसलेट",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 15,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-rudraksha-bracelet-std",
        "sku": "RAM-RBR-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1813,
        "compareAtPrice": 2176,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-rudraksha-bracelet-prm",
        "sku": "RAM-RBR-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2500,
        "compareAtPrice": 3125,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-rudraksha-mala",
    "slug": "rudraksha-mala",
    "name": "Rudraksha Mala",
    "nameHi": "रुद्राक्ष माला",
    "description": "Rudraksha Mala (रुद्राक्ष माला) — Authentic rudraksha collection essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 108 beads (5 mukhi).",
    "price": 8250,
    "mrp": 9900,
    "image": "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Rudraksha Collection",
    "categorySlug": "rudraksha-collection",
    "variantType": "piece",
    "tags": [
      "Rudraksha Collection",
      "Rudraksha Mala",
      "रुद्राक्ष माला",
      "108 beads (5 mukhi)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 18,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-rudraksha-mala-std",
        "sku": "RAM-RML-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "108 beads (5 mukhi)"
        },
        "price": 8250,
        "compareAtPrice": 9900,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-rudraksha-mala-prm",
        "sku": "RAM-RML-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "108 beads (5 mukhi)"
        },
        "price": 15000,
        "compareAtPrice": 18750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-shree-yantra",
    "slug": "shree-yantra",
    "name": "Shree Yantra",
    "nameHi": "श्री यंत्र",
    "description": "Shree Yantra (श्री यंत्र) — Authentic yantra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: gold-polish 3in to Parad Meru 100g.",
    "price": 1050,
    "mrp": 1260,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Yantra",
    "categorySlug": "yantra",
    "variantType": "size",
    "tags": [
      "Yantra",
      "Shree Yantra",
      "श्री यंत्र",
      "gold-polish 3in to Parad Meru 100g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 21,
    "inStock": true,
    "isFeatured": false,
    "weight": "gold-polish 3in to Parad Meru 100g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-shree-yantra-small",
        "sku": "RAM-SYN-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "gold-polish 3in to Parad Meru 100g"
        },
        "price": 1050,
        "compareAtPrice": 1260,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-shree-yantra-large",
        "sku": "RAM-SYN-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "gold-polish 3in to Parad Meru 100g"
        },
        "price": 2000,
        "compareAtPrice": 2500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kuber-yantra",
    "slug": "kuber-yantra",
    "name": "Kuber Yantra",
    "nameHi": "कुबेर यंत्र",
    "description": "Kuber Yantra (कुबेर यंत्र) — Authentic yantra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 3x3 in to 6x6 in, gold polish.",
    "price": 175,
    "mrp": 210,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Yantra",
    "categorySlug": "yantra",
    "variantType": "size",
    "tags": [
      "Yantra",
      "Kuber Yantra",
      "कुबेर यंत्र",
      "3x3 in to 6x6 in, gold polish"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 24,
    "inStock": true,
    "isFeatured": false,
    "weight": "3x3 in to 6x6 in, gold polish",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-kuber-yantra-small",
        "sku": "RAM-KYN-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 175,
        "compareAtPrice": 210,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kuber-yantra-large",
        "sku": "RAM-KYN-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-maha-mrityunjaya-yantra",
    "slug": "maha-mrityunjaya-yantra",
    "name": "Maha Mrityunjaya Yantra",
    "nameHi": "महामृत्युंजय यंत्र",
    "description": "Maha Mrityunjaya Yantra (महामृत्युंजय यंत्र) — Authentic yantra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 3x3 in to 6x6 in, gold polish.",
    "price": 175,
    "mrp": 210,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Yantra",
    "categorySlug": "yantra",
    "variantType": "size",
    "tags": [
      "Yantra",
      "Maha Mrityunjaya Yantra",
      "महामृत्युंजय यंत्र",
      "3x3 in to 6x6 in, gold polish"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 27,
    "inStock": true,
    "isFeatured": false,
    "weight": "3x3 in to 6x6 in, gold polish",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-maha-mrityunjaya-yantra-small",
        "sku": "RAM-MYN-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 175,
        "compareAtPrice": 210,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-maha-mrityunjaya-yantra-large",
        "sku": "RAM-MYN-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-navgraha-yantra",
    "slug": "navgraha-yantra",
    "name": "Navgraha Yantra",
    "nameHi": "नवग्रह यंत्र",
    "description": "Navgraha Yantra (नवग्रह यंत्र) — Authentic yantra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 3x3 in to 6x6 in, gold polish.",
    "price": 175,
    "mrp": 210,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Yantra",
    "categorySlug": "yantra",
    "variantType": "size",
    "tags": [
      "Yantra",
      "Navgraha Yantra",
      "नवग्रह यंत्र",
      "3x3 in to 6x6 in, gold polish"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 30,
    "inStock": true,
    "isFeatured": false,
    "weight": "3x3 in to 6x6 in, gold polish",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-navgraha-yantra-small",
        "sku": "RAM-NYN-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 175,
        "compareAtPrice": 210,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-navgraha-yantra-large",
        "sku": "RAM-NYN-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-vastu-yantra",
    "slug": "vastu-yantra",
    "name": "Vastu Yantra",
    "nameHi": "वास्तु यंत्र",
    "description": "Vastu Yantra (वास्तु यंत्र) — Authentic yantra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 3x3 in to 6x6 in, gold polish.",
    "price": 175,
    "mrp": 210,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Yantra",
    "categorySlug": "yantra",
    "variantType": "size",
    "tags": [
      "Yantra",
      "Vastu Yantra",
      "वास्तु यंत्र",
      "3x3 in to 6x6 in, gold polish"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.85,
    "reviewCount": 33,
    "inStock": true,
    "isFeatured": false,
    "weight": "3x3 in to 6x6 in, gold polish",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-vastu-yantra-small",
        "sku": "RAM-VYN-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 175,
        "compareAtPrice": 210,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-vastu-yantra-large",
        "sku": "RAM-VYN-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-saraswati-yantra",
    "slug": "saraswati-yantra",
    "name": "Saraswati Yantra",
    "nameHi": "सरस्वती यंत्र",
    "description": "Saraswati Yantra (सरस्वती यंत्र) — Authentic yantra essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 3x3 in to 6x6 in, gold polish.",
    "price": 175,
    "mrp": 210,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Yantra",
    "categorySlug": "yantra",
    "variantType": "size",
    "tags": [
      "Yantra",
      "Saraswati Yantra",
      "सरस्वती यंत्र",
      "3x3 in to 6x6 in, gold polish"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 36,
    "inStock": true,
    "isFeatured": false,
    "weight": "3x3 in to 6x6 in, gold polish",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-saraswati-yantra-small",
        "sku": "RAM-SAN-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 175,
        "compareAtPrice": 210,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-saraswati-yantra-large",
        "sku": "RAM-SAN-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "3x3 in to 6x6 in, gold polish"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ramayan",
    "slug": "ramayan",
    "name": "Ramayan",
    "nameHi": "रामायण",
    "description": "Ramayan (रामायण) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: Ramcharitmanas, Gita Press.",
    "price": 240,
    "mrp": 300,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "single",
    "tags": [
      "Books & Scriptures",
      "Ramayan",
      "रामायण",
      "Ramcharitmanas, Gita Press"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 39,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-ramayan-std",
        "sku": "RAM-RAM-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "Ramcharitmanas, Gita Press"
        },
        "price": 240,
        "compareAtPrice": 300,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-bhagavad-gita",
    "slug": "bhagavad-gita",
    "name": "Bhagavad Gita",
    "nameHi": "भगवद्गीता",
    "description": "Bhagavad Gita (भगवद्गीता) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: Gita Press.",
    "price": 119,
    "mrp": 149,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "single",
    "tags": [
      "Books & Scriptures",
      "Bhagavad Gita",
      "भगवद्गीता",
      "Gita Press"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 42,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-bhagavad-gita-std",
        "sku": "RAM-BGT-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "Gita Press"
        },
        "price": 119,
        "compareAtPrice": 149,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-hanuman-chalisa",
    "slug": "hanuman-chalisa",
    "name": "Hanuman Chalisa",
    "nameHi": "हनुमान चालीसा",
    "description": "Hanuman Chalisa (हनुमान चालीसा) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: Gita Press (pocket to larger).",
    "price": 48,
    "mrp": 58,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "size",
    "tags": [
      "Books & Scriptures",
      "Hanuman Chalisa",
      "हनुमान चालीसा",
      "Gita Press (pocket to larger)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 45,
    "inStock": true,
    "isFeatured": false,
    "weight": "Gita Press (pocket to larger)",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-hanuman-chalisa-small",
        "sku": "RAM-HCH-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "Gita Press (pocket to larger)"
        },
        "price": 48,
        "compareAtPrice": 58,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-hanuman-chalisa-large",
        "sku": "RAM-HCH-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "Gita Press (pocket to larger)"
        },
        "price": 92,
        "compareAtPrice": 115,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-sundarkand",
    "slug": "sundarkand",
    "name": "Sundarkand",
    "nameHi": "सुंदरकांड",
    "description": "Sundarkand (सुंदरकांड) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: Gita Press.",
    "price": 55,
    "mrp": 69,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "single",
    "tags": [
      "Books & Scriptures",
      "Sundarkand",
      "सुंदरकांड",
      "Gita Press"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 48,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-sundarkand-std",
        "sku": "RAM-SDK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "Gita Press"
        },
        "price": 55,
        "compareAtPrice": 69,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-shiv-chalisa",
    "slug": "shiv-chalisa",
    "name": "Shiv Chalisa",
    "nameHi": "शिव चालीसा",
    "description": "Shiv Chalisa (शिव चालीसा) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: booklet.",
    "price": 28,
    "mrp": 35,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "single",
    "tags": [
      "Books & Scriptures",
      "Shiv Chalisa",
      "शिव चालीसा",
      "booklet"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 51,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-shiv-chalisa-std",
        "sku": "RAM-SCH-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "booklet"
        },
        "price": 28,
        "compareAtPrice": 35,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-vishnu-sahasranama",
    "slug": "vishnu-sahasranama",
    "name": "Vishnu Sahasranama",
    "nameHi": "विष्णु सहस्रनाम",
    "description": "Vishnu Sahasranama (विष्णु सहस्रनाम) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: booklet / book.",
    "price": 80,
    "mrp": 100,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "single",
    "tags": [
      "Books & Scriptures",
      "Vishnu Sahasranama",
      "विष्णु सहस्रनाम",
      "booklet / book"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.95,
    "reviewCount": 54,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-vishnu-sahasranama-std",
        "sku": "RAM-VSH-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "booklet / book"
        },
        "price": 80,
        "compareAtPrice": 100,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-durga-saptashati",
    "slug": "durga-saptashati",
    "name": "Durga Saptashati",
    "nameHi": "दुर्गा सप्तशती",
    "description": "Durga Saptashati (दुर्गा सप्तशती) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: Gita Press.",
    "price": 90,
    "mrp": 113,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "single",
    "tags": [
      "Books & Scriptures",
      "Durga Saptashati",
      "दुर्गा सप्तशती",
      "Gita Press"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 17,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-durga-saptashati-std",
        "sku": "RAM-DSS-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "Gita Press"
        },
        "price": 90,
        "compareAtPrice": 113,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-aarti-sangrah",
    "slug": "aarti-sangrah",
    "name": "Aarti Sangrah",
    "nameHi": "आरती संग्रह",
    "description": "Aarti Sangrah (आरती संग्रह) — Authentic books & scriptures essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: booklet.",
    "price": 55,
    "mrp": 69,
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Books & Scriptures",
    "categorySlug": "books-scriptures",
    "variantType": "single",
    "tags": [
      "Books & Scriptures",
      "Aarti Sangrah",
      "आरती संग्रह",
      "booklet"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 20,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-aarti-sangrah-std",
        "sku": "RAM-ASG-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "booklet"
        },
        "price": 55,
        "compareAtPrice": 69,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-raksha-bandhan-kit",
    "slug": "raksha-bandhan-kit",
    "name": "Raksha Bandhan Kit",
    "nameHi": "रक्षाबंधन किट",
    "description": "Raksha Bandhan Kit (रक्षाबंधन किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 900,
    "mrp": 1125,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Raksha Bandhan Kit",
      "रक्षाबंधन किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 23,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-raksha-bandhan-kit-std",
        "sku": "RAM-RBK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 900,
        "compareAtPrice": 1125,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-janmashtami-kit",
    "slug": "janmashtami-kit",
    "name": "Janmashtami Kit",
    "nameHi": "जन्माष्टमी किट",
    "description": "Janmashtami Kit (जन्माष्टमी किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1050,
    "mrp": 1313,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Janmashtami Kit",
      "जन्माष्टमी किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 26,
    "inStock": true,
    "isFeatured": true,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-janmashtami-kit-std",
        "sku": "RAM-JKT-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1050,
        "compareAtPrice": 1313,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ganesh-chaturthi-kit",
    "slug": "ganesh-chaturthi-kit",
    "name": "Ganesh Chaturthi Kit",
    "nameHi": "गणेश चतुर्थी किट",
    "description": "Ganesh Chaturthi Kit (गणेश चतुर्थी किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1025,
    "mrp": 1281,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Ganesh Chaturthi Kit",
      "गणेश चतुर्थी किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 29,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-ganesh-chaturthi-kit-std",
        "sku": "RAM-GCK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1025,
        "compareAtPrice": 1281,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-navratri-kit",
    "slug": "navratri-kit",
    "name": "Navratri Kit",
    "nameHi": "नवरात्र किट",
    "description": "Navratri Kit (नवरात्र किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1125,
    "mrp": 1406,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Navratri Kit",
      "नवरात्र किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 32,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-navratri-kit-std",
        "sku": "RAM-NRK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1125,
        "compareAtPrice": 1406,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-diwali-kit",
    "slug": "diwali-kit",
    "name": "Diwali Kit",
    "nameHi": "दीवाली किट",
    "description": "Diwali Kit (दीवाली किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1050,
    "mrp": 1313,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Diwali Kit",
      "दीवाली किट",
      "per kit"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 35,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-diwali-kit-std",
        "sku": "RAM-DWK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1050,
        "compareAtPrice": 1313,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-karwa-chauth-kit",
    "slug": "karwa-chauth-kit",
    "name": "Karwa Chauth Kit",
    "nameHi": "करवा चौथ किट",
    "description": "Karwa Chauth Kit (करवा चौथ किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 900,
    "mrp": 1125,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Karwa Chauth Kit",
      "करवा चौथ किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 38,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-karwa-chauth-kit-std",
        "sku": "RAM-KCK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 900,
        "compareAtPrice": 1125,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-shivratri-kit",
    "slug": "shivratri-kit",
    "name": "Shivratri Kit",
    "nameHi": "शिवरात्रि किट",
    "description": "Shivratri Kit (शिवरात्रि किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 750,
    "mrp": 938,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Shivratri Kit",
      "शिवरात्रि किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 41,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-shivratri-kit-std",
        "sku": "RAM-SRK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 750,
        "compareAtPrice": 938,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-ram-navami-kit",
    "slug": "ram-navami-kit",
    "name": "Ram Navami Kit",
    "nameHi": "राम नवमी किट",
    "description": "Ram Navami Kit (राम नवमी किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 750,
    "mrp": 938,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Ram Navami Kit",
      "राम नवमी किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 44,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-ram-navami-kit-std",
        "sku": "RAM-RNK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 750,
        "compareAtPrice": 938,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-holi-pooja-kit",
    "slug": "holi-pooja-kit",
    "name": "Holi Pooja Kit",
    "nameHi": "होली पूजा किट",
    "description": "Holi Pooja Kit (होली पूजा किट) — Authentic festival special essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 600,
    "mrp": 750,
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Festival Special",
    "categorySlug": "festival-special",
    "variantType": "single",
    "tags": [
      "Festival Special",
      "Holi Pooja Kit",
      "होली पूजा किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 47,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-holi-pooja-kit-std",
        "sku": "RAM-HPK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 600,
        "compareAtPrice": 750,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-satyanarayan-kit",
    "slug": "satyanarayan-kit",
    "name": "Satyanarayan Kit",
    "nameHi": "सत्यनारायण किट",
    "description": "Satyanarayan Kit (सत्यनारायण किट) — Authentic pooja kits essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit (30–57 items).",
    "price": 1524,
    "mrp": 1829,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Kits",
    "categorySlug": "pooja-kits",
    "variantType": "pack",
    "tags": [
      "Pooja Kits",
      "Satyanarayan Kit",
      "सत्यनारायण किट",
      "per kit (30–57 items)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 50,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-satyanarayan-kit-p1",
        "sku": "RAM-SNK-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per kit (30–57 items)"
        },
        "price": 1524,
        "compareAtPrice": 1829,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-satyanarayan-kit-p2",
        "sku": "RAM-SNK-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per kit (30–57 items)"
        },
        "price": 2249,
        "compareAtPrice": 2811,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-griha-pravesh-kit",
    "slug": "griha-pravesh-kit",
    "name": "Griha Pravesh Kit",
    "nameHi": "गृह प्रवेश किट",
    "description": "Griha Pravesh Kit (गृह प्रवेश किट) — Authentic pooja kits essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 838,
    "mrp": 1048,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Kits",
    "categorySlug": "pooja-kits",
    "variantType": "single",
    "tags": [
      "Pooja Kits",
      "Griha Pravesh Kit",
      "गृह प्रवेश किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 53,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-griha-pravesh-kit-std",
        "sku": "RAM-GPK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 838,
        "compareAtPrice": 1048,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-rudrabhishek-kit",
    "slug": "rudrabhishek-kit",
    "name": "Rudrabhishek Kit",
    "nameHi": "रुद्राभिषेक किट",
    "description": "Rudrabhishek Kit (रुद्राभिषेक किट) — Authentic pooja kits essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1750,
    "mrp": 2188,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Kits",
    "categorySlug": "pooja-kits",
    "variantType": "single",
    "tags": [
      "Pooja Kits",
      "Rudrabhishek Kit",
      "रुद्राभिषेक किट",
      "per kit"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 16,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-rudrabhishek-kit-std",
        "sku": "RAM-RAK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1750,
        "compareAtPrice": 2188,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-marriage-kit",
    "slug": "marriage-kit",
    "name": "Marriage Kit",
    "nameHi": "विवाह किट",
    "description": "Marriage Kit (विवाह किट) — Authentic pooja kits essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 8250,
    "mrp": 10313,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Kits",
    "categorySlug": "pooja-kits",
    "variantType": "single",
    "tags": [
      "Pooja Kits",
      "Marriage Kit",
      "विवाह किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 19,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-marriage-kit-std",
        "sku": "RAM-MRK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 8250,
        "compareAtPrice": 10313,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-havan-kit",
    "slug": "havan-kit",
    "name": "Havan Kit",
    "nameHi": "हवन किट",
    "description": "Havan Kit (हवन किट) — Authentic pooja kits essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1150,
    "mrp": 1438,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Kits",
    "categorySlug": "pooja-kits",
    "variantType": "single",
    "tags": [
      "Pooja Kits",
      "Havan Kit",
      "हवन किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 22,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-havan-kit-std",
        "sku": "RAM-HVK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1150,
        "compareAtPrice": 1438,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-navgraha-kit",
    "slug": "navgraha-kit",
    "name": "Navgraha Kit",
    "nameHi": "नवग्रह किट",
    "description": "Navgraha Kit (नवग्रह किट) — Authentic pooja kits essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1750,
    "mrp": 2188,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Kits",
    "categorySlug": "pooja-kits",
    "variantType": "single",
    "tags": [
      "Pooja Kits",
      "Navgraha Kit",
      "नवग्रह किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 25,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-navgraha-kit-std",
        "sku": "RAM-NGK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1750,
        "compareAtPrice": 2188,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-lakshmi-pooja-kit",
    "slug": "lakshmi-pooja-kit",
    "name": "Lakshmi Pooja Kit",
    "nameHi": "लक्ष्मी पूजा किट",
    "description": "Lakshmi Pooja Kit (लक्ष्मी पूजा किट) — Authentic pooja kits essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per kit.",
    "price": 1500,
    "mrp": 1875,
    "image": "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609137144822-42173f4b66df?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Pooja Kits",
    "categorySlug": "pooja-kits",
    "variantType": "single",
    "tags": [
      "Pooja Kits",
      "Lakshmi Pooja Kit",
      "लक्ष्मी पूजा किट",
      "per kit"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 28,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-lakshmi-pooja-kit-std",
        "sku": "RAM-LPK-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per kit"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-mishri",
    "slug": "mishri",
    "name": "Mishri",
    "nameHi": "मिश्री",
    "description": "Mishri (मिश्री) — Authentic bhog & prasad essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 250g.",
    "price": 95,
    "mrp": 114,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhog & Prasad",
    "categorySlug": "bhog-prasad",
    "variantType": "weight",
    "tags": [
      "Bhog & Prasad",
      "Mishri",
      "मिश्री",
      "per 250g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 31,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 250g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-mishri-w1",
        "sku": "RAM-MSR-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 250g"
        },
        "price": 95,
        "compareAtPrice": 114,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-mishri-w2",
        "sku": "RAM-MSR-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 250g"
        },
        "price": 150,
        "compareAtPrice": 188,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-makhana",
    "slug": "makhana",
    "name": "Makhana",
    "nameHi": "मखाना",
    "description": "Makhana (मखाना) — Authentic bhog & prasad essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 100g.",
    "price": 275,
    "mrp": 330,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhog & Prasad",
    "categorySlug": "bhog-prasad",
    "variantType": "weight",
    "tags": [
      "Bhog & Prasad",
      "Makhana",
      "मखाना",
      "per 100g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 34,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 100g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-makhana-w1",
        "sku": "RAM-MKH-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 100g"
        },
        "price": 275,
        "compareAtPrice": 330,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-makhana-w2",
        "sku": "RAM-MKH-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 100g"
        },
        "price": 400,
        "compareAtPrice": 500,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-batasha",
    "slug": "batasha",
    "name": "Batasha",
    "nameHi": "बाताशा",
    "description": "Batasha (बाताशा) — Authentic bhog & prasad essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 250g.",
    "price": 80,
    "mrp": 96,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhog & Prasad",
    "categorySlug": "bhog-prasad",
    "variantType": "weight",
    "tags": [
      "Bhog & Prasad",
      "Batasha",
      "बाताशा",
      "per 250g"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 5,
    "reviewCount": 37,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 250g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-batasha-w1",
        "sku": "RAM-BTS-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 250g"
        },
        "price": 80,
        "compareAtPrice": 96,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-batasha-w2",
        "sku": "RAM-BTS-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 250g"
        },
        "price": 120,
        "compareAtPrice": 150,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-dry-fruits",
    "slug": "dry-fruits",
    "name": "Dry Fruits",
    "nameHi": "सूखे मेवे",
    "description": "Dry Fruits (सूखे मेवे) — Authentic bhog & prasad essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 250g.",
    "price": 900,
    "mrp": 1080,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhog & Prasad",
    "categorySlug": "bhog-prasad",
    "variantType": "weight",
    "tags": [
      "Bhog & Prasad",
      "Dry Fruits",
      "सूखे मेवे",
      "per 250g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 40,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 250g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-dry-fruits-w1",
        "sku": "RAM-DRF-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 250g"
        },
        "price": 900,
        "compareAtPrice": 1080,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-dry-fruits-w2",
        "sku": "RAM-DRF-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 250g"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-tulsi-dal",
    "slug": "tulsi-dal",
    "name": "Tulsi Dal",
    "nameHi": "तुलसी दल",
    "description": "Tulsi Dal (तुलसी दल) — Authentic bhog & prasad essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bunch / pack.",
    "price": 55,
    "mrp": 66,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhog & Prasad",
    "categorySlug": "bhog-prasad",
    "variantType": "pack",
    "tags": [
      "Bhog & Prasad",
      "Tulsi Dal",
      "तुलसी दल",
      "per bunch / pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 43,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-tulsi-dal-p1",
        "sku": "RAM-TLD-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per bunch / pack"
        },
        "price": 55,
        "compareAtPrice": 66,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-tulsi-dal-p2",
        "sku": "RAM-TLD-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per bunch / pack"
        },
        "price": 100,
        "compareAtPrice": 125,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-panchmewa",
    "slug": "panchmewa",
    "name": "Panchmewa",
    "nameHi": "पंचमेवा",
    "description": "Panchmewa (पंचमेवा) — Authentic bhog & prasad essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 200g.",
    "price": 325,
    "mrp": 390,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhog & Prasad",
    "categorySlug": "bhog-prasad",
    "variantType": "weight",
    "tags": [
      "Bhog & Prasad",
      "Panchmewa",
      "पंचमेवा",
      "per 200g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 46,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 200g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-panchmewa-w1",
        "sku": "RAM-PCM-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 200g"
        },
        "price": 325,
        "compareAtPrice": 390,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-panchmewa-w2",
        "sku": "RAM-PCM-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 200g"
        },
        "price": 500,
        "compareAtPrice": 625,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-elaichi-dana",
    "slug": "elaichi-dana",
    "name": "Elaichi Dana",
    "nameHi": "इलायची दाना",
    "description": "Elaichi Dana (इलायची दाना) — Authentic bhog & prasad essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 25g.",
    "price": 155,
    "mrp": 186,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Bhog & Prasad",
    "categorySlug": "bhog-prasad",
    "variantType": "weight",
    "tags": [
      "Bhog & Prasad",
      "Elaichi Dana",
      "इलायची दाना",
      "per 25g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 49,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 25g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-elaichi-dana-w1",
        "sku": "RAM-ELD-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 25g"
        },
        "price": 155,
        "compareAtPrice": 186,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-elaichi-dana-w2",
        "sku": "RAM-ELD-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 25g"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-dhoti",
    "slug": "dhoti",
    "name": "Dhoti",
    "nameHi": "धोती",
    "description": "Dhoti (धोती) — Authentic clothing & religious wear essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 821,
    "mrp": 985,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Clothing & Religious Wear",
    "categorySlug": "clothing-religious-wear",
    "variantType": "piece",
    "tags": [
      "Clothing & Religious Wear",
      "Dhoti",
      "धोती",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 52,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-dhoti-std",
        "sku": "RAM-DHT-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 821,
        "compareAtPrice": 985,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-dhoti-prm",
        "sku": "RAM-DHT-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1441,
        "compareAtPrice": 1801,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-kurta",
    "slug": "kurta",
    "name": "Kurta",
    "nameHi": "कुर्ता",
    "description": "Kurta (कुर्ता) — Authentic clothing & religious wear essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1150,
    "mrp": 1380,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Clothing & Religious Wear",
    "categorySlug": "clothing-religious-wear",
    "variantType": "piece",
    "tags": [
      "Clothing & Religious Wear",
      "Kurta",
      "कुर्ता",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 15,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-kurta-std",
        "sku": "RAM-KRT-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1150,
        "compareAtPrice": 1380,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-kurta-prm",
        "sku": "RAM-KRT-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2000,
        "compareAtPrice": 2500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-angavastram",
    "slug": "angavastram",
    "name": "Angavastram",
    "nameHi": "अंगवस्त्रम",
    "description": "Angavastram (अंगवस्त्रम) — Authentic clothing & religious wear essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 550,
    "mrp": 660,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Clothing & Religious Wear",
    "categorySlug": "clothing-religious-wear",
    "variantType": "piece",
    "tags": [
      "Clothing & Religious Wear",
      "Angavastram",
      "अंगवस्त्रम",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.85,
    "reviewCount": 18,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-angavastram-std",
        "sku": "RAM-AGV-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 550,
        "compareAtPrice": 660,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-angavastram-prm",
        "sku": "RAM-AGV-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1000,
        "compareAtPrice": 1250,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-pooja-shawl",
    "slug": "pooja-shawl",
    "name": "Pooja Shawl",
    "nameHi": "पूजा शॉल",
    "description": "Pooja Shawl (पूजा शॉल) — Authentic clothing & religious wear essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Clothing & Religious Wear",
    "categorySlug": "clothing-religious-wear",
    "variantType": "piece",
    "tags": [
      "Clothing & Religious Wear",
      "Pooja Shawl",
      "पूजा शॉल",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 21,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-pooja-shawl-std",
        "sku": "RAM-PSL-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-pooja-shawl-prm",
        "sku": "RAM-PSL-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-gamcha",
    "slug": "gamcha",
    "name": "Gamcha",
    "nameHi": "गमछा",
    "description": "Gamcha (गमछा) — Authentic clothing & religious wear essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 175,
    "mrp": 210,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Clothing & Religious Wear",
    "categorySlug": "clothing-religious-wear",
    "variantType": "piece",
    "tags": [
      "Clothing & Religious Wear",
      "Gamcha",
      "गमछा",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 24,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-gamcha-std",
        "sku": "RAM-GMC-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 175,
        "compareAtPrice": 210,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-gamcha-prm",
        "sku": "RAM-GMC-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 300,
        "compareAtPrice": 375,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-saffron-clothes",
    "slug": "saffron-clothes",
    "name": "Saffron Clothes",
    "nameHi": "भगवा वस्त्र",
    "description": "Saffron Clothes (भगवा वस्त्र) — Authentic clothing & religious wear essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 825,
    "mrp": 990,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Clothing & Religious Wear",
    "categorySlug": "clothing-religious-wear",
    "variantType": "piece",
    "tags": [
      "Clothing & Religious Wear",
      "Saffron Clothes",
      "भगवा वस्त्र",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 27,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-saffron-clothes-std",
        "sku": "RAM-SFC-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 825,
        "compareAtPrice": 990,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-saffron-clothes-prm",
        "sku": "RAM-SFC-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1500,
        "compareAtPrice": 1875,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-temple-priest-dress",
    "slug": "temple-priest-dress",
    "name": "Temple Priest Dress",
    "nameHi": "पुजारी परिधान",
    "description": "Temple Priest Dress (पुजारी परिधान) — Authentic clothing & religious wear essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per set.",
    "price": 2400,
    "mrp": 2880,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Clothing & Religious Wear",
    "categorySlug": "clothing-religious-wear",
    "variantType": "piece",
    "tags": [
      "Clothing & Religious Wear",
      "Temple Priest Dress",
      "पुजारी परिधान",
      "per set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 30,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-temple-priest-dress-std",
        "sku": "RAM-TPD-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per set"
        },
        "price": 2400,
        "compareAtPrice": 2880,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-temple-priest-dress-prm",
        "sku": "RAM-TPD-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per set"
        },
        "price": 4000,
        "compareAtPrice": 5000,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-gomti-chakra",
    "slug": "gomti-chakra",
    "name": "Gomti Chakra",
    "nameHi": "गोमती चक्र",
    "description": "Gomti Chakra (गोमती चक्र) — Authentic spiritual accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece (large ₹250).",
    "price": 130,
    "mrp": 156,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Spiritual Accessories",
    "categorySlug": "spiritual-accessories",
    "variantType": "size",
    "tags": [
      "Spiritual Accessories",
      "Gomti Chakra",
      "गोमती चक्र",
      "per piece (large ₹250)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 33,
    "inStock": true,
    "isFeatured": false,
    "weight": "per piece (large ₹250)",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-gomti-chakra-small",
        "sku": "RAM-GMC-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "per piece (large ₹250)"
        },
        "price": 130,
        "compareAtPrice": 156,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-gomti-chakra-large",
        "sku": "RAM-GMC-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "per piece (large ₹250)"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-cowrie-shell",
    "slug": "cowrie-shell",
    "name": "Cowrie Shell",
    "nameHi": "कौड़ी",
    "description": "Cowrie Shell (कौड़ी) — Authentic spiritual accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece (tiger kaudi ₹250).",
    "price": 128,
    "mrp": 154,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Spiritual Accessories",
    "categorySlug": "spiritual-accessories",
    "variantType": "piece",
    "tags": [
      "Spiritual Accessories",
      "Cowrie Shell",
      "कौड़ी",
      "per piece (tiger kaudi ₹250)"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 36,
    "inStock": true,
    "isFeatured": false,
    "weight": "per piece (tiger kaudi ₹250)",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-cowrie-shell-std",
        "sku": "RAM-CWS-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece (tiger kaudi ₹250)"
        },
        "price": 128,
        "compareAtPrice": 154,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-cowrie-shell-prm",
        "sku": "RAM-CWS-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece (tiger kaudi ₹250)"
        },
        "price": 250,
        "compareAtPrice": 313,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-parad-shivling",
    "slug": "parad-shivling",
    "name": "Parad Shivling",
    "nameHi": "पारद शिवलिंग",
    "description": "Parad Shivling (पारद शिवलिंग) — Authentic spiritual accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 30g to 100g (90% purity).",
    "price": 2638,
    "mrp": 3166,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Spiritual Accessories",
    "categorySlug": "spiritual-accessories",
    "variantType": "weight",
    "tags": [
      "Spiritual Accessories",
      "Parad Shivling",
      "पारद शिवलिंग",
      "30g to 100g (90% purity)"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.95,
    "reviewCount": 39,
    "inStock": true,
    "isFeatured": false,
    "weight": "30g to 100g (90% purity)",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-parad-shivling-w1",
        "sku": "RAM-PRS-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "30g to 100g (90% purity)"
        },
        "price": 2638,
        "compareAtPrice": 3166,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-parad-shivling-w2",
        "sku": "RAM-PRS-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "30g to 100g (90% purity)"
        },
        "price": 4500,
        "compareAtPrice": 5625,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-crystal-shivling",
    "slug": "crystal-shivling",
    "name": "Crystal Shivling",
    "nameHi": "स्फटिक शिवलिंग",
    "description": "Crystal Shivling (स्फटिक शिवलिंग) — Authentic spiritual accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 2650,
    "mrp": 3180,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Spiritual Accessories",
    "categorySlug": "spiritual-accessories",
    "variantType": "piece",
    "tags": [
      "Spiritual Accessories",
      "Crystal Shivling",
      "स्फटिक शिवलिंग",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 42,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-crystal-shivling-std",
        "sku": "RAM-CRS-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 2650,
        "compareAtPrice": 3180,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-crystal-shivling-prm",
        "sku": "RAM-CRS-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 5000,
        "compareAtPrice": 6250,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-saligram",
    "slug": "saligram",
    "name": "Saligram",
    "nameHi": "शालिग्राम",
    "description": "Saligram (शालिग्राम) — Authentic spiritual accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 5250,
    "mrp": 6300,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Spiritual Accessories",
    "categorySlug": "spiritual-accessories",
    "variantType": "piece",
    "tags": [
      "Spiritual Accessories",
      "Saligram",
      "शालिग्राम",
      "per piece"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 45,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-saligram-std",
        "sku": "RAM-SLG-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 5250,
        "compareAtPrice": 6300,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-saligram-prm",
        "sku": "RAM-SLG-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 10000,
        "compareAtPrice": 12500,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-narmadeshwar-shivling",
    "slug": "narmadeshwar-shivling",
    "name": "Narmadeshwar Shivling",
    "nameHi": "नर्मदेश्वर शिवलिंग",
    "description": "Narmadeshwar Shivling (नर्मदेश्वर शिवलिंग) — Authentic spiritual accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: 3x3 in to 5x5 in.",
    "price": 650,
    "mrp": 780,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Spiritual Accessories",
    "categorySlug": "spiritual-accessories",
    "variantType": "size",
    "tags": [
      "Spiritual Accessories",
      "Narmadeshwar Shivling",
      "नर्मदेश्वर शिवलिंग",
      "3x3 in to 5x5 in"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 48,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-narmadeshwar-shivling-small",
        "sku": "RAM-NRS-STD-SML",
        "variantName": "Standard Size",
        "attributes": {
          "size": "Standard",
          "unit": "3x3 in to 5x5 in"
        },
        "price": 650,
        "compareAtPrice": 780,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-narmadeshwar-shivling-large",
        "sku": "RAM-NRS-STD-LRG",
        "variantName": "Large Size",
        "attributes": {
          "size": "Large",
          "unit": "3x3 in to 5x5 in"
        },
        "price": 850,
        "compareAtPrice": 1063,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-gomutra-ark",
    "slug": "gomutra-ark",
    "name": "Gomutra Ark",
    "nameHi": "गोमूत्र अर्क",
    "description": "Gomutra Ark (गोमूत्र अर्क) — Authentic spiritual accessories essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bottle.",
    "price": 175,
    "mrp": 219,
    "image": "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Spiritual Accessories",
    "categorySlug": "spiritual-accessories",
    "variantType": "single",
    "tags": [
      "Spiritual Accessories",
      "Gomutra Ark",
      "गोमूत्र अर्क",
      "per bottle"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 51,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-gomutra-ark-std",
        "sku": "RAM-GMA-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bottle"
        },
        "price": 175,
        "compareAtPrice": 219,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-essential-oils",
    "slug": "essential-oils",
    "name": "Essential Oils",
    "nameHi": "एसेंशियल ऑयल्स",
    "description": "Essential Oils (एसेंशियल ऑयल्स) — Authentic home fragrance essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per bottle.",
    "price": 825,
    "mrp": 1031,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Home Fragrance",
    "categorySlug": "home-fragrance",
    "variantType": "single",
    "tags": [
      "Home Fragrance",
      "Essential Oils",
      "एसेंशियल ऑयल्स",
      "per bottle"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 54,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-essential-oils-std",
        "sku": "RAM-EOL-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per bottle"
        },
        "price": 825,
        "compareAtPrice": 1031,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-dhoop-cups",
    "slug": "dhoop-cups",
    "name": "Dhoop Cups",
    "nameHi": "धूप कप",
    "description": "Dhoop Cups (धूप कप) — Authentic home fragrance essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 175,
    "mrp": 210,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Home Fragrance",
    "categorySlug": "home-fragrance",
    "variantType": "pack",
    "tags": [
      "Home Fragrance",
      "Dhoop Cups",
      "धूप कप",
      "per pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 17,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-dhoop-cups-p1",
        "sku": "RAM-DCP-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack"
        },
        "price": 175,
        "compareAtPrice": 210,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-dhoop-cups-p2",
        "sku": "RAM-DCP-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack"
        },
        "price": 300,
        "compareAtPrice": 375,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-aroma-diffuser",
    "slug": "aroma-diffuser",
    "name": "Aroma Diffuser",
    "nameHi": "अरोमा डिफ्यूज़र",
    "description": "Aroma Diffuser (अरोमा डिफ्यूज़र) — Authentic home fragrance essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per piece.",
    "price": 1650,
    "mrp": 1980,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Home Fragrance",
    "categorySlug": "home-fragrance",
    "variantType": "piece",
    "tags": [
      "Home Fragrance",
      "Aroma Diffuser",
      "अरोमा डिफ्यूज़र",
      "per piece"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 20,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-aroma-diffuser-std",
        "sku": "RAM-ADF-STD-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per piece"
        },
        "price": 1650,
        "compareAtPrice": 1980,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-aroma-diffuser-prm",
        "sku": "RAM-ADF-STD-PRM",
        "variantName": "Premium Edition",
        "attributes": {
          "unit": "per piece"
        },
        "price": 3000,
        "compareAtPrice": 3750,
        "stock": 15,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-fragrance-cones",
    "slug": "fragrance-cones",
    "name": "Fragrance Cones",
    "nameHi": "सुगंध कोन",
    "description": "Fragrance Cones (सुगंध कोन) — Authentic home fragrance essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 180,
    "mrp": 216,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Home Fragrance",
    "categorySlug": "home-fragrance",
    "variantType": "pack",
    "tags": [
      "Home Fragrance",
      "Fragrance Cones",
      "सुगंध कोन",
      "per pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 23,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-fragrance-cones-p1",
        "sku": "RAM-FRC-STD-P1",
        "variantName": "Single Pack",
        "attributes": {
          "pack": "1 Pack",
          "unit": "per pack"
        },
        "price": 180,
        "compareAtPrice": 216,
        "stock": 30,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-fragrance-cones-p2",
        "sku": "RAM-FRC-STD-P2",
        "variantName": "Value Pack (Set of 2)",
        "attributes": {
          "pack": "2 Packs",
          "unit": "per pack"
        },
        "price": 300,
        "compareAtPrice": 375,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-scented-camphor",
    "slug": "scented-camphor",
    "name": "Scented Camphor",
    "nameHi": "सुगंध कपूर",
    "description": "Scented Camphor (सुगंध कपूर) — Authentic home fragrance essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per 100–200g.",
    "price": 305,
    "mrp": 366,
    "image": "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Home Fragrance",
    "categorySlug": "home-fragrance",
    "variantType": "weight",
    "tags": [
      "Home Fragrance",
      "Scented Camphor",
      "सुगंध कपूर",
      "per 100–200g"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 26,
    "inStock": true,
    "isFeatured": false,
    "weight": "per 100–200g",
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-scented-camphor-w1",
        "sku": "RAM-SCP-STD-W1",
        "variantName": "Standard Pack",
        "attributes": {
          "weight": "Standard",
          "unit": "per 100–200g"
        },
        "price": 305,
        "compareAtPrice": 366,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      },
      {
        "id": "var-scented-camphor-w2",
        "sku": "RAM-SCP-STD-W2",
        "variantName": "Economy Pack",
        "attributes": {
          "weight": "Large",
          "unit": "per 100–200g"
        },
        "price": 409,
        "compareAtPrice": 511,
        "stock": 20,
        "isDefault": false,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-pooja-gift-box",
    "slug": "pooja-gift-box",
    "name": "Pooja Gift Box",
    "nameHi": "पूजा गिफ्ट बॉक्स",
    "description": "Pooja Gift Box (पूजा गिफ्ट बॉक्स) — Authentic gift items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per box.",
    "price": 1400,
    "mrp": 1750,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Gift Items",
    "categorySlug": "gift-items",
    "variantType": "single",
    "tags": [
      "Gift Items",
      "Pooja Gift Box",
      "पूजा गिफ्ट बॉक्स",
      "per box"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.95,
    "reviewCount": 29,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-pooja-gift-box-std",
        "sku": "RAM-PGB-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per box"
        },
        "price": 1400,
        "compareAtPrice": 1750,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-spiritual-combo-pack",
    "slug": "spiritual-combo-pack",
    "name": "Spiritual Combo Pack",
    "nameHi": "आध्यात्मिक कॉम्बो पैक",
    "description": "Spiritual Combo Pack (आध्यात्मिक कॉम्बो पैक) — Authentic gift items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per pack.",
    "price": 1750,
    "mrp": 2188,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Gift Items",
    "categorySlug": "gift-items",
    "variantType": "single",
    "tags": [
      "Gift Items",
      "Spiritual Combo Pack",
      "आध्यात्मिक कॉम्बो पैक",
      "per pack"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 5,
    "reviewCount": 32,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-spiritual-combo-pack-std",
        "sku": "RAM-SCP-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per pack"
        },
        "price": 1750,
        "compareAtPrice": 2188,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-brass-gift-set",
    "slug": "brass-gift-set",
    "name": "Brass Gift Set",
    "nameHi": "पीतल गिफ्ट सेट",
    "description": "Brass Gift Set (पीतल गिफ्ट सेट) — Authentic gift items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per set.",
    "price": 3633,
    "mrp": 4541,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Gift Items",
    "categorySlug": "gift-items",
    "variantType": "single",
    "tags": [
      "Gift Items",
      "Brass Gift Set",
      "पीतल गिफ्ट सेट",
      "per set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.8,
    "reviewCount": 35,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-brass-gift-set-std",
        "sku": "RAM-BGS-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per set"
        },
        "price": 3633,
        "compareAtPrice": 4541,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-murti-gift-set",
    "slug": "murti-gift-set",
    "name": "Murti Gift Set",
    "nameHi": "मूर्ति गिफ्ट सेट",
    "description": "Murti Gift Set (मूर्ति गिफ्ट सेट) — Authentic gift items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per set.",
    "price": 2800,
    "mrp": 3500,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Gift Items",
    "categorySlug": "gift-items",
    "variantType": "single",
    "tags": [
      "Gift Items",
      "Murti Gift Set",
      "मूर्ति गिफ्ट सेट",
      "per set"
    ],
    "badges": [
      "Pure Handcrafted"
    ],
    "rating": 4.85,
    "reviewCount": 38,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-murti-gift-set-std",
        "sku": "RAM-MGS-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per set"
        },
        "price": 2800,
        "compareAtPrice": 3500,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  },
  {
    "id": "prod-festival-gift-hamper",
    "slug": "festival-gift-hamper",
    "name": "Festival Gift Hamper",
    "nameHi": "पर्व गिफ्ट हैम्पर",
    "description": "Festival Gift Hamper (पर्व गिफ्ट हैम्पर) — Authentic gift items essential for daily worship, temple rituals, and sacred celebrations. Sourced adhering to strict Vedic purity standards. Specification: per hamper.",
    "price": 1000,
    "mrp": 1250,
    "image": "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542397284-3b167fe665d7?w=800&auto=format&fit=crop&q=80"
    ],
    "category": "Gift Items",
    "categorySlug": "gift-items",
    "variantType": "single",
    "tags": [
      "Gift Items",
      "Festival Gift Hamper",
      "पर्व गिफ्ट हैम्पर",
      "per hamper"
    ],
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8999999999999995,
    "reviewCount": 41,
    "inStock": true,
    "isFeatured": false,
    "pujaGuide": "Use during daily aarti, abhishek, and special festive puja ceremonies for invoked divine grace.",
    "variants": [
      {
        "id": "var-festival-gift-hamper-std",
        "sku": "RAM-FGH-STD",
        "variantName": "Standard",
        "attributes": {
          "unit": "per hamper"
        },
        "price": 1000,
        "compareAtPrice": 1250,
        "stock": 25,
        "isDefault": true,
        "isActive": true,
        "needsPricing": false
      }
    ]
  }
];

export const occasions: Occasion[] = [
  {
    id: "occ-1",
    slug: "diwali",
    name: "Diwali Mahotsav",
    nameHi: "दीपावली",
    description: "Festival of Lights — illuminate your home with authentic brass diyas, akhand lamps, and festive pooja thalis.",
    image: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?q=80&w=800&auto=format&fit=crop",
    date: "2026-11-01",
    products: ["prod-diwali-kit", "prod-akhand-diya", "prod-panchmukhi-diya", "prod-pooja-thali", "prod-cow-ghee"],
  },
  {
    id: "occ-2",
    slug: "navratri",
    name: "Navratri & Durga Puja",
    nameHi: "नवरात्रि",
    description: "Nine Nights of the Divine Mother — sacred havan samagri, akhand jyot, durga vastra, and pure gangajal.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    date: "2026-10-15",
    products: ["prod-navratri-kit", "prod-durga-dress", "prod-havan-samagri", "prod-gangajal", "prod-durga-saptashati"],
  },
  {
    id: "occ-3",
    slug: "ganesh-chaturthi",
    name: "Ganesh Utsav",
    nameHi: "गणेश चतुर्थी",
    description: "Welcome Lord Ganesha — handcrafted murtis, modak prasad essentials, durva grass accessories, and aarti thali.",
    image: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?q=80&w=800&auto=format&fit=crop",
    date: "2026-09-07",
    products: ["prod-ganesh-chaturthi-kit", "prod-ganesh-ji-murti", "prod-ganesh-dress", "prod-aarti-thali"],
  },
  {
    id: "occ-4",
    slug: "janmashtami",
    name: "Shri Krishna Janmashtami",
    nameHi: "जन्माष्टमी",
    description: "Celebrate the divine birth of Laddu Gopal — complete puja kit, mor mukut, bansuri, makhan handi, and festive poshak.",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop",
    date: "2026-08-26",
    products: ["prod-janmashtami-kit", "prod-laddu-gopal-dress", "prod-laddu-gopal-murti", "prod-mor-mukut", "prod-peacock-feather"],
  },
  {
    id: "occ-5",
    slug: "shivratri",
    name: "Maha Shivratri",
    nameHi: "महाशिवरात्रि",
    description: "Sacred night of Lord Shiva — parad shivling, bilva patra samagri, gangajal, dhoop, and raw camphor.",
    image: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?q=80&w=800&auto=format&fit=crop",
    date: "2026-03-08",
    products: ["prod-shivratri-kit", "prod-parad-shivling", "prod-rudrabhishek-kit", "prod-gangajal", "prod-shiv-ji-vastra"],
  },
  {
    id: "occ-6",
    slug: "daily-puja",
    name: "Daily Mandir Puja",
    nameHi: "दैनिक पूजा",
    description: "Your everyday spiritual devotion — pure cow ghee wicks, chandan tika, natural agarbatti, and fresh camphor.",
    image: "https://images.unsplash.com/photo-1609137144822-42173f4b66df?q=80&w=800&auto=format&fit=crop",
    date: "",
    products: ["prod-agarbatti", "prod-dhoop-batti", "prod-kapoor", "prod-cow-ghee", "prod-ghee-batti", "prod-roli"],
  },
];
export const testimonials: Review[] = [
  { id: "rev-1", userName: "Priya Sharma", city: "Jaipur", rating: 5, comment: "The quality of agarbatti and cow ghee is exceptional. Our home temple feels truly divine!", date: "2026-01-15", verified: true },
  { id: "rev-2", userName: "Rajesh Kumar", city: "Varanasi", rating: 5, comment: "Bought the brass Ram Darbar murti — the craftsmanship and weight are remarkable. Highly recommended.", date: "2026-02-20", verified: true },
  { id: "rev-3", userName: "Ananya Patel", city: "Ahmedabad", rating: 5, comment: "Beautiful brass pooja thali set! Genuine heavy brass that looks gorgeous during morning aarti.", date: "2026-01-28", verified: true },
  { id: "rev-4", userName: "Suresh Reddy", city: "Hyderabad", rating: 5, comment: "The 108 bead Rudraksha mala and Dakshinavarti Shankh are 100% authentic and certified.", date: "2026-03-05", verified: true },
  { id: "rev-5", userName: "Meera Iyer", city: "Chennai", rating: 5, comment: "The Janmashtami kit had every single required item carefully packed with pure sacred ingredients.", date: "2026-02-14", verified: true },
];

export const liveDarshans: LiveDarshan[] = [
  {
    id: "ld-1",
    title: "Kashi Vishwanath Mangala Aarti",
    temple: "Kashi Vishwanath Temple",
    deity: "Lord Shiva",
    location: "Varanasi, Uttar Pradesh",
    isLive: true,
    scheduledAt: "2026-10-14T05:00:00+05:30",
    viewerCount: 18450,
    thumbnailUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ld-2",
    title: "Tirupati Balaji Suprabhatam",
    temple: "Tirumala Tirupati Devasthanams",
    deity: "Lord Venkateswara",
    location: "Tirupati, Andhra Pradesh",
    isLive: false,
    scheduledAt: "2026-10-14T06:30:00+05:30",
    viewerCount: 0,
    thumbnailUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ld-3",
    title: "Siddhivinayak Evening Aarti",
    temple: "Siddhivinayak Temple",
    deity: "Lord Ganesh",
    location: "Mumbai, Maharashtra",
    isLive: false,
    scheduledAt: "2026-10-14T19:00:00+05:30",
    viewerCount: 0,
    thumbnailUrl: "https://images.unsplash.com/photo-1567591376020-f56b009e5ff4?q=80&w=800&auto=format&fit=crop",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getOccasionBySlug(slug: string): Occasion | undefined {
  return occasions.find((o) => o.slug === slug);
}

export function getProductsForOccasion(occasion: Occasion): Product[] {
  return products.filter((p) => occasion.products.includes(p.id));
}
