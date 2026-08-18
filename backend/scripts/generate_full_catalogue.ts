/**
 * ═══════════════════════════════════════════════════════════════════
 * RAMANAYAM FULL PRODUCT CATALOGUE GENERATOR
 * ═══════════════════════════════════════════════════════════════════
 *
 * Generates ~1,060 realistic temple/pooja products across 20 categories.
 * Output: CSV file at ./data/ramanayam_full_catalogue.csv
 *
 * Run:  npx ts-node scripts/generate_full_catalogue.ts
 * ═══════════════════════════════════════════════════════════════════
 */

import * as fs from "fs";
import * as path from "path";

// ─── Image pools per category (high-quality Unsplash) ─────────────
const IMAGES: Record<string, string[]> = {
  "Pooja Samagri": [
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
  ],
  "Pooja Thali & Accessories": [
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
  ],
  "Temple Decoration": [
    "https://images.unsplash.com/photo-1545232979-fbf5d96b1b44?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605649461121-e82138c51b7e?w=800&auto=format&fit=crop&q=80",
  ],
  "Bhagwan Vastra": [
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
  ],
  "Mukut & Shringar": [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
  ],
  "Mala": [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
  ],
  "Murti": [
    "https://images.unsplash.com/photo-1567591416417-76348efc63c7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1585116906791-d0904fcce25e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545232979-fbf5d96b1b44?w=800&auto=format&fit=crop&q=80",
  ],
  "Mandir": [
    "https://images.unsplash.com/photo-1545232979-fbf5d96b1b44?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605649461121-e82138c51b7e?w=800&auto=format&fit=crop&q=80",
  ],
  "Shankh & Bells": [
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&auto=format&fit=crop&q=80",
  ],
  "Brass & Copper Items": [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
  ],
  "Rudraksha Collection": [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
  ],
  "Yantra": [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&auto=format&fit=crop&q=80",
  ],
  "Books & Scriptures": [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
  ],
  "Festival Special": [
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605649461121-e82138c51b7e?w=800&auto=format&fit=crop&q=80",
  ],
  "Pooja Kits": [
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
  ],
  "Bhog & Prasad": [
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
  ],
  "Clothing & Religious Wear": [
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
  ],
  "Spiritual Accessories": [
    "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
  ],
  "Home Fragrance": [
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590249350651-28a2c5aa0de3?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
  ],
  "Gift Items": [
    "https://images.unsplash.com/photo-1549465220-1a8b9238f760?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604607053070-6ede2b4c6747?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605649461121-e82138c51b7e?w=800&auto=format&fit=crop&q=80",
  ],
};

// ─── Product templates per category ────────────────────────────────
interface ProductTemplate {
  name: string;
  shortDesc: string;
  desc: string;
  priceMin: number;
  priceMax: number;
  weightMin: number;
  weightMax: number;
  stockMin: number;
  stockMax: number;
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function roundToNine(n: number): number {
  // Round to nearest 9-ending price (e.g., 199, 249, 999)
  return Math.ceil(n / 10) * 10 - 1;
}

// ─── Category product definitions ──────────────────────────────────
const CATALOGUE: Record<string, ProductTemplate[]> = {
  "Pooja Samagri": [
    { name: "Pure Bhimseni Camphor (Kapur) {size}", shortDesc: "100% pure organic bhimseni camphor for aarti", desc: "Premium quality bhimseni camphor flakes, zero residue, leaves sacred aroma during aarti and havan rituals. Sourced from natural camphor trees.", priceMin: 99, priceMax: 599, weightMin: 50, weightMax: 500, stockMin: 50, stockMax: 300 },
    { name: "Organic Cotton Wicks (Batti) {size} Count", shortDesc: "Hand-rolled pure cotton wicks for diyas", desc: "Unbleached raw organic cotton wicks hand-rolled for perfect flame. Ideal for daily diya lighting in temples and home mandirs.", priceMin: 49, priceMax: 249, weightMin: 50, weightMax: 200, stockMin: 100, stockMax: 500 },
    { name: "Premium Dhoop Sticks {variant} Pack", shortDesc: "Natural bamboo-less dhoop for meditation", desc: "Hand-rolled natural dhoop sticks made from pure herbs and essential oils. Bamboo-less for clean burning and spiritual ambiance.", priceMin: 79, priceMax: 399, weightMin: 80, weightMax: 300, stockMin: 80, stockMax: 400 },
    { name: "Pure Havan Samagri {size}", shortDesc: "Traditional sacred fire ritual mixture", desc: "Authentic havan samagri containing 51 sacred herbs including guggal, kapoor kachri, nagarmotha for Vedic fire rituals.", priceMin: 149, priceMax: 799, weightMin: 100, weightMax: 1000, stockMin: 40, stockMax: 200 },
    { name: "Kumkum Roli Chandan Tilak Set {variant}", shortDesc: "Traditional tilak ceremony set", desc: "Premium quality turmeric-derived roli kumkum with pure sandalwood paste and akshat rice for daily tilak and puja ceremonies.", priceMin: 79, priceMax: 349, weightMin: 50, weightMax: 200, stockMin: 60, stockMax: 300 },
    { name: "Natural Cow Ghee Diya Oil {size}", shortDesc: "Pure desi ghee for temple diyas", desc: "100% pure A2 cow ghee specially filtered for diya lighting. Produces clean golden flame with divine fragrance.", priceMin: 199, priceMax: 899, weightMin: 250, weightMax: 1000, stockMin: 30, stockMax: 150 },
    { name: "Sacred Gangajal (Ganga Water) {size}", shortDesc: "Holy Ganga river water for puja", desc: "Authentic purified Gangajal from Haridwar ghat for abhishekam, griha pravesh, and all sacred Hindu rituals.", priceMin: 99, priceMax: 499, weightMin: 100, weightMax: 500, stockMin: 40, stockMax: 200 },
    { name: "Sindoor Powder {variant} {size}", shortDesc: "Traditional vermillion powder", desc: "Premium quality natural sindoor made from turmeric and lime. Lead-free and safe for daily religious application.", priceMin: 49, priceMax: 199, weightMin: 20, weightMax: 100, stockMin: 80, stockMax: 400 },
    { name: "Akshat (Sacred Rice) {variant} {size}", shortDesc: "Coloured rice grains for puja offerings", desc: "Premium quality turmeric-coloured unbroken rice grains for puja offerings, tilak ceremonies and religious rituals.", priceMin: 49, priceMax: 149, weightMin: 50, weightMax: 250, stockMin: 80, stockMax: 400 },
    { name: "Panchamrit Mix Powder {size}", shortDesc: "Five-nectar mixture for abhishekam", desc: "Authentic panchamrit preparation powder containing dried milk, honey, curd, sugar and tulsi for deity abhishekam.", priceMin: 99, priceMax: 399, weightMin: 50, weightMax: 250, stockMin: 40, stockMax: 200 },
    { name: "Navgraha Pooja Samagri Kit {variant}", shortDesc: "Nine-planet ritual items collection", desc: "Complete navgraha pooja kit with all 9 grains, coloured cloths, specific samagri items for each planetary deity.", priceMin: 249, priceMax: 999, weightMin: 200, weightMax: 800, stockMin: 20, stockMax: 100 },
    { name: "Janeu (Sacred Thread) {variant} Set", shortDesc: "Pure cotton sacred thread for ceremonies", desc: "Hand-spun pure cotton janeu sacred threads for Upanayana ceremony and daily religious observances.", priceMin: 29, priceMax: 149, weightMin: 10, weightMax: 50, stockMin: 100, stockMax: 500 },
    { name: "Lobaan Guggal Resin {size}", shortDesc: "Natural aromatic temple resin incense", desc: "Premium quality natural lobaan and guggal resin for burning in temple dhunachi. Purifies environment and creates devotional atmosphere.", priceMin: 99, priceMax: 499, weightMin: 50, weightMax: 500, stockMin: 40, stockMax: 200 },
    { name: "Kamal Gatta (Lotus Seeds) Mala {variant}", shortDesc: "Lotus seed prayer mala for Lakshmi puja", desc: "Natural dried lotus seeds strung on silk thread for Lakshmi puja jaap. Each seed symbolizes prosperity and divine grace.", priceMin: 149, priceMax: 599, weightMin: 30, weightMax: 100, stockMin: 30, stockMax: 150 },
  ],
  "Pooja Thali & Accessories": [
    { name: "Heavy Brass Pooja Thali Set {size} Inch", shortDesc: "Handcrafted solid brass pooja thali", desc: "Premium heavy-gauge handcrafted brass thali set with matching diya holder, agarbatti stand, kumkum container and bell. Perfect for daily aarti.", priceMin: 599, priceMax: 3999, weightMin: 400, weightMax: 2000, stockMin: 15, stockMax: 80 },
    { name: "German Silver Pooja Thali {size} Inch", shortDesc: "Elegant German silver aarti plate", desc: "Lustrous German silver plated pooja thali with intricate peacock and floral motifs. Includes matching accessories.", priceMin: 399, priceMax: 2499, weightMin: 300, weightMax: 1200, stockMin: 20, stockMax: 100 },
    { name: "Pure Copper Pooja Thali Set {size} Inch", shortDesc: "Ayurvedic-grade copper ritual plate", desc: "Seamless pure copper pooja thali set with antimicrobial properties. Includes copper diya, kalash, and spoon.", priceMin: 499, priceMax: 2999, weightMin: 350, weightMax: 1500, stockMin: 15, stockMax: 70 },
    { name: "Stainless Steel Pooja Thali Premium {size} Inch", shortDesc: "Mirror-finish stainless steel thali", desc: "Heavy-duty mirror-polished stainless steel pooja thali with laser-etched Om motif. Rust-proof and easy maintenance.", priceMin: 299, priceMax: 1499, weightMin: 250, weightMax: 1000, stockMin: 25, stockMax: 120 },
    { name: "Brass Aarti Diya {variant} Wick", shortDesc: "Traditional multi-wick brass aarti lamp", desc: "Hand-carved brass aarti diya lamp with {variant} cotton wick holders. Produces bright stable flames for evening aarti.", priceMin: 199, priceMax: 1299, weightMin: 150, weightMax: 800, stockMin: 30, stockMax: 150 },
    { name: "Pooja Thali Katori Set {variant} Piece", shortDesc: "Small brass bowls for offerings", desc: "Set of miniature brass katoris for holding kumkum, chandan, akshat, sindoor, and haldi during pooja rituals.", priceMin: 149, priceMax: 799, weightMin: 100, weightMax: 400, stockMin: 30, stockMax: 150 },
    { name: "Brass Agarbatti Stand {variant}", shortDesc: "Ornate incense stick holder", desc: "Decorative brass incense stick holder with ash collection tray and intricate temple motifs. Holds multiple agarbattis.", priceMin: 149, priceMax: 699, weightMin: 100, weightMax: 350, stockMin: 40, stockMax: 180 },
    { name: "Silver Plated Achmani Spoon {variant}", shortDesc: "Ritual spoon for holy water", desc: "Elegant silver-plated brass achmani spoon for offering sacred water during abhishekam and other puja rituals.", priceMin: 99, priceMax: 499, weightMin: 30, weightMax: 100, stockMin: 40, stockMax: 200 },
    { name: "Brass Camphor Burner (Kapoor Dani) {variant}", shortDesc: "Decorative camphor burner with handle", desc: "Ornate brass kapoor dani with heat-resistant wooden handle. Features lotus design and controlled air flow for even burning.", priceMin: 199, priceMax: 899, weightMin: 100, weightMax: 400, stockMin: 25, stockMax: 120 },
    { name: "Panch Patra Set Brass {variant}", shortDesc: "Five-vessel ritual water set", desc: "Traditional brass panch patra set with achmani spoon for offering water, milk, curd, honey and ghee during puja.", priceMin: 249, priceMax: 1299, weightMin: 150, weightMax: 600, stockMin: 20, stockMax: 100 },
  ],
  "Temple Decoration": [
    { name: "Handmade Toran Door Hanging {variant}", shortDesc: "Auspicious door decoration toran", desc: "Beautifully handcrafted toran with mango leaves, marigold motifs and mirror work. Brings auspiciousness to entrance doorways.", priceMin: 199, priceMax: 1499, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
    { name: "LED Temple Light String {size} Meter", shortDesc: "Warm golden LED lights for mandir", desc: "Dimmable warm golden LED fairy lights specially designed for home temple illumination. Low power consumption with long life.", priceMin: 149, priceMax: 999, weightMin: 50, weightMax: 200, stockMin: 40, stockMax: 200 },
    { name: "Artificial Marigold Garland {variant} Feet", shortDesc: "Silk flower garland for decoration", desc: "Premium artificial marigold garland with realistic texture and vibrant color. Reusable for years of festival celebrations.", priceMin: 99, priceMax: 599, weightMin: 50, weightMax: 200, stockMin: 50, stockMax: 300 },
    { name: "Brass Temple Hanging Diya {variant}", shortDesc: "Ornamental hanging oil lamp", desc: "Decorative brass hanging diya with peacock chain design. Creates beautiful ambiance when lit during evening aarti.", priceMin: 299, priceMax: 2499, weightMin: 200, weightMax: 1000, stockMin: 15, stockMax: 80 },
    { name: "Velvet Singhasan Throne {size} Inch", shortDesc: "Deity throne with zardozi work", desc: "Rich velvet-covered singhasan with golden zardozi embroidery and cushion for deity seating. Perfect for home mandir.", priceMin: 299, priceMax: 3499, weightMin: 100, weightMax: 800, stockMin: 15, stockMax: 60 },
    { name: "Temple Pillar Decoration Set {variant}", shortDesc: "Miniature pillar mandir accessories", desc: "Ornate miniature temple pillar set with carved floral patterns for enhancing home mandir aesthetics.", priceMin: 399, priceMax: 2999, weightMin: 200, weightMax: 1500, stockMin: 10, stockMax: 50 },
    { name: "Brass Akhand Jyoti Stand {variant}", shortDesc: "Eternal flame oil lamp stand", desc: "Heavy brass akhand jyoti lamp with large oil reservoir for continuous burning. Designed for temple sanctum use.", priceMin: 399, priceMax: 2999, weightMin: 300, weightMax: 1500, stockMin: 10, stockMax: 60 },
    { name: "Stone Carved Deity Backdrop {variant}", shortDesc: "Carved stone temple backdrop panel", desc: "Intricately hand-carved soapstone deity backdrop with traditional South Indian temple architecture motifs.", priceMin: 999, priceMax: 6999, weightMin: 1000, weightMax: 5000, stockMin: 5, stockMax: 25 },
    { name: "Brass Temple Bell Wall Mount {variant}", shortDesc: "Wall-mounted decorative temple bell", desc: "Ornamental brass wall-mounted temple bell with deity motif bracket. Produces resonant tone during pooja.", priceMin: 299, priceMax: 1999, weightMin: 200, weightMax: 800, stockMin: 15, stockMax: 70 },
    { name: "Handpainted Pichwai Art Print {variant}", shortDesc: "Traditional Pichwai temple art on canvas", desc: "Museum-quality Pichwai style painting on archival canvas depicting Shrinathji and divine leela scenes.", priceMin: 499, priceMax: 4999, weightMin: 200, weightMax: 1000, stockMin: 8, stockMax: 40 },
  ],
  "Bhagwan Vastra": [
    { name: "Velvet Poshak Dress for Laddu Gopal {size} No", shortDesc: "Embroidered velvet deity dress", desc: "Luxurious zardozi embroidered velvet poshak with matching pagdi and accessories for Laddu Gopal murti.", priceMin: 149, priceMax: 1499, weightMin: 30, weightMax: 150, stockMin: 30, stockMax: 150 },
    { name: "Silk Vastra Set for {deity} {size} Inch", shortDesc: "Pure silk deity garment set", desc: "Pure Banarasi silk vastra set with golden border and intricate weaving. Complete outfit for deity murti.", priceMin: 199, priceMax: 2499, weightMin: 30, weightMax: 200, stockMin: 20, stockMax: 100 },
    { name: "Embroidered Net Chunni for Devi {variant}", shortDesc: "Decorated dupatta for goddess murti", desc: "Delicate net chunni with golden zari embroidery and sequin work for Durga, Lakshmi and other Devi murtis.", priceMin: 99, priceMax: 799, weightMin: 20, weightMax: 80, stockMin: 30, stockMax: 150 },
    { name: "Cotton Dhoti Set for Deity {size} Inch", shortDesc: "Pure cotton deity dhoti and angvastra", desc: "Handloom pure cotton dhoti with matching angvastra for Lord Shiva, Vishnu, and other male deity murtis.", priceMin: 99, priceMax: 599, weightMin: 20, weightMax: 100, stockMin: 30, stockMax: 150 },
    { name: "Sequin Work Pagdi Crown Cap {size} No", shortDesc: "Decorated turban cap for deity", desc: "Hand-stitched pagdi cap with mirror work, sequins, and pearl embellishments for Krishna and Shiva murtis.", priceMin: 79, priceMax: 499, weightMin: 15, weightMax: 60, stockMin: 40, stockMax: 200 },
    { name: "Woolen Winter Poshak for Laddu Gopal {size} No", shortDesc: "Warm winter deity dress", desc: "Soft woolen knitted winter poshak for Laddu Gopal with matching cap and blanket. Perfect for winter months.", priceMin: 99, priceMax: 699, weightMin: 30, weightMax: 100, stockMin: 30, stockMax: 150 },
    { name: "Bridal Lehenga Set for Devi Murti {size} Inch", shortDesc: "Festive bridal outfit for goddess", desc: "Elaborate miniature bridal lehenga choli set with embroidery, sequins, and dupatta for goddess murtis.", priceMin: 249, priceMax: 1999, weightMin: 40, weightMax: 150, stockMin: 15, stockMax: 80 },
    { name: "Floral Print Raas Leela Vastra Set {variant}", shortDesc: "Matching Radha-Krishna outfit pair", desc: "Coordinated Radha-Krishna dress set with floral prints and golden accents for Raas Leela theme decoration.", priceMin: 299, priceMax: 2499, weightMin: 50, weightMax: 200, stockMin: 12, stockMax: 60 },
    { name: "Satin Chaddar Blanket for Deity {size} Inch", shortDesc: "Soft satin deity bed covering", desc: "Premium quality satin chaddar with golden lace border for deity bedding. Soft, luxurious, and easy to maintain.", priceMin: 99, priceMax: 599, weightMin: 30, weightMax: 100, stockMin: 30, stockMax: 150 },
    { name: "Festival Theme Poshak Set {variant} {size} No", shortDesc: "Special occasion deity dress", desc: "Themed poshak set designed for specific festivals — Janmashtami, Diwali, Holi, and other celebrations.", priceMin: 149, priceMax: 1299, weightMin: 30, weightMax: 120, stockMin: 20, stockMax: 100 },
  ],
  "Mukut & Shringar": [
    { name: "Gold Plated Stone Studded Mukut {size} Inch", shortDesc: "Royal crown for deity idols", desc: "Adjustable gold-finish stone-studded mukut crown with intricate kundan work. Perfect for Krishna and other deity murtis.", priceMin: 149, priceMax: 2499, weightMin: 30, weightMax: 150, stockMin: 20, stockMax: 100 },
    { name: "Silver Finish Deity Mukut Crown {size} Inch", shortDesc: "Elegant silver-tone deity crown", desc: "High-quality silver-plated mukut with pearl and crystal embellishments for Shiva, Ganesh, and other deities.", priceMin: 199, priceMax: 1999, weightMin: 30, weightMax: 120, stockMin: 20, stockMax: 100 },
    { name: "Brass Bansuri (Flute) for Krishna {size} Inch", shortDesc: "Decorative brass flute for Lord Krishna", desc: "Handcrafted brass bansuri with golden finish for Krishna murti shringar. Detailed finger holes and mouthpiece.", priceMin: 99, priceMax: 599, weightMin: 20, weightMax: 100, stockMin: 30, stockMax: 150 },
    { name: "Deity Necklace Haar Set {variant}", shortDesc: "Miniature jewelry set for murti", desc: "Intricate miniature necklace haar set with matching earrings and tikka for deity shringar decoration.", priceMin: 99, priceMax: 1499, weightMin: 15, weightMax: 60, stockMin: 25, stockMax: 120 },
    { name: "Kamar Bandh (Waist Belt) for Murti {size}", shortDesc: "Decorative deity waist ornament", desc: "Golden finish kamar bandh waist belt with hanging chains and stone work for deity murti adornment.", priceMin: 79, priceMax: 799, weightMin: 15, weightMax: 50, stockMin: 30, stockMax: 150 },
    { name: "Meenakari Shringar Set {variant}", shortDesc: "Rajasthani enamel work jewelry set", desc: "Exquisite Meenakari enamel work shringar set in traditional Rajasthani style for deity decoration.", priceMin: 199, priceMax: 1999, weightMin: 20, weightMax: 80, stockMin: 15, stockMax: 80 },
    { name: "Deity Armlet Bajuband Pair {variant}", shortDesc: "Upper arm decoration for murti", desc: "Ornate bajuband pair with spring mechanism for easy fitting on deity murti arms. Stone and pearl work.", priceMin: 79, priceMax: 599, weightMin: 10, weightMax: 40, stockMin: 30, stockMax: 150 },
    { name: "Chhatra Umbrella for Deity {size} Inch", shortDesc: "Miniature ceremonial umbrella", desc: "Handcrafted decorative chhatra (umbrella) with velvet and golden embroidery for deity procession and mandir.", priceMin: 149, priceMax: 1299, weightMin: 30, weightMax: 150, stockMin: 15, stockMax: 70 },
    { name: "Morpankh (Peacock Feather) Set {variant}", shortDesc: "Natural peacock feather for Krishna", desc: "Premium quality natural peacock feathers for Lord Krishna murti decoration. Ethically sourced and preserved.", priceMin: 49, priceMax: 299, weightMin: 10, weightMax: 30, stockMin: 50, stockMax: 300 },
    { name: "Deity Payal Anklet Set {variant}", shortDesc: "Miniature anklet bells for murti", desc: "Delicate silver-tone payal anklets with tiny jingling bells for deity murti feet decoration.", priceMin: 69, priceMax: 399, weightMin: 10, weightMax: 30, stockMin: 40, stockMax: 200 },
  ],
  "Mala": [
    { name: "5 Mukhi Rudraksha Japa Mala 108+1 Beads {variant}", shortDesc: "Certified Nepali Rudraksha prayer mala", desc: "Lab-certified genuine 5 mukhi Nepali Rudraksha beads strung in traditional red silk thread. 108+1 beads for japa meditation.", priceMin: 299, priceMax: 2499, weightMin: 30, weightMax: 100, stockMin: 20, stockMax: 100 },
    { name: "Tulsi Japa Mala {variant} Beads", shortDesc: "Holy basil wood meditation mala", desc: "Hand-carved original tulsi (holy basil) wood beads strung on silk thread. Sacred for Vaishnavite devotees and daily jaap.", priceMin: 99, priceMax: 799, weightMin: 20, weightMax: 60, stockMin: 30, stockMax: 150 },
    { name: "Sphatik (Crystal Quartz) Mala {variant}", shortDesc: "Natural crystal quartz prayer mala", desc: "Premium quality natural sphatik (crystal quartz) mala with transparent beads. Ideal for Devi puja and spiritual healing.", priceMin: 299, priceMax: 3999, weightMin: 30, weightMax: 120, stockMin: 15, stockMax: 80 },
    { name: "Sandalwood (Chandan) Mala {size}mm Beads", shortDesc: "Fragrant sandalwood meditation beads", desc: "Genuine Mysore sandalwood mala with natural fragrance that deepens with meditation. Calming and spiritual aid.", priceMin: 199, priceMax: 2999, weightMin: 20, weightMax: 80, stockMin: 15, stockMax: 80 },
    { name: "White Vaijanti Mala {variant}", shortDesc: "Sacred Job's tears seed mala", desc: "Natural white vaijanti beads mala sacred to Lord Vishnu. Used for Vishnu Sahasranama and Narayana mantra jaap.", priceMin: 99, priceMax: 599, weightMin: 15, weightMax: 50, stockMin: 30, stockMax: 150 },
    { name: "Red Coral (Moonga) Mala {variant}", shortDesc: "Natural red coral prayer mala", desc: "Authentic red coral (moonga) bead mala for Mangal (Mars) graha shanti puja and astrological remedies.", priceMin: 399, priceMax: 4999, weightMin: 20, weightMax: 80, stockMin: 10, stockMax: 50 },
    { name: "Black Agate (Hakik) Mala {variant}", shortDesc: "Semi-precious black onyx prayer mala", desc: "Polished natural black hakik (agate) mala for protection and grounding meditation. 108+1 beads on silk cord.", priceMin: 199, priceMax: 1499, weightMin: 30, weightMax: 100, stockMin: 20, stockMax: 100 },
    { name: "Lotus Seed (Kamal Gatta) Mala {variant}", shortDesc: "Dried lotus seed meditation beads", desc: "Natural dried lotus seed mala sacred for Lakshmi puja. Each seed represents purity and spiritual awakening.", priceMin: 99, priceMax: 499, weightMin: 15, weightMax: 50, stockMin: 30, stockMax: 150 },
    { name: "Tiger Eye Stone Mala {variant}", shortDesc: "Natural tiger eye crystal mala", desc: "Polished natural tiger eye semi-precious stone mala for courage, confidence, and spiritual protection.", priceMin: 299, priceMax: 1999, weightMin: 30, weightMax: 100, stockMin: 15, stockMax: 80 },
    { name: "Navratna (Nine Gem) Bracelet Mala {variant}", shortDesc: "Nine-gem astrological bracelet", desc: "Genuine navratna bracelet with 9 natural gemstones representing all 9 planets for astrological harmony.", priceMin: 499, priceMax: 4999, weightMin: 15, weightMax: 40, stockMin: 10, stockMax: 50 },
    { name: "Pearl (Moti) Mala {variant}", shortDesc: "Natural freshwater pearl mala", desc: "Genuine freshwater pearl mala for Chandra (Moon) planet remedies and calming meditation practice.", priceMin: 299, priceMax: 2999, weightMin: 20, weightMax: 60, stockMin: 15, stockMax: 80 },
  ],
  "Murti": [
    { name: "Brass Lord Ganesha Idol {size} Inch", shortDesc: "Solid brass Ganpati murti", desc: "Intricately hand-carved solid brass Lord Ganesha idol in blessing posture. Each piece is unique with detailed craftsmanship.", priceMin: 499, priceMax: 12999, weightMin: 200, weightMax: 5000, stockMin: 5, stockMax: 40 },
    { name: "Marble Radha Krishna Murti {size} Inch", shortDesc: "White marble Radha-Krishna idol", desc: "Hand-carved pure white Makrana marble Radha Krishna murti with hand-painted floral decorations and gold accents.", priceMin: 999, priceMax: 19999, weightMin: 500, weightMax: 8000, stockMin: 3, stockMax: 20 },
    { name: "Panchdhatu Lord Shiva Idol {size} Inch", shortDesc: "Five-metal Mahadev murti", desc: "Sacred panchdhatu (five-metal alloy) Shiva idol in Dhyana (meditation) posture. Consecration-ready temple grade.", priceMin: 799, priceMax: 14999, weightMin: 300, weightMax: 4000, stockMin: 5, stockMax: 30 },
    { name: "Brass Laddu Gopal Baby Krishna {size} No", shortDesc: "Playful baby Krishna brass idol", desc: "Adorable solid brass Laddu Gopal baby Krishna murti with butter pot. Perfect for home puja and shringar.", priceMin: 299, priceMax: 4999, weightMin: 80, weightMax: 1500, stockMin: 10, stockMax: 60 },
    { name: "Resin Hanuman Ji Idol {size} Inch", shortDesc: "Detailed Bajrangbali resin statue", desc: "High-detail sculpted resin Lord Hanuman idol in Veera (heroic) posture. Hand-painted with antique bronze finish.", priceMin: 399, priceMax: 6999, weightMin: 200, weightMax: 3000, stockMin: 8, stockMax: 40 },
    { name: "White Marble Lakshmi Ganesh Murti {size} Inch", shortDesc: "Auspicious Lakshmi-Ganesh pair", desc: "Hand-carved Makrana marble Lakshmi Ganesh pair murti for Diwali puja and prosperity. Gold leaf detailing.", priceMin: 999, priceMax: 24999, weightMin: 500, weightMax: 10000, stockMin: 3, stockMax: 15 },
    { name: "Brass Durga Maa Idol {size} Inch", shortDesc: "Solid brass Durga Devi murti", desc: "Powerful solid brass Durga Maa idol depicting Mahishasura Mardini form. Eight-armed with all divine weapons.", priceMin: 799, priceMax: 14999, weightMin: 300, weightMax: 5000, stockMin: 5, stockMax: 25 },
    { name: "Nandi Bull Brass Idol {size} Inch", shortDesc: "Shiva's mount Nandi brass murti", desc: "Hand-crafted brass Nandi bull idol in seated posture. Traditional companion piece for Shiva linga puja.", priceMin: 299, priceMax: 4999, weightMin: 150, weightMax: 2000, stockMin: 8, stockMax: 40 },
    { name: "Ram Darbar Murti Set Brass {size} Inch", shortDesc: "Complete Ram family idol set", desc: "Complete Ram Darbar set with Lord Ram, Sita, Lakshman, and Hanuman in brass. Ideal for Ayodhya Ram Mandir devotees.", priceMin: 1499, priceMax: 19999, weightMin: 500, weightMax: 6000, stockMin: 3, stockMax: 15 },
    { name: "Crystal Shivling with Nag {size} Inch", shortDesc: "Natural crystal quartz Shiva lingam", desc: "Polished natural sphatik (crystal quartz) Shivling with brass Nag (serpent). Energised for daily abhishekam.", priceMin: 499, priceMax: 9999, weightMin: 100, weightMax: 2000, stockMin: 5, stockMax: 30 },
    { name: "Brass Saraswati Maa Idol {size} Inch", shortDesc: "Goddess of knowledge brass murti", desc: "Elegant brass Saraswati Devi idol with veena, seated on lotus. Perfect for study rooms and educational institutions.", priceMin: 499, priceMax: 9999, weightMin: 200, weightMax: 3000, stockMin: 5, stockMax: 30 },
    { name: "Vishnu Laxmi Brass Idol Set {size} Inch", shortDesc: "Lord Vishnu with Lakshmi pair", desc: "Majestic brass Vishnu-Lakshmi seated idol pair with Garuda motif base. Detailed crown and ornament work.", priceMin: 999, priceMax: 14999, weightMin: 400, weightMax: 5000, stockMin: 3, stockMax: 20 },
  ],
  "Mandir": [
    { name: "Sheesham Wood Home Temple {variant} {size}", shortDesc: "Solid sheesham wood pooja mandir", desc: "Handcrafted solid sheesham (Indian rosewood) home mandir with carved dome, dual doors, and storage shelf.", priceMin: 2999, priceMax: 24999, weightMin: 3000, weightMax: 15000, stockMin: 3, stockMax: 15 },
    { name: "Wall Mounted Wooden Mandir {variant}", shortDesc: "Space-saving wall-mount temple", desc: "Elegant wall-mountable wooden mandir with LED backlight and carved lattice doors. Perfect for compact spaces.", priceMin: 1499, priceMax: 12999, weightMin: 2000, weightMax: 8000, stockMin: 5, stockMax: 25 },
    { name: "Marble Home Temple {size} Inch", shortDesc: "White marble carved mandir", desc: "Exquisite hand-carved white marble home temple with traditional Rajasthani jharokha design and dome.", priceMin: 4999, priceMax: 49999, weightMin: 5000, weightMax: 30000, stockMin: 2, stockMax: 8 },
    { name: "Teakwood Pooja Cabinet {variant}", shortDesc: "Premium teak wood temple cabinet", desc: "Premium Burma teakwood pooja cabinet with multiple deity shelves, drawer storage, and golden fittings.", priceMin: 3499, priceMax: 29999, weightMin: 4000, weightMax: 18000, stockMin: 3, stockMax: 12 },
    { name: "MDF Engineered Wood Mandir {variant}", shortDesc: "Modern MDF pooja unit with LED", desc: "Contemporary design MDF engineered wood mandir with built-in LED strips, glass shelf, and easy assembly.", priceMin: 1999, priceMax: 9999, weightMin: 2000, weightMax: 8000, stockMin: 8, stockMax: 40 },
    { name: "Brass Tabletop Mini Mandir {size} Inch", shortDesc: "Portable brass desktop temple", desc: "Compact all-brass tabletop mini mandir with carved pillars and dome. Ideal for office desk or travel use.", priceMin: 999, priceMax: 6999, weightMin: 500, weightMax: 3000, stockMin: 5, stockMax: 30 },
    { name: "Plywood Pooja Stand with Storage {variant}", shortDesc: "Functional plywood temple shelf", desc: "Budget-friendly plywood pooja stand with laminated finish, multiple shelves, and bottom drawer for samagri.", priceMin: 999, priceMax: 4999, weightMin: 1500, weightMax: 6000, stockMin: 10, stockMax: 50 },
    { name: "Open Shelf Wooden Mandir {variant}", shortDesc: "Open-style wooden temple shelf", desc: "Minimalist open-shelf wooden mandir design allowing full visibility of deities. Modern yet traditional aesthetic.", priceMin: 1499, priceMax: 7999, weightMin: 2000, weightMax: 6000, stockMin: 5, stockMax: 30 },
  ],
  "Shankh & Bells": [
    { name: "Vamavarti Natural Blowable Shankh {size}", shortDesc: "Ocean shell blowable conch", desc: "Authentic natural ocean shell vamavarti shankh producing deep resonant Om sound. Polished and ritual-ready.", priceMin: 299, priceMax: 3999, weightMin: 150, weightMax: 800, stockMin: 10, stockMax: 60 },
    { name: "Dakshinavarti Shankh {size} Inch", shortDesc: "Rare right-turning sacred conch", desc: "Rare natural dakshinavarti (right-turning) shankh considered highly auspicious for Lakshmi puja and prosperity.", priceMin: 999, priceMax: 9999, weightMin: 200, weightMax: 1200, stockMin: 3, stockMax: 15 },
    { name: "Pure Brass Temple Hand Bell (Ghanti) {variant}", shortDesc: "Resonant brass pooja bell", desc: "Pure brass hand-held temple bell with deity motif handle. Produces clear resonant vibrations for aarti.", priceMin: 199, priceMax: 1499, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
    { name: "Brass Hanging Temple Bell {variant}", shortDesc: "Chain-hung ornamental bell", desc: "Ornate brass hanging bell with long brass chain for temple ceiling mounting. Deep rich tone for ritual significance.", priceMin: 299, priceMax: 2999, weightMin: 200, weightMax: 1500, stockMin: 10, stockMax: 50 },
    { name: "Brass Nag (Serpent) Decorated Shankh Stand", shortDesc: "Decorative conch shell holder", desc: "Ornamental brass Nag (cobra) stand for resting shankh during non-use. Adds royal temple aesthetic.", priceMin: 199, priceMax: 999, weightMin: 100, weightMax: 400, stockMin: 15, stockMax: 70 },
    { name: "Small Pooja Ghanti Set {variant} Piece", shortDesc: "Miniature brass bell set", desc: "Set of small brass puja ghantis in different sizes for coordinated ringing during aarti and bhajan.", priceMin: 149, priceMax: 799, weightMin: 80, weightMax: 300, stockMin: 20, stockMax: 100 },
    { name: "Tibetan Singing Bowl {size} Inch", shortDesc: "Meditation sound therapy bowl", desc: "Handcrafted Tibetan singing bowl with wooden mallet for meditation sound therapy and chakra healing sessions.", priceMin: 499, priceMax: 4999, weightMin: 200, weightMax: 1500, stockMin: 8, stockMax: 40 },
    { name: "Brass Ghanta Mala (Bell Garland) {variant}", shortDesc: "Decorative bell string for mandir", desc: "String of small brass bells (ghanta mala) for hanging on temple doors and entrances. Melodious tinkling sound.", priceMin: 149, priceMax: 999, weightMin: 100, weightMax: 400, stockMin: 20, stockMax: 100 },
    { name: "Panchmukhi Shankh (Five-Faced Conch) {variant}", shortDesc: "Rare five-opening sacred conch", desc: "Extremely rare natural five-faced shankh for advanced Tantric and Vaishnav puja. Certified natural formation.", priceMin: 1999, priceMax: 14999, weightMin: 200, weightMax: 800, stockMin: 2, stockMax: 10 },
  ],
  "Brass & Copper Items": [
    { name: "Pure Copper Lota / Kalash {size}ml", shortDesc: "Seamless copper water vessel", desc: "Seamless pure copper lota kalash for offering Jal to Surya Dev and deity abhishekam. Ayurvedic-grade copper.", priceMin: 199, priceMax: 1999, weightMin: 100, weightMax: 800, stockMin: 20, stockMax: 100 },
    { name: "Brass Panchpatra with Spoon {variant}", shortDesc: "Five-metal ritual water vessel", desc: "Traditional brass panchpatra with matching achmani spoon for sacred water offering during Hindu puja rituals.", priceMin: 249, priceMax: 1499, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
    { name: "Copper Havan Kund {size} Inch", shortDesc: "Sacred fire pit for Vedic rituals", desc: "Pure copper pyramid-shaped havan kund for performing Vedic fire rituals and yagya ceremonies at home.", priceMin: 499, priceMax: 4999, weightMin: 300, weightMax: 3000, stockMin: 8, stockMax: 40 },
    { name: "Brass Tulsi Kyara Stand {variant}", shortDesc: "Decorative holy basil planter", desc: "Ornate brass tulsi vrindavan stand with carved pillars and Om symbol for growing sacred tulsi plant.", priceMin: 399, priceMax: 3999, weightMin: 300, weightMax: 2000, stockMin: 8, stockMax: 40 },
    { name: "Copper Gangajal Container {size}ml", shortDesc: "Sacred water storage vessel", desc: "Pure copper sealed container for storing holy Gangajal water. Preserves sanctity with antimicrobial copper.", priceMin: 199, priceMax: 999, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
    { name: "Brass Abhishekam Patra Set {variant}", shortDesc: "Ritual bathing vessel set", desc: "Complete brass abhishekam patra set with spouted vessel, tray, and drain for deity bathing ceremonies.", priceMin: 399, priceMax: 2999, weightMin: 200, weightMax: 1200, stockMin: 10, stockMax: 50 },
    { name: "Heavy Brass Ganga Jamuna Diya {variant} Wick", shortDesc: "Dual-flow traditional oil lamp", desc: "Heavy solid brass Ganga Jamuna double-wick oil diya for auspicious evening aarti. Antique hand finish.", priceMin: 249, priceMax: 1999, weightMin: 150, weightMax: 800, stockMin: 15, stockMax: 70 },
    { name: "Copper Surahi Water Bottle {size}ml", shortDesc: "Elegant copper water pitcher", desc: "Hammered pure copper surahi pitcher for storing and serving copper-charged water. Traditional and healthy.", priceMin: 299, priceMax: 1499, weightMin: 200, weightMax: 800, stockMin: 15, stockMax: 80 },
    { name: "Brass Singhasan Chowki {size} Inch", shortDesc: "Brass platform for deity seating", desc: "Ornate brass singhasan chowki platform for placing deity murtis. Carved lotus base with pillars.", priceMin: 399, priceMax: 4999, weightMin: 200, weightMax: 2000, stockMin: 8, stockMax: 40 },
    { name: "Copper Arghya Patra {variant}", shortDesc: "Sun offering copper vessel", desc: "Pure copper arghya patra with special spout design for offering water to Surya Dev at sunrise.", priceMin: 149, priceMax: 699, weightMin: 80, weightMax: 300, stockMin: 25, stockMax: 120 },
    { name: "Brass Dhoopdan (Incense Burner) {variant}", shortDesc: "Decorative brass incense holder", desc: "Ornamental brass dhoopdan with perforated dome lid for burning dhoop cones and loban resin safely.", priceMin: 199, priceMax: 1299, weightMin: 100, weightMax: 500, stockMin: 15, stockMax: 80 },
  ],
  "Rudraksha Collection": [
    { name: "{mukhi} Mukhi Rudraksha Bead {variant}", shortDesc: "Certified Nepali Rudraksha bead", desc: "Lab-certified genuine {mukhi} Mukhi Nepali Rudraksha bead with natural facets. Comes with certificate of authenticity.", priceMin: 199, priceMax: 19999, weightMin: 2, weightMax: 15, stockMin: 5, stockMax: 50 },
    { name: "Rudraksha Combination Bracelet {variant}", shortDesc: "Multi-mukhi Rudraksha wristband", desc: "Handcrafted bracelet combining multiple mukhi Rudraksha beads for balanced planetary benefits and spiritual protection.", priceMin: 299, priceMax: 4999, weightMin: 15, weightMax: 40, stockMin: 10, stockMax: 60 },
    { name: "Rudraksha Pendant {variant} in Silver", shortDesc: "Silver-capped Rudraksha pendant", desc: "Genuine Rudraksha bead set in sterling silver cap with Om engraving. Ready to wear on chain or thread.", priceMin: 299, priceMax: 9999, weightMin: 5, weightMax: 20, stockMin: 10, stockMax: 50 },
    { name: "Rudraksha Mala 5 Mukhi 108+1 Beads {variant}", shortDesc: "Full-length Rudraksha japa mala", desc: "Complete 108+1 bead mala made from certified 5 Mukhi Nepali Rudraksha. Perfect for daily japa meditation.", priceMin: 399, priceMax: 3999, weightMin: 30, weightMax: 80, stockMin: 10, stockMax: 60 },
    { name: "Gauri Shankar Rudraksha {variant}", shortDesc: "Naturally joined twin Rudraksha", desc: "Rare naturally joined twin-bead Gauri Shankar Rudraksha symbolising Shiva-Parvati union. With authenticity certificate.", priceMin: 999, priceMax: 14999, weightMin: 3, weightMax: 10, stockMin: 3, stockMax: 15 },
    { name: "Rudraksha Tree Sapling {variant}", shortDesc: "Live Rudraksha plant for home", desc: "Live Rudraksha (Elaeocarpus) tree sapling for growing at home. Sacred plant that produces divine beads.", priceMin: 149, priceMax: 599, weightMin: 200, weightMax: 500, stockMin: 10, stockMax: 40 },
    { name: "Siddha Mala (1-14 Mukhi Collection) {variant}", shortDesc: "Complete 1 to 14 Mukhi set", desc: "Extremely rare complete Siddha Mala containing one bead of each mukhi from 1 to 14. Ultimate spiritual collection.", priceMin: 4999, priceMax: 49999, weightMin: 30, weightMax: 80, stockMin: 1, stockMax: 5 },
    { name: "Rudraksha Kantha Mala {variant}", shortDesc: "Multi-strand Rudraksha neck piece", desc: "Traditional multi-strand Rudraksha kantha mala worn close to the throat for constant spiritual protection.", priceMin: 299, priceMax: 2999, weightMin: 20, weightMax: 60, stockMin: 10, stockMax: 50 },
    { name: "Nepal vs Indonesian Rudraksha Set {variant}", shortDesc: "Comparison Rudraksha bead pair", desc: "Educational comparison set of Nepali (large) and Indonesian (small) Rudraksha beads with info card.", priceMin: 199, priceMax: 999, weightMin: 5, weightMax: 20, stockMin: 15, stockMax: 60 },
    { name: "Rudraksha Rakhi {variant}", shortDesc: "Sacred Rudraksha Raksha Bandhan thread", desc: "Handmade Rakhi featuring genuine Rudraksha bead with golden thread and decorative stones. Spiritual protection for brother.", priceMin: 99, priceMax: 499, weightMin: 5, weightMax: 15, stockMin: 30, stockMax: 200 },
  ],
  "Yantra": [
    { name: "Shree Yantra Copper Plate {size} Inch", shortDesc: "Energised Sri Yantra for prosperity", desc: "Consecrated pure copper Shree Yantra plate with gold plating for wealth, prosperity, and positive cosmic energy.", priceMin: 299, priceMax: 4999, weightMin: 50, weightMax: 400, stockMin: 10, stockMax: 60 },
    { name: "Kuber Yantra Brass {size} Inch", shortDesc: "Wealth-attracting Kuber Yantra", desc: "Energised brass Kuber Yantra for attracting financial abundance. Place in cash box or north-facing wall.", priceMin: 199, priceMax: 2999, weightMin: 30, weightMax: 300, stockMin: 15, stockMax: 80 },
    { name: "Maha Lakshmi Yantra {variant}", shortDesc: "Goddess Lakshmi prosperity yantra", desc: "Siddh Maha Lakshmi Yantra for removing financial obstacles and attracting abundance and prosperity.", priceMin: 199, priceMax: 2999, weightMin: 30, weightMax: 300, stockMin: 15, stockMax: 80 },
    { name: "Navgraha Yantra Copper {size} Inch", shortDesc: "Nine-planet harmonising yantra", desc: "Comprehensive Navgraha Yantra containing symbols of all 9 planets for astrological balance and protection.", priceMin: 249, priceMax: 3999, weightMin: 40, weightMax: 350, stockMin: 10, stockMax: 60 },
    { name: "Vastu Dosh Nivaran Yantra {variant}", shortDesc: "Vastu correction sacred plate", desc: "Powerful Vastu Dosh Nivaran Yantra for correcting directional energy imbalances in home and office.", priceMin: 199, priceMax: 2499, weightMin: 30, weightMax: 300, stockMin: 15, stockMax: 80 },
    { name: "Mahamrityunjaya Yantra {variant}", shortDesc: "Health and longevity yantra", desc: "Sacred Mahamrityunjaya Yantra associated with Lord Shiva for health, longevity, and protection from illness.", priceMin: 199, priceMax: 2999, weightMin: 30, weightMax: 300, stockMin: 15, stockMax: 80 },
    { name: "Baglamukhi Yantra Gold Plated {variant}", shortDesc: "Enemy-protection sacred yantra", desc: "Gold-plated Baglamukhi Yantra for protection from enemies, court cases, and negative influences.", priceMin: 299, priceMax: 3999, weightMin: 30, weightMax: 300, stockMin: 10, stockMax: 50 },
    { name: "Vyapar Vridhi Yantra {variant}", shortDesc: "Business growth yantra", desc: "Siddh Vyapar Vridhi Yantra for business growth, commercial success, and overcoming professional obstacles.", priceMin: 199, priceMax: 2499, weightMin: 30, weightMax: 200, stockMin: 15, stockMax: 80 },
    { name: "Saraswati Yantra for Students {variant}", shortDesc: "Knowledge and education yantra", desc: "Saraswati Yantra for enhanced learning, memory, wisdom and academic success. Ideal for students and scholars.", priceMin: 149, priceMax: 1999, weightMin: 20, weightMax: 200, stockMin: 20, stockMax: 100 },
  ],
  "Books & Scriptures": [
    { name: "Hanuman Chalisa {variant} Edition", shortDesc: "Sacred Hanuman prayer book", desc: "Premium quality Hanuman Chalisa with Hindi text, English transliteration, and detailed meaning commentary.", priceMin: 49, priceMax: 499, weightMin: 50, weightMax: 300, stockMin: 50, stockMax: 300 },
    { name: "Shrimad Bhagavad Gita {variant}", shortDesc: "Complete Gita with commentary", desc: "Complete Shrimad Bhagavad Gita with Sanskrit shloka, Hindi translation, and philosophical commentary.", priceMin: 149, priceMax: 1499, weightMin: 200, weightMax: 800, stockMin: 20, stockMax: 100 },
    { name: "Ramcharitmanas (Tulsi Ramayan) {variant}", shortDesc: "Tulsidas epic in original Awadhi", desc: "Complete Ramcharitmanas by Goswami Tulsidas in original Awadhi with Hindi translation and spiritual notes.", priceMin: 199, priceMax: 1499, weightMin: 300, weightMax: 1000, stockMin: 15, stockMax: 80 },
    { name: "Sunderkand Path Book {variant}", shortDesc: "Hanuman's Lanka chapter for paath", desc: "Beautifully formatted Sunderkand from Ramcharitmanas for weekly paath recitation with clear large text.", priceMin: 49, priceMax: 299, weightMin: 50, weightMax: 200, stockMin: 50, stockMax: 300 },
    { name: "Vishnu Sahasranama Stotra {variant}", shortDesc: "1000 names of Lord Vishnu", desc: "Vishnu Sahasranama with Sanskrit text, phonetic transliteration, meaning, and proper recitation guidance.", priceMin: 49, priceMax: 399, weightMin: 50, weightMax: 200, stockMin: 40, stockMax: 200 },
    { name: "Durga Saptashati / Devi Mahatmyam {variant}", shortDesc: "700 verses of Goddess Durga", desc: "Complete Durga Saptashati (Chandi Path) with proper vidhi, yantra illustrations, and translation.", priceMin: 99, priceMax: 599, weightMin: 100, weightMax: 400, stockMin: 25, stockMax: 120 },
    { name: "Shiv Purana {variant} Edition", shortDesc: "Sacred stories of Lord Shiva", desc: "Comprehensive Shiv Purana with sacred stories, mythology, and philosophical teachings of Lord Mahadev.", priceMin: 149, priceMax: 999, weightMin: 200, weightMax: 800, stockMin: 15, stockMax: 80 },
    { name: "Satyanarayan Katha Book {variant}", shortDesc: "Vrat katha for Satyanarayan puja", desc: "Complete Satyanarayan Vrat Katha with puja vidhi, aarti, and all five chapters for monthly vrat observance.", priceMin: 39, priceMax: 199, weightMin: 30, weightMax: 100, stockMin: 60, stockMax: 400 },
    { name: "Aarti Sangrah Collection {variant}", shortDesc: "All-deity aarti compilation", desc: "Comprehensive aarti sangrah containing 101 aartis for all major Hindu deities with notation and meaning.", priceMin: 49, priceMax: 299, weightMin: 50, weightMax: 200, stockMin: 40, stockMax: 250 },
    { name: "Yoga Vashishtha {variant}", shortDesc: "Philosophical discourse on liberation", desc: "Sage Vashishtha's teachings to Lord Rama on consciousness, liberation, and the nature of reality.", priceMin: 199, priceMax: 1299, weightMin: 200, weightMax: 600, stockMin: 10, stockMax: 50 },
  ],
  "Festival Special": [
    { name: "Diwali Pooja Complete Kit {variant}", shortDesc: "All-in-one Deepavali celebration kit", desc: "Complete Diwali celebration kit with Lakshmi-Ganesh murti, diyas, rangoli stencils, samagri, and decorations.", priceMin: 499, priceMax: 4999, weightMin: 500, weightMax: 3000, stockMin: 10, stockMax: 60 },
    { name: "Navratri Garba Decoration Set {variant}", shortDesc: "Festival decor for nine nights", desc: "Complete Navratri decoration set with garbi, toran, artificial flowers, LED lights, and Durga backdrop.", priceMin: 399, priceMax: 3499, weightMin: 300, weightMax: 2000, stockMin: 10, stockMax: 50 },
    { name: "Janmashtami Krishna Jhula Swing {variant}", shortDesc: "Decorated swing for baby Krishna", desc: "Beautifully decorated miniature swing (jhula) for Laddu Gopal during Janmashtami celebrations.", priceMin: 299, priceMax: 2999, weightMin: 200, weightMax: 1000, stockMin: 10, stockMax: 50 },
    { name: "Shivratri Special Bel Patra Set {variant}", shortDesc: "Sacred bel leaves and offerings", desc: "Fresh and dried bel patra (bilva leaves) set with dhatura, bhasam, and other Shiv Ratri puja essentials.", priceMin: 99, priceMax: 599, weightMin: 50, weightMax: 300, stockMin: 20, stockMax: 100 },
    { name: "Ganesh Chaturthi Decoration Kit {variant}", shortDesc: "Complete Ganesh festival kit", desc: "Full Ganesh Chaturthi kit with eco-friendly clay idol, modak mould, decoration items, and puja samagri.", priceMin: 399, priceMax: 2999, weightMin: 300, weightMax: 2000, stockMin: 10, stockMax: 50 },
    { name: "Holi Festival Colour Set {variant}", shortDesc: "Organic natural Holi colours", desc: "Set of organic natural Holi colours made from flowers and herbs. Skin-safe, eco-friendly, and vibrant.", priceMin: 149, priceMax: 999, weightMin: 200, weightMax: 1000, stockMin: 20, stockMax: 100 },
    { name: "Karwa Chauth Pooja Thali Set {variant}", shortDesc: "Complete fasting festival kit", desc: "Beautiful decorated karwa chauth thali with karwa pot, chalni sieve, bangles, and all puja essentials.", priceMin: 249, priceMax: 1999, weightMin: 200, weightMax: 800, stockMin: 15, stockMax: 60 },
    { name: "Makar Sankranti Kite Festival Kit {variant}", shortDesc: "Traditional kite flying celebration set", desc: "Festive Makar Sankranti kit with colourful kites, manja, til gur sweets preparation mix, and decorations.", priceMin: 199, priceMax: 999, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 80 },
    { name: "Ram Navami Celebration Kit {variant}", shortDesc: "Lord Ram birthday celebration items", desc: "Complete Ram Navami kit with miniature bow-arrow set, tulsi mala, Ram sticker, and havan samagri.", priceMin: 199, priceMax: 1499, weightMin: 200, weightMax: 800, stockMin: 10, stockMax: 50 },
    { name: "Chhath Pooja Samagri Kit {variant}", shortDesc: "Sun worship ritual complete kit", desc: "Complete Chhath Puja kit with soop, thekua mould, fruits, and all offerings for Surya Deva worship.", priceMin: 299, priceMax: 1999, weightMin: 300, weightMax: 1500, stockMin: 10, stockMax: 50 },
  ],
  "Pooja Kits": [
    { name: "Daily Pooja Essentials Kit {variant}", shortDesc: "Complete daily worship starter kit", desc: "All-in-one daily pooja kit containing agarbatti, diya, camphor, kumkum, akshat, and cotton wicks.", priceMin: 199, priceMax: 999, weightMin: 200, weightMax: 800, stockMin: 30, stockMax: 150 },
    { name: "Griha Pravesh Pooja Kit {variant}", shortDesc: "House-warming ceremony complete set", desc: "Comprehensive griha pravesh housewarming puja kit with 51 samagri items, havan kund, and instruction guide.", priceMin: 499, priceMax: 2999, weightMin: 500, weightMax: 2000, stockMin: 10, stockMax: 50 },
    { name: "Satyanarayan Pooja Kit {variant}", shortDesc: "Complete vrat puja supplies", desc: "Full Satyanarayan vrat puja kit with all required samagri, katha book, prasad ingredients, and decoration items.", priceMin: 299, priceMax: 1499, weightMin: 300, weightMax: 1200, stockMin: 15, stockMax: 80 },
    { name: "Havan Samagri Kit with Kund {variant}", shortDesc: "Complete fire ritual kit", desc: "Complete havan kit with copper kund, 51 herbs samagri, ghee, samidha wood sticks, and Vedic mantra book.", priceMin: 499, priceMax: 3999, weightMin: 500, weightMax: 3000, stockMin: 8, stockMax: 40 },
    { name: "Vastu Shanti Pooja Kit {variant}", shortDesc: "Vastu correction ceremony kit", desc: "Complete Vastu Shanti puja kit with yantras, 9 types of grains, havan samagri, and directional items.", priceMin: 399, priceMax: 2499, weightMin: 300, weightMax: 1500, stockMin: 10, stockMax: 50 },
    { name: "Marriage Ceremony Pooja Kit {variant}", shortDesc: "Wedding ritual complete supplies", desc: "Comprehensive vivah (marriage) puja kit with all required samagri for Hindu wedding ceremonies.", priceMin: 799, priceMax: 4999, weightMin: 800, weightMax: 4000, stockMin: 5, stockMax: 25 },
    { name: "Navagraha Shanti Pooja Kit {variant}", shortDesc: "Nine-planet peace ceremony kit", desc: "Complete Navagraha shanti kit with 9 coloured cloths, specific grains, yantras, and havan ingredients.", priceMin: 399, priceMax: 2499, weightMin: 300, weightMax: 1500, stockMin: 10, stockMax: 50 },
    { name: "Rudra Abhishek Pooja Kit {variant}", shortDesc: "Shiva linga bathing ceremony kit", desc: "Complete Rudra Abhishek kit with panchamrit ingredients, bel patra, dhatura, bhasam, and mantra guide.", priceMin: 299, priceMax: 1999, weightMin: 200, weightMax: 1000, stockMin: 15, stockMax: 60 },
    { name: "Baby Naming Ceremony (Naamkaran) Kit {variant}", shortDesc: "Newborn naming ritual supplies", desc: "Traditional naamkaran ceremony kit with golden pen, honey, ghee, small kalash, and all samagri items.", priceMin: 299, priceMax: 1499, weightMin: 200, weightMax: 800, stockMin: 10, stockMax: 50 },
  ],
  "Bhog & Prasad": [
    { name: "Premium Dry Fruit Prasad Box {variant}", shortDesc: "Sacred dry fruit offering assortment", desc: "Premium assortment of almonds, cashews, raisins, and mishri in decorative box for temple prasad distribution.", priceMin: 199, priceMax: 1499, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
    { name: "Pure Mishri (Rock Sugar) Crystals {size}", shortDesc: "Natural rock sugar for prasad", desc: "Premium quality natural mishri (rock sugar) crystals for deity bhog offering and distribution as prasad.", priceMin: 49, priceMax: 299, weightMin: 100, weightMax: 500, stockMin: 50, stockMax: 300 },
    { name: "Panchamrit Preparation Set {variant}", shortDesc: "Five-nectar offering ingredients", desc: "Complete panchamrit set with A2 cow milk, dahi, honey, ghee, and sugar for preparing sacred panchamrit.", priceMin: 149, priceMax: 699, weightMin: 200, weightMax: 800, stockMin: 20, stockMax: 100 },
    { name: "Sacred Tulsi Patra Collection {variant}", shortDesc: "Holy basil leaves for offerings", desc: "Fresh dried organic tulsi leaves specially picked during Brahma Muhurta for Vishnu puja and bhog.", priceMin: 49, priceMax: 199, weightMin: 20, weightMax: 100, stockMin: 40, stockMax: 200 },
    { name: "Bhog Cooking Brass Vessel Set {variant}", shortDesc: "Dedicated brass cooking vessels for deity", desc: "Small brass vessel set exclusively for preparing deity bhog. Includes patila, kadhai, and serving katori.", priceMin: 399, priceMax: 1999, weightMin: 200, weightMax: 1000, stockMin: 10, stockMax: 50 },
    { name: "Peda Prasad (Homemade Style) {size}", shortDesc: "Traditional milk sweet for offering", desc: "Pure ghee peda made from thickened milk in traditional style. Perfect for deity bhog and prasad distribution.", priceMin: 99, priceMax: 599, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
    { name: "Sacred Banana Leaf Plates {variant} Count", shortDesc: "Natural leaf plates for prasad serving", desc: "Eco-friendly natural banana leaf plates for serving prasad during temple events and special puja occasions.", priceMin: 49, priceMax: 249, weightMin: 100, weightMax: 500, stockMin: 30, stockMax: 200 },
    { name: "Charnamrit Copper Cup {variant}", shortDesc: "Sacred water offering vessel", desc: "Small pure copper cup specifically for serving charnamrit (sacred water from deity feet washing).", priceMin: 79, priceMax: 299, weightMin: 30, weightMax: 100, stockMin: 30, stockMax: 150 },
    { name: "Laddu Prasad Box (Boondi) {variant}", shortDesc: "Traditional laddu for deity offering", desc: "Pure ghee boondi laddus prepared in temple-style recipe for deity bhog offering and distribution.", priceMin: 99, priceMax: 499, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
  ],
  "Clothing & Religious Wear": [
    { name: "Pure Cotton Dhoti {variant}", shortDesc: "Traditional white cotton dhoti", desc: "Premium quality handloom pure cotton dhoti for temple visits, puja ceremonies, and religious occasions.", priceMin: 199, priceMax: 1499, weightMin: 100, weightMax: 400, stockMin: 20, stockMax: 100 },
    { name: "Silk Angavastram (Uttariya) {variant}", shortDesc: "Pure silk shoulder cloth", desc: "Fine Kanchipuram silk angavastram with zari border for priests, devotees, and ceremonial occasions.", priceMin: 299, priceMax: 2999, weightMin: 50, weightMax: 200, stockMin: 15, stockMax: 80 },
    { name: "Devotee Kurta Pajama Set {variant}", shortDesc: "Traditional kurta set for puja", desc: "Pure cotton kurta pajama set in traditional white/cream for temple visits and religious ceremonies.", priceMin: 499, priceMax: 2499, weightMin: 200, weightMax: 500, stockMin: 10, stockMax: 60 },
    { name: "Silk Dupatta for Temple Visit {variant}", shortDesc: "Pure silk head covering dupatta", desc: "Elegant pure silk dupatta with zari border for women's temple visits and religious ceremony head covering.", priceMin: 299, priceMax: 1999, weightMin: 50, weightMax: 200, stockMin: 15, stockMax: 80 },
    { name: "Pandit Ji Dhoti Kurta Set {variant}", shortDesc: "Priest ceremonial white outfit", desc: "Premium quality pure cotton pandit dhoti kurta set with angavastram for priests and ceremony conductors.", priceMin: 599, priceMax: 2999, weightMin: 300, weightMax: 600, stockMin: 10, stockMax: 50 },
    { name: "Handloom Cotton Saree {variant}", shortDesc: "Traditional cotton temple saree", desc: "Handloom woven pure cotton saree with temple border design for regular temple visits and pooja.", priceMin: 499, priceMax: 3999, weightMin: 200, weightMax: 500, stockMin: 10, stockMax: 50 },
    { name: "Gamcha / Puja Towel {variant}", shortDesc: "Traditional cotton temple towel", desc: "Pure cotton gamcha (checkered towel) traditionally used during puja, holy dip, and temple ceremonies.", priceMin: 49, priceMax: 299, weightMin: 50, weightMax: 150, stockMin: 40, stockMax: 200 },
    { name: "Bhagwa (Saffron) Meditation Shawl {variant}", shortDesc: "Saffron-dyed spiritual meditation wrap", desc: "Natural dye saffron bhagwa shawl for meditation, spiritual practice, and ashram retreats.", priceMin: 199, priceMax: 1499, weightMin: 100, weightMax: 400, stockMin: 15, stockMax: 80 },
    { name: "Cotton Topi (Prayer Cap) {variant}", shortDesc: "Traditional prayer skull cap", desc: "Hand-stitched pure cotton topi cap for men worn during puja, temple visits, and religious ceremonies.", priceMin: 49, priceMax: 249, weightMin: 20, weightMax: 50, stockMin: 50, stockMax: 300 },
    { name: "Silk Pattu / Veshti {variant}", shortDesc: "South Indian silk garment", desc: "Premium quality silk pattu veshti with golden border for South Indian temple visits and ceremonies.", priceMin: 499, priceMax: 4999, weightMin: 150, weightMax: 400, stockMin: 8, stockMax: 40 },
  ],
  "Spiritual Accessories": [
    { name: "Cotton Asan (Prayer Mat) {variant}", shortDesc: "Pure cotton meditation seat mat", desc: "Hand-woven pure cotton asan for seated meditation and puja. Traditional kushagrass-inspired weave pattern.", priceMin: 99, priceMax: 999, weightMin: 100, weightMax: 500, stockMin: 20, stockMax: 100 },
    { name: "Japa Mala Counter Bag {variant}", shortDesc: "Cloth bag for mala meditation", desc: "Handstitched japa bag (gomukhi) for concealed mala counting during mantra meditation. Keeps mala sacred.", priceMin: 49, priceMax: 299, weightMin: 20, weightMax: 80, stockMin: 30, stockMax: 200 },
    { name: "Tilak Stamp Set {variant}", shortDesc: "Wooden tilak applicator stamps", desc: "Set of traditional wooden tilak stamps for applying perfect Vaishnav and Shaiva tilak marks with sandalwood paste.", priceMin: 49, priceMax: 299, weightMin: 20, weightMax: 60, stockMin: 30, stockMax: 200 },
    { name: "Wooden Meditation Bench {variant}", shortDesc: "Ergonomic prayer seating bench", desc: "Folding wooden meditation bench with angled seat for comfortable extended meditation and puja sessions.", priceMin: 399, priceMax: 2999, weightMin: 500, weightMax: 2000, stockMin: 8, stockMax: 40 },
    { name: "Gomukhi Japa Bag Silk {variant}", shortDesc: "Premium silk meditation hand bag", desc: "Premium quality silk gomukhi bag with embroidered Om symbol for Rudraksha and sphatik mala jaap.", priceMin: 99, priceMax: 499, weightMin: 20, weightMax: 60, stockMin: 25, stockMax: 120 },
    { name: "Chandan (Sandalwood) Paste Set {variant}", shortDesc: "Ready-made sandalwood tilak set", desc: "Premium Mysore sandalwood paste set with stone slab (silbatta) for preparing fresh chandan for tilak.", priceMin: 149, priceMax: 999, weightMin: 50, weightMax: 300, stockMin: 15, stockMax: 80 },
    { name: "Sacred Thread (Mauli) Roll {variant}", shortDesc: "Red and yellow protection thread", desc: "Long roll of sacred mauli (kalawa) thread for tying on wrist during puja for divine protection.", priceMin: 29, priceMax: 149, weightMin: 20, weightMax: 80, stockMin: 60, stockMax: 400 },
    { name: "Brass Pooja Ghanti (Small Bell) {variant}", shortDesc: "Handheld small brass prayer bell", desc: "Small brass puja ghanti with Om motif for daily aarti ringing. Produces clear and spiritually uplifting tone.", priceMin: 79, priceMax: 399, weightMin: 50, weightMax: 200, stockMin: 30, stockMax: 150 },
    { name: "Deer Skin Meditation Mat {variant}", shortDesc: "Traditional meditation asan", desc: "Ethically-sourced natural deer skin asan for advanced yogic meditation practice as prescribed in scriptures.", priceMin: 299, priceMax: 2999, weightMin: 200, weightMax: 600, stockMin: 5, stockMax: 20 },
    { name: "Digital Japa Counter Machine {variant}", shortDesc: "Electronic mantra counting device", desc: "Digital electronic japa counter with LCD display for accurate mantra counting during long meditation sessions.", priceMin: 99, priceMax: 499, weightMin: 30, weightMax: 80, stockMin: 25, stockMax: 120 },
  ],
  "Home Fragrance": [
    { name: "Mysore Sandalwood Dhoop Cones {size} Count", shortDesc: "Pure chandan bamboo-less dhoop", desc: "Premium Mysore sandalwood bamboo-less dhoop cones for deep spiritual focus and natural room purification.", priceMin: 99, priceMax: 599, weightMin: 50, weightMax: 300, stockMin: 40, stockMax: 200 },
    { name: "Natural Guggal Dhoop {variant}", shortDesc: "Pure guggal resin incense", desc: "100% pure natural guggal resin for burning in dhunachi. Traditional temple incense for purification.", priceMin: 79, priceMax: 399, weightMin: 50, weightMax: 250, stockMin: 40, stockMax: 200 },
    { name: "Premium Agarbatti (Incense Sticks) {variant} Pack", shortDesc: "Hand-rolled natural incense sticks", desc: "Hand-rolled premium quality agarbatti made from natural herbs, essential oils, and charcoal-free base.", priceMin: 49, priceMax: 399, weightMin: 30, weightMax: 200, stockMin: 50, stockMax: 300 },
    { name: "Lobaan (Frankincense) Resin {size}", shortDesc: "Natural frankincense for burning", desc: "Premium quality lobaan (olibanum) resin for burning on charcoal. Creates sacred atmosphere with sweet aroma.", priceMin: 79, priceMax: 399, weightMin: 50, weightMax: 250, stockMin: 30, stockMax: 150 },
    { name: "Camphor Diffuser {variant}", shortDesc: "Electric camphor fragrance diffuser", desc: "Ceramic electric camphor diffuser with adjustable heat for continuous sacred kapur fragrance in prayer room.", priceMin: 199, priceMax: 999, weightMin: 100, weightMax: 400, stockMin: 15, stockMax: 80 },
    { name: "Essential Oil Set for Puja Room {variant}", shortDesc: "Sacred essential oil collection", desc: "Set of pure essential oils — sandalwood, jasmine, rose, camphor — for diffuser and puja room fragrance.", priceMin: 199, priceMax: 1299, weightMin: 50, weightMax: 200, stockMin: 15, stockMax: 80 },
    { name: "Sambrani (Benzoin) Dhoop Cups {variant} Count", shortDesc: "Ready-to-burn cup dhoop", desc: "Pre-formed sambrani (benzoin resin) dhoop cups for instant burning. Popular South Indian temple fragrance.", priceMin: 49, priceMax: 299, weightMin: 50, weightMax: 200, stockMin: 40, stockMax: 250 },
    { name: "Naivedyam Rose Agarbatti {variant} Pack", shortDesc: "Rose-scented premium incense sticks", desc: "Premium long-burning rose-scented agarbatti for evening aarti and deity offering with lasting fragrance.", priceMin: 49, priceMax: 249, weightMin: 30, weightMax: 150, stockMin: 50, stockMax: 300 },
    { name: "Cedar Wood Incense Holder {variant}", shortDesc: "Natural wood incense burner", desc: "Hand-carved cedar wood incense holder with ash catcher. Natural wood grain finish for rustic temple aesthetic.", priceMin: 99, priceMax: 599, weightMin: 50, weightMax: 200, stockMin: 20, stockMax: 100 },
    { name: "Havan Dhoop Cake {variant} Count", shortDesc: "Pre-formed havan incense discs", desc: "Ready-to-burn circular havan dhoop cakes made from 51 herbs for quick home havan without full setup.", priceMin: 79, priceMax: 399, weightMin: 50, weightMax: 300, stockMin: 30, stockMax: 150 },
    { name: "Jasmine (Mogra) Agarbatti Premium {variant}", shortDesc: "Pure jasmine flower incense", desc: "Premium jasmine (mogra) scented agarbatti made from natural jasmine essential oil. Temple-grade quality.", priceMin: 49, priceMax: 299, weightMin: 30, weightMax: 150, stockMin: 50, stockMax: 300 },
  ],
  "Gift Items": [
    { name: "Silver Plated Lakshmi Ganesh Gift Set {variant}", shortDesc: "Auspicious festive gift set", desc: "Beautifully packaged silver-plated Lakshmi Ganesh murti pair with velvet gift box for Diwali gifting.", priceMin: 499, priceMax: 4999, weightMin: 200, weightMax: 1000, stockMin: 10, stockMax: 50 },
    { name: "Corporate Diwali Gift Box {variant}", shortDesc: "Premium corporate festival hamper", desc: "Elegant corporate Diwali gift box with dry fruits, murti, diya, agarbatti, and branded packaging.", priceMin: 799, priceMax: 5999, weightMin: 500, weightMax: 2000, stockMin: 5, stockMax: 30 },
    { name: "Housewarming Pooja Gift Set {variant}", shortDesc: "Griha pravesh celebration gift", desc: "Auspicious housewarming gift set with kalash, coconut, kumkum, akshat, sweets, and blessing card.", priceMin: 399, priceMax: 2999, weightMin: 300, weightMax: 1500, stockMin: 10, stockMax: 50 },
    { name: "Baby Shower (Godh Bharai) Gift Kit {variant}", shortDesc: "Traditional baby shower celebration gift", desc: "Traditional godh bharai gift set with bangles, coconut, saree, sweets, and auspicious items.", priceMin: 499, priceMax: 3999, weightMin: 300, weightMax: 1500, stockMin: 8, stockMax: 40 },
    { name: "Wedding Return Gift Box {variant}", shortDesc: "Decorative shagun return favour", desc: "Beautiful wedding return gift box with miniature murti, agarbatti, sweets, and thank-you card.", priceMin: 199, priceMax: 999, weightMin: 100, weightMax: 400, stockMin: 20, stockMax: 100 },
    { name: "Spiritual Gift Hamper {variant}", shortDesc: "Curated spiritual wellness basket", desc: "Curated spiritual gift hamper with mala, essential oils, meditation book, incense, and premium asan.", priceMin: 999, priceMax: 6999, weightMin: 500, weightMax: 2000, stockMin: 5, stockMax: 25 },
    { name: "Brass Photo Frame with Om {variant}", shortDesc: "Decorative brass deity frame", desc: "Ornate brass photo frame with Om motif for framing deity pictures and placing on puja altar.", priceMin: 299, priceMax: 1999, weightMin: 150, weightMax: 600, stockMin: 15, stockMax: 70 },
    { name: "Crystal Globe Ganesha Gift {variant}", shortDesc: "Crystal paperweight deity gift", desc: "3D laser-etched crystal globe with Lord Ganesha image. LED base illumination for desktop display.", priceMin: 399, priceMax: 2499, weightMin: 200, weightMax: 500, stockMin: 10, stockMax: 50 },
    { name: "Gold Plated Coin Set {variant}", shortDesc: "24K gold plated deity coins", desc: "Set of 24K gold-plated coins featuring Lakshmi, Ganesh, and Om for gifting on festivals and occasions.", priceMin: 299, priceMax: 2999, weightMin: 20, weightMax: 80, stockMin: 15, stockMax: 80 },
  ],
};

// ─── Variant pools for product name templating ─────────────────────
const SIZES = ["Small", "Medium", "Large", "Extra Large", "Premium", "Standard", "Jumbo", "Compact"];
const WEIGHTS = ["50g", "100g", "200g", "250g", "500g", "1kg"];
const COUNTS = ["12", "25", "50", "100", "200", "500"];
const METALS = ["Pure Brass", "Antique Brass", "Gold Plated", "Silver Plated", "Copper Finish", "Bronze"];
const DEITIES = ["Ganesh", "Shiva", "Krishna", "Lakshmi", "Durga", "Hanuman", "Vishnu", "Ram", "Saraswati"];
const VARIANTS_GENERAL = ["Classic", "Premium", "Traditional", "Deluxe", "Heritage", "Royal", "Sacred", "Temple Grade", "Artisan", "Handcrafted"];
const MUKHIS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
const INCH_SIZES = ["3", "4", "5", "6", "8", "10", "12", "15", "18", "24"];
const LADDU_SIZES = ["1", "2", "3", "4", "5", "6"];
const WICK_COUNTS = ["1", "3", "5", "7", "9"];
const ML_SIZES = ["250", "500", "750", "1000", "1500"];
const MM_SIZES = ["4", "5", "6", "8", "10", "12"];

function resolveName(template: string): string {
  return template
    .replace("{size}", pick(SIZES))
    .replace("{variant}", pick(VARIANTS_GENERAL))
    .replace("{deity}", pick(DEITIES))
    .replace("{mukhi}", pick(MUKHIS))
    .replace("{size} Inch", pick(INCH_SIZES) + " Inch")
    .replace("{size} No", pick(LADDU_SIZES) + " No")
    .replace("{size}ml", pick(ML_SIZES) + "ml")
    .replace("{size}mm Beads", pick(MM_SIZES) + "mm Beads")
    .replace("{size} Meter", pick(["3", "5", "7", "10"]) + " Meter")
    .replace("{size} Feet", pick(["3", "5", "7", "10"]) + " Feet")
    .replace("{size} Count", pick(COUNTS) + " Count")
    .replace("{variant} Piece", pick(["3", "5", "7", "9"]) + " Piece")
    .replace("{variant} Pack", pick(["6", "12", "24", "50", "100"]) + " Pack")
    .replace("{variant} Wick", pick(WICK_COUNTS) + " Wick")
    .replace("{variant} Feet", pick(["3", "5", "10", "15", "20"]) + " Feet")
    .replace("{variant} Beads", pick(["54", "108"]) + "+1 Beads")
    .replace("{variant} Edition", pick(["Hindi", "English", "Sanskrit", "Bilingual", "Pocket", "Deluxe", "Gift"]) + " Edition")
    .replace("{variant} Count", pick(COUNTS) + " Count");
}

function escapeCsvField(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

// ─── Main generation function ──────────────────────────────────────
function generateCatalogue(): string[] {
  const rows: string[] = [];
  const usedSkus = new Set<string>();
  const usedNames = new Set<string>();

  // SKU code mapping
  const skuCodes: Record<string, string> = {
    "Pooja Samagri": "PS",
    "Pooja Thali & Accessories": "PTA",
    "Temple Decoration": "TD",
    "Bhagwan Vastra": "BV",
    "Mukut & Shringar": "MS",
    "Mala": "ML",
    "Murti": "MR",
    "Mandir": "MN",
    "Shankh & Bells": "SB",
    "Brass & Copper Items": "BC",
    "Rudraksha Collection": "RK",
    "Yantra": "YN",
    "Books & Scriptures": "BS",
    "Festival Special": "FS",
    "Pooja Kits": "PK",
    "Bhog & Prasad": "BP",
    "Clothing & Religious Wear": "CR",
    "Spiritual Accessories": "SA",
    "Home Fragrance": "HF",
    "Gift Items": "GI",
  };

  // Target counts per category
  const targetCounts: Record<string, number> = {
    "Pooja Samagri": 70,
    "Pooja Thali & Accessories": 50,
    "Temple Decoration": 50,
    "Bhagwan Vastra": 50,
    "Mukut & Shringar": 50,
    "Mala": 55,
    "Murti": 60,
    "Mandir": 40,
    "Shankh & Bells": 45,
    "Brass & Copper Items": 55,
    "Rudraksha Collection": 50,
    "Yantra": 45,
    "Books & Scriptures": 50,
    "Festival Special": 50,
    "Pooja Kits": 45,
    "Bhog & Prasad": 45,
    "Clothing & Religious Wear": 50,
    "Spiritual Accessories": 50,
    "Home Fragrance": 55,
    "Gift Items": 45,
  };

  for (const [category, templates] of Object.entries(CATALOGUE)) {
    const code = skuCodes[category];
    const target = targetCounts[category] || 50;
    const images = IMAGES[category] || IMAGES["Pooja Samagri"];
    let seq = 1;

    for (let i = 0; i < target; i++) {
      const template = templates[i % templates.length];
      let name = resolveName(template.name);

      // Ensure unique name
      let attempts = 0;
      while (usedNames.has(name.toLowerCase()) && attempts < 50) {
        name = resolveName(template.name);
        attempts++;
      }
      if (usedNames.has(name.toLowerCase())) {
        name = name + " " + pick(["Set", "Combo", "Pack", "Edition", "Special"]) + " " + rand(1, 999);
      }
      usedNames.add(name.toLowerCase());

      // Generate unique SKU
      const sku = `RAM-${code}-${String(seq).padStart(3, "0")}`;
      if (usedSkus.has(sku)) continue;
      usedSkus.add(sku);
      seq++;

      // Prices: integer paise-safe pricing
      const sellingPrice = roundToNine(rand(template.priceMin, template.priceMax));
      const mrpMarkup = 1 + rand(10, 35) / 100; // 10-35% higher
      const mrp = roundToNine(Math.ceil(sellingPrice * mrpMarkup));
      const weight = rand(template.weightMin, template.weightMax);
      const stock = rand(template.stockMin, template.stockMax);
      const featured = i < 3; // First 3 in each category are featured
      const image = images[i % images.length];
      const shortDescription = template.shortDesc;
      const description = template.desc
        .replace("{mukhi}", pick(MUKHIS))
        .replace("{variant}", pick(VARIANTS_GENERAL));

      const seoTitle = `Buy ${name} Online | Ramanayam Temple Store`;
      const seoDesc = `Shop authentic ${name} at best prices. ${shortDescription}. Free shipping on orders above ₹999. 100% genuine temple-grade products.`;

      rows.push([
        escapeCsvField(name),
        sku,
        escapeCsvField(category),
        String(sellingPrice),
        String(mrp),
        String(stock),
        escapeCsvField(description),
        escapeCsvField(shortDescription),
        image,
        String(weight),
        "ACTIVE",
        String(featured),
      ].join(","));
    }
  }

  return rows;
}

// ─── Execute ───────────────────────────────────────────────────────
const HEADER = "name,sku,category,price,compareAtPrice,stock,description,shortDescription,image_1,weight,status,featured";

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const productRows = generateCatalogue();
const csvContent = [HEADER, ...productRows].join("\n");
const outputPath = path.join(dataDir, "ramanayam_full_catalogue.csv");

fs.writeFileSync(outputPath, csvContent, "utf8");

console.log("═══════════════════════════════════════════════════════════");
console.log("✅ RAMANAYAM FULL CATALOGUE GENERATED");
console.log("═══════════════════════════════════════════════════════════");
console.log(`📄 Output: ${outputPath}`);
console.log(`📊 Total Products: ${productRows.length}`);
console.log(`📋 CSV Header: ${HEADER}`);
console.log("");

// Category breakdown
const catCounts: Record<string, number> = {};
for (const row of productRows) {
  // Parse category from CSV row
  const parts = row.split(",");
  let cat = "";
  // Handle quoted category names
  if (row.includes('"')) {
    const matches = row.match(/"([^"]+)"/g);
    if (matches) {
      // Category is the field after sku (3rd field)
      // Count commas before we hit the category to find it
      let unquoted = row;
      const placeholders: string[] = [];
      let idx = 0;
      unquoted = unquoted.replace(/"[^"]*"/g, (m) => {
        placeholders.push(m);
        return `__PH${idx++}__`;
      });
      const fields = unquoted.split(",");
      const catField = fields[2] || "";
      if (catField.startsWith("__PH")) {
        const phIdx = parseInt(catField.replace("__PH", "").replace("__", ""));
        cat = placeholders[phIdx]?.replace(/^"|"$/g, "") || "";
      } else {
        cat = catField;
      }
    }
  } else {
    cat = parts[2];
  }
  catCounts[cat] = (catCounts[cat] || 0) + 1;
}

console.log("📂 Category Breakdown:");
for (const [cat, count] of Object.entries(catCounts).sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`   ${cat}: ${count} products`);
}
console.log("═══════════════════════════════════════════════════════════");
