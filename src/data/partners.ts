export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  website?: string;
}

export interface Partner {
  id: string;
  name: string;
  logoPath: string;
  url?: string;
  description?: string; // Legacy, prefer i18n
  socialLinks?: SocialLinks;
}

export const sponsors: Partner[] = [
  {
    id: "s1",
    name: "Sponsor 1",
    logoPath: "/images/partners/placeholder-logo.svg",
    url: "https://example.com",
    socialLinks: {
      website: "https://example.com",
      instagram: "https://instagram.com/sponsor1",
      linkedin: "https://linkedin.com/company/sponsor1"
    }
  },
  {
    id: "s2",
    name: "Sponsor 2",
    logoPath: "/images/partners/placeholder-logo.svg",
    url: "https://example.com",
    socialLinks: {
      website: "https://example.com",
      instagram: "https://instagram.com/sponsor2"
    }
  },
  {
    id: "s3",
    name: "Sponsor 3",
    logoPath: "/images/partners/placeholder-logo.svg",
    url: "https://example.com",
    socialLinks: {
      website: "https://example.com"
    }
  },
];

export const partners: Partner[] = [
  {
    id: "p1",
    name: "Partner 1",
    logoPath: "/images/partners/placeholder-logo.svg",
    url: "https://example.com",
    socialLinks: {
      website: "https://example.com"
    }
  },
  {
    id: "p2",
    name: "Partner 2",
    logoPath: "/images/partners/placeholder-logo.svg",
    url: "https://example.com",
    socialLinks: {
      website: "https://example.com"
    }
  },
  {
    id: "p3",
    name: "Partner 3",
    logoPath: "/images/partners/placeholder-logo.svg",
    url: "https://example.com",
    socialLinks: {
      website: "https://example.com",
      instagram: "https://instagram.com/partner3"
    }
  },
];
