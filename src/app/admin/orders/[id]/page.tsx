"use client";

import React, { useState } from "react";
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
import {
  ArrowLeft,
  Printer,
  Truck,
  RefreshCw,
  Plus,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  // Find order in mock dataset or fallback to first order
  const initialOrder = mockOrdersList.find((o) => o.id === orderId) || mockOrdersList[0];
  const [order, setOrder] = useState<Order>(initialOrder);

  // Modals state
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isCourierOpen, setIsCourierOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  const handleStatusChange = (newStatus: OrderStatus) => {
    const newTimelineEvent = {
      id: `t-edit-${Date.now()}`,
      title: `Status set to ${newStatus}`,
      status: newStatus,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      actor: "Admin (Operations)",
      note: `Updated manually from Order Details page.`,
    };

    setOrder((prev) => ({
      ...prev,
      orderStatus: newStatus,
      timeline: [newTimelineEvent, ...prev.timeline],
    }));
  };

  const handleAssignCourier = (tracking: TrackingInfo) => {
    setOrder((prev) => ({
      ...prev,
      orderStatus: "Shipped",
      trackingInfo: tracking,
    }));
  };

  const handleConfirmRefund = () => {
    setOrder((prev) => ({
      ...prev,
      orderStatus: "Refunded",
      paymentStatus: "Refunded",
    }));
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

    setOrder((prev) => ({
      ...prev,
      notes: [noteObj, ...prev.notes],
    }));
    setNewNoteText("");
  };

  return (
    <div className="space-y-5 pb-16">
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
