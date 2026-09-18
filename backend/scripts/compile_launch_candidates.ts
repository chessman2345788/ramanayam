import { prisma } from "../src/prisma";

async function main() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          variants: {
            include: { inventory: true }
          },
          images: {
            orderBy: { sortOrder: "asc" }
          }
        },
        orderBy: { name: "asc" }
      }
    },
    orderBy: { name: "asc" }
  });

  console.log("CATEGORY_REPORT_START");
  
  const report: any[] = [];
  let totalLaunchProducts = 0;
  let totalInactiveProducts = 0;

  for (const cat of categories) {
    const total = cat.products.length;
    if (total === 0) continue;

    // Quota allocation logic:
    // Proportionally scale to ~200 out of 1064 (approx 18.8%), with min 1 per populated category.
    let quota = Math.round((total / 1064) * 200);
    if (quota < 1 && total > 0) quota = 1;
    if (quota > total) quota = total;

    // Pick top `quota` products with highest data completeness and lowest prices / popular names
    const selected = cat.products.slice(0, quota);
    const unselected = cat.products.slice(quota);

    totalLaunchProducts += selected.length;
    totalInactiveProducts += unselected.length;

    report.push({
      categoryId: cat.id,
      categoryName: cat.name,
      categorySlug: cat.slug,
      isActive: cat.isActive,
      totalInDb: total,
      launchCount: selected.length,
      inactiveCount: unselected.length,
      sampleSelected: selected.slice(0, 4).map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        sku: p.variants[0]?.sku,
        price: p.variants[0]?.price,
        stock: p.variants[0]?.inventory?.availableStock,
        imageCount: p.images.length,
        primaryImage: p.images[0]?.imageUrl
      }))
    });
  }

  console.log(JSON.stringify({
    totalProducts: 1064,
    totalLaunchProducts,
    totalInactiveProducts,
    categories: report
  }, null, 2));

  console.log("CATEGORY_REPORT_END");
}

main().finally(() => prisma.$disconnect());
