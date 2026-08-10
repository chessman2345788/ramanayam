"use client";

import React from "react";
import { motion } from "framer-motion";

interface StorefrontCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function StorefrontCard({
  children,
  className = "",
  hoverEffect = true,
  onClick,
}: StorefrontCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`bg-white border border-stone-200 rounded-2xl shadow-2xs overflow-hidden transition-all duration-200 ${
        hoverEffect ? "hover:shadow-md hover:border-amber-300" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
