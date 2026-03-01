"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Directory, Member } from "@/data/directory";
import { cn } from "@/lib/utils";
import { AppImage } from "@/components/ui/AppImage";
import { useTranslations } from "next-intl";
import { memberPhotoUrl, directoryImageUrl } from "@/data/utils/cloudinary";

interface MemberMiniCardProps {
  member: Member;
  onClick: (member: Member) => void;
}

const MemberMiniCard = ({ member, onClick }: MemberMiniCardProps) => {
  const t = useTranslations("Directory");
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(member);
      }}
      aria-label={t("common.viewDetails", { name: member.name })}
      aria-haspopup="dialog"
      className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-border transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 w-full text-center group cursor-pointer"
    >
      <AppImage
        src={memberPhotoUrl(member.photo)}
        alt={member.name}
        fill
        className="object-cover"
        sizes="64px"
        containerClassName="relative w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors"
      />
      <span className="font-semibold text-foreground text-sm leading-tight mb-1">{member.name}</span>
      <span className="text-xs text-muted-foreground font-medium">{t(`roles.${member.role}`)}</span>
    </button>
  );
};

interface DirectoryAccordionProps {
  directory: Directory;
  isExpanded: boolean;
  onToggle: () => void;
  onMemberClick: (member: Member) => void;
  className?: string;
}

export const DirectoryAccordion = ({
  directory,
  isExpanded,
  onToggle,
  onMemberClick,
  className
}: DirectoryAccordionProps) => {
  const t = useTranslations("Directory");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.focus();
      }, 100);
    }
  }, [isExpanded]);

  return (
    <div
      className={cn(
        "bg-card rounded-2xl overflow-hidden border transition-all duration-300",
        isExpanded ? "border-primary/50 shadow-lg shadow-primary/5 ring-1 ring-primary/20" : "border-border hover:border-primary/30",
        className
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`directory-content-${directory.id}`}
        className="group relative flex flex-col items-center gap-4 w-full p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer"
      >
          <AppImage
            src={directoryImageUrl(directory.image)}
            alt={t(`names.${directory.id}`)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 128px"
            containerClassName={cn(
              "relative w-32 h-32 rounded-full overflow-hidden border-2 transition-colors duration-300",
              isExpanded ? "border-primary" : "border-transparent group-hover:border-primary"
            )}
          />
        
        <div className="text-center space-y-1">
          <h3 className={cn(
            "text-lg font-bold tracking-tight transition-colors duration-300",
            isExpanded ? "text-primary" : "text-foreground group-hover:text-primary"
          )}>
            {t(`names.${directory.id}`)}
          </h3>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            {isExpanded ? t("common.closeTeam") : t("common.openTeam")}
          </p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`directory-content-${directory.id}`}
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            tabIndex={-1}
            className="w-full"
          >
            <div className="p-6 pt-0 border-t border-border/50 bg-background/50">
              <div className="mt-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 text-center sm:text-left">
                  {t("common.leadership")}
                </h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                  <MemberMiniCard member={directory.director} onClick={onMemberClick} />
                  {directory.viceDirector && (
                    <MemberMiniCard member={directory.viceDirector} onClick={onMemberClick} />
                  )}
                </div>
              </div>

              {directory.members.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 text-center sm:text-left">
                    {t("common.members", { count: directory.members.length })}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {directory.members.map((member) => (
                      <MemberMiniCard key={member.id} member={member} onClick={onMemberClick} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
