import type { Metadata, Viewport } from "next";
import { Syne, Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f0e0d",
};

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rift.studio"),
  title: {
    default: "RIFT Digital Infrastructure for Bold Businesses",
    template: "%s | RIFT",
  },
  description:
    "RIFT is a Lagos based digital studio building high performance websites and voice agents for businesses across West Africa and beyond.",
  keywords: [
    "web design Nigeria",
    "web design Lagos",
    "voice agent",
    "web development agency",
    "digital studio Africa",
    "Next.js development",
  ],
  authors: [{ name: "RIFT Studio" }],
  creator: "RIFT Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rift.studio",
    siteName: "RIFT",
    title: "RIFT Digital Infrastructure for Bold Businesses",
    description:
      "We build websites and voice agents that put businesses ahead.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RIFT Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RIFT Digital Infrastructure for Bold Businesses",
    description:
      "We build websites and voice agents that put businesses ahead.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "RIFT Studio",
  description:
    "Digital studio building websites and voice agents for businesses across West Africa.",
  url: "https://rift.studio",
  email: "riftstudio@volarisgloba.com",
  areaServed: ["Nigeria", "Ghana", "West Africa", "Worldwide"],
  serviceType: ["Web Design", "Web Development", "Voice Agents"],
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${dmSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
