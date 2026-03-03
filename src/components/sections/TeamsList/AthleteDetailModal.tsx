"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Globe, Instagram, Linkedin, Github, Twitter } from "lucide-react";
import { AppImage } from "@/components/ui/AppImage";
import { Modal } from "@/components/ui/Modal";
import { athletePhotoUrl } from "@/data/utils/cloudinary";
import type { Athlete, AthleteSocialType } from "@/data/types";

interface AthleteDetailModalProps {
  athlete: Athlete | null;
  isOpen: boolean;
  onClose: () => void;
}

const SOCIAL_ICON: Record<AthleteSocialType, React.ReactNode> = {
  instagram: <Instagram size={22} />,
  github: <Github size={22} />,
  linkedin: <Linkedin size={22} />,
  personalWebsite: <Globe size={22} />,
  twitter: <Twitter size={22} />,
};


const SOCIAL_HOVER_COLOR: Record<AthleteSocialType, string> = {
  instagram:
    "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white",
  github:
    "hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white",
  linkedin: "hover:bg-[#0077b5] hover:text-white",
  personalWebsite: "hover:bg-primary hover:text-white",
  twitter: "hover:bg-[#1DA1F2] hover:text-white",
};

export const AthleteDetailModal = ({
  athlete,
  isOpen,
  onClose,
}: AthleteDetailModalProps) => {
  const t = useTranslations("Directory");
  const tCommon = useTranslations("Common");

  if (!athlete) return null;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content aria-labelledby="athlete-name">
        <Modal.Close />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full h-full">
          {/* Photo */}
          <div className="w-full md:w-2/5 shrink-0 flex flex-col pt-6 md:pt-0">
            <AppImage
              src={athletePhotoUrl(athlete.photo)}
              alt={athlete.name}
              fill
              containerClassName="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-black/10 border bg-secondary/20"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex flex-col flex-1 pb-6 md:pb-0 justify-center">
            <Modal.Header>
              <h2
                id="athlete-name"
                className="text-3xl md:text-5xl font-black text-foreground mb-1 font-sora tracking-tight"
              >
                {athlete.name}
              </h2>
              <p className="text-xl text-primary font-bold">
                {t("roles.athlete")}
              </p>
            </Modal.Header>

            <div className="space-y-5 mt-6">
              {/* Course */}
              {athlete.course && (
                <div className="pl-4 border-l-4 border-primary">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">
                    {t("common.course")}
                  </h3>
                  <p className="text-foreground font-semibold md:text-lg">
                    {t(`courses.${athlete.course}` as Parameters<typeof t>[0])}
                  </p>
                </div>
              )}

              {/* Social Link */}
              {athlete.socialLink && (
                <div className="pl-4 border-l-4 border-primary pt-2">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    {t("common.social")}
                  </h3>
                  <a
                    href={athlete.socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tCommon(
                      `social.${athlete.socialLink.type === "personalWebsite" ? "website" : athlete.socialLink.type}` as Parameters<typeof tCommon>[0]
                    )}
                    className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer ${SOCIAL_HOVER_COLOR[athlete.socialLink.type]}`}
                  >
                    {SOCIAL_ICON[athlete.socialLink.type]}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
