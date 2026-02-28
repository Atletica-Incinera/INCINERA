"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, User } from "lucide-react";

export default function InputShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Input</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Standard text entry component with support for icons and localized
          placeholders.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Basic Examples</h2>
        <div className="grid max-w-sm gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" placeholder="Ex: João Silva" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">With Icons</h2>
        <div className="grid max-w-sm gap-6">
          <div className="space-y-2">
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar equipes..." className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>User Identifier</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Nome de usuário" className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">States</h2>
        <div className="grid max-w-sm gap-6">
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Input disabled placeholder="Campo desabilitado" />
          </div>
          <div className="space-y-2">
            <Label className="text-destructive">Error State (Demo)</Label>
            <Input
              className="border-destructive focus-visible:ring-destructive"
              placeholder="Valor inválido"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`}</pre>
        </div>
      </section>
    </div>
  );
}
