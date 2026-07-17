import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BatchCalendar from "@/components/trainings/BatchCalendar";
import CorporateCta from "@/components/trainings/CorporateCta";
import OneBoard from "@/components/trainings/OneBoard";
import Programs from "@/components/trainings/Programs";
import TraineeVoices from "@/components/trainings/TraineeVoices";
import TrainingHero from "@/components/trainings/TrainingHero";

export const metadata: Metadata = {
  title: "Trainings | Aqdaar",
  description:
    "Upskill with Aqdaar — the Dexter Lab Startup Bootcamp, the AI for Everyone skills series, and digital short courses. Running July through August and beyond.",
};

export default function TrainingsPage() {
  return (
    <>
      <Navbar />
      <main>
        <TrainingHero />
        <OneBoard />
        {/* category filter + training cards + the detail template, all one
            selection — the card you pick drives the panel below it */}
        <Programs />
        <BatchCalendar />
        <TraineeVoices />
        <CorporateCta />
      </main>
      <Footer />
    </>
  );
}
