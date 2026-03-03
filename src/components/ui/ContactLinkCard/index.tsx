"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ContactLinkCardProps {
  /** The URL the card links to */
  href: string;
  /** The icon to display — should be a Lucide icon or React element */
  icon: React.ReactNode;
  /** The display label shown next to the icon */
  label: string;
  /** Whether the link should open in a new tab (default: false for mailto) */
  external?: boolean;
  /** Optional CSS class overrides */
  className?: string;
  /** Accessible label for screen readers if the visible label is insufficient */
  ariaLabel?: string;
}

/**
 * ContactLinkCard
 *
 * A pill-shaped anchor card used in the Footer to surface social and
 * contact channels. Follows the Incinera hover pattern:
 * border fades to --primary and icon scales up on hover.
 */
export const ContactLinkCard = ({
  href,
  icon,
  label,
  external = false,
  className,
  ariaLabel,
}: ContactLinkCardProps) => {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={ariaLabel ?? label}
      {...externalProps}
      className={cn(
        "group flex items-center gap-3 px-5 py-4 rounded-2xl",
        "bg-card border border-border",
        "text-foreground font-bold transition-all duration-300",
        "hover:border-primary hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      <span
        className="[&>svg]:h-6 [&>svg]:w-6 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
};
