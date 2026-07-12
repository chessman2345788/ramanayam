'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, User, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useUIStore } from '@/store/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Connect to Zustand Stores
  const { itemCount: cartCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const {
    isSearchOpen,
    isMobileMenuOpen,
    openSearch,
    closeSearch,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
  } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSearch, closeSearch]);

  // Close mobile menu on page transition
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  const navLinks = [
    { label: 'Shop Catalog', href: '/products' },
    { label: 'Live Darshan', href: '/live-darshan' },
    { label: 'Festivals', href: '/occasions' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-100 h-24 flex items-center transition-all duration-500 border-b backdrop-blur-xl",
          scrolled 
            ? "bg-(--nav-bg-scrolled) border-(--border-subtle) shadow-(--shadow-md) h-20" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full h-full">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="inline-block">
              <motion.div 
                whileHover={{ scale: 1.05, filter: "brightness(1.15)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <Image
                  src="/logo-transparent.png"
                  alt="Ramanayam"
                  width={scrolled ? 75 : 85}
                  height={scrolled ? 50 : 58}
                  priority
                  className="object-contain transition-all duration-500"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center justify-center gap-10 flex-1">
            {navLinks.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative text-[10px] uppercase tracking-[0.3em] font-bold transition-all py-2 duration-300 font-serif"
                  style={{
                    color: active ? 'var(--nav-text-active)' : 'var(--nav-text)',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--nav-text-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--nav-text)';
                  }}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full scale-x-0 origin-left transition-transform duration-300",
                      active ? "scale-x-100 bg-accent" : "bg-(--text-muted) group-hover:scale-x-100"
                    )}
                  />
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'var(--nav-indicator)' }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Icons and Mobile Toggle */}
          <div className="flex items-center justify-end gap-2.5 shrink-0">
            {/* Theme Toggle widget */}
            <ThemeToggle />

            {/* Search */}
            <motion.button
              onClick={openSearch}
              whileHover={{ scale: 1.08, y: -1, backgroundColor: 'var(--accent-muted)' }}
              whileTap={{ scale: 0.94 }}
              className="p-2.5 rounded-full cursor-pointer text-(--nav-icon-text) hover:text-(--nav-icon-hover) border border-transparent transition-all duration-300"
              aria-label="Search"
            >
              <Search size={15} />
            </motion.button>

            {/* Wishlist */}
            <Link href="/account?tab=wishlist" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.08, y: -1, backgroundColor: 'var(--accent-muted)' }}
                whileTap={{ scale: 0.94 }}
                className="relative p-2.5 rounded-full text-(--nav-icon-text) hover:text-(--nav-icon-hover) border border-transparent transition-all duration-300 block"
                aria-label="Wishlist"
              >
                <Heart size={15} />
                <AnimatePresence>
                  {wishlistItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[8px] font-bold rounded-full flex items-center justify-center shadow-md bg-accent text-white"
                      style={{
                        boxShadow: '0 0 10px rgba(245, 124, 0, 0.3)',
                      }}
                    >
                      {wishlistItems.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            </Link>

            {/* Cart */}
            <Link href="/cart" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.08, y: -1, backgroundColor: 'var(--accent-muted)' }}
                whileTap={{ scale: 0.94 }}
                className="relative p-2.5 rounded-full text-(--nav-icon-text) hover:text-(--nav-icon-hover) border border-transparent transition-all duration-300 block"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={15} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[8px] font-bold rounded-full flex items-center justify-center shadow-md bg-accent text-white"
                      style={{
                        boxShadow: '0 0 10px rgba(245, 124, 0, 0.3)',
                      }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            </Link>

            {/* Account */}
            <Link href="/account" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.08, y: -1, backgroundColor: 'var(--accent-muted)' }}
                whileTap={{ scale: 0.94 }}
                className="hidden sm:block p-2.5 rounded-full text-(--nav-icon-text) hover:text-(--nav-icon-hover) border border-transparent transition-all duration-300"
                aria-label="Account"
              >
                <User size={15} />
              </motion.a>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.92 }}
              className="inline-flex md:hidden transition-colors p-2.5 rounded-full cursor-pointer text-(--nav-icon-text) hover:text-(--nav-icon-hover)"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-110 backdrop-blur-md md:hidden bg-black/45"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              className="fixed top-0 right-0 bottom-0 z-120 w-80 p-8 pt-28 md:hidden flex flex-col justify-between bg-(--bg-page) border-l border-(--border-subtle) shadow-(--shadow-lg)"
            >
              <div className="flex flex-col gap-8">
                <p className="text-[9px] uppercase tracking-[0.35em] font-bold pb-4 flex items-center gap-2 text-accent border-b border-(--border-subtle)">
                  <Sparkles size={11} className="text-accent" />
                  Sacred Portal
                </p>
                <div className="flex flex-col gap-5">
                  {navLinks.map(({ label, href }) => {
                    const active = pathname === href || pathname.startsWith(href + '/');
                    return (
                      <Link
                        key={href}
                        href={href}
                        className="text-sm uppercase tracking-[0.2em] font-serif font-bold transition-all py-1"
                        style={{
                          color: active ? 'var(--accent)' : 'var(--text-secondary)',
                        }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-5 pt-8 border-t border-(--border-subtle)">
                <Link
                  href="/account"
                  className="flex items-center gap-3.5 text-xs font-bold uppercase tracking-wider text-(--text-secondary) hover:text-accent py-2"
                >
                  <User size={16} className="text-accent" />
                  My Account
                </Link>
                <div className="text-[8px] text-center text-(--text-muted) uppercase tracking-[0.2em] mt-4">
                  © Ramanayam Spiritual Luxury
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-130 backdrop-blur-2xl flex flex-col items-center justify-start pt-36 px-6 bg-(--bg-page)/95"
          >
            {/* Close */}
            <button
              onClick={closeSearch}
              className="absolute top-8 right-8 p-3 hover:rotate-90 text-(--text-secondary) hover:text-accent transition-all duration-500 cursor-pointer"
              aria-label="Close search"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="w-full max-w-2xl text-center">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[9px] uppercase tracking-[0.35em] font-bold text-accent mb-6 font-serif"
              >
                Search Holy Collections
              </motion.p>

              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="relative w-full"
              >
                <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" />
                <input
                  autoFocus
                  placeholder="Search agarbatti, brass idols, clay diyas..."
                  className="w-full h-16 pl-16 pr-6 rounded-2xl text-sm focus:outline-none transition-all bg-(--input-bg) border border-(--input-border) text-(--text-primary) focus:border-accent"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2.5 mt-10 justify-center"
              >
                {['Agarbatti', 'Brass Diya', 'Ganesh Murti', 'Rudraksha Mala', 'Puja Thali', 'Camphor'].map(term => (
                  <button
                    key={term}
                    className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 bg-(--bg-elevated) border border-(--border-subtle) text-(--text-secondary) hover:border-accent hover:text-accent"
                  >
                    {term}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
