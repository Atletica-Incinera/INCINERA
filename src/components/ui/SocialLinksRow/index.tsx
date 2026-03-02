import React from "react";
import {
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Github,
  Globe,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { SocialLinks } from "@/data/types";

interface SocialLinksRowProps {
  links: SocialLinks;
  websiteUrl?: string;
  className?: string;
}

export function SocialLinksRow({
  links,
  websiteUrl,
  className,
}: SocialLinksRowProps) {
  const tCommon = useTranslations("Common");

  const showWebsite = links.personalWebsite || links.website || websiteUrl;
  const websiteHref = links.personalWebsite || links.website || websiteUrl;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {showWebsite && (
        <a
          href={websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer"
          aria-label={tCommon("social.website") || "Website"}
        >
          <Globe size={22} />
        </a>
      )}
      {links.instagram && (
        <a
          href={links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer"
          aria-label={tCommon("social.instagram")}
        >
          <Instagram size={22} />
        </a>
      )}
      {links.linkedin && (
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-secondary hover:bg-[#0077b5] hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer"
          aria-label={tCommon("social.linkedin")}
        >
          <Linkedin size={22} />
        </a>
      )}
      {links.twitter && (
        <a
          href={links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-secondary hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer"
          aria-label={tCommon("social.twitter")}
        >
          <Twitter size={22} />
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-secondary hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer"
          aria-label={tCommon("social.github")}
        >
          <Github size={22} />
        </a>
      )}
      {links.email && (
        <a
          href={`mailto:${links.email}`}
          className="w-12 h-12 rounded-full bg-secondary hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all hover:scale-110 shrink-0 cursor-pointer"
          aria-label={tCommon("social.email")}
        >
          <Mail size={22} />
        </a>
      )}
    </div>
  );
}
