'use client';

import Link from 'next/link';
import Image from 'next/image';

export function MinimalFooter() {
  const quickLinks = [
    { label: 'Shop Catalog', href: '/products' },
    { label: 'Live Darshan', href: '/live-darshan' },
    { label: 'Festivals', href: '/occasions' },
    { label: 'My Account', href: '/account' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Support & FAQs', href: '#' },
  ];

  return (
    <footer className="w-full bg-[#0F0B1D] border-t border-white/5 py-8 mt-16 text-[#B8B8C5]">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col justify-between gap-6 h-full">
        {/* Top Section: Logo & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo-transparent.png" 
              alt="Ramanayam" 
              width={70} 
              height={48} 
              className="filter brightness-110 object-contain"
            />
            <div>
              <span className="text-white text-xs font-bold uppercase tracking-widest block font-serif">Ramanayam</span>
              <span className="text-[10px] text-[#B8B8C5]/50 block">Pure Ritual Luxury</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-wider hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#B8B8C5]/40 font-mono">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Ramanayam. All rights reserved. Delicately handcrafted for devotees worldwide.
          </div>

          <div className="flex items-center justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#B8B8C5]/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
