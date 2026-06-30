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
  metadataBase: new URL("https://riftdigitalsolution.com"),
  title: {
    default: "RIFT Digital Solution | Get Found. Look Credible. Win Customers.",
    template: "%s | RIFT Digital Solution",
  },
  description:
    "RIFT Digital Solution builds fast custom websites and AI tools for Lagos businesses. Most sites go live in 5 working days, with Google Business Profile and Analytics setup included.",
  keywords: [
    "web design Nigeria",
    "web design Lagos",
    "Google Business Profile Lagos",
    "voice agent Nigeria",
    "SEO Lagos",
    "website development Lagos",
  ],
  authors: [{ name: "RIFT Digital Solution" }],
  creator: "RIFT Digital Solution",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riftdigitalsolution.com",
    siteName: "RIFT Digital Solution",
    title: "RIFT Digital Solution | Get Found. Look Credible. Win Customers.",
    description:
      "Fast custom websites and AI tools for Lagos businesses. Most sites go live in 5 working days.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RIFT Digital Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RIFT Digital Solution | Get Found. Look Credible. Win Customers.",
    description:
      "Fast custom websites and AI tools for Lagos businesses. Most sites go live in 5 working days.",
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
  name: "RIFT Digital Solution",
  description:
    "RIFT Digital Solution builds fast custom websites, Google Business Profile setup, and AI tools for Lagos businesses. Most websites go live in 5 working days.",
  url: "https://riftdigitalsolution.com",
  email: "RiftDigitalStudio@volarisglobal.com",
  areaServed: ["Lagos", "Nigeria", "West Africa"],
  serviceType: [
    "Web Design",
    "Web Development",
    "SEO",
    "Google Business Profile",
    "Voice Agents",
  ],
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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7SDNM8ZTX9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7SDNM8ZTX9');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
