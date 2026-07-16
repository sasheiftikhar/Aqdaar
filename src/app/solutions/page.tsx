import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/sections/CTA";
import ProductHero from "@/components/product/ProductHero";
import SolutionsGrid from "@/components/product/SolutionsGrid";
import ConsoleObserve from "@/components/product/ConsoleObserve";
import Scale from "@/components/product/Scale";

export const metadata: Metadata = {
  title: "Solutions | Aqdaar",
  description:
    "The platform for building, running, and observing computer use agents. Your agents authenticate as users, operate any software, and access data locked behind a login.",
};

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductHero />
        <SolutionsGrid />
        <ConsoleObserve />
        <Scale />
        <CTA
          id="list-your-solution"
          title="List your solution"
          subtitle="Building for Pakistan's industry, classrooms, or homes? Pitch it to Aqdaar — low friction, high visibility."
          primaryLabel="Start a Project"
          primaryHref="#"
          secondaryLabel="Notify Me"
          secondaryHref="#"
        />
      </main>
      <Footer />
    </>
  );
}
