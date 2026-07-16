"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const VOICES = [
  {
    quote:
      "I came into the Startup Bootcamp certain about my idea. By week two the gap analysis had pointed me somewhere else entirely — and that's the version I actually launched.",
    name: "Trainee Name",
    role: "Startup Bootcamp · July",
    initials: "TN",
    tone: "#cabfe1",
  },
  {
    quote:
      "AI for Everyone assumed I knew nothing, which was correct. By the third session I had automated the reporting that used to eat my Fridays.",
    name: "Trainee Name",
    role: "AI Skills Series · Dreamworld",
    initials: "TN",
    tone: "#b4d9ce",
  },
  {
    quote:
      "The short course on scoping cut our brief in half. Defending those cuts to our own board was the most useful hour of the whole two weeks.",
    name: "Client Name",
    role: "Digital Short Courses · Onsite",
    initials: "CN",
    tone: "#f5efd3",
  },
  {
    quote:
      "Faseeh teaches the go-to-market week the way he runs client work. Every answer came with a real pilot attached, not a framework.",
    name: "Founder Name",
    role: "Startup Bootcamp · July",
    initials: "FN",
    tone: "#afa3bf",
  },
  {
    quote:
      "We ran the series across three campuses with Skillvention. Students who had never touched these tools left with something they had built themselves.",
    name: "Faculty Name",
    role: "AI Skills Series · CEGA",
    initials: "FN",
    tone: "#cabfe1",
  },
  {
    quote:
      "Mr. Shoaib scoped the cohort around our floor, not around a syllabus. That is the only reason it worked for a team that couldn't stop the line.",
    name: "Industrialist Name",
    role: "Custom cohort · Onsite",
    initials: "IN",
    tone: "#b4d9ce",
  },
];

/**
 * Fixed card geometry — every card is the same width and height no matter how
 * long the quote runs, so the rail reads as one clean band. Longer quotes clamp
 * rather than stretching their card.
 */
function VoiceCard({ v }: { v: (typeof VOICES)[number] }) {
  return (
    <figure className="flex h-[264px] w-[330px] shrink-0 flex-col rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40">
      <span
        className="text-3xl leading-none opacity-40"
        style={{ color: v.tone }}
        aria-hidden
      >
        ❝
      </span>
      <blockquote className="mt-3 line-clamp-5 flex-1 whitespace-normal text-[13.5px] leading-relaxed text-fg/85">
        {v.quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-black/70"
          style={{ background: v.tone }}
        >
          {v.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-semibold text-fg">
            {v.name}
          </span>
          <span className="block truncate text-[11px] text-muted">{v.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function TraineeVoices() {
  return (
    <section className="relative overflow-hidden bg-bg py-24">
      <Reveal>
        <h2 className="display text-center text-4xl font-bold text-fg sm:text-5xl">
          From past trainees
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mx-auto mt-4 max-w-lg px-6 text-center text-[14.5px] text-muted">
          Founders, students, and teams on what changed after the cohort.
        </p>
      </Reveal>

      <div className="relative mt-14 overflow-hidden">
        {/* edges fade to the page */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent sm:w-40" />

        <motion.div
          className="flex w-max items-stretch gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        >
          {[...VOICES, ...VOICES].map((v, i) => (
            <VoiceCard key={i} v={v} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
