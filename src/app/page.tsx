import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { DirectorySection } from "@/components/sections/DirectorySection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MapSection } from "@/components/sections/MapSection";
import { Footer } from "@/components/layout/Footer";
import { SectionSeparator } from "@/components/ui/SectionSeparator";
import { loadDirectoryData } from "@/data/loaders/loadDirectory";

// Revalida a cada 1h — evita cold-start do Google Sheets a cada visita
export const revalidate = 3600;

export default async function Home() {
  // Única request ao Google Sheets (em vez de 2 separadas)
  const { directories, executiveBoard } = await loadDirectoryData();

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        <Hero />

        <AboutSection />

        <SectionSeparator variant="angled-scar" className="my-[-20px] z-10" />

        <DirectorySection
          directories={directories}
          executiveBoard={executiveBoard}
        />

        <SectionSeparator variant="ember-drift" className="py-4" />

        <PartnersSection />

        <SectionSeparator variant="flame-peak" className="z-20 -px" />

        <ContactSection />

        <div className="h-32 bg-gradient-to-b from-background via-primary/5 to-card/20" />

        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
