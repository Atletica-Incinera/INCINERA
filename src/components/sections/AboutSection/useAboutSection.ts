"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_IMAGES } from "@/data/about";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useAboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const navigateModal = (direction: "prev" | "next") => {
    setActiveIndex((prev) =>
      direction === "prev"
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : (prev + 1) % GALLERY_IMAGES.length,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") navigateModal("prev");
      if (e.key === "ArrowRight") navigateModal("next");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
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

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
          },
        },
      );

      // Body reveal
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          delay: 0.4,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 85%",
          },
        },
      );

      // Stacked images entrance animation
      gsap.fromTo(
        imageRefs.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return {
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
  };
};
