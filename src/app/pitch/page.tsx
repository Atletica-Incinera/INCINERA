import type { Metadata } from "next";
import { PitchPresentation } from "./PitchPresentation";

export const metadata: Metadata = {
  title: "Proposta de Parceria Estratégica 2026",
  description:
    "Apresentação de patrocínio da Atlética Incinera — CIn UFPE. Conecte sua marca à elite tech do Norte-Nordeste.",
  robots: { index: false, follow: false },
};

/**
 * /pitch — fullscreen presentation page.
 * No navbar, no footer — immersive slide deck experience.
 */
export default function PitchPage() {
  return <PitchPresentation />;
}
