import { prisma } from "../src/prisma";

async function auditDatabaseAndSources() {
  console.log("=======================================================");
  console.log("🔍 COMPREHENSIVE DATABASE AUDIT & DATA SOURCE TRACING");
  console.log("=======================================================\n");

  // 1. Total counts across all models
  const userCount = await prisma.user.count();
  const addressCount = await prisma.address.count();
  const categoryCount = await prisma.category.count();
  const collectionCount = await prisma.collection.count();
  const vendorCount = await prisma.vendor.count();
  const productCount = await prisma.product.count();
  const variantCount = await prisma.productVariant.count();
  const imageCount = await prisma.productImage.count();
  const inventoryCount = await prisma.inventory.count();
  const reviewCount = await prisma.review.count();
  const orderCount = await prisma.order.count();
  const orderItemCount = await prisma.orderItem.count();
  const paymentCount = await prisma.payment.count();
  const couponCount = await prisma.coupon.count();
  const cmsBannerCount = await prisma.cmsBanner.count();
  const cmsSectionCount = await prisma.cmsSection.count();
  const systemSettingCount = await prisma.systemSetting.count();

  console.log("📋 EXACT POSTGRESQL RECORD COUNTS:");
  console.log(`   - Users:            ${userCount}`);
  console.log(`   - Addresses:        ${addressCount}`);
  console.log(`   - Categories:       ${categoryCount}`);
  console.log(`   - Collections:      ${collectionCount}`);
  console.log(`   - Vendors:          ${vendorCount}`);
  console.log(`   - Products:         ${productCount}`);
  console.log(`   - ProductVariants:  ${variantCount}`);
  console.log(`   - ProductImages:    ${imageCount}`);
  console.log(`   - Inventory:        ${inventoryCount}`);
  console.log(`   - Reviews:          ${reviewCount}`);
  console.log(`   - Orders:           ${orderCount}`);
  console.log(`   - OrderItems:       ${orderItemCount}`);
  console.log(`   - Payments:         ${paymentCount}`);
  console.log(`   - Coupons:          ${couponCount}`);
  console.log(`   - CMS Banners:      ${cmsBannerCount}`);
  console.log(`   - CMS Sections:     ${cmsSectionCount}`);
  console.log(`   - System Settings:  ${systemSettingCount}\n`);

  // 2. Users Detail
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      accountStatus: true,
      createdAt: true,
    },
  });
  console.log("👤 USERS IN POSTGRESQL:");
  users.forEach((u) => {
    console.log(`   - [${u.role}] ${u.firstName} ${u.lastName} (${u.email}) - Status: ${u.accountStatus} - Created: ${u.createdAt.toISOString()}`);
  });

  // 3. Orders Detail
  console.log("\n📦 ORDERS IN POSTGRESQL:");
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      payments: true,
      orderItems: { include: { productVariant: { select: { sku: true, variantName: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
  if (orders.length === 0) {
    console.log("   (0 orders in PostgreSQL)");
  } else {
    orders.forEach((o) => {
      console.log(`   - Order ID: ${o.id}`);
      console.log(`     Customer: ${o.user.firstName} ${o.user.lastName} (${o.user.email})`);
      console.log(`     Amount: ₹${o.totalAmount} | Status: ${o.status} | Created: ${o.createdAt.toISOString()}`);
      console.log(`     Payments (${o.payments.length}): ${o.payments.map((p) => `[${p.provider}: ₹${p.amount}, status=${p.status}, txId=${p.transactionId}]`).join(", ")}`);
      console.log(`     Items (${o.orderItems.length}): ${o.orderItems.map((i) => `${i.quantity}x ${i.productVariant.sku} @ ₹${i.price}`).join(", ")}`);
    });
  }

  // 4. Payments Detail
  console.log("\n💳 PAYMENTS IN POSTGRESQL:");
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
  });
  if (payments.length === 0) {
    console.log("   (0 payments in PostgreSQL)");
  } else {
    payments.forEach((p) => {
      console.log(`   - Payment ID: ${p.id} | Order ID: ${p.orderId} | Amount: ₹${p.amount} | Provider: ${p.provider} | Status: ${p.status} | TxId: ${p.transactionId}`);
    });
  }

  // 5. Calculate Revenue from PostgreSQL
  const confirmedStatuses = ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] as any;
  const dbRevenue = await prisma.order.aggregate({
    where: { status: { in: confirmedStatuses } },
    _sum: { totalAmount: true },
  });
  const allOrdersSum = await prisma.order.aggregate({
    _sum: { totalAmount: true },
  });
  console.log("\n💰 REVENUE CALCULATION FROM POSTGRESQL:");
  console.log(`   - Confirmed/Processing/Shipped/Delivered Revenue: ₹${dbRevenue._sum.totalAmount || 0}`);
  console.log(`   - Total Sum of All Orders regardless of status: ₹${allOrdersSum._sum.totalAmount || 0}`);

  // 6. Check Reviews
  const reviews = await prisma.review.findMany({
    take: 5,
    select: { id: true, rating: true, comment: true, createdAt: true },
  });
  console.log(`\n⭐ REVIEWS IN POSTGRESQL (${reviewCount} total):`);
  reviews.forEach((r) => {
    console.log(`   - Rating: ${r.rating}/5 | "${r.comment}" | Created: ${r.createdAt.toISOString()}`);
  });

  // 7. Check Coupons
  const coupons = await prisma.coupon.findMany();
  console.log(`\n🎟️ COUPONS IN POSTGRESQL (${couponCount} total):`);
  coupons.forEach((c) => {
    console.log(`   - Code: ${c.code} | ${c.discountType} ${c.discountValue} | Active: ${c.isActive} | Used: ${c.usedCount}/${c.usageLimit || "unlimited"}`);
  });

  // 8. Check Vendors
  const vendors = await prisma.vendor.findMany();
  console.log(`\n🏪 VENDORS IN POSTGRESQL (${vendorCount} total):`);
  vendors.forEach((v) => {
    console.log(`   - Name: ${v.businessName} (slug: ${v.slug}) | Owner: ${v.ownerName} | Status: ${v.status} | Verified: ${v.isVerified}`);
  });

  // 9. Check Seed files in repository
  console.log("\n📁 SEED SCRIPTS IN REPOSITORY:");
  // list prisma seed files
}

auditDatabaseAndSources().finally(() => prisma.$disconnect());
