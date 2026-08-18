import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function exportFullBackup() {
  console.log("==========================================================================");
  console.log("          STARTING RAMANAYAM FULL DATABASE BACKUP EXPORT                  ");
  console.log("==========================================================================\n");

  const backupDir = path.join(__dirname, '..', 'prisma', 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFilePath = path.join(backupDir, `database_backup_${timestamp}.json`);

  console.log(`📦 Fetching all table records from PostgreSQL database...`);

  const backupData = {
    metadata: {
      createdAt: new Date().toISOString(),
      databaseProvider: 'postgresql',
      schemaVersion: '1.0',
    },
    tables: {
      users: await prisma.user.findMany(),
      addresses: await prisma.address.findMany(),
      categories: await prisma.category.findMany(),
      collections: await prisma.collection.findMany(),
      vendors: await prisma.vendor.findMany(),
      products: await prisma.product.findMany(),
      productVariants: await prisma.productVariant.findMany(),
      productImages: await prisma.productImage.findMany(),
      inventory: await prisma.inventory.findMany(),
      productCollections: await prisma.productCollection.findMany(),
      reviews: await prisma.review.findMany(),
      orders: await prisma.order.findMany(),
      orderItems: await prisma.orderItem.findMany(),
      payments: await prisma.payment.findMany(),
      coupons: await prisma.coupon.findMany(),
      cmsBanners: await prisma.cmsBanner.findMany(),
      cmsSections: await prisma.cmsSection.findMany(),
      systemSettings: await prisma.systemSetting.findMany(),
    }
  };

  const recordCounts: Record<string, number> = {};
  for (const [table, rows] of Object.entries(backupData.tables)) {
    recordCounts[table] = rows.length;
  }

  fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), 'utf-8');
  const stats = fs.statSync(backupFilePath);

  console.log("\n=================== BACKUP SUMMARY ===================");
  console.log(`File Path: ${backupFilePath}`);
  console.log(`File Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`Record Counts Exported:`);
  for (const [table, count] of Object.entries(recordCounts)) {
    console.log(`  - ${table}: ${count}`);
  }
  console.log("\n✅ BACKUP EXPORT VERIFIED AND COMPLETE!");
  return backupFilePath;
}

exportFullBackup()
  .catch(e => {
    console.error("❌ Backup failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
