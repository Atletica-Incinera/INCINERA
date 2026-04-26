import type { StatsSlide } from "../pitchData";
import { SlideShell } from "./SlideShell";
import { GlassCard } from "./GlassCard";

interface StatsSlideViewProps {
  data: StatsSlide;
}

/**
 * StatsSlideView — data/metrics slide with large stat values and descriptive labels.
 * Uses the percentage-based grid layout from the design spec.
 */
export function StatsSlideView({ data }: StatsSlideViewProps) {
  return (
    <SlideShell sectionTitle={data.sectionTitle}>
      {/* Title block */}
      <div className="mb-[4%]">
        <h2 className="text-[clamp(24px,3.5vw,72px)] font-black uppercase tracking-[-0.02em] leading-[0.95] text-foreground">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-[clamp(12px,1.1vw,22px)] text-muted-foreground mt-[1%] max-w-[70%] leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Stats grid */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-[3%] items-start content-start">
        {data.stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <GlassCard
              key={stat.label}
              className="p-[clamp(20px,3vw,48px)] flex flex-col"
            >
              {Icon && (
                <div className="w-[clamp(28px,2.5vw,48px)] h-[clamp(28px,2.5vw,48px)] rounded-[clamp(6px,0.6vw,12px)] bg-primary/10 border border-primary/20 flex items-center justify-center mb-[clamp(10px,1.5vw,24px)]">
                  <Icon className="w-[55%] h-[55%] text-primary" />
                </div>
              )}
              <span className="text-[clamp(28px,3.5vw,64px)] font-black text-primary leading-none tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-[clamp(11px,0.9vw,18px)] text-muted-foreground mt-[clamp(4px,0.5vw,10px)] leading-snug">
                {stat.label}
              </span>
            </GlassCard>
          );
        })}
      </div>

      {/* Footnote */}
      {data.footnote && (
        <p className="mt-[2%] text-[clamp(10px,0.85vw,16px)] text-muted-foreground/70 italic max-w-[70%]">
          {data.footnote}
        </p>
      )}
    </SlideShell>
  );
}
