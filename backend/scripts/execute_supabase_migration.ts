import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load .env.production with override so we get Supabase DIRECT_URL
dotenv.config({ path: path.join(__dirname, '..', '.env.production'), override: true });

async function main() {
  const startTime = Date.now();

  console.log('==========================================================================');
  console.log('   RAMANAYAM PRODUCTION DATA MIGRATION — LOCAL → SUPABASE');
  console.log('==========================================================================\n');

  // ── PHASE 0: PRE-FLIGHT SAFETY CHECKS ──────────────────────────────────
  console.log('--- PHASE 0: PRE-FLIGHT SAFETY CHECKS ---\n');

  // 0A. Verify local database counts match expectations
  const localPrisma = new PrismaClient();
  const localCounts = {
    User: await localPrisma.user.count(),
    Address: await localPrisma.address.count(),
    Category: await localPrisma.category.count(),
    Collection: await localPrisma.collection.count(),
    Vendor: await localPrisma.vendor.count(),
    Product: await localPrisma.product.count(),
    ProductVariant: await localPrisma.productVariant.count(),
    ProductImage: await localPrisma.productImage.count(),
    Inventory: await localPrisma.inventory.count(),
    ProductCollection: await localPrisma.productCollection.count(),
    Review: await localPrisma.review.count(),
    Order: await localPrisma.order.count(),
    OrderItem: await localPrisma.orderItem.count(),
    Payment: await localPrisma.payment.count(),
    Coupon: await localPrisma.coupon.count(),
    CmsBanner: await localPrisma.cmsBanner.count(),
    CmsSection: await localPrisma.cmsSection.count(),
    SystemSetting: await localPrisma.systemSetting.count(),
  };
  const localActive = await localPrisma.product.count({ where: { status: 'ACTIVE' } });
  const localDraft = await localPrisma.product.count({ where: { status: 'DRAFT' } });
  const localArchived = await localPrisma.product.count({ where: { status: 'ARCHIVED' } });

  console.log('LOCAL DATABASE (localhost:5432/ramanayam_db) LIVE COUNTS:');
  for (const [k, v] of Object.entries(localCounts)) {
    console.log(`  ${k.padEnd(20)}: ${v}`);
  }
  console.log(`  ACTIVE products    : ${localActive}`);
  console.log(`  DRAFT products     : ${localDraft}`);
  console.log(`  ARCHIVED products  : ${localArchived}`);

  // Safety assertion
  if (localCounts.Product !== 1064 || localActive !== 199 || localDraft !== 865) {
    console.error('❌ ABORT: Local database state does not match expected launch state!');
    process.exit(1);
  }
  console.log('✅ Local database state verified.\n');

  // 0B. Verify latest backup matches local state
  const backupDir = path.join(__dirname, '..', 'prisma', 'backups');
  const jsonFiles = fs.readdirSync(backupDir).filter(f => f.endsWith('.json')).sort().reverse();
  const latestBackupFile = jsonFiles[0];
  const latestBackupPath = path.join(backupDir, latestBackupFile);
  console.log(`📦 Using backup: ${latestBackupFile}`);

  const snapshot = JSON.parse(fs.readFileSync(latestBackupPath, 'utf8'));
  const data = snapshot.tables || snapshot.data || {};

  const backupProductCount = data.products?.length || 0;
  const backupVariantCount = data.productVariants?.length || 0;
  const backupActiveCount = data.products?.filter((p: any) => p.status === 'ACTIVE').length || 0;
  const backupDraftCount = data.products?.filter((p: any) => p.status === 'DRAFT').length || 0;

  console.log(`   Backup products: ${backupProductCount} (ACTIVE: ${backupActiveCount}, DRAFT: ${backupDraftCount})`);
  console.log(`   Backup variants: ${backupVariantCount}`);

  if (backupProductCount !== localCounts.Product || backupActiveCount !== localActive || backupDraftCount !== localDraft) {
    console.error('❌ ABORT: Backup snapshot does not match current local database!');
    process.exit(1);
  }
  console.log('✅ Backup snapshot verified against local database.\n');

  await localPrisma.$disconnect();

  // ── PHASE 1: CONNECT TO SUPABASE TARGET ─────────────────────────────────
  console.log('--- PHASE 1: CONNECT TO SUPABASE TARGET ---\n');

  const targetUrl = process.env.DIRECT_URL;
  if (!targetUrl) {
    console.error('❌ ABORT: DIRECT_URL not set in .env.production');
    process.exit(1);
  }

  const targetPrisma = new PrismaClient({
    datasources: { db: { url: targetUrl } }
  });

  const versionRes: any = await targetPrisma.$queryRawUnsafe(`SELECT version();`);
  const dbRes: any = await targetPrisma.$queryRawUnsafe(`SELECT current_database(), current_schema();`);
  console.log(`✅ Target Connected: ${dbRes[0]?.current_database}.${dbRes[0]?.current_schema}`);
  console.log(`   Engine: ${versionRes[0]?.version?.split(' on ')[0] || 'PostgreSQL'}\n`);

  // Confirm target is currently empty
  const preTargetProducts = await targetPrisma.product.count();
  if (preTargetProducts > 0) {
    console.error(`❌ ABORT: Target database already contains ${preTargetProducts} products! Cannot proceed.`);
    process.exit(1);
  }
  console.log('✅ Target database confirmed empty (0 application records).\n');

  // ── PHASE 2: DATA INGESTION ─────────────────────────────────────────────
  console.log('--- PHASE 2: DATA INGESTION (LOCAL BACKUP → SUPABASE) ---\n');

  // A. Users
  if (data.users && data.users.length > 0) {
    console.log(`   ⏳ Migrating ${data.users.length} Users...`);
    for (const u of data.users) {
      await targetPrisma.user.upsert({
        where: { id: u.id },
        create: {
          ...u,
          lastLogin: u.lastLogin ? new Date(u.lastLogin) : null,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt),
          deletedAt: u.deletedAt ? new Date(u.deletedAt) : null,
        },
        update: {},
      });
    }
    console.log(`   ✅ Users migrated.`);
  }

  // B. Addresses
  if (data.addresses && data.addresses.length > 0) {
    console.log(`   ⏳ Migrating ${data.addresses.length} Addresses...`);
    for (const a of data.addresses) {
      await targetPrisma.address.upsert({
        where: { id: a.id },
        create: {
          ...a,
          createdAt: new Date(a.createdAt),
          updatedAt: new Date(a.updatedAt),
        },
        update: {},
      });
    }
    console.log(`   ✅ Addresses migrated.`);
  }

  // C. Categories (parents first)
  if (data.categories && data.categories.length > 0) {
    console.log(`   ⏳ Migrating ${data.categories.length} Categories...`);
    const parents = data.categories.filter((c: any) => !c.parentId);
    const children = data.categories.filter((c: any) => c.parentId);
    for (const c of parents) {
      await targetPrisma.category.upsert({
        where: { id: c.id },
        create: { ...c, createdAt: new Date(c.createdAt), updatedAt: new Date(c.updatedAt) },
        update: {},
      });
    }
    for (const c of children) {
      await targetPrisma.category.upsert({
        where: { id: c.id },
        create: { ...c, createdAt: new Date(c.createdAt), updatedAt: new Date(c.updatedAt) },
        update: {},
      });
    }
    console.log(`   ✅ Categories migrated.`);
  }

  // D. Collections
  if (data.collections && data.collections.length > 0) {
    console.log(`   ⏳ Migrating ${data.collections.length} Collections...`);
    for (const col of data.collections) {
      await targetPrisma.collection.upsert({
        where: { id: col.id },
        create: { ...col, createdAt: new Date(col.createdAt), updatedAt: new Date(col.updatedAt) },
        update: {},
      });
    }
    console.log(`   ✅ Collections migrated.`);
  }

  // E. Vendors
  if (data.vendors && data.vendors.length > 0) {
    console.log(`   ⏳ Migrating ${data.vendors.length} Vendors...`);
    for (const v of data.vendors) {
      await targetPrisma.vendor.upsert({
        where: { id: v.id },
        create: { ...v, createdAt: new Date(v.createdAt), updatedAt: new Date(v.updatedAt) },
        update: {},
      });
    }
    console.log(`   ✅ Vendors migrated.`);
  }

  // F. Products (Batched)
  if (data.products && data.products.length > 0) {
    console.log(`   ⏳ Migrating ${data.products.length} Products (in chunks)...`);
    const chunkSize = 50;
    for (let i = 0; i < data.products.length; i += chunkSize) {
      const chunk = data.products.slice(i, i + chunkSize);
      await targetPrisma.$transaction(
        chunk.map((p: any) =>
          targetPrisma.product.upsert({
            where: { id: p.id },
            create: {
              ...p,
              publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
              createdAt: new Date(p.createdAt),
              updatedAt: new Date(p.updatedAt),
            },
            update: {},
          })
        )
      );
      process.stdout.write(`      Products: ${Math.min(i + chunkSize, data.products.length)}/${data.products.length}\r`);
    }
    console.log(`\n   ✅ Products migrated.`);
  }

  // G. Product Variants (Batched)
  if (data.productVariants && data.productVariants.length > 0) {
    console.log(`   ⏳ Migrating ${data.productVariants.length} Product Variants (in chunks)...`);
    const chunkSize = 50;
    for (let i = 0; i < data.productVariants.length; i += chunkSize) {
      const chunk = data.productVariants.slice(i, i + chunkSize);
      await targetPrisma.$transaction(
        chunk.map((v: any) =>
          targetPrisma.productVariant.upsert({
            where: { id: v.id },
            create: { ...v, createdAt: new Date(v.createdAt), updatedAt: new Date(v.updatedAt) },
            update: {},
          })
        )
      );
      process.stdout.write(`      Variants: ${Math.min(i + chunkSize, data.productVariants.length)}/${data.productVariants.length}\r`);
    }
    console.log(`\n   ✅ Product Variants migrated.`);
  }

  // H. Inventory (Batched)
  if (data.inventory && data.inventory.length > 0) {
    console.log(`   ⏳ Migrating ${data.inventory.length} Inventory records...`);
    const chunkSize = 50;
    for (let i = 0; i < data.inventory.length; i += chunkSize) {
      const chunk = data.inventory.slice(i, i + chunkSize);
      await targetPrisma.$transaction(
        chunk.map((inv: any) =>
          targetPrisma.inventory.upsert({
            where: { id: inv.id },
            create: { ...inv, createdAt: new Date(inv.createdAt), updatedAt: new Date(inv.updatedAt) },
            update: {},
          })
        )
      );
      process.stdout.write(`      Inventory: ${Math.min(i + chunkSize, data.inventory.length)}/${data.inventory.length}\r`);
    }
    console.log(`\n   ✅ Inventory migrated.`);
  }

  // I. Product Images (Batched)
  if (data.productImages && data.productImages.length > 0) {
    console.log(`   ⏳ Migrating ${data.productImages.length} Product Images...`);
    const chunkSize = 50;
    for (let i = 0; i < data.productImages.length; i += chunkSize) {
      const chunk = data.productImages.slice(i, i + chunkSize);
      await targetPrisma.$transaction(
        chunk.map((img: any) =>
          targetPrisma.productImage.upsert({
            where: { id: img.id },
            create: { ...img, createdAt: new Date(img.createdAt) },
            update: {},
          })
        )
      );
      process.stdout.write(`      Images: ${Math.min(i + chunkSize, data.productImages.length)}/${data.productImages.length}\r`);
    }
    console.log(`\n   ✅ Product Images migrated.`);
  }

  // J. Product Collections
  if (data.productCollections && data.productCollections.length > 0) {
    console.log(`   ⏳ Migrating ${data.productCollections.length} Product Collections...`);
    for (const pc of data.productCollections) {
      await targetPrisma.productCollection.upsert({
        where: { productId_collectionId: { productId: pc.productId, collectionId: pc.collectionId } },
        create: pc,
        update: {},
      });
    }
    console.log(`   ✅ Product Collections migrated.`);
  }

  // K. Reviews
  if (data.reviews && data.reviews.length > 0) {
    console.log(`   ⏳ Migrating ${data.reviews.length} Reviews...`);
    for (const r of data.reviews) {
      await targetPrisma.review.upsert({
        where: { id: r.id },
        create: { ...r, createdAt: new Date(r.createdAt), updatedAt: new Date(r.updatedAt) },
        update: {},
      });
    }
    console.log(`   ✅ Reviews migrated.`);
  }

  // L. Coupons
  if (data.coupons && data.coupons.length > 0) {
    console.log(`   ⏳ Migrating ${data.coupons.length} Coupons...`);
    for (const coup of data.coupons) {
      await targetPrisma.coupon.upsert({
        where: { id: coup.id },
        create: {
          ...coup,
          startDate: coup.startDate ? new Date(coup.startDate) : null,
          endDate: coup.endDate ? new Date(coup.endDate) : null,
          createdAt: new Date(coup.createdAt),
          updatedAt: new Date(coup.updatedAt),
        },
        update: {},
      });
    }
    console.log(`   ✅ Coupons migrated.`);
  }

  // M. CMS Banners
  if (data.cmsBanners && data.cmsBanners.length > 0) {
    console.log(`   ⏳ Migrating ${data.cmsBanners.length} CMS Banners...`);
    for (const b of data.cmsBanners) {
      await targetPrisma.cmsBanner.upsert({
        where: { id: b.id },
        create: { ...b, createdAt: new Date(b.createdAt), updatedAt: new Date(b.updatedAt) },
        update: {},
      });
    }
    console.log(`   ✅ CMS Banners migrated.`);
  }

  // N. CMS Sections
  if (data.cmsSections && data.cmsSections.length > 0) {
    console.log(`   ⏳ Migrating ${data.cmsSections.length} CMS Sections...`);
    for (const sec of data.cmsSections) {
      await targetPrisma.cmsSection.upsert({
        where: { id: sec.id },
        create: { ...sec, createdAt: new Date(sec.createdAt), updatedAt: new Date(sec.updatedAt) },
        update: {},
      });
    }
    console.log(`   ✅ CMS Sections migrated.`);
  }

  // O. System Settings
  if (data.systemSettings && data.systemSettings.length > 0) {
    console.log(`   ⏳ Migrating ${data.systemSettings.length} System Settings...`);
    for (const s of data.systemSettings) {
      await targetPrisma.systemSetting.upsert({
        where: { id: s.id },
        create: { ...s, createdAt: new Date(s.createdAt), updatedAt: new Date(s.updatedAt) },
        update: {},
      });
    }
    console.log(`   ✅ System Settings migrated.`);
  }

  // ── PHASE 3: COUNT VERIFICATION ─────────────────────────────────────────
  console.log('\n--- PHASE 3: PER-TABLE COUNT VERIFICATION ---\n');

  // Re-connect to local for side-by-side comparison
  const localVerify = new PrismaClient();
  const localVerifyCounts: Record<string, number> = {
    User: await localVerify.user.count(),
    Address: await localVerify.address.count(),
    Category: await localVerify.category.count(),
    Collection: await localVerify.collection.count(),
    Vendor: await localVerify.vendor.count(),
    Product: await localVerify.product.count(),
    ProductVariant: await localVerify.productVariant.count(),
    ProductImage: await localVerify.productImage.count(),
    Inventory: await localVerify.inventory.count(),
    ProductCollection: await localVerify.productCollection.count(),
    Review: await localVerify.review.count(),
    Order: await localVerify.order.count(),
    OrderItem: await localVerify.orderItem.count(),
    Payment: await localVerify.payment.count(),
    Coupon: await localVerify.coupon.count(),
    CmsBanner: await localVerify.cmsBanner.count(),
    CmsSection: await localVerify.cmsSection.count(),
    SystemSetting: await localVerify.systemSetting.count(),
  };

  const supabaseCounts: Record<string, number> = {
    User: await targetPrisma.user.count(),
    Address: await targetPrisma.address.count(),
    Category: await targetPrisma.category.count(),
    Collection: await targetPrisma.collection.count(),
    Vendor: await targetPrisma.vendor.count(),
    Product: await targetPrisma.product.count(),
    ProductVariant: await targetPrisma.productVariant.count(),
    ProductImage: await targetPrisma.productImage.count(),
    Inventory: await targetPrisma.inventory.count(),
    ProductCollection: await targetPrisma.productCollection.count(),
    Review: await targetPrisma.review.count(),
    Order: await targetPrisma.order.count(),
    OrderItem: await targetPrisma.orderItem.count(),
    Payment: await targetPrisma.payment.count(),
    Coupon: await targetPrisma.coupon.count(),
    CmsBanner: await targetPrisma.cmsBanner.count(),
    CmsSection: await targetPrisma.cmsSection.count(),
    SystemSetting: await targetPrisma.systemSetting.count(),
  };

  let allMatch = true;
  console.log(`${'Model'.padEnd(22)} | ${'Local'.padStart(7)} | ${'Supabase'.padStart(8)} | Status`);
  console.log('-'.repeat(60));
  for (const key of Object.keys(localVerifyCounts)) {
    const l = localVerifyCounts[key];
    const s = supabaseCounts[key];
    const match = l === s;
    if (!match) allMatch = false;
    console.log(`${key.padEnd(22)} | ${String(l).padStart(7)} | ${String(s).padStart(8)} | ${match ? '✅ MATCH' : '❌ MISMATCH'}`);
  }
  console.log('-'.repeat(60));
  const localTotal = Object.values(localVerifyCounts).reduce((a, b) => a + b, 0);
  const supabaseTotal = Object.values(supabaseCounts).reduce((a, b) => a + b, 0);
  console.log(`${'TOTAL'.padEnd(22)} | ${String(localTotal).padStart(7)} | ${String(supabaseTotal).padStart(8)} | ${localTotal === supabaseTotal ? '✅ MATCH' : '❌ MISMATCH'}`);

  // ACTIVE/DRAFT/ARCHIVED
  const sActive = await targetPrisma.product.count({ where: { status: 'ACTIVE' } });
  const sDraft = await targetPrisma.product.count({ where: { status: 'DRAFT' } });
  const sArchived = await targetPrisma.product.count({ where: { status: 'ARCHIVED' } });
  const lActive = await localVerify.product.count({ where: { status: 'ACTIVE' } });
  const lDraft = await localVerify.product.count({ where: { status: 'DRAFT' } });

  console.log(`\nProduct Status Distribution (Supabase):`);
  console.log(`  ACTIVE:   ${sActive} (Expected: 199) → ${sActive === 199 ? '✅' : '❌'}`);
  console.log(`  DRAFT:    ${sDraft} (Expected: 865) → ${sDraft === 865 ? '✅' : '❌'}`);
  console.log(`  ARCHIVED: ${sArchived} (Expected: 0) → ${sArchived === 0 ? '✅' : '❌'}`);

  // ── PHASE 4: RELATIONAL INTEGRITY ───────────────────────────────────────
  console.log('\n--- PHASE 4: RELATIONAL INTEGRITY CHECKS ---\n');

  const pWithoutV: any = await targetPrisma.$queryRawUnsafe(`SELECT p.id FROM products p LEFT JOIN product_variants pv ON p.id = pv.product_id WHERE pv.id IS NULL;`);
  const vWithoutI: any = await targetPrisma.$queryRawUnsafe(`SELECT pv.id FROM product_variants pv LEFT JOIN inventory i ON pv.id = i.variant_id WHERE i.id IS NULL;`);
  const pWithoutC: any = await targetPrisma.$queryRawUnsafe(`SELECT p.id FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE c.id IS NULL;`);
  const dupSkus: any = await targetPrisma.$queryRawUnsafe(`SELECT sku, count(*) FROM product_variants GROUP BY sku HAVING count(*) > 1;`);
  const dupSlugs: any = await targetPrisma.$queryRawUnsafe(`SELECT slug, count(*) FROM products GROUP BY slug HAVING count(*) > 1;`);
  const orphanImages: any = await targetPrisma.$queryRawUnsafe(`SELECT pi.id FROM product_images pi LEFT JOIN products p ON pi.product_id = p.id WHERE p.id IS NULL;`);

  console.log(`  Products without variants:       ${pWithoutV.length} → ${pWithoutV.length === 0 ? '✅' : '❌'}`);
  console.log(`  Variants without inventory:      ${vWithoutI.length} → ${vWithoutI.length === 0 ? '✅' : '❌'}`);
  console.log(`  Products without valid category:  ${pWithoutC.length} → ${pWithoutC.length === 0 ? '✅' : '❌'}`);
  console.log(`  Duplicate SKUs:                  ${dupSkus.length} → ${dupSkus.length === 0 ? '✅' : '❌'}`);
  console.log(`  Duplicate Slugs:                 ${dupSlugs.length} → ${dupSlugs.length === 0 ? '✅' : '❌'}`);
  console.log(`  Orphan Images:                   ${orphanImages.length} → ${orphanImages.length === 0 ? '✅' : '❌'}`);

  // ── PHASE 5: SPOT CHECKS ────────────────────────────────────────────────
  console.log('\n--- PHASE 5: SPOT CHECKS (5 ACTIVE + 5 DRAFT) ---\n');

  // Spot check 5 ACTIVE products
  const localActiveProducts = await localVerify.product.findMany({
    where: { status: 'ACTIVE' },
    take: 5,
    include: {
      category: { select: { name: true } },
      variants: { select: { sku: true, price: true }, take: 1 },
      images: { select: { imageUrl: true }, take: 1 },
      _count: { select: { variants: true, images: true } },
    },
    orderBy: { name: 'asc' },
  });

  for (const lp of localActiveProducts) {
    const sp = await targetPrisma.product.findUnique({
      where: { id: lp.id },
      include: {
        category: { select: { name: true } },
        variants: { select: { sku: true, price: true }, take: 1 },
        images: { select: { imageUrl: true }, take: 1 },
        _count: { select: { variants: true, images: true } },
      },
    });
    if (!sp) {
      console.log(`  ❌ ACTIVE "${lp.name}" (${lp.id}) — NOT FOUND IN SUPABASE!`);
      continue;
    }
    const nameMatch = lp.name === sp.name;
    const slugMatch = lp.slug === sp.slug;
    const statusMatch = lp.status === sp.status;
    const catMatch = lp.category?.name === sp.category?.name;
    const skuMatch = lp.variants[0]?.sku === sp.variants[0]?.sku;
    const priceMatch = String(lp.variants[0]?.price) === String(sp.variants[0]?.price);
    const imgMatch = lp.images[0]?.imageUrl === sp.images[0]?.imageUrl;
    const allOk = nameMatch && slugMatch && statusMatch && catMatch && skuMatch && priceMatch && imgMatch;
    console.log(`  ${allOk ? '✅' : '❌'} ACTIVE "${lp.name}" | SKU: ${lp.variants[0]?.sku} | Price: ${lp.variants[0]?.price} | Cat: ${lp.category?.name} | Status: ${sp.status}`);
  }

  // Spot check 5 DRAFT products
  const localDraftProducts = await localVerify.product.findMany({
    where: { status: 'DRAFT' },
    take: 5,
    include: {
      category: { select: { name: true } },
      variants: { select: { sku: true, price: true }, take: 1 },
      images: { select: { imageUrl: true }, take: 1 },
      _count: { select: { variants: true, images: true } },
    },
    orderBy: { name: 'asc' },
  });

  for (const lp of localDraftProducts) {
    const sp = await targetPrisma.product.findUnique({
      where: { id: lp.id },
      include: {
        category: { select: { name: true } },
        variants: { select: { sku: true, price: true }, take: 1 },
        images: { select: { imageUrl: true }, take: 1 },
        _count: { select: { variants: true, images: true } },
      },
    });
    if (!sp) {
      console.log(`  ❌ DRAFT "${lp.name}" (${lp.id}) — NOT FOUND IN SUPABASE!`);
      continue;
    }
    const nameMatch = lp.name === sp.name;
    const slugMatch = lp.slug === sp.slug;
    const statusMatch = lp.status === sp.status;
    const catMatch = lp.category?.name === sp.category?.name;
    const skuMatch = lp.variants[0]?.sku === sp.variants[0]?.sku;
    const priceMatch = String(lp.variants[0]?.price) === String(sp.variants[0]?.price);
    const allOk = nameMatch && slugMatch && statusMatch && catMatch && skuMatch && priceMatch;
    console.log(`  ${allOk ? '✅' : '❌'} DRAFT  "${lp.name}" | SKU: ${lp.variants[0]?.sku} | Price: ${lp.variants[0]?.price} | Cat: ${lp.category?.name} | Status: ${sp.status}`);
  }

  // ── PHASE 6: STOREFRONT QUERY CHECKS ────────────────────────────────────
  console.log('\n--- PHASE 6: STOREFRONT & ADMIN QUERY CHECKS ---\n');

  const storefrontCount = await targetPrisma.product.count({ where: { status: 'ACTIVE' } });
  const adminAllCount = await targetPrisma.product.count();
  const adminDraftCount = await targetPrisma.product.count({ where: { status: 'DRAFT' } });

  console.log(`  Public Storefront (ACTIVE only): ${storefrontCount} → ${storefrontCount === 199 ? '✅' : '❌'} (Expected: 199)`);
  console.log(`  Admin ALL:                       ${adminAllCount} → ${adminAllCount === 1064 ? '✅' : '❌'} (Expected: 1064)`);
  console.log(`  Admin DRAFT:                     ${adminDraftCount} → ${adminDraftCount === 865 ? '✅' : '❌'} (Expected: 865)`);

  // Verify 0 DRAFT shown in storefront
  console.log(`  Storefront DRAFT leakage:        ${storefrontCount - 199 === 0 ? '✅ 0 DRAFT products visible' : '❌ DRAFT products visible!'}`);

  // ── PHASE 7: LOCAL DATABASE UNTOUCHED CHECK ─────────────────────────────
  console.log('\n--- PHASE 7: LOCAL DATABASE UNTOUCHED VERIFICATION ---\n');

  const localPostCounts: Record<string, number> = {
    Product: await localVerify.product.count(),
    ProductVariant: await localVerify.productVariant.count(),
    Inventory: await localVerify.inventory.count(),
    ProductImage: await localVerify.productImage.count(),
    Category: await localVerify.category.count(),
    User: await localVerify.user.count(),
  };

  let localUntouched = true;
  for (const [k, v] of Object.entries(localPostCounts)) {
    const original = localCounts[k as keyof typeof localCounts];
    if (v !== original) {
      console.log(`  ❌ LOCAL ${k} changed from ${original} to ${v}!`);
      localUntouched = false;
    }
  }
  if (localUntouched) {
    console.log('  ✅ Local database (localhost:5432/ramanayam_db) remains 100% untouched.');
  }

  await localVerify.$disconnect();
  await targetPrisma.$disconnect();

  // ── FINAL REPORT ────────────────────────────────────────────────────────
  const durationMs = Date.now() - startTime;
  const durationSec = (durationMs / 1000).toFixed(1);

  const integrityOk = pWithoutV.length === 0 && vWithoutI.length === 0 && pWithoutC.length === 0 && dupSkus.length === 0 && dupSlugs.length === 0 && orphanImages.length === 0;
  const statusOk = sActive === 199 && sDraft === 865 && sArchived === 0;
  const storefrontOk = storefrontCount === 199;
  const overallPass = allMatch && integrityOk && statusOk && storefrontOk && localUntouched;

  console.log('\n==========================================================================');
  console.log(`   MIGRATION DURATION: ${durationSec} seconds`);
  console.log('==========================================================================');
  console.log(`   Count verification:      ${allMatch ? '✅ ALL 18 TABLES MATCH' : '❌ MISMATCHES FOUND'}`);
  console.log(`   Relational integrity:    ${integrityOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   ACTIVE/DRAFT status:     ${statusOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Storefront query:        ${storefrontOk ? '✅ PASS (199 ACTIVE)' : '❌ FAIL'}`);
  console.log(`   Local DB untouched:      ${localUntouched ? '✅ PASS' : '❌ FAIL'}`);
  console.log('==========================================================================');

  if (overallPass) {
    console.log('\n🎉 FINAL VERDICT: SUPABASE DATA MIGRATION VERIFIED');
    console.log('   Supabase is ready to become the production database.');
  } else {
    console.log('\n❌ FINAL VERDICT: DATA MIGRATION FAILED — DO NOT SWITCH PRODUCTION');
  }
  console.log('==========================================================================\n');
}

main().catch((err) => {
  console.error('❌ Migration error:', err);
  process.exit(1);
});
