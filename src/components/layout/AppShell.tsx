"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LogoSplash } from "@/components/animations/LogoSplash";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { CursorEffect } from "@/components/ui/CursorEffect";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { PageTransition } from "@/components/animations/PageTransition";
import { AnimatePresence } from "framer-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLiveDarshan = pathname === "/live-darshan";

  return (
    <>
      <AmbientBackground />
      <CursorEffect />
      <SmoothScroll />
      <LogoSplash />
      {!isLiveDarshan && <Navbar />}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </main>
      {!isLiveDarshan && <Footer />}
    </>
  );
}


