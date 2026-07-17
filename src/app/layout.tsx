import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import PageTransition from "@/components/transition/PageTransition";
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
  title: "Aqdaar | Dhundo. Banao. Becho.",
  description:
    "Aqdaar partners with founders, leaders, and organizations who want to define categories, not follow them — from discovery, to build, to market.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${script.variable}`}
    >
      <body>
        {/* Owns the stair transition, the first-open loading screen, and the
            signal that tells entrance animations when they may run. */}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
