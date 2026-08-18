import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function searchRemainingTestData() {
  console.log("==========================================================================");
  console.log("             SEARCHING REMAINING TEST / DEMO / SEED DATA IN DB            ");
  console.log("==========================================================================\n");

  const keywords = ['demo', 'dummy', 'test', 'seed', 'sample', 'fake'];

  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();
  const users = await prisma.user.findMany();
  const coupons = await prisma.coupon.findMany();
  const reviews = await prisma.review.findMany();
  const settings = await prisma.systemSetting.findMany();

  let flaggedProducts = products.filter(p => keywords.some(k => p.name.toLowerCase().includes(k) || p.slug.toLowerCase().includes(k)));
  let flaggedCategories = categories.filter(c => keywords.some(k => c.name.toLowerCase().includes(k) || c.slug.toLowerCase().includes(k)));
  let flaggedUsers = users.filter(u => keywords.some(k => u.email.toLowerCase().includes(k) || u.firstName.toLowerCase().includes(k)));
  let flaggedCoupons = coupons.filter(c => keywords.some(k => c.code.toLowerCase().includes(k)));
  let flaggedReviews = reviews.filter(r => keywords.some(k => (r.comment || '').toLowerCase().includes(k)));
  let flaggedSettings = settings.filter(s => keywords.some(k => s.key.toLowerCase().includes(k) || s.value.toLowerCase().includes(k)));

  console.log(`Flagged Products with test keywords: ${flaggedProducts.length}`);
  console.log(`Flagged Categories with test keywords: ${flaggedCategories.length}`);
  console.log(`Flagged Users with test keywords: ${flaggedUsers.length}`);
  console.log(`Flagged Coupons with test keywords: ${flaggedCoupons.length}`);
  console.log(`Flagged Reviews with test keywords: ${flaggedReviews.length}`);
  console.log(`Flagged Settings with test keywords: ${flaggedSettings.length}`);

  if (flaggedReviews.length > 0) {
    console.log("\nFlagged Review Details:");
    for (const r of flaggedReviews) {
      console.log(`  - Review ID: ${r.id} | Rating: ${r.rating} | Comment: "${r.comment}"`);
    }
  }

  console.log("\n=================== TEST DATA SEARCH COMPLETE ===================");
}

searchRemainingTestData()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
