"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Partner } from "@/data/partners";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const usePartnersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const handleCloseModal = () => {
    setSelectedPartner(null);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Sponsors reveal
      if (sponsorsRef.current) {
        gsap.fromTo(
          sponsorsRef.current.children,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sponsorsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Partners reveal
      if (partnersRef.current) {
        gsap.fromTo(
          partnersRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: partnersRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return {
    refs: {
      sectionRef,
      sponsorsRef,
      partnersRef,
    },
    state: {
      selectedPartner,
    },
    actions: {
      handlePartnerClick,
      handleCloseModal,
    }
  };
};
