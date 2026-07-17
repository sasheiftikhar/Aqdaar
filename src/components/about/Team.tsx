"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/**
 * The people who own each area of the work.
 *
 * `photo` and `linkedin` are optional: without a photo the card falls back to
 * initials on a gradient. Set either one per person and it appears
 * automatically — the arch reserves the exact space, so nothing shifts.
 */
type Member = {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  linkedin?: string;
};

const TEAM: Member[] = [
  {
    name: "Jamaluddin Ahmed Siddiqui",
    role: "Consultation",
    initials: "JS",
  },
  { name: "Hammad Hussain", role: "Dhundo · Discover & Plan", initials: "HH" },
  { name: "Anas Imtiaz", role: "Banao · Build & Produce", initials: "AI" },
  { name: "Faseeh Asghar", role: "Becho · Sell & Scale", initials: "FA" },
  { name: "Mr. Shoaib", role: "Trainings", initials: "MS" },
  { name: "Aquib ul Haq", role: "Solutions", initials: "AH" },
];

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.24 8.02h4.5V24H.24zM8.02 8.02h4.31v2.18h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.34c0-1.75-.03-4-2.44-4-2.44 0-2.81 1.9-2.81 3.87V24h-4.5z" />
    </svg>
  );
}

function MemberCard({ m }: { m: Member }) {
  return (
    <motion.div
      whileHover="hover"
      className="group flex h-full flex-col rounded-3xl border border-border bg-surface/30 p-6 transition-colors hover:border-accent/40"
    >
      {/*
        PORTRAIT SLOT — arch-topped. The aspect ratio reserves the space, so
        dropping a photo in below won't move anything.
      */}
      <div className="relative overflow-hidden rounded-t-[999px] border border-border bg-surface/60">
        <div className="relative aspect-[3/4]">
          {m.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={m.photo}
              alt={m.name}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <>
              <div className="bg-soft-gradient absolute inset-0 opacity-[0.16]" />
              <div className="dot-grid absolute inset-0 opacity-25" />
              <span className="absolute inset-0 flex items-center justify-center pt-6 text-3xl font-bold tracking-tight text-fg/45">
                {m.initials}
              </span>
            </>
          )}
          <motion.div
            className="bg-soft-gradient absolute inset-0 opacity-0"
            variants={{ hover: { opacity: 0.1 } }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold leading-snug text-fg">
            {m.name}
          </p>
          <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
            {m.role}
          </p>
        </div>

        {m.linkedin && (
          <a
            href={m.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${m.name} on LinkedIn`}
            className="shrink-0 text-muted transition-colors hover:text-accent"
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
            Meet the people who
            <br />
            own the work.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-muted">
            Every area has a directly responsible individual — one person whose
            name you have and who owns the outcome. No queue, no account manager
            relaying messages.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {/*
            Flex, not a grid. Six people across four columns leaves the last row
            short, and `justify-center` puts those two in the middle instead of
            stranding them against the left edge.

            It also settles the violet block that used to sit beside them: the
            old grid drew its hairlines by showing a `bg-border` container
            through 1px gaps, which meant the two cells with no card in them
            showed that colour as a solid panel. Cards carry their own border
            now, so there is nothing behind them to show through.
          */}
          <div className="mt-14 flex flex-wrap justify-center gap-5">
            {TEAM.map((m) => (
              <div
                key={m.name}
                // Widths account for the gap: two per row loses half of one gap
                // each, four per row loses three gaps across four cards.
                className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
              >
                <MemberCard m={m} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
