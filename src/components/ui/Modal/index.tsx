"use client";

import React, { createContext, useContext } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useModal } from "./useModal";

interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within Modal.Root");
  }
  return context;
}

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalRoot({ isOpen, onClose, children }: ModalRootProps) {
  const { modalRef } = useModal({ isOpen, onClose });

  return (
    <ModalContext.Provider value={{ isOpen, onClose, modalRef }}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {children}
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

interface ModalOverlayProps {
  className?: string;
}

function ModalOverlay({ className }: ModalOverlayProps) {
  const { onClose } = useModalContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={cn("absolute inset-0 bg-black/60 backdrop-blur-sm", className)}
      aria-hidden="true"
    />
  );
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  "aria-labelledby"?: string;
}

function ModalContent({ children, className, ...props }: ModalContentProps) {
  const { modalRef } = useModalContext();
  return (
    <motion.div
      ref={modalRef as any}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={cn(
        "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-background rounded-3xl shadow-2xl z-10 p-6 md:p-10 hide-scrollbar",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ModalCloseProps {
  className?: string;
}

function ModalClose({ className }: ModalCloseProps) {
  const { onClose } = useModalContext();
  const tCommon = useTranslations("Common");
  
  return (
    <button
      onClick={onClose}
      className={cn(
        "absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-secondary/50 hover:bg-primary hover:text-white flex items-center justify-center transition-colors z-20 outline-none focus-visible:ring-2 ring-primary cursor-pointer",
        className
      )}
      aria-label={tCommon("buttons.close")}
    >
      <X size={24} />
    </button>
  );
}

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function ModalHeader({ children, className }: ModalHeaderProps) {
  return <div className={cn("mb-8", className)}>{children}</div>;
}

export const Modal = {
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Close: ModalClose,
  Header: ModalHeader,
};
