import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";

import { siteConfig, heroContent } from "@/data/public-content";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Desain Interior Hangat dan Elegan`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/brand/mawmaw-icon.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: heroContent.image.src.replace("w=2400", "w=1200"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${cormorant.variable}`}
    >
      <body className="antialiased">
        {children}
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            className: "font-sans",
          }}
        />
      </body>
    </html>
  );
}
