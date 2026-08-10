import { Request, Response } from "express";
import { PaymentsService } from "./payment.service";
import { WebhookService } from "./webhook.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";

export class PaymentsController {
  constructor(
    private service: PaymentsService,
    private webhookService: WebhookService,
  ) {}

  get = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const payment = await this.service.getById(req.params.id, user?.id, user?.role);
    sendSuccess(res, "Payment details fetched successfully", { payment });
  };

  getByOrderId = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const payment = await this.service.getByOrderId(req.params.orderId, user?.id, user?.role);
    sendSuccess(res, "Order payment details fetched successfully", { payment });
  };

  getHistory = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const history = await this.service.getHistory(req.query, user?.id, user?.role);
    sendSuccess(res, "Payment history fetched successfully", history);
  };

  createOrder = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const razorpayOrder = await this.service.createRazorpayOrder(req.body, user?.id);
    sendSuccess(res, "Razorpay order created successfully", razorpayOrder, 201);
  };

  verifyPayment = async (req: Request, res: Response): Promise<void> => {
    const user = (req as RequestWithUser).user;
    const result = await this.service.verifyRazorpayPayment(req.body, user?.id);
    sendSuccess(res, "Payment signature verified successfully", result);
  };

  handleWebhook = async (req: Request, res: Response): Promise<void> => {
    const signature = (req.headers["x-razorpay-signature"] as string) || "";
    // rawBody must be set by express.raw() middleware applied BEFORE express.json()
    // on the /webhook route. Without it, HMAC verification will fail silently.
    const rawBody = (req as any).rawBody;

    if (!rawBody) {
      res.status(400).json({
        success: false,
        message: "Webhook raw body not available. Ensure the webhook route uses express.raw() middleware.",
      });
      return;
    }

    const result = await this.webhookService.processWebhook(req.body, signature, rawBody);
    sendSuccess(res, "Webhook processed successfully", result);
  };
}
