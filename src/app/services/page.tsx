import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import TrustedBy from "@/components/services/TrustedBy";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesHow from "@/components/services/ServicesHow";
import GetInTouch from "@/components/services/GetInTouch";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
  description:
    "Discovery and strategy, design and production, go-to-market, trainings, consultation, and industrial solutions — everything it takes to go from idea to market.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <TrustedBy />
        <ServicesGrid />
        <ServicesHow />
        <GetInTouch />
      </main>
      <Footer />
    </>
  );
}
