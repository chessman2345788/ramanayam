import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";


const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/* Yatra One is not a variable font — needs weight specified */
const yatraOne = localFont({
  src: "./fonts/YatraOne-Regular.ttf",
  variable: "--font-yatra-one",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ramanayam — Pure Ritual Products | Sacred E-Commerce",
  description:
    "Bring the Divine Home. Premium puja essentials, handcrafted idols, brass diyas, rudraksha malas, and spiritual decor. Delivered pan-India with love.",
  keywords: [
    "puja essentials",
    "ritual products",
    "brass diya",
    "incense sticks",
    "rudraksha mala",
    "idol",
    "spiritual decor",
    "online puja shop",
    "Ramanayam",
  ],
  openGraph: {
    title: "Ramanayam — Pure Ritual Products",
    description: "Bring the Divine Home. Premium puja essentials delivered pan-India.",
    type: "website",
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
      data-theme="chandan"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${yatraOne.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <AppShell>{children}</AppShell>

      </body>
    </html>
  );
}
