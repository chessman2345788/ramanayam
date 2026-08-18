"use client";

import React, { useState, useEffect, useMemo } from "react";
import { mockOrdersList } from "@/data/mockOrdersData";
import { Order, OrderFilterOptions, OrderStatus } from "@/types/orders";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { OrderSummaryCards } from "@/components/admin/orders/OrderSummaryCards";
import { OrderFilters } from "@/components/admin/orders/OrderFilters";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { BulkUpdateModal } from "@/components/admin/orders/BulkUpdateModal";
import { AssignCourierModal } from "@/components/admin/orders/AssignCourierModal";
import { RefundModal } from "@/components/admin/orders/RefundModal";
import { InvoiceModal } from "@/components/admin/orders/InvoiceModal";
import { Layers } from "lucide-react";
import { OrderService } from "@/services/order.service";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);
  const [assignCourierOrder, setAssignCourierOrder] = useState<Order | null>(null);
  const [refundOrder, setRefundOrder] = useState<Order | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<OrderFilterOptions>({
    searchQuery: "",
    orderStatus: "ALL",
    paymentStatus: "ALL",
    paymentMethod: "ALL",
    dateRange: "ALL",
    sortBy: "newest",
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const reloadOrders = async () => {
    setIsLoading(true);
    try {
      const apiOrders = await OrderService.fetchAdminOrdersFromApi();
      if (apiOrders && apiOrders.length > 0) {
        const formatted: Order[] = apiOrders.map((o: any, idx) => {
          const raw = o.rawOrder || {};
          const paymentObj = raw.payments?.[0] || {};

          let orderStatus: OrderStatus = "Pending";
          switch (o.orderStatus) {
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

          return {
            id: o.id,
            customer: {
              id: o.userId || `c-${idx}`,
              name: o.customerName,
              email: o.customerEmail,
              phone: "+91 98765 43210",
              totalOrders: 1,
              totalSpent: o.totalAmount,
              badge: "Regular",
              joinedDate: "2024-01-15",
            },
            shippingAddress: {
              name: o.customerName,
              street: "123 Temple Road",
              city: "Varanasi",
              state: "Uttar Pradesh",
              pincode: "221001",
              country: "India",
              phone: "+91 98765 43210",
            },
            billingAddress: {
              name: o.customerName,
              street: "123 Temple Road",
              city: "Varanasi",
              state: "Uttar Pradesh",
              pincode: "221001",
              country: "India",
              phone: "+91 98765 43210",
            },
            items: [],
            itemsCount: o.itemsCount || 1,
            subtotal: o.totalAmount,
            shippingCharges: 0,
            gstSummary: {
              subtotal: o.totalAmount,
              cgst: 0,
              sgst: 0,
              igst: 0,
              totalTax: 0,
            },
            discountSummary: {
              amount: 0,
            },
            totalAmount: o.totalAmount,
            paymentMethod: paymentObj.provider || "RAZORPAY",
            paymentStatus: (paymentObj.status === "SUCCESS" ? "Paid" : paymentObj.status === "REFUNDED" ? "Refunded" : "Pending") as any,
            orderStatus,
            transactionId: paymentObj.transactionId || `TXN-${o.id.slice(0, 8)}`,
            date: new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            time: new Date(o.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
            createdAtISO: o.createdAt,
            timeline: [],
            notes: [],
          };
        });
        setOrders(formatted);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      console.error("Failed to load orders from API:", err);
      showToast("Failed to load orders from database.");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reloadOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, nextStatus: OrderStatus) => {
    const backendStatusMap: Record<string, string> = {
      Pending: "PENDING",
      Confirmed: "CONFIRMED",
      Packed: "PROCESSING",
      Processing: "PROCESSING",
      Shipped: "SHIPPED",
      Delivered: "DELIVERED",
      Cancelled: "CANCELLED",
      Returned: "RETURNED",
    };

    const backendStatus = backendStatusMap[nextStatus] || nextStatus.toUpperCase();

    try {
      await OrderService.updateOrderStatusFromApi(orderId, backendStatus);
      showToast(`Order status updated to ${nextStatus}.`);
      await reloadOrders();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Status transition failed.";
      showToast(`Transition Error: ${errMsg}`);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!o.id.toLowerCase().includes(q) && !o.customer.name.toLowerCase().includes(q)) return false;
      }
      return true;
    }).sort((a, b) => b.createdAtISO.localeCompare(a.createdAtISO));
  }, [orders, filters]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      <AdminPageHeader
        title="Orders & Fulfillment"
        subtitle="Manage, process, and track customer orders in real time."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBulkOpen(true)}
              disabled={selectedIds.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Bulk Update ({selectedIds.length})</span>
            </button>
          </div>
        }
      />

      <OrderSummaryCards orders={orders} activeFilter={filters.orderStatus} onFilterClick={(st) => setFilters((f) => ({ ...f, orderStatus: st }))} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <AdminSearchBar
          value={filters.searchQuery}
          onChange={(q) => setFilters((f) => ({ ...f, searchQuery: q }))}
          placeholder="Search orders by ID or customer name..."
        />
        <OrderFilters filters={filters} onFilterChange={(up) => setFilters((f) => ({ ...f, ...up }))} onReset={() => setFilters({ searchQuery: "", orderStatus: "ALL", paymentStatus: "ALL", paymentMethod: "ALL", dateRange: "ALL", sortBy: "newest" })} />
      </div>

      <OrdersTable
        orders={paginatedOrders}
        selectedIds={selectedIds}
        onSelectToggle={(id) => setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))}
        onSelectAllToggle={() => setSelectedIds(selectedIds.length === paginatedOrders.length ? [] : paginatedOrders.map((o) => o.id))}
        onStatusUpdate={handleStatusUpdate}
        onOpenInvoice={setActiveInvoiceOrder}
        onAssignCourier={setAssignCourierOrder}
        onOpenRefund={setRefundOrder}
      />

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredOrders.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      <BulkUpdateModal isOpen={isBulkOpen} selectedCount={selectedIds.length} onClose={() => setIsBulkOpen(false)} onConfirm={() => setSelectedIds([])} />
      <InvoiceModal isOpen={!!activeInvoiceOrder} order={activeInvoiceOrder} onClose={() => setActiveInvoiceOrder(null)} />
      <AssignCourierModal isOpen={!!assignCourierOrder} orderId={assignCourierOrder?.id || ""} onClose={() => setAssignCourierOrder(null)} onAssign={() => setAssignCourierOrder(null)} />
      <RefundModal isOpen={!!refundOrder} order={refundOrder} onClose={() => setRefundOrder(null)} onConfirmRefund={() => setRefundOrder(null)} />
    </div>
  );
}
