"use client";

import { useState, useRef, useEffect } from "react";
import { useSafeTriangle } from "./SafeTriangle";

export function useSettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const openDropdown = () => setIsOpen(true);

  useSafeTriangle({
    triggerRef: buttonRef,
    menuRef: menuRef,
    isOpen,
    onClose: closeDropdown,
    delay: 400,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return {
    refs: {
      buttonRef,
      menuRef,
    },
    state: {
      isOpen,
    },
    actions: {
      toggleDropdown,
      openDropdown,
    }
  };
}
