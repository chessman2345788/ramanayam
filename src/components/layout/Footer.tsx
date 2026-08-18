import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer style={{ background: '#F5F0E8', borderTop: '0.5px solid rgba(26,15,10,0.08)' }}>
      <div style={{ maxWidth: 1540, margin: '0 auto', padding: '48px clamp(20px, 4vw, 64px)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Brand logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <Image src="/logo-transparent.png" alt="Ramanayam" width={34} height={34} style={{ objectFit: 'contain', opacity: 0.85 }} />
            <div>
              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 20, fontWeight: 600, color: '#1A0F0A', margin: 0, lineHeight: 1.2 }}>Ramanayam</p>
              <p style={{ fontSize: 12, color: 'rgba(26,15,10,0.48)', margin: 0 }}>Sacred Rituals, Modern Living</p>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Shop', href: '/products' },
              { label: 'Live Darshan', href: '/live-darshan' },
              { label: 'Festivals', href: '/festivals' },
              { label: 'Contact', href: '/contact' },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{ fontSize: 14, color: 'rgba(26,15,10,0.65)', textDecoration: 'none', fontWeight: 400 }}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Social & Policy Links */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {['Instagram', 'YouTube'].map(s => (
              <Link key={s} href="#" style={{ fontSize: 14, color: 'rgba(26,15,10,0.65)', textDecoration: 'none' }}>{s}</Link>
            ))}
            <span style={{ width: 1, height: 16, background: 'rgba(26,15,10,0.15)', display: 'inline-block' }} />
            {['Privacy', 'Terms'].map(s => (
              <Link key={s} href="#" style={{ fontSize: 13, color: 'rgba(26,15,10,0.45)', textDecoration: 'none' }}>{s}</Link>
            ))}
          </div>
        </div>

        {/* Bottom Sanskrit blessing, Copyright & Developer Credit */}
        <div style={{ marginTop: 36, paddingTop: 24, borderTop: '0.5px solid rgba(26,15,10,0.08)', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'rgba(26,15,10,0.40)', margin: 0, fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic' }}>
            ‖ श्रद्धा और शिल्प ‖
          </p>
          <p style={{ fontSize: 12, color: 'rgba(26,15,10,0.45)', margin: '6px 0 0' }}>
            © {new Date().getFullYear()} Ramanayam. All rights reserved.
            <span style={{ margin: '0 8px', opacity: 0.5 }}>•</span>
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/harsh-kumar-mishra-8163b833b"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#B45309',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Harsh Kumar Mishra
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
