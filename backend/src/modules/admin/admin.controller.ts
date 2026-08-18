import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { sendSuccess } from "../../components/response";
import { RequestWithUser } from "../auth/auth.types";
import { AppError } from "../../common/errors";

export class AdminController {
  constructor(private service: AdminService) {}

  private getAdminId(req: Request): string {
    const user = (req as RequestWithUser).user;
    if (!user || !user.id) {
      throw new AppError("Authentication required for Admin operations", 401);
    }
    return user.id;
  }

  getDashboard = async (_req: Request, res: Response): Promise<void> => {
    const dashboard = await this.service.getDashboard();
    sendSuccess(res, "Admin dashboard fetched successfully", dashboard);
  };

  getStats = async (_req: Request, res: Response): Promise<void> => {
    const stats = await this.service.getStats();
    sendSuccess(res, "Admin platform statistics fetched successfully", stats);
  };

  getAnalyticsOverview = async (req: Request, res: Response): Promise<void> => {
    const { range, startDate, endDate } = req.query as any;
    const analytics = await this.service.getAnalyticsOverview(range, startDate, endDate);
    sendSuccess(res, "Admin analytics fetched successfully", analytics);
  };

  getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await this.service.getUsers(req.query as any);
    sendSuccess(res, "Users list fetched successfully", users);
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const user = await this.service.getUserById(req.params.id);
    sendSuccess(res, "User details fetched successfully", { user });
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const adminId = this.getAdminId(req);
    const updatedUser = await this.service.updateUserRole(adminId, req.params.id, req.body);
    sendSuccess(res, "User role and details updated successfully", { user: updatedUser });
  };

  updateUserStatus = async (req: Request, res: Response): Promise<void> => {
    const adminId = this.getAdminId(req);
    const updatedUser = await this.service.updateUserStatus(adminId, req.params.id, req.body);
    sendSuccess(res, "User account status updated successfully", { user: updatedUser });
  };

  getProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await this.service.getProducts(req.query as any);
    sendSuccess(res, "Products list fetched successfully", products);
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    const adminId = this.getAdminId(req);
    const updatedProduct = await this.service.updateProduct(adminId, req.params.id, req.body);
    sendSuccess(res, "Product updated successfully by Admin", { product: updatedProduct });
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const adminId = this.getAdminId(req);
    const result = await this.service.deleteProduct(adminId, req.params.id);
    sendSuccess(res, "Product deleted successfully by Admin", result);
  };

  getOrders = async (req: Request, res: Response): Promise<void> => {
    const orders = await this.service.getOrders(req.query as any);
    sendSuccess(res, "Orders list fetched successfully", orders);
  };

  updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    const adminId = this.getAdminId(req);
    const updatedOrder = await this.service.updateOrderStatus(adminId, req.params.id, req.body);
    sendSuccess(res, "Order status updated successfully by Admin", { order: updatedOrder });
  };

  getPayments = async (req: Request, res: Response): Promise<void> => {
    const payments = await this.service.getPayments(req.query as any);
    sendSuccess(res, "Payments list fetched successfully", payments);
  };

  getReviews = async (req: Request, res: Response): Promise<void> => {
    const reviews = await this.service.getReviews(req.query as any);
    sendSuccess(res, "Reviews list fetched successfully", reviews);
  };

  updateReview = async (req: Request, res: Response): Promise<void> => {
    const adminId = this.getAdminId(req);
    const updatedReview = await this.service.updateReview(adminId, req.params.id, req.body);
    sendSuccess(res, "Review updated successfully by Admin", { review: updatedReview });
  };

  deleteReview = async (req: Request, res: Response): Promise<void> => {
    const adminId = this.getAdminId(req);
    const result = await this.service.deleteReview(adminId, req.params.id);
    sendSuccess(res, "Review deleted successfully by Admin", result);
  };
}
