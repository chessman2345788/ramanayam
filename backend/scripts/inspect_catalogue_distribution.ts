import { prisma } from "../src/prisma";

async function main() {
  const totalProducts = await prisma.product.count();
  console.log(`=== TOTAL PRODUCTS IN DATABASE: ${totalProducts} ===\n`);

  // 1. Status breakdown
  const statusCounts = await prisma.product.groupBy({
    by: ["status"],
    _count: { id: true },
  });
  console.log("=== PRODUCT STATUS DISTRIBUTION ===");
  statusCounts.forEach((sc) => {
    console.log(`- ${sc.status}: ${sc._count.id}`);
  });
  console.log("");

  // 2. Category distribution
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
      parent: {
        select: { id: true, name: true, slug: true },
      },
    },
    orderBy: {
      products: { _count: "desc" },
    },
  });

  console.log("=== CATEGORY DISTRIBUTION (ALL CATEGORIES) ===");
  categories.forEach((cat) => {
    console.log(`- ${cat.name} (${cat.slug}) [ID: ${cat.id}] [Active: ${cat.isActive}] [Parent: ${cat.parent?.name || "None"}]: ${cat._count.products} products`);
  });
  console.log("");

  // 3. Inspect Data Quality across all products
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: {
        include: {
          inventory: true,
        },
      },
      images: {
        orderBy: { sortOrder: "asc" },
      },
      vendor: true,
    },
  });

  let validImageCount = 0;
  let validPriceCount = 0;
  let validStockCount = 0;
  let validSkuCount = 0;
  let completeInfoCount = 0;

  const categoryProductMap: Record<string, typeof products> = {};

  products.forEach((p) => {
    const catName = p.category?.name || "Uncategorized";
    if (!categoryProductMap[catName]) {
      categoryProductMap[catName] = [];
    }
    categoryProductMap[catName].push(p);

    const hasImages = p.images && p.images.length > 0 && p.images.some((img) => img.imageUrl && img.imageUrl.trim().length > 0);
    const hasVariant = p.variants && p.variants.length > 0;
    const defaultVariant = p.variants.find((v) => v.isDefault) || p.variants[0];
    const hasPrice = hasVariant && Number(defaultVariant?.price) > 0;
    const hasStock = hasVariant && (defaultVariant?.inventory?.availableStock ?? 0) > 0;
    const hasSku = hasVariant && !!defaultVariant?.sku;
    const hasInfo = !!(p.name && p.description && p.shortDescription);

    if (hasImages) validImageCount++;
    if (hasPrice) validPriceCount++;
    if (hasStock) validStockCount++;
    if (hasSku) validSkuCount++;
    if (hasImages && hasPrice && hasStock && hasSku && hasInfo) completeInfoCount++;
  });

  console.log("=== DATA QUALITY METRICS ===");
  console.log(`- Products with Valid Images: ${validImageCount}/${totalProducts} (${((validImageCount/totalProducts)*100).toFixed(1)}%)`);
  console.log(`- Products with Valid Price (>0): ${validPriceCount}/${totalProducts} (${((validPriceCount/totalProducts)*100).toFixed(1)}%)`);
  console.log(`- Products with Available Stock (>0): ${validStockCount}/${totalProducts} (${((validStockCount/totalProducts)*100).toFixed(1)}%)`);
  console.log(`- Products with Valid SKU: ${validSkuCount}/${totalProducts} (${((validSkuCount/totalProducts)*100).toFixed(1)}%)`);
  console.log(`- Products with Complete Info (All fields): ${completeInfoCount}/${totalProducts} (${((completeInfoCount/totalProducts)*100).toFixed(1)}%)`);
  console.log("");

  // 4. Per category selection recommendation
  console.log("=== CATEGORY BREAKDOWN & CANDIDATE POOL FOR ~200 LAUNCH ===");
  const targetTotal = 200;
  const numCategories = Object.keys(categoryProductMap).length;
  console.log(`Total Categories with Products: ${numCategories}`);

  // Calculate target per category proportional to size with min floor
  let recommendedTotal = 0;
  const recommendationSummary: Record<string, { total: number; recommended: number; sampleProducts: string[] }> = {};

  for (const [catName, catProducts] of Object.entries(categoryProductMap)) {
    // Filter fully valid products first
    const qualified = catProducts.filter((p) => {
      const hasImages = p.images && p.images.length > 0 && p.images.some((img) => img.imageUrl && img.imageUrl.trim().length > 0);
      const defaultVariant = p.variants.find((v) => v.isDefault) || p.variants[0];
      const hasPrice = defaultVariant && Number(defaultVariant.price) > 0;
      const hasStock = defaultVariant && (defaultVariant.inventory?.availableStock ?? 0) > 0;
      const hasSku = defaultVariant && !!defaultVariant.sku;
      return hasImages && hasPrice && hasStock && hasSku;
    });

    // Proportionally allocate ~200
    const proportion = catProducts.length / totalProducts;
    let quota = Math.round(proportion * targetTotal);
    if (quota < 1 && catProducts.length > 0) quota = 1;
    if (quota > qualified.length) quota = qualified.length;

    recommendedTotal += quota;
    recommendationSummary[catName] = {
      total: catProducts.length,
      recommended: quota,
      sampleProducts: qualified.slice(0, 3).map((p) => p.name),
    };

    console.log(`Category: "${catName}" | Total DB: ${catProducts.length} | Qualified: ${qualified.length} | Recommended Launch Quota: ${quota}`);
  }

  console.log(`\nTotal Recommended Products for Initial Launch: ${recommendedTotal}`);
  console.log(`Remaining to be set INACTIVE / DRAFT: ${totalProducts - recommendedTotal}`);
}

main().finally(() => prisma.$disconnect());
