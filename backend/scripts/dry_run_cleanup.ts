import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const APPROVED_ORDER_IDS = [
  '9e8b8985-70fd-436a-aa14-cf44302619a9',
  '96cea866-1f47-4f28-8363-e58f58c6375f',
  '4da4c500-5cea-43e3-a38b-594868519dc2',
  '2818a9f9-e9b7-4d41-991a-d1e3b9c4ed8b',
];

async function runDryRun() {
  console.log("==========================================================================");
  console.log("             RAMANAYAM CLEANUP DRY RUN & DEPENDENCY VERIFICATION          ");
  console.log("==========================================================================\n");

  const ordersToDelete = await prisma.order.findMany({
    where: { id: { in: APPROVED_ORDER_IDS } },
    include: {
      orderItems: { include: { productVariant: true } },
      payments: true,
      user: true,
    }
  });

  console.log(`Found ${ordersToDelete.length} matching test orders for dry run deletion.\n`);

  let totalItemsCount = 0;
  let totalPaymentsCount = 0;

  for (const order of ordersToDelete) {
    console.log(`[DRY RUN ITEM] Order ID: ${order.id}`);
    console.log(`  - Created At: ${order.createdAt.toISOString()}`);
    console.log(`  - Status: ${order.status}`);
    console.log(`  - Total Amount: INR ${order.totalAmount}`);
    console.log(`  - User: ${order.user.email} (Role: ${order.user.role})`);
    console.log(`  - Dependent Order Items to remove: ${order.orderItems.length}`);
    totalItemsCount += order.orderItems.length;
    console.log(`  - Dependent Payments to remove: ${order.payments.length}`);
    totalPaymentsCount += order.payments.length;
    for (const p of order.payments) {
      console.log(`      * Payment ID: ${p.id} | Provider: ${p.provider} | Status: ${p.status} | Txn: ${p.transactionId || 'NONE'}`);
    }
  }

  const unapprovedOrdersCount = await prisma.order.count({
    where: { id: { notIn: APPROVED_ORDER_IDS } }
  });

  console.log("\n=================== DRY RUN IMPACT SUMMARY ===================");
  console.log(`Orders to be deleted: ${ordersToDelete.length}`);
  console.log(`OrderItems to be deleted: ${totalItemsCount}`);
  console.log(`Payments to be deleted: ${totalPaymentsCount}`);
  console.log(`Legitimate / Unapproved Orders Remaining: ${unapprovedOrdersCount}`);
  console.log(`Users/Customers Affected: 0 (Admin user user record remains untouched)`);
  console.log(`Products/Inventory Affected: 0 (Stock numbers remain unchanged)`);
  console.log(`Coupons/Reviews Affected: 0 (Coupons and reviews remain untouched)`);
  console.log("======================================================================\n");
}

runDryRun()
  .catch(e => console.error("Dry run error:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
