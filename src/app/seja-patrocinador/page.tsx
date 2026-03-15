import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SponsorPage } from "@/components/sections/SponsorPage";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

// Página estática — sem dados dinâmicos do servidor; revalida metadata 1x/hora
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Sponsor");
  const tMeta = await getTranslations("Metadata");

  return {
    title: `${t("meta.title")}${tMeta("titleSuffix")}`,
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
    },
    alternates: {
      canonical: "https://incinera.cin.ufpe.br/seja-patrocinador",
    },
  };
}

export default function SejaPatrocinadorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        <SponsorPage />
      </main>
      <Footer />
    </div>
  );
}
