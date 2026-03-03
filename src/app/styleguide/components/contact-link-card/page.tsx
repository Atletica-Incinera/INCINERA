"use client";

import { ContactLinkCard } from "@/components/ui/ContactLinkCard";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export default function ContactLinkCardShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          ContactLinkCard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          A pill-shaped link card used for social channels and contact methods.
          Features a hover state with primary border color and icon scaling.
        </p>
      </div>

      {/* Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Examples</h2>
        <div className="flex flex-wrap gap-6">
          <ContactLinkCard
            href="https://instagram.com/aaaincinera"
            external
            icon={<Instagram />}
            label="@aaaincinera"
          />
          <ContactLinkCard
            href="mailto:incinera@cin.ufpe.br"
            icon={<Mail />}
            label="incinera@cin.ufpe.br"
          />
          <ContactLinkCard
            href="https://chat.whatsapp.com/BtMucFCWxeHGnONMXTSejb"
            external
            icon={<MessageCircle />}
            label="Comunidade no WhatsApp"
          />
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Usage</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { ContactLinkCard } from "@/components/ui/ContactLinkCard"
import { Instagram } from "lucide-react"

<ContactLinkCard
  href="https://instagram.com/aaaincinera"
  external
  icon={<Instagram />}
  label="@aaaincinera"
/>`}</pre>
        </div>
      </section>
    </div>
  );
}
