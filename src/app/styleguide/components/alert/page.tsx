"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";

export default function AlertShowcase() {
  return (
    <div className="space-y-16 pb-20">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Alert</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Contextual feedback messages for user actions or information.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Default</h2>
        <div className="max-w-2xl">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Informativo</AlertTitle>
            <AlertDescription>
              As inscrições para a copa CIn abrem na próxima semana. Confira os
              requisitos no edital.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Destructive</h2>
        <div className="max-w-2xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              Você precisa ser aluno do CIn ou ex-aluno para participar desta
              modalidade.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Code</h2>
        <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>
    Description message goes here.
  </AlertDescription>
</Alert>`}</pre>
        </div>
      </section>
    </div>
  );
}
