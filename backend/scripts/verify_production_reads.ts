import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../src/modules/products/product.repository';
import { CategoryRepository } from '../src/modules/categories/category.repository';

async function verifyReads() {
  const targetUrl = process.env.TARGET_DATABASE_URL || process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

  console.log('==========================================================================');
  console.log('       RAMANAYAM ISOLATED READ-ONLY PRODUCTION VERIFICATION               ');
  console.log('==========================================================================');

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: targetUrl,
      },
    },
  });

  const productRepo = new ProductRepository(prisma);
  const categoryRepo = new CategoryRepository(prisma);
  const latencies: Record<string, number> = {};

  try {
    // 1. Health / Connection Ping
    const t0 = Date.now();
    const pingRes: any = await prisma.$queryRawUnsafe(`SELECT 1 as ping;`);
    latencies['1. Health/Ping'] = Date.now() - t0;
    console.log(`✅ 1. Health Ping: ${latencies['1. Health/Ping']}ms (Result: ${pingRes[0]?.ping})`);

    // 2. GET Products List (Public Storefront Default)
    const t1 = Date.now();
    const publicProducts = await productRepo.findProducts({}, 'newest', 0, 1000);
    latencies['2. Public Products Query'] = Date.now() - t1;
    console.log(`✅ 2. Public Products Query: ${latencies['2. Public Products Query']}ms (Total: ${publicProducts.total})`);
    const hasNonActivePublic = publicProducts.data.some((p) => p.status !== 'ACTIVE');
    if (publicProducts.total !== 199 || hasNonActivePublic) {
      throw new Error(`Public products query failed: Expected 199 ACTIVE products, got ${publicProducts.total}`);
    }

    // 3. GET Search Products ("Diya" & "Rudraksha")
    const t2 = Date.now();
    const searchRes = await productRepo.findProducts({ search: 'Rudraksha' }, 'newest', 0, 50);
    latencies['3. Product Search ("Rudraksha")'] = Date.now() - t2;
    console.log(`✅ 3. Search "Rudraksha": ${latencies['3. Product Search ("Rudraksha")']}ms (Found: ${searchRes.total} items)`);

    // 4. GET Categories
    const t3 = Date.now();
    const categories = await categoryRepo.findAll({}, 0, 100);
    latencies['4. Categories List'] = Date.now() - t3;
    console.log(`✅ 4. Categories List: ${latencies['4. Categories List']}ms (Total: ${categories.data.length})`);

    // 5. GET Product Detail by Slug
    const sampleSlug = publicProducts.data[0]?.slug;
    const t4 = Date.now();
    const productDetail = await productRepo.findBySlug(sampleSlug);
    latencies['5. Product Detail'] = Date.now() - t4;
    console.log(`✅ 5. Product Detail ("${sampleSlug}"): ${latencies['5. Product Detail']}ms (Found: ${Boolean(productDetail)})`);

    // 6. GET Inventory Summary Check
    const t5 = Date.now();
    const totalInventory = await prisma.inventory.aggregate({
      _sum: { availableStock: true, reservedStock: true, soldStock: true },
      _count: { id: true },
    });
    latencies['6. Inventory Summary'] = Date.now() - t5;
    console.log(`✅ 6. Inventory Summary: ${latencies['6. Inventory Summary']}ms (Total Available Stock: ${totalInventory._sum.availableStock}, Total Rows: ${totalInventory._count.id})`);

    // 7. Admin Dashboard Metrics Read
    const t6 = Date.now();
    const adminMetrics = {
      totalProducts: await prisma.product.count(),
      activeProducts: await prisma.product.count({ where: { status: 'ACTIVE' } }),
      draftProducts: await prisma.product.count({ where: { status: 'DRAFT' } }),
      totalVariants: await prisma.productVariant.count(),
      totalInventory: await prisma.inventory.count(),
      totalUsers: await prisma.user.count(),
      totalOrders: await prisma.order.count(),
      totalCategories: await prisma.category.count(),
      totalCoupons: await prisma.coupon.count(),
      totalReviews: await prisma.review.count(),
    };
    latencies['7. Admin Dashboard Metrics'] = Date.now() - t6;
    console.log(`✅ 7. Admin Dashboard Metrics: ${latencies['7. Admin Dashboard Metrics']}ms`);
    console.log(`      Metrics:`, JSON.stringify(adminMetrics, null, 2));

    // 8. Admin Products Table (ALL products)
    const t7 = Date.now();
    const adminAllResult = await productRepo.findProducts({ status: 'ALL' }, 'newest', 0, 2000);
    latencies['8. Admin ALL Products'] = Date.now() - t7;
    console.log(`✅ 8. Admin ALL Products: ${latencies['8. Admin ALL Products']}ms (Total: ${adminAllResult.total})`);
    if (adminAllResult.total !== 1064) {
      throw new Error(`Admin ALL products query failed: Expected 1064, got ${adminAllResult.total}`);
    }

    // 9. Admin DRAFT Products Table
    const t8 = Date.now();
    const adminDraftResult = await productRepo.findProducts({ status: 'DRAFT' }, 'newest', 0, 2000);
    latencies['9. Admin DRAFT Products'] = Date.now() - t8;
    console.log(`✅ 9. Admin DRAFT Products: ${latencies['9. Admin DRAFT Products']}ms (Total: ${adminDraftResult.total})`);
    if (adminDraftResult.total !== 865) {
      throw new Error(`Admin DRAFT products query failed: Expected 865, got ${adminDraftResult.total}`);
    }

    // 10. Admin Customers / Users Read
    const t9 = Date.now();
    const customers = await prisma.user.findMany({ take: 10 });
    latencies['10. Admin Customers'] = Date.now() - t9;
    console.log(`✅ 10. Admin Customers Read: ${latencies['10. Admin Customers']}ms (Fetched: ${customers.length})`);

    // 11. Admin Orders Read
    const t10 = Date.now();
    const orders = await prisma.order.findMany({ take: 10 });
    latencies['11. Admin Orders'] = Date.now() - t10;
    console.log(`✅ 11. Admin Orders Read: ${latencies['11. Admin Orders']}ms (Count: ${orders.length})`);

    // 12. Admin Reviews Read
    const t11 = Date.now();
    const reviews = await prisma.review.findMany({ take: 10 });
    latencies['12. Admin Reviews'] = Date.now() - t11;
    console.log(`✅ 12. Admin Reviews Read: ${latencies['12. Admin Reviews']}ms (Count: ${reviews.length})`);

    // 13. Admin Coupons Read
    const t12 = Date.now();
    const coupons = await prisma.coupon.findMany();
    latencies['13. Admin Coupons'] = Date.now() - t12;
    console.log(`✅ 13. Admin Coupons Read: ${latencies['13. Admin Coupons']}ms (Count: ${coupons.length})`);

    // 14. Admin Settings Read
    const t13 = Date.now();
    const settings = await prisma.systemSetting.findMany();
    latencies['14. Admin Settings'] = Date.now() - t13;
    console.log(`✅ 14. Admin Settings Read: ${latencies['14. Admin Settings']}ms (Count: ${settings.length})`);

    // 15. Storefront Filtering Strict Validation
    console.log(`\n=================== STOREFRONT FILTERING INTEGRITY ===================`);
    console.log(`  - Public Storefront Products Total: ${publicProducts.total} (Expected: 199) -> ${publicProducts.total === 199 ? 'PASS' : 'FAIL'}`);
    console.log(`  - Public Non-ACTIVE Leaks: ${hasNonActivePublic ? 'DETECTED (FAIL)' : 'ZERO LEAKS (PASS)'}`);
    console.log(`  - Admin ALL Products Total: ${adminAllResult.total} (Expected: 1064) -> ${adminAllResult.total === 1064 ? 'PASS' : 'FAIL'}`);
    console.log(`  - Admin DRAFT Products Total: ${adminDraftResult.total} (Expected: 865) -> ${adminDraftResult.total === 865 ? 'PASS' : 'FAIL'}`);

    console.log('\n=================== READ OPERATION LATENCIES ===================');
    console.table(latencies);
    console.log('🎉 ALL READ-ONLY VERIFICATIONS PASSED WITH ZERO MODIFICATIONS!');
  } catch (err) {
    console.error('❌ Read verification error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyReads();
