"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function TextareaShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Textarea</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Multi-line text input for longer responses and messages.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Basic Usage</h2>
        <div className="grid max-w-md gap-2">
          <Label htmlFor="message">Sua Mensagem</Label>
          <Textarea
            id="message"
            placeholder="Como podemos ajudar você ou sua equipe?"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">States</h2>
        <div className="grid max-w-md gap-8">
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Textarea disabled placeholder="Este campo está desabilitado" />
          </div>
          <div className="space-y-2">
            <Label className="text-destructive">Error (Demo)</Label>
            <Textarea
              className="border-destructive focus-visible:ring-destructive"
              placeholder="Mensagem muito curta"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your Message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`}</pre>
        </div>
      </section>
    </div>
  );
}
