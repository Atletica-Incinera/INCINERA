"use client";

import { useTranslations } from "next-intl";
import { useDirectorySection } from "./useDirectorySection";
import { directoriesData, executiveBoard } from "@/data/directory";
import { DirectoryAccordion } from "./DirectoryAccordion";
import { MemberDetailModal } from "./MemberDetailModal";
import { MemberCard } from "@/components/ui/MemberCard";
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { memberPhotoUrl } from "@/data/utils/cloudinary";

export const DirectorySection = () => {
  const t = useTranslations("Directory");
  const { refs, state, actions } = useDirectorySection();

  return (
    <section
      id="directory"
      ref={refs.sectionRef}
      className="relative w-full py-24 lg:py-40 bg-background"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div ref={refs.titleRef} className="text-center mb-20 space-y-4">
          <SectionTitle>
            {t("title")}
          </SectionTitle>
          <SectionSubtitle>
            {t("subtitle")}
          </SectionSubtitle>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* Unified Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start auto-rows-min" ref={refs.cardsRef}>
            
            {/* President */}
            <div className="col-span-1 h-full">
              <button 
                onClick={() => actions.handleMemberClick(executiveBoard.president)}
                className="w-full text-left h-full"
                aria-label={t("common.viewDetails", { name: executiveBoard.president.name })}
              >
                <MemberCard.Root className="h-full">
                  <MemberCard.Avatar src={memberPhotoUrl(executiveBoard.president.photo)} alt={executiveBoard.president.name} className="w-32 h-32" />
                  <div className="text-center space-y-1">
                    <MemberCard.Name>{executiveBoard.president.name}</MemberCard.Name>
                    <MemberCard.Role>{t(`roles.${executiveBoard.president.role}`)}</MemberCard.Role>
                  </div>
                </MemberCard.Root>
              </button>
            </div>

            {/* Vice President */}
            <div className="col-span-1 h-full">
              <button 
                onClick={() => actions.handleMemberClick(executiveBoard.vicePresident)}
                className="w-full text-left h-full"
                aria-label={t("common.viewDetails", { name: executiveBoard.vicePresident.name })}
              >
                <MemberCard.Root className="h-full">
                  <MemberCard.Avatar src={memberPhotoUrl(executiveBoard.vicePresident.photo)} alt={executiveBoard.vicePresident.name} className="w-32 h-32" />
                  <div className="text-center space-y-1">
                    <MemberCard.Name>{executiveBoard.vicePresident.name}</MemberCard.Name>
                    <MemberCard.Role>{t(`roles.${executiveBoard.vicePresident.role}`)}</MemberCard.Role>
                  </div>
                </MemberCard.Root>
              </button>
            </div>

            {/* Directories Grid */}
            {directoriesData.map((directory) => {
              const isExpanded = state.expandedDirectoryId === directory.id;

              return (
                <div 
                  key={directory.id} 
                  className={cn(
                    "transition-all duration-500 ease-in-out h-full",
                    isExpanded ? "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 order-first lg:order-none" : "col-span-1"
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
