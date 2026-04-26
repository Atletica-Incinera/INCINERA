import { cn } from "@/lib/utils";

/**
 * GlassCard — liquid glass container used across all slide types.
 * Uses backdrop-blur + translucent gradient + subtle border for depth.
 */
export function GlassCard({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative rounded-[clamp(12px,1.5vw,24px)] border border-white/[0.12] overflow-hidden",
        className,
      )}
      style={{
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
      }}
      {...props}
    >
      {/* Subtle highlight reflection */}
      <div
        className="absolute top-0 left-0 w-[60%] h-[60%] pointer-events-none opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.6) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
