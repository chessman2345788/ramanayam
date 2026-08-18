const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = [
  { name: "Pooja Samagri", slug: "pooja-samagri", description: "Essential sacred samagri, dhoop, kapur, and ritual items" },
  { name: "Pooja Thali & Accessories", slug: "pooja-thali-accessories", description: "Handcrafted brass thalis, diyas, and katoris" },
  { name: "Temple Decoration", slug: "temple-decoration", description: "Toran, wall hangings, and mandir ornaments" },
  { name: "Bhagwan Vastra", slug: "bhagwan-vastra", description: "Velvet, silk, and embroidered poshaks for murtis" },
  { name: "Mukut & Shringar", slug: "mukut-shringar", description: "Stone-studded crowns, bansuri, and shringar accessories" },
  { name: "Mala", slug: "mala", description: "Tulsi, Sphatik, and Rudraksha japa malas" },
  { name: "Murti", slug: "murti", description: "Solid brass, marble, and panchdhatu deity idols" },
  { name: "Mandir", slug: "mandir", description: "Wooden, teakwood, and brass home mandirs" },
  { name: "Shankh & Bells", slug: "shankh-bells", description: "Blowable ocean conches and temple ghanti" },
  { name: "Brass & Copper Items", slug: "brass-copper-items", description: "Copper lotas, kalash, and brass vessels" },
  { name: "Rudraksha Collection", slug: "rudraksha-collection", description: "Certified Nepali 1 to 14 Mukhi Rudraksha beads" },
  { name: "Yantra", slug: "yantra", description: "Consecrated Shree Yantra, Kuber, and Lakshmi yantras" },
  { name: "Books & Scriptures", slug: "books-scriptures", description: "Hanuman Chalisa, Ramcharitmanas, and sacred texts" },
  { name: "Festival Special", slug: "festival-special", description: "Diwali, Navratri, Janmashtami & Shivratri items" },
  { name: "Pooja Kits", slug: "pooja-kits", description: "All-in-one complete ritual and havan kits" },
  { name: "Bhog & Prasad", slug: "bhog-prasad", description: "Sacred dry fruit prasad, mishri, and panchamrit vessels" },
  { name: "Clothing & Religious Wear", slug: "clothing-religious-wear", description: "Angavastram, dhoti, and silk dupattas" },
  { name: "Spiritual Accessories", slug: "spiritual-accessories", description: "Asan, japa bags, and tilak stamp sets" },
  { name: "Home Fragrance", slug: "home-fragrance", description: "Mysore sandal dhoop cones, guggal, and loban" },
  { name: "Gift Items", slug: "gift-items", description: "Sacred corporate and housewarming gift boxes" },
];

async function seedCategories() {
  console.log("🌱 Seeding Ramanayam category hierarchy...");
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: { name: cat.name, slug: cat.slug, description: cat.description, isActive: true },
    });
  }
  console.log(`✅ Successfully seeded/verified ${categories.length} Ramanayam categories.`);
}

seedCategories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
