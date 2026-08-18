import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const APPROVED_ORDER_IDS = [
  '9e8b8985-70fd-436a-aa14-cf44302619a9',
  '96cea866-1f47-4f28-8363-e58f58c6375f',
  '4da4c500-5cea-43e3-a38b-594868519dc2',
  '2818a9f9-e9b7-4d41-991a-d1e3b9c4ed8b',
];

async function executeCleanup() {
  console.log("==========================================================================");
  console.log("          EXECUTING APPROVED PRODUCTION DATA CLEANUP (PRISMA)             ");
  console.log("==========================================================================\n");

  const ordersToDelete = await prisma.order.findMany({
    where: { id: { in: APPROVED_ORDER_IDS } },
    select: { id: true }
  });

  if (ordersToDelete.length !== APPROVED_ORDER_IDS.length) {
    throw new Error(`CRITICAL: Found ${ordersToDelete.length} orders matching target list, expected ${APPROVED_ORDER_IDS.length}. Aborting.`);
  }

  console.log(`Starting atomic deletion transaction for ${ordersToDelete.length} approved test orders...\n`);

  const result = await prisma.$transaction(async (tx) => {
    // 1. Delete dependent Payment records
    const deletedPayments = await tx.payment.deleteMany({
      where: { orderId: { in: APPROVED_ORDER_IDS } }
    });

    // 2. Delete dependent OrderItem records
    const deletedOrderItems = await tx.orderItem.deleteMany({
      where: { orderId: { in: APPROVED_ORDER_IDS } }
    });

    // 3. Delete target Order records
    const deletedOrders = await tx.order.deleteMany({
      where: { id: { in: APPROVED_ORDER_IDS } }
    });

    return {
      deletedPaymentsCount: deletedPayments.count,
      deletedOrderItemsCount: deletedOrderItems.count,
      deletedOrdersCount: deletedOrders.count,
    };
  });

  console.log("=================== CLEANUP EXECUTION RESULT ===================");
  console.log(`- Test Payments Deleted: ${result.deletedPaymentsCount}`);
  console.log(`- Test OrderItems Deleted: ${result.deletedOrderItemsCount}`);
  console.log(`- Test Orders Deleted: ${result.deletedOrdersCount}`);
  console.log("✅ APPROVED CLEANUP EXECUTED SUCCESSFULLY AND ATOMICALLY!");
}

executeCleanup()
  .catch(e => {
    console.error("❌ Cleanup execution failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
