import { prisma } from "../src/prisma";

async function main() {
  console.log("==================================================");
  console.log("STARTING SAFE CATALOGUE REDUCTION EXECUTION");
  console.log("==================================================\n");

  const totalBefore = await prisma.product.count();
  const totalVariantsBefore = await prisma.productVariant.count();
  const totalInventoryBefore = await prisma.inventory.count();

  console.log(`Pre-execution verification:`);
  console.log(`- Total Products in DB: ${totalBefore}`);
  console.log(`- Total Product Variants: ${totalVariantsBefore}`);
  console.log(`- Total Inventory Records: ${totalInventoryBefore}\n`);

  if (totalBefore !== 1064) {
    throw new Error(`Safety check failed: Expected exactly 1064 products, found ${totalBefore}`);
  }

  // 1. Query all categories and allocate the 199 candidate products
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: {
            include: { inventory: true },
          },
          images: {
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { name: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });

  const launchProductIds: string[] = [];
  const draftProductIds: string[] = [];

  for (const cat of categories) {
    const totalInCat = cat.products.length;
    if (totalInCat === 0) continue;

    let quota = Math.round((totalInCat / 1064) * 200);
    if (quota < 1 && totalInCat > 0) quota = 1;
    if (quota > totalInCat) quota = totalInCat;

    const selected = cat.products.slice(0, quota);
    const unselected = cat.products.slice(quota);

    selected.forEach((p) => launchProductIds.push(p.id));
    unselected.forEach((p) => draftProductIds.push(p.id));
  }

  console.log(`Calculated Allocations:`);
  console.log(`- Target ACTIVE launch products: ${launchProductIds.length}`);
  console.log(`- Target DRAFT preserved products: ${draftProductIds.length}`);
  console.log(`- Total accounted for: ${launchProductIds.length + draftProductIds.length}\n`);

  if (launchProductIds.length + draftProductIds.length !== 1064) {
    throw new Error(`Safety check failed: Total partitioned products (${launchProductIds.length + draftProductIds.length}) != 1064`);
  }

  // 2. Perform atomic status update in a transaction
  console.log("Applying atomic status updates to PostgreSQL database...");
  await prisma.$transaction([
    prisma.product.updateMany({
      where: { id: { in: launchProductIds } },
      data: { status: "ACTIVE" },
    }),
    prisma.product.updateMany({
      where: { id: { in: draftProductIds } },
      data: { status: "DRAFT" },
    }),
  ]);

  console.log("Database transaction committed successfully!\n");

  // 3. Post-execution Verification
  const totalAfter = await prisma.product.count();
  const totalVariantsAfter = await prisma.productVariant.count();
  const totalInventoryAfter = await prisma.inventory.count();

  const activeCount = await prisma.product.count({ where: { status: "ACTIVE" } });
  const draftCount = await prisma.product.count({ where: { status: "DRAFT" } });
  const archivedCount = await prisma.product.count({ where: { status: "ARCHIVED" } });

  console.log("==================================================");
  console.log("POST-EXECUTION VERIFICATION REPORT");
  console.log("==================================================");
  console.log(`- Total Products in DB: ${totalAfter} (Expected: 1064) -> ${totalAfter === 1064 ? "PASS" : "FAIL"}`);
  console.log(`- Active Products: ${activeCount} (Expected: 199) -> ${activeCount === 199 ? "PASS" : "FAIL"}`);
  console.log(`- Draft Products: ${draftCount} (Expected: 865) -> ${draftCount === 865 ? "PASS" : "FAIL"}`);
  console.log(`- Archived Products: ${archivedCount} (Expected: 0) -> ${archivedCount === 0 ? "PASS" : "FAIL"}`);
  console.log(`- Total Variants: ${totalVariantsAfter} (Unchanged: ${totalVariantsAfter === totalVariantsBefore ? "YES" : "NO"})`);
  console.log(`- Total Inventory: ${totalInventoryAfter} (Unchanged: ${totalInventoryAfter === totalInventoryBefore ? "YES" : "NO"})`);

  // Check category coverage
  const categoriesWithActive = await prisma.category.findMany({
    where: {
      products: {
        some: { status: "ACTIVE" },
      },
    },
    select: { id: true, name: true },
  });

  console.log(`- Categories Represented in Launch: ${categoriesWithActive.length}/25`);
  console.log("==================================================");
}

main().finally(() => prisma.$disconnect());
