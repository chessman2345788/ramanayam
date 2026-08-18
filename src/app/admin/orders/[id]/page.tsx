"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockOrdersList } from "@/data/mockOrdersData";
import { Order, OrderStatus, TrackingInfo, OrderNote } from "@/types/orders";
import { StatusBadge } from "@/components/admin/orders/StatusBadge";
import { CustomerCard } from "@/components/admin/orders/CustomerCard";
import { PaymentCard } from "@/components/admin/orders/PaymentCard";
import { TrackingCard } from "@/components/admin/orders/TrackingCard";
import { OrderTimeline } from "@/components/admin/orders/OrderTimeline";
import { OrderProductsTable } from "@/components/admin/orders/OrderProductsTable";
import { InvoiceModal } from "@/components/admin/orders/InvoiceModal";
import { AssignCourierModal } from "@/components/admin/orders/AssignCourierModal";
import { RefundModal } from "@/components/admin/orders/RefundModal";
import Link from "next/link";
import { OrderService } from "@/services/order.service";
import { AdminToast } from "@/components/admin/ui";
import {
  ArrowLeft,
  Printer,
  Truck,
  RefreshCw,
  Plus,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modals state
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCourierOpen, setIsCourierOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadOrderDetails = async () => {
    if (!orderId) return;
    setIsLoading(true);
    try {
      const raw = await OrderService.fetchAdminOrderByIdFromApi(orderId);
      if (raw) {
        const user = raw.user || {};
        const paymentObj = raw.payments?.[0] || {};
        const customerName = user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Devotee";

        let orderStatus: OrderStatus = "Pending";
        switch (raw.status) {
          case "CONFIRMED":
            orderStatus = "Confirmed";
            break;
          case "PROCESSING":
            orderStatus = "Packed";
            break;
          case "SHIPPED":
            orderStatus = "Shipped";
            break;
          case "DELIVERED":
            orderStatus = "Delivered";
            break;
          case "CANCELLED":
            orderStatus = "Cancelled";
            break;
          case "RETURNED":
            orderStatus = "Returned";
            break;
          default:
            orderStatus = "Pending";
        }

        const items = Array.isArray(raw.orderItems)
          ? raw.orderItems.map((item: any, idx: number) => {
              const pv = item.productVariant || {};
              const p = pv.product || {};
              return {
                id: item.id || `item-${idx}`,
                productId: p.id || pv.productId || "",
                productName: p.name || "Sacred Item",
                variantName: pv.variantName || pv.sku || "Standard",
                sku: pv.sku || `SKU-${idx}`,
                image: "/images/products/placeholder.jpg",
                price: Number(item.price || 0),
                quantity: item.quantity || 1,
                total: Number(item.price || 0) * (item.quantity || 1),
                gstRate: 18,
              };
            })
          : [];

        const formatted: Order = {
          id: raw.id,
          customer: {
            id: raw.userId || user.id || "c-0",
            name: customerName,
            email: user.email || "devotee@ramayanam.in",
            phone: user.phone || "+91 98765 43210",
            totalOrders: 1,
            totalSpent: Number(raw.totalAmount || 0),
            badge: "Regular",
            joinedDate: "2024-01-15",
          },
          shippingAddress: {
            name: customerName,
            street: "123 Temple Road",
            city: "Varanasi",
            state: "Uttar Pradesh",
            pincode: "221001",
            country: "India",
            phone: user.phone || "+91 98765 43210",
          },
          billingAddress: {
            name: customerName,
            street: "123 Temple Road",
            city: "Varanasi",
            state: "Uttar Pradesh",
            pincode: "221001",
            country: "India",
            phone: user.phone || "+91 98765 43210",
          },
          items,
          itemsCount: items.length,
          subtotal: Number(raw.totalAmount || 0),
          shippingCharges: 0,
          gstSummary: {
            subtotal: Number(raw.totalAmount || 0),
            cgst: 0,
            sgst: 0,
            igst: 0,
            totalTax: 0,
          },
          discountSummary: { amount: 0 },
          totalAmount: Number(raw.totalAmount || 0),
          paymentMethod: paymentObj.provider || "RAZORPAY",
          paymentStatus: (paymentObj.status === "SUCCESS" ? "Paid" : paymentObj.status === "REFUNDED" ? "Refunded" : "Pending") as any,
          orderStatus,
          transactionId: paymentObj.transactionId || `TXN-${raw.id.slice(0, 8)}`,
          date: new Date(raw.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          time: new Date(raw.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          createdAtISO: raw.createdAt,
          timeline: [
            {
              id: "t-1",
              title: "Order Placed",
              status: "Pending",
              timestamp: new Date(raw.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
              date: new Date(raw.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
              actor: customerName,
              note: "Order created successfully in database.",
            },
          ],
          notes: [],
        };
        setOrder(formatted);
      }
    } catch (err: any) {
      console.error("Failed to load order details:", err);
      showToast("Order not found or backend API error.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    const backendStatusMap: Record<string, string> = {
      Pending: "PENDING",
      Confirmed: "CONFIRMED",
      Processing: "PROCESSING",
      Shipped: "SHIPPED",
      Delivered: "DELIVERED",
      Cancelled: "CANCELLED",
      Returned: "RETURNED",
    };
    const backendStatus = backendStatusMap[newStatus] || newStatus.toUpperCase();

    try {
      await OrderService.updateOrderStatusFromApi(orderId, backendStatus);
      showToast(`Order status updated to ${newStatus}.`);
      await loadOrderDetails();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Status update failed.";
      showToast(`Transition Error: ${errMsg}`);
    }
  };

  const handleAssignCourier = (tracking: TrackingInfo) => {
    setOrder((prev) => (prev ? { ...prev, orderStatus: "Shipped", trackingInfo: tracking } : null));
  };

  const handleConfirmRefund = () => {
    setOrder((prev) => (prev ? { ...prev, orderStatus: "Refunded", paymentStatus: "Refunded" } : null));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const noteObj: OrderNote = {
      id: `n-${Date.now()}`,
      author: "Admin (Operations)",
      text: newNoteText.trim(),
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setOrder((prev) => (prev ? { ...prev, notes: [noteObj, ...prev.notes] } : null));
    setNewNoteText("");
  };

  if (isLoading || !order) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
        <p className="text-sm font-semibold text-stone-700">Loading order details from database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-16">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/admin/orders" className="hover:text-[#F57C00] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Orders</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-mono font-bold text-gray-900">{order.id}</span>
        </div>

        {/* Global Details Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#F57C00]" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={() => setIsCourierOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold shadow-xs"
          >
            <Truck className="w-4 h-4 text-[#F57C00]" />
            <span>Assign Courier</span>
          </button>
          {order.paymentStatus === "Paid" && (
            <button
              onClick={() => setIsRefundOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refund Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Title & Status Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono text-gray-900">{order.id}</h1>
            <StatusBadge status={order.orderStatus} type="order" />
            <StatusBadge status={order.paymentStatus} type="payment" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Placed on <strong className="text-gray-800">{order.date}</strong> at{" "}
            <strong className="text-gray-800">{order.time}</strong> • Via {order.paymentMethod}
          </p>
        </div>

        {/* Change Order Status Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">Update Status:</span>
          <select
            value={order.orderStatus}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F57C00]/30 focus:border-[#F57C00] cursor-pointer"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Left Details vs Right Context Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (Products & Order Notes) */}
        <div className="lg:col-span-2 space-y-5">
          <OrderProductsTable
            items={order.items}
            subtotal={order.subtotal}
            shippingCharges={order.shippingCharges}
            gstSummary={order.gstSummary}
            discountSummary={order.discountSummary}
            totalAmount={order.totalAmount}
          />

          {/* Order Notes Section */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <MessageSquare className="w-5 h-5 text-[#F57C00]" />
              <h3 className="font-semibold text-gray-900 text-sm">Staff & Internal Notes</h3>
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add internal staff note for this order..."
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#F57C00]"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 px-3.5 py-2 bg-[#F57C00] hover:bg-[#E06D00] text-white text-xs font-semibold rounded-xl shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Note</span>
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {order.notes.map((note) => (
                <div key={note.id} className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 text-xs">
                  <div className="flex justify-between items-center text-gray-500 mb-1">
                    <span className="font-semibold text-gray-800">{note.author}</span>
                    <span className="font-mono text-[11px]">{note.date} • {note.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Customer, Payment, Tracking, Timeline) */}
        <div className="space-y-5">
          <CustomerCard
            customer={order.customer}
            shippingAddress={order.shippingAddress}
            billingAddress={order.billingAddress}
          />
          <PaymentCard
            method={order.paymentMethod}
            status={order.paymentStatus}
            transactionId={order.transactionId}
            paymentDate={order.paymentDate}
            totalAmount={order.totalAmount}
            onRefundClick={() => setIsRefundOpen(true)}
          />
          <TrackingCard
            trackingInfo={order.trackingInfo}
            onAssignCourier={() => setIsCourierOpen(true)}
          />
          <OrderTimeline events={order.timeline} />
        </div>
      </div>

      {/* Modals */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        order={order}
        onClose={() => setIsInvoiceOpen(false)}
      />
      <AssignCourierModal
        isOpen={isCourierOpen}
        orderId={order.id}
        onClose={() => setIsCourierOpen(false)}
        onAssign={handleAssignCourier}
      />
      <RefundModal
        isOpen={isRefundOpen}
        order={order}
        onClose={() => setIsRefundOpen(false)}
        onConfirmRefund={handleConfirmRefund}
      />
    </div>
  );
}
