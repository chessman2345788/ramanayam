import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function inspectAndSeed() {
  console.log("=== INSPECTING DATABASE CATEGORIES & VENDORS ===");

  const categories = await prisma.category.findMany();
  const vendors = await prisma.vendor.findMany();

  console.log("Existing Categories:");
  categories.forEach((c) => console.log(`- [${c.id}] Name: "${c.name}", Slug: "${c.slug}"`));

  console.log("\nExisting Vendors:");
  vendors.forEach((v) => console.log(`- [${v.id}] Business: "${v.businessName}", Slug: "${v.slug}"`));
}

inspectAndSeed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
