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
