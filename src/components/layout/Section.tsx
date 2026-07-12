import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  tight?: boolean; // reduces top/bottom padding
}

export function Section({ children, className, tight }: SectionProps) {
  return (
    <section
      className={cn(
        'w-full px-4 md:px-10 lg:px-20',
        tight ? 'py-10' : 'py-16 md:py-20',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
