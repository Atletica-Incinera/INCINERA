import { getTranslations } from "next-intl/server";
import { TeamsList } from "@/components/sections/TeamsList";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { loadTeams } from "@/data/loaders/loadTeams";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Revalida os dados do Google Sheets a cada 1h
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Teams");
  return {
    title: t("pageTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("pageTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: "https://incinera.cin.ufpe.br/equipes",
    },
  };
}

export default async function TeamsPage() {
  const [teams, t] = await Promise.all([loadTeams(), getTranslations("Teams")]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 w-full pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-20 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline group"
            >
              <ArrowLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />
              {t("backToHome")}
            </Link>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground">
                {t("pageTitle")}
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-primary italic">
                {t("subtitle")}
              </p>
            </div>
          </div>

          <TeamsList teams={teams} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
