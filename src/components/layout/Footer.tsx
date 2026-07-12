'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Instagram = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export function Footer() {
  return (
    <footer
      className="relative z-10 w-full overflow-hidden border-t border-(--border-subtle) bg-(--footer-bg) text-(--footer-text) py-10 max-h-[220px] flex flex-col justify-center"
    >
      {/* Background vignette blur */}
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full filter blur-[100px] pointer-events-none opacity-20 bg-accent/20"
      />

      <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col gap-6">
          {/* Top row: Logo, Tagline, Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-(--border-subtle) pb-4">
            <div className="flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left">
              <Link href="/" className="inline-block shrink-0">
                <motion.div
                  whileHover={{ scale: 1.03, filter: "brightness(1.15)" }}
                  className="flex items-center"
                >
                  <Image
                    src="/logo-transparent.png"
                    alt="Ramanayam"
                    width={55}
                    height={38}
                    className="object-contain"
                  />
                </motion.div>
              </Link>
              <span className="text-[10px] uppercase tracking-[0.25em] text-(--text-muted) font-medium font-serif">
                Modern Spiritual Luxury
              </span>
            </div>

            {/* Quick Links */}
            <nav className="flex gap-x-6 text-[8px] uppercase tracking-[0.25em] font-bold font-serif">
              {[
                { label: 'Shop', href: '/products' },
                { label: 'Live Darshan', href: '/live-darshan' },
                { label: 'Festivals', href: '/occasions' },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-accent transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -1, color: 'var(--accent)' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-(--text-muted) hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bottom row: Legal & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[8px] uppercase tracking-[0.2em] font-medium text-(--text-muted)">
            <p>© {new Date().getFullYear()} Ramanayam. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
