import { Variants, TargetAndTransition } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

export type RevealVariant = "fade-up" | "fade-in" | "scale-up" | "blur-to-sharp" | "slide-left" | "slide-right";

export const scrollRevealVariants: Record<RevealVariant, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40},
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-to-sharp": {
    hidden: { opacity: 0, filter: "blur(8px)", y: 24 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
};

// Original Hook-like variants from useScrollReveal.ts
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: EASE },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const blurToSharp: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 24 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const parallaxUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
