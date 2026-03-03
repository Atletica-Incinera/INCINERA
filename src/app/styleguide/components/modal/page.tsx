"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Modal</h1>
        <p className="text-lg text-muted-foreground">
          Componente base para Modais usando o pattern Compound Component.
        </p>
      </div>

      <section className="space-y-6">
        <div className="p-8 border border-border rounded-xl bg-card flex justify-center">
          <Button onClick={() => setIsOpen(true)}>Abrir Modal de Teste</Button>

          <Modal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <h2 className="text-2xl font-black text-foreground mb-2 tracking-tight">
                  Título do Modal
                </h2>
                <p className="text-primary font-bold">
                  Subtítulo ou Informação
                </p>
              </Modal.Header>

              <div className="space-y-4 mt-6">
                <p className="text-muted-foreground">
                  Este é um modal de exemplo. O conteúdo é renderizado usando os
                  componentes
                  <code> Modal.Root</code>, <code> Modal.Overlay</code>,{" "}
                  <code> Modal.Content</code>,<code> Modal.Header</code> e{" "}
                  <code> Modal.Close</code>.
                </p>
                <div className="h-32 bg-secondary rounded-xl flex items-center justify-center">
                  Espaço para conteúdo
                </div>
              </div>

              <Modal.Close />
            </Modal.Content>
          </Modal.Root>
        </div>
      </section>
    </div>
  );
}
