"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";
import { ROUTES } from "@/lib/nav";
import { PROGRAMS, type Program } from "@/components/consultation/consultation-data";

/**
 * Flagship programs and events, in a tinted panel that lifts them off the
 * black — the advisory work and the programs are different offers and the page
 * should read that way.
 */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
        {label}
      </span>
      <span className="text-right text-[12px] leading-snug text-muted">
        {value}
      </span>
    </div>
  );
}

/** The card's art strip — a drifting tone field keyed to the program. */
function ArtStrip({ tone }: { tone: string }) {
  return (
    <div className="relative h-28 overflow-hidden rounded-xl bg-black/50">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            background: tone,
            width: "60%",
            height: "140%",
            left: `${i * 26 - 6}%`,
            top: "-20%",
            opacity: 0.5,
          }}
          animate={{
            x: [0, 16, -10, 0],
            y: [0, -12, 8, 0],
            scale: [1, 1.15, 0.94, 1],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="dot-grid absolute inset-0 opacity-30" />
    </div>
  );
}

function ProgramCard({ p }: { p: Program }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg/70 p-5 transition-colors hover:border-accent/40"
    >
      <div className="relative">
        <ArtStrip tone={p.tone} />
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black/70"
          style={{ background: p.tone }}
        >
          {p.kicker}
        </span>
      </div>

      <h3 className="mt-5 text-[17px] font-bold leading-snug text-fg">
        {p.title}
      </h3>

      <div className="mt-4 flex-1 divide-y divide-border border-t border-border">
        <Row label="DRI" value={p.dri} />
        <Row label="Partner" value={p.partner} />
        <Row label="Timeline" value={p.timeline} />
        <Row label="Venue" value={p.venue} />
      </div>

      <a
        href={ROUTES.events}
        className="mt-5 flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface/60 px-5 py-3 text-[12.5px] font-semibold text-fg transition-colors group-hover:bg-surface-2"
      >
        Learn more
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </motion.div>
  );
}

export default function FlagshipPrograms() {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface/30 px-6 py-12 sm:px-10">
            <SoftGlow position="top" />
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-10" />

            <div className="relative text-center">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
                Flagship programs &amp; events
              </p>
              <h2 className="display mt-4 text-3xl font-bold text-fg sm:text-4xl">
                The rooms we put
                <br />
                people in.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[14px] text-muted">
                Each one has a named owner and a partner behind it. Consulting
                clients get a seat at all three.
              </p>
            </div>

            <div className="relative mt-10 grid gap-4 md:grid-cols-3">
              {PROGRAMS.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.1} className="h-full">
                  <ProgramCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
