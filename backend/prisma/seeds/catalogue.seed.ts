import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
// Helper: Generate deterministic slug
// ─────────────────────────────────────────────────────────────
function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─────────────────────────────────────────────────────────────
// Helper: Generate deterministic SKU
// ─────────────────────────────────────────────────────────────
function generateSku(categoryCode: string, productCode: string, variantCode?: string): string {
  const parts = ["RAM", categoryCode, productCode];
  if (variantCode) parts.push(variantCode);
  return parts.join("-").toUpperCase();
}

// ─────────────────────────────────────────────────────────────
// CATEGORY DEFINITIONS (from PDF catalogue)
// ─────────────────────────────────────────────────────────────
interface CategoryDef {
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  code: string; // Short code for SKU generation
}

const CATEGORIES: CategoryDef[] = [
  { name: "Pooja Samagri", nameHi: "पूजा सामग्री", slug: "pooja-samagri", description: "Essential essentials for daily puja, worship and rituals.", code: "PS" },
  { name: "Pooja Thali & Accessories", nameHi: "पूजा थाली एवं सहायक सामग्री", slug: "pooja-thali-accessories", description: "Thoughtful accessories for puja and aarti.", code: "PT" },
  { name: "Temple Decoration", nameHi: "मंदिर सजावट", slug: "temple-decoration", description: "Elegant decor for temples and sacred spaces.", code: "TD" },
  { name: "Bhagwan Vastra", nameHi: "भगवान के वस्त्र", slug: "bhagwan-vastra", description: "Traditional and festive attire for deities.", code: "BV" },
  { name: "Mukut & Shringar", nameHi: "मुकुट एवं श्रृंगार", slug: "mukut-shringar", description: "Ornaments and accents for divine shringar.", code: "MS" },
  { name: "Mala", nameHi: "माला", slug: "mala", description: "Malas for chanting, meditation and spiritual practice.", code: "ML" },
  { name: "Murti", nameHi: "मूर्ति", slug: "murti", description: "Deity idols for puja and home temples.", code: "MR" },
  { name: "Mandir", nameHi: "मंदिर", slug: "mandir", description: "Home temples in varied styles and sizes.", code: "MN" },
  { name: "Shankh & Bells", nameHi: "शंख एवं घंटियां", slug: "shankh-bells", description: "Conch shells and bells for traditional puja rituals.", code: "SB" },
  { name: "Brass & Copper Items", nameHi: "पीतल एवं तांबे की सामग्री", slug: "brass-copper-items", description: "Traditional brass and copper puja essentials.", code: "BC" },
  { name: "Rudraksha Collection", nameHi: "रुद्राक्ष संग्रह", slug: "rudraksha-collection", description: "Rudraksha pieces for spiritual practice.", code: "RK" },
  { name: "Yantra", nameHi: "यंत्र", slug: "yantra", description: "Yantras used in traditional puja and spiritual practice.", code: "YN" },
  { name: "Books & Scriptures", nameHi: "पुस्तकें एवं धर्मग्रंथ", slug: "books-scriptures", description: "Selected scriptures for reading, recitation and study.", code: "BS" },
  { name: "Festival Special", nameHi: "पर्व विशेष", slug: "festival-special", description: "Ready puja and celebration kits for major festivals.", code: "FS" },
  { name: "Pooja Kits", nameHi: "पूजा किट", slug: "pooja-kits", description: "Convenient kits for special puja and ceremonies.", code: "PK" },
  { name: "Bhog & Prasad", nameHi: "भोग एवं प्रसाद", slug: "bhog-prasad", description: "Offerings and prasad essentials for sacred occasions.", code: "BP" },
  { name: "Clothing & Religious Wear", nameHi: "वस्त्र एवं धार्मिक परिधान", slug: "clothing-religious-wear", description: "Traditional wear for puja, rituals and devotional occasions.", code: "CW" },
  { name: "Spiritual Accessories", nameHi: "आध्यात्मिक सामग्री", slug: "spiritual-accessories", description: "Distinctive products for spiritual traditions and practice.", code: "SA" },
  { name: "Home Fragrance", nameHi: "गृह सुगंध", slug: "home-fragrance", description: "Fragrance essentials for a serene home and puja space.", code: "HF" },
  { name: "Gift Items", nameHi: "उपहार सामग्री", slug: "gift-items", description: "Thoughtful devotional gifts for special occasions.", code: "GI" },
];

// ─────────────────────────────────────────────────────────────
// PRODUCT DEFINITIONS (from PDF catalogue)
// Each product has name, nameHi, unit/size info, minPrice, maxPrice
// variantType indicates what dimension variants represent
// ─────────────────────────────────────────────────────────────
interface ProductDef {
  name: string;
  nameHi: string;
  slug: string;
  categorySlug: string;
  productCode: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  variantType: "single" | "weight" | "quantity" | "size" | "material_size" | "pack" | "piece";
  description?: string;
}

const PRODUCTS: ProductDef[] = [
  // ══════════════════════════════════════════════════════════
  // 01 — POOJA SAMAGRI (26 products)
  // ══════════════════════════════════════════════════════════
  { name: "Agarbatti", nameHi: "अगरबत्ती", slug: "agarbatti", categorySlug: "pooja-samagri", productCode: "AGB", unit: "per pack (16–170 sticks)", minPrice: 171, maxPrice: 332, variantType: "quantity" },
  { name: "Dhoop Batti", nameHi: "धूप बत्ती", slug: "dhoop-batti", categorySlug: "pooja-samagri", productCode: "DHB", unit: "per pack (75g–140g)", minPrice: 100, maxPrice: 150, variantType: "weight" },
  { name: "Kapoor", nameHi: "कपूर", slug: "kapoor", categorySlug: "pooja-samagri", productCode: "KPR", unit: "per 100g", minPrice: 240, maxPrice: 280, variantType: "weight" },
  { name: "Ghee Batti", nameHi: "घी बत्ती", slug: "ghee-batti", categorySlug: "pooja-samagri", productCode: "GHB", unit: "pack of ~100 pcs", minPrice: 262, maxPrice: 360, variantType: "pack" },
  { name: "Cotton Batti", nameHi: "कॉटन बत्ती", slug: "cotton-batti", categorySlug: "pooja-samagri", productCode: "CTB", unit: "per pack (25g to 1100 pcs)", minPrice: 102, maxPrice: 164, variantType: "quantity" },
  { name: "Havan Samagri", nameHi: "हवन सामग्री", slug: "havan-samagri", categorySlug: "pooja-samagri", productCode: "HVS", unit: "per 500g", minPrice: 86, maxPrice: 132, variantType: "weight" },
  { name: "Samidha", nameHi: "समिधा", slug: "samidha", categorySlug: "pooja-samagri", productCode: "SMD", unit: "per pack", minPrice: 125, maxPrice: 200, variantType: "pack" },
  { name: "Roli", nameHi: "रोली", slug: "roli", categorySlug: "pooja-samagri", productCode: "ROL", unit: "per 25g", minPrice: 29, maxPrice: 33, variantType: "weight" },
  { name: "Kumkum", nameHi: "कुमकुम", slug: "kumkum", categorySlug: "pooja-samagri", productCode: "KMK", unit: "per pack (powder to paste)", minPrice: 127, maxPrice: 229, variantType: "pack" },
  { name: "Haldi", nameHi: "हल्दी", slug: "haldi", categorySlug: "pooja-samagri", productCode: "HLD", unit: "per 100g", minPrice: 60, maxPrice: 100, variantType: "weight" },
  { name: "Chandan Powder", nameHi: "चंदन पाउडर", slug: "chandan-powder", categorySlug: "pooja-samagri", productCode: "CDP", unit: "per 25–50g", minPrice: 315, maxPrice: 600, variantType: "weight" },
  { name: "Chandan Stick", nameHi: "चंदन स्टिक", slug: "chandan-stick", categorySlug: "pooja-samagri", productCode: "CDS", unit: "per pack", minPrice: 260, maxPrice: 500, variantType: "pack" },
  { name: "Sindoor", nameHi: "सिन्दूर", slug: "sindoor", categorySlug: "pooja-samagri", productCode: "SDR", unit: "per 25g", minPrice: 55, maxPrice: 100, variantType: "weight" },
  { name: "Gulal", nameHi: "गुलाल", slug: "gulal", categorySlug: "pooja-samagri", productCode: "GUL", unit: "per 100g / 1 pc", minPrice: 38, maxPrice: 46, variantType: "weight" },
  { name: "Akshat (Rice)", nameHi: "अक्षत (चावल)", slug: "akshat-rice", categorySlug: "pooja-samagri", productCode: "AKS", unit: "per 250g pack", minPrice: 65, maxPrice: 100, variantType: "weight" },
  { name: "Janeu", nameHi: "जनेऊ", slug: "janeu", categorySlug: "pooja-samagri", productCode: "JNU", unit: "per pc / pack", minPrice: 53, maxPrice: 100, variantType: "pack" },
  { name: "Kalawa / Mauli", nameHi: "कलावा / मौली", slug: "kalawa-mauli", categorySlug: "pooja-samagri", productCode: "KLW", unit: "per reel / pack", minPrice: 35, maxPrice: 60, variantType: "pack" },
  { name: "Gangajal", nameHi: "गंगाजल", slug: "gangajal", categorySlug: "pooja-samagri", productCode: "GJL", unit: "per 100–500 ml", minPrice: 140, maxPrice: 250, variantType: "weight" },
  { name: "Ganga Mitti", nameHi: "गंगा मिट्टी", slug: "ganga-mitti", categorySlug: "pooja-samagri", productCode: "GMT", unit: "per pack", minPrice: 90, maxPrice: 150, variantType: "pack" },
  { name: "Panchamrit Kit", nameHi: "पंचामृत किट", slug: "panchamrit-kit", categorySlug: "pooja-samagri", productCode: "PMK", unit: "per kit", minPrice: 250, maxPrice: 400, variantType: "single" },
  { name: "Honey", nameHi: "शहद", slug: "honey", categorySlug: "pooja-samagri", productCode: "HNY", unit: "per 250g", minPrice: 275, maxPrice: 450, variantType: "weight" },
  { name: "Cow Ghee", nameHi: "गौ घी", slug: "cow-ghee", categorySlug: "pooja-samagri", productCode: "CGH", unit: "per 1 litre", minPrice: 1195, maxPrice: 1699, variantType: "weight" },
  { name: "Camphor Tablets", nameHi: "कपूर टैबलेट", slug: "camphor-tablets", categorySlug: "pooja-samagri", productCode: "CPT", unit: "per 100g", minPrice: 190, maxPrice: 280, variantType: "weight" },
  { name: "Supari", nameHi: "सुपारी", slug: "supari", categorySlug: "pooja-samagri", productCode: "SPR", unit: "per 50g", minPrice: 60, maxPrice: 100, variantType: "weight" },
  { name: "Elaichi", nameHi: "इलायची", slug: "elaichi", categorySlug: "pooja-samagri", productCode: "ELC", unit: "per 25g", minPrice: 155, maxPrice: 250, variantType: "weight" },
  { name: "Laung", nameHi: "लौंग", slug: "laung", categorySlug: "pooja-samagri", productCode: "LNG", unit: "per 25g", minPrice: 75, maxPrice: 120, variantType: "weight" },

  // ══════════════════════════════════════════════════════════
  // 02 — POOJA THALI & ACCESSORIES (14 products)
  // ══════════════════════════════════════════════════════════
  { name: "Pooja Thali", nameHi: "पूजा थाली", slug: "pooja-thali", categorySlug: "pooja-thali-accessories", productCode: "PTH", unit: "steel budget set to large brass set", minPrice: 4055, maxPrice: 8000, variantType: "material_size" },
  { name: "Aarti Thali", nameHi: "आरती थाली", slug: "aarti-thali", categorySlug: "pooja-thali-accessories", productCode: "ATH", unit: "per thali", minPrice: 1658, maxPrice: 2815, variantType: "piece" },
  { name: "Bell (Ghanti)", nameHi: "घंटी", slug: "bell-ghanti", categorySlug: "pooja-thali-accessories", productCode: "BGL", unit: "per piece", minPrice: 675, maxPrice: 1199, variantType: "piece" },
  { name: "Diya", nameHi: "दीया", slug: "diya", categorySlug: "pooja-thali-accessories", productCode: "DYA", unit: "per piece", minPrice: 361, maxPrice: 572, variantType: "piece" },
  { name: "Akhand Diya", nameHi: "अखंड दीया", slug: "akhand-diya", categorySlug: "pooja-thali-accessories", productCode: "AKD", unit: "per piece", minPrice: 1630, maxPrice: 3199, variantType: "piece" },
  { name: "Panchmukhi Diya", nameHi: "पंचमुखी दीया", slug: "panchmukhi-diya", categorySlug: "pooja-thali-accessories", productCode: "PMD", unit: "per piece (brass)", minPrice: 1293, maxPrice: 2090, variantType: "piece" },
  { name: "Oil Lamp", nameHi: "तेल दीपक", slug: "oil-lamp", categorySlug: "pooja-thali-accessories", productCode: "OLP", unit: "per piece", minPrice: 825, maxPrice: 1500, variantType: "piece" },
  { name: "Samai Lamp", nameHi: "समई दीपक", slug: "samai-lamp", categorySlug: "pooja-thali-accessories", productCode: "SML", unit: "per piece", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Incense Holder", nameHi: "धूपदान", slug: "incense-holder", categorySlug: "pooja-thali-accessories", productCode: "IHD", unit: "per piece", minPrice: 425, maxPrice: 800, variantType: "piece" },
  { name: "Kapoor Dani", nameHi: "कपूर दानी", slug: "kapoor-dani", categorySlug: "pooja-thali-accessories", productCode: "KPD", unit: "per piece", minPrice: 825, maxPrice: 1500, variantType: "piece" },
  { name: "Kumkum Box", nameHi: "कुमकुम डब्बी", slug: "kumkum-box", categorySlug: "pooja-thali-accessories", productCode: "KMB", unit: "per piece", minPrice: 325, maxPrice: 600, variantType: "piece" },
  { name: "Chandan Box", nameHi: "चंदन डब्बी", slug: "chandan-box", categorySlug: "pooja-thali-accessories", productCode: "CDB", unit: "per piece", minPrice: 450, maxPrice: 800, variantType: "piece" },
  { name: "Spoon", nameHi: "चम्मच", slug: "puja-spoon", categorySlug: "pooja-thali-accessories", productCode: "SPN", unit: "per piece", minPrice: 160, maxPrice: 300, variantType: "piece" },
  { name: "Coconut Stand", nameHi: "नारियल स्टैंड", slug: "coconut-stand", categorySlug: "pooja-thali-accessories", productCode: "CST", unit: "per piece", minPrice: 825, maxPrice: 1500, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 03 — TEMPLE DECORATION (10 products)
  // ══════════════════════════════════════════════════════════
  { name: "Artificial Flowers", nameHi: "कृत्रिम फूल", slug: "artificial-flowers", categorySlug: "temple-decoration", productCode: "AFL", unit: "per bunch / string", minPrice: 275, maxPrice: 500, variantType: "pack" },
  { name: "Fresh Flower Garland", nameHi: "ताजे फूलों की माला", slug: "fresh-flower-garland", categorySlug: "temple-decoration", productCode: "FFG", unit: "per garland (seasonal)", minPrice: 265, maxPrice: 500, variantType: "piece" },
  { name: "Toran", nameHi: "तोरण", slug: "toran", categorySlug: "temple-decoration", productCode: "TRN", unit: "per piece", minPrice: 650, maxPrice: 1200, variantType: "piece" },
  { name: "Bandarwal", nameHi: "बंदनवार", slug: "bandarwal", categorySlug: "temple-decoration", productCode: "BDW", unit: "per piece", minPrice: 500, maxPrice: 900, variantType: "piece" },
  { name: "Door Hanging", nameHi: "दरवाज़ा सजावट", slug: "door-hanging", categorySlug: "temple-decoration", productCode: "DHG", unit: "per piece", minPrice: 550, maxPrice: 1000, variantType: "piece" },
  { name: "Decorative Lights", nameHi: "सजावटी लाइट्स", slug: "decorative-lights", categorySlug: "temple-decoration", productCode: "DLT", unit: "per set", minPrice: 800, maxPrice: 1500, variantType: "pack" },
  { name: "LED Diyas", nameHi: "एलईडी दीये", slug: "led-diyas", categorySlug: "temple-decoration", productCode: "LED", unit: "per pack", minPrice: 450, maxPrice: 800, variantType: "pack" },
  { name: "Rangoli Stickers", nameHi: "रंगोली स्टिकर", slug: "rangoli-stickers", categorySlug: "temple-decoration", productCode: "RGS", unit: "per pack", minPrice: 225, maxPrice: 400, variantType: "pack" },
  { name: "Flower Strings", nameHi: "फूलों की लड़ियां", slug: "flower-strings", categorySlug: "temple-decoration", productCode: "FLS", unit: "per string", minPrice: 275, maxPrice: 500, variantType: "piece" },
  { name: "Temple Curtains", nameHi: "मंदिर परदे", slug: "temple-curtains", categorySlug: "temple-decoration", productCode: "TCR", unit: "per piece", minPrice: 850, maxPrice: 1500, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 04 — BHAGWAN VASTRA (12 products)
  // ══════════════════════════════════════════════════════════
  { name: "Laddu Gopal Dress", nameHi: "लड्डू गोपाल पोशाक", slug: "laddu-gopal-dress", categorySlug: "bhagwan-vastra", productCode: "LGD", unit: "per dress (size 0–5)", minPrice: 1600, maxPrice: 3000, variantType: "size" },
  { name: "Radha Krishna Dress", nameHi: "राधा कृष्ण पोशाक", slug: "radha-krishna-dress", categorySlug: "bhagwan-vastra", productCode: "RKD", unit: "per pair set", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Ram Darbar Dress", nameHi: "राम दरबार पोशाक", slug: "ram-darbar-dress", categorySlug: "bhagwan-vastra", productCode: "RDD", unit: "per set", minPrice: 1700, maxPrice: 3000, variantType: "piece" },
  { name: "Hanuman Dress", nameHi: "हनुमान पोशाक", slug: "hanuman-dress", categorySlug: "bhagwan-vastra", productCode: "HND", unit: "per piece", minPrice: 850, maxPrice: 1500, variantType: "piece" },
  { name: "Shiv Ji Vastra", nameHi: "शिव जी वस्त्र", slug: "shiv-ji-vastra", categorySlug: "bhagwan-vastra", productCode: "SJV", unit: "per piece", minPrice: 675, maxPrice: 1200, variantType: "piece" },
  { name: "Ganesh Dress", nameHi: "गणेश पोशाक", slug: "ganesh-dress", categorySlug: "bhagwan-vastra", productCode: "GND", unit: "per piece", minPrice: 825, maxPrice: 1500, variantType: "piece" },
  { name: "Durga Dress", nameHi: "दुर्गा पोशाक", slug: "durga-dress", categorySlug: "bhagwan-vastra", productCode: "DGD", unit: "per piece", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Balaji Dress", nameHi: "बालाजी पोशाक", slug: "balaji-dress", categorySlug: "bhagwan-vastra", productCode: "BLD", unit: "per piece", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Sai Baba Dress", nameHi: "साईं बाबा पोशाक", slug: "sai-baba-dress", categorySlug: "bhagwan-vastra", productCode: "SBD", unit: "per piece", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Seasonal Dresses", nameHi: "मौसमी पोशाक", slug: "seasonal-dresses", categorySlug: "bhagwan-vastra", productCode: "SSD", unit: "per piece", minPrice: 1100, maxPrice: 2000, variantType: "piece" },
  { name: "Silk Dresses", nameHi: "रेशमी पोशाक", slug: "silk-dresses", categorySlug: "bhagwan-vastra", productCode: "SKD", unit: "per piece", minPrice: 1950, maxPrice: 3500, variantType: "piece" },
  { name: "Cotton Dresses", nameHi: "सूती पोशाक", slug: "cotton-dresses", categorySlug: "bhagwan-vastra", productCode: "CTD", unit: "per piece", minPrice: 675, maxPrice: 1200, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 05 — MUKUT & SHRINGAR (14 products)
  // ══════════════════════════════════════════════════════════
  { name: "Mukut", nameHi: "मुकुट", slug: "mukut", categorySlug: "mukut-shringar", productCode: "MKT", unit: "per piece", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Mor Mukut", nameHi: "मोर मुकुट", slug: "mor-mukut", categorySlug: "mukut-shringar", productCode: "MMK", unit: "per piece", minPrice: 325, maxPrice: 600, variantType: "piece" },
  { name: "Crown", nameHi: "क्राउन", slug: "crown", categorySlug: "mukut-shringar", productCode: "CRN", unit: "per piece", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Tilak", nameHi: "तिलक", slug: "tilak", categorySlug: "mukut-shringar", productCode: "TLK", unit: "per piece / pack", minPrice: 160, maxPrice: 300, variantType: "pack" },
  { name: "Necklace", nameHi: "हार", slug: "necklace", categorySlug: "mukut-shringar", productCode: "NKL", unit: "per piece", minPrice: 800, maxPrice: 1500, variantType: "piece" },
  { name: "Shringar Mala", nameHi: "माला", slug: "shringar-mala", categorySlug: "mukut-shringar", productCode: "SML", unit: "per piece", minPrice: 425, maxPrice: 800, variantType: "piece" },
  { name: "Earrings", nameHi: "कान की बालियां", slug: "earrings", categorySlug: "mukut-shringar", productCode: "ERG", unit: "per pair", minPrice: 275, maxPrice: 500, variantType: "piece" },
  { name: "Bangles", nameHi: "चूड़ियां", slug: "bangles", categorySlug: "mukut-shringar", productCode: "BNG", unit: "per pair", minPrice: 325, maxPrice: 600, variantType: "piece" },
  { name: "Waist Belt", nameHi: "कमरबंध", slug: "waist-belt", categorySlug: "mukut-shringar", productCode: "WBT", unit: "per piece", minPrice: 450, maxPrice: 800, variantType: "piece" },
  { name: "Armlet", nameHi: "बाजूबंद", slug: "armlet", categorySlug: "mukut-shringar", productCode: "ARM", unit: "per pair", minPrice: 450, maxPrice: 800, variantType: "piece" },
  { name: "Anklets", nameHi: "पायल", slug: "anklets", categorySlug: "mukut-shringar", productCode: "ANK", unit: "per pair", minPrice: 450, maxPrice: 800, variantType: "piece" },
  { name: "Hair Accessories", nameHi: "केश सज्जा", slug: "hair-accessories", categorySlug: "mukut-shringar", productCode: "HAC", unit: "per piece", minPrice: 275, maxPrice: 500, variantType: "piece" },
  { name: "Peacock Feather", nameHi: "मोर पंख", slug: "peacock-feather", categorySlug: "mukut-shringar", productCode: "PKF", unit: "per piece", minPrice: 55, maxPrice: 100, variantType: "piece" },
  { name: "Stone Jewelry Set", nameHi: "स्टोन ज्वेलरी सेट", slug: "stone-jewelry-set", categorySlug: "mukut-shringar", productCode: "SJS", unit: "per set", minPrice: 1353, maxPrice: 2500, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 06 — MALA (7 products)
  // ══════════════════════════════════════════════════════════
  { name: "Tulsi Mala", nameHi: "तुलसी माला", slug: "tulsi-mala", categorySlug: "mala", productCode: "TLM", unit: "per mala", minPrice: 275, maxPrice: 500, variantType: "piece" },
  { name: "Sphatik Mala", nameHi: "स्फटिक माला", slug: "sphatik-mala", categorySlug: "mala", productCode: "SPM", unit: "per mala", minPrice: 1650, maxPrice: 3000, variantType: "piece" },
  { name: "Chandan Mala", nameHi: "चंदन माला", slug: "chandan-mala", categorySlug: "mala", productCode: "CDM", unit: "per mala", minPrice: 800, maxPrice: 1500, variantType: "piece" },
  { name: "Lotus Seed Mala", nameHi: "कमल बीज माला", slug: "lotus-seed-mala", categorySlug: "mala", productCode: "LSM", unit: "per mala", minPrice: 450, maxPrice: 800, variantType: "piece" },
  { name: "Vaijanti Mala", nameHi: "वैजयन्ती माला", slug: "vaijanti-mala", categorySlug: "mala", productCode: "VJM", unit: "per mala", minPrice: 325, maxPrice: 600, variantType: "piece" },
  { name: "Crystal Mala", nameHi: "क्रिस्टल माला", slug: "crystal-mala", categorySlug: "mala", productCode: "CRM", unit: "per mala", minPrice: 1900, maxPrice: 3500, variantType: "piece" },
  { name: "Pearl Mala", nameHi: "मोती माला", slug: "pearl-mala", categorySlug: "mala", productCode: "PRM", unit: "per mala", minPrice: 1600, maxPrice: 3000, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 07 — MURTI (12 products)
  // ══════════════════════════════════════════════════════════
  { name: "Ram Darbar", nameHi: "राम दरबार", slug: "ram-darbar-murti", categorySlug: "murti", productCode: "RDM", unit: "brass 5 in to marble 4 ft", minPrice: 125200, maxPrice: 250000, variantType: "material_size" },
  { name: "Radha Krishna", nameHi: "राधा कृष्ण", slug: "radha-krishna-murti", categorySlug: "murti", productCode: "RKM", unit: "marble, 1 ft to 3.5 ft (per pair)", minPrice: 82001, maxPrice: 151001, variantType: "material_size" },
  { name: "Laddu Gopal", nameHi: "लड्डू गोपाल", slug: "laddu-gopal-murti", categorySlug: "murti", productCode: "LGM", unit: "per piece (brass/ashtadhatu)", minPrice: 1550, maxPrice: 3000, variantType: "material_size" },
  { name: "Hanuman Ji", nameHi: "हनुमान जी", slug: "hanuman-ji-murti", categorySlug: "murti", productCode: "HJM", unit: "brass Panchmukhi to marble 3 ft", minPrice: 63825, maxPrice: 125000, variantType: "material_size" },
  { name: "Shiv Ji", nameHi: "शिव जी", slug: "shiv-ji-murti", categorySlug: "murti", productCode: "SJM", unit: "per piece", minPrice: 50250, maxPrice: 100000, variantType: "material_size" },
  { name: "Ganesh Ji", nameHi: "गणेश जी", slug: "ganesh-ji-murti", categorySlug: "murti", productCode: "GJM", unit: "brass small to marble large", minPrice: 60558, maxPrice: 121000, variantType: "material_size" },
  { name: "Durga Mata", nameHi: "दुर्गा माता", slug: "durga-mata-murti", categorySlug: "murti", productCode: "DMM", unit: "per piece", minPrice: 50400, maxPrice: 100000, variantType: "material_size" },
  { name: "Lakshmi Ji", nameHi: "लक्ष्मी जी", slug: "lakshmi-ji-murti", categorySlug: "murti", productCode: "LJM", unit: "per piece", minPrice: 50250, maxPrice: 100000, variantType: "material_size" },
  { name: "Saraswati Ji", nameHi: "सरस्वती जी", slug: "saraswati-ji-murti", categorySlug: "murti", productCode: "SRM", unit: "per piece", minPrice: 50250, maxPrice: 100000, variantType: "material_size" },
  { name: "Balaji", nameHi: "बालाजी", slug: "balaji-murti", categorySlug: "murti", productCode: "BLM", unit: "per piece", minPrice: 25400, maxPrice: 50000, variantType: "material_size" },
  { name: "Sai Baba", nameHi: "साईं बाबा", slug: "sai-baba-murti", categorySlug: "murti", productCode: "SBM", unit: "small to marble large", minPrice: 97750, maxPrice: 195000, variantType: "material_size" },
  { name: "Nandi", nameHi: "नंदी", slug: "nandi-murti", categorySlug: "murti", productCode: "NDM", unit: "per piece", minPrice: 15150, maxPrice: 30000, variantType: "material_size" },

  // ══════════════════════════════════════════════════════════
  // 08 — MANDIR (6 products)
  // ══════════════════════════════════════════════════════════
  { name: "Wooden Temple", nameHi: "लकड़ी का मंदिर", slug: "wooden-temple", categorySlug: "mandir", productCode: "WDT", unit: "per piece", minPrice: 18825, maxPrice: 35999, variantType: "size" },
  { name: "Marble Temple", nameHi: "संगमरमर का मंदिर", slug: "marble-temple", categorySlug: "mandir", productCode: "MBT", unit: "per piece", minPrice: 82500, maxPrice: 150000, variantType: "size" },
  { name: "MDF Temple", nameHi: "एमडीएफ मंदिर", slug: "mdf-temple", categorySlug: "mandir", productCode: "MDT", unit: "per piece", minPrice: 9125, maxPrice: 18000, variantType: "size" },
  { name: "Wall Mounted Temple", nameHi: "वॉल माउंटेड मंदिर", slug: "wall-mounted-temple", categorySlug: "mandir", productCode: "WMT", unit: "per piece", minPrice: 6285, maxPrice: 12219, variantType: "size" },
  { name: "Floor Temple", nameHi: "फ्लोर मंदिर", slug: "floor-temple", categorySlug: "mandir", productCode: "FLT", unit: "per piece", minPrice: 18409, maxPrice: 30499, variantType: "size" },
  { name: "Foldable Temple", nameHi: "फोल्डेबल मंदिर", slug: "foldable-temple", categorySlug: "mandir", productCode: "FDT", unit: "per piece (MDF, ~1 ft)", minPrice: 425, maxPrice: 630, variantType: "single" },

  // ══════════════════════════════════════════════════════════
  // 09 — SHANKH & BELLS (5 products)
  // ══════════════════════════════════════════════════════════
  { name: "Dakshinavarti Shankh", nameHi: "दक्षिणावर्ती शंख", slug: "dakshinavarti-shankh", categorySlug: "shankh-bells", productCode: "DSH", unit: "per piece (size dependent)", minPrice: 5593, maxPrice: 11000, variantType: "size" },
  { name: "Puja Shankh", nameHi: "पूजा शंख", slug: "puja-shankh", categorySlug: "shankh-bells", productCode: "PSH", unit: "per piece", minPrice: 450, maxPrice: 800, variantType: "piece" },
  { name: "Brass Bell", nameHi: "पीतल की घंटी", slug: "brass-bell", categorySlug: "shankh-bells", productCode: "BBL", unit: "per piece", minPrice: 675, maxPrice: 1199, variantType: "piece" },
  { name: "Hanging Bell", nameHi: "लटकन घंटी", slug: "hanging-bell", categorySlug: "shankh-bells", productCode: "HBL", unit: "500g to 11 kg", minPrice: 9768, maxPrice: 18370, variantType: "weight" },
  { name: "Brass Ghanti", nameHi: "पीतल की घण्टी", slug: "brass-ghanti", categorySlug: "shankh-bells", productCode: "BGH", unit: "per piece", minPrice: 1099, maxPrice: 1199, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 10 — BRASS & COPPER ITEMS (8 products)
  // ══════════════════════════════════════════════════════════
  { name: "Lota", nameHi: "लोटा", slug: "lota", categorySlug: "brass-copper-items", productCode: "LTA", unit: "per piece", minPrice: 900, maxPrice: 1500, variantType: "piece" },
  { name: "Kalash", nameHi: "कलश", slug: "kalash", categorySlug: "brass-copper-items", productCode: "KLS", unit: "per piece", minPrice: 1350, maxPrice: 2500, variantType: "piece" },
  { name: "Panchpatra", nameHi: "पंचपात्र", slug: "panchpatra", categorySlug: "brass-copper-items", productCode: "PNP", unit: "per piece", minPrice: 330, maxPrice: 500, variantType: "piece" },
  { name: "Achmani", nameHi: "अचमनी", slug: "achmani", categorySlug: "brass-copper-items", productCode: "ACM", unit: "per piece (copper)", minPrice: 85, maxPrice: 120, variantType: "piece" },
  { name: "Aarti Stand", nameHi: "आरती स्टैंड", slug: "aarti-stand", categorySlug: "brass-copper-items", productCode: "AST", unit: "per piece", minPrice: 1400, maxPrice: 2500, variantType: "piece" },
  { name: "Brass/Copper Bell", nameHi: "घंटी", slug: "brass-copper-bell", categorySlug: "brass-copper-items", productCode: "BCB", unit: "per piece", minPrice: 1099, maxPrice: 1199, variantType: "piece" },
  { name: "Brass Plate", nameHi: "थाली", slug: "brass-plate", categorySlug: "brass-copper-items", productCode: "BPL", unit: "brass plate 8–10 in", minPrice: 1295, maxPrice: 1570, variantType: "size" },
  { name: "Bowl", nameHi: "कटोरी", slug: "brass-bowl", categorySlug: "brass-copper-items", productCode: "BWL", unit: "per piece", minPrice: 450, maxPrice: 800, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 11 — RUDRAKSHA COLLECTION (8 products)
  // ══════════════════════════════════════════════════════════
  { name: "1 Mukhi Rudraksha", nameHi: "1 मुखी", slug: "1-mukhi-rudraksha", categorySlug: "rudraksha-collection", productCode: "R01", unit: "per bead (half-moon/Indian type)", minPrice: 7825, maxPrice: 15000, variantType: "piece" },
  { name: "2 Mukhi Rudraksha", nameHi: "2 मुखी", slug: "2-mukhi-rudraksha", categorySlug: "rudraksha-collection", productCode: "R02", unit: "per bead", minPrice: 825, maxPrice: 1500, variantType: "piece" },
  { name: "3 Mukhi Rudraksha", nameHi: "3 मुखी", slug: "3-mukhi-rudraksha", categorySlug: "rudraksha-collection", productCode: "R03", unit: "per bead", minPrice: 1000, maxPrice: 1500, variantType: "piece" },
  { name: "5 Mukhi Rudraksha", nameHi: "5 मुखी", slug: "5-mukhi-rudraksha", categorySlug: "rudraksha-collection", productCode: "R05", unit: "per bead", minPrice: 825, maxPrice: 1500, variantType: "piece" },
  { name: "7 Mukhi Rudraksha", nameHi: "7 मुखी", slug: "7-mukhi-rudraksha", categorySlug: "rudraksha-collection", productCode: "R07", unit: "per bead", minPrice: 1150, maxPrice: 1800, variantType: "piece" },
  { name: "11 Mukhi Rudraksha", nameHi: "11 मुखी", slug: "11-mukhi-rudraksha", categorySlug: "rudraksha-collection", productCode: "R11", unit: "per bead", minPrice: 7900, maxPrice: 13799, variantType: "piece" },
  { name: "Rudraksha Bracelet", nameHi: "रुद्राक्ष ब्रेसलेट", slug: "rudraksha-bracelet", categorySlug: "rudraksha-collection", productCode: "RBR", unit: "per piece", minPrice: 1813, maxPrice: 2500, variantType: "piece" },
  { name: "Rudraksha Mala", nameHi: "रुद्राक्ष माला", slug: "rudraksha-mala", categorySlug: "rudraksha-collection", productCode: "RML", unit: "108 beads (5 mukhi)", minPrice: 8250, maxPrice: 15000, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 12 — YANTRA (6 products)
  // ══════════════════════════════════════════════════════════
  { name: "Shree Yantra", nameHi: "श्री यंत्र", slug: "shree-yantra", categorySlug: "yantra", productCode: "SYN", unit: "gold-polish 3in to Parad Meru 100g", minPrice: 1050, maxPrice: 2000, variantType: "size" },
  { name: "Kuber Yantra", nameHi: "कुबेर यंत्र", slug: "kuber-yantra", categorySlug: "yantra", productCode: "KYN", unit: "3x3 in to 6x6 in, gold polish", minPrice: 175, maxPrice: 250, variantType: "size" },
  { name: "Maha Mrityunjaya Yantra", nameHi: "महामृत्युंजय यंत्र", slug: "maha-mrityunjaya-yantra", categorySlug: "yantra", productCode: "MYN", unit: "3x3 in to 6x6 in, gold polish", minPrice: 175, maxPrice: 250, variantType: "size" },
  { name: "Navgraha Yantra", nameHi: "नवग्रह यंत्र", slug: "navgraha-yantra", categorySlug: "yantra", productCode: "NYN", unit: "3x3 in to 6x6 in, gold polish", minPrice: 175, maxPrice: 250, variantType: "size" },
  { name: "Vastu Yantra", nameHi: "वास्तु यंत्र", slug: "vastu-yantra", categorySlug: "yantra", productCode: "VYN", unit: "3x3 in to 6x6 in, gold polish", minPrice: 175, maxPrice: 250, variantType: "size" },
  { name: "Saraswati Yantra", nameHi: "सरस्वती यंत्र", slug: "saraswati-yantra", categorySlug: "yantra", productCode: "SAN", unit: "3x3 in to 6x6 in, gold polish", minPrice: 175, maxPrice: 250, variantType: "size" },

  // ══════════════════════════════════════════════════════════
  // 13 — BOOKS & SCRIPTURES (8 products)
  // ══════════════════════════════════════════════════════════
  { name: "Ramayan", nameHi: "रामायण", slug: "ramayan", categorySlug: "books-scriptures", productCode: "RAM", unit: "Ramcharitmanas, Gita Press", minPrice: 240, maxPrice: 409, variantType: "single" },
  { name: "Bhagavad Gita", nameHi: "भगवद्गीता", slug: "bhagavad-gita", categorySlug: "books-scriptures", productCode: "BGT", unit: "Gita Press", minPrice: 119, maxPrice: 121, variantType: "single" },
  { name: "Hanuman Chalisa", nameHi: "हनुमान चालीसा", slug: "hanuman-chalisa", categorySlug: "books-scriptures", productCode: "HCH", unit: "Gita Press (pocket to larger)", minPrice: 48, maxPrice: 92, variantType: "size" },
  { name: "Sundarkand", nameHi: "सुंदरकांड", slug: "sundarkand", categorySlug: "books-scriptures", productCode: "SDK", unit: "Gita Press", minPrice: 55, maxPrice: 105, variantType: "single" },
  { name: "Shiv Chalisa", nameHi: "शिव चालीसा", slug: "shiv-chalisa", categorySlug: "books-scriptures", productCode: "SCH", unit: "booklet", minPrice: 28, maxPrice: 50, variantType: "single" },
  { name: "Vishnu Sahasranama", nameHi: "विष्णु सहस्रनाम", slug: "vishnu-sahasranama", categorySlug: "books-scriptures", productCode: "VSH", unit: "booklet / book", minPrice: 80, maxPrice: 150, variantType: "single" },
  { name: "Durga Saptashati", nameHi: "दुर्गा सप्तशती", slug: "durga-saptashati", categorySlug: "books-scriptures", productCode: "DSS", unit: "Gita Press", minPrice: 90, maxPrice: 130, variantType: "single" },
  { name: "Aarti Sangrah", nameHi: "आरती संग्रह", slug: "aarti-sangrah", categorySlug: "books-scriptures", productCode: "ASG", unit: "booklet", minPrice: 55, maxPrice: 100, variantType: "single" },

  // ══════════════════════════════════════════════════════════
  // 14 — FESTIVAL SPECIAL (9 products)
  // ══════════════════════════════════════════════════════════
  { name: "Raksha Bandhan Kit", nameHi: "रक्षाबंधन किट", slug: "raksha-bandhan-kit", categorySlug: "festival-special", productCode: "RBK", unit: "per kit", minPrice: 900, maxPrice: 1500, variantType: "single" },
  { name: "Janmashtami Kit", nameHi: "जन्माष्टमी किट", slug: "janmashtami-kit", categorySlug: "festival-special", productCode: "JKT", unit: "per kit", minPrice: 1050, maxPrice: 1600, variantType: "single" },
  { name: "Ganesh Chaturthi Kit", nameHi: "गणेश चतुर्थी किट", slug: "ganesh-chaturthi-kit", categorySlug: "festival-special", productCode: "GCK", unit: "per kit", minPrice: 1025, maxPrice: 1550, variantType: "single" },
  { name: "Navratri Kit", nameHi: "नवरात्र किट", slug: "navratri-kit", categorySlug: "festival-special", productCode: "NRK", unit: "per kit", minPrice: 1125, maxPrice: 1699, variantType: "single" },
  { name: "Diwali Kit", nameHi: "दीवाली किट", slug: "diwali-kit", categorySlug: "festival-special", productCode: "DWK", unit: "per kit", minPrice: 1050, maxPrice: 1600, variantType: "single" },
  { name: "Karwa Chauth Kit", nameHi: "करवा चौथ किट", slug: "karwa-chauth-kit", categorySlug: "festival-special", productCode: "KCK", unit: "per kit", minPrice: 900, maxPrice: 1500, variantType: "single" },
  { name: "Shivratri Kit", nameHi: "शिवरात्रि किट", slug: "shivratri-kit", categorySlug: "festival-special", productCode: "SRK", unit: "per kit", minPrice: 750, maxPrice: 1200, variantType: "single" },
  { name: "Ram Navami Kit", nameHi: "राम नवमी किट", slug: "ram-navami-kit", categorySlug: "festival-special", productCode: "RNK", unit: "per kit", minPrice: 750, maxPrice: 1200, variantType: "single" },
  { name: "Holi Pooja Kit", nameHi: "होली पूजा किट", slug: "holi-pooja-kit", categorySlug: "festival-special", productCode: "HPK", unit: "per kit", minPrice: 600, maxPrice: 1000, variantType: "single" },

  // ══════════════════════════════════════════════════════════
  // 15 — POOJA KITS (7 products)
  // ══════════════════════════════════════════════════════════
  { name: "Satyanarayan Kit", nameHi: "सत्यनारायण किट", slug: "satyanarayan-kit", categorySlug: "pooja-kits", productCode: "SNK", unit: "per kit (30–57 items)", minPrice: 1524, maxPrice: 2249, variantType: "pack" },
  { name: "Griha Pravesh Kit", nameHi: "गृह प्रवेश किट", slug: "griha-pravesh-kit", categorySlug: "pooja-kits", productCode: "GPK", unit: "per kit", minPrice: 838, maxPrice: 1075, variantType: "single" },
  { name: "Rudrabhishek Kit", nameHi: "रुद्राभिषेक किट", slug: "rudrabhishek-kit", categorySlug: "pooja-kits", productCode: "RAK", unit: "per kit", minPrice: 1750, maxPrice: 3000, variantType: "single" },
  { name: "Marriage Kit", nameHi: "विवाह किट", slug: "marriage-kit", categorySlug: "pooja-kits", productCode: "MRK", unit: "per kit", minPrice: 8250, maxPrice: 15000, variantType: "single" },
  { name: "Havan Kit", nameHi: "हवन किट", slug: "havan-kit", categorySlug: "pooja-kits", productCode: "HVK", unit: "per kit", minPrice: 1150, maxPrice: 2000, variantType: "single" },
  { name: "Navgraha Kit", nameHi: "नवग्रह किट", slug: "navgraha-kit", categorySlug: "pooja-kits", productCode: "NGK", unit: "per kit", minPrice: 1750, maxPrice: 3000, variantType: "single" },
  { name: "Lakshmi Pooja Kit", nameHi: "लक्ष्मी पूजा किट", slug: "lakshmi-pooja-kit", categorySlug: "pooja-kits", productCode: "LPK", unit: "per kit", minPrice: 1500, maxPrice: 2500, variantType: "single" },

  // ══════════════════════════════════════════════════════════
  // 16 — BHOG & PRASAD (7 products)
  // ══════════════════════════════════════════════════════════
  { name: "Mishri", nameHi: "मिश्री", slug: "mishri", categorySlug: "bhog-prasad", productCode: "MSR", unit: "per 250g", minPrice: 95, maxPrice: 150, variantType: "weight" },
  { name: "Makhana", nameHi: "मखाना", slug: "makhana", categorySlug: "bhog-prasad", productCode: "MKH", unit: "per 100g", minPrice: 275, maxPrice: 400, variantType: "weight" },
  { name: "Batasha", nameHi: "बाताशा", slug: "batasha", categorySlug: "bhog-prasad", productCode: "BTS", unit: "per 250g", minPrice: 80, maxPrice: 120, variantType: "weight" },
  { name: "Dry Fruits", nameHi: "सूखे मेवे", slug: "dry-fruits", categorySlug: "bhog-prasad", productCode: "DRF", unit: "per 250g", minPrice: 900, maxPrice: 1500, variantType: "weight" },
  { name: "Tulsi Dal", nameHi: "तुलसी दल", slug: "tulsi-dal", categorySlug: "bhog-prasad", productCode: "TLD", unit: "per bunch / pack", minPrice: 55, maxPrice: 100, variantType: "pack" },
  { name: "Panchmewa", nameHi: "पंचमेवा", slug: "panchmewa", categorySlug: "bhog-prasad", productCode: "PCM", unit: "per 200g", minPrice: 325, maxPrice: 500, variantType: "weight" },
  { name: "Elaichi Dana", nameHi: "इलायची दाना", slug: "elaichi-dana", categorySlug: "bhog-prasad", productCode: "ELD", unit: "per 25g", minPrice: 155, maxPrice: 250, variantType: "weight" },

  // ══════════════════════════════════════════════════════════
  // 17 — CLOTHING & RELIGIOUS WEAR (7 products)
  // ══════════════════════════════════════════════════════════
  { name: "Dhoti", nameHi: "धोती", slug: "dhoti", categorySlug: "clothing-religious-wear", productCode: "DHT", unit: "per piece", minPrice: 821, maxPrice: 1441, variantType: "piece" },
  { name: "Kurta", nameHi: "कुर्ता", slug: "kurta", categorySlug: "clothing-religious-wear", productCode: "KRT", unit: "per piece", minPrice: 1150, maxPrice: 2000, variantType: "piece" },
  { name: "Angavastram", nameHi: "अंगवस्त्रम", slug: "angavastram", categorySlug: "clothing-religious-wear", productCode: "AGV", unit: "per piece", minPrice: 550, maxPrice: 1000, variantType: "piece" },
  { name: "Pooja Shawl", nameHi: "पूजा शॉल", slug: "pooja-shawl", categorySlug: "clothing-religious-wear", productCode: "PSL", unit: "per piece", minPrice: 825, maxPrice: 1500, variantType: "piece" },
  { name: "Gamcha", nameHi: "गमछा", slug: "gamcha", categorySlug: "clothing-religious-wear", productCode: "GMC", unit: "per piece", minPrice: 175, maxPrice: 300, variantType: "piece" },
  { name: "Saffron Clothes", nameHi: "भगवा वस्त्र", slug: "saffron-clothes", categorySlug: "clothing-religious-wear", productCode: "SFC", unit: "per piece", minPrice: 825, maxPrice: 1500, variantType: "piece" },
  { name: "Temple Priest Dress", nameHi: "पुजारी परिधान", slug: "temple-priest-dress", categorySlug: "clothing-religious-wear", productCode: "TPD", unit: "per set", minPrice: 2400, maxPrice: 4000, variantType: "piece" },

  // ══════════════════════════════════════════════════════════
  // 18 — SPIRITUAL ACCESSORIES (7 products)
  // ══════════════════════════════════════════════════════════
  { name: "Gomti Chakra", nameHi: "गोमती चक्र", slug: "gomti-chakra", categorySlug: "spiritual-accessories", productCode: "GMC", unit: "per piece (large ₹250)", minPrice: 130, maxPrice: 250, variantType: "size" },
  { name: "Cowrie Shell", nameHi: "कौड़ी", slug: "cowrie-shell", categorySlug: "spiritual-accessories", productCode: "CWS", unit: "per piece (tiger kaudi ₹250)", minPrice: 128, maxPrice: 250, variantType: "piece" },
  { name: "Parad Shivling", nameHi: "पारद शिवलिंग", slug: "parad-shivling", categorySlug: "spiritual-accessories", productCode: "PRS", unit: "30g to 100g (90% purity)", minPrice: 2638, maxPrice: 4500, variantType: "weight" },
  { name: "Crystal Shivling", nameHi: "स्फटिक शिवलिंग", slug: "crystal-shivling", categorySlug: "spiritual-accessories", productCode: "CRS", unit: "per piece", minPrice: 2650, maxPrice: 5000, variantType: "piece" },
  { name: "Saligram", nameHi: "शालिग्राम", slug: "saligram", categorySlug: "spiritual-accessories", productCode: "SLG", unit: "per piece", minPrice: 5250, maxPrice: 10000, variantType: "piece" },
  { name: "Narmadeshwar Shivling", nameHi: "नर्मदेश्वर शिवलिंग", slug: "narmadeshwar-shivling", categorySlug: "spiritual-accessories", productCode: "NRS", unit: "3x3 in to 5x5 in", minPrice: 650, maxPrice: 850, variantType: "size" },
  { name: "Gomutra Ark", nameHi: "गोमूत्र अर्क", slug: "gomutra-ark", categorySlug: "spiritual-accessories", productCode: "GMA", unit: "per bottle", minPrice: 175, maxPrice: 300, variantType: "single" },

  // ══════════════════════════════════════════════════════════
  // 19 — HOME FRAGRANCE (5 products)
  // ══════════════════════════════════════════════════════════
  { name: "Essential Oils", nameHi: "एसेंशियल ऑयल्स", slug: "essential-oils", categorySlug: "home-fragrance", productCode: "EOL", unit: "per bottle", minPrice: 825, maxPrice: 1500, variantType: "single" },
  { name: "Dhoop Cups", nameHi: "धूप कप", slug: "dhoop-cups", categorySlug: "home-fragrance", productCode: "DCP", unit: "per pack", minPrice: 175, maxPrice: 300, variantType: "pack" },
  { name: "Aroma Diffuser", nameHi: "अरोमा डिफ्यूज़र", slug: "aroma-diffuser", categorySlug: "home-fragrance", productCode: "ADF", unit: "per piece", minPrice: 1650, maxPrice: 3000, variantType: "piece" },
  { name: "Fragrance Cones", nameHi: "सुगंध कोन", slug: "fragrance-cones", categorySlug: "home-fragrance", productCode: "FRC", unit: "per pack", minPrice: 180, maxPrice: 300, variantType: "pack" },
  { name: "Scented Camphor", nameHi: "सुगंध कपूर", slug: "scented-camphor", categorySlug: "home-fragrance", productCode: "SCP", unit: "per 100–200g", minPrice: 305, maxPrice: 409, variantType: "weight" },

  // ══════════════════════════════════════════════════════════
  // 20 — GIFT ITEMS (5 products)
  // ══════════════════════════════════════════════════════════
  { name: "Pooja Gift Box", nameHi: "पूजा गिफ्ट बॉक्स", slug: "pooja-gift-box", categorySlug: "gift-items", productCode: "PGB", unit: "per box", minPrice: 1400, maxPrice: 2500, variantType: "single" },
  { name: "Spiritual Combo Pack", nameHi: "आध्यात्मिक कॉम्बो पैक", slug: "spiritual-combo-pack", categorySlug: "gift-items", productCode: "SCP", unit: "per pack", minPrice: 1750, maxPrice: 3000, variantType: "single" },
  { name: "Brass Gift Set", nameHi: "पीतल गिफ्ट सेट", slug: "brass-gift-set", categorySlug: "gift-items", productCode: "BGS", unit: "per set", minPrice: 3633, maxPrice: 6695, variantType: "single" },
  { name: "Murti Gift Set", nameHi: "मूर्ति गिफ्ट सेट", slug: "murti-gift-set", categorySlug: "gift-items", productCode: "MGS", unit: "per set", minPrice: 2800, maxPrice: 5000, variantType: "single" },
  { name: "Festival Gift Hamper", nameHi: "पर्व गिफ्ट हैम्पर", slug: "festival-gift-hamper", categorySlug: "gift-items", productCode: "FGH", unit: "per hamper", minPrice: 1000, maxPrice: 1500, variantType: "single" },
];

// ─────────────────────────────────────────────────────────────
// MAIN SEED FUNCTION
// ─────────────────────────────────────────────────────────────
export async function seedCatalogue() {
  console.log("═══════════════════════════════════════════════════");
  console.log("🕉️  RAMANAYAM CATALOGUE SEED — START");
  console.log("═══════════════════════════════════════════════════\n");

  // ── Step 1: Upsert Categories ──────────────────────────────
  console.log("📂 Seeding 20 Categories...");
  const categoryMap = new Map<string, string>(); // slug → id

  for (const cat of CATEGORIES) {
    const upserted = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        isActive: true,
      },
    });
    categoryMap.set(cat.slug, upserted.id);
    console.log(`   ✅ ${cat.name} (${cat.slug}) → ${upserted.id}`);
  }
  console.log(`\n   Total categories: ${categoryMap.size}\n`);

  // ── Step 2: Ensure vendor exists ───────────────────────────
  console.log("🏪 Resolving vendor...");
  let vendor = await prisma.vendor.findFirst({ orderBy: { createdAt: "asc" } });
  if (!vendor) {
    vendor = await prisma.vendor.create({
      data: {
        businessName: "Ramanayam Flagship Store",
        slug: "ramanayam-flagship",
        ownerName: "Ramanayam Administrator",
        email: "store@ramayanam.in",
        phone: "+919876543210",
        status: "ACTIVE",
        isVerified: true,
      },
    });
  }
  console.log(`   ✅ Vendor: ${vendor.businessName} (${vendor.id})\n`);

  // ── Step 3: Upsert Products + Variants ─────────────────────
  console.log("📦 Seeding Products & Variants...\n");

  let totalProducts = 0;
  let totalVariants = 0;
  let needsPricingCount = 0;
  let singleVariantCount = 0;
  let multiVariantCount = 0;

  // Build a category code map for SKU generation
  const catCodeMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    catCodeMap.set(cat.slug, cat.code);
  }

  for (const prod of PRODUCTS) {
    const categoryId = categoryMap.get(prod.categorySlug);
    if (!categoryId) {
      console.warn(`   ⚠️  Skipping ${prod.name}: category ${prod.categorySlug} not found`);
      continue;
    }

    const catCode = catCodeMap.get(prod.categorySlug) || "XX";

    // Check if product already exists
    const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });

    let product;
    if (existing) {
      // Update existing product
      product = await prisma.product.update({
        where: { slug: prod.slug },
        data: {
          name: prod.name,
          nameHi: prod.nameHi,
          categoryId,
          variantType: prod.variantType,
          status: ProductStatus.ACTIVE,
        },
      });
      console.log(`   🔄 Updated: ${prod.name}`);
    } else {
      // Create new product
      product = await prisma.product.create({
        data: {
          name: prod.name,
          nameHi: prod.nameHi,
          slug: prod.slug,
          shortDescription: `${prod.nameHi} — ${prod.unit}`,
          categoryId,
          vendorId: vendor.id,
          variantType: prod.variantType,
          status: ProductStatus.ACTIVE,
          featured: false,
          seoTitle: `${prod.name} | Ramanayam`,
          seoDescription: `Buy ${prod.name} (${prod.nameHi}) from Ramanayam. ${prod.unit}. Starting from ₹${prod.minPrice.toLocaleString("en-IN")}.`,
        },
      });
      console.log(`   ✨ Created: ${prod.name}`);
    }

    totalProducts++;

    // Create default variant with min price (flagged for admin pricing)
    const defaultSku = generateSku(catCode, prod.productCode, "STD");

    const existingVariant = await prisma.productVariant.findUnique({ where: { sku: defaultSku } });

    if (!existingVariant) {
      const hasRange = prod.maxPrice > prod.minPrice;
      const variantName = prod.variantType === "single" ? "Standard" : `${prod.unit}`;
      const attributes: Record<string, string> = { unit: prod.unit };

      if (hasRange) {
        attributes.priceRangeMin = `₹${prod.minPrice.toLocaleString("en-IN")}`;
        attributes.priceRangeMax = `₹${prod.maxPrice.toLocaleString("en-IN")}`;
      }

      await prisma.productVariant.create({
        data: {
          productId: product.id,
          sku: defaultSku,
          variantName,
          attributes,
          price: prod.minPrice,
          compareAtPrice: prod.maxPrice > prod.minPrice ? prod.maxPrice : null,
          isDefault: true,
          isActive: true,
          needsPricing: prod.maxPrice > prod.minPrice,
          inventory: {
            create: {
              availableStock: 25,
              reservedStock: 0,
              soldStock: 0,
              lowStockAlert: 5,
            },
          },
        },
      });

      totalVariants++;
      if (prod.maxPrice > prod.minPrice) needsPricingCount++;

      if (prod.variantType === "single") {
        singleVariantCount++;
      } else {
        multiVariantCount++;
      }
    }
  }

  // ── Step 4: Report ─────────────────────────────────────────
  console.log("\n═══════════════════════════════════════════════════");
  console.log("📊 CATALOGUE SEED REPORT");
  console.log("═══════════════════════════════════════════════════");
  console.log(`   Categories:                 ${categoryMap.size}`);
  console.log(`   Products:                   ${totalProducts}`);
  console.log(`   Variants created:           ${totalVariants}`);
  console.log(`   Products w/ single variant: ${singleVariantCount}`);
  console.log(`   Products needing pricing:   ${needsPricingCount}`);
  console.log(`   Multi-variant products:     ${multiVariantCount}`);
  console.log("═══════════════════════════════════════════════════\n");
}

// Allow direct execution
if (require.main === module) {
  seedCatalogue()
    .catch((e) => {
      console.error("❌ Catalogue seed failed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
