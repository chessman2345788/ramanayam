"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorEffect() {
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<"none" | "hover" | "magnetic">("none");
  const [isClicked, setIsClicked] = useState(false);

  // Track the current magnetic target coordinates
  const [magneticTarget, setMagneticTarget] = useState<{ x: number; y: number } | null>(null);

  // Framer Motion values for the cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high performance cursor lag interpolation
  const cursorX = useSpring(mouseX, { stiffness: 450, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 450, damping: 30 });
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    setMounted(true);

    const moveMouse = (e: MouseEvent) => {
      if (hoverType === "magnetic" && magneticTarget) {
        // Pull cursor position towards the center of the magnetic item (35% snap interpolation)
        const snapX = e.clientX + (magneticTarget.x - e.clientX) * 0.35;
        const snapY = e.clientY + (magneticTarget.y - e.clientY) * 0.35;
        mouseX.set(snapX);
        mouseY.set(snapY);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const button = target.closest("button");
      const link = target.closest("a");
      const card = target.closest(".product-card") || target.closest(".group");
      
      const isClickable = button || link || target.classList.contains("cursor-pointer");
      const isCard = card || target.tagName === "IMG";

      if (isClickable) {
        setHoverType("hover");
        // Pull towards button/link center
        const el = (button || link || target) as HTMLElement;
        const rect = el.getBoundingClientRect();
        setMagneticTarget({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      } else if (isCard) {
        setHoverType("magnetic");
        const el = (card || target) as HTMLElement;
        const rect = el.getBoundingClientRect();
        setMagneticTarget({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      } else {
        setHoverType("none");
        setMagneticTarget(null);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, hoverType, magneticTarget]);

  if (!mounted) return null;

  return (
    <>
      {/* Glow shadow backdrop (glows and trails behind) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9998 select-none hidden md:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: hoverType === "hover" ? 140 : hoverType === "magnetic" ? 220 : 90,
          height: hoverType === "hover" ? 140 : hoverType === "magnetic" ? 220 : 90,
          background: "radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(249, 115, 22, 0) 70%)",
        }}
      />

      {/* Tactile Cursor Dot (snaps magnetic targets and shrinks on click) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9999 select-none hidden md:block border"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isClicked ? 12 : hoverType === "hover" ? 38 : hoverType === "magnetic" ? 54 : 8,
          height: isClicked ? 12 : hoverType === "hover" ? 38 : hoverType === "magnetic" ? 54 : 8,
          backgroundColor: isClicked ? "#F97316" : hoverType === "hover" ? "rgba(249, 115, 22, 0.08)" : hoverType === "magnetic" ? "transparent" : "#F97316",
          borderColor: isClicked ? "transparent" : hoverType === "hover" ? "#F97316" : hoverType === "magnetic" ? "rgba(249, 115, 22, 0.5)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 550,
          damping: 26,
        }}
      />
    </>
  );
}
