import { create } from "zustand";

interface UIStore {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  isMegaMenuOpen: boolean;
  activeMegaMenuCategory: string | null;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  setMegaMenu: (category: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  isMegaMenuOpen: false,
  activeMegaMenuCategory: null,

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((s) => ({ isCartDrawerOpen: !s.isCartDrawerOpen })),

  setMegaMenu: (category) =>
    set({ isMegaMenuOpen: category !== null, activeMegaMenuCategory: category }),
}));
