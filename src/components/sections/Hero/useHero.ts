import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function useHero() {
  const container = useRef<HTMLDivElement>(null);
  const redOverlay = useRef<HTMLDivElement>(null);
  const leftContent = useRef<HTMLDivElement>(null);
  const rightContent = useRef<HTMLDivElement>(null);
  const titleSplit1 = useRef<HTMLHeadingElement>(null);
  const titleSplit2 = useRef<HTMLHeadingElement>(null);
  const mascot = useRef<HTMLImageElement>(null);
  const particles = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Diagonal split reveal
      tl.to(redOverlay.current, {
        clipPath: "polygon(65% 0%, 100% 0%, 100% 100%, 50% 100%)",
        duration: 1.4,
        ease: "power4.inOut",
        delay: 0.2,
      })
        .fromTo(
          leftContent.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=1.2",
        )
        .fromTo(
          rightContent.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=1.0",
        )
        .to(
          redOverlay.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.6",
        )
        .fromTo(
          titleSplit1.current,
          { opacity: 0, y: 30, rotationX: 20 },
          { opacity: 1, y: 0, rotationX: 0, duration: 0.6 },
          "-=0.8",
        )
        .fromTo(
          titleSplit2.current,
          { opacity: 0, y: 30, rotationX: 20 },
          { opacity: 1, y: 0, rotationX: 0, duration: 0.6 },
          "-=0.5",
        )
        .fromTo(
          mascot.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" },
          "-=0.6",
        )
        .fromTo(
          particles.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.5",
        );

      // Floating mascot effect
      gsap.to(mascot.current, {
        y: -15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#about");
    }
  };

  return {
    refs: {
      container,
      redOverlay,
      leftContent,
      rightContent,
      titleSplit1,
      titleSplit2,
      mascot,
      particles,
    },
    actions: {
      handleScrollToAbout,
    },
  };
}
