import type { Metadata, Viewport } from "next";
import { Onest, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/* Note: `shadcn init` injected a Geist font here and repointed --font-sans at
   it. Removed - the brand pairing is Onest / Instrument Serif / Inter, and
   --font-sans is mapped back to Inter in globals.css. */

/**
 * Onest carries every heading, Instrument Serif italic carries exactly one
 * word per headline, Inter handles body and UI.
 * See the design system's "one-italic rule".
 */
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const SITE = "https://www.brandupme.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "BrandUpMe | Digital Marketing & Business Development",
    template: "%s | BrandUpMe",
  },
  description:
    "BrandUpMe is your digital marketing and business development partner. We help businesses grow online, get more visibility and generate quality leads.",
  keywords: [
    "digital marketing agency",
    "social media management",
    "lead generation",
    "creative design and video ads",
    "organic marketing",
    "business development partner",
    "digital marketing India",
    "digital marketing Dubai",
  ],
  authors: [{ name: "BrandUpMe" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "BrandUpMe",
    locale: "en_AE",
    url: SITE,
    title: "BrandUpMe | We Build Brands That Build Business",
    description:
      "Digital marketing and business development. Social media management, creative design, organic marketing and qualified leads delivered to your business.",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrandUpMe - digital marketing and business development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandUpMe | We Build Brands That Build Business",
    description:
      "Digital marketing and business development. We help businesses grow online and generate quality leads.",
    images: ["/brand/og-image.jpg"],
  },
  robots: { index: true, follow: true },

};

export const viewport: Viewport = {
  themeColor: "#04170A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={cn(
        "antialiased font-sans",
        onest.variable,
        inter.variable,
        instrument.variable,
      )}
    >
      <head>
        {/*
          Applies the visitor's saved language before first paint.

          Done inline rather than by reading the cookie in this layout, because
          reading cookies here would make every page in the app dynamic -
          including the marketing pages, which should stay prerendered. This
          runs synchronously ahead of React, so there is no flash of the wrong
          direction, and it only touches attributes on <html>.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var m=document.cookie.match(/(?:^|; )bum_locale=([^;]*)/);" +
              "var l=m&&decodeURIComponent(m[1]);if(l==='ar'){document.documentElement.lang='ar';" +
              "document.documentElement.dir='rtl';}}catch(e){}})();",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
