"use client";

import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";

export default function TypographyPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Typography</h1>
        <p className="text-lg text-muted-foreground">
          Componentes padronizados para títulos e subtítulos de seções.
        </p>
      </div>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">SectionTitle</h2>
          <p className="text-muted-foreground">Título principal de uma seção (padrão h2).</p>
        </div>
        
        <div className="p-8 border border-border rounded-xl bg-card space-y-8">
          <SectionTitle>DIRETORIA</SectionTitle>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">SectionSubtitle</h2>
          <p className="text-muted-foreground">Subtítulo que acompanha o SectionTitle (padrão p).</p>
        </div>
        
        <div className="p-8 border border-border rounded-xl bg-card space-y-8">
          <SectionSubtitle>Quem faz acontecer</SectionSubtitle>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Combinação</h2>
          <p className="text-muted-foreground">Uso comum dos dois componentes em conjunto.</p>
        </div>
        
        <div className="p-8 border border-border rounded-xl bg-card space-y-4">
          <SectionTitle>PATROCINADORES</SectionTitle>
          <SectionSubtitle>Empresas que acreditam no nosso potencial</SectionSubtitle>
        </div>
      </section>
    </div>
  );
}
