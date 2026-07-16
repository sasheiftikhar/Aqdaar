"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { LEAD, SUPPORTING } from "@/components/consultation/consultation-data";

/**
 * Meet Our Consultant — the lead, what he owns, and the DRIs behind him.
 *
 * PORTRAIT SLOT: the arch reserves its exact space, so dropping a photo in
 * (set `photo` and render an <img> in place of the initials) moves nothing.
 */

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export default function ConsultantProfile() {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
        {/* left — the claim and what backs it */}
        <div>
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
              Meet our consultant
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-4 text-4xl font-bold text-fg sm:text-5xl">
              One name on
              <br />
              your account.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-muted">
              {LEAD.bio}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {LEAD.credentials.map((c, i) => (
              <Reveal key={c} delay={0.18 + i * 0.07}>
                <div className="flex items-start gap-3">
                  <motion.span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check />
                  </motion.span>
                  <span className="text-[13.5px] leading-relaxed text-muted">
                    {c}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* supporting team */}
          <Reveal delay={0.3}>
            <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
              Supporting team
            </p>
          </Reveal>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUPPORTING.map((m, i) => (
              <Reveal key={m.name} delay={0.34 + i * 0.06}>
                <motion.span
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-surface/50 py-2 pl-2 pr-4"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 text-[10px] font-bold text-accent">
                    {m.initials}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[12px] font-semibold text-fg">
                      {m.name}
                    </span>
                    <span className="block text-[10px] text-faint">
                      {m.role}
                    </span>
                  </span>
                </motion.span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* right — the portrait */}
        <Reveal delay={0.15}>
          <motion.div
            className="relative mx-auto max-w-[380px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border border-border bg-surface/60">
              <div className="relative aspect-[3/4]">
                {/* PORTRAIT SLOT — initials stand in until the photo lands */}
                <div className="bg-soft-gradient absolute inset-0 opacity-[0.16]" />
                <div className="dot-grid absolute inset-0 opacity-25" />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center pt-8 text-6xl font-bold tracking-tight text-fg/40"
                  animate={{ opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {LEAD.initials}
                </motion.span>
              </div>
            </div>

            {/* name plate, overlapping the arch */}
            <div className="relative -mt-8 mx-4 rounded-2xl border border-border bg-surface-2/95 px-5 py-4 backdrop-blur">
              <p className="text-[14px] font-semibold leading-snug text-fg">
                {LEAD.name}
              </p>
              <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">
                {LEAD.role}
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
