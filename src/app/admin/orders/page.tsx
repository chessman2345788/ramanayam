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
  const [orders, setOrders] = useState<Order[]>(mockOrdersList);
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

  useEffect(() => {
    async function loadOrders() {
      try {
        const apiOrders = await OrderService.fetchAdminOrdersFromApi();
        if (apiOrders && apiOrders.length > 0) {
          const formatted: Order[] = apiOrders.map((o, idx) => ({
            id: o.id || `ORD-${idx + 100}`,
            customer: {
              id: `c-${idx}`,
              name: o.customerName,
              email: o.customerEmail,
              phone: "+91 98765 43210",
              totalOrders: 3,
              totalSpent: 4500,
              badge: "VIP",
              joinedDate: "2024-01-15",
            },
            shippingAddress: {
              name: o.customerName,
              phone: "+91 98765 43210",
              street: "Flat 402, Shri Krishna Complex",
              city: "Mathura",
              state: "Uttar Pradesh",
              pincode: "281001",
              country: "India",
            },
            billingAddress: {
              name: o.customerName,
              phone: "+91 98765 43210",
              street: "Flat 402, Shri Krishna Complex",
              city: "Mathura",
              state: "Uttar Pradesh",
              pincode: "281001",
              country: "India",
            },
            items: [
              {
                id: `item-${idx}`,
                productId: `p-${idx}`,
                name: "Brass Puja Diya",
                image: "/images/products/placeholder.jpg",
                sku: `SKU-${idx + 100}`,
                price: 750,
                quantity: 2,
                gstRate: 18,
                hsnCode: "7419",
                total: 1500,
              },
            ],
            itemsCount: o.itemsCount || 2,
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
            paymentMethod: "UPI",
            paymentStatus: o.paymentStatus as any,
            orderStatus: (o.orderStatus === "PENDING" ? "Confirmed" : o.orderStatus === "SHIPPED" ? "Shipped" : "Delivered") as any,
            transactionId: `TXN-${idx + 5000}`,
            date: new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            time: "10:30 AM",
            createdAtISO: o.createdAt,
            timeline: [],
            notes: [],
          }));
          setOrders(formatted);
        }
      } catch (err) {
        console.warn("Orders API fetch fallback to mock:", err);
      }
    }
    loadOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, nextStatus: OrderStatus) => {
    await OrderService.updateOrderStatusFromApi(orderId, nextStatus);
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: nextStatus } : ord))
    );
    showToast(`Order ${orderId} updated to ${nextStatus}.`);
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
