import { PaymentsRepository } from "./payment.repository";
import { RazorpayService } from "./razorpay.service";
import { AppError } from "../../common/errors";

export class WebhookService {
  constructor(
    private repository: PaymentsRepository,
    private razorpayService: RazorpayService,
  ) {}

  async processWebhook(payload: any, signature: string, rawBody: string | Buffer): Promise<{ received: boolean; event: string }> {
    if (!signature) {
      throw new AppError("Missing Razorpay webhook signature header", 400);
    }

    const isValid = this.razorpayService.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      throw new AppError("Invalid webhook signature", 400);
    }

    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
    const razorpayPaymentId = paymentEntity?.id;
    const orderIdFromNotes = paymentEntity?.notes?.orderId || orderEntity?.notes?.orderId;

    if (event === "payment.captured" || event === "order.paid") {
      if (orderIdFromNotes) {
        await this.repository.updatePaymentSuccessTx(orderIdFromNotes, razorpayPaymentId || razorpayOrderId);
      } else if (razorpayOrderId) {
        const payment = await this.repository.findByTransactionId(razorpayOrderId);
        if (payment) {
          await this.repository.updatePaymentSuccessTx(payment.orderId, razorpayPaymentId || razorpayOrderId);
        }
      }
    } else if (event === "payment.failed") {
      if (orderIdFromNotes) {
        await this.repository.updatePaymentFailedTx(orderIdFromNotes, razorpayPaymentId);
      } else if (razorpayOrderId) {
        const payment = await this.repository.findByTransactionId(razorpayOrderId);
        if (payment) {
          await this.repository.updatePaymentFailedTx(payment.orderId, razorpayPaymentId);
        }
      }
    }

    return { received: true, event: event || "unknown" };
  }
}
