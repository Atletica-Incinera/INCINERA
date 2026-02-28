export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Overview", href: "/styleguide" },
      { name: "Design Tokens", href: "/styleguide/foundation" },
    ],
  },
  {
    title: "UI Components",
    items: [
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Input", href: "/styleguide/components/input" },
      { name: "Textarea", href: "/styleguide/components/textarea" },
      { name: "Radio Group", href: "/styleguide/components/radio-group" },
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Label", href: "/styleguide/components/label" },
    ],
  },
  {
    title: "Custom Components",
    items: [
      { name: "MemberCard", href: "/styleguide/components/member-card" },
      { name: "ValuePillarCard", href: "/styleguide/components/value-pillar-card" },
      { name: "StatCard", href: "/styleguide/components/stat-card" },
      { name: "ContactLinkCard", href: "/styleguide/components/contact-link-card" },
    ],
  },
  {
    title: "Patterns",
    items: [
      {
        name: "Section Headers",
        href: "/styleguide/components/section-headers",
      },
      { name: "Partners Grid", href: "/styleguide/components/partners-grid" },
    ],
  },
];
