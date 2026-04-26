"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { pitchSlides } from "./pitchData";

/**
 * usePitchDeck — logic hook for the pitch presentation.
 *
 * Handles:
 *  - Slide navigation (keyboard + click)
 *  - Fullscreen toggle
 *  - Auto-hide navigation bar (shows on mouse move, hides after 3s)
 *  - Transition state for slide animations
 */
export function usePitchDeck() {
  const totalSlides = pitchSlides.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Navigation ── */

  const goTo = useCallback(
    (index: number, dir?: "next" | "prev") => {
      if (index < 0 || index >= totalSlides) return;
      setDirection(dir ?? (index > currentSlide ? "next" : "prev"));
      setCurrentSlide(index);
    },
    [currentSlide, totalSlides],
  );

  const next = useCallback(() => {
    if (currentSlide < totalSlides - 1) goTo(currentSlide + 1, "next");
  }, [currentSlide, goTo, totalSlides]);

  const prev = useCallback(() => {
    if (currentSlide > 0) goTo(currentSlide - 1, "prev");
  }, [currentSlide, goTo]);

  /* ── Fullscreen ── */

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  /* ── Keyboard ── */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "Escape" && isFullscreen) {
        // browser handles ESC for fullscreen natively
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, toggleFullscreen, isFullscreen]);

  /* ── Auto-hide nav bar ── */

  const showNav = useCallback(() => {
    setNavVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setNavVisible(false), 3000);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mousemove", showNav);
    el.addEventListener("touchstart", showNav);

    // initial auto-hide
    hideTimerRef.current = setTimeout(() => setNavVisible(false), 3000);

    return () => {
      el.removeEventListener("mousemove", showNav);
      el.removeEventListener("touchstart", showNav);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showNav]);

  return {
    slides: pitchSlides,
    currentSlide,
    totalSlides,
    direction,
    isFullscreen,
    navVisible,
    containerRef,
    next,
    prev,
    goTo,
    toggleFullscreen,
  };
}
