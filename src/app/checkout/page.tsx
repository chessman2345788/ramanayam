import type { Metadata } from "next";
import { CheckoutContent } from "@/features/checkout/components/CheckoutContent";

export const metadata: Metadata = {
  title: "Secured Checkout | Ramanayam",
  description: "Complete your sacred order securely with encrypted checkout.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
