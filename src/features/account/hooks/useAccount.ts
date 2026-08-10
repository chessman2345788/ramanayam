import { useState } from "react";
import { useWishlistStore } from "@/store/wishlist";

export type Tab = "orders" | "wishlist" | "addresses" | "reminders" | "settings";

export function useAccount() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const { items: wishlistItems } = useWishlistStore();
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({
    "Ganesh Chaturthi": true,
    "Navratri": false,
    "Diwali": true,
  });

  const toggleReminder = (festival: string) => {
    setReminders((prev) => ({ ...prev, [festival]: !prev[festival] }));
  };

  return {
    activeTab,
    setActiveTab,
    wishlistItems,
    reminders,
    toggleReminder,
  };
}
export default useAccount;
