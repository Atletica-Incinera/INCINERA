"use client";

import { AppImage } from "@/components/ui/AppImage";

export default function AppImagePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">AppImage</h1>
        <p className="text-lg text-muted-foreground">
          Wrapper para o componente de Imagem do Next.js com fallback padrão
          para imagens Cloudinary.
        </p>
      </div>

      <section className="space-y-6">
        <div className="p-8 border border-border rounded-xl bg-card">
          <AppImage
            src="/images/teams/athlete-placeholder.webp"
            alt="Placeholder"
            width={300}
            height={300}
            className="rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}
