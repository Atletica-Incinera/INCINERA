"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Athlete, Team } from "@/data/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useTeamsList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const handleAthleteClick = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
  };

  const handleCloseModal = () => {
    setSelectedAthlete(null);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = containerRef.current?.children;
      if (sections) {
        gsap.fromTo(
          sections,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return {
    refs: { containerRef },
    state: { selectedAthlete },
    actions: { handleAthleteClick, handleCloseModal },
  };
};
