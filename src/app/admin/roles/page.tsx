"use client";

import React, { useState } from "react";
import { RolesProvider, useRoles } from "@/components/admin/roles/RolesContext";
import { RolesHeader } from "@/components/admin/roles/RolesHeader";
import { RoleSummaryCards } from "@/components/admin/roles/RoleSummaryCards";
import { RolesTable } from "@/components/admin/roles/RolesTable";
import { RoleCard } from "@/components/admin/roles/RoleCard";
import { InviteDialog } from "@/components/admin/roles/InviteDialog";
import { LayoutGrid, List } from "lucide-react";
import { AdminSearchBar, AdminPagination, AdminToast } from "@/components/admin/ui";

function RolesContent() {
  const { roles, staff, deleteRole, duplicateRole, exportRolesData } = useRoles();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredRoles = roles.filter((role) => {
    const term = search.toLowerCase();
    return (
      role.name.toLowerCase().includes(term) ||
      role.description.toLowerCase().includes(term) ||
      role.id.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredRoles.length / pageSize) || 1;
  const paginatedRoles = filteredRoles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 pb-12">
      <AdminToast message={toastMsg} onClose={() => setToastMsg(null)} />

      <RolesHeader
        onOpenInvite={() => setIsInviteOpen(true)}
        onExport={() => {
          exportRolesData();
          showToast("Exported role matrix data.");
        }}
      />

      <RoleSummaryCards roles={roles} staff={staff} />

      {/* Filter and View Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <AdminSearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setCurrentPage(1);
          }}
          placeholder="Search roles by name or description..."
        />

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === "table" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <List className="w-4 h-4" /> Table
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
          </div>
        </div>
      </div>

      {/* Role List Views */}
      {viewMode === "table" ? (
        <RolesTable
          roles={paginatedRoles}
          staff={staff}
          onDuplicate={(id) => {
            duplicateRole(id);
            showToast(`Role ${id} duplicated.`);
          }}
          onDelete={(id) => {
            deleteRole(id);
            showToast(`Role ${id} deleted.`);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedRoles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              assignedStaff={staff.filter((s) => s.roleId === role.id)}
              onDuplicate={(id) => {
                duplicateRole(id);
                showToast(`Role ${id} duplicated.`);
              }}
              onDelete={(id) => {
                deleteRole(id);
                showToast(`Role ${id} deleted.`);
              }}
            />
          ))}
        </div>
      )}

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredRoles.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      <InviteDialog isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
    </div>
  );
}

export default function RolesPage() {
  return (
    <RolesProvider>
      <RolesContent />
    </RolesProvider>
  );
}
