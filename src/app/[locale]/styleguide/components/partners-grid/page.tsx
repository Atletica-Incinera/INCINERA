"use client";

export default function PartnersGridShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          Partners Grid
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A grid pattern for displaying partner logos with grayscale to color
          hover effects.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Example Grid</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="group relative block aspect-video bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              <div className="absolute inset-0 flex items-center justify-center p-8 grayscale group-hover:grayscale-0 transition-all duration-500">
                <div className="w-full h-full bg-muted/20 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code Pattern</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
  <div className="group relative block aspect-video bg-card border rounded-xl overflow-hidden hover:border-primary/50">
    <div className="absolute inset-0 flex items-center justify-center p-8 grayscale group-hover:grayscale-0 transition-all">
       <Image ... />
    </div>
  </div>
</div>`}</pre>
        </div>
      </section>
    </div>
  );
}
