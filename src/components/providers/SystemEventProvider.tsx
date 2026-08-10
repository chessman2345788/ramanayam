"use client";

import React, { useEffect } from "react";
import { eventBus } from "@/services/event-bus.service";
import { useNotifications } from "@/components/admin/notifications/NotificationsContext";
import { useActivity } from "@/components/admin/activity/ActivityContext";
import { useAuthStore } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";

export function SystemEventProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useNotifications();
  const { addLog } = useActivity();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const currentUser = {
    name: user?.name || user?.email || "Executive Admin",
    email: user?.email || "admin@ramanayam.com",
    role: user?.role || "ADMIN",
    avatar: user?.profileImage || user?.avatarUrl || "/images/avatars/admin.png",
  };

  useEffect(() => {
    // 1. PRODUCT_ADDED
    const unsubscribeProductAdded = eventBus.on("PRODUCT_ADDED", (product: any) => {
      addNotification({
        category: "cms",
        priority: "medium",
        title: "New Product Added",
        description: `Product "${product.name || "New Item"}" was successfully published to the catalogue.`,
        relatedResource: {
          label: "View Products",
          href: "/admin/products",
          type: "product",
        },
      });

      addLog({
        user: currentUser,
        module: "Products",
        action: "Created",
        target: product.name || "Product",
        ipAddress: "127.0.0.1",
        severity: "low",
        status: "SUCCESS",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    });

    // 2. PRODUCT_UPDATED
    const unsubscribeProductUpdated = eventBus.on("PRODUCT_UPDATED", (product: any) => {
      addNotification({
        category: "cms",
        priority: "low",
        title: "Product Updated",
        description: `Details for product "${product.name || "Item"}" were modified.`,
        relatedResource: {
          label: "View Product",
          href: `/admin/products/${product.id}`,
          type: "product",
        },
      });

      addLog({
        user: currentUser,
        module: "Products",
        action: "Updated",
        target: product.name || `ID: ${product.id}`,
        ipAddress: "127.0.0.1",
        severity: "low",
        status: "SUCCESS",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", product.id] });
    });

    // 3. PRODUCT_DELETED
    const unsubscribeProductDeleted = eventBus.on("PRODUCT_DELETED", (product: any) => {
      addNotification({
        category: "cms",
        priority: "high",
        title: "Product Removed",
        description: `Product "${product.name || "Item"}" was permanently deleted.`,
        relatedResource: {
          label: "Products Catalogue",
          href: "/admin/products",
          type: "product",
        },
      });

      addLog({
        user: currentUser,
        module: "Products",
        action: "Deleted",
        target: product.name || `ID: ${product.id}`,
        ipAddress: "127.0.0.1",
        severity: "medium",
        status: "SUCCESS",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    });

    // 4. STOCK_UPDATED
    const unsubscribeStockUpdated = eventBus.on("STOCK_UPDATED", (data: any) => {
      const isLowStock = data.quantity <= (data.lowStockThreshold || 10);

      addNotification({
        category: "inventory",
        priority: isLowStock ? "high" : "low",
        title: isLowStock ? "Low Stock Warning" : "Inventory Quantity Updated",
        description: isLowStock
          ? `Stock for "${data.productName || "Variant"}" fell to ${data.quantity} units.`
          : `Stock for "${data.productName || "Variant"}" updated to ${data.quantity} units.`,
        relatedResource: {
          label: "Inventory List",
          href: "/admin/inventory",
          type: "product",
        },
      });

      addLog({
        user: currentUser,
        module: "Inventory",
        action: "Updated",
        target: data.productName || "Inventory Item",
        ipAddress: "127.0.0.1",
        severity: isLowStock ? "high" : "low",
        status: "SUCCESS",
      });

      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    });

    // 5. ORDER_CREATED
    const unsubscribeOrderCreated = eventBus.on("ORDER_CREATED", (order: any) => {
      addNotification({
        category: "orders",
        priority: "medium",
        title: "New Customer Order Placed",
        description: `Order #${order.orderNumber || order.id} received from ${order.customerName || "Devotee"} for ₹${order.totalAmount || 0}.`,
        relatedResource: {
          label: "Orders Management",
          href: "/admin/orders",
          type: "order",
        },
      });

      addLog({
        user: {
          name: order.customerName || "Customer",
          email: "customer@ramanayam.com",
          role: "CUSTOMER",
        },
        module: "Orders",
        action: "Created",
        target: `Order #${order.orderNumber || order.id}`,
        ipAddress: "127.0.0.1",
        severity: "low",
        status: "SUCCESS",
      });

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    });

    // 6. PAYMENT_VERIFIED
    const unsubscribePaymentVerified = eventBus.on("PAYMENT_VERIFIED", (payment: any) => {
      addNotification({
        category: "payments",
        priority: "medium",
        title: "Payment Received & Verified",
        description: `Payment for Order #${payment.orderId} verified successfully via Razorpay (${payment.paymentId}).`,
        relatedResource: {
          label: "Payment Logs",
          href: "/admin/orders",
          type: "system",
        },
      });

      addLog({
        user: {
          name: "Razorpay Gateway",
          email: "payments@razorpay.com",
          role: "SYSTEM",
        },
        module: "Payments",
        action: "Status Updated",
        target: `Payment: ${payment.paymentId}`,
        ipAddress: "127.0.0.1",
        severity: "low",
        status: "SUCCESS",
      });

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    });

    return () => {
      unsubscribeProductAdded();
      unsubscribeProductUpdated();
      unsubscribeProductDeleted();
      unsubscribeStockUpdated();
      unsubscribeOrderCreated();
      unsubscribePaymentVerified();
    };
  }, [addNotification, addLog, currentUser, queryClient]);

  return <>{children}</>;
}
