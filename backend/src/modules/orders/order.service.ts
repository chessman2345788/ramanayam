import { OrderRepository, OrderFilters } from "./order.repository";
import { CartService } from "../cart/cart.service";
import { AppError } from "../../common/errors";
import { formatPaginationResult, PaginationResult } from "../../components/pagination";
import { OrderStatus, PaymentStatus } from "@prisma/client";

/**
 * Valid order status transitions. Each key maps to the set of statuses
 * it is allowed to transition to. Terminal states have no outgoing edges.
 */
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
  [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.RETURNED],
  [OrderStatus.DELIVERED]: [OrderStatus.RETURNED],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.RETURNED]: [],
};

export class OrderService {
  constructor(
    private repository: OrderRepository,
    private cartService: CartService,
  ) {}

  /**
   * Creates an order from the user's active cart. Validates stock, prevents
   * duplicates, creates order + payment atomically, then clears the cart.
   */
  async createOrderFromCart(
    userId: string,
    data: { paymentProvider?: string; notes?: string } = {},
  ) {
    const cart = await this.cartService.getCart(userId);
    if (!cart.items || cart.items.length === 0) {
      throw new AppError("Cannot create an order from an empty cart", 400);
    }

    const estimatedTax = Number((cart.subtotal * 0.05).toFixed(2));
    const shipping = cart.subtotal > 0 ? 50 : 0;
    const finalTotal = Number((cart.subtotal + shipping + estimatedTax).toFixed(2));

    // Prevent duplicate checkout within a short window
    const duplicate = await this.repository.findRecentPendingOrder(userId, finalTotal);
    if (duplicate) {
      throw new AppError("A duplicate order was recently submitted. Please wait a moment.", 400);
    }

    // Validate inventory availability before order creation
    for (const item of cart.items) {
      if (item.availableStock < item.quantity) {
        throw new AppError(
          `Insufficient stock for "${item.variantName}". Please update your cart.`,
          400,
        );
      }
    }

    const orderItems = cart.items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = await this.repository.createOrderWithItems(
      userId,
      finalTotal,
      orderItems,
      data.paymentProvider || "STRIPE",
    );

    await this.cartService.clearCart(userId);
    return order;
  }

  async getCustomerOrders(
    userId: string,
    page: number,
    limit: number,
  ): Promise<PaginationResult<unknown>> {
    const skip = (page - 1) * limit;
    const { data, total } = await this.repository.findUserOrders(userId, skip, limit);
    return formatPaginationResult(data, total, page, limit);
  }

  /**
   * Fetches a single order for a customer. Enforces ownership —
   * customers can only view their own orders.
   */
  async getCustomerOrderById(userId: string, orderId: string) {
    const order = await this.repository.findOrderById(orderId);
    if (!order || order.userId !== userId) {
      throw new AppError("Order not found", 404);
    }
    return order;
  }

  /**
   * Cancels a customer's order. Only PENDING and CONFIRMED orders can be
   * cancelled. Status update and inventory restoration are atomic.
   */
  async cancelOrder(userId: string, orderId: string) {
    const order = await this.getCustomerOrderById(userId, orderId);

    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
      throw new AppError(
        `Cannot cancel order in "${order.status}" status. Only pending or confirmed orders can be cancelled.`,
        400,
      );
    }

    if (order.orderItems && order.orderItems.length > 0) {
      return this.repository.cancelOrderAndRestoreInventory(orderId, order.orderItems);
    }

    // Edge case: order with no items (shouldn't happen but safe fallback)
    return this.repository.updateOrderStatus(orderId, OrderStatus.CANCELLED);
  }

  // ──────────────────────────────────────────────
  // Admin Methods
  // ──────────────────────────────────────────────

  async getAdminOrders(
    filters: OrderFilters = {},
    page: number,
    limit: number,
  ): Promise<PaginationResult<unknown>> {
    const skip = (page - 1) * limit;
    const { data, total } = await this.repository.findAllOrders(filters, skip, limit);
    return formatPaginationResult(data, total, page, limit);
  }

  async getAdminOrderById(orderId: string) {
    const order = await this.repository.findOrderById(orderId);
    if (!order) throw new AppError("Order not found", 404);
    return order;
  }

  /**
   * Updates order status with lifecycle validation. Only transitions defined
   * in VALID_TRANSITIONS are permitted. Cancellation atomically restores inventory.
   */
  async updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    const order = await this.getAdminOrderById(orderId);
    const currentStatus = order.status as OrderStatus;

    const allowedTransitions = VALID_TRANSITIONS[currentStatus];
    if (!allowedTransitions || !allowedTransitions.includes(newStatus)) {
      throw new AppError(
        `Cannot transition order from "${currentStatus}" to "${newStatus}"`,
        400,
      );
    }

    // Atomic cancel with inventory restoration
    if (newStatus === OrderStatus.CANCELLED && order.orderItems && order.orderItems.length > 0) {
      return this.repository.cancelOrderAndRestoreInventory(orderId, order.orderItems);
    }

    return this.repository.updateOrderStatus(orderId, newStatus);
  }

  async updatePaymentStatus(
    orderId: string,
    status: PaymentStatus,
    transactionId?: string,
  ) {
    await this.getAdminOrderById(orderId);
    return this.repository.updatePaymentStatus(orderId, status, transactionId);
  }
}
