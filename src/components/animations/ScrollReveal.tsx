"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { scrollRevealVariants, type RevealVariant } from "@/animations/scrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  className,
  style,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  const v = scrollRevealVariants[variant];

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={v.hidden}
      animate={isInView ? v.visible : v.hidden}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{
        willChange: isInView ? "auto" : "transform, opacity",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
  style,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
