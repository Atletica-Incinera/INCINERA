"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils";
import { navigation } from "./navigation";
import { brandImageUrl } from "@/data/utils/cloudinary";
import type { ComponentProps } from "react";

// href type para o Link do Next.js
type AppHref = ComponentProps<typeof Link>["href"];

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Issue #6 — logo alt via i18n ao invés de string hardcoded
  const tNav = useTranslations("Navigation");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — oculta em mobile (ferramenta interna: apenas desktop) */}
      {/* Issue #8 — hidden md:flex evita que a sidebar sobreponha o conteúdo em telas pequenas */}
      <aside className="hidden md:flex w-64 border-r bg-card p-6 flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
        <div>
          <Link href="/styleguide" className="flex items-center gap-2 group">
            <div className="relative w-32 h-10 transition-transform group-hover:scale-105">
              <AppImage
                src={brandImageUrl("brand/logo")}
                alt={tNav("logoAlt")}
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3 px-3">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href.includes("#") &&
                      pathname === item.href.split("#")[0]);

                  return (
                    <li key={item.href}>
                      {/* Issue #6 — href tipado via AppHref, eliminando `as any` */}
                      <Link
                        href={item.href as AppHref}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm transition-all font-medium",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          item.href.includes("#") && "pl-6 text-xs", // Indent anchors
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content — offset pela largura da sidebar em md+ */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 overflow-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
