import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationHero from "@/components/consultation/ConsultationHero";
import ConsultationAreas from "@/components/consultation/ConsultationAreas";
import FlagshipPrograms from "@/components/consultation/FlagshipPrograms";
import ConsultantProfile from "@/components/consultation/ConsultantProfile";
import Process from "@/components/consultation/Process";
import CaseStudies from "@/components/consultation/CaseStudies";
import DiscoveryCta from "@/components/consultation/DiscoveryCta";

export const metadata: Metadata = {
  title: "Consultation",
  alternates: { canonical: "/consultation" },
  description:
    "Strategic guidance for growth — strategy and planning, leadership development, market entry, and growth advisory. Book a free discovery call.",
};

export default function ConsultationPage() {
  return (
    <>
      <Navbar />
      <main>
        <ConsultationHero />
        <ConsultationAreas />
        <FlagshipPrograms />
        <ConsultantProfile />
        <Process />
        <CaseStudies />
        <DiscoveryCta />
      </main>
      <Footer />
    </>
  );
}
