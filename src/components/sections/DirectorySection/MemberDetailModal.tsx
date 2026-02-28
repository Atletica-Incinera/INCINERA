"use client";

import React, { useEffect, useRef } from "react";
import { X, Instagram, Linkedin, Twitter, Mail, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Member } from "@/data/directory";

interface MemberDetailModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MemberDetailModal = ({ member, isOpen, onClose }: MemberDetailModalProps) => {
  const t = useTranslations("Directory");
  const tCommon = useTranslations("Common");
  const modalRef = useRef<HTMLDivElement>(null);

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
      {isOpen && member && (
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
            aria-labelledby="member-name"
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

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full h-full">
              {/* Left Column: Photo */}
              <div className="w-full md:w-2/5 shrink-0 flex flex-col pt-6 md:pt-0">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-black/10 border bg-secondary/20">
                  <Image
                    src={member.photoLarge || member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>

              {/* Right Column: Info */}
              <div className="flex flex-col flex-1 pb-6 md:pb-0 justify-center">
                <div className="mb-8">
                  <h2 id="member-name" className="text-3xl md:text-5xl font-black text-foreground mb-2 font-sora tracking-tight">
                    {member.name}
                  </h2>
                  <p className="text-xl text-primary font-bold">
                    {t(`roles.${member.role}`)} {member.roleLiteral ? `- ${member.roleLiteral}` : ""}
                  </p>
                </div>

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
                          } catch (e) {
                          }
                          return (
                            <li key={sport} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                              {translatedSport}
                            </li>
                          )
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
                            // Only try to translate if it looks like a key
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
                  {(member.socialLinks?.instagram || member.socialLinks?.linkedin || member.socialLinks?.twitter || member.socialLinks?.email || member.socialLinks?.github) && (
                    <div className="pl-4 border-l-4 border-primary pt-2">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                        {t("common.social")}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {member.socialLinks.instagram && (
                          <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.instagram")}>
                            <Instagram size={22} />
                          </a>
                        )}
                        {member.socialLinks.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-[#0077b5] hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.linkedin")}>
                            <Linkedin size={22} />
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.twitter")}>
                            <Twitter size={22} />
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.github")}>
                            <Github size={22} />
                          </a>
                        )}
                        {member.socialLinks.email && (
                          <a href={`mailto:${member.socialLinks.email}`} className="w-12 h-12 rounded-full bg-secondary hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer" aria-label={tCommon("social.email")}>
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
