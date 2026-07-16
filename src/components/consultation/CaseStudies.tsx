"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import {
  SCENARIOS,
  type Scenario,
} from "@/components/consultation/consultation-data";

/**
 * Engagement scenarios as an accordion — the situation is always visible, the
 * detail opens on demand.
 *
 * Framed as illustrative on purpose: no client is named and no result is
 * claimed until there's a signed-off case study to put here. See the note in
 * consultation-data.ts for what changes when real ones land.
 */

function Item({
  s,
  open,
  onToggle,
}: {
  s: Scenario;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/40">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-muted">
              {s.area}
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.1em] text-faint">
              {s.situation}
            </span>
          </span>
          <span
            className={`mt-2 block text-[15.5px] font-semibold transition-colors ${
              open ? "text-mint" : "text-fg group-hover:text-accent"
            }`}
          >
            {s.title}
          </span>
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 text-xl transition-colors ${
            open ? "text-mint" : "text-faint group-hover:text-accent"
          }`}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 py-5 sm:px-6">
              <p className="text-[13.5px] leading-relaxed text-muted">
                {s.body}
              </p>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
                What you walk away with
              </p>
              <ul className="mt-3 space-y-2">
                {s.outcome.map((o, i) => (
                  <motion.li
                    key={o}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.07, duration: 0.35 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-[13px] leading-relaxed text-muted">
                      {o}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CaseStudies() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[820px] px-6">
        <div className="text-center">
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
              Engagement scenarios
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-4 text-4xl font-bold text-fg sm:text-5xl">
              Where people are
              <br />
              when they call.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-lg text-[14px] leading-relaxed text-muted">
              Four situations we&apos;re called into most, and what the work
              looks like in each. Illustrative — named client stories go up here
              as each client signs off on them.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 space-y-3">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Item
                s={s}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
