import { cn } from "@/lib/utils";

interface SlideShellProps {
  children: React.ReactNode;
  sectionTitle?: string;
  className?: string;
  /** Center content vertically (used for cover/quote slides) */
  centered?: boolean;
}

/**
 * SlideShell — wrapper providing the consistent slide layout:
 *  - Full viewport sizing
 *  - Percentage-based padding
 *  - Optional section title header
 *  - Dark gradient background base
 */
export function SlideShell({
  children,
  sectionTitle,
  className,
  centered = false,
}: SlideShellProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col overflow-hidden",
        "px-[5.2%] pt-[3%] pb-[2.5%]",
        className,
      )}
    >
      {/* Section title chip */}
      {sectionTitle && (
        <div className="flex-shrink-0 mb-[2%]">
          <span
            className="inline-flex items-center gap-[0.5em] rounded-full border border-white/[0.12] px-[1.2em] py-[0.35em] text-[clamp(9px,0.75vw,14px)] font-bold uppercase tracking-[0.15em] text-primary"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {sectionTitle}
          </span>
        </div>
      )}

      {/* Content area */}
      <div
        className={cn(
          "flex-1 min-h-0 flex flex-col",
          centered && "items-center justify-center",
        )}
      >
        {children}
      </div>
    </div>
  );
}
