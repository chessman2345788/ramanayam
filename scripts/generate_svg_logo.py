import os

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
  <defs>
    <!-- Gold Metallic Gradients -->
    <linearGradient id="gold-grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="25%" stop-color="#F59E0B" />
      <stop offset="60%" stop-color="#D97706" />
      <stop offset="85%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
    <linearGradient id="gold-grad-light" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="40%" stop-color="#FBBF24" />
      <stop offset="80%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>
    <linearGradient id="gold-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D97706" stop-opacity="0.1" />
      <stop offset="20%" stop-color="#F59E0B" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#FFFBEB" stop-opacity="1" />
      <stop offset="80%" stop-color="#F59E0B" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#D97706" stop-opacity="0.1" />
    </linearGradient>
    <radialGradient id="lotus-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.6" />
      <stop offset="60%" stop-color="#F59E0B" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#D97706" stop-opacity="0" />
    </radialGradient>
    <filter id="vector-emboss" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" flood-color="#542307" flood-opacity="0.45" />
    </filter>
  </defs>

  <g filter="url(#vector-emboss)">
    <!-- ── Glow Behind Center Lotus ── -->
    <ellipse cx="100" cy="58" rx="35" ry="25" fill="url(#lotus-glow)" />

    <!-- ── Top Kalash Spire ── -->
    <path d="M 100 8 C 101.5 14 104 18 104 22 C 104 25 102 27 100 29 C 98 27 96 25 96 22 C 96 18 98.5 14 100 8 Z" fill="url(#gold-grad-light)" />
    <circle cx="100" cy="6" r="1.8" fill="#FFFBEB" />
    <circle cx="100" cy="30" r="2.2" fill="url(#gold-grad-main)" />

    <!-- ── Ornate Sacred Kodanda Bow / Arch ── -->
    <!-- Main Outer Arch -->
    <path d="M 28 72 C 55 24 145 24 172 72 C 166 74 160 70 138 38 C 114 34 86 34 62 38 C 40 70 34 74 28 72 Z" fill="url(#gold-grad-main)" />
    <!-- Arch Inner Highlight Ridge -->
    <path d="M 40 70 C 64 36 136 36 160 70" fill="none" stroke="#FFFBEB" stroke-width="0.9" stroke-linecap="round" opacity="0.85" />
    
    <!-- Ornate Left Scroll Tip -->
    <path d="M 28 72 C 22 74 16 68 18 62 C 20 58 25 60 24 64 C 23 67 26 69 29 69 Z" fill="url(#gold-grad-light)" />
    <!-- Ornate Right Scroll Tip -->
    <path d="M 172 72 C 178 74 184 68 182 62 C 180 58 175 60 176 64 C 177 67 174 69 171 69 Z" fill="url(#gold-grad-light)" />

    <!-- Bow String -->
    <line x1="22" y1="72" x2="178" y2="72" stroke="url(#gold-line-grad)" stroke-width="1.2" />

    <!-- Hanging Sacred Gold Beads / Drops -->
    <circle cx="50" cy="74" r="1.8" fill="url(#gold-grad-light)" />
    <circle cx="70" cy="77" r="2.2" fill="url(#gold-grad-light)" />
    <circle cx="100" cy="79" r="2.6" fill="#FFFBEB" />
    <circle cx="130" cy="77" r="2.2" fill="url(#gold-grad-light)" />
    <circle cx="150" cy="74" r="1.8" fill="url(#gold-grad-light)" />

    <!-- ── Center Lotus Bloom ── -->
    <!-- Outer Side Petals -->
    <path d="M 100 36 C 84 40 70 52 68 66 C 76 66 86 60 95 52 C 98 46 100 38 100 36 Z" fill="url(#gold-grad-main)" />
    <path d="M 100 36 C 116 40 130 52 132 66 C 124 66 114 60 105 52 C 102 46 100 38 100 36 Z" fill="url(#gold-grad-main)" />
    
    <!-- Mid Layer Petals -->
    <path d="M 100 34 C 87 42 78 56 80 68 C 90 67 97 59 100 49 C 103 59 110 67 120 68 C 122 56 113 42 100 34 Z" fill="url(#gold-grad-light)" />
    
    <!-- Center Main Petal -->
    <path d="M 100 30 C 92 40 90 52 100 69 C 110 52 108 40 100 30 Z" fill="url(#gold-grad-main)" />
    <!-- Inner Petal Core Shimmer -->
    <path d="M 100 32 C 95 41 94 51 100 64 C 106 51 105 41 100 32 Z" fill="#FFFBEB" opacity="0.95" />

    <!-- Lotus Base Pedestal -->
    <path d="M 80 68 C 88 71 112 71 120 68 C 115 73 85 73 80 68 Z" fill="url(#gold-grad-main)" />

    <!-- ── RAMAYANAM Gold Wordmark ── -->
    <text x="100" y=\"112\" text-anchor="middle" font-family="'Cinzel', 'Cormorant Garamond', 'Times New Roman', serif" font-size="15" font-weight="700" letter-spacing="4.8" fill="url(#gold-grad-main)">RAMAYANAM</text>
    
    <!-- Wordmark Base Accent Rule -->
    <path d="M 54 122 L 88 122 L 100 125 L 112 122 L 146 122" stroke="url(#gold-line-grad)" stroke-width="1" fill="none" stroke-linecap="round" />
    <circle cx="100" cy="125" r="1.5" fill="url(#gold-grad-light)" />
  </g>
</svg>"""

with open('public/logo-vector.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Vector SVG logo successfully generated at public/logo-vector.svg")
