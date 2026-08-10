import type { Metadata } from "next";
import { FestivalsContent } from "@/features/festivals/components/FestivalsContent";

export const metadata: Metadata = {
  title: "Sacred Festivals & Seasonal Puja Bundles",
  description:
    "Explore curated puja samagri bundles for Diwali, Navratri, Ganesh Chaturthi, Janmashtami, and Durga Puja. Handcrafted offerings delivered for every auspicious occasion.",
  alternates: {
    canonical: "https://ramayanam.in/festivals",
  },
  openGraph: {
    title: "Sacred Festivals & Seasonal Puja Bundles | Ramanayam",
    description:
      "Celebrate India's sacred festivals with curated puja kits, brass diyas, and authentic temple offerings.",
    url: "https://ramayanam.in/festivals",
  },
};

export default function FestivalsPage() {
  return <FestivalsContent />;
}
