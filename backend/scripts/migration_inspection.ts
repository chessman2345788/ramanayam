import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inspect() {
  console.log('--- STARTING DEEP DATABASE INSPECTION ---');

  // 1. Version
  const versionRes: any = await prisma.$queryRawUnsafe(`SELECT version();`);
  console.log('POSTGRESQL_VERSION:', versionRes[0]?.version || 'Unknown');

  // 2. Current DB Name and Schema
  const dbNameRes: any = await prisma.$queryRawUnsafe(`SELECT current_database(), current_schema();`);
  console.log('CURRENT_DATABASE:', dbNameRes[0]?.current_database);
  console.log('CURRENT_SCHEMA:', dbNameRes[0]?.current_schema);

  // 3. Extensions
  const extRes: any = await prisma.$queryRawUnsafe(`SELECT extname, extversion FROM pg_extension;`);
  console.log('EXTENSIONS:', JSON.stringify(extRes));

  // 4. Total DB Size
  const sizeRes: any = await prisma.$queryRawUnsafe(`
    SELECT pg_size_pretty(pg_database_size(current_database())) as total_size,
           pg_database_size(current_database()) as total_bytes;
  `);
  console.log('TOTAL_DB_SIZE:', sizeRes[0]?.total_size, `(${sizeRes[0]?.total_bytes} bytes)`);

  // 5. Table Sizes
  const tableSizesRes: any = await prisma.$queryRawUnsafe(`
    SELECT relname AS table_name,
           pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
           pg_size_pretty(pg_relation_size(relid)) AS data_size,
           pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS external_size
    FROM pg_catalog.pg_statio_user_tables
    ORDER BY pg_total_relation_size(relid) DESC;
  `);
  console.log('TABLE_SIZES:', JSON.stringify(tableSizesRes, null, 2));

  // 6. Number of tables, indexes, foreign keys
  const tableCountRes: any = await prisma.$queryRawUnsafe(`
    SELECT count(*) as count FROM information_schema.tables WHERE table_schema = 'public';
  `);
  const indexCountRes: any = await prisma.$queryRawUnsafe(`
    SELECT count(*) as count FROM pg_indexes WHERE schemaname = 'public';
  `);
  const fkCountRes: any = await prisma.$queryRawUnsafe(`
    SELECT count(*) as count FROM information_schema.table_constraints 
    WHERE constraint_schema = 'public' AND constraint_type = 'FOREIGN KEY';
  `);
  console.log('TABLE_COUNT:', tableCountRes[0]?.count);
  console.log('INDEX_COUNT:', indexCountRes[0]?.count);
  console.log('FOREIGN_KEY_COUNT:', fkCountRes[0]?.count);

  // 7. Migration history from _prisma_migrations
  try {
    const migrationsRes: any = await prisma.$queryRawUnsafe(`
      SELECT id, migration_name, finished_at, applied_steps_count 
      FROM _prisma_migrations 
      ORDER BY finished_at ASC;
    `);
    console.log('PRISMA_MIGRATIONS:', JSON.stringify(migrationsRes, null, 2));
  } catch (e) {
    console.log('PRISMA_MIGRATIONS_ERROR:', e);
  }

  // 8. Model Counts
  const counts = {
    Product: await prisma.product.count(),
    ProductVariant: await prisma.productVariant.count(),
    Inventory: await prisma.inventory.count(),
    ProductImage: await prisma.productImage.count(),
    Category: await prisma.category.count(),
    Collection: await prisma.collection.count(),
    Vendor: await prisma.vendor.count(),
    User: await prisma.user.count(),
    Address: await prisma.address.count(),
    Order: await prisma.order.count(),
    OrderItem: await prisma.orderItem.count(),
    Payment: await prisma.payment.count(),
    Review: await prisma.review.count(),
    Coupon: await prisma.coupon.count(),
    CmsBanner: await prisma.cmsBanner.count(),
    CmsSection: await prisma.cmsSection.count(),
    SystemSetting: await prisma.systemSetting.count(),
  };
  console.log('MODEL_COUNTS:', JSON.stringify(counts, null, 2));

  // 9. Integrity checks
  // A. Every product has at least 1 variant
  const prodsWithoutVariants: any = await prisma.$queryRawUnsafe(`
    SELECT p.id, p.name FROM products p LEFT JOIN product_variants pv ON p.id = pv.product_id WHERE pv.id IS NULL;
  `);
  console.log('PRODUCTS_WITHOUT_VARIANTS:', prodsWithoutVariants.length);

  // B. Every variant has inventory
  const variantsWithoutInventory: any = await prisma.$queryRawUnsafe(`
    SELECT pv.id, pv.sku FROM product_variants pv LEFT JOIN inventory i ON pv.id = i.variant_id WHERE i.id IS NULL;
  `);
  console.log('VARIANTS_WITHOUT_INVENTORY:', variantsWithoutInventory.length);

  // C. Every product has valid category
  const prodsWithoutCategory: any = await prisma.$queryRawUnsafe(`
    SELECT p.id, p.name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE c.id IS NULL;
  `);
  console.log('PRODUCTS_WITHOUT_CATEGORY:', prodsWithoutCategory.length);

  // D. Duplicate SKUs
  const dupSkus: any = await prisma.$queryRawUnsafe(`
    SELECT sku, count(*) FROM product_variants GROUP BY sku HAVING count(*) > 1;
  `);
  console.log('DUPLICATE_SKUS:', dupSkus.length);

  // E. Duplicate Slugs (products)
  const dupSlugs: any = await prisma.$queryRawUnsafe(`
    SELECT slug, count(*) FROM products GROUP BY slug HAVING count(*) > 1;
  `);
  console.log('DUPLICATE_PRODUCT_SLUGS:', dupSlugs.length);

  // F. Orphan images
  const orphanImages: any = await prisma.$queryRawUnsafe(`
    SELECT pi.id FROM product_images pi LEFT JOIN products p ON pi.product_id = p.id WHERE p.id IS NULL;
  `);
  console.log('ORPHAN_IMAGES:', orphanImages.length);

  console.log('--- INSPECTION COMPLETE ---');
}

inspect()
  .catch((err) => {
    console.error('Inspection error:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
