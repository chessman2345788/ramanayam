"use client";

import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number; // e.g. 4.8 or 5
  maxStars?: number;
  size?: number;
  showScore?: boolean;
  color?: string;
  emptyColor?: string;
}

export function RatingStars({
  rating,
  maxStars = 5,
  size = 14,
  showScore = false,
  color = "#F57C00", // Ramanayam Saffron Accent
  emptyColor = "#E5E7EB",
}: RatingStarsProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      {Array.from({ length: maxStars }).map((_, idx) => {
        const starValue = idx + 1;
        const isFilled = rating >= starValue;
        const isHalf = !isFilled && rating >= starValue - 0.5;

        return (
          <Star
            key={idx}
            size={size}
            fill={isFilled ? color : isHalf ? `url(#halfStarGradient-${size})` : "none"}
            color={isFilled || isHalf ? color : emptyColor}
            style={{ flexShrink: 0 }}
          />
        );
      })}

      {showScore && (
        <span style={{ fontSize: 12, fontWeight: 700, color: "#171717", marginLeft: 4 }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
