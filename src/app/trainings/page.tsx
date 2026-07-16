import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BatchCalendar from "@/components/trainings/BatchCalendar";
import CorporateCta from "@/components/trainings/CorporateCta";
import LearnMore from "@/components/trainings/LearnMore";
import OneBoard from "@/components/trainings/OneBoard";
import Programs from "@/components/trainings/Programs";
import TraineeVoices from "@/components/trainings/TraineeVoices";
import TrainingHero from "@/components/trainings/TrainingHero";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Trainings | Aqdaar",
  description:
    "Upskill with Aqdaar — the Dexter Lab Startup Bootcamp, the AI for Everyone skills series, and digital short courses. Running July through August and beyond.",
};

/** The training-adjacent posts, newest first — Community reads closest here. */
const READ_NEXT = ["Community", "Case Studies"];

export default function TrainingsPage() {
  const all = getPosts();
  const posts = [
    ...all.filter((p) => READ_NEXT.includes(p.category)),
    ...all.filter((p) => !READ_NEXT.includes(p.category)),
  ].slice(0, 3);

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
        <LearnMore posts={posts} />
        <CorporateCta />
      </main>
      <Footer />
    </>
  );
}
