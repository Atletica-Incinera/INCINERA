"use client";

import { useTranslations } from "next-intl";
import { useDirectorySection } from "./useDirectorySection";
import { DirectoryAccordion } from "./DirectoryAccordion";
import { MemberDetailModal } from "./MemberDetailModal";
import { MemberCard } from "@/components/ui/MemberCard";
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { memberPhotoUrl } from "@/data/utils/cloudinary";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import type { Directory, ExecutiveBoard, Member } from "@/data/types";

interface DirectorySectionProps {
  directories: Directory[];
  executiveBoard: ExecutiveBoard;
}

export const DirectorySection = ({
  directories,
  executiveBoard,
}: DirectorySectionProps) => {
  const t = useTranslations("Directory");
  const {
    refs: { sectionRef, titleRef, cardsRef },
    state,
    actions,
  } = useDirectorySection();

  // Issue #3 — unifica presidente e vice em array para evitar JSX duplicado.
  // filter(Boolean) remove entradas undefined/null e o cast garante tipagem estrita.
  const boardLeaders = [
    executiveBoard.president,
    executiveBoard.vicePresident,
  ].filter(Boolean) as Member[];

  return (
    <section
      id="directory"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40 bg-background"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <SectionTitle>{t("title")}</SectionTitle>
          <SectionSubtitle>{t("subtitle")}</SectionSubtitle>
        </div>

        {/* Recruitment Alert */}
        {/* <Alert className="max-w-6xl mx-auto mb-12 border-primary/30 bg-primary/5">
          <Flame className="text-primary" />
          <AlertTitle className="flex items-center gap-2 text-foreground">
            {t("recruitment.title")}
            <Badge variant="default" className="text-[10px]">
              {t("recruitment.badge")}
            </Badge>
          </AlertTitle>
          <AlertDescription>
            <p>
              {t("recruitment.description", {
                deadline: t("recruitment.deadline"),
              })}
            </p>
            <a
              href={t("recruitment.ctaUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-semibold text-primary hover:underline text-sm"
            >
              {t("recruitment.cta")} →
            </a>
          </AlertDescription>
        </Alert> */}

        <div className="max-w-6xl mx-auto space-y-20">
          {/* Unified Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start auto-rows-min"
            ref={cardsRef}
          >
            {/* Executive Board (President & Vice-President) */}
            {boardLeaders.map((member) => (
              <div key={member.id} className="col-span-1 h-full">
                <button
                  onClick={() => actions.handleMemberClick(member)}
                  className="w-full text-left h-full"
                  aria-label={t("common.viewDetails", { name: member.name })}
                >
                  <MemberCard.Root className="h-full">
                    <MemberCard.Avatar
                      src={memberPhotoUrl(member.photo)}
                      alt={member.name}
                      className="w-32 h-32"
                    />
                    <div className="text-center space-y-1">
                      <MemberCard.Name>{member.name}</MemberCard.Name>
                      <MemberCard.Role>
                        {t(`roles.${member.role}`)}
                      </MemberCard.Role>
                    </div>
                  </MemberCard.Root>
                </button>
              </div>
            ))}

            {/* Directories Grid */}
            {directories.map((directory) => {
              const isExpanded = state.expandedDirectoryId === directory.id;

              return (
                <div
                  key={directory.id}
                  className={cn(
                    "transition-all duration-500 ease-in-out h-full",
                    isExpanded
                      ? "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 order-first lg:order-none"
                      : "col-span-1",
                  )}
                >
                  <DirectoryAccordion
                    directory={directory}
                    isExpanded={isExpanded}
                    onToggle={() => actions.handleToggleDirectory(directory.id)}
                    onMemberClick={actions.handleMemberClick}
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <MemberDetailModal
        member={state.selectedMember}
        isOpen={!!state.selectedMember}
        onClose={actions.handleCloseModal}
      />
    </section>
  );
};
