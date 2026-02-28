"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Palette, Type } from "lucide-react";

export default function StyleguideIndex() {
  return (
    <div className="space-y-12 py-10">
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight uppercase">
          INCINERA <span className="text-primary italic">Styleguide</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Bem-vindo ao sistema de design da Atlética Incinera. Aqui você
          encontrará os tokens de design, componentes e padrões utilizados para
          construir nossa identidade digital.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
          <Palette className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-bold mb-3">Foundation</h2>
          <p className="text-muted-foreground mb-6">
            Cores, tipografia e tokens básicos que definem o visual da marca.
          </p>
          <Link href="/styleguide/foundation">
            <Button variant="outline" className="group/btn">
              Explorar Foundation
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
          <Box className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-bold mb-3">Components</h2>
          <p className="text-muted-foreground mb-6">
            Biblioteca de componentes reutilizáveis, desde botões até cards
            complexos.
          </p>
          <Link href="/styleguide/components">
            <Button variant="outline" className="group/btn">
              Ver Componentes
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <Type className="w-5 h-5 text-primary" />
          Princípios de Design
        </h3>
        <p className="text-muted-foreground italic">
          "A chama que não se apaga: agressividade esportiva aliada à excelência
          técnica do CIn."
        </p>
      </div>
    </div>
  );
}
