import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      style={{
        paddingTop: "calc(var(--nav-height) + 64px)",
        paddingBottom: 120,
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
      className="container"
    >
      <div style={{ marginBottom: 48 }}>
        <Skeleton width="180px" height="16px" style={{ marginBottom: 16 }} />
        <Skeleton width="340px" height="48px" style={{ marginBottom: 16 }} />
        <Skeleton width="60%" height="20px" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 32,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
