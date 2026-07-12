"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(8px)",
    transition: {
      duration: 0.25,
      ease: [0.7, 0, 0.84, 0], // easeInMuted
    },
  },
};

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container for grids */
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Staggered word reveal for hero text */
interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function StaggeredText({ text, className = "", delay = 0 }: StaggeredTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      initial="initial"
      animate="animate"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            initial: { opacity: 0, y: 15, filter: "blur(4px)" },
            animate: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                delay: delay + i * 0.08,
                duration: 0.55,
                ease: "easeOut",
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* Scroll-triggered fade in */
interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInOnScrollProps) {
  const directionOffset = {
    up: { y: 25 },
    down: { y: -25 },
    left: { x: 25 },
    right: { x: -25 },
    none: {},
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.97,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOut
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
