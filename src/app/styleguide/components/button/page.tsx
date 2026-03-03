"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";

export default function ButtonShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Button</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          The core interactive element used for actions and navigation. Based on
          shadcn/ui.
        </p>
      </div>

      {/* Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default</p>
            <Button>Próxima Etapa</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Secondary</p>
            <Button variant="secondary">Saiba Mais</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Outline</p>
            <Button variant="outline">Seja Sócio</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Ghost</p>
            <Button variant="ghost">Cancelar</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Destructive</p>
            <Button variant="destructive">Excluir</Button>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Sizes</h2>
        <div className="flex flex-wrap gap-4 items-baseline">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large (lg)</p>
            <Button size="lg">Botão Largo</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Default</p>
            <Button>Botão Padrão</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small (sm)</p>
            <Button size="sm">Botão Pequeno</Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Icon</p>
            <Button size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Custom/Brand Styles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Brand Styles</h2>
        <div className="flex flex-wrap gap-8 items-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Rounded Full + Shadow
            </p>
            <Button className="rounded-full px-8 shadow-lg shadow-primary/20">
              Conheça a Incinera
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Hero CTA (Hero.tsx pattern)
            </p>
            <Button
              size="lg"
              className="h-14 px-8 rounded-full text-lg font-bold shadow-[0_4px_14px_0_hsl(var(--primary)/0.39)] hover:shadow-[0_6px_20px_rgba(var(--primary)/0.5)] transition-all group"
            >
              Explorar{" "}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button disabled>Disabled State</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
        </div>
      </section>

      {/* Usage Documentation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Documentation</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { Button } from "@/components/ui/button"

// Padrão Hero
<Button 
  size="lg" 
  className="rounded-full shadow-primary/20"
>
  CTA Principal
</Button>

// Com Ícone
<Button>
  <Mail className="mr-2 h-4 w-4" /> Enviar E-mail
</Button>`}</pre>
        </div>
      </section>
    </div>
  );
}
