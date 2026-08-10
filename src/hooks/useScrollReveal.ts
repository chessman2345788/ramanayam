export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-48px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: '-48px' },
};

export const lineReveal = {
  initial: { scaleX: 0, originX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
};

export const imageReveal = {
  initial: { clipPath: 'inset(100% 0 0 0)' },
  whileInView: { clipPath: 'inset(0% 0 0 0)' },
  viewport: { once: true },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};
