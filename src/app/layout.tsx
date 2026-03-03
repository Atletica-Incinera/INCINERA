import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Sora } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import "./globals.css";
import type { Metadata } from "next";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/logo.svg",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('incinera-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${sora.variable} font-sans antialiased transition-colors duration-200 ease-in-out`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <MotionProvider>
              {children}
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster
          position="top-right"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-sora, sans-serif)",
              borderRadius: "var(--radius)",
            },
            classNames: {
              success: "!border-primary/40",
              error: "!border-destructive/40",
            },
          }}
        />
      </body>
    </html>
  );
}

