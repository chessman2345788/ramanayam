import { prisma } from "../src/prisma";
import { ProductRepository } from "../src/modules/products/product.repository";
import { CategoryRepository } from "../src/modules/categories/category.repository";

async function main() {
  console.log("=== RUNNING POST-EXECUTION API & QUERY VERIFICATION ===\n");
  const productRepo = new ProductRepository(prisma);
  const categoryRepo = new CategoryRepository(prisma);

  // 1. Test public storefront findProducts (no status param)
  const publicResult = await productRepo.findProducts({}, "newest", 0, 1000);
  console.log(`1. Public Storefront findProducts({}):`);
  console.log(`   Total returned: ${publicResult.total}`);
  console.log(`   Count of data items: ${publicResult.data.length}`);
  const hasNonActivePublic = publicResult.data.some((p) => p.status !== "ACTIVE");
  console.log(`   Any non-active products returned to public? ${hasNonActivePublic ? "YES (FAIL)" : "NO (PASS)"}\n`);

  // 2. Test Admin findProducts with status="ALL"
  const adminAllResult = await productRepo.findProducts({ status: "ALL" }, "newest", 0, 2000);
  console.log(`2. Admin findProducts({ status: "ALL" }):`);
  console.log(`   Total returned: ${adminAllResult.total}`);
  console.log(`   Count of data items: ${adminAllResult.data.length}`);
  console.log(`   Matches all 1064 products in DB? ${adminAllResult.total === 1064 ? "YES (PASS)" : "NO (FAIL)"}\n`);

  // 3. Test Admin findProducts with status="DRAFT"
  const adminDraftResult = await productRepo.findProducts({ status: "DRAFT" }, "newest", 0, 2000);
  console.log(`3. Admin findProducts({ status: "DRAFT" }):`);
  console.log(`   Total returned: ${adminDraftResult.total}`);
  console.log(`   Count of data items: ${adminDraftResult.data.length}`);
  console.log(`   Matches all 865 draft products? ${adminDraftResult.total === 865 ? "YES (PASS)" : "NO (FAIL)"}\n`);

  // 4. Test Category active counts
  const categoriesResult = await categoryRepo.findAll({}, 0, 100);
  const totalActiveInCategories = categoriesResult.data.reduce((acc, c: any) => acc + (c._count?.products || 0), 0);
  console.log(`4. Category active product counts:`);
  console.log(`   Total sum across all categories: ${totalActiveInCategories}`);
  console.log(`   Matches active quota of 199? ${totalActiveInCategories === 199 ? "YES (PASS)" : "NO (FAIL)"}\n`);

  // 5. Test search with public default
  const searchResult = await productRepo.findProducts({ search: "Diya" }, "newest", 0, 100);
  console.log(`5. Storefront Search query ("Diya"):`);
  console.log(`   Matches found in active catalogue: ${searchResult.total}`);
  const nonActiveInSearch = searchResult.data.some((p) => p.status !== "ACTIVE");
  console.log(`   Any non-active products in search results? ${nonActiveInSearch ? "YES (FAIL)" : "NO (PASS)"}\n`);

  console.log("=== ALL POST-EXECUTION VERIFICATIONS COMPLETE ===");
}

main().finally(() => prisma.$disconnect());
