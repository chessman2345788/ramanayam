import type { Metadata } from "next";
import { CartContent } from "@/features/cart/components/CartContent";

export const metadata: Metadata = {
  title: "Your Sacred Basket | Shopping Cart",
  description:
    "Review your selected handcrafted idols, organic incense, and sacred temple offerings before secure checkout.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return <CartContent />;
}
