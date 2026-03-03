"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useFooter } from "./useFooter";
import { Instagram, Mail, Linkedin, MessageCircle } from "lucide-react";
import { AppImage } from "@/components/ui/AppImage";
import { ContactLinkCard } from "@/components/ui/ContactLinkCard";
import { brandImageUrl } from "@/data/utils/cloudinary";

export const Footer = () => {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const { footerRef } = useFooter();

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-background border-t border-border pt-15 pb-10 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Logo & Tagline */}
          <div className="">
            <AppImage
              src={brandImageUrl("brand/logo-text")}
              alt={tNav("logoAlt")}
              width={612}
              height={408}
              className="h-30 w-auto object-contain mx-auto"
            />
            <p className="text-xl font-bold text-primary italic">
              {t("tagline")}
            </p>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-wrap justify-center gap-6">
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
              label={t("whatsapp")}
            />
          </div>

          {/* Bottom Info */}
          <div className="w-full pt-12 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground font-medium">
              {t("copyright")}
            </p>

            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-victor-25b434235/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <Linkedin className="h-4 w-4" />
              <span className="text-sm font-medium">{t("developedBy")}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
