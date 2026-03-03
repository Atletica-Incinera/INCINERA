"use client";

import { SocialLinksRow } from "@/components/ui/SocialLinksRow";

export default function SocialLinksRowPage() {
  const exampleLinks = {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
    email: "test@example.com",
    website: "https://example.com",
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">SocialLinksRow</h1>
        <p className="text-lg text-muted-foreground">
          Linha de ícones sociais padronizada.
        </p>
      </div>

      <section className="space-y-6">
        <div className="p-8 border border-border rounded-xl bg-card">
          <SocialLinksRow links={exampleLinks} />
        </div>
      </section>
    </div>
  );
}
