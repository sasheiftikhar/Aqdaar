"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";

const REVIEWS = [
  {
    name: "Client Name",
    role: "Founder, Startup",
    quote:
      "Aqdaar took us from a rough idea to a launched product — the Dhundo phase alone reshaped our whole direction.",
    initials: "CN",
    wide: true,
  },
  {
    name: "Trainee Name",
    role: "Bootcamp Graduate",
    quote: "The trainings turned my ambition into an actual, hireable skillset.",
    initials: "TN",
    wide: false,
  },
  {
    name: "Partner Name",
    role: "Head of Ops, Institution",
    quote:
      "Their consultation gave us the strategy and the systems to scale. A genuine kingmaker for our team.",
    initials: "PN",
    wide: false,
  },
  {
    name: "Industrialist Name",
    role: "Director, Manufacturing",
    quote:
      "Banao built the platform our floor actually runs on, and Becho put it in front of the right buyers. One team, end to end.",
    initials: "IN",
    wide: true,
  },
];

const STATS = [
  {
    value: "3",
    label: "Divisions. One direction.",
    tones: ["#cabfe1", "#afa3bf", "#b4d9ce"],
  },
  {
    value: "100+",
    label: "founders & teams served",
    tones: ["#b4d9ce", "#f5efd3", "#cabfe1"],
  },
];

/* Slow-drifting gradient field — the "moving pattern" on the stat cards */
function GradientField({ tones }: { tones: string[] }) {
  return (
    <div className="relative h-32 overflow-hidden rounded-xl bg-black/40">
      {tones.map((c, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            background: c,
            width: "70%",
            height: "130%",
            left: `${i * 22 - 8}%`,
            top: "-15%",
            opacity: 0.7,
          }}
          animate={{
            x: [0, 18, -12, 0],
            y: [0, -14, 10, 0],
            scale: [1, 1.18, 0.92, 1],
          }}
          transition={{
            duration: 11 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
      {initials}
    </span>
  );
}

const cardBase =
  "group flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-28">
      <SoftGlow />
      <div className="relative mx-auto max-w-[1300px] px-6">
        {/* Header */}
        <div className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Testimonials
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-5 text-4xl font-bold sm:text-5xl">
              What people say
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Founders, trainees, and partners on what it&apos;s like building
              with Aqdaar.
            </p>
          </Reveal>
        </div>

        {/* Bento grid: 4 quotes + 2 stat cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Row 1 */}
          <Reveal delay={0.05} className="h-full lg:col-span-2">
            <Quote r={REVIEWS[0]} />
          </Reveal>
          <Reveal delay={0.12} className="h-full">
            <Quote r={REVIEWS[1]} />
          </Reveal>
          <Reveal delay={0.19} className="h-full">
            <Stat s={STATS[0]} />
          </Reveal>

          {/* Row 2 */}
          <Reveal delay={0.05} className="h-full">
            <Stat s={STATS[1]} />
          </Reveal>
          <Reveal delay={0.12} className="h-full">
            <Quote r={REVIEWS[2]} />
          </Reveal>
          <Reveal delay={0.19} className="h-full lg:col-span-2">
            <Quote r={REVIEWS[3]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Quote({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <motion.figure
      className={cardBase}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <blockquote className="flex-1 text-fg/90">“{r.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar initials={r.initials} />
        <span>
          <span className="block text-sm font-semibold text-fg">{r.name}</span>
          <span className="block text-xs text-muted">{r.role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

function Stat({ s }: { s: (typeof STATS)[number] }) {
  return (
    <motion.div
      className={cardBase}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <GradientField tones={s.tones} />
      <p className="display mt-6 text-4xl font-bold text-fg">{s.value}</p>
      <p className="mt-1 text-sm text-muted">{s.label}</p>
    </motion.div>
  );
}
