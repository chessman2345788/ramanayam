"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 40,
  staggerChildren = 0,
}: ScrollRevealProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: "blur(8px)",
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] as any, // easeOutExpo
      },
    },
  };

  if (staggerChildren > 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ children }: { children: ReactNode }) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(6px)",
      scale: 0.99,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
}
