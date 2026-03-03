"use client";

import { SectionSeparator } from "@/components/ui/SectionSeparator";

export default function SectionSeparatorPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">SectionSeparator</h1>
        <p className="text-lg text-muted-foreground">
          Componente de decoração e separação visual entre seções.
        </p>
      </div>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Variantes</h2>
        </div>

        <div className="space-y-12 p-8 border border-border rounded-xl bg-card">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
              glow-line
            </h3>
            <SectionSeparator variant="glow-line" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
              angled-scar
            </h3>
            <SectionSeparator variant="angled-scar" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
              ember-drift
            </h3>
            <SectionSeparator variant="ember-drift" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
              flame-peak
            </h3>
            <SectionSeparator variant="flame-peak" />
          </div>
        </div>
      </section>
    </div>
  );
}
