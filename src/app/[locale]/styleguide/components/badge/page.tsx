"use client";

import { Badge } from "@/components/ui/badge";

export default function BadgeShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Badge</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Visual indicators for status, categories, or small metadata.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default</p>
            <Badge>Novo</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Secondary</p>
            <Badge variant="secondary">Popular</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Outline</p>
            <Badge variant="outline">2026</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Destructive</p>
            <Badge variant="destructive">Encerrado</Badge>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">
          Brand Example (Hero Badge)
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Custom tracking and uppercase
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
            A chama que não se apaga
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { Badge } from "@/components/ui/badge"

<Badge variant="default">Label</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`}</pre>
        </div>
      </section>
    </div>
  );
}
