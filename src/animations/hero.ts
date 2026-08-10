export const HERO_EASE = [0.16, 1, 0.3, 1] as const;

export const HERO_PARTICLES = [
  { size: 4, top: 15, right: 8, dur: 3.2, delay: 0, color: "var(--accent-gold)" },
  { size: 3, top: 30, right: 22, dur: 4.0, delay: 0.8, color: "var(--accent-gold)" },
  { size: 5, top: 50, right: 12, dur: 3.6, delay: 1.5, color: "var(--accent-saffron)" },
  { size: 2, top: 20, right: 35, dur: 4.5, delay: 0.3, color: "var(--accent-gold)" },
  { size: 3, top: 65, right: 5, dur: 3.8, delay: 2.0, color: "rgba(212,175,55,0.6)" },
  { size: 4, top: 40, right: 28, dur: 4.2, delay: 1.2, color: "var(--accent-saffron)" },
  { size: 2, top: 75, right: 18, dur: 3.4, delay: 0.6, color: "var(--accent-gold)" },
  { size: 3, top: 10, right: 30, dur: 5.0, delay: 1.8, color: "rgba(245,124,0,0.4)" },
] as const;

export const heroGoldCircleAnimation = {
  animate: { rotate: 360 },
  transition: { duration: 30, repeat: Infinity, ease: "linear" }
} as const;

export const heroProductAnimation = {
  animate: { y: [0, -12, 0] as number[] },
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const }
};

export const heroScrollIndicatorAnimation = {
  animate: { y: [0, 8, 0] as number[] },
  transition: { duration: 1.5, repeat: Infinity }
};
