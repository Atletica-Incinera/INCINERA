import { CheckCircle2, X } from "lucide-react";
import type { TiersSlide } from "../pitchData";
import { SlideShell } from "./SlideShell";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface TiersSlideViewProps {
  data: TiersSlide;
}

/**
 * TiersSlideView — 4-column tier comparison grid.
 * The highlighted tier (Master) gets a primary border accent.
 * Boolean values render as check/x icons; strings render as text.
 */
export function TiersSlideView({ data }: TiersSlideViewProps) {
  return (
    <SlideShell sectionTitle={data.sectionTitle}>
      <h2 className="text-[clamp(22px,3vw,64px)] font-black uppercase tracking-[-0.02em] leading-[0.95] text-foreground mb-[3%]">
        {data.title}
      </h2>

      {/* Tier cards */}
      <div className="flex-1 min-h-0 grid grid-cols-4 gap-[1.5%]">
        {data.tiers.map((tier) => (
          <GlassCard
            key={tier.name}
            className={cn(
              "flex flex-col overflow-hidden",
              tier.highlighted && "border-primary/40 shadow-[0_0_40px_rgba(var(--primary),0.15)]",
            )}
          >
            {/* Tier header */}
            <div
              className={cn(
                "px-[clamp(10px,1.2vw,20px)] py-[clamp(10px,1.5vw,24px)] text-center border-b border-white/[0.08]",
                tier.highlighted && "bg-primary/10",
              )}
            >
              <div className="text-[clamp(18px,2vw,36px)]">{tier.emoji}</div>
              <h3 className="text-[clamp(13px,1.3vw,26px)] font-black uppercase tracking-wide text-foreground">
                {tier.name}
              </h3>
              <p className="text-[clamp(11px,1vw,18px)] font-bold text-primary mt-[0.3em]">
                {tier.price}
              </p>
              <span className="text-[clamp(8px,0.65vw,12px)] text-muted-foreground uppercase tracking-widest">
                {tier.exclusive ? "1 vaga exclusiva" : "Vagas ilimitadas"}
              </span>
            </div>

            {/* Features list */}
            <div className="flex-1 px-[clamp(8px,1vw,16px)] py-[clamp(6px,0.8vw,14px)] flex flex-col gap-[clamp(3px,0.4vw,8px)]">
              {data.featureLabels.map((label) => {
                const value = tier.features[label];
                return (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-[0.5em] py-[clamp(2px,0.25vw,5px)] border-b border-white/[0.05] last:border-0"
                  >
                    <span className="text-[clamp(8px,0.7vw,13px)] text-muted-foreground truncate flex-shrink min-w-0">
                      {label}
                    </span>
                    <span className="flex-shrink-0">
                      {value === true ? (
                        <CheckCircle2 className="w-[clamp(10px,0.9vw,16px)] h-[clamp(10px,0.9vw,16px)] text-primary" />
                      ) : value === false ? (
                        <X className="w-[clamp(10px,0.9vw,16px)] h-[clamp(10px,0.9vw,16px)] text-muted-foreground/40" />
                      ) : (
                        <span className="text-[clamp(8px,0.7vw,13px)] font-semibold text-foreground whitespace-nowrap">
                          {value}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        ))}
      </div>
    </SlideShell>
  );
}
