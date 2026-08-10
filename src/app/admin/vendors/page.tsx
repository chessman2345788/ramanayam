"use client";

import { useState } from "react";
import { Store, CheckCircle, AlertCircle } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable, Column } from "@/components/admin/AdminTable";
import { mockAdminVendors, AdminVendor } from "@/data/mockAdminData";

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<AdminVendor[]>(mockAdminVendors);

  const toggleVerification = (id: string) => {
    setVendors(
      vendors.map((v) => (v.id === id ? { ...v, verified: !v.verified } : v))
    );
  };

  const columns: Column<AdminVendor>[] = [
    {
      header: "Vendor Business",
      accessor: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "var(--bg-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-secondary)",
            }}
          >
            <Store size={18} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{item.businessName}</p>
              {item.verified && <CheckCircle size={14} color="#16A34A" />}
            </div>
            <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>Owner: {item.ownerName}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: (item) => (
        <div>
          <p style={{ margin: 0, fontSize: 12 }}>{item.email}</p>
          <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>{item.phone}</p>
        </div>
      ),
    },
    {
      header: "Products",
      accessor: (item) => <span style={{ fontWeight: 600 }}>{item.productsCount} items</span>,
    },
    {
      header: "Total Payout",
      accessor: (item) => (
        <span style={{ fontWeight: 600, color: "var(--accent-saffron)" }}>
          ₹{item.totalPayout.toLocaleString()}
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
            background: item.status === "ACTIVE" ? "#DCFCE7" : "#FEF3C7",
            color: item.status === "ACTIVE" ? "#15803D" : "#B45309",
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
        title="Artisan Vendors Portal"
        subtitle={`Managing ${vendors.length} registered artisan cooperatives and vendors.`}
      />

      <AdminTable
        data={vendors}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search vendor by business name or email..."
        searchField={(item) => `${item.businessName} ${item.email}`}
        actions={(item) => (
          <button
            onClick={() => toggleVerification(item.id)}
            style={{
              height: 28,
              padding: "0 10px",
              borderRadius: 6,
              border: "1px solid var(--border)",
              background: "#FFFFFF",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {item.verified ? "Unverify" : "Verify Vendor"}
          </button>
        )}
      />
    </div>
  );
}
