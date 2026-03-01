"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useTeamsList } from "./useTeamsList";
import { teams } from "@/data/teams";
import { MemberCard } from "@/components/ui/MemberCard";
import { SectionTitle } from "@/components/ui/typography";
import { MemberDetailModal } from "@/components/sections/DirectorySection/MemberDetailModal";
import { athletePhotoUrl } from "@/data/utils/cloudinary";

export const TeamsList = () => {
  const t = useTranslations("Teams");
  const tDir = useTranslations("Directory");
  const { refs, state, actions } = useTeamsList();

  return (
    <div ref={refs.containerRef} className="space-y-24">
      {teams.map((team) => {
        const teamName = t(team.sportKey);
        return (
          <section key={team.id} className="space-y-12">
            {/* Sport Title */}
            <div className="flex items-center gap-6">
              <SectionTitle className="text-3xl md:text-5xl whitespace-nowrap">
                {teamName}
              </SectionTitle>
              <div className="w-full h-[2px] bg-primary/20 rounded-full" />
            </div>

            {/* Athletes Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {team.athletes.map((athlete) => (
                <button
                  key={athlete.id}
                  onClick={() => actions.handleAthleteClick(athlete, teamName)}
                  className="w-full text-left"
                  aria-label={tDir("common.viewDetails", { name: athlete.name })}
                >
                  <MemberCard.Root className="p-4 gap-3 bg-card/50 border-border/50 h-full hover:border-primary/50 transition-colors group">
                    <MemberCard.Avatar
                      src={athletePhotoUrl(athlete.imagePath)}
                      alt={athlete.name}
                      className="w-24 h-24"
                    />
                    <MemberCard.Name className="text-sm font-bold text-center group-hover:text-primary transition-colors">
                      {athlete.name}
                    </MemberCard.Name>
                  </MemberCard.Root>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <MemberDetailModal
        member={state.selectedMember}
        isOpen={!!state.selectedMember}
        onClose={actions.handleCloseModal}
      />
    </div>
  );
};
