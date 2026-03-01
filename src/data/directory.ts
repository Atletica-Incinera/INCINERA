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
  role: string; // I18n key for role
  roleLiteral?: string;
  photo: string;
  photoLarge?: string;
  sports: string[]; // I18n keys for sports
  course: string; // I18n key for course
  socialLinks: SocialLinks;
}

export interface Directory {
  id: string; // Also used as I18n key for directory name in Directory.names
  name: string; // Fallback or legacy, preferred to use t(`names.${id}`)
  image: string;
  director: Member;
  viceDirector?: Member;
  members: Member[];
}

export const executiveBoard = {
  president: {
    id: "pres-1",
    name: "Carlos Andrade",
    role: "president",
    photo: "placeholders/default",
    photoLarge: "placeholders/default",
    sports: ["basquete"],
    course: "ec",
    socialLinks: {
      instagram: "https://instagram.com/carlos",
      linkedin: "https://linkedin.com/in/carlos"
    }
  } as Member,
  vicePresident: {
    id: "vp-1",
    name: "Marina Silva",
    role: "vicePresident",
    photo: "placeholders/default",
    photoLarge: "placeholders/default",
    sports: ["volei"],
    course: "si",
    socialLinks: {
      instagram: "https://instagram.com/marina"
    }
  } as Member,
};

export const directoriesData: Directory[] = [
  {
    id: "marketing",
    name: "Comunicação",
    image: "directory/comunicacao",
    director: {
      id: "dir-marketing-1",
      name: "Maria Oliveira",
      role: "director",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["volei", "natacao"],
      course: "ec",
      socialLinks: {
        instagram: "https://instagram.com/maria",
        linkedin: "https://linkedin.com/in/maria",
        email: "maria@cin.ufpe.br"
      }
    },
    viceDirector: {
      id: "vice-marketing-1",
      name: "Pedro Santos",
      role: "viceDirector",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["futsal"],
      course: "cc",
      socialLinks: {
        instagram: "https://instagram.com/pedro",
        linkedin: "https://linkedin.com/in/pedro"
      }
    },
    members: [
      {
        id: "member-marketing-1",
        name: "Ana Costa",
        role: "member",
        photo: "placeholders/default",
        photoLarge: "placeholders/default",
        sports: ["basquete", "handebol"],
        course: "si",
        socialLinks: {
          instagram: "https://instagram.com/ana"
        }
      },
      {
        id: "member-marketing-2",
        name: "Leticia Almeida",
        role: "member",
        photo: "placeholders/default",
        photoLarge: "placeholders/default",
        sports: ["futebol"],
        course: "si",
        socialLinks: {
          instagram: "https://instagram.com/leticia"
        }
      }
    ]
  },
  {
    id: "esportes",
    name: "Esportes",
    image: "directory/esportes",
    director: {
      id: "dir-esportes-1",
      name: "João Silva",
      role: "director",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["futsal", "futebol"],
      course: "ec",
      socialLinks: {
        instagram: "https://instagram.com/joao",
        linkedin: "https://linkedin.com/in/joao"
      }
    },
    members: [
        {
          id: "member-esportes-1",
          name: "Carlos Eduardo",
          role: "member",
          photo: "placeholders/default",
          photoLarge: "placeholders/default",
          sports: ["handebol"],
          course: "cc",
          socialLinks: {}
        }
    ]
  },
  {
    id: "financeiro",
    name: "Financeiro",
    image: "directory/financeiro",
    director: {
      id: "dir-financeiro-1",
      name: "Roberto Mendes",
      role: "director",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["basquete"],
      course: "cc",
      socialLinks: {
        linkedin: "https://linkedin.com/in/roberto"
      }
    },
    viceDirector: {
      id: "vice-financeiro-1",
      name: "Camila Barros",
      role: "viceDirector",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["volei"],
      course: "si",
      socialLinks: {
        instagram: "https://instagram.com/camila"
      }
    },
    members: [
      {
        id: "member-financeiro-1",
        name: "Tiago Gomes",
        role: "member",
        photo: "placeholders/default",
        photoLarge: "placeholders/default",
        sports: ["esports"],
        course: "es",
        socialLinks: {}
      }
    ]
  },
  {
    id: "eventos",
    name: "Eventos",
    image: "directory/eventos",
    director: {
      id: "dir-eventos-1",
      name: "Amanda Nunes",
      role: "director",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["handebol", "natacao"],
      course: "cc",
      socialLinks: {
        instagram: "https://instagram.com/amanda",
        linkedin: "https://linkedin.com/in/amanda"
      }
    },
    viceDirector: {
      id: "vice-eventos-1",
      name: "Felipe Melo",
      role: "viceDirector",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["futsal"],
      course: "ec",
      socialLinks: {
        instagram: "https://instagram.com/felipe"
      }
    },
    members: [
      {
        id: "member-eventos-1",
        name: "Sofia Lima",
        role: "member",
        photo: "placeholders/default",
        photoLarge: "placeholders/default",
        sports: ["volei", "basquete"],
        course: "si",
        socialLinks: {
          instagram: "https://instagram.com/sofia"
        }
      },
      {
        id: "member-eventos-2",
        name: "Lucas Rocha",
        role: "member",
        photo: "placeholders/default",
        photoLarge: "placeholders/default",
        sports: ["futebol"],
        course: "si",
        socialLinks: {}
      }
    ]
  },
  {
    id: "produtos",
    name: "Produtos",
    image: "directory/produtos",
    director: {
      id: "dir-produtos-1",
      name: "Bruno Costa",
      role: "director",
      photo: "placeholders/default",
      photoLarge: "placeholders/default",
      sports: ["volei"],
      course: "cc",
      socialLinks: {
        linkedin: "https://linkedin.com/in/bruno"
      }
    },
    members: [
      {
        id: "member-produtos-1",
        name: "Juliana Silva",
        role: "member",
        photo: "placeholders/default",
        photoLarge: "placeholders/default",
        sports: ["basquete"],
        course: "si",
        socialLinks: {
          instagram: "https://instagram.com/juliana"
        }
      }
    ]
  }
];
