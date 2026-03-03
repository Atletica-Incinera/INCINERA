"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useMapSection } from "./useMapSection";
import { MapPin, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const MapSection = () => {
  const t = useTranslations("Map");
  const { theme } = useTheme();
  const { sectionRef, cardRef } = useMapSection();

  return (
    <section
      id="map"
      ref={sectionRef}
      className="relative w-full h-[600px] bg-background overflow-hidden"
    >
      {/* Map Embed (Dark Styled via CSS filter conditionally) */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.3905829656116!2d-34.9535311239922!3d-8.0551000804759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1969f28a4feb%3A0x3469e38f13f5721!2sCentro%20de%20Inform%C3%A1tica%20(CIn)%20-%20UFPE!5e0!3m2!1spt-BR!2sbr!4v1708980000000!5m2!1spt-BR!2sbr"
        width="100%"
        height="100%"
        style={{ 
          border: 0, 
          filter: theme === "dark" ? "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" : "none" 
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={t("title")}
      />

      {/* Address Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center md:justify-start md:pl-[10%]">
        <div
          ref={cardRef}
          className="pointer-events-auto p-8 md:p-12 max-w-md bg-background/80 backdrop-blur-xl border border-border rounded-3xl shadow-2xl space-y-4"
        >
          <div className="flex items-center gap-3 text-primary">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight">
              {t("title")}
            </h3>
          </div>
          <p className="text-lg font-medium text-muted-foreground leading-relaxed">
            {t("address")}
          </p>
          <div className="pt-4">
            <a
              href="https://maps.app.goo.gl/FJKGc7AsxS13Y9bv8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary font-bold hover:underline"
            >
              {t("viewOnGoogleMaps")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
