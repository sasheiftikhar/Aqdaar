"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { CONSULT_HREF } from "@/lib/nav";

/**
 * How an engagement runs — device mock on the left, accordion on the right.
 *
 * It walks itself: a line runs down the open step and hands over to the next one
 * when it reaches the bottom. The line *is* the clock — the handover fires from
 * its `onAnimationComplete` rather than a timer running beside it, so the bar
 * and the step it belongs to cannot drift apart.
 *
 * The open step drives the mock, so the two halves are never out of sync.
 * Clicking a step jumps to it and restarts the run from there.
 */

/** Seconds a step holds before it hands over. */
const DWELL = 4;

const STEPS = [
  {
    key: "call",
    title: "Discovery call",
    body: "A conversation, not a pitch. We map what you're trying to build, what's already been tried, and whether we're the right people for it.",
    meta: "Week 1",
    screen: ["Where you are today", "What's already been tried", "What good looks like"],
  },
  {
    key: "gap",
    title: "Gap analysis",
    body: "We map the market, the competitors, and the space between what exists and what people actually need. You get the finding whether or not you like it.",
    meta: "Weeks 1–2",
    screen: ["Market map", "Competitor teardown", "The gap, sized"],
  },
  {
    key: "plan",
    title: "Scoped plan",
    body: "A direction everyone signs off on before anything gets built — phases, owners, and a named DRI you can reach directly.",
    meta: "Week 2",
    screen: ["Phases & milestones", "Named DRI per phase", "What we're not doing"],
  },
  {
    key: "build",
    title: "Design & build",
    body: "Design, prototype, production. Built to last rather than to demo, and handed over with a documented API instead of a folder of surprises.",
    meta: "Weeks 3+",
    screen: ["Prototype", "Production build", "Documented API"],
  },
  {
    key: "market",
    title: "Go to market",
    body: "Positioning, partnerships, and pilots — the part most builds skip. Shipping isn't the finish line.",
    meta: "On launch",
    screen: ["Positioning", "Pilot partners", "Growth motion"],
  },
] as const;

export default function ServicesHow() {
  const [open, setOpen] = useState(0);
  const step = STEPS[open];

  const next = () => setOpen((i) => (i + 1) % STEPS.length);

  return (
    <section id="how" className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
            <DotIcon />
            Why us?
          </span>
          <h2 className="display mt-4 text-4xl font-bold text-fg sm:text-5xl">
            How it <span className="text-gradient">works.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* the mock */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-[380px]">
              <div className="bg-primary-gradient pointer-events-none absolute inset-6 rounded-full opacity-[0.12] blur-3xl" />

              <div className="relative rounded-[2.2rem] border border-border bg-surface p-3 shadow-2xl shadow-black/60">
                <div className="rounded-[1.7rem] border border-border bg-bg p-6">
                  {/* status bar */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      {step.meta}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      <span className="text-[10px] text-faint">Live</span>
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                    >
                      <h3 className="mt-6 text-[22px] font-bold leading-tight text-fg">
                        {step.title}
                      </h3>

                      <div className="mt-6 space-y-2.5">
                        {step.screen.map((line) => (
                          <div
                            key={line}
                            className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-3.5 py-3"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-gradient">
                              <CheckIcon />
                            </span>
                            <span className="text-[12.5px] text-fg/85">
                              {line}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* progress through the five steps */}
                  <div className="mt-7 flex gap-1.5">
                    {STEPS.map((s, i) => (
                      <span
                        key={s.key}
                        className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                          i <= open ? "bg-primary-gradient" : "bg-surface-2"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* the accordion */}
          <Reveal delay={0.1}>
            <div className="space-y-3">
              {STEPS.map((s, i) => {
                const isOpen = i === open;
                return (
                  <div
                    key={s.key}
                    className={`relative overflow-hidden rounded-2xl border transition-colors ${
                      isOpen
                        ? "border-accent/40 bg-surface/60"
                        : "border-border bg-surface/25"
                    }`}
                  >
                    {/*
                      The clock. It runs down the open step and calls the next
                      one when it lands — linear, because a bar that eases is a
                      bar that lies about how long is left.
                    */}
                    {isOpen && (
                      <motion.span
                        key={open}
                        aria-hidden
                        className="bg-primary-gradient absolute inset-y-0 left-0 w-[2px] origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: DWELL, ease: "linear" }}
                        onAnimationComplete={next}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-mono text-[11px] ${
                            isOpen ? "text-accent" : "text-faint"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[16px] font-semibold ${
                            isOpen ? "text-fg" : "text-muted"
                          }`}
                        >
                          {s.title}
                        </span>
                      </span>

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] transition-transform ${
                          isOpen
                            ? "border-accent/40 rotate-180 text-accent"
                            : "border-border text-faint"
                        }`}
                      >
                        ⌄
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-muted">
                            {s.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-4">
                <a
                  href={CONSULT_HREF}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-accent"
                >
                  Start with a discovery call
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
      <path
        d="M5 13l4 4L19 7"
        stroke="#33304a"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}
