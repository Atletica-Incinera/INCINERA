"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Member } from "@/data/directory";
import { Athlete } from "@/data/teams";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useTeamsList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleAthleteClick = (athlete: Athlete, teamName: string) => {
    setSelectedMember({
      id: athlete.id,
      name: athlete.name,
      role: "athlete",
      roleLiteral: teamName,
      photo: athlete.imagePath,
      photoLarge: athlete.imagePath,
      sports: athlete.sports || [teamName],
      course: athlete.course || "",
      socialLinks: athlete.socialLinks || {},
    });
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for each sport section
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
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return {
    refs: {
      containerRef,
    },
    state: {
      selectedMember,
    },
    actions: {
      handleAthleteClick,
      handleCloseModal,
    }
  };
};
