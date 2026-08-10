import { PrismaClient, OrderStatus, PaymentStatus } from "@prisma/client";

export class PaymentsRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            id: true,
            userId: true,
            status: true,
            totalAmount: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findByOrderId(orderId: string) {
    return this.prisma.payment.findFirst({
      where: { orderId },
      include: {
        order: {
          select: {
            id: true,
            userId: true,
            status: true,
            totalAmount: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByTransactionId(transactionId: string) {
    return this.prisma.payment.findUnique({
      where: { transactionId },
      include: {
        order: true,
      },
    });
  }

  async findOrderById(orderId: string) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        payments: true,
      },
    });
  }

  async createPendingPayment(data: {
    orderId: string;
    amount: number;
    provider: string;
    transactionId?: string;
  }) {
    return this.prisma.payment.create({
      data: {
        orderId: data.orderId,
        amount: data.amount,
        provider: data.provider,
        status: PaymentStatus.PENDING,
        transactionId: data.transactionId || null,
      },
    });
  }

  async updatePaymentSuccessTx(orderId: string, transactionId: string) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
      }

      // Idempotency check: if order is already CONFIRMED, return without duplicate mutations
      if (order.status === OrderStatus.CONFIRMED) {
        const existingPayment = await tx.payment.findFirst({
          where: { orderId, status: PaymentStatus.SUCCESS },
        });
        return { order, payment: existingPayment };
      }

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CONFIRMED },
      });

      // Find pending payment or update all pending payments for this order
      const pendingPayment = await tx.payment.findFirst({
        where: { orderId, status: PaymentStatus.PENDING },
        orderBy: { createdAt: "desc" },
      });

      let payment;
      if (pendingPayment) {
        payment = await tx.payment.update({
          where: { id: pendingPayment.id },
          data: {
            status: PaymentStatus.SUCCESS,
            transactionId,
          },
        });
      } else {
        payment = await tx.payment.create({
          data: {
            orderId,
            amount: order.totalAmount,
            provider: "RAZORPAY",
            status: PaymentStatus.SUCCESS,
            transactionId,
          },
        });
      }

      return { order: updatedOrder, payment };
    });
  }

  async updatePaymentFailedTx(orderId: string, transactionId?: string) {
    return this.prisma.$transaction(async (tx) => {
      const pendingPayments = await tx.payment.findMany({
        where: {
          orderId,
          status: { not: PaymentStatus.SUCCESS },
        },
      });

      if (pendingPayments.length > 0) {
        await tx.payment.updateMany({
          where: {
            orderId,
            status: { not: PaymentStatus.SUCCESS },
          },
          data: {
            status: PaymentStatus.FAILED,
            ...(transactionId ? { transactionId } : {}),
          },
        });
      }
    });
  }

  async findUserPaymentHistory(params: {
    userId?: string;
    page: number;
    limit: number;
    status?: PaymentStatus;
    provider?: string;
    search?: string;
  }) {
    const { userId, page, limit, status, provider, search } = params;
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (userId) {
      whereClause.order = { userId };
    }

    if (status) {
      whereClause.status = status;
    }

    if (provider) {
      whereClause.provider = { equals: provider, mode: "insensitive" };
    }

    if (search) {
      whereClause.OR = [
        { id: { contains: search, mode: "insensitive" } },
        { transactionId: { contains: search, mode: "insensitive" } },
        { orderId: { contains: search, mode: "insensitive" } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          orderId: true,
          transactionId: true,
          amount: true,
          provider: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          order: {
            select: {
              id: true,
              userId: true,
              status: true,
              totalAmount: true,
            },
          },
        },
      }),
      this.prisma.payment.count({ where: whereClause }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
