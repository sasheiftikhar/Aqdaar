"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/**
 * The people who own each area of the work.
 *
 * `photo` and `linkedin` are deliberately optional. Real portraits sit in
 * /public/team/1-8.png but nobody has confirmed which file is which person, so
 * wiring them on a guess would put the wrong face against a real name. Fill in
 * `photo` (e.g. "/team/3.png") and `linkedin` per person and both the portrait
 * and the icon appear automatically — the arch already reserves the exact
 * space, so nothing shifts when they land.
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
      className="group flex flex-col bg-bg p-6"
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
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <MemberCard key={m.name} m={m} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
