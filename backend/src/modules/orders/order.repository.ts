import { PrismaClient, OrderStatus, PaymentStatus } from "@prisma/client";

export interface OrderFilters {
  status?: OrderStatus;
  userId?: string;
}

export class OrderRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates an order with items and a pending payment, then decrements inventory.
   * All operations run inside a single Prisma transaction for atomicity.
   */
  async createOrderWithItems(
    userId: string,
    totalAmount: number,
    items: { variantId: string; quantity: number; price: number }[],
    paymentProvider = "STRIPE",
  ) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: OrderStatus.PENDING,
          orderItems: {
            create: items.map((item) => ({
              productVariantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
          payments: {
            create: {
              amount: totalAmount,
              provider: paymentProvider,
              status: PaymentStatus.PENDING,
            },
          },
        },
        include: {
          orderItems: {
            include: {
              productVariant: {
                include: {
                  product: { select: { id: true, name: true, slug: true } },
                },
              },
            },
          },
          payments: true,
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      });

      for (const item of items) {
        await tx.inventory.update({
          where: { variantId: item.variantId },
          data: {
            availableStock: { decrement: item.quantity },
            soldStock: { increment: item.quantity },
          },
        });
      }

      return order;
    });
  }

  async findOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            productVariant: {
              include: {
                product: { select: { id: true, name: true, slug: true } },
              },
            },
          },
        },
        payments: true,
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });
  }

  async findUserOrders(userId: string, skip: number, limit: number) {
    const where = { userId };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          orderItems: {
            include: {
              productVariant: {
                include: { product: { select: { id: true, name: true } } },
              },
            },
          },
          payments: true,
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return { data, total };
  }

  async findAllOrders(filters: OrderFilters, skip: number, limit: number) {
    const where: { status?: OrderStatus; userId?: string } = {};
    if (filters.status) where.status = filters.status;
    if (filters.userId) where.userId = filters.userId;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          orderItems: {
            include: {
              productVariant: {
                include: { product: { select: { id: true, name: true } } },
              },
            },
          },
          payments: true,
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return { data, total };
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        orderItems: {
          include: {
            productVariant: {
              include: { product: { select: { id: true, name: true } } },
            },
          },
        },
        payments: true,
      },
    });
  }

  /**
   * Atomically cancels an order and restores inventory in a single transaction.
   * Prevents the stock leak that would occur if status update succeeded but
   * inventory restore failed (or vice versa).
   */
  async cancelOrderAndRestoreInventory(
    orderId: string,
    items: { productVariantId: string; quantity: number }[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CANCELLED },
        include: {
          orderItems: {
            include: {
              productVariant: {
                include: { product: { select: { id: true, name: true } } },
              },
            },
          },
          payments: true,
        },
      });

      for (const item of items) {
        await tx.inventory.update({
          where: { variantId: item.productVariantId },
          data: {
            availableStock: { increment: item.quantity },
            soldStock: { decrement: item.quantity },
          },
        });
      }

      return order;
    });
  }

  async updatePaymentStatus(
    orderId: string,
    status: PaymentStatus,
    transactionId?: string,
  ) {
    await this.prisma.payment.updateMany({
      where: { orderId },
      data: {
        status,
        ...(transactionId && { transactionId }),
      },
    });

    return this.findOrderById(orderId);
  }

  async findRecentPendingOrder(userId: string, amount: number) {
    const tenSecondsAgo = new Date(Date.now() - 10000);
    return this.prisma.order.findFirst({
      where: {
        userId,
        totalAmount: amount,
        status: OrderStatus.PENDING,
        createdAt: { gte: tenSecondsAgo },
      },
    });
  }
}
