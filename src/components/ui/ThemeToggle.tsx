"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "agni";

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl transition-colors duration-300 cursor-pointer"
      style={{
        color: "var(--nav-icon-text)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--nav-icon-hover)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent-muted)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--nav-icon-text)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      }}
      aria-label={isDark ? "Switch to Chandan Light theme" : "Switch to Agni Dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Sun size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Moon size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
