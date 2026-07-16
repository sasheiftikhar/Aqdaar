import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import ContactHero from "@/components/contact/ContactHero";
import ContactBody from "@/components/contact/ContactBody";
import TeamDirectory from "@/components/contact/TeamDirectory";
import ContactMap from "@/components/contact/ContactMap";

export const metadata: Metadata = {
  title: "Contact | Aqdaar",
  description:
    "Let's Talk Big — start the conversation with Aqdaar. Trainings, consultation, solutions, services, or partnership. Karachi, working globally.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactBody />
        <TeamDirectory />
        <ContactMap />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
