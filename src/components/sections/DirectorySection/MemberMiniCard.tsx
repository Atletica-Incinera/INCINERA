"use client";

import { useTranslations } from "next-intl";
import { AppImage } from "@/components/ui/AppImage";
import { memberPhotoUrl } from "@/data/utils/cloudinary";
import type { Member } from "@/data/types";

interface MemberMiniCardProps {
  member: Member;
  onClick: (member: Member) => void;
}

/**
 * MemberMiniCard — mini-card clicável de membro para uso dentro do DirectoryAccordion.
 *
 * Exibe foto (w-16 h-16), nome e cargo traduzido. Ao clicar, dispara `onClick`
 * com o membro, para abrir o MemberDetailModal.
 *
 * @example
 * <MemberMiniCard member={director} onClick={handleMemberClick} />
 */
export const MemberMiniCard = ({ member, onClick }: MemberMiniCardProps) => {
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
      <span className="font-semibold text-foreground text-sm leading-tight mb-1">
        {member.name}
      </span>
      <span className="text-xs text-muted-foreground font-medium">
        {t(`roles.${member.role}`)}
      </span>
    </button>
  );
};
