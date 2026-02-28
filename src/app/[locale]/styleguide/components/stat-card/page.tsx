"use client";

import { StatCard } from "@/components/ui/StatCard";

export default function StatCardShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">StatCard</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A card component for displaying numeric statistics with card
          treatment. Uses data attributes for GSAP counter animations. 
          Includes a subtle top glow and hover state.
        </p>
      </div>

      {/* 4-column demo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">4-Column Layout</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard countValue={30000} suffix="+" label="impressões em eventos" />
          <StatCard countValue={5} prefix="Top " suffix="°" label="melhor computação do Brasil" />
          <StatCard countValue={3} label="maiores notas de corte UFPE" />
          <StatCard countValue={100} suffix="%" label="presença em INTERENG & JUPS" />
        </div>
      </section>

      {/* Single */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Single Card</h2>
        <div className="max-w-[200px]">
          <StatCard countValue={30000} suffix="+" label="impressões em eventos" />
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Usage</h2>
        <p className="text-muted-foreground text-sm">
          The <code className="bg-muted px-1 rounded">countValue</code> prop sets
          the <code className="bg-muted px-1 rounded">data-count</code> attribute
          for GSAP counter animations via <code className="bg-muted px-1 rounded">gsap.to(counter, {'{ val: target }'} )</code>.
        </p>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { StatCard } from "@/components/ui/StatCard"

// Basic
<StatCard countValue={30000} suffix="+" label="impressões em eventos" />

// With prefix
<StatCard countValue={5} prefix="Top " suffix="°" label="melhor computação do Brasil" />

// Grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatCard countValue={30000} suffix="+" label="..." />
  <StatCard countValue={5} prefix="Top " suffix="°" label="..." />
</div>`}</pre>
        </div>
      </section>
    </div>
  );
}
