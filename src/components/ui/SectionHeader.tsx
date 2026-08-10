import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <ScrollReveal variant="blur-to-sharp">
      <div
        className={`max-w-2xl mb-12 ${isCenter ? "text-center mx-auto" : "text-left"} ${className}`}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
export default SectionHeader;
