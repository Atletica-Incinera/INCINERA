"use client";

import { MemberCard } from "@/components/ui/MemberCard";

export default function MemberCardShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">MemberCard</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Custom component designed to showcase athletes, directors, and
          partners with high visual impact and hover interactions.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">
          Basic Usage (Directory)
        </h2>
        <div className="max-w-sm">
          <MemberCard.Root>
            <MemberCard.Avatar
              src="/images/directory/placeholder.webp"
              alt="João Victor"
            />
            <div className="text-center space-y-1">
              <MemberCard.Name>João Victor</MemberCard.Name>
              <MemberCard.Role>Diretoria Executiva</MemberCard.Role>
            </div>
          </MemberCard.Root>
        </div>
      </section>

      {/* Athlete Style */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">
          Athlete / Component List Variant
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <MemberCard.Root className="p-4 gap-3 bg-card/50 border-border/50">
            <MemberCard.Avatar
              src="/images/athletes/placeholder.webp"
              alt="Atleta da Silva"
              className="w-24 h-24"
            />
            <MemberCard.Name className="text-sm font-bold text-center group-hover:text-primary transition-colors">
              Atleta da Silva
            </MemberCard.Name>
          </MemberCard.Root>

          <MemberCard.Root className="p-4 gap-3 bg-card/50 border-border/50">
            <MemberCard.Avatar
              src="/images/athletes/placeholder.webp"
              alt="Atleta Santos"
              className="w-24 h-24"
            />
            <MemberCard.Name className="text-sm font-bold text-center group-hover:text-primary transition-colors">
              Atleta Santos
            </MemberCard.Name>
          </MemberCard.Root>
        </div>
      </section>

      {/* Technical Details */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Sub-components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold">MemberCard.Root</h4>
            <p className="text-sm text-muted-foreground">
              The wrapper that handles the hover scale (-translate-y-1), cursor-pointer, and glassmorphism
              transitions. Applies border-primary on hover.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">MemberCard.Avatar</h4>
            <p className="text-sm text-muted-foreground">
              Circular image wrapper with a reveal animation on the border. Uses
              Next.js Image component.
            </p>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { MemberCard } from "@/components/ui/MemberCard";

<MemberCard.Root>
  <MemberCard.Avatar src="/path/to/img" alt="Name" />
  <div className="text-center">
    <MemberCard.Name>Nome</MemberCard.Name>
    <MemberCard.Role>Cargo</MemberCard.Role>
  </div>
</MemberCard.Root>`}</pre>
        </div>
      </section>
    </div>
  );
}
