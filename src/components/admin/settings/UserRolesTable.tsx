"use client";

import React, { useState } from "react";
import { Users, UserPlus, Shield, CheckCircle2 } from "lucide-react";
import { StoreSettingsData } from "@/data/mockSettingsData";

interface UserRolesTableProps {
  users: StoreSettingsData["users"];
  onInviteUser: (name: string, email: string, role: StoreSettingsData["users"][0]["role"]) => void;
}

export function UserRolesTable({ users, onInviteUser }: UserRolesTableProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<StoreSettingsData["users"][0]["role"]>("MODERATOR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onInviteUser(name, email, role);
      setName("");
      setEmail("");
      setShowInviteModal(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Modal */}
      {showInviteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#FFFFFF",
              borderRadius: 16,
              padding: 24,
              width: "100%",
              maxWidth: 420,
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: "#171717" }}>Invite Admin Team Member</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh@ramanayam.com"
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666666" }}>Role Permission</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", fontSize: 13, background: "#FAF8F3", outline: "none" }}
              >
                <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                <option value="MERCHANT_ADMIN">Merchant Admin (Products & Orders)</option>
                <option value="MODERATOR">Review Moderator (Reviews only)</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", background: "#FFFFFF", fontSize: 13, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#F57C00", color: "#FFFFFF", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
              >
                Send Invite Email
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#171717" }}>Admin Users & Access Control</div>
        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            background: "#F57C00",
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <UserPlus size={14} /> Invite Member
        </button>
      </div>

      <div style={{ overflowX: "auto", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#FAF8F3", color: "#666666" }}>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>User Name</th>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>Email</th>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>Role</th>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "10px 12px", fontWeight: 600 }}>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#171717" }}>{u.name}</td>
                <td style={{ padding: "10px 12px", color: "#666666" }}>{u.email}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: u.role === "SUPER_ADMIN" ? "#701A75" : "#F57C00",
                      background: u.role === "SUPER_ADMIN" ? "rgba(112,26,117,0.1)" : "rgba(245,124,0,0.1)",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {u.role.replace("_", " ")}
                  </span>
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ fontSize: 11, color: "#16A34A", fontWeight: 600 }}>● {u.status}</span>
                </td>
                <td style={{ padding: "10px 12px", color: "#999999", fontSize: 12 }}>{u.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
