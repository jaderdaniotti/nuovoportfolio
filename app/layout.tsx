import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteConfig.url,
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
      className={`${sfPro.variable} ${horizon.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground" style={{ fontFamily: 'var(--font-sf-pro)' }} suppressHydrationWarning>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
