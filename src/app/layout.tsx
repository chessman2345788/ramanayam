import type { Metadata } from "next";
import { cormorant, dmSans, jetbrainsMono, hind } from "./fonts";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { NotificationsProvider } from "@/components/admin/notifications/NotificationsContext";
import { ActivityProvider } from "@/components/admin/activity/ActivityContext";
import { SystemEventProvider } from "@/components/providers/SystemEventProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ramayanam.in"),
  title: {
    default: "Ramanayam — Sacred Rituals, Modern Living",
    template: "%s | Ramanayam",
  },
  description:
    "A premium spiritual lifestyle brand. Handcrafted puja essentials, artisan idols, brass diyas, rudraksha malas, and sacred décor — curated for the modern devotee. Delivered pan-India with reverence.",
  keywords: [
    "puja essentials",
    "spiritual lifestyle",
    "handcrafted idols",
    "brass diya",
    "rudraksha mala",
    "sacred decor",
    "premium puja",
    "Ramanayam",
    "temple products",
    "live darshan",
  ],
  authors: [{ name: "Ramanayam Spiritual Living" }],
  creator: "Ramanayam",
  publisher: "Ramanayam",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ramanayam — Sacred Rituals, Modern Living",
    description:
      "A premium spiritual lifestyle brand. Handcrafted puja essentials curated for the modern devotee.",
    url: "https://ramayanam.in",
    siteName: "Ramanayam",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramanayam — Sacred Rituals, Modern Living",
    description: "Handcrafted puja essentials curated for the modern devotee.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${hind.variable}`}
    >
      <body>
        <ReactQueryProvider>
          <NotificationsProvider>
            <ActivityProvider>
              <SystemEventProvider>
                <AppShell>{children}</AppShell>
              </SystemEventProvider>
            </ActivityProvider>
          </NotificationsProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
