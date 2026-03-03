"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";


export function useNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname !== "/" || isManualScrolling.current) return;

      const sections = ["about", "directory", "partners", "contact"];
      let currentSection = "home";

      if (window.scrollY < 100) {
        currentSection = "home";
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Element covers upper half of viewport or its top is within top half
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              currentSection = section;
              break;
            }
          }
        }

        // Check if user is at the bottom of the page
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
          currentSection = "contact";
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/equipes") {
      setActiveSection("teams");
    } else if (pathname === "/") {
      window.dispatchEvent(new Event("scroll"));
    }
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Optimistic UI update to feel instant
    if (href === "/equipes") {
      setActiveSection("teams");
    } else if (href === "/") {
      setActiveSection("home");
    } else if (href.startsWith("/#")) {
      const section = href.replace("/#", "");
      setActiveSection(section);
    }

    // Set manual scrolling flag to prevent scroll listener from fighting the click
    isManualScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);

    // If the user is on the homepage, hijack hash links and home link
    if (pathname === "/") {
      if (href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        const element = document.getElementById(targetId);
        
        if (element) {
          // Native smooth scroll to bypass Next.js router overhead
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", e.currentTarget.href);
        }
        closeMobileMenu();
        return;
      }
      
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", e.currentTarget.href);
        closeMobileMenu();
        return;
      }
    }
    
    // Otherwise, normal Next.js routing occurs for cross-page navigation
    closeMobileMenu();
  };

  const navLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/#about" },
    { key: "directory", href: "/#directory" },
    { key: "partners", href: "/#partners" },
    { key: "contact", href: "/#contact" },
    { key: "teams", href: "/equipes" },
  ];

  return {
    state: {
      isScrolled,
      isMobileMenuOpen,
      navLinks,
      activeSection,
    },
    actions: {
      toggleMobileMenu,
      closeMobileMenu,
      handleNavClick,
    },
  };
}
