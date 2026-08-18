import { axiosClient } from "@/lib/api-axios";
import { eventBus } from "@/services/event-bus.service";

export interface CreateRazorpayOrderPayload {
  amount?: number;
  currency?: string;
  receipt?: string;
  orderId?: string;
}

export interface VerifyRazorpayPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId?: string;
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const PaymentService = {
  createRazorpayOrder: async (payload: CreateRazorpayOrderPayload) => {
    const res = await axiosClient.post("/payments/create-order", payload);
    const data = res.data?.data?.order || res.data?.order || res.data;
    return {
      key_id: data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      order_id: data.id || data.order_id,
      amount: data.amount,
      currency: data.currency || "INR",
    };
  },

  verifyPayment: async (payload: VerifyRazorpayPaymentPayload) => {
    const res = await axiosClient.post("/payments/verify", payload);
    eventBus.emit("PAYMENT_VERIFIED", {
      orderId: payload.orderId || payload.razorpay_order_id,
      paymentId: payload.razorpay_payment_id,
    });
    return {
      success: true,
      verified: true,
      data: res.data?.data || res.data,
    };
  },
};
