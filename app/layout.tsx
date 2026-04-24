import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import logopurple from "@/src/images/logopurple.png";
import "./globals.css";

const sfPro = localFont({
  src: [
    {
      path: "../src/fonts/SF/SF-Pro-Display-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../src/fonts/SF/SF-Pro-Display-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

const horizon = localFont({
  src: "../src/fonts/Horizon.otf",
  variable: "--font-horizon",
  display: "swap",
  weight: "700",
});

const brexon = localFont({
  src: [
    {
      path: "../src/fonts/brexon/Brexon-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../src/fonts/brexon/Brexon-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-brexon",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  verification: {
    google: "UFMvRmPRPO4BAMqYfNQkzZ5_EMb7hxb6fnyfLQNDH0c",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [{ url: logopurple.src, type: "image/png" }],
    shortcut: [{ url: logopurple.src, type: "image/png" }],
    apple: [{ url: logopurple.src, type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${sfPro.variable} ${horizon.variable} ${brexon.variable} h-full antialiased`}
    >
      <body
        className="relative min-h-full overflow-hidden bg-background text-foreground"
        style={{ fontFamily: "var(--font-sf-pro)" }}
        suppressHydrationWarning
      >
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
        >
          <div className="absolute inset-x-0 -bottom-[12dvh] flex justify-center">
            <span className="horizon text-[clamp(4rem,24vw,22rem)] font-bold leading-none tracking-tight text-zinc-900/6 dark:text-zinc-100/10">
              JADER
            </span>
          </div>
        </div>
        <JsonLd />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
