"use client";

import { Link } from "@/i18n/routing";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { navigation } from "../navigation";

export default function ComponentsDirectory() {
  const componentsSection = navigation.find((s) => s.title === "UI Components");
  const customSection = navigation.find((s) => s.title === "Custom Components");
  const patternsSection = navigation.find((s) => s.title === "Patterns");

  return (
    <div className="space-y-12 py-10">
      <div>
        <h1 className="text-4xl font-black mb-4 tracking-tight uppercase">
          Components Directory
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Explore our library of individual components and design patterns.
        </p>
      </div>

      <div className="grid gap-12">
        {/* UI Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">
            UI Components (shadcn/ui)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {componentsSection?.items.map((item) => (
              <Link key={item.href} href={item.href as any}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>Base library component</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Custom Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">
            Custom Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {customSection?.items.map((item) => (
              <Link key={item.href} href={item.href as any}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>Tailored for Incinera</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Patterns */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patternsSection?.items.map((item) => (
              <Link key={item.href} href={item.href as any}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>Complex layout patterns</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
