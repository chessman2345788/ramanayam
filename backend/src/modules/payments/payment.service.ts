import { PaymentsRepository } from "./payment.repository";
import { RazorpayService } from "./razorpay.service";
import { AppError } from "../../common/errors";
import { OrderStatus, PaymentStatus, UserRole } from "@prisma/client";

export class PaymentsService {
  constructor(
    private repository: PaymentsRepository,
    private razorpayService: RazorpayService,
  ) {}

  async getById(id: string, userId?: string, userRole?: string) {
    const payment = await this.repository.findById(id);
    if (!payment) {
      throw new AppError("Payment record not found", 404);
    }

    if (userRole !== UserRole.ADMIN && userId && payment.order?.userId !== userId) {
      throw new AppError("Forbidden: You do not have permission to view this payment", 403);
    }

    return payment;
  }

  async getByOrderId(orderId: string, userId?: string, userRole?: string) {
    const payment = await this.repository.findByOrderId(orderId);
    if (!payment) {
      // Check if order exists to return accurate error
      const order = await this.repository.findOrderById(orderId);
      if (!order) {
        throw new AppError("Order not found", 404);
      }
      if (userRole !== UserRole.ADMIN && userId && order.userId !== userId) {
        throw new AppError("Forbidden: You do not have permission to view this order payment", 403);
      }
      throw new AppError("No payment record found for this order", 404);
    }

    if (userRole !== UserRole.ADMIN && userId && payment.order?.userId !== userId) {
      throw new AppError("Forbidden: You do not have permission to view this payment", 403);
    }

    return payment;
  }

  async createRazorpayOrder(
    payload: {
      orderId?: string;
      amount?: number;
      currency?: string;
      receipt?: string;
    },
    userId?: string,
  ) {
    let amountInPaise = payload.amount;
    let targetOrderId = payload.orderId;

    if (targetOrderId) {
      const order = await this.repository.findOrderById(targetOrderId);
      if (!order) {
        throw new AppError("Order not found", 404);
      }

      // Enforce IDOR protection: user can only create payment for their own order
      if (userId && order.userId !== userId) {
        throw new AppError("Forbidden: You can only create payment for your own order", 403);
      }

      // Enforce business rule: Payment can ONLY be created for a valid PENDING order
      if (order.status !== OrderStatus.PENDING) {
        throw new AppError(
          `Payment cannot be created for an order in "${order.status}" status. Only PENDING orders are payable.`,
          400,
        );
      }

      // Prevent multiple successful payments for the same order
      const existingSuccessPayment = order.payments?.find(
        (p) => p.status === PaymentStatus.SUCCESS,
      );
      if (existingSuccessPayment) {
        throw new AppError("This order has already been paid successfully", 400);
      }

      amountInPaise = Math.round(Number(order.totalAmount) * 100);
    }

    if (!amountInPaise || amountInPaise < 100) {
      throw new AppError("Amount must be at least 100 paise (₹1)", 400);
    }

    const currency = payload.currency || "INR";
    const receipt =
      payload.receipt ||
      (targetOrderId ? `rcpt_${targetOrderId.slice(0, 8)}` : `rcpt_${Date.now()}`);

    const razorpayOrder = await this.razorpayService.createRazorpayOrder({
      amount: amountInPaise,
      currency,
      receipt,
      notes: targetOrderId ? { orderId: targetOrderId } : undefined,
    });

    // Record pending payment in DB if orderId is available
    if (targetOrderId) {
      await this.repository.createPendingPayment({
        orderId: targetOrderId,
        amount: amountInPaise / 100,
        provider: "RAZORPAY",
        transactionId: razorpayOrder.id,
      });
    }

    return {
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID || "",
    };
  }

  async verifyRazorpayPayment(
    payload: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      orderId?: string;
    },
    userId?: string,
  ) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = payload;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new AppError("Missing required payment verification fields", 400);
    }

    // Verify cryptographic signature timing-safely
    const isAuthentic = this.razorpayService.verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    let targetOrderId = orderId;

    // If orderId was not passed explicitly, attempt to find order via stored Razorpay Order ID in transactionId
    if (!targetOrderId) {
      const paymentRecord = await this.repository.findByTransactionId(razorpay_order_id);
      if (paymentRecord) {
        targetOrderId = paymentRecord.orderId;
      }
    }

    if (targetOrderId) {
      const order = await this.repository.findOrderById(targetOrderId);
      if (!order) {
        throw new AppError("Order not found during payment verification", 404);
      }

      // Enforce IDOR protection
      if (userId && order.userId !== userId) {
        throw new AppError("Forbidden: You do not have permission to verify this order payment", 403);
      }
    }

    if (!isAuthentic) {
      if (targetOrderId) {
        await this.repository.updatePaymentFailedTx(targetOrderId, razorpay_payment_id);
      }
      throw new AppError("Invalid payment signature. Verification failed.", 400);
    }

    // Signature verified! Atomically update order status to CONFIRMED and payment status to SUCCESS
    let result;
    if (targetOrderId) {
      result = await this.repository.updatePaymentSuccessTx(targetOrderId, razorpay_payment_id);
    }

    return {
      verified: true,
      message: "Payment signature verified successfully and order confirmed",
      razorpay_payment_id,
      razorpay_order_id,
      order: result?.order,
    };
  }

  async getHistory(
    query: {
      page?: number;
      limit?: number;
      status?: PaymentStatus;
      provider?: string;
      search?: string;
    },
    userId?: string,
    userRole?: string,
  ) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const targetUserId = userRole === UserRole.ADMIN ? undefined : userId;

    return this.repository.findUserPaymentHistory({
      userId: targetUserId,
      page,
      limit,
      status: query.status,
      provider: query.provider,
      search: query.search,
    });
  }
}
