"use client";

import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { AppImage } from "@/components/ui/AppImage";
import { motion } from "framer-motion";
import { SettingsDropdown } from "../SettingsDropdown";
import { useNavbar } from "./useNavbar";
import { brandImageUrl } from "@/data/utils/cloudinary";

export function Navbar() {
  const t = useTranslations("Navigation");
  const { state, actions } = useNavbar();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background text-foreground ${
        state.isScrolled
          ? "border-b border-primary shadow-lg shadow-primary/5"
          : "border-b border-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[1px] bg-primary"
        style={{ width: "var(--scroll-progress, 0%)" }}
      />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center cursor-pointer"
        >
          <AppImage 
            src={brandImageUrl("brand/logo-text")} 
            alt={t("logoAlt")} 
            width={170} 
            height={60} 
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {state.navLinks.map((link) => {
            const isActive = state.activeSection === link.key;
            
            return (
              <Link
                key={link.key}
                href={link.href}
                onClick={(e) => actions.handleNavClick(e, link.href)}
                className="group relative py-2 font-medium text-sm transition-colors"
              >
                <span className={`relative z-10 transition-colors ${
                  isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                }`}>
                  {t(link.key)}
                </span>

                {/* Active indicator (animates between tabs) */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-primary pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out pointer-events-none" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Settings Dropdown */}
          <SettingsDropdown />

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground p-1 rounded-md hover:bg-accent transition-colors"
            onClick={actions.toggleMobileMenu}
            aria-label={t("toggleMenu")}
          >
            {state.isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          state.isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button Mobile Menu */}
        <button
          onClick={actions.closeMobileMenu}
          className="absolute top-6 right-6 p-2 rounded-full bg-accent/20 text-foreground hover:bg-accent transition-colors"
          aria-label={t("toggleMenu")}
        >
          <X size={28} />
        </button>

        {state.navLinks.map((link) => {
          const isActive = state.activeSection === link.key;
          return (
            <Link
              key={link.key}
              href={link.href}
              onClick={(e) => actions.handleNavClick(e, link.href)}
              className={`text-2xl font-bold tracking-tight transition-colors ${
                isActive ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {t(link.key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
