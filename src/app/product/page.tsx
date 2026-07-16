import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import AssistantHero from "@/components/product/AssistantHero";
import LaunchVideo from "@/components/product/LaunchVideo";
import DeployedAt from "@/components/product/DeployedAt";
import TwoColumnHow from "@/components/product/TwoColumnHow";
import ContextWindow from "@/components/product/ContextWindow";
import NaturalLanguage from "@/components/product/NaturalLanguage";
import Extensibility from "@/components/product/Extensibility";
import ValueProps from "@/components/product/ValueProps";
import PhaseTimeline from "@/components/product/PhaseTimeline";

export const metadata: Metadata = {
  title: "Aqdaar Studio | Product",
  description:
    "Aqdaar Studio — the engine behind Dhundo, Banao and Becho. Discover the opportunity, build the product, and take it to market, all under one roof.",
};

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1 — hero */}
        <AssistantHero />
        {/* 2 — launch video */}
        <LaunchVideo />
        {/* 3 — social proof */}
        <DeployedAt />
        {/* 4 — the problem: work that piles up */}
        <TwoColumnHow />
        {/* 5 — feature 1: context window */}
        <ContextWindow />
        {/* 6 — feature 2: natural language */}
        <NaturalLanguage />
        {/* 7 — feature 3: extend to anything */}
        <Extensibility />
        {/* 8 — testimonials */}
        <ValueProps />
        {/* 9 — how it works: 3 phases */}
        <PhaseTimeline />
        {/* our CTA */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
