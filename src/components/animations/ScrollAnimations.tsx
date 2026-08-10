"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // 0.85 = subtle, 0.7 = dramatic
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  borderRadius?: number;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.85,
  className,
  style,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  borderRadius = 32,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;


    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const yAmount = (1 - speed) * 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: -yAmount },
        {
          y: yAmount,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius,
        ...style,
      }}
    >
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: "-15%",
          willChange: "transform",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          style={{ objectFit: "cover" }}
          sizes={sizes}
        />
      </div>
    </div>
  );
}

interface AnimatedCounterProps {
  value: string; // e.g. "5,000+", "200+", "12", "100%", "Pan-India"
  style?: React.CSSProperties;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  style,
  className,
  duration = 1.8,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.textContent = value;
      return;
    }

    // Extract numeric part
    const numericMatch = value.match(/^([\d,]+)/);
    if (!numericMatch) {
      // Non-numeric value (e.g. "Pan-India"), just show it
      el.textContent = value;
      return;
    }

    const numericStr = numericMatch[1].replace(/,/g, "");
    const targetNum = parseInt(numericStr, 10);
    const suffix = value.slice(numericMatch[0].length); // "+", "%", etc.
    const hasCommas = numericMatch[1].includes(",");

    el.textContent = "0" + suffix;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: targetNum,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          const current = Math.round(counter.val);
          el.textContent =
            (hasCommas ? current.toLocaleString("en-IN") : String(current)) +
            suffix;
        },
        onComplete: () => {
          hasAnimated.current = true;
          el.textContent = value;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}


export function useHeroScrollFade(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}



export function useMagneticTilt(
  ref: React.RefObject<HTMLElement | null>,
  maxAngle: number = 3
) {
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxAngle;
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * maxAngle;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [ref, maxAngle]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);
}
