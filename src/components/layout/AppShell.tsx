"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { PageTransition } from "@/components/animations/PageTransition";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { useState, useEffect } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("ramanayam-visited")) {
        setShowSplash(true);
      }
    } catch {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem("ramanayam-visited", "true");
    } catch {}
  };

  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <main id="main-content" style={{ minHeight: "100vh" }}>
        {children}
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 9999,
          background: "var(--saffron)",
          color: "white",
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        Skip to main content
      </a>
      <SmoothScroll />
      {/* Subtle paper texture overlay */}
      <div className="noise-overlay" />

      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <Navbar />
      <main id="main-content" className="flex-1 w-full relative z-10 min-h-screen">
        <AnimatePresence mode="wait" initial={true}>
          <PageTransition key={pathname}>{children}</PageTransition>
        </AnimatePresence>
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}
