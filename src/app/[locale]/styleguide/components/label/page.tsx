"use client";

import { Label } from "@/components/ui/label";

export default function LabelShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Label</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Renders an accessible label associated with a control.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Basic Usage</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="terms">Aceito os termos e condições</Label>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { Label } from "@/components/ui/label"

<Label htmlFor="email">Your email address</Label>`}</pre>
        </div>
      </section>
    </div>
  );
}
