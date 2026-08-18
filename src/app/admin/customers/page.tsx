"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Customer, CustomerFilterOptions } from "@/types/customers";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CustomerSummaryCards } from "@/components/admin/customers/CustomerSummaryCards";
import { CustomerFilters } from "@/components/admin/customers/CustomerFilters";
import { CustomersTable } from "@/components/admin/customers/CustomersTable";
import { EditCustomerModal } from "@/components/admin/customers/EditCustomerModal";
import { ImportCustomersModal } from "@/components/admin/customers/ImportCustomersModal";
import { Download, UploadCloud } from "lucide-react";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";
import { AdminService } from "@/services/admin.service";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
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

  /** Map UI sort to backend sortBy/sortOrder */
  const getSortParams = (sortBy: string) => {
    switch (sortBy) {
      case "oldest":
        return { sortBy: "createdAt", sortOrder: "asc" };
      case "newest":
      default:
        return { sortBy: "createdAt", sortOrder: "desc" };
    }
  };

  /** Map UI status filter to backend accountStatus enum */
  const getStatusParam = (status: string): string | undefined => {
    switch (status) {
      case "Active":
        return "ACTIVE";
      case "Blocked":
        return "BLOCKED";
      case "Inactive":
        return "INACTIVE";
      case "Pending":
        return "PENDING";
      default:
        return undefined;
    }
  };

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const sortParams = getSortParams(filters.sortBy);
      const params: Record<string, any> = {
        page: currentPage,
        limit: pageSize,
        sortBy: sortParams.sortBy,
        sortOrder: sortParams.sortOrder,
        role: "CUSTOMER", // Only show customers, not admins/vendors
      };

      if (filters.searchQuery) params.search = filters.searchQuery;

      const statusParam = getStatusParam(filters.status);
      if (statusParam) params.accountStatus = statusParam;

      const result = await AdminService.fetchUsersFromApi(params);

      if (result.data && result.data.length > 0) {
        const formatted: Customer[] = result.data.map((u: any) => {
          let status: Customer["status"] = "Active";
          switch (u.accountStatus) {
            case "BLOCKED":
              status = "Blocked";
              break;
            case "INACTIVE":
              status = "Blocked";
              break;
            case "PENDING":
              status = "Guest";
              break;
            default:
              status = u.emailVerified ? "Active" : "Active";
          }

          return {
            id: u.id,
            name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email,
            email: u.email,
            phone: u.phone || "",
            status,
            isVerified: u.emailVerified ?? false,
            isGuest: false,
            customerType: "Retail" as const,
            ordersCount: u._count?.orders || 0,
            totalSpent: 0,
            avgOrderValue: 0,
            joinedDate: new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            lastOrderDate: undefined,
            addresses: [],
            recentOrders: [],
            wishlist: [],
            reviews: [],
            couponsUsed: [],
            recentlyViewed: [],
            timeline: [],
          };
        });
        setCustomers(formatted);
      } else {
        setCustomers([]);
      }

      setTotalItems(result.total);
      setTotalPages(result.totalPages);
    } catch (err: any) {
      console.error("Failed to load customers from API:", err);
      showToast("Failed to load customers from database.");
      setCustomers([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, filters]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleSaveCustomer = async (updated: Partial<Customer>) => {
    if (!editCustomer) return;
    try {
      const apiData: Record<string, any> = {};
      if (updated.name) {
        const parts = updated.name.split(" ");
        apiData.firstName = parts[0] || "";
        apiData.lastName = parts.slice(1).join(" ") || "";
      }

      await AdminService.updateUserFromApi(editCustomer.id, apiData);
      setEditCustomer(null);
      showToast(`Customer ${editCustomer.name} updated successfully.`);
      await loadCustomers();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Update failed.";
      showToast(`Update Error: ${errMsg}`);
    }
  };

  const handleBlockToggle = async (customer: Customer) => {
    const nextStatus = customer.status === "Blocked" ? "ACTIVE" : "BLOCKED";
    const action = nextStatus === "BLOCKED" ? "block" : "unblock";

    if (nextStatus === "BLOCKED" && !confirm(`Are you sure you want to block ${customer.name}? They will be unable to log in or place orders.`)) {
      return;
    }

    try {
      await AdminService.updateUserStatusFromApi(customer.id, nextStatus, `Admin ${action} action`);
      showToast(`Customer ${customer.name} has been ${action}ed.`);
      await loadCustomers();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || "Status update failed.";
      showToast(`Error: ${errMsg}`);
    }
  };

  const handleDeleteCustomer = (_id: string) => {
    showToast("Customer deletion is not supported. Use Block to restrict access.");
  };

  const handleExportCSV = () => {
    const headers = "Customer ID,Name,Email,Phone,Status,Type,Orders,Total Spent,Joined Date\n";
    const rows = customers
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
        onFilterClick={(st) => {
          setFilters((f) => ({ ...f, status: st }));
          setCurrentPage(1);
        }}
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
        customers={customers}
        selectedIds={selectedIds}
        onSelectToggle={(id) =>
          setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
        }
        onSelectAllToggle={() =>
          setSelectedIds(
            selectedIds.length === customers.length ? [] : customers.map((c) => c.id)
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
        totalItems={totalItems}
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
