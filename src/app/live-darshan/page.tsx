import type { Metadata } from "next";
import { LiveDarshanContent } from "@/features/live-darshan/components/LiveDarshanContent";

export const metadata: Metadata = {
  title: "Live Temple Darshan & Virtual Aarti Stream",
  description:
    "Experience 24/7 live temple darshan, interactive live prayer chat, and scheduled daily aarti streaming directly from sacred shrines.",
  alternates: {
    canonical: "https://ramayanam.in/live-darshan",
  },
  openGraph: {
    title: "Live Temple Darshan & Virtual Aarti | Ramanayam",
    description:
      "Join thousands of devotees in live streaming temple darshan, prayer chants, and virtual aarti.",
    url: "https://ramayanam.in/live-darshan",
  },
};

export default function LiveDarshanPage() {
  return <LiveDarshanContent />;
}
