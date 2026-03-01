"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useAboutSection } from "./useAboutSection";
import { AppImage } from "@/components/ui/AppImage";
import { SectionTitle, SectionSubtitle } from "@/components/ui/typography";
import { GALLERY_IMAGES, STACK_STYLES } from "@/data/about";
import { galleryImageUrl } from "@/data/utils/cloudinary";

export const AboutSection = () => {
  const t = useTranslations("About");
  const {
    sectionRef,
    titleRef,
    subtitleRef,
    bodyRef,
    imageContainerRef,
    modalOpen,
    activeIndex,
    openModal,
    closeModal,
    navigateModal,
    imageRefs,
  } = useAboutSection();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40 bg-background overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <SectionTitle ref={titleRef}>
                {t("title")}
              </SectionTitle>
              <SectionSubtitle ref={subtitleRef}>
                {t("subtitle")}
              </SectionSubtitle>
            </div>

            <p
              ref={bodyRef}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              {t("body")}
            </p>

            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>

          {/* Image Gallery — Stacked */}
          <div
            ref={imageContainerRef}
            className="relative w-full max-w-[500px] mx-auto"
            style={{ height: "450px" }}
          >
            {GALLERY_IMAGES.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                className="fire-frame-wrapper absolute cursor-pointer"
                data-gallery-index={index}
                  style={{
                    width: "280px",
                    height: "200px",
                  top: STACK_STYLES[index].top,
                  left: STACK_STYLES[index].left,
                  zIndex: STACK_STYLES[index].zIndex,
                  transform: `rotate(${STACK_STYLES[index].rotate})`,
                    willChange: "transform",
                  }}
                onClick={() => openModal(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={t("gallery.expandImage")}
                onKeyDown={(e) => e.key === "Enter" && openModal(index)}
                >
                      <AppImage
                        src={galleryImageUrl(img.src, true)}
                        alt={t(
                          `gallery.image${index + 1}Alt` as
                            | "gallery.image1Alt"
                            | "gallery.image2Alt"
                            | "gallery.image3Alt"
                        )}
                        fill
                        containerClassName="fire-frame"
                        className="object-cover rounded-[calc(var(--radius)-2px)]"
                        sizes="280px"
                        loading="lazy"
                      />
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Expandido */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery.expandImage")}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              aria-label={t("gallery.closeModal")}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200 hover:scale-110 hover:rotate-90 cursor-pointer bg-primary text-primary-foreground"
            >
              &times;
            </button>

            {/* Imagem Expandida */}
            <div
              className="relative rounded-xl overflow-hidden shadow-[0_0_40px_var(--color-primary)]"
            >
              <AppImage
                src={galleryImageUrl(GALLERY_IMAGES[activeIndex].src)}
                alt={
                  activeIndex < 3
                    ? t(
                        `gallery.image${activeIndex + 1}Alt` as
                          | "gallery.image1Alt"
                          | "gallery.image2Alt"
                          | "gallery.image3Alt"
                      )
                    : t("gallery.expandImage")
                }
                width={900}
                height={600}
                className="object-contain max-h-[80vh] w-auto"
                priority
              />
            </div>

            {/* Navegação Prev/Next */}
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none w-full px-4">
              <button
                onClick={() => navigateModal("prev")}
                aria-label={t("gallery.previousImage")}
                className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer bg-primary/85 text-white backdrop-blur-sm"
              >
                ❮
              </button>
              <div className="flex-1" />
              <button
                onClick={() => navigateModal("next")}
                aria-label={t("gallery.nextImage")}
                className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer bg-primary/85 text-white backdrop-blur-sm"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
