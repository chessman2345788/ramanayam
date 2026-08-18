"use client";

import React, { useState } from "react";
import { UserPlus, Search, X, Check } from "lucide-react";
import { StaffUserItem } from "@/data/mockRolesData";

interface AssignUserDialogProps {
  isOpen: boolean;
  roleName: string;
  allStaffUsers: StaffUserItem[];
  currentAssignedUserIds: string[];
  onSaveAssignments: (assignedUserIds: string[]) => void;
  onClose: () => void;
}

export function AssignUserDialog({
  isOpen,
  roleName,
  allStaffUsers,
  currentAssignedUserIds,
  onSaveAssignments,
  onClose,
}: AssignUserDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(currentAssignedUserIds);
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = allStaffUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs" onClick={onClose} />

      {/* Dialog Body */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              Assign Staff Users to "{roleName}"
            </h3>
            <p className="text-xs text-stone-500">Select team members to grant this role's permissions</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search staff name or email..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 outline-none focus:border-amber-600"
          />
        </div>

        {/* Staff List */}
        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
          {filtered.map((u) => {
            const isAssigned = selectedIds.includes(u.id);
            return (
              <div
                key={u.id}
                onClick={() => toggleSelect(u.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isAssigned
                    ? "bg-amber-50/60 border-amber-200"
                    : "bg-white border-stone-200/80 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-stone-200" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">{u.name}</div>
                    <div className="text-[10px] text-stone-400">{u.email}</div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  isAssigned ? "bg-amber-600 border-amber-600 text-white" : "border-stone-300 bg-white"
                }`}>
                  {isAssigned && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onSaveAssignments(selectedIds);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            Save User Assignments
          </button>
        </div>
      </div>
    </div>
  );
}
