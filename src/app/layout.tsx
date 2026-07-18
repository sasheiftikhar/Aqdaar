import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import PageTransition from "@/components/transition/PageTransition";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
} from "@/lib/site";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const script = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  /* Resolves every relative URL below (and in each page's own metadata) against
     the real origin, so Open Graph and canonical tags are absolute — which they
     must be to work when a link is scraped off-site. */
  metadataBase: new URL(SITE_URL),

  /* `%s` is filled by each page's own `title`; the root falls back to `default`.
     So interior pages read "Services | Aqdaar" without repeating the suffix. */
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Aqdaar",
    "product studio",
    "Karachi",
    "Pakistan startups",
    "go to market",
    "product design",
    "startup consultation",
    "MVP development",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  /* The home page is the canonical root; interior pages set their own via the
     `alternates.canonical` relative path in their metadata. */
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },

  /* Let search engines index and follow everything, and hand Google the larger
     preview it will only show when explicitly allowed. */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /*
   * The mark flips with the reader's system theme: black on light, white on
   * dark. That lives inside icon.svg as a `prefers-color-scheme` query, because
   * the obvious approach — two <link>s with `media` — only works in Chrome.
   * Firefox takes the last icon and Safari the first, both ignoring the query
   * outright, so two of three engines would show the wrong colour.
   *
   * The PNG is the floor: iOS Safari has no SVG favicon support at all and
   * would otherwise show nothing. It's the black mark, since a tab bar is light
   * far more often than not.
   *
   * These must stay in `metadata` rather than becoming app/icon.* files —
   * file-based icons override this config entirely and would take the flip with
   * them.
   */
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

/*
 * Structured data — tells search engines *what* Aqdaar is, not just what the
 * page says. The Organization node is what a knowledge panel is built from; the
 * WebSite node with SearchAction is what can earn a sitelinks search box. Both
 * are emitted once, in the head of every page, from the same canonical facts.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      slogan: SITE_TAGLINE,
      logo: `${SITE_URL}/aqdaar-logo.png`,
      image: `${SITE_URL}/opengraph-image.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${script.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // Static, self-authored JSON — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Owns the stair transition, the first-open loading screen, and the
            signal that tells entrance animations when they may run. */}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
