import Link from "next/link";
import { PageTransition } from "@/components/animations/PageTransition";

interface EmptyStateProps {
  emoji?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function EmptyState({
  emoji,
  icon,
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyStateProps) {
  return (
    <>
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 80px)",
          paddingBottom: 120,
          textAlign: "center",
          minHeight: "100vh",
          background: "var(--bg-primary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {emoji && (
          <p style={{ fontSize: 56, marginBottom: 24, userSelect: "none" }}>
            {emoji}
          </p>
        )}
        
        {icon && (
          <div style={{ position: "relative", marginBottom: 32, userSelect: "none" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "var(--accent-saffron-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-saffron)",
              }}
            >
              {icon}
            </div>
          </div>
        )}

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: 16,
          }}
        >
          {title}
        </h1>
        
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            marginBottom: 40,
            maxWidth: 400,
          }}
        >
          {description}
        </p>
        
        <Link href={buttonLink} className="btn btn-primary" style={{ fontSize: 13 }}>
          {buttonText}
        </Link>
      </div>
    </>
  );
}
export default EmptyState;
