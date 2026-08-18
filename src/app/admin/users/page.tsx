"use client";

import React, { useState, useEffect } from "react";
import { Users, Shield, Lock, Unlock } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { AdminCustomer } from "@/data/mockAdminData";
import { AdminService } from "@/services/admin.service";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      try {
        const result = await AdminService.fetchUsersFromApi();
        const apiUsers = result.data;
        if (apiUsers && apiUsers.length > 0) {
          const formatted: AdminCustomer[] = apiUsers.map((u: any) => ({
            id: u.id,
            name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email,
            email: u.email,
            phone: u.phone || "+91 98765 43210",
            role: u.role || "CUSTOMER",
            ordersCount: u._count?.orders || 0,
            totalSpent: 0,
            status: u.accountStatus || "ACTIVE",
            joinedDate: new Date(u.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
          }));
          setCustomers(formatted);
        } else {
          setCustomers([]);
        }
      } catch (err) {
        console.error("Failed to load users from API:", err);
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, []);

  const toggleStatus = (id: string) => {
    setCustomers(
      customers.map((c) =>
        c.id === id ? { ...c, status: c.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" } : c
      )
    );
  };

  const columns: Column<AdminCustomer>[] = [
    {
      header: "Customer",
      accessor: (item) => (
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{item.name}</p>
          <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>{item.email}</p>
        </div>
      ),
    },
    {
      header: "Phone",
      accessor: (item) => <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{item.phone}</span>,
    },
    {
      header: "Role",
      accessor: (item) => (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            background: item.role === "ADMIN" ? "rgba(245, 124, 0, 0.1)" : "rgba(0,0,0,0.04)",
            color: item.role === "ADMIN" ? "var(--accent-saffron)" : "var(--text-secondary)",
          }}
        >
          {item.role}
        </span>
      ),
    },
    {
      header: "Orders",
      accessor: (item) => <span style={{ fontWeight: 600 }}>{item.ordersCount} orders</span>,
    },
    {
      header: "Total Spent",
      accessor: (item) => (
        <span style={{ fontWeight: 600, color: "var(--accent-saffron)" }}>
          ₹{item.totalSpent.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 600,
            background: item.status === "ACTIVE" ? "#DCFCE7" : "#FEE2E2",
            color: item.status === "ACTIVE" ? "#15803D" : "#DC2626",
          }}
        >
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <AdminPageHeader
        title="Customer Directory"
        subtitle={`Managing ${customers.length} registered customer accounts.`}
      />

      <AdminTable
        data={customers}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search customer by name, email, or phone..."
        searchField={(item) => `${item.name} ${item.email} ${item.phone}`}
        actions={(item) => (
          <button
            onClick={() => toggleStatus(item.id)}
            style={{
              height: 28,
              padding: "0 10px",
              borderRadius: 6,
              border: item.status === "ACTIVE" ? "1px solid #FEE2E2" : "1px solid #DCFCE7",
              background: item.status === "ACTIVE" ? "#FEF2F2" : "#F0FDF4",
              color: item.status === "ACTIVE" ? "#DC2626" : "#15803D",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {item.status === "ACTIVE" ? <Lock size={12} /> : <Unlock size={12} />}
            <span>{item.status === "ACTIVE" ? "Block" : "Unblock"}</span>
          </button>
        )}
      />
    </div>
  );
}
