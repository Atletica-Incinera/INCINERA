"use client";

import { ValuePillarCard } from "@/components/ui/ValuePillarCard";
import { Target, Flame, Smartphone, Calendar } from "lucide-react";

export default function ValuePillarCardShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          ValuePillarCard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A compound component for displaying value propositions or feature
          pillars. Features an animated bottom border reveal on hover with the
          Incinera fire aesthetic.
        </p>
      </div>

      {/* Single card demo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Single Card</h2>
        <div className="max-w-md">
          <ValuePillarCard.Root>
            <ValuePillarCard.Icon>
              <Target />
            </ValuePillarCard.Icon>
            <ValuePillarCard.Title>Top Talent Tech</ValuePillarCard.Title>
            <ValuePillarCard.Body>
              Somos a atlética do melhor Centro de Informática do Norte-Nordeste
              e um dos 5 melhores do Brasil (RUF/MEC).
            </ValuePillarCard.Body>
          </ValuePillarCard.Root>
        </div>
      </section>

      {/* 2x2 grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">
          2×2 Grid (typical usage)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: Target,
              title: "Top Talent Tech",
              desc: "Acesso direto aos talentos mais disputados pelo mercado de TI.",
            },
            {
              icon: Flame,
              title: "Força Dominante em Tech",
              desc: "A maior comunidade esportiva de tecnologia em Pernambuco.",
            },
            {
              icon: Smartphone,
              title: "Visibilidade Garantida",
              desc: "30 mil impressões no Instagram durante eventos principais.",
            },
            {
              icon: Calendar,
              title: "Exposição 365 Dias",
              desc: "Presença garantida em todo o calendário acadêmico.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <ValuePillarCard.Root key={i}>
              <ValuePillarCard.Icon>
                <Icon />
              </ValuePillarCard.Icon>
              <ValuePillarCard.Title>{title}</ValuePillarCard.Title>
              <ValuePillarCard.Body>{desc}</ValuePillarCard.Body>
            </ValuePillarCard.Root>
          ))}
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Usage</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { ValuePillarCard } from "@/components/ui/ValuePillarCard"
import { Target } from "lucide-react"

<ValuePillarCard.Root>
  <ValuePillarCard.Icon>
    <Target />
  </ValuePillarCard.Icon>
  <ValuePillarCard.Title>Top Talent Tech</ValuePillarCard.Title>
  <ValuePillarCard.Body>
    Your description text here...
  </ValuePillarCard.Body>
</ValuePillarCard.Root>`}</pre>
        </div>
      </section>
    </div>
  );
}
