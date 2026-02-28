import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipes | INCINERA",
  description: "Conheça os atletas que representam a chama do CIn.",
};

export default function TeamsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      {children}
    </div>
  );
}
