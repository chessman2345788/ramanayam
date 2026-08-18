import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runComprehensiveAudit() {
  console.log("==========================================================================");
  console.log("          RAMANAYAM PRODUCTION DATABASE & DATA QUALITY AUDIT              ");
  console.log("==========================================================================\n");

  // PHASE 1: DATABASE INVENTORY
  console.log("=================== PHASE 1 — DATABASE INVENTORY ===================");
  const products = await prisma.product.findMany({
    include: {
      category: true,
      vendor: true,
      variants: {
        include: { inventory: true }
      },
      images: true,
      reviews: true,
      collections: { include: { collection: true } }
    }
  });

  const categories = await prisma.category.findMany({
    include: {
      parent: true,
      children: true,
      products: true
    }
  });

  const collections = await prisma.collection.findMany({
    include: { products: true }
  });

  const vendors = await prisma.vendor.findMany({
    include: { products: true }
  });

  const users = await prisma.user.findMany({
    include: {
      addresses: true,
      orders: { include: { payments: true, orderItems: true } },
      reviews: true
    }
  });

  const variants = await prisma.productVariant.findMany({
    include: { product: true, inventory: true, orderItems: true }
  });

  const images = await prisma.productImage.findMany({
    include: { product: true }
  });

  const inventoryRecords = await prisma.inventory.findMany({
    include: { variant: { include: { product: true } } }
  });

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: { include: { productVariant: { include: { product: true } } } },
      payments: true
    }
  });

  const orderItems = await prisma.orderItem.findMany({
    include: { order: true, productVariant: true }
  });

  const payments = await prisma.payment.findMany({
    include: { order: true }
  });

  const reviews = await prisma.review.findMany({
    include: { product: true, user: true }
  });

  const coupons = await prisma.coupon.findMany();
  const cmsBanners = await prisma.cmsBanner.findMany();
  const cmsSections = await prisma.cmsSection.findMany();
  const systemSettings = await prisma.systemSetting.findMany();
  const addresses = await prisma.address.findMany();
  const productCollections = await prisma.productCollection.findMany();

  const customers = users.filter(u => u.role === 'CUSTOMER');
  const admins = users.filter(u => u.role === 'ADMIN');
  const vendorUsers = users.filter(u => u.role === 'VENDOR');
  const subcategories = categories.filter(c => c.parentId !== null);

  console.log(`Products Total: ${products.length}`);
  console.log(`Categories Total: ${categories.length} (Root Categories: ${categories.length - subcategories.length}, Subcategories: ${subcategories.length})`);
  console.log(`Collections Total: ${collections.length}`);
  console.log(`Vendors (Model): ${vendors.length}`);
  console.log(`Product Variants Total: ${variants.length}`);
  console.log(`Product Images Total: ${images.length}`);
  console.log(`Inventory Records Total: ${inventoryRecords.length}`);
  console.log(`Product-Collection Mappings: ${productCollections.length}`);
  console.log(`Users Total: ${users.length}`);
  console.log(`  - Customers: ${customers.length}`);
  console.log(`  - Admins: ${admins.length}`);
  console.log(`  - Vendors (User Role): ${vendorUsers.length}`);
  console.log(`Addresses Total: ${addresses.length}`);
  console.log(`Orders Total: ${orders.length}`);
  console.log(`Order Items Total: ${orderItems.length}`);
  console.log(`Payments Total: ${payments.length}`);
  console.log(`Reviews Total: ${reviews.length}`);
  console.log(`Coupons Total: ${coupons.length}`);
  console.log(`CMS Banners Total: ${cmsBanners.length}`);
  console.log(`CMS Sections Total: ${cmsSections.length}`);
  console.log(`System Settings Total: ${systemSettings.length}`);
  console.log(`Wishlists: 0 (Not modeled in schema/DB - handled client-side/localStorage)`);
  console.log(`Carts: 0 (Not modeled in schema/DB - handled client-side/Zustand)`);

  // PHASE 2: PRODUCT QUALITY
  console.log("\n=================== PHASE 2 — PRODUCT QUALITY ===================");
  let missingName = 0;
  let missingSlug = 0;
  let duplicateSlugs = new Set<string>();
  let slugCounts: Record<string, number> = {};
  let missingCategory = 0;
  let invalidCategoryRelation = 0;
  let missingPrice = 0;
  let invalidPrice = 0;
  let mrpLowerThanPrice = 0;
  let missingImages = 0;
  let brokenImageRefs = 0;
  let missingDescription = 0;
  let missingStatus = 0;
  let invalidStatus = 0;
  let missingSeoTitle = 0;
  let missingSeoDescription = 0;

  let skuCounts: Record<string, number> = {};
  let missingSku = 0;
  let duplicateSkus = new Set<string>();

  for (const p of products) {
    if (!p.name || p.name.trim() === '') missingName++;
    if (!p.slug || p.slug.trim() === '') missingSlug++;
    else {
      slugCounts[p.slug] = (slugCounts[p.slug] || 0) + 1;
      if (slugCounts[p.slug] > 1) duplicateSlugs.add(p.slug);
    }
    if (!p.categoryId) missingCategory++;
    else if (!p.category) invalidCategoryRelation++;

    if (!p.description && !p.shortDescription) missingDescription++;
    if (!p.status) missingStatus++;

    if (!p.seoTitle || p.seoTitle.trim() === '') missingSeoTitle++;
    if (!p.seoDescription || p.seoDescription.trim() === '') missingSeoDescription++;

    if (p.images.length === 0) missingImages++;
    else {
      for (const img of p.images) {
        if (!img.imageUrl || (!img.imageUrl.startsWith('http://') && !img.imageUrl.startsWith('https://'))) {
          brokenImageRefs++;
          console.log(`  [BROKEN IMAGE] Product ID: ${p.id}, Product Name: "${p.name}", Image ID: ${img.id}, URL: "${img.imageUrl}"`);
        }
      }
    }

    if (p.variants.length === 0) {
      missingPrice++;
    } else {
      for (const v of p.variants) {
        if (!v.sku || v.sku.trim() === '') missingSku++;
        else {
          skuCounts[v.sku] = (skuCounts[v.sku] || 0) + 1;
          if (skuCounts[v.sku] > 1) duplicateSkus.add(v.sku);
        }
        const priceNum = Number(v.price);
        if (v.price === null || v.price === undefined) missingPrice++;
        else if (isNaN(priceNum) || priceNum <= 0) invalidPrice++;

        if (v.compareAtPrice !== null && v.compareAtPrice !== undefined) {
          const compareNum = Number(v.compareAtPrice);
          if (compareNum < priceNum) mrpLowerThanPrice++;
        }
      }
    }
  }

  console.log(`Products Missing Name: ${missingName}`);
  console.log(`Products Missing Slug: ${missingSlug}`);
  console.log(`Duplicate Slugs Count: ${duplicateSlugs.size}`);
  console.log(`Products Missing Category: ${missingCategory}`);
  console.log(`Products Invalid Category Relation: ${invalidCategoryRelation}`);
  console.log(`Variants Missing SKU: ${missingSku}`);
  console.log(`Duplicate SKUs Count: ${duplicateSkus.size}`);
  console.log(`Variants Missing Price: ${missingPrice}`);
  console.log(`Variants Invalid Price (<=0 or NaN): ${invalidPrice}`);
  console.log(`Variants MRP (compareAtPrice) Lower Than Price: ${mrpLowerThanPrice}`);
  console.log(`Products Without Images: ${missingImages}`);
  console.log(`Broken Image References: ${brokenImageRefs}`);
  console.log(`Products Missing Description: ${missingDescription}`);
  console.log(`Products Missing Status: ${missingStatus}`);
  console.log(`Products Missing SEO Title: ${missingSeoTitle}`);
  console.log(`Products Missing SEO Description: ${missingSeoDescription}`);

  // PHASE 3: CATEGORY QUALITY
  console.log("\n=================== PHASE 3 — CATEGORY QUALITY ===================");
  let categoryNameCounts: Record<string, number> = {};
  let categorySlugCounts: Record<string, number> = {};
  let duplicateCatNames: string[] = [];
  let emptyCategories: { id: string; name: string; slug: string }[] = [];

  for (const c of categories) {
    const normName = c.name.trim().toLowerCase();
    categoryNameCounts[normName] = (categoryNameCounts[normName] || 0) + 1;
    if (categoryNameCounts[normName] > 1) duplicateCatNames.push(c.name);

    categorySlugCounts[c.slug] = (categorySlugCounts[c.slug] || 0) + 1;

    if (c.products.length === 0 && c.children.length === 0) {
      emptyCategories.push({ id: c.id, name: c.name, slug: c.slug });
    }
  }

  console.log(`Categories Total: ${categories.length}`);
  console.log(`Duplicate Category Names: ${duplicateCatNames.length}`);
  console.log(`Empty Categories (0 products & 0 child categories): ${emptyCategories.length}`);
  console.log("\nAll Categories:");
  for (const c of categories) {
    console.log(`  - [${c.id}] Name: "${c.name}", Slug: "${c.slug}", Parent: ${c.parent ? `"${c.parent.name}"` : 'NONE'}, Products: ${c.products.length}`);
  }

  // PHASE 4: INVENTORY QUALITY
  console.log("\n=================== PHASE 4 — INVENTORY QUALITY ===================");
  let variantsWithoutInventory: string[] = [];
  let inventoryWithoutVariant: string[] = [];
  let negativeStockRecords: { id: string; sku: string; stock: number }[] = [];
  let lowStockRecords: { id: string; sku: string; stock: number; alert: number }[] = [];
  let outOfStockRecords: { id: string; sku: string; stock: number }[] = [];

  for (const v of variants) {
    if (!v.inventory) {
      variantsWithoutInventory.push(v.sku);
    } else {
      const avail = v.inventory.availableStock;
      if (avail < 0) negativeStockRecords.push({ id: v.inventory.id, sku: v.sku, stock: avail });
      if (avail <= 0) outOfStockRecords.push({ id: v.inventory.id, sku: v.sku, stock: avail });
      if (avail > 0 && avail <= v.inventory.lowStockAlert) {
        lowStockRecords.push({ id: v.inventory.id, sku: v.sku, stock: avail, alert: v.inventory.lowStockAlert });
      }
    }
  }

  for (const inv of inventoryRecords) {
    if (!inv.variant) inventoryWithoutVariant.push(inv.id);
  }

  console.log(`Variants Without Inventory Record: ${variantsWithoutInventory.length}`);
  console.log(`Inventory Records Without Variant: ${inventoryWithoutVariant.length}`);
  console.log(`Negative Stock Records: ${negativeStockRecords.length}`);
  console.log(`Out-Of-Stock Products/Variants (stock <= 0): ${outOfStockRecords.length}`);
  console.log(`Low Stock Records (0 < stock <= alert): ${lowStockRecords.length}`);

  // PHASE 5: IMAGE QUALITY
  console.log("\n=================== PHASE 5 — IMAGE QUALITY ===================");
  let productsWithoutImages = 0;
  let imagesWithoutProduct = 0;
  let missingCloudinaryUrls = 0;
  let invalidImageUrls = 0;
  let productsWithNoPrimaryImage = 0;
  let productsWithMultiplePrimaryImages = 0;
  let duplicateImageUrlsPerProduct = 0;

  for (const img of images) {
    if (!img.product) imagesWithoutProduct++;
    if (!img.imageUrl.includes('cloudinary.com') && !img.imageUrl.includes('res.cloudinary.com')) {
      missingCloudinaryUrls++;
    }
    if (!img.imageUrl.startsWith('http://') && !img.imageUrl.startsWith('https://')) {
      invalidImageUrls++;
    }
  }

  for (const p of products) {
    if (p.images.length === 0) {
      productsWithoutImages++;
    } else {
      const primaryCount = p.images.filter(i => i.isPrimary).length;
      if (primaryCount === 0) productsWithNoPrimaryImage++;
      if (primaryCount > 1) productsWithMultiplePrimaryImages++;

      const urlSet = new Set<string>();
      for (const img of p.images) {
        if (urlSet.has(img.imageUrl)) duplicateImageUrlsPerProduct++;
        urlSet.add(img.imageUrl);
      }
    }
  }

  console.log(`Products Without Images: ${productsWithoutImages}`);
  console.log(`Images Without Product: ${imagesWithoutProduct}`);
  console.log(`Images Not Hosted on Cloudinary: ${missingCloudinaryUrls}`);
  console.log(`Invalid Image URLs: ${invalidImageUrls}`);
  console.log(`Products With No Primary Image: ${productsWithNoPrimaryImage}`);
  console.log(`Products With Multiple Primary Images: ${productsWithMultiplePrimaryImages}`);
  console.log(`Duplicate Image URLs Per Product: ${duplicateImageUrlsPerProduct}`);

  // PHASE 6: TEST DATA INVESTIGATION (ORDERS)
  console.log("\n=================== PHASE 6 — TEST DATA INVESTIGATION ===================");
  console.log(`Total Orders in Database: ${orders.length}`);
  for (const order of orders) {
    console.log(`\n--- Order ID: ${order.id} ---`);
    console.log(`Created At: ${order.createdAt.toISOString()}`);
    console.log(`Order Status: ${order.status}`);
    console.log(`Total Amount: INR ${order.totalAmount}`);
    console.log(`Customer ID: ${order.userId} | Name: ${order.user.firstName} ${order.user.lastName} | Email: ${order.user.email} | Role: ${order.user.role}`);
    console.log(`Order Items Count: ${order.orderItems.length}`);
    for (const item of order.orderItems) {
      const prodName = item.productVariant?.product?.name || 'UNKNOWN PRODUCT';
      console.log(`  - Item: ${prodName} (Variant SKU: ${item.productVariant?.sku}, Qty: ${item.quantity}, Price: INR ${item.price})`);
    }
    console.log(`Payments Count: ${order.payments.length}`);
    for (const pay of order.payments) {
      console.log(`  - Payment ID: ${pay.id}, Provider: ${pay.provider}, TxnID: ${pay.transactionId || 'NONE'}, Status: ${pay.status}, Amount: INR ${pay.amount}`);
    }
  }

  // PHASE 8: COUPON CLEANUP AUDIT
  console.log("\n=================== PHASE 8 — COUPON CLEANUP AUDIT ===================");
  console.log(`Total Coupons: ${coupons.length}`);
  for (const c of coupons) {
    console.log(`  - Code: ${c.code} | Type: ${c.discountType} | Value: ${c.discountValue} | Active: ${c.isActive} | Used: ${c.usedCount}/${c.usageLimit || '∞'} | Start: ${c.startDate ? c.startDate.toISOString() : 'N/A'} | End: ${c.endDate ? c.endDate.toISOString() : 'N/A'}`);
  }

  // PHASE 9: CUSTOMER DATA
  console.log("\n=================== PHASE 9 — CUSTOMER DATA ===================");
  console.log(`Total Users: ${users.length}`);
  console.log(`Total Customer Role Users: ${customers.length}`);
  for (const cust of customers) {
    console.log(`  - [${cust.id}] ${cust.firstName} ${cust.lastName} | Email: ${cust.email} | Phone: ${cust.phone || 'N/A'} | PasswordHash Present: ${Boolean(cust.passwordHash)} | Verified: Email=${cust.emailVerified}/Phone=${cust.phoneVerified} | Orders: ${cust.orders.length} | Addresses: ${cust.addresses.length} | Created: ${cust.createdAt.toISOString()}`);
  }

  // PHASE 10: REVIEW DATA
  console.log("\n=================== PHASE 10 — REVIEW DATA ===================");
  console.log(`Total Reviews: ${reviews.length}`);
  for (const r of reviews) {
    console.log(`  - [${r.id}] Rating: ${r.rating}/5 | Comment: "${r.comment}" | Product: ${r.product?.name || 'MISSING'} | User: ${r.user?.email || 'MISSING'} | Created: ${r.createdAt.toISOString()}`);
  }

  // PHASE 11: ADMIN & RBAC DATA
  console.log("\n=================== PHASE 11 — ADMIN & RBAC DATA ===================");
  console.log(`Total Admin Role Users: ${admins.length}`);
  for (const adm of admins) {
    console.log(`  - [${adm.id}] ${adm.firstName} ${adm.lastName} | Email: ${adm.email} | Phone: ${adm.phone || 'N/A'} | Status: ${adm.accountStatus} | PasswordHash Present: ${Boolean(adm.passwordHash)} | Created: ${adm.createdAt.toISOString()}`);
  }

  // PHASE 12: ORPHAN RECORDS
  console.log("\n=================== PHASE 12 — ORPHAN RECORDS ===================");
  let orphanOrderItems = orderItems.filter(oi => !oi.order || !oi.productVariant);
  let orphanReviews = reviews.filter(r => !r.product || !r.user);
  let orphanInventory = inventoryRecords.filter(i => !i.variant);
  let orphanImages = images.filter(img => !img.product);
  let orphanOrders = orders.filter(o => !o.user);
  let orphanPayments = payments.filter(p => !p.order);

  console.log(`Orphan Order Items: ${orphanOrderItems.length}`);
  console.log(`Orphan Reviews: ${orphanReviews.length}`);
  console.log(`Orphan Inventory: ${orphanInventory.length}`);
  console.log(`Orphan Product Images: ${orphanImages.length}`);
  console.log(`Orphan Orders: ${orphanOrders.length}`);
  console.log(`Orphan Payments: ${orphanPayments.length}`);

  console.log("\n=================== AUDIT SCRIPT COMPLETE ===================");
}

runComprehensiveAudit()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
