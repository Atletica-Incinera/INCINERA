"use client";

export default function SectionHeadersShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          Section Headers
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Visual patterns for defining major sections of the landing page.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Main Pattern</h2>
        <div className="bg-background p-12 rounded-xl border border-dashed border-border flex flex-col items-center">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
              Título da Seção
            </h2>
            <p className="text-xl md:text-2xl text-primary font-bold italic">
              Subtítulo descritivo em destaque
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Usage</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`<div className="text-center space-y-4">
  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
    {title}
  </h2>
  <p className="text-xl md:text-2xl text-primary font-bold italic">
    {subtitle}
  </p>
</div>`}</pre>
        </div>
      </section>
    </div>
  );
}
