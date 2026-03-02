/**
 * Static fallback data for the Directory section.
 *
 * Used when the Google Sheets API is unavailable.
 * Must match the Member and Directory types from the member schema.
 */

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  github?: string;
  personalWebsite?: string;
}

export interface Member {
  id: string;
  name: string;
  role: "president" | "vicePresident" | "director" | "viceDirector" | "member";
  roleLiteral?: string;
  photo: string;
  photoLarge?: string;
  heroBadge?: string;
  bio: string;
  course: "ec" | "cc" | "si" | "ia";
  directoryId?:
    | "comunicacao"
    | "esportes"
    | "financeiro"
    | "eventos"
    | "produtos";
  emailCin: string;
  socialLinks: SocialLinks;
}

export interface Directory {
  id: string;
  name: string;
  image: string;
  director: Member;
  viceDirector?: Member;
  members: Member[];
}

const placeholder = "placeholders/default";

export const directoriesData: Directory[] = [
  {
    id: "comunicacao",
    name: "Comunicação",
    image: "directory/comunicacao",
    director: {
      id: "dir-comunicacao-1",
      name: "Maria Oliveira",
      role: "director",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Diretora de Comunicação",
      bio: "Responsável pela comunicação e marketing da Atlética.",
      course: "ec",
      emailCin: "maria@cin.ufpe.br",
      socialLinks: {
        instagram: "https://instagram.com/maria",
        linkedin: "https://linkedin.com/in/maria",
      },
    },
    viceDirector: {
      id: "vice-comunicacao-1",
      name: "Pedro Santos",
      role: "viceDirector",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Vice-Diretor de Comunicação",
      bio: "Apoia a diretoria de comunicação em todas as frentes.",
      course: "cc",
      emailCin: "pedro@cin.ufpe.br",
      socialLinks: {
        instagram: "https://instagram.com/pedro",
        linkedin: "https://linkedin.com/in/pedro",
      },
    },
    members: [
      {
        id: "member-comunicacao-1",
        name: "Ana Costa",
        role: "member",
        photo: placeholder,
        photoLarge: placeholder,
        heroBadge: "Design & Criação",
        bio: "Cuida da identidade visual da Atlética.",
        course: "si",
        emailCin: "ana@cin.ufpe.br",
        socialLinks: { instagram: "https://instagram.com/ana" },
      },
    ],
  },
  {
    id: "esportes",
    name: "Esportes",
    image: "directory/esportes",
    director: {
      id: "dir-esportes-1",
      name: "João Silva",
      role: "director",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Diretor de Esportes",
      bio: "Coordena todas as equipes esportivas da Atlética.",
      course: "ec",
      emailCin: "joao@cin.ufpe.br",
      socialLinks: {
        instagram: "https://instagram.com/joao",
        linkedin: "https://linkedin.com/in/joao",
      },
    },
    members: [
      {
        id: "member-esportes-1",
        name: "Carlos Eduardo",
        role: "member",
        photo: placeholder,
        photoLarge: placeholder,
        heroBadge: "Coordenador Esportivo",
        bio: "Apoia na organização dos times e campeonatos.",
        course: "cc",
        emailCin: "carlos@cin.ufpe.br",
        socialLinks: {},
      },
    ],
  },
  {
    id: "financeiro",
    name: "Financeiro",
    image: "directory/financeiro",
    director: {
      id: "dir-financeiro-1",
      name: "Roberto Mendes",
      role: "director",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Diretor Financeiro",
      bio: "Gerencia os recursos financeiros da Atlética.",
      course: "cc",
      emailCin: "roberto@cin.ufpe.br",
      socialLinks: { linkedin: "https://linkedin.com/in/roberto" },
    },
    viceDirector: {
      id: "vice-financeiro-1",
      name: "Camila Barros",
      role: "viceDirector",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Vice-Diretora Financeira",
      bio: "Auxilia na gestão financeira e planejamento orçamentário.",
      course: "si",
      emailCin: "camila@cin.ufpe.br",
      socialLinks: { instagram: "https://instagram.com/camila" },
    },
    members: [],
  },
  {
    id: "eventos",
    name: "Eventos",
    image: "directory/eventos",
    director: {
      id: "dir-eventos-1",
      name: "Amanda Nunes",
      role: "director",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Diretora de Eventos",
      bio: "Planeja e executa os eventos da Atlética ao longo do ano.",
      course: "cc",
      emailCin: "amanda@cin.ufpe.br",
      socialLinks: {
        instagram: "https://instagram.com/amanda",
        linkedin: "https://linkedin.com/in/amanda",
      },
    },
    viceDirector: {
      id: "vice-eventos-1",
      name: "Felipe Melo",
      role: "viceDirector",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Vice-Diretor de Eventos",
      bio: "Apoia na produção e logística dos eventos.",
      course: "ec",
      emailCin: "felipe@cin.ufpe.br",
      socialLinks: { instagram: "https://instagram.com/felipe" },
    },
    members: [
      {
        id: "member-eventos-1",
        name: "Sofia Lima",
        role: "member",
        photo: placeholder,
        photoLarge: placeholder,
        heroBadge: "Membro de Eventos",
        bio: "Participa ativamente da organização dos nossos eventos.",
        course: "si",
        emailCin: "sofia@cin.ufpe.br",
        socialLinks: { instagram: "https://instagram.com/sofia" },
      },
    ],
  },
  {
    id: "produtos",
    name: "Produtos",
    image: "directory/produtos",
    director: {
      id: "dir-produtos-1",
      name: "Bruno Costa",
      role: "director",
      photo: placeholder,
      photoLarge: placeholder,
      heroBadge: "Diretor de Produtos",
      bio: "Responsável pela linha de produtos e merchandising da Atlética.",
      course: "cc",
      emailCin: "bruno@cin.ufpe.br",
      socialLinks: { linkedin: "https://linkedin.com/in/bruno" },
    },
    members: [
      {
        id: "member-produtos-1",
        name: "Juliana Silva",
        role: "member",
        photo: placeholder,
        photoLarge: placeholder,
        heroBadge: "Membro de Produtos",
        bio: "Cuida do desenvolvimento e qualidade dos produtos.",
        course: "si",
        emailCin: "juliana@cin.ufpe.br",
        socialLinks: { instagram: "https://instagram.com/juliana" },
      },
    ],
  },
];
