import {
  Trophy,
  Target,
  BarChart3,
  Users,
  Shirt,
  Instagram,
  Globe,
  Megaphone,
  Mic2,
  Calendar,
  Medal,
  Code2,
  Brain,
  Palette,
  Shield,
  Cloud,
  Mail,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

/* ────────────────────────────── Types ────────────────────────────── */

export interface SlideBase {
  id: string;
  type: "cover" | "content" | "stats" | "bento" | "tiers" | "steps" | "quote";
  sectionTitle?: string;
}

export interface CoverSlide extends SlideBase {
  type: "cover";
  title: string;
  highlight: string;
  subtitle: string;
  badge: string;
  meta: string;
}

export interface ContentSlide extends SlideBase {
  type: "content";
  title: string;
  items: ContentItem[];
  layout?: "list" | "split" | "cards";
}

export interface ContentItem {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface StatsSlide extends SlideBase {
  type: "stats";
  title: string;
  subtitle?: string;
  stats: StatItem[];
  footnote?: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface BentoSlide extends SlideBase {
  type: "bento";
  title: string;
  items: BentoItem[];
}

export interface BentoItem {
  icon: LucideIcon;
  label: string;
  description: string;
  span?: "wide" | "normal";
}

export interface TierItem {
  name: string;
  emoji: string;
  price: string;
  exclusive: boolean;
  features: Record<string, string | boolean>;
  highlighted?: boolean;
}

export interface TiersSlide extends SlideBase {
  type: "tiers";
  title: string;
  tiers: TierItem[];
  featureLabels: string[];
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface StepsSlide extends SlideBase {
  type: "steps";
  title: string;
  steps: StepItem[];
  contacts: { label: string; value: string; icon: LucideIcon }[];
}

export interface QuoteSlide extends SlideBase {
  type: "quote";
  text: string;
  attribution: string;
}

export type PitchSlide =
  | CoverSlide
  | ContentSlide
  | StatsSlide
  | BentoSlide
  | TiersSlide
  | StepsSlide
  | QuoteSlide;

/* ────────────────────────────── Data ────────────────────────────── */

export const FEATURE_LABELS = [
  "Camisa — frente",
  "Camisa — costas",
  "Premiação temática",
  "Post dedicado",
  "Logo no site",
  "Palestras",
  "Divulgação de vagas",
  "Divulgação comunidade",
  "Logo nos posts",
  "Presença em eventos",
];

export const pitchSlides: PitchSlide[] = [
  /* ── 1. Cover ── */
  {
    id: "cover",
    type: "cover",
    title: "Conecte sua marca à",
    highlight: "elite tech",
    subtitle: "do Norte-Nordeste",
    badge: "Parceria Estratégica · CIn UFPE",
    meta: "Proposta de Parceria Estratégica 2026",
  },

  /* ── 2. Atléticas + Quem é a Incinera (merged) ── */
  {
    id: "about",
    type: "content",
    sectionTitle: "Sobre Nós",
    title: "A Incinera e o Mundo das Atléticas",
    layout: "split",
    items: [
      {
        icon: Trophy,
        title: "O que são atléticas?",
        description:
          "As atléticas universitárias são o coração social das universidades brasileiras. São o ponto de conexão mais forte entre marca e comunidade universitária — mais que aulas, mais que grupos acadêmicos.",
      },
      {
        icon: Users,
        title: "Quem é a Incinera?",
        description:
          "Atlética do Centro de Informática da UFPE (CIn). Representamos os alunos de Ciência da Computação, Engenharia da Computação e Sistemas de Informação — com equipes em futsal, vôlei, basquete, handebol, natação e e-Sports.",
      },
    ],
  },

  /* ── 3a. Por que patrocinar — Talento ── */
  {
    id: "why-talent",
    type: "stats",
    sectionTitle: "Por que patrocinar a Incinera",
    title: "Talento de Elite",
    subtitle: "Acesso direto aos profissionais mais disputados do mercado tech",
    stats: [
      { value: "Top 5", label: "Computação no Brasil (RUF/MEC)", icon: Trophy },
      {
        value: "3 cursos",
        label: "Maiores notas de corte da UFPE",
        icon: Target,
      },
    ],
    footnote:
      "Nossos membros são recrutados pelas maiores empresas do Porto Digital e do Brasil",
  },

  /* ── 3b. Por que patrocinar — Perfis ── */
  {
    id: "why-profiles",
    type: "bento",
    sectionTitle: "Por que patrocinar a Incinera",
    title: "Os profissionais que formamos",
    items: [
      {
        icon: Code2,
        label: "Devs Full Stack",
        description: "React, Node, Python, Go",
        span: "wide",
      },
      {
        icon: Brain,
        label: "Engenheiros de IA/ML",
        description: "Deep Learning, NLP, Computer Vision",
        span: "normal",
      },
      {
        icon: BarChart3,
        label: "Cientistas de Dados",
        description: "Analytics, BI, Big Data",
        span: "normal",
      },
      {
        icon: Palette,
        label: "UX/UI Designers",
        description: "Research, Prototipagem, Design Systems",
        span: "normal",
      },
      {
        icon: Shield,
        label: "Cybersecurity",
        description: "Pentesting, DevSecOps",
        span: "normal",
      },
      {
        icon: Cloud,
        label: "Cloud Engineers",
        description: "AWS, GCP, Azure, Infra",
        span: "wide",
      },
    ],
  },

  /* ── 3c. Por que patrocinar — Números e Abrangência ── */
  {
    id: "why-numbers",
    type: "stats",
    sectionTitle: "Por que patrocinar a Incinera",
    title: "Alcance e Abrangência",
    subtitle:
      "A maior comunidade esportiva de tecnologia do Norte-Nordeste",
    stats: [
      {
        value: "30.000+",
        label: "Impressões por ciclo de eventos",
        icon: BarChart3,
      },
      {
        value: "100%",
        label: "Presença em INTERENG & JUPS",
        icon: Calendar,
      },
      {
        value: "Generalista",
        label: "Todo o CIn + outras universidades via competições",
        icon: Users,
      },
    ],
    footnote:
      "Enquanto uma liga atinge 30–50 alunos de um nicho, a Incinera conecta toda a comunidade de informática",
  },

  /* ── 4. Projetos e Eventos ── */
  {
    id: "events",
    type: "content",
    sectionTitle: "O que fazemos",
    title: "Projetos e Eventos",
    layout: "cards",
    items: [
      {
        icon: Trophy,
        title: "InterCIn",
        description:
          "Jogos internos do Centro de Informática — nosso maior evento próprio com centenas de participantes",
      },
      {
        icon: Medal,
        title: "INTERENG & JUPS",
        description:
          "Competições estaduais e nacionais entre engenharias e universidades",
      },
      {
        icon: Users,
        title: "Integração",
        description:
          "Recepção de calouros, confraternizações e eventos sociais durante todo o ano",
      },
      {
        icon: Instagram,
        title: "Presença Digital",
        description:
          "Cobertura ativa nas redes sociais com alcance orgânico em todas as competições",
      },
    ],
  },

  /* ── 5. Onde sua marca estará ── */
  {
    id: "activations",
    type: "bento",
    sectionTitle: "Ativações",
    title: "Onde sua marca estará",
    items: [
      {
        icon: Shirt,
        label: "Camisas Oficiais",
        description: "Atlética + InterCIn — frente ou costas",
        span: "wide",
      },
      {
        icon: Instagram,
        label: "Posts Dedicados",
        description: "Instagram feed + stories com selo do tier",
        span: "normal",
      },
      {
        icon: Globe,
        label: "Site Oficial",
        description: "Logo na seção de parceiros da Incinera",
        span: "normal",
      },
      {
        icon: Megaphone,
        label: "Divulgação de Vagas",
        description: "WhatsApp e e-mail do CIn com cotas mensais",
        span: "normal",
      },
      {
        icon: Mic2,
        label: "Palestras",
        description: "No CIn ou online, organizadas por nós",
        span: "normal",
      },
      {
        icon: Medal,
        label: "Premiação Temática",
        description: "Medalhas e troféus do InterCIn com branding da empresa",
        span: "wide",
      },
    ],
  },

  /* ── 6. Pacotes de Patrocínio ── */
  {
    id: "tiers",
    type: "tiers",
    sectionTitle: "Pacotes",
    title: "Pacotes de Patrocínio",
    featureLabels: FEATURE_LABELS,
    tiers: [
      {
        name: "Master",
        emoji: "🔥",
        price: "R$ 4–6K/ano",
        exclusive: true,
        highlighted: true,
        features: {
          "Camisa — frente": true,
          "Camisa — costas": false,
          "Premiação temática": true,
          "Post dedicado": "Selo Master",
          "Logo no site": "Destaque",
          Palestras: "Até 3",
          "Divulgação de vagas": "4/mês",
          "Divulgação comunidade": "4/mês",
          "Logo nos posts": true,
          "Presença em eventos": "Todos",
        },
      },
      {
        name: "Ouro",
        emoji: "🥇",
        price: "R$ 2,5–4K/ano",
        exclusive: true,
        features: {
          "Camisa — frente": false,
          "Camisa — costas": true,
          "Premiação temática": false,
          "Post dedicado": "Selo Ouro",
          "Logo no site": true,
          Palestras: "Até 2",
          "Divulgação de vagas": "2/mês",
          "Divulgação comunidade": "3/mês",
          "Logo nos posts": true,
          "Presença em eventos": "Principais",
        },
      },
      {
        name: "Prata",
        emoji: "🥈",
        price: "R$ 1,2–2K/ano",
        exclusive: false,
        features: {
          "Camisa — frente": false,
          "Camisa — costas": false,
          "Premiação temática": false,
          "Post dedicado": "Selo Prata",
          "Logo no site": true,
          Palestras: "Até 1",
          "Divulgação de vagas": "1/mês",
          "Divulgação comunidade": "2/mês",
          "Logo nos posts": false,
          "Presença em eventos": "Selecionados",
        },
      },
      {
        name: "Bronze",
        emoji: "🥉",
        price: "R$ 0,5–1K/ano",
        exclusive: false,
        features: {
          "Camisa — frente": false,
          "Camisa — costas": false,
          "Premiação temática": false,
          "Post dedicado": "Selo Apoiador",
          "Logo no site": true,
          Palestras: false,
          "Divulgação de vagas": "1/2 meses",
          "Divulgação comunidade": "1/mês",
          "Logo nos posts": false,
          "Presença em eventos": "Menção",
        },
      },
    ],
  },

  /* ── 7. Próximos Passos ── */
  {
    id: "next-steps",
    type: "steps",
    sectionTitle: "Próximos Passos",
    title: "Vamos Começar?",
    steps: [
      {
        number: 1,
        title: "Escolher o pacote",
        description: "Que melhor se alinha com os objetivos da empresa",
      },
      {
        number: 2,
        title: "Alinhar ativações",
        description: "Calendário, formatos e datas de início",
      },
      {
        number: 3,
        title: "Iniciar a parceria",
        description: "Assinar o contrato e começar as ativações",
      },
    ],
    contacts: [
      { label: "E-mail", value: "incinera@cin.ufpe.br", icon: Mail },
      { label: "Instagram", value: "@aaaincinera", icon: Instagram },
      { label: "Site", value: "incinera.cin.ufpe.br", icon: Globe },
    ],
  },

  /* ── 8. Dúvidas ── */
  {
    id: "questions",
    type: "quote",
    text: "Dúvidas?",
    attribution: "Atlética Incinera — CIn · UFPE",
  },
];
