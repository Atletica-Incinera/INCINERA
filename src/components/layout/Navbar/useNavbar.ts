"use client";

import { useState, useEffect } from "react";

export function useNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/#about" },
    { key: "teams", href: "/equipes" },
    { key: "directory", href: "/#directory" },
    { key: "partners", href: "/#partners" },
    { key: "contact", href: "/#contact" },
  ];

  return {
    state: {
      isScrolled,
      isMobileMenuOpen,
      navLinks,
    },
    actions: {
      toggleMobileMenu,
      closeMobileMenu,
    },
  };
}
