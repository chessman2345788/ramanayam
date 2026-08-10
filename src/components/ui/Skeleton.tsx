import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
  className = "",
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "var(--bg-card-hover, #e5e7eb)",
        background: "linear-gradient(90deg, var(--bg-card-hover, #e5e7eb) 25%, var(--bg-secondary, #f3f4f6) 50%, var(--bg-card-hover, #e5e7eb) 75%)",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 1.5s infinite linear",
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        padding: 16,
      }}
    >
      <Skeleton height={240} borderRadius={16} style={{ marginBottom: 16 }} />
      <Skeleton width="40%" height={14} style={{ marginBottom: 12 }} />
      <Skeleton width="85%" height={22} style={{ marginBottom: 12 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <Skeleton width="30%" height={24} />
        <Skeleton width="40%" height={36} borderRadius={100} />
      </div>
    </div>
  );
}
