import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import EventsHero from "@/components/events/EventsHero";
import EventFeed from "@/components/events/EventFeed";
import FlagshipSpotlight from "@/components/events/FlagshipSpotlight";
import PastHighlights from "@/components/events/PastHighlights";

export const metadata: Metadata = {
  title: "Events",
  alternates: { canonical: "/events" },
  description:
    "Trainings, consultations, community nights, and meetups — where the Aqdaar community meets. Upcoming, ongoing, and past events.",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <EventsHero />
        <EventFeed />
        <FlagshipSpotlight />
        <PastHighlights />
        {/* The same closing CTA every other page ends on. */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
