"use client";

import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  message?: string;
  id: string;
}

/**
 * FieldError — exibe mensagem de erro de campo de formulário com ícone e animação.
 * Retorna null se não houver mensagem. Usa role="alert" + aria-live para leitores de tela.
 */
export const FieldError = ({ message, id }: FieldErrorProps) => {
  if (!message) return null;
  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className="flex items-center gap-1.5 mt-1.5 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
