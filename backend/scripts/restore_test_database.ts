import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

async function performRestoreTest() {
  console.log("==========================================================================");
  console.log("          RAMANAYAM AUTOMATED DATABASE RESTORE TEST & VERIFICATION         ");
  console.log("==========================================================================\n");

  const prodUrl = process.env.DATABASE_URL;
  if (!prodUrl) {
    throw new Error("DATABASE_URL environment variable is not defined.");
  }

  // Find the latest backup file in backend/prisma/backups/
  const backupsDir = path.join(__dirname, '..', 'prisma', 'backups');
  if (!fs.existsSync(backupsDir)) {
    throw new Error(`Backups directory ${backupsDir} does not exist.`);
  }

  const backupFiles = fs.readdirSync(backupsDir)
    .filter(f => f.startsWith('database_backup_') && f.endsWith('.json'))
    .sort()
    .reverse();

  if (backupFiles.length === 0) {
    throw new Error("No backup files found in backups directory.");
  }

  const latestBackupPath = path.join(backupsDir, backupFiles[0]);
  console.log(`📂 Selected Backup File: ${latestBackupPath}`);
  const backupData = JSON.parse(fs.readFileSync(latestBackupPath, 'utf-8'));

  // Define isolated connection string for temporary restore database
  const restoreUrl = prodUrl.replace(/\/ramanayam_db(\?.*)?$/, '/ramanayam_db_restore_test$1');

  console.log(`🔄 Target Isolated Restore DB URL Host: ${restoreUrl.split('@')[1] ? restoreUrl.split('@')[1].split('/')[0] : 'localhost'}`);

  // Step 1: Create Database ramanayam_db_restore_test if needed
  const adminPrisma = new PrismaClient({
    datasources: { db: { url: prodUrl } }
  });

  try {
    console.log(`🔨 Creating/Resetting temporary restore database: ramanayam_db_restore_test...`);
    await adminPrisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS ramanayam_db_restore_test;`);
    await adminPrisma.$executeRawUnsafe(`CREATE DATABASE ramanayam_db_restore_test;`);
    console.log(`✅ Temporary restore database ramanayam_db_restore_test created.`);
  } catch (err: any) {
    console.log(`Note on DB creation: ${err.message}`);
  } finally {
    await adminPrisma.$disconnect();
  }

  // Step 2: Push schema structure to restore DB using Prisma Schema Push / DDL
  const { execSync } = require('child_process');
  console.log(`🏗️ Pushing Prisma schema DDL to ramanayam_db_restore_test...`);
  execSync(`npx prisma db push --accept-data-loss --skip-generate`, {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: restoreUrl },
    stdio: 'inherit'
  });
  console.log(`✅ Schema structure pushed successfully.`);

  // Step 3: Populate ramanayam_db_restore_test with backup JSON data
  const restorePrisma = new PrismaClient({
    datasources: { db: { url: restoreUrl } }
  });

  console.log(`📥 Restoring data records into ramanayam_db_restore_test...`);

  const tables = backupData.tables;

  // Insert in order of foreign key dependency
  for (const u of tables.users) await restorePrisma.user.create({ data: u });
  for (const a of tables.addresses) await restorePrisma.address.create({ data: a });
  for (const c of tables.categories) await restorePrisma.category.create({ data: c });
  for (const col of tables.collections) await restorePrisma.collection.create({ data: col });
  for (const v of tables.vendors) await restorePrisma.vendor.create({ data: v });
  for (const p of tables.products) await restorePrisma.product.create({ data: p });
  for (const pv of tables.productVariants) await restorePrisma.productVariant.create({ data: pv });
  for (const inv of tables.inventory) await restorePrisma.inventory.create({ data: inv });
  for (const img of tables.productImages) await restorePrisma.productImage.create({ data: img });
  for (const pc of tables.productCollections) await restorePrisma.productCollection.create({ data: pc });
  for (const r of tables.reviews) await restorePrisma.review.create({ data: r });
  for (const o of tables.orders) await restorePrisma.order.create({ data: o });
  for (const oi of tables.orderItems) await restorePrisma.orderItem.create({ data: oi });
  for (const pay of tables.payments) await restorePrisma.payment.create({ data: pay });
  for (const cp of tables.coupons) await restorePrisma.coupon.create({ data: cp });
  for (const b of tables.cmsBanners) await restorePrisma.cmsBanner.create({ data: b });
  for (const s of tables.cmsSections) await restorePrisma.cmsSection.create({ data: s });
  for (const set of tables.systemSettings) await restorePrisma.systemSetting.create({ data: set });

  console.log(`✅ Data restoration into ramanayam_db_restore_test complete!`);

  // Step 4: Compare counts between Production DB and Restored DB
  const prodPrisma = new PrismaClient({
    datasources: { db: { url: prodUrl } }
  });

  const comparison = {
    products: { prod: await prodPrisma.product.count(), restored: await restorePrisma.product.count() },
    productVariants: { prod: await prodPrisma.productVariant.count(), restored: await restorePrisma.productVariant.count() },
    inventory: { prod: await prodPrisma.inventory.count(), restored: await restorePrisma.inventory.count() },
    productImages: { prod: await prodPrisma.productImage.count(), restored: await restorePrisma.productImage.count() },
    categories: { prod: await prodPrisma.category.count(), restored: await restorePrisma.category.count() },
    collections: { prod: await prodPrisma.collection.count(), restored: await restorePrisma.collection.count() },
    vendors: { prod: await prodPrisma.vendor.count(), restored: await restorePrisma.vendor.count() },
    users: { prod: await prodPrisma.user.count(), restored: await restorePrisma.user.count() },
    addresses: { prod: await prodPrisma.address.count(), restored: await restorePrisma.address.count() },
    orders: { prod: await prodPrisma.order.count(), restored: await restorePrisma.order.count() },
    orderItems: { prod: await prodPrisma.orderItem.count(), restored: await restorePrisma.orderItem.count() },
    payments: { prod: await prodPrisma.payment.count(), restored: await restorePrisma.payment.count() },
    reviews: { prod: await prodPrisma.review.count(), restored: await restorePrisma.review.count() },
    coupons: { prod: await prodPrisma.coupon.count(), restored: await restorePrisma.coupon.count() },
    cmsBanners: { prod: await prodPrisma.cmsBanner.count(), restored: await restorePrisma.cmsBanner.count() },
    cmsSections: { prod: await prodPrisma.cmsSection.count(), restored: await restorePrisma.cmsSection.count() },
    systemSettings: { prod: await prodPrisma.systemSetting.count(), restored: await restorePrisma.systemSetting.count() },
  };

  console.log("\n=================== PRODUCTION VS RESTORED RECORD COUNT COMPARISON ===================");
  console.log("Model / Entity          | Production Count | Restored Count | Difference | Match?");
  console.log("------------------------|------------------|----------------|------------|-------");

  let allMatched = true;
  for (const [model, counts] of Object.entries(comparison)) {
    const diff = counts.restored - counts.prod;
    const match = diff === 0;
    if (!match) allMatched = false;
    console.log(`${model.padEnd(23)} | ${String(counts.prod).padStart(16)} | ${String(counts.restored).padStart(14)} | ${String(diff).padStart(10)} | ${match ? '✅ MATCH' : '❌ MISMATCH'}`);
  }

  // Step 5: Application Restore Verification Queries on Restored Database
  console.log("\n=================== ISOLATED APPLICATION RESTORE QUERY TESTS ===================");
  const sampleProducts = await restorePrisma.product.findMany({ take: 5, include: { category: true, images: true, variants: true } });
  console.log(`✅ Sample Product Query: Retrieved ${sampleProducts.length} products from restored database.`);
  for (const p of sampleProducts) {
    console.log(`   - Product: "${p.name}" | Category: ${p.category.name} | Images: ${p.images.length} | Price: ₹${p.variants[0]?.price}`);
  }

  const sampleCategories = await restorePrisma.category.findMany({ include: { _count: { select: { products: true } } } });
  console.log(`✅ Category Query: Retrieved ${sampleCategories.length} categories from restored database.`);

  const sampleAdmin = await restorePrisma.user.findFirst({ where: { role: 'ADMIN' } });
  console.log(`✅ Admin Account Query: Retrieved Admin "${sampleAdmin?.firstName} ${sampleAdmin?.lastName}" (${sampleAdmin?.email}) from restored database.`);

  await prodPrisma.$disconnect();
  await restorePrisma.$disconnect();

  if (allMatched) {
    console.log("\n🎉 ALL RECORD COUNTS MATCH 100%! RESTORE TEST COMPLETED SUCCESSFULLY.");
  } else {
    console.error("\n❌ RECORD COUNT MISMATCH DETECTED IN RESTORE TEST.");
    process.exit(1);
  }
}

performRestoreTest().catch(e => {
  console.error("❌ Restore test failed:", e);
  process.exit(1);
});
