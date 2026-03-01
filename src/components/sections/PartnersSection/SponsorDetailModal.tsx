"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { AppImage } from "@/components/ui/AppImage";
import { Partner } from "@/data/partners";
import { partnerLogoUrl } from "@/data/utils/cloudinary";
import { Modal } from "@/components/ui/Modal";
import { SocialLinksRow } from "@/components/ui/SocialLinksRow";

interface SponsorDetailModalProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorDetailModal = ({ partner, isOpen, onClose }: SponsorDetailModalProps) => {
  const t = useTranslations("Partners");

  if (!partner) return null;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content aria-labelledby="partner-name">
        <Modal.Close />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full h-full items-center md:items-start">
          {/* Left Column: Logo */}
          <div className="w-full md:w-2/5 shrink-0 flex flex-col pt-6 md:pt-0">
            <AppImage
              src={partnerLogoUrl(partner.logoPath)}
              alt={partner.name}
              width={400}
              height={400}
              containerClassName="relative w-full aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-black/10 border border-border/50 bg-white flex items-center justify-center p-8"
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col flex-1 pb-6 md:pb-0 justify-center">
            <Modal.Header className="mb-6">
              <h2 id="partner-name" className="text-3xl md:text-5xl font-black text-foreground mb-4 font-sora tracking-tight border-b-4 border-primary pb-2 inline-block">
                {partner.name}
              </h2>
            </Modal.Header>

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
                  <SocialLinksRow links={partner.socialLinks || {}} websiteUrl={partner.url} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
