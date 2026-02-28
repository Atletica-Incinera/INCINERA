export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  github?: string;
}

export interface Athlete {
  id: string;
  name: string;
  imagePath: string;
  course?: string;
  sports: string[];
  socialLinks?: SocialLinks;
}

export interface Team {
  id: string;
  sportKey: string;
  sportName?: string;
  athletes: Athlete[];
}

const generateAthletes = (count: number, sportKey: string): Athlete[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `Atleta ${i + 1}`,
    imagePath: "/images/teams/athlete-placeholder.webp",
    course: "cc",
    sports: [sportKey],
    socialLinks: {
      instagram: "https://instagram.com/incinera" // Placeholder link
    }
  }));
};

export const teams: Team[] = [
  {
    id: "futsal-m",
    sportKey: "sports.futsalMale",
    sportName: "Futsal Masculino",
    athletes: generateAthletes(12, "futsal"),
  },
  {
    id: "futsal-f",
    sportKey: "sports.futsalFemale",
    sportName: "Futsal Feminino",
    athletes: generateAthletes(10, "futsal"),
  },
  {
    id: "volei-m",
    sportKey: "sports.volleyballMale",
    sportName: "Vôlei Masculino",
    athletes: generateAthletes(8, "volei"),
  },
  {
    id: "volei-f",
    sportKey: "sports.volleyballFemale",
    sportName: "Vôlei Feminino",
    athletes: generateAthletes(8, "volei"),
  },
  {
    id: "basquete",
    sportKey: "sports.basketball",
    sportName: "Basquete",
    athletes: generateAthletes(10, "basquete"),
  },
  {
    id: "handebol",
    sportKey: "sports.handball",
    sportName: "Handebol",
    athletes: generateAthletes(12, "handebol"),
  },
];
