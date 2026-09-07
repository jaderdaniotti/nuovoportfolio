import type { Metadata, Viewport } from "next";
import { Poppins, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LayoutShell } from "@/components/layout-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaRegister } from "@/components/pwa-register";
import {
  BRAND_CREAM,
  BRAND_INK,
  OG_LOCALE,
  OG_SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: OG_SITE_NAME,
  appleWebApp: {
    capable: true,
    title: OG_SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "UFMvRmPRPO4BAMqYfNQkzZ5_EMb7hxb6fnyfLQNDH0c",
  },
  openGraph: {
    type: "website",
    locale: OG_LOCALE,
    siteName: OG_SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND_CREAM },
    { media: "(prefers-color-scheme: dark)", color: BRAND_INK },
  ],
};

const themeInitScript = `
(() => {
  try {
    const key = 'jaderweb-theme';
    const stored = localStorage.getItem(key);
    const theme = stored === 'light' ? 'light' : 'dark';
    if (stored === 'accent') localStorage.setItem(key, 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch {}
})();
`;

const scrollTopInitScript = `
(() => {
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      data-theme="dark"
      className={`${poppins.variable} ${unbounded.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: scrollTopInitScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
        <PwaRegister />
        <Analytics />
      </body>
    </html>
  );
}
