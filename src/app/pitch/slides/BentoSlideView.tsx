import type { BentoSlide } from "../pitchData";
import { SlideShell } from "./SlideShell";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface BentoSlideViewProps {
  data: BentoSlide;
}

/**
 * BentoSlideView — bento box grid of glass cards.
 * Items with span="wide" take 2 columns; "normal" takes 1.
 * Auto-distributes across a 3-column grid.
 */
export function BentoSlideView({ data }: BentoSlideViewProps) {
  return (
    <SlideShell sectionTitle={data.sectionTitle}>
      {/* Title */}
      <h2 className="text-[clamp(24px,3.5vw,72px)] font-black uppercase tracking-[-0.02em] leading-[0.95] text-foreground mb-[3%]">
        {data.title}
      </h2>

      {/* Bento grid */}
      <div className="flex-1 min-h-0 grid grid-cols-2 md:grid-cols-3 gap-[2%] auto-rows-fr content-start">
        {data.items.map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard
              key={item.label}
              className={cn(
                "p-[clamp(14px,2vw,36px)] flex flex-col justify-end",
                item.span === "wide" && "md:col-span-2",
              )}
            >
              <div className="w-[clamp(28px,2.5vw,48px)] h-[clamp(28px,2.5vw,48px)] rounded-[clamp(6px,0.6vw,12px)] bg-primary/10 border border-primary/20 flex items-center justify-center mb-[clamp(8px,1vw,16px)]">
                <Icon className="w-[55%] h-[55%] text-primary" />
              </div>
              <h3 className="text-[clamp(13px,1.3vw,26px)] font-bold text-foreground leading-tight">
                {item.label}
              </h3>
              <p className="text-[clamp(10px,0.85vw,16px)] text-muted-foreground mt-[clamp(2px,0.3vw,6px)] leading-snug">
                {item.description}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </SlideShell>
  );
}
