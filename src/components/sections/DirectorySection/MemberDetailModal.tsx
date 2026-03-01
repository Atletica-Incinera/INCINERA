"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { AppImage } from "@/components/ui/AppImage";
import { Member } from "@/data/directory";
import { memberPhotoUrl } from "@/data/utils/cloudinary";
import { Modal } from "@/components/ui/Modal";
import { SocialLinksRow } from "@/components/ui/SocialLinksRow";

interface MemberDetailModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MemberDetailModal = ({ member, isOpen, onClose }: MemberDetailModalProps) => {
  const t = useTranslations("Directory");

  if (!member) return null;

  const hasSocialLinks = member.socialLinks && (
    member.socialLinks.instagram || 
    member.socialLinks.linkedin || 
    member.socialLinks.twitter || 
    member.socialLinks.email || 
    member.socialLinks.github
  );

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content aria-labelledby="member-name">
        <Modal.Close />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full h-full">
          {/* Left Column: Photo */}
          <div className="w-full md:w-2/5 shrink-0 flex flex-col pt-6 md:pt-0">
            <AppImage
              src={memberPhotoUrl(member.photoLarge || member.photo, true)}
              alt={member.name}
              fill
              containerClassName="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-black/10 border bg-secondary/20"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col flex-1 pb-6 md:pb-0 justify-center">
            <Modal.Header>
              <h2 id="member-name" className="text-3xl md:text-5xl font-black text-foreground mb-2 font-sora tracking-tight">
                {member.name}
              </h2>
              <p className="text-xl text-primary font-bold">
                {t(`roles.${member.role}`)} {member.roleLiteral ? `- ${member.roleLiteral}` : ""}
              </p>
            </Modal.Header>

            <div className="space-y-6">
              {/* Sports */}
              {member.sports.length > 0 && (
                <div className="pl-4 border-l-4 border-primary">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                    {t("common.sports")}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {member.sports.map((sport) => {
                      let translatedSport = sport;
                      try {
                        if (/^[a-z]+$/.test(sport)) {
                          translatedSport = t(`sports.${sport}` as any);
                        }
                      } catch (e) {}
                      return (
                        <li key={sport} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                          {translatedSport}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Course */}
              {member.course && (
                <div className="pl-4 border-l-4 border-primary">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                    {t("common.course")}
                  </h3>
                  <p className="text-foreground font-semibold md:text-lg">
                    {(() => {
                      try {
                        if (/^[a-z]+$/.test(member.course)) {
                          return t(`courses.${member.course}` as any);
                        }
                        return member.course;
                      } catch {
                        return member.course;
                      }
                    })()}
                  </p>
                </div>
              )}

              {/* Social Links */}
              {hasSocialLinks && (
                <div className="pl-4 border-l-4 border-primary pt-2">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    {t("common.social")}
                  </h3>
                  <SocialLinksRow links={member.socialLinks} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
