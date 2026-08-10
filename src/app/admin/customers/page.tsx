"use client";

import React, { useState, useMemo } from "react";
import { mockCustomersList } from "@/data/mockCustomersData";
import { Customer, CustomerFilterOptions } from "@/types/customers";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CustomerSummaryCards } from "@/components/admin/customers/CustomerSummaryCards";
import { CustomerFilters } from "@/components/admin/customers/CustomerFilters";
import { CustomersTable } from "@/components/admin/customers/CustomersTable";
import { EditCustomerModal } from "@/components/admin/customers/EditCustomerModal";
import { ImportCustomersModal } from "@/components/admin/customers/ImportCustomersModal";
import { Download, UploadCloud } from "lucide-react";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomersList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<CustomerFilterOptions>({
    searchQuery: "",
    status: "ALL",
    customerType: "ALL",
    sortBy: "newest",
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveCustomer = (updated: Partial<Customer>) => {
    if (!editCustomer) return;
    setCustomers((prev) =>
      prev.map((c) => (c.id === editCustomer.id ? { ...c, ...updated } : c))
    );
    setEditCustomer(null);
    showToast(`Customer ${editCustomer.name} updated successfully.`);
  };

  const handleBlockToggle = (customer: Customer) => {
    const nextStatus = customer.status === "Blocked" ? "Active" : "Blocked";
    setCustomers((prev) =>
      prev.map((c) => (c.id === customer.id ? { ...c, status: nextStatus } : c))
    );
    showToast(`Customer ${customer.name} status changed to ${nextStatus}.`);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm(`Are you sure you want to delete customer ${id}?`)) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      showToast(`Customer ${id} deleted.`);
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers
      .filter((c) => {
        if (filters.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          const matchName = c.name.toLowerCase().includes(q);
          const matchEmail = c.email.toLowerCase().includes(q);
          const matchPhone = c.phone.includes(q);
          const matchId = c.id.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchPhone && !matchId) return false;
        }

        if (filters.status !== "ALL" && c.status !== filters.status) return false;
        if (filters.customerType !== "ALL" && c.customerType !== filters.customerType) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "oldest") return a.joinedDate.localeCompare(b.joinedDate);
        if (filters.sortBy === "highest_spending") return b.totalSpent - a.totalSpent;
        if (filters.sortBy === "most_orders") return b.ordersCount - a.ordersCount;
        return b.joinedDate.localeCompare(a.joinedDate);
      });
  }, [customers, filters]);

  const totalPages = Math.ceil(filteredCustomers.length / pageSize) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, currentPage, pageSize]);

  const handleExportCSV = () => {
    const headers = "Customer ID,Name,Email,Phone,Status,Type,Orders,Total Spent,Joined Date\n";
    const rows = filteredCustomers
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.status}","${c.customerType}",${c.ordersCount},${c.totalSpent},"${c.joinedDate}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ramanayam_customers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast("Exported customer records to CSV.");
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      <AdminPageHeader
        title="Customers & Devotees"
        subtitle="Manage customer profiles, orders, and engagement history."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsImportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Import Customers</span>
            </button>
          </div>
        }
      />

      <CustomerSummaryCards
        customers={customers}
        activeFilter={filters.status}
        onFilterClick={(st) => setFilters((f) => ({ ...f, status: st }))}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <AdminSearchBar
          value={filters.searchQuery}
          onChange={(q) => {
            setFilters((f) => ({ ...f, searchQuery: q }));
            setCurrentPage(1);
          }}
          placeholder="Search by name, email, phone, or customer ID..."
        />
        <CustomerFilters
          filters={filters}
          onFilterChange={(up) => {
            setFilters((f) => ({ ...f, ...up }));
            setCurrentPage(1);
          }}
          onReset={() => {
            setFilters({ searchQuery: "", status: "ALL", customerType: "ALL", sortBy: "newest" });
            setCurrentPage(1);
          }}
        />
      </div>

      <CustomersTable
        customers={paginatedCustomers}
        selectedIds={selectedIds}
        onSelectToggle={(id) =>
          setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
        }
        onSelectAllToggle={() =>
          setSelectedIds(
            selectedIds.length === paginatedCustomers.length ? [] : paginatedCustomers.map((c) => c.id)
          )
        }
        onEditClick={setEditCustomer}
        onBlockClick={handleBlockToggle}
        onDeleteClick={handleDeleteCustomer}
      />

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredCustomers.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      <EditCustomerModal
        isOpen={!!editCustomer}
        customer={editCustomer}
        onClose={() => setEditCustomer(null)}
        onSave={handleSaveCustomer}
      />
      <ImportCustomersModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportComplete={(count) => showToast(`Successfully imported ${count} customers!`)}
      />
    </div>
  );
}
