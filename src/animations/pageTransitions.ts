export const pageTransitionVariants = {
  initial: { opacity: 0, y: 16, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, scale: 0.99, filter: "blur(2px)" },
};

export const pageTransitionTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};
