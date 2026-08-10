import type { Metadata } from "next";
import { AccountContent } from "@/features/account/components/AccountContent";

export const metadata: Metadata = {
  title: "Account Dashboard | Orders, Wishlist & Reminders",
  description:
    "Manage your sacred order history, saved addresses, festival reminders, and wishlist at Ramanayam.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return <AccountContent />;
}
