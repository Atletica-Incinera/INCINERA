"use client";

import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { SettingsDropdown } from "../SettingsDropdown";
import { useNavbar } from "./useNavbar";

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
          <Image 
            src="/incinera-name.png" 
            alt={t("logoAlt")} 
            width={170} 
            height={60} 
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {state.navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="relative font-medium text-sm overflow-hidden group py-2"
            >
              <span className="relative z-10 transition-colors group-hover:text-primary">
                {t(link.key)}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
          ))}
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
        {state.navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            onClick={actions.closeMobileMenu}
            className="text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            {t(link.key)}
          </Link>
        ))}
      </div>
    </nav>
  );
}
