"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "agni" | "chandan";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "chandan",
  toggleTheme: () => {},
});

const STORAGE_KEY = "ramanayam-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("chandan");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "agni" || stored === "chandan") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "agni" ? "chandan" : "agni";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);

      // Add smooth transition class briefly
      document.documentElement.classList.add("theme-transition");
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 400);

      return next;
    });
  }, []);

  // Prevent flash: don't render children until mounted
  // The data-theme is already set on <html> via the layout default
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
