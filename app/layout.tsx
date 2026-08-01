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

const SITE = "https://www.brandupme.ae";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      "Hire Your Own Remote Sales Representative in Dubai | AED 500/Month - BrandUpMe",
    template: "%s | BrandUpMe",
  },
  description:
    "BrandUpMe gives UAE businesses a dedicated remote sales representative for AED 500/month plus success-based commission. Cold calling, WhatsApp outreach, email marketing, lead qualification and follow-up. No salary, no visa, no office.",
  keywords: [
    "remote sales representative Dubai",
    "outsourced sales UAE",
    "cold calling services Dubai",
    "lead generation UAE",
    "business development partner Dubai",
    "B2B lead generation Dubai",
    "sales outsourcing UAE",
  ],
  authors: [{ name: "BrandUpMe" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "BrandUpMe",
    locale: "en_AE",
    url: SITE,
    title:
      "Hire Your Own Remote Sales Representative - AED 500/Month | BrandUpMe",
    description:
      "We prospect, we call, we follow up. You close. A dedicated remote sales representative for AED 500/month plus success-based commission.",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrandUpMe - hire your own remote sales representative for AED 500 a month",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Hire Your Own Remote Sales Representative - AED 500/Month | BrandUpMe",
    description:
      "We prospect, we call, we follow up. You close. AED 500/month plus success-based commission.",
    images: ["/brand/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai, United Arab Emirates",
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased font-sans",
        onest.variable,
        inter.variable,
        instrument.variable,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
