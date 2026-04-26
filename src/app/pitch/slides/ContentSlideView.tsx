import type { ContentSlide } from "../pitchData";
import { SlideShell } from "./SlideShell";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface ContentSlideViewProps {
  data: ContentSlide;
}

/**
 * ContentSlideView — flexible content slide with:
 *  - "split" layout: 2 columns side by side
 *  - "cards" layout: responsive grid of glass cards
 *  - "list" layout: stacked list items
 */
export function ContentSlideView({ data }: ContentSlideViewProps) {
  const layout = data.layout ?? "list";

  return (
    <SlideShell sectionTitle={data.sectionTitle}>
      {/* Title */}
      <h2 className="text-[clamp(24px,3.5vw,72px)] font-black uppercase tracking-[-0.02em] leading-[0.95] text-foreground mb-[3%]">
        {data.title}
      </h2>

      {/* Items */}
      <div
        className={cn(
          "flex-1 min-h-0",
          layout === "split" &&
            "grid grid-cols-1 md:grid-cols-2 gap-[3.5%] items-start",
          layout === "cards" &&
            "grid grid-cols-2 gap-[2.5%] items-start",
          layout === "list" && "flex flex-col gap-[3%]",
        )}
      >
        {data.items.map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard
              key={item.title}
              className="p-[clamp(16px,2.5vw,40px)] h-full flex flex-col"
            >
              {Icon && (
                <div className="w-[clamp(32px,3vw,56px)] h-[clamp(32px,3vw,56px)] rounded-[clamp(8px,0.8vw,16px)] bg-primary/10 border border-primary/20 flex items-center justify-center mb-[clamp(10px,1.2vw,20px)]">
                  <Icon className="w-[55%] h-[55%] text-primary" />
                </div>
              )}
              <h3 className="text-[clamp(14px,1.4vw,28px)] font-bold text-foreground mb-[clamp(4px,0.5vw,10px)] leading-tight">
                {item.title}
              </h3>
              <p className="text-[clamp(11px,1vw,19px)] text-muted-foreground leading-[1.5] flex-1">
                {item.description}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </SlideShell>
  );
}
