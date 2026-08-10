'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';

const NAV_LINKS = [
  { label: 'Home',         href: '/home' },
  { label: 'Shop',         href: '/products' },
  { label: 'Live Darshan', href: '/live-darshan' },
  { label: 'Festivals',    href: '/festivals' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartCount = useCartStore(s => s.items.reduce((a, i) => a + i.qty, 0));
  const openDrawer = useCartStore(s => s.openDrawer);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const handleSearch = (e?: React.FormEvent, term?: string) => {
    if (e) e.preventDefault();
    const q = term ?? searchQuery;
    if (q.trim()) {
      setSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(q.trim())}`);
    }
  };

  const isLight    = true;

  const iconColor  = isLight ? 'rgba(26,15,10,0.7)'  : 'rgba(245,230,208,0.65)';
  const hoverColor = '#E8660A';

  return (
    <>
      <header style={{
        position:        'fixed',
        top: 0, left: 0, right: 0,
        zIndex:          100,
        height:          72,
        backgroundColor: scrolled ? 'rgba(253,250,246,0.96)' : 'rgba(245,240,232,0.85)',
        backdropFilter:  'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        borderBottom:    scrolled ? '0.5px solid rgba(26,15,10,0.08)' : 'none',
        transition:      'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}>
        <div style={{
          maxWidth: 1540, margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* LEFT — Logo + Wordmark */}
          <Link href="/home" style={{
            display: 'flex', alignItems: 'center', gap: 12,
            flexShrink: 0, textDecoration: 'none',
          }}>
            <Image
              src="/logo-transparent.png"
              alt="Ramanayam"
              width={38} height={38}
              priority
              style={{ objectFit: 'contain' }}
            />
            <span style={{
              fontFamily:    '"Cormorant Garamond", Georgia, serif',
              fontSize:      23,
              fontWeight:    600,
              letterSpacing: '-0.01em',
              color:         '#1A0F0A',
              transition:    'color 0.3s ease',
              userSelect:    'none',
            }}>
              Ramanayam
            </span>
          </Link>

          {/* CENTER — Nav links (Desktop) */}
          <nav className="hidden md:flex" style={{
            alignItems: 'center', justifyContent: 'center',
            gap: 44,
          }}>
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href ||
                (href === '/home' && pathname === '/') ||
                (href === '/products' && pathname.startsWith('/products'));
              return (
                <Link key={href} href={href} style={{
                  position:       'relative',
                  fontSize:       14,
                  fontWeight:     active ? 600 : 400,
                  letterSpacing:  '0.01em',
                  color:          active ? '#E8660A' : 'rgba(26,15,10,0.65)',
                  textDecoration: 'none',
                  transition:     'color 0.2s ease',
                }}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT — 3 icons + Mobile toggle */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 20 }}>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', padding: 4,
                display: 'flex', color: iconColor,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
            >
              <Search size={19} strokeWidth={1.75} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" aria-label="Wishlist" style={{
              display: 'flex', padding: 4,
              color: iconColor, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
            >
              <Heart size={19} strokeWidth={1.75} />
            </Link>

            {/* Cart — opens drawer */}
            <button
              onClick={openDrawer}
              aria-label={`Cart, ${cartCount} items`}
              style={{
                position: 'relative', background: 'none', border: 'none',
                cursor: 'pointer', padding: 4,
                display: 'flex', color: iconColor,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
            >
              <ShoppingBag size={19} strokeWidth={1.75} />

              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1,   opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  style={{
                    position:       'absolute',
                    top: -5, right: -6,
                    minWidth:       18, height: 18,
                    borderRadius:   9,
                    background:     '#E8660A',
                    color:          'white',
                    fontSize:       10, fontWeight: 700,
                    display:        'flex',
                    alignItems:     'center', justifyContent: 'center',
                    padding:        '0 4px',
                    lineHeight:     1,
                    pointerEvents:  'none',
                    boxShadow:      '0 2px 6px rgba(232,102,10,0.4)',
                  }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(m => !m)}
              aria-label="Toggle navigation menu"
              className="md:hidden"
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', padding: 4,
                display: 'flex', color: iconColor,
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
              background: '#FAF8F3',
              borderBottom: '1px solid rgba(26,15,10,0.12)',
              padding: '24px 32px',
              display: 'flex', flexDirection: 'column', gap: 16,
              boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
            }}
            className="md:hidden"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || (href === '/home' && pathname === '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: active ? 600 : 500,
                    color: active ? '#E8660A' : '#1A0F0A',
                    textDecoration: 'none',
                    padding: '8px 0',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.target === e.currentTarget && setSearchOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(26,15,10,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', paddingTop: 140,
              paddingLeft: 24, paddingRight: 24,
            }}
          >
            <button onClick={() => setSearchOpen(false)} style={{
              position: 'absolute', top: 24, right: 32,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(245,230,208,0.5)', display: 'flex',
            }}>
              <X size={20} />
            </button>

            <p style={{
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: 24,
            }}>Search Ramanayam</p>

            <form
              onSubmit={(e) => handleSearch(e)}
              style={{ position: 'relative', width: '100%', maxWidth: 540 }}
            >
              <Search size={17} style={{
                position: 'absolute', left: 18, top: '50%',
                transform: 'translateY(-50%)', color: '#E8660A',
                pointerEvents: 'none',
                zIndex: 2,
              }} />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Agarbatti, Brass Diya, Rudraksha..."
                style={{
                  width: '100%', height: 54,
                  paddingLeft: 50, paddingRight: 44,
                  borderRadius: 14,
                  background: 'rgba(253,250,246,0.12)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#F5E6D0', fontSize: 16,
                  outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute', right: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: 'rgba(245,230,208,0.6)', cursor: 'pointer',
                    display: 'flex', padding: 4, zIndex: 2,
                  }}
                  aria-label="Clear search input"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: 8, marginTop: 18, justifyContent: 'center',
            }}>
              {['Agarbatti', 'Brass Diya', 'Ganesh Murti', 'Rudraksha', 'Puja Thali'].map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSearch(undefined, term)}
                  style={{
                    padding: '6px 14px', borderRadius: 20,
                    background: 'rgba(253,250,246,0.08)',
                    border: '0.5px solid rgba(245,230,208,0.2)',
                    color: 'rgba(245,230,208,0.65)',
                    fontSize: 13, cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(232,102,10,0.2)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(253,250,246,0.08)';
                    e.currentTarget.style.color = 'rgba(245,230,208,0.65)';
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
