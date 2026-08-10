import { AdminRepository } from "./admin.repository";
import {
  UserQueryFilters,
  ProductQueryFilters,
  OrderQueryFilters,
  PaymentQueryFilters,
  ReviewQueryFilters,
  UpdateUserRoleInput,
  UpdateUserStatusInput,
  UpdateProductInput,
  UpdateOrderStatusInput,
  UpdateReviewInput,
  AuditLogPayload,
} from "./admin.types";
import { AppError } from "../../common/errors";
import { UserRole } from "@prisma/client";
import logger from "../../components/logger";

export class AdminService {
  constructor(private repository: AdminRepository) {}

  private logAudit(payload: AuditLogPayload): void {
    logger.info("[ADMIN AUDIT]", {
      timestamp: payload.timestamp.toISOString(),
      adminId: payload.adminId,
      action: payload.action,
      targetId: payload.targetId,
      details: payload.details || {},
    });
  }

  async getDashboard() {
    return this.repository.getDashboardOverview();
  }

  async getStats() {
    return this.repository.getStats();
  }

  async getUsers(filters: UserQueryFilters) {
    return this.repository.findUsers(filters);
  }

  async getUserById(id: string) {
    const user = await this.repository.findUserById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async updateUserRole(adminId: string, targetUserId: string, input: UpdateUserRoleInput) {
    const targetUser = await this.repository.findUserById(targetUserId);
    if (!targetUser) {
      throw new AppError("Target user not found", 404);
    }

    // Privilege Escalation / Lockout Guard: Prevent demoting the last remaining active Admin
    if (targetUser.role === UserRole.ADMIN && input.role && input.role !== UserRole.ADMIN) {
      const activeAdmins = await this.repository.countActiveAdmins();
      if (activeAdmins <= 1) {
        throw new AppError("Action denied: Cannot revoke the last remaining active Admin role", 400);
      }
    }

    const updatedUser = await this.repository.updateUser(targetUserId, input);

    this.logAudit({
      adminId,
      action: "USER_ROLE_UPDATE",
      targetId: targetUserId,
      details: { previousRole: targetUser.role, newRole: updatedUser.role, input },
      timestamp: new Date(),
    });

    return updatedUser;
  }

  async updateUserStatus(adminId: string, targetUserId: string, input: UpdateUserStatusInput) {
    const targetUser = await this.repository.findUserById(targetUserId);
    if (!targetUser) {
      throw new AppError("Target user not found", 404);
    }

    // Lockout Guard: Cannot block/deactivate the last active Admin
    if (targetUser.role === UserRole.ADMIN && input.accountStatus !== "ACTIVE") {
      const activeAdmins = await this.repository.countActiveAdmins();
      if (activeAdmins <= 1) {
        throw new AppError("Action denied: Cannot deactivate or block the last remaining active Admin account", 400);
      }
    }

    const updatedUser = await this.repository.updateUserStatus(targetUserId, input.accountStatus);

    this.logAudit({
      adminId,
      action: "USER_STATUS_UPDATE",
      targetId: targetUserId,
      details: { previousStatus: targetUser.accountStatus, newStatus: input.accountStatus, reason: input.reason },
      timestamp: new Date(),
    });

    return updatedUser;
  }

  async getProducts(filters: ProductQueryFilters) {
    return this.repository.findProducts(filters);
  }

  async updateProduct(adminId: string, productId: string, input: UpdateProductInput) {
    const updatedProduct = await this.repository.updateProduct(productId, input);

    this.logAudit({
      adminId,
      action: "PRODUCT_MODERATION_UPDATE",
      targetId: productId,
      details: input,
      timestamp: new Date(),
    });

    return updatedProduct;
  }

  async deleteProduct(adminId: string, productId: string) {
    await this.repository.deleteProduct(productId);

    this.logAudit({
      adminId,
      action: "PRODUCT_DELETE",
      targetId: productId,
      timestamp: new Date(),
    });

    return { message: "Product deleted successfully by Admin" };
  }

  async getOrders(filters: OrderQueryFilters) {
    return this.repository.findOrders(filters);
  }

  async updateOrderStatus(adminId: string, orderId: string, input: UpdateOrderStatusInput) {
    const updatedOrder = await this.repository.updateOrderStatus(orderId, input.status);

    this.logAudit({
      adminId,
      action: "ORDER_STATUS_UPDATE",
      targetId: orderId,
      details: { newStatus: input.status },
      timestamp: new Date(),
    });

    return updatedOrder;
  }

  async getPayments(filters: PaymentQueryFilters) {
    return this.repository.findPayments(filters);
  }

  async getReviews(filters: ReviewQueryFilters) {
    return this.repository.findReviews(filters);
  }

  async updateReview(adminId: string, reviewId: string, input: UpdateReviewInput) {
    const updatedReview = await this.repository.updateReview(reviewId, input);

    this.logAudit({
      adminId,
      action: "REVIEW_MODERATION_UPDATE",
      targetId: reviewId,
      details: input,
      timestamp: new Date(),
    });

    return updatedReview;
  }

  async deleteReview(adminId: string, reviewId: string) {
    await this.repository.deleteReview(reviewId);

    this.logAudit({
      adminId,
      action: "REVIEW_DELETE",
      targetId: reviewId,
      timestamp: new Date(),
    });

    return { message: "Review deleted successfully by Admin" };
  }
}
