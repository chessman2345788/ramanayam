import Razorpay from "razorpay";
import crypto from "crypto";
import { AppError } from "../../common/errors";
import logger from "../../components/logger";

export class RazorpayService {
  private razorpay: Razorpay | null = null;

  private getRazorpayInstance(): Razorpay {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      logger.error("Razorpay credentials missing from server environment");
      throw new AppError("Razorpay credentials are not configured on the server", 500);
    }

    if (!this.razorpay) {
      this.razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    }

    return this.razorpay;
  }

  async createRazorpayOrder(options: {
    amount: number;
    currency: string;
    receipt: string;
    notes?: Record<string, string>;
  }): Promise<{ id: string; amount: number; currency: string }> {
    const instance = this.getRazorpayInstance();

    try {
      const razorpayOrder = await instance.orders.create({
        amount: options.amount,
        currency: options.currency || "INR",
        receipt: options.receipt,
        notes: options.notes || {},
      });

      return {
        id: razorpayOrder.id,
        amount: Number(razorpayOrder.amount),
        currency: razorpayOrder.currency,
      };
    } catch (error: any) {
      logger.error("Razorpay order creation failed:", error?.message || error);

      const statusCode = error?.statusCode || error?.error?.statusCode;
      const errorCode = error?.error?.code;

      if (statusCode === 401 || errorCode === "AUTHENTICATION_ERROR") {
        throw new AppError("Razorpay authentication failed. Please check server credentials.", 401);
      }

      if (statusCode === 400 || errorCode === "BAD_REQUEST_ERROR") {
        throw new AppError(
          error?.description || error?.error?.description || "Invalid order parameters for Razorpay",
          400,
        );
      }

      throw new AppError(
        error?.description || error?.error?.description || "Failed to create payment order with Razorpay",
        500,
      );
    }
  }

  verifyPaymentSignature(params: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): boolean {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      logger.error("Razorpay secret key missing during signature verification");
      throw new AppError("Razorpay secret key is not configured on the server", 500);
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return false;
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    return this.safeCompareSignatures(expectedSignature, razorpay_signature);
  }

  /**
   * Note on Production Fulfilment:
   * Razorpay Webhooks (order.paid / payment.captured) must be configured in production
   * as the authoritative source of truth for payment capture, complementing standard
   * browser checkout verification to handle edge cases like network disconnects.
   */
  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      logger.error("Razorpay webhook secret missing during webhook verification");
      throw new AppError(
        "Razorpay webhook secret (RAZORPAY_WEBHOOK_SECRET) is not configured on the server",
        500,
      );
    }

    if (!rawBody || !signature) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    return this.safeCompareSignatures(expectedSignature, signature);
  }

  private safeCompareSignatures(a: string, b: string): boolean {
    if (!a || !b) return false;
    try {
      const bufA = Buffer.from(a, "utf8");
      const bufB = Buffer.from(b, "utf8");

      if (bufA.length !== bufB.length) {
        return false;
      }

      return crypto.timingSafeEqual(bufA, bufB);
    } catch {
      return false;
    }
  }
}
