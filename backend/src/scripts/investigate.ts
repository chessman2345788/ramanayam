import { prisma } from "../prisma";

async function main() {
  console.log("=== DB INVESTIGATION START ===");
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          productVariant: {
            include: {
              product: true,
            },
          },
        },
      },
      payments: true,
    },
    orderBy: { createdAt: "asc" },
  });

  console.log(`TOTAL_ORDERS_COUNT=${orders.length}`);
  for (const o of orders) {
    console.log(`\n--- ORDER SUMMARY ---`);
    console.log(`ID: ${o.id}`);
    console.log(`Created At: ${o.createdAt.toISOString()}`);
    console.log(`Status: ${o.status}`);
    console.log(`Total Amount: ₹${o.totalAmount}`);
    console.log(`User: ${o.user ? `${o.user.firstName} ${o.user.lastName} (${o.user.email})` : "Unassigned"}`);
    console.log(`Order Items (${o.orderItems.length}):`);
    o.orderItems.forEach((i) => {
      console.log(`  * Product: ${i.productVariant?.product?.name || "N/A"} | Variant SKU: ${i.productVariant?.sku} | Qty: ${i.quantity} | Price: ₹${i.price}`);
    });
    console.log(`Payments (${o.payments.length}):`);
    o.payments.forEach((p) => {
      console.log(`  * Payment ID: ${p.id} | Provider: ${p.provider} | Status: ${p.status} | Txn ID: ${p.transactionId || "None"}`);
    });
  }

  console.log("\n=== USERS SUMMARY ===");
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, firstName: true, lastName: true, createdAt: true },
  });
  console.log(`TOTAL_USERS_COUNT=${users.length}`);
  users.forEach((u) => {
    console.log(`User: [${u.role}] ${u.email} (${u.firstName} ${u.lastName})`);
  });

  console.log("\n=== COUPONS SUMMARY ===");
  const coupons = await prisma.coupon.findMany();
  console.log(`TOTAL_COUPONS_COUNT=${coupons.length}`);
  coupons.forEach((c) => {
    console.log(`Coupon: ${c.code} (${c.discountType} ${c.discountValue}) Active=${c.isActive}`);
  });

  console.log("\n=== REVIEWS SUMMARY ===");
  const reviewsCount = await prisma.review.count();
  console.log(`TOTAL_REVIEWS_COUNT=${reviewsCount}`);

  console.log("=== DB INVESTIGATION END ===");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
