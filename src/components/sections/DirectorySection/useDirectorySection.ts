"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Member } from "@/data/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useDirectorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [expandedDirectoryId, setExpandedDirectoryId] = useState<string | null>(
    null,
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleToggleDirectory = (id: string) => {
    setExpandedDirectoryId((prev) => (prev === id ? null : id));
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      );

      // Cards staggered reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return {
    refs: {
      sectionRef,
      titleRef,
      cardsRef,
    },
    state: {
      expandedDirectoryId,
      selectedMember,
    },
    actions: {
      handleToggleDirectory,
      handleMemberClick,
      handleCloseModal,
    },
  };
};
