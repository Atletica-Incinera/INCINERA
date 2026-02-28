"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MemberCardRootProps {
  children: React.ReactNode;
  className?: string;
}

const MemberCardRoot = ({ children, className }: MemberCardRootProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary)/0.1)] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

interface MemberCardAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const MemberCardAvatar = ({ src, alt, className }: MemberCardAvatarProps) => {
  return (
    <div
      className={cn(
        "relative w-32 h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors duration-300",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 128px, 128px"
      />
    </div>
  );
};

interface MemberCardNameProps {
  children: React.ReactNode;
  className?: string;
}

const MemberCardName = ({ children, className }: MemberCardNameProps) => {
  return (
    <h3
      className={cn(
        "text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300",
        className
      )}
    >
      {children}
    </h3>
  );
};

interface MemberCardRoleProps {
  children: React.ReactNode;
  className?: string;
}

const MemberCardRole = ({ children, className }: MemberCardRoleProps) => {
  return (
    <p
      className={cn(
        "text-sm font-medium text-muted-foreground uppercase tracking-widest",
        className
      )}
    >
      {children}
    </p>
  );
};

export const MemberCard = {
  Root: MemberCardRoot,
  Avatar: MemberCardAvatar,
  Name: MemberCardName,
  Role: MemberCardRole,
};
