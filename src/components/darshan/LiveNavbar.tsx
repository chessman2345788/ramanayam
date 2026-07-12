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

export function LiveNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  
  // Connect to Zustand Stores
  const { itemCount: cartCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openSearch, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Shop Catalog', href: '/products' },
    { label: 'Live Darshan', href: '/live-darshan' },
    { label: 'Festivals', href: '/occasions' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-24 flex items-center transition-all duration-500 border-b backdrop-blur-xl",
          scrolled 
            ? "bg-[#090514]/80 border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] h-20" 
            : "bg-[#090514]/40 border-white/5"
        )}
      >
        <div className="max-w-[1440px] w-full mx-auto px-8 flex items-center justify-between h-full">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="inline-block">
              <motion.div 
                whileHover={{ scale: 1.05, filter: "brightness(1.25) drop-shadow(0 0 12px rgba(249, 115, 22, 0.5))" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <Image 
                  src="/logo-transparent.png" 
                  alt="Ramanayam" 
                  width={scrolled ? 75 : 85} 
                  height={scrolled ? 50 : 58} 
                  priority 
                  className="object-contain filter brightness-110 transition-all duration-500" 
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
                    color: active ? 'var(--accent)' : 'rgba(255,255,255,0.7)',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full scale-x-0 origin-left transition-transform duration-300",
                      active ? "scale-x-100 bg-accent" : "bg-white/40 group-hover:scale-x-100"
                    )}
                  />
                  {active && (
                    <motion.span 
                      layoutId="activeLiveNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--accent), var(--gold))' }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Icons and Mobile Toggle */}
          <div className="flex items-center justify-end gap-3 w-40 shrink-0">
            {/* Search */}
            <motion.button
              onClick={openSearch}
              whileHover={{ scale: 1.1, y: -2, backgroundColor: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.94 }}
              className="p-2.5 rounded-full cursor-pointer text-white/70 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300"
              aria-label="Search"
            >
              <Search size={15} />
            </motion.button>

            {/* Wishlist */}
            <Link href="/account?tab=wishlist" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.1, y: -2, backgroundColor: 'rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.94 }}
                className="relative p-2.5 rounded-full text-white/70 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300 block"
                aria-label="Wishlist"
              >
                <Heart size={15} />
                <AnimatePresence>
                  {wishlistItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[8px] font-bold rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: '#FFFFFF',
                        boxShadow: '0 0 10px rgba(249, 115, 22, 0.4)',
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
                whileHover={{ scale: 1.1, y: -2, backgroundColor: 'rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.94 }}
                className="relative p-2.5 rounded-full text-white/70 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300 block"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={15} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[8px] font-bold rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: '#FFFFFF',
                        boxShadow: '0 0 10px rgba(249, 115, 22, 0.4)',
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
                whileHover={{ scale: 1.1, y: -2, backgroundColor: 'rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.94 }}
                className="hidden sm:block p-2.5 rounded-full text-white/70 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300"
                aria-label="Account"
              >
                <User size={15} />
              </motion.a>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.92 }}
              className="inline-flex md:hidden transition-colors p-2.5 rounded-full cursor-pointer text-white/70 hover:text-white"
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
              className="fixed inset-0 z-50 bg-[#090514]/80 backdrop-blur-md md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.45 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#130926] border-l border-white/5 p-8 pt-28 md:hidden flex flex-col justify-between"
            >
              <div className="flex flex-col gap-8">
                <p className="text-[9px] uppercase tracking-[0.35em] font-bold pb-4 flex items-center gap-2 border-b border-white/6 text-gold">
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
                          color: active ? 'var(--accent)' : 'rgba(255,255,255,0.7)',
                        }}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-5 border-t border-white/6 pt-8">
                <Link
                  href="/account"
                  className="flex items-center gap-3.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white py-2"
                >
                  <User size={16} className="text-gold" />
                  My Account
                </Link>
                <div className="text-[8px] text-center text-white/30 uppercase tracking-[0.2em] mt-4">
                  © Ramanayam Spiritual Luxury
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
