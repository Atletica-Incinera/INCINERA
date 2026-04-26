import type { StepsSlide } from "../pitchData";
import { SlideShell } from "./SlideShell";
import { GlassCard } from "./GlassCard";

interface StepsSlideViewProps {
  data: StepsSlide;
}

/**
 * StepsSlideView — next-steps slide with numbered cards and contact info.
 */
export function StepsSlideView({ data }: StepsSlideViewProps) {
  return (
    <SlideShell sectionTitle={data.sectionTitle}>
      {/* Title */}
      <h2 className="text-[clamp(24px,3.5vw,72px)] font-black uppercase tracking-[-0.02em] leading-[0.95] text-foreground mb-[4%]">
        {data.title}
      </h2>

      {/* Steps */}
      <div className="grid grid-cols-3 gap-[3%] mb-[4%]">
        {data.steps.map((step) => (
          <GlassCard
            key={step.number}
            className="p-[clamp(16px,2.5vw,40px)] flex flex-col"
          >
            <span className="text-[clamp(32px,4vw,72px)] font-black text-primary/30 leading-none tabular-nums">
              {String(step.number).padStart(2, "0")}
            </span>
            <h3 className="text-[clamp(14px,1.4vw,28px)] font-bold text-foreground mt-[clamp(6px,0.8vw,14px)] leading-tight">
              {step.title}
            </h3>
            <p className="text-[clamp(11px,0.9vw,17px)] text-muted-foreground mt-[clamp(3px,0.4vw,8px)] leading-relaxed">
              {step.description}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Contacts */}
      <div className="flex items-center gap-[3%] justify-center">
        {data.contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <div
              key={contact.label}
              className="flex items-center gap-[0.6em] text-[clamp(10px,0.9vw,17px)] text-muted-foreground"
            >
              <Icon className="w-[1.1em] h-[1.1em] text-primary flex-shrink-0" />
              <span className="font-medium">{contact.value}</span>
            </div>
          );
        })}
      </div>
    </SlideShell>
  );
}
