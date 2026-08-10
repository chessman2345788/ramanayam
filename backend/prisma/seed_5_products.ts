import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedProducts() {
  console.log("=========================================");
  console.log("🌱 STARTING RAMANAYAM SAFE PRODUCT SEED (PHASE 1)");
  console.log("=========================================\n");

  // Step 1: Resolve existing categories from DB
  const brasswareCat = await prisma.category.findFirst({
    where: { OR: [{ slug: "puja-brassware" }, { name: { contains: "Brass", mode: "insensitive" } }] },
  });
  const idolsCat = await prisma.category.findFirst({
    where: { OR: [{ slug: "idols-murtis" }, { name: { contains: "Idol", mode: "insensitive" } }] },
  });
  const incenseCat = await prisma.category.findFirst({
    where: { OR: [{ slug: "incense-fragrances" }, { name: { contains: "Incense", mode: "insensitive" } }] },
  });
  const decorCat = await prisma.category.findFirst({
    where: { OR: [{ slug: "temple-decor" }, { name: { contains: "Decor", mode: "insensitive" } }] },
  });
  const samagriCat = await prisma.category.findFirst({
    where: { OR: [{ slug: "samagri-kits" }, { name: { contains: "Samagri", mode: "insensitive" } }] },
  });

  if (!brasswareCat) throw new Error("CRITICAL: Category 'Puja Brassware' not found in database.");
  if (!idolsCat) throw new Error("CRITICAL: Category 'Idols & Murtis' not found in database.");
  if (!incenseCat) throw new Error("CRITICAL: Category 'Incense & Fragrances' not found in database.");
  if (!decorCat) throw new Error("CRITICAL: Category 'Temple & Home Decor' not found in database.");
  if (!samagriCat) throw new Error("CRITICAL: Category 'Samagri & Ritual Kits' not found in database.");

  console.log("✅ Resolved Categories:");
  console.log(`   - Puja Brassware ID: ${brasswareCat.id}`);
  console.log(`   - Idols & Murtis ID: ${idolsCat.id}`);
  console.log(`   - Incense & Fragrances ID: ${incenseCat.id}`);
  console.log(`   - Temple & Home Decor ID: ${decorCat.id}`);
  console.log(`   - Samagri & Ritual Kits ID: ${samagriCat.id}\n`);

  // Step 2: Resolve existing vendors from DB
  const brassVendor = await prisma.vendor.findFirst({
    where: { OR: [{ slug: "moradabad-brass-guild" }, { businessName: { contains: "Brass", mode: "insensitive" } }] },
  });
  const sandalVendor = await prisma.vendor.findFirst({
    where: { OR: [{ slug: "mysore-sandalwood-house" }, { businessName: { contains: "Sandalwood", mode: "insensitive" } }] },
  });

  if (!brassVendor) throw new Error("CRITICAL: Vendor 'Moradabad Sacred Brass Guild' not found in database.");
  if (!sandalVendor) throw new Error("CRITICAL: Vendor 'Mysore Sandalwood Craft House' not found in database.");

  console.log("✅ Resolved Vendors:");
  console.log(`   - Brass Vendor ID: ${brassVendor.id} (${brassVendor.businessName})`);
  console.log(`   - Sandalwood Vendor ID: ${sandalVendor.id} (${sandalVendor.businessName})\n`);

  // Step 3: Product definition list (31 products)
  const productsToSeed = [
    // --- Existing 5 Products ---
    {
      name: "Premium Brass Diya",
      slug: "premium-brass-diya",
      shortDescription: "Handcrafted pure brass diya for daily puja, festive illumination and sacred altars.",
      description: "Carved by master brass artisans, this premium brass diya features intricate traditional engraving and a polished golden luster. Designed to hold ghee or sacred oil for hours of steady illumination during morning and evening prayers.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Premium Brass Diya | Ramanayam Heritage Craft",
      seoDescription: "Authentic handcrafted pure brass diya for daily worship and temple altars.",
      sku: "RAM-DIYA-001",
      price: 499,
      mrp: 699,
      stock: 25,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Brass Deepak with Stand",
      slug: "brass-deepak-with-stand",
      shortDescription: "Traditional tall brass oil lamp with elevated sturdy pedestal stand for temple mandirs.",
      description: "Standing on an elegantly crafted pedestal base, this deepak provides an elevated sacred flame for evening aartis and temple ceremonies. Made from heavy high-grade brass resistant to high temperatures.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Brass Deepak with Stand | Ramanayam Temple Collection",
      seoDescription: "Heavy brass oil lamp with decorative stand for sacred aarti and home temples.",
      sku: "RAM-DIYA-002",
      price: 799,
      mrp: 999,
      stock: 15,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Panchmukhi Brass Diya",
      slug: "panchmukhi-brass-diya",
      shortDescription: "Five-faced sacred brass oil lamp symbolising five elements for special ritual ceremonies.",
      description: "Featuring five distinct wick holders branching from a central pillar, the Panchmukhi diya represents the five sacred cosmic elements (Pancha Bhoota). Ideal for Diwali, Navratri, and special Vedic hawans.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Panchmukhi Brass Diya | 5-Faced Ritual Lamp",
      seoDescription: "Authentic 5-wick Panchmukhi brass diya for festive occasions and spiritual ceremonies.",
      sku: "RAM-DIYA-003",
      price: 899,
      mrp: 1199,
      stock: 12,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Brass Ganesha Murti",
      slug: "brass-ganesha-murti",
      shortDescription: "Exquisitely hand-carved pure brass Lord Ganesha idol bringing auspiciousness and wisdom.",
      description: "Handcrafted by hereditary artisans of Moradabad, this Lord Ganesha idol features intricate details from the trunk to the sacred crown. Designed to bring removal of obstacles and prosperity to home mandirs.",
      categoryId: idolsCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Brass Ganesha Murti | Handcrafted Idol | Ramanayam",
      seoDescription: "Pure heavy brass Lord Ganesha idol for home temple puja and Ganesh Chaturthi celebrations.",
      sku: "RAM-IDOL-001",
      price: 1299,
      mrp: 1599,
      stock: 10,
      imageUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Premium Agarbatti Collection",
      slug: "premium-agarbatti-collection",
      shortDescription: "Hand-rolled natural Mysore sandalwood and rose incense sticks for serene meditation.",
      description: "Hand-rolled with 100% natural Mysore sandalwood powder, organic flower extracts, and natural resins. Charcoal-free formulation burns cleanly for 45 minutes, creating a serene, peaceful ambiance for worship.",
      categoryId: incenseCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Premium Agarbatti Collection | Natural Mysore Sandalwood Incense",
      seoDescription: "Charcoal-free natural sandalwood incense sticks for daily puja, meditation, and temple aroma.",
      sku: "RAM-AGAR-001",
      price: 349,
      mrp: 499,
      stock: 30,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },

    // --- Phase 1 Priority New Additions ---
    {
      name: "Natural Dhoop Batti",
      slug: "natural-dhoop-batti",
      shortDescription: "Traditional bambooless herbal dhoop sticks enriched with cow ghee and guggul resin.",
      description: "Crafted following ancient Ayurvedic formulations using pure guggul, loban, camphor, and natural herbs. Completely free of synthetic scents and chemical binders, producing sacred smoke that purifies space.",
      categoryId: incenseCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Natural Dhoop Batti | Bamboo-Free Herbal Dhoop | Ramanayam",
      seoDescription: "Pure herbal dhoop batti made with natural resins and cow ghee for home space purification.",
      sku: "RAM-DHOP-001",
      price: 199,
      mrp: 299,
      stock: 50,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Pure Bhimseni Kapoor",
      slug: "pure-bhimseni-kapoor",
      shortDescription: "Original edible-grade Bhimseni camphor crystals for sacred aarti and space cleansing.",
      description: "100% pure organic Bhimseni Kapoor derived directly from Cinnamomum camphora trees. Leaves zero residue or ash upon burning, spreading an invigorating divine fragrance during prayer.",
      categoryId: incenseCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Pure Bhimseni Kapoor | Organic Camphor Crystals",
      seoDescription: "100% pure Bhimseni Kapoor crystals for sacred aarti, meditation, and natural air cleansing.",
      sku: "RAM-KAPR-001",
      price: 299,
      mrp: 399,
      stock: 60,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Handmade Cotton Phool Batti",
      slug: "handmade-cotton-phool-batti",
      shortDescription: "Hand-twisted pure cotton round wicks (phool batti) for long-lasting oil and ghee diya flame.",
      description: "Made from unbleached organic cotton, these round flower-shaped wicks absorb ghee evenly to burn steadily without smoking. Pack of 200 handmade cotton wicks.",
      categoryId: samagriCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Handmade Cotton Phool Batti | 200 Round Wicks",
      seoDescription: "Pure organic cotton round wicks for daily ghee diya lighting in mandir.",
      sku: "RAM-BATT-001",
      price: 149,
      mrp: 199,
      stock: 100,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Sacred Havan Samagri Pack",
      slug: "sacred-havan-samagri-pack",
      shortDescription: "Authentic 51-ingredient Vedic havan samagri mix for auspicious homam and yajna.",
      description: "Formulated according to ancient Grihya Sutras, combining sacred herbs, dried roots, sandalwood flakes, nagarmotha, sugandh mantri, kapoor kachri, and natural resins for powerful spiritual energy.",
      categoryId: samagriCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Sacred Havan Samagri Pack | 51 Vedic Herbs Mix",
      seoDescription: "Authentic 51-ingredient havan samagri for home yajnas, satyanarayan puja, and festive rituals.",
      sku: "RAM-HAVN-001",
      price: 399,
      mrp: 499,
      stock: 40,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Pure Shahi Roli & Kumkum",
      slug: "pure-shahi-roli-kumkum",
      shortDescription: "Traditional turmeric and lime-based vibrant red kumkum powder for sacred tilak.",
      description: "Naturally prepared from organic turmeric rhizomes fermented with natural lime juice, creating a non-chemical, skin-safe deep crimson red powder for tilak and idol consecration.",
      categoryId: samagriCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Pure Shahi Roli & Kumkum | Organic Turmeric Tilak Powder",
      seoDescription: "100% natural turmeric-based red kumkum powder for daily tilak and sacred ceremonies.",
      sku: "RAM-ROLI-001",
      price: 129,
      mrp: 179,
      stock: 80,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Mysore Sandalwood Chandan Powder",
      slug: "mysore-sandalwood-chandan-powder",
      shortDescription: "Pure aromatic sandalwood powder for deity abhishekam and forehead tilak.",
      description: "Finely ground from aged GI-tagged Mysore sandalwood heartwood. Emits a soothing cooling aroma when mixed with sacred Gangajal for deity worship.",
      categoryId: samagriCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Mysore Sandalwood Chandan Powder | Pure Sandal Paste",
      seoDescription: "Authentic Mysore chandan powder for deity abhishekam and sacred forehead tilak.",
      sku: "RAM-CHND-001",
      price: 449,
      mrp: 599,
      stock: 45,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Natural Vermilion Sindoor",
      slug: "natural-vermilion-sindoor",
      shortDescription: "Herbal orange-red vermilion sindoor for Hanuman Ji chola and sacred rituals.",
      description: "Traditional vibrant orange-red herbal sindoor made from herbal bixa seeds and saffron extracts. Ideal for Hanuman Ji worship and married women's sacred mangal rituals.",
      categoryId: samagriCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Natural Vermilion Sindoor | Hanuman Ji Chola Sindoor",
      seoDescription: "Herbal non-toxic vermilion sindoor for Hanuman Ji puja and divine offerings.",
      sku: "RAM-SIND-001",
      price: 149,
      mrp: 199,
      stock: 70,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Organic Puja Akshat Rice",
      slug: "organic-puja-akshat-rice",
      shortDescription: "Whole unbroken white rice grains scented with turmeric and rose for ritual offerings.",
      description: "Hand-selected unbroken full grains of white basmati rice infused with organic turmeric powder and fragrant rose water. Essential for invocation mantras in all Vedic pujas.",
      categoryId: samagriCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Organic Puja Akshat Rice | Unbroken Ritual Grains",
      seoDescription: "Premium unbroken white akshat rice for deity offerings and Vedic invocations.",
      sku: "RAM-AKSH-001",
      price: 99,
      mrp: 149,
      stock: 90,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Sacred Cotton Janeu Pair",
      slug: "sacred-cotton-janeu-pair",
      shortDescription: "Traditional hand-spun 9-thread cotton Yajnopavita thread pair blessed by priests.",
      description: "Handwoven pure white cotton sacred thread (Janeu) containing three strands representing Brahma, Vishnu, and Shiva. Crafted strictly according to scriptural measurements.",
      categoryId: samagriCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Sacred Cotton Janeu Pair | Yajnopavita Thread",
      seoDescription: "Hand-spun pure cotton Yajnopavita threads for sacred ceremonies and upanayana rituals.",
      sku: "RAM-JANU-001",
      price: 119,
      mrp: 159,
      stock: 85,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Premium Brass Pooja Thali Set",
      slug: "brass-pooja-thali-set",
      shortDescription: "Complete 7-piece carved heavy brass thali set including diya, ghanti, lota and bowls.",
      description: "An elegant master collection containing a 10-inch engraved brass plate, oil lamp, sacred bell, water lota, incense holder, kumkum katori, and spoon for a complete home mandir experience.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Premium Brass Pooja Thali Set | 7-Piece Mandir Combo",
      seoDescription: "Handcrafted pure brass 7-piece thali set for home worship, festive gifts, and daily ritual.",
      sku: "RAM-THAL-001",
      price: 1499,
      mrp: 1999,
      stock: 20,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Carved Brass Aarti Thali",
      slug: "carved-brass-aarti-thali",
      shortDescription: "Intricately embossed brass plate with lotus motifs for special evening aartis.",
      description: "Featuring raised traditional floral borders and mirror-finish brass polishing, this 8-inch plate elevates evening aarti offerings during grand festival occasions.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Carved Brass Aarti Thali | Embossed Lotus Plate",
      seoDescription: "Mirror-finish heavy brass thali decorated with traditional lotus carvings.",
      sku: "RAM-THAL-002",
      price: 899,
      mrp: 1199,
      stock: 18,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Engraved Brass Pooja Bell",
      slug: "engraved-brass-pooja-bell",
      shortDescription: "Resonant brass hand bell topped with Garuda deity finial for invoking divine vibrations.",
      description: "Cast in solid resonant bell metal brass, topped with a detailed Lord Garuda emblem. Produces a clear, long-sustaining chime that purifies spiritual surroundings.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Engraved Brass Pooja Bell | Garuda Ghanti",
      seoDescription: "Solid brass prayer bell with sacred Garuda top finial for home altar rituals.",
      sku: "RAM-BELL-001",
      price: 549,
      mrp: 749,
      stock: 28,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Brass Akhand Diya with Glass Cover",
      slug: "brass-akhand-diya-glass-cover",
      shortDescription: "Windproof brass deepak encased in heat-resistant borosilicate glass chimney.",
      description: "Designed for non-stop burning during Navratri and unbroken prayers. Thermal-shock proof glass chimney protects the flame from drafts while allowing radiant golden light.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Brass Akhand Diya with Glass Cover | Navratri Lamp",
      seoDescription: "Heavy brass unbroken flame diya with protective borosilicate glass cover.",
      sku: "RAM-DIYA-004",
      price: 699,
      mrp: 949,
      stock: 35,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Brass Dhoop & Incense Holder",
      slug: "brass-dhoop-incense-holder",
      shortDescription: "Ornate brass burner with wooden handle for burning dhoop cones and incense sticks.",
      description: "Hand-carved brass burner features perforated lattice lid that safely disperses scented smoke while capturing all falling ash cleanly within its interior tray.",
      categoryId: incenseCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Brass Dhoop & Incense Holder | Lattice Burner",
      seoDescription: "Lattice brass incense stick and dhoop cone burner with heat-safe wooden handle.",
      sku: "RAM-HOLD-001",
      price: 429,
      mrp: 599,
      stock: 32,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Electric Brass Kapoor Dani",
      slug: "electric-brass-kapoor-dani",
      shortDescription: "Dual-purpose electric brass camphor diffuser and night lamp with heavy brass plate.",
      description: "Safe electric heating coil gently warms Bhimseni camphor or essential oils without flame. Features a solid brass decorative housing with ambient warm lighting.",
      categoryId: incenseCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Electric Brass Kapoor Dani | Camphor Diffuser Lamp",
      seoDescription: "Flameless electric brass camphor burner and essential oil diffuser for peaceful home aroma.",
      sku: "RAM-KAPR-002",
      price: 599,
      mrp: 799,
      stock: 22,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Pure Brass Pooja Kalash",
      slug: "pure-brass-pooja-kalash",
      shortDescription: "Traditional brass water pot for Vedic abhishekam, varun puja, and mandir consecration.",
      description: "Heavy-gauge pure brass kalash with rounded belly and polished spout rim. Used for storing sacred water, coconut installation, and ritual purifications.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Pure Brass Pooja Kalash | Traditional Ritual Pot",
      seoDescription: "Heavy brass kalash pot for temple ceremonies, Griha Pravesh, and Varun puja.",
      sku: "RAM-KALS-001",
      price: 649,
      mrp: 899,
      stock: 24,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Brass Panchpatra & Achmani Set",
      slug: "brass-panchpatra-achmani-set",
      shortDescription: "Sacred brass holy water tumbler with engraved ritual achmani spoon for daily tarpana.",
      description: "Essential vessel for offering charanamrit or sacred water during morning prayers. Made of seamless food-safe brass with traditional floral engravings.",
      categoryId: brasswareCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Brass Panchpatra & Achmani Set | Holy Water Cup",
      seoDescription: "Traditional brass panchpatra vessel with achmani spoon for ritual purification.",
      sku: "RAM-PANC-001",
      price: 379,
      mrp: 499,
      stock: 35,
      imageUrl: "https://images.unsplash.com/photo-1509172237893-6c8f497a5f54?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Velvet Laddu Gopal Dress Set",
      slug: "velvet-laddu-gopal-dress-set",
      shortDescription: "Rich royal blue velvet poshak with golden gota patti embroidery for Bal Gopal.",
      description: "Exquisitely tailored royal velvet poshak embellished with micro zari threadwork, stone work, and matching pagri band. Suitable for size 2-4 Laddu Gopal idols.",
      categoryId: idolsCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Velvet Laddu Gopal Dress Set | Royal Blue Poshak",
      seoDescription: "Handcrafted velvet poshak dress with zari embroidery for Bal Gopal Krishna idols.",
      sku: "RAM-VAST-001",
      price: 299,
      mrp: 449,
      stock: 40,
      imageUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Zari Radha Krishna Poshak",
      slug: "zari-radha-krishna-poshak",
      shortDescription: "Matching pair of heavy brocade silk dresses with peacock feather motifs for divine couple.",
      description: "Premium matching silk poshak set designed for 8 to 10-inch Radha Krishna murtis. Includes lehenga dupatta for Shrimati Radharani and dhoti kurta patka for Lord Krishna.",
      categoryId: idolsCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Zari Radha Krishna Poshak | Brocade Silk Dress Pair",
      seoDescription: "Exquisite zari brocade silk matching dress pair for Radha Krishna temple idols.",
      sku: "RAM-VAST-002",
      price: 899,
      mrp: 1299,
      stock: 15,
      imageUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Silk Ram Darbar Poshak Set",
      slug: "silk-ram-darbar-poshak-set",
      shortDescription: "Complete 4-deity yellow silk attire set for Lord Ram, Mata Sita, Lakshman Ji & Hanuman Ji.",
      description: "Harmonized ceremonial yellow silk poshak tailored with golden borders. Includes garments for Lord Ram, Devi Sita, Lakshman Ji, and Bajrangbali.",
      categoryId: idolsCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Silk Ram Darbar Poshak Set | 4-Deity Yellow Attire",
      seoDescription: "Complete yellow silk dress set for Ram Darbar temple idols with intricate borders.",
      sku: "RAM-VAST-003",
      price: 1199,
      mrp: 1599,
      stock: 12,
      imageUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Red Chola Hanuman Ji Vastra",
      slug: "red-chola-hanuman-ji-vastra",
      shortDescription: "Sacred crimson silk chola decorated with golden Ram-naam embroidery for Lord Hanuman.",
      description: "Consecrated red silk chola with woven golden Jai Shree Ram lettering along the hem line. Specially tailored for Tuesday and Saturday Hanuman Ji worship.",
      categoryId: idolsCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Red Chola Hanuman Ji Vastra | Ram-Naam Silk Cloth",
      seoDescription: "Crimson red silk chola with gold Ram-naam embroidery for Bajrangbali idols.",
      sku: "RAM-VAST-004",
      price: 349,
      mrp: 499,
      stock: 30,
      imageUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Handcrafted Mor Mukut & Tilak Set",
      slug: "handcrafted-mor-mukut-tilak-set",
      shortDescription: "Golden brass crown embellished with real peacock feather and Kundan stone work.",
      description: "Regal peacock mukut (crown) designed for Krishna and Laddu Gopal idols. Comes with a matching gold-tone chandrika tilak for deity shringar.",
      categoryId: idolsCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Handcrafted Mor Mukut & Tilak Set | Peacock Feather Crown",
      seoDescription: "Kundan stone and peacock feather golden crown for Krishna deity shringar.",
      sku: "RAM-SHRN-001",
      price: 249,
      mrp: 349,
      stock: 45,
      imageUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Original Vrindavan Tulsi Mala",
      slug: "original-vrindavan-tulsi-mala",
      shortDescription: "108+1 hand-carved original holy basil wood bead necklace for japa and spiritual wearing.",
      description: "Crafted from authentic Vrindavan Shyam Tulsi wood stems. Smoothly knot-tied between natural beads with a guru bead, emitting sacred herbal vibes for chanting.",
      categoryId: decorCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Original Vrindavan Tulsi Mala | 108+1 Chanting Beads",
      seoDescription: "Authentic Vrindavan holy basil stem Tulsi mala for mantra japa and daily wearing.",
      sku: "RAM-MALA-001",
      price: 399,
      mrp: 599,
      stock: 50,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Panchmukhi Rudraksha Mala (108 Beads)",
      slug: "panchmukhi-rudraksha-mala-108",
      shortDescription: "Lab-tested authentic 5-faced Nepal Rudraksha rosary for peace, health and Shiva japa.",
      description: "Naturally strung 108+1 five-mukhi Nepal Rudraksha seeds (7mm size). Known to calm the nervous system, balance energies, and deepen meditation focus.",
      categoryId: decorCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Panchmukhi Rudraksha Mala (108 Beads) | Authentic Nepal Beads",
      seoDescription: "Original 5 Mukhi Nepal Rudraksha mala with lab certificate for Shiva meditation.",
      sku: "RAM-MALA-002",
      price: 799,
      mrp: 1199,
      stock: 30,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Natural Crystal Sphatik Mala",
      slug: "natural-crystal-sphatik-mala",
      shortDescription: "Diamond-cut transparent quartz crystal rosary for cooling energy and Saraswati sadhana.",
      description: "Strung with 108 faceted clear quartz (sphatik) crystals. Enhances mental clarity, reduces body heat, and promotes harmony when worn or used during japa.",
      categoryId: decorCat.id,
      vendorId: sandalVendor.id,
      status: ProductStatus.ACTIVE,
      featured: false,
      seoTitle: "Natural Crystal Sphatik Mala | 108 Faceted Quartz Beads",
      seoDescription: "Pure diamond-cut clear quartz crystal mala for peace, clarity, and mantra chanting.",
      sku: "RAM-MALA-003",
      price: 649,
      mrp: 899,
      stock: 25,
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: "Brass Lakshmi Mata Murti",
      slug: "brass-lakshmi-mata-murti",
      shortDescription: "Hand-finished pure brass Goddess Lakshmi idol seated on lotus holding gold coins.",
      description: "Artfully carved Lord Lakshmi idol representing prosperity, fortune, and divine grace. Ideal for Diwali Lakshmi Pujan and home temple consecration.",
      categoryId: idolsCat.id,
      vendorId: brassVendor.id,
      status: ProductStatus.ACTIVE,
      featured: true,
      seoTitle: "Brass Lakshmi Mata Murti | Handcrafted Idol | Ramanayam",
      seoDescription: "Heavy pure brass Goddess Lakshmi idol seated on lotus for Diwali and mandir worship.",
      sku: "RAM-IDOL-002",
      price: 1399,
      mrp: 1799,
      stock: 12,
      imageUrl: "https://images.unsplash.com/photo-1567591414240-e14b533d3958?w=800&auto=format&fit=crop&q=80",
    },
  ];

  console.log("=========================================");
  console.log("📦 SEEDING PRODUCTS, VARIANTS & INVENTORY");
  console.log("=========================================\n");

  const results = [];

  for (const item of productsToSeed) {
    // 1. Upsert Product
    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        shortDescription: item.shortDescription,
        description: item.description,
        categoryId: item.categoryId,
        vendorId: item.vendorId,
        status: item.status,
        featured: item.featured,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      },
      create: {
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        description: item.description,
        categoryId: item.categoryId,
        vendorId: item.vendorId,
        status: item.status,
        featured: item.featured,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
      },
    });

    // 2. Upsert Product Variant
    const variant = await prisma.productVariant.upsert({
      where: { sku: item.sku },
      update: {
        productId: product.id,
        variantName: "Standard",
        price: item.price,
        compareAtPrice: item.mrp,
        isDefault: true,
        isActive: true,
      },
      create: {
        productId: product.id,
        sku: item.sku,
        variantName: "Standard",
        price: item.price,
        compareAtPrice: item.mrp,
        isDefault: true,
        isActive: true,
      },
    });

    // 3. Upsert Inventory
    const inventory = await prisma.inventory.upsert({
      where: { variantId: variant.id },
      update: {
        availableStock: item.stock,
      },
      create: {
        variantId: variant.id,
        availableStock: item.stock,
        lowStockAlert: 5,
      },
    });

    // 4. Create Image if provided and not already existing
    let imageRecord = await prisma.productImage.findFirst({
      where: { productId: product.id },
    });

    if (!imageRecord && item.imageUrl) {
      imageRecord = await prisma.productImage.create({
        data: {
          productId: product.id,
          imageUrl: item.imageUrl,
          altText: item.name,
          isPrimary: true,
          sortOrder: 0,
        },
      });
    }

    results.push({
      productName: product.name,
      slug: product.slug,
      sku: variant.sku,
      productId: product.id,
      variantId: variant.id,
      inventoryId: inventory.id,
      imageId: imageRecord?.id || "None",
      stock: inventory.availableStock,
      price: variant.price,
      featured: product.featured,
    });

    console.log(`✅ Seeded: "${product.name}"`);
    console.log(`   - Product ID:   ${product.id}`);
    console.log(`   - Variant ID:   ${variant.id} (SKU: ${variant.sku})`);
    console.log(`   - Inventory ID: ${inventory.id} (Available: ${inventory.availableStock})`);
    console.log(`   - Image ID:     ${imageRecord?.id || "None"}\n`);
  }

  console.log("=========================================");
  console.log(`🎉 PHASE 1 SEED COMPLETED! Total items processed: ${results.length}`);
  console.log("=========================================");
}

if (require.main === module) {
  seedProducts()
    .catch((err) => {
      console.error("❌ Seed script error:", err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
