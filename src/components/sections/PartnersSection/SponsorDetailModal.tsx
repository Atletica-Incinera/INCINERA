"use client";

import React, { useEffect, useRef } from "react";
import { X, Instagram, Linkedin, Twitter, Mail, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Partner } from "@/data/partners";

interface SponsorDetailModalProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorDetailModal = ({ partner, isOpen, onClose }: SponsorDetailModalProps) => {
  const t = useTranslations("Partners");
  const tCommon = useTranslations("Common");
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap & escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && partner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-name"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-background rounded-3xl shadow-2xl z-10 p-6 md:p-10 hide-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-secondary/50 hover:bg-primary hover:text-white flex items-center justify-center transition-colors z-20 outline-none focus-visible:ring-2 ring-primary cursor-pointer"
              aria-label={tCommon("buttons.close")}
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full h-full items-center md:items-start">
              {/* Left Column: Logo */}
              <div className="w-full md:w-2/5 shrink-0 flex flex-col pt-6 md:pt-0">
                <div className="relative w-full aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-black/10 border border-border/50 bg-white flex items-center justify-center p-8">
                  <Image
                    src={partner.logoPath}
                    alt={partner.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Info */}
              <div className="flex flex-col flex-1 pb-6 md:pb-0 justify-center">
                <div className="mb-6">
                  <h2 id="partner-name" className="text-3xl md:text-5xl font-black text-foreground mb-4 font-sora tracking-tight border-b-4 border-primary pb-2 inline-block">
                    {partner.name}
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Description */}
                  <div className="text-muted-foreground text-lg leading-relaxed">
                    {t(`data.${partner.id}.description`)}
                  </div>

                  {/* Social Links */}
                  {(partner.socialLinks || partner.url) && (
                    <div className="pl-4 border-l-4 border-primary pt-2">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                        {t("common.linksAndSocial")}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {/* URL base como site */}
                        {(partner.socialLinks?.website || partner.url) && (
                          <a href={partner.socialLinks?.website || partner.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={t("common.website")}>
                            <Globe size={22} />
                          </a>
                        )}
                        {partner.socialLinks?.instagram && (
                          <a href={partner.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.instagram")}>
                            <Instagram size={22} />
                          </a>
                        )}
                        {partner.socialLinks?.linkedin && (
                          <a href={partner.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-[#0077b5] hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.linkedin")}>
                            <Linkedin size={22} />
                          </a>
                        )}
                        {partner.socialLinks?.twitter && (
                          <a href={partner.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.twitter")}>
                            <Twitter size={22} />
                          </a>
                        )}
                        {partner.socialLinks?.email && (
                          <a href={`mailto:${partner.socialLinks.email}`} className="w-12 h-12 rounded-full bg-secondary hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.email")}>
                            <Mail size={22} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
