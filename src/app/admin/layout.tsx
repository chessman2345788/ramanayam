import React from "react";
import { AdminLayoutClient } from "@/components/admin/layouts/AdminLayoutClient";
import { AuthGuard } from "@/components/admin/auth/AuthGuard";

export const metadata = {
  title: "Admin Portal | Ramanayam",
  description: "Ramanayam Executive E-commerce & Temple Management Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AuthGuard>
  );
}
