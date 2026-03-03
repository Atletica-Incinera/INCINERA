import {
  Target,
  Flame,
  Smartphone,
  Calendar,
  Code2,
  Brain,
  BarChart3,
  Palette,
  Shield,
  Cloud,
  type LucideIcon,
} from "lucide-react";

/** Pilares de valor para patrocinadores */
export interface Pillar {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export const pillars: Pillar[] = [
  { icon: Target, titleKey: "pillars.talent.title", descKey: "pillars.talent.desc" },
  { icon: Flame, titleKey: "pillars.regional.title", descKey: "pillars.regional.desc" },
  { icon: Smartphone, titleKey: "pillars.reach.title", descKey: "pillars.reach.desc" },
  { icon: Calendar, titleKey: "pillars.presence.title", descKey: "pillars.presence.desc" },
];

/** Cards de estatísticas */
export interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  labelKey: string;
}

export const stats: Stat[] = [
  { value: 30000, suffix: "+", prefix: "", labelKey: "stats.impressions" },
  { value: 5, suffix: "°", prefix: "Top ", labelKey: "stats.ranking" },
  { value: 3, suffix: "", prefix: "", labelKey: "stats.courses" },
  { value: 100, suffix: "%", prefix: "", labelKey: "stats.events" },
];

/** Chaves para lista de ativações de patrocínio */
export const activations: string[] = [
  "activations.uniforms",
  "activations.banners",
  "activations.instagram",
  "activations.events",
  "activations.competitions",
  "activations.website",
  "activations.newsletters",
  "activations.equipment",
];

/** Perfis de profissionais para seção de audiência */
export interface Profile {
  icon: LucideIcon;
  labelKey: string;
}

export const profiles: Profile[] = [
  { icon: Code2, labelKey: "audience.profiles.fullstack" },
  { icon: Brain, labelKey: "audience.profiles.aiml" },
  { icon: BarChart3, labelKey: "audience.profiles.data" },
  { icon: Palette, labelKey: "audience.profiles.ux" },
  { icon: Shield, labelKey: "audience.profiles.security" },
  { icon: Cloud, labelKey: "audience.profiles.cloud" },
];

/** Badges de eventos exibidos no Impact Banner */
export const impactEventBadges = ["INTERENG", "JUPS", "UFPE"] as const;
