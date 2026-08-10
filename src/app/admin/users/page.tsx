"use client";

import { useState } from "react";
import { Users, Shield, Lock, Unlock } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { mockAdminCustomers, AdminCustomer } from "@/data/mockAdminData";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>(mockAdminCustomers);

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
