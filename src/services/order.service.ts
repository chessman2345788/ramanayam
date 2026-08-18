import { axiosClient } from "@/lib/api-axios";
import { eventBus } from "@/services/event-bus.service";

export interface AdminOrderItem {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED" | "PAID";
  orderStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
  itemsCount: number;
  createdAt: string;
  rawOrder?: any;
}

export const OrderService = {
  fetchAdminOrdersFromApi: async (params?: Record<string, any>): Promise<AdminOrderItem[]> => {
    try {
      const res = await axiosClient.get("/orders/admin", { params: { limit: 100, ...params } });
      const payload = res.data?.data || res.data;
      const rawList = payload?.items || payload?.orders || payload?.data || (Array.isArray(payload) ? payload : []);

      if (Array.isArray(rawList)) {
        return rawList.map((o: any) => {
          const user = o.user || {};
          const paymentObj = o.payments?.[0] || {};
          const userName = user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : (o.customerName || "Devotee");

          return {
            id: o.id,
            orderNumber: o.orderNumber || o.id.slice(0, 8).toUpperCase(),
            userId: o.userId || user.id || "",
            customerName: userName,
            customerEmail: user.email || o.customerEmail || "devotee@ramayanam.in",
            totalAmount: Number(o.totalAmount || o.total || 0),
            paymentStatus: paymentObj.status || o.paymentStatus || "PENDING",
            orderStatus: o.status || o.orderStatus || "PENDING",
            itemsCount: Array.isArray(o.orderItems) ? o.orderItems.length : (o.itemsCount || 1),
            createdAt: o.createdAt || new Date().toISOString(),
            rawOrder: o,
          };
        });
      }
      return [];
    } catch (err: any) {
      console.warn("Orders API fetch error:", err.message);
      return [];
    }
  },

  fetchAdminOrderByIdFromApi: async (orderId: string): Promise<any> => {
    const res = await axiosClient.get(`/orders/admin/${orderId}`);
    return res.data?.data?.order || res.data?.order || res.data?.data || res.data;
  },

  updateOrderStatusFromApi: async (id: string, status: string): Promise<boolean> => {
    const res = await axiosClient.patch(`/orders/admin/${id}/status`, { status });
    return Boolean(res.data);
  },

  updatePaymentStatusFromApi: async (id: string, paymentStatus: string): Promise<boolean> => {
    const res = await axiosClient.patch(`/orders/admin/${id}/payment-status`, { status: paymentStatus });
    return Boolean(res.data);
  },

  placeOrder: async (orderData: any): Promise<any> => {
    const res = await axiosClient.post("/orders", orderData);
    const orderResult = res.data?.data?.order || res.data?.order || res.data?.data || res.data;

    eventBus.emit("ORDER_CREATED", {
      id: orderResult.id,
      orderNumber: orderResult.orderNumber || orderResult.id,
      totalAmount: orderResult.totalAmount || 0,
      customerName: orderResult.customerName || "Devotee",
    });

    return {
      success: true,
      orderId: orderResult.id,
      order: orderResult,
    };
  },
};
