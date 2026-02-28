import { useTranslations } from "next-intl";
import { TeamsList } from "@/components/sections/TeamsList";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function TeamsPage() {
  const t = useTranslations("Teams");

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
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
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

          <TeamsList />
        </div>
      </main>

      <Footer />
    </div>
  );
}
