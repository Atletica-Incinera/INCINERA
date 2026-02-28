"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FoundationPage() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Foundation</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Core design tokens and foundations for the INCINERA brand identity.
        </p>
      </div>

      {/* Colors Section */}
      <section id="colors" className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Colors</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary */}
          <Card className="overflow-hidden">
            <div className="h-32 bg-primary" />
            <CardHeader>
              <CardTitle>Primary (Brand Red)</CardTitle>
              <CardDescription>--primary: oklch(0.55 0.25 25)</CardDescription>
            </CardHeader>
          </Card>

          {/* Background */}
          <Card className="overflow-hidden">
            <div className="h-32 bg-background border-b" />
            <CardHeader>
              <CardTitle>Background</CardTitle>
              <CardDescription>--background: oklch(0.08 0 0)</CardDescription>
            </CardHeader>
          </Card>

          {/* Foreground */}
          <Card className="overflow-hidden">
            <div className="h-32 bg-foreground" />
            <CardHeader>
              <CardTitle>Foreground (Text)</CardTitle>
              <CardDescription>--foreground: oklch(0.985 0 0)</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ColorSwatch name="Muted" variable="var(--muted)" />
          <ColorSwatch name="Accent" variable="var(--accent)" />
          <ColorSwatch name="Card" variable="var(--card)" />
          <ColorSwatch name="Border" variable="var(--border)" />
        </div>
      </section>

      {/* Typography Section */}
      <section id="typography" className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Typography (Sora)</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="space-y-6 bg-card p-8 rounded-xl border">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono">
              H1 - Black 48px
            </span>
            <h1 className="text-5xl font-black tracking-tighter">
              ATLÉTICA INCINERA
            </h1>
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono">
              Section Title - Black 72px
            </span>
            <h2 className="text-7xl font-black uppercase tracking-tighter">
              QUEM SOMOS
            </h2>
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono">
              Section Subtitle - Bold Italic 24px
            </span>
            <p className="text-2xl text-primary font-bold italic">
              A garra que nos move.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono">
              H3 - ExtraBold 30px
            </span>
            <h2 className="text-3xl font-extrabold">
              A chama que não se apaga.
            </h2>
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-mono">
              P - Regular 16px
            </span>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
              Junte-se à maior força esportiva do Centro de Informática da UFPE.
              Competimos com garra, paixão e o calor que só o CIn pode oferecer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ColorSwatch({ name, variable }: { name: string; variable: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-16 w-full rounded-md border"
        style={{ backgroundColor: variable }}
      />
      <div className="px-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-[10px] text-muted-foreground font-mono">
          {variable}
        </p>
      </div>
    </div>
  );
}
