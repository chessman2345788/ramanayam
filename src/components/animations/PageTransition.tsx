"use client";

import { motion } from "framer-motion";
import { pageTransitionVariants, pageTransitionTransition } from "@/animations/pageTransitions";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={pageTransitionVariants.initial}
      animate={pageTransitionVariants.animate}
      exit={pageTransitionVariants.exit}
      transition={pageTransitionTransition}
    >
      {children}
    </motion.div>
  );
}

