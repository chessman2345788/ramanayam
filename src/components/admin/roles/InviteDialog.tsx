"use client";

import React, { useState } from "react";
import { Mail, UserPlus, X, ShieldCheck } from "lucide-react";
import { useRoles } from "./RolesContext";

interface InviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteDialog({ isOpen, onClose }: InviteDialogProps) {
  const { roles, inviteStaff } = useRoles();
  const [email, setEmail] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id || "");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedRoleId) return;
    inviteStaff(email, selectedRoleId);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Invite Staff Member</h3>
              <p className="text-xs text-stone-500">Send an invitation to join admin dashboard.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-stone-900">Invitation Sent!</h4>
            <p className="text-xs text-stone-500">An invitation email has been sent to {email}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="colleague@ramanayam.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Assign Role
              </label>
              <select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 bg-white transition-all"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.permissionsCount} perms)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-lg shadow-sm transition-all"
              >
                Send Invitation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
