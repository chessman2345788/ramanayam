import { Response } from "express";
import { OrderService } from "./order.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";
import { OrderFilters } from "./order.repository";

export class OrderController {
  constructor(private service: OrderService) {}

  // ──────────────────────────────────────────────
  // Customer Handlers
  // ──────────────────────────────────────────────

  createOrder = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const order = await this.service.createOrderFromCart(userId, req.body);
    sendSuccess(res, "Order created successfully", { order }, 201);
  };

  getCustomerOrders = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const { page, limit } = req.query as unknown as { page: number; limit: number };
    const result = await this.service.getCustomerOrders(userId, page, limit);
    sendSuccess(res, "Orders fetched successfully", result);
  };

  getCustomerOrderById = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const order = await this.service.getCustomerOrderById(userId, req.params.id);
    sendSuccess(res, "Order details fetched successfully", { order });
  };

  cancelOrder = async (req: RequestWithUser, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const order = await this.service.cancelOrder(userId, req.params.id);
    sendSuccess(res, "Order cancelled successfully", { order });
  };

  

  getAdminOrders = async (req: RequestWithUser, res: Response): Promise<void> => {
    const { page, limit, status, userId } = req.query as unknown as {
      page: number;
      limit: number;
      status?: string;
      userId?: string;
    };
    const filters: OrderFilters = { status, userId } as OrderFilters;
    const result = await this.service.getAdminOrders(filters, page, limit);
    sendSuccess(res, "Admin order list fetched successfully", result);
  };

  getAdminOrderById = async (req: RequestWithUser, res: Response): Promise<void> => {
    const order = await this.service.getAdminOrderById(req.params.id);
    sendSuccess(res, "Admin order details fetched successfully", { order });
  };

  updateOrderStatus = async (req: RequestWithUser, res: Response): Promise<void> => {
    const order = await this.service.updateOrderStatus(req.params.id, req.body.status);
    sendSuccess(res, "Order status updated successfully", { order });
  };

  updatePaymentStatus = async (req: RequestWithUser, res: Response): Promise<void> => {
    const order = await this.service.updatePaymentStatus(
      req.params.id,
      req.body.status,
      req.body.transactionId,
    );
    sendSuccess(res, "Payment status updated successfully", { order });
  };
}
