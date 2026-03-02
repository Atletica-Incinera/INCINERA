"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useTeamsList } from "./useTeamsList";
import { MemberCard } from "@/components/ui/MemberCard";
import { SectionTitle } from "@/components/ui/typography";
import { AthleteDetailModal } from "./AthleteDetailModal";
import { athletePhotoUrl } from "@/data/utils/cloudinary";
import type { Team, TeamKey } from "@/data/types";

interface TeamsListProps {
  teams: Team[];
}

/** i18n keys for each TeamKey — map to Teams.sports.* messages */
const TEAM_KEY_I18N: Record<TeamKey, string> = {
  "futsal-masculino": "sports.futsalMale",
  "futsal-feminino": "sports.futsalFemale",
  "volei-masculino": "sports.volleyballMale",
  "volei-feminino": "sports.volleyballFemale",
  "basquete-masculino": "sports.basketballMale",
  "basquete-feminino": "sports.basketballFemale",
  "handebol-masculino": "sports.handballMale",
  "handebol-feminino": "sports.handballFemale",
};

export const TeamsList = ({ teams }: TeamsListProps) => {
  const t = useTranslations("Teams");
  const tDir = useTranslations("Directory");
  const { refs, state, actions } = useTeamsList();

  return (
    <div ref={refs.containerRef} className="space-y-24">
      {teams.map((team) => {
        const i18nKey = TEAM_KEY_I18N[team.key];
        const teamName = t(i18nKey as any);

        return (
          <section key={team.key} className="space-y-12">
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
                  onClick={() => actions.handleAthleteClick(athlete)}
                  className="w-full text-left"
                  aria-label={tDir("common.viewDetails", {
                    name: athlete.name,
                  })}
                >
                  <MemberCard.Root className="p-4 gap-3 bg-card/50 border-border/50 h-full hover:border-primary/50 transition-colors group">
                    <MemberCard.Avatar
                      src={athletePhotoUrl(athlete.photo)}
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

      <AthleteDetailModal
        athlete={state.selectedAthlete}
        isOpen={!!state.selectedAthlete}
        onClose={actions.handleCloseModal}
      />
    </div>
  );
};
