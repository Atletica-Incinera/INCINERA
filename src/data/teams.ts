/**
 * Static fallback data for the Teams section.
 *
 * Used when GOOGLE_SHEETS_ATHLETS_ID is not set or the API is unavailable.
 * Athlete shape must match the athleteSchema from team.schema.ts.
 */

import type { Athlete, Team, TeamKey } from "./schemas/team.schema";

const placeholder = "placeholders/default";

function mockAthletes(count: number, teamKeys: TeamKey[]): Athlete[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${teamKeys[0]}-${i + 1}`,
    name: `Atleta ${i + 1}`,
    photo: placeholder,
    teamKeys,
  }));
}

export const teams: Team[] = [
  {
    key: "futsal-masculino",
    athletes: mockAthletes(12, ["futsal-masculino"]),
  },
  {
    key: "futsal-feminino",
    athletes: mockAthletes(10, ["futsal-feminino"]),
  },
  {
    key: "volei-masculino",
    athletes: mockAthletes(8, ["volei-masculino"]),
  },
  {
    key: "volei-feminino",
    athletes: mockAthletes(8, ["volei-feminino"]),
  },
  {
    key: "basquete-masculino",
    athletes: mockAthletes(10, ["basquete-masculino"]),
  },
  {
    key: "basquete-feminino",
    athletes: mockAthletes(10, ["basquete-feminino"]),
  },
  {
    key: "handebol-masculino",
    athletes: mockAthletes(12, ["handebol-masculino"]),
  },
  {
    key: "handebol-feminino",
    athletes: mockAthletes(10, ["handebol-feminino"]),
  },
];
