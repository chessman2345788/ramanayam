"use client";

export function MandalaBg({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 800 800"
        fill="none"
        className="w-[120%] h-[120%] max-w-none opacity-[0.06] animate-mandala-spin"
      >
        {/* Outer ring */}
        <circle cx="400" cy="400" r="380" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="400" cy="400" r="350" stroke="#C9A84C" strokeWidth="0.3" />
        <circle cx="400" cy="400" r="300" stroke="#C9A84C" strokeWidth="0.5" />
        
        {/* Lotus petals - outer ring */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={`outer-${i}`} transform={`rotate(${angle} 400 400)`}>
              <path
                d="M400 60 C420 150 440 200 400 260 C360 200 380 150 400 60Z"
                stroke="#C9A84C"
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          );
        })}

        {/* Lotus petals - middle ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12 + 15;
          return (
            <g key={`mid-${i}`} transform={`rotate(${angle} 400 400)`}>
              <path
                d="M400 140 C415 200 425 240 400 280 C375 240 385 200 400 140Z"
                stroke="#C9A84C"
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          );
        })}

        {/* Inner circle patterns */}
        <circle cx="400" cy="400" r="220" stroke="#C9A84C" strokeWidth="0.4" />
        <circle cx="400" cy="400" r="180" stroke="#C9A84C" strokeWidth="0.3" />

        {/* Lotus petals - inner ring */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <g key={`inner-${i}`} transform={`rotate(${angle} 400 400)`}>
              <path
                d="M400 220 C412 260 418 290 400 320 C382 290 388 260 400 220Z"
                stroke="#C9A84C"
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          );
        })}

        {/* Decorative dots on outer ring */}
        {Array.from({ length: 32 }).map((_, i) => {
          const angle = (i * 360) / 32;
          const rad = (angle * Math.PI) / 180;
          const cx = 400 + 365 * Math.cos(rad);
          const cy = 400 + 365 * Math.sin(rad);
          return <circle key={`dot-${i}`} cx={cx} cy={cy} r="2" fill="#C9A84C" />;
        })}

        {/* Center */}
        <circle cx="400" cy="400" r="100" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="400" cy="400" r="60" stroke="#C9A84C" strokeWidth="0.4" />
        <circle cx="400" cy="400" r="20" fill="#C9A84C" opacity="0.3" />
        <circle cx="400" cy="400" r="8" fill="#C9A84C" opacity="0.5" />
      </svg>
    </div>
  );
}
