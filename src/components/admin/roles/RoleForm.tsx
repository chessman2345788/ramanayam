"use client";

import React from "react";
import { Shield, UserCheck, ShoppingBag, Package, Tag, Gift, MessageSquare, Layout, Users } from "lucide-react";
import { RoleStatus } from "@/types/roles";

interface RoleFormProps {
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  iconName: string;
  setIconName: (v: string) => void;
  status: RoleStatus;
  setStatus: (v: RoleStatus) => void;
  disabled?: boolean;
}

const colorPresets = [
  { name: "Saffron Accent", hex: "#F57C00" },
  { name: "Deep Maroon", hex: "#701A75" },
  { name: "Emerald Green", hex: "#16A34A" },
  { name: "Sky Blue", hex: "#0284C7" },
  { name: "Amber Gold", hex: "#D97706" },
  { name: "Rose Crimson", hex: "#BE185D" },
  { name: "Royal Purple", hex: "#4C1D95" },
  { name: "Slate Grey", hex: "#6B7280" },
];

const iconList = [
  { name: "ShieldCheck", icon: Shield },
  { name: "UserCheck", icon: UserCheck },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Package", icon: Package },
  { name: "Tag", icon: Tag },
  { name: "Gift", icon: Gift },
  { name: "MessageSquare", icon: MessageSquare },
  { name: "Layout", icon: Layout },
  { name: "Users", icon: Users },
];

export function RoleForm({
  name,
  setName,
  description,
  setDescription,
  color,
  setColor,
  iconName,
  setIconName,
  status,
  setStatus,
  disabled = false,
}: RoleFormProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
      <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
        <Shield className="w-4 h-4 text-amber-700" /> Role General Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Role Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            disabled={disabled}
            placeholder="e.g. Senior Order Manager"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 transition-all disabled:bg-stone-50"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            disabled={disabled}
            value={status}
            onChange={(e) => setStatus(e.target.value as RoleStatus)}
            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 bg-white transition-all disabled:bg-stone-50"
          >
            <option value="ACTIVE">ACTIVE (Access Granted)</option>
            <option value="DISABLED">DISABLED (Access Suspended)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
          Description
        </label>
        <textarea
          rows={2}
          disabled={disabled}
          placeholder="Brief description of the role responsibilities and permission scope..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 transition-all disabled:bg-stone-50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Role Theme Color
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {colorPresets.map((c) => (
              <button
                key={c.hex}
                type="button"
                disabled={disabled}
                onClick={() => setColor(c.hex)}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  color === c.hex ? "scale-125 border-stone-900 shadow-sm" : "border-white hover:scale-110"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Role Badge Icon
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {iconList.map((ic) => {
              const IconComp = ic.icon;
              const isSelected = iconName === ic.name;
              return (
                <button
                  key={ic.name}
                  type="button"
                  disabled={disabled}
                  onClick={() => setIconName(ic.name)}
                  className={`p-1.5 rounded-lg border text-xs transition-all ${
                    isSelected
                      ? "bg-amber-100 border-amber-500 text-amber-900 shadow-xs"
                      : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
