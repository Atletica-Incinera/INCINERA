import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SponsorPage } from "@/components/sections/SponsorPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sponsor" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `${t("meta.title")}${tMeta("titleSuffix")}`,
    description: t("meta.description"),
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
