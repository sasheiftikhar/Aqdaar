"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { AREAS } from "@/components/consultation/consultation-data";
import { AREA_ICONS } from "@/components/consultation/icons";

/**
 * The four areas we consult on.
 *
 * The rail advances on its own: a line fills across the live tile and hands over
 * to the next one when it reaches the end. The line *is* the clock — the handover
 * runs off its `onAnimationComplete` rather than a timer set alongside it, so
 * what you see and when it turns over cannot drift apart.
 *
 * Tapping a tile still jumps straight to it, and restarts the fill from there.
 */

/** Seconds a tile holds before the rail moves on. */
const DWELL = 4;

export default function ConsultationAreas() {
  const [index, setIndex] = useState(0);
  const active = AREAS[index];
  const ActiveIcon = AREA_ICONS[active.slug];

  const next = () => setIndex((i) => (i + 1) % AREAS.length);

  return (
    <section id="areas" className="relative scroll-mt-24 bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
            Consultation areas
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-4 text-4xl font-bold text-fg sm:text-5xl">
            Four places we&apos;re
            <br />
            worth calling.
          </h2>
        </Reveal>

        {/* icon rail — the selector */}
        <div className="scrollbar-none mt-10 -mx-6 flex gap-3 overflow-x-auto px-6 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
          {AREAS.map((a, i) => {
            const Icon = AREA_ICONS[a.slug];
            const on = a.slug === active.slug;
            return (
              <Reveal key={a.slug} delay={i * 0.07} className="shrink-0">
                <motion.button
                  onClick={() => setIndex(i)}
                  // No hover-to-select: it would fight the rail for control and
                  // leave the fill running against a tile that isn't live.
                  aria-pressed={on}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex w-[150px] flex-col items-center gap-3 overflow-hidden rounded-2xl border bg-surface/40 px-4 py-6 text-center sm:w-full"
                  style={{
                    borderColor: on ? `${a.tone}66` : "var(--color-border)",
                  }}
                >
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${a.tone}, transparent 65%)`,
                    }}
                    animate={{ opacity: on ? 0.18 : 0.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.span
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: on ? `${a.tone}55` : "var(--color-border)",
                      color: on ? a.tone : "var(--color-muted)",
                    }}
                    animate={{ scale: on ? 1.06 : 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.span>

                  <span
                    className="relative text-[12.5px] font-semibold leading-snug transition-colors"
                    style={{ color: on ? "var(--color-fg)" : "var(--color-muted)" }}
                  >
                    {a.label}
                  </span>

                  {/*
                    The clock. It fills across the live tile and calls the rail
                    on when it lands — linear, because a bar that eases is a bar
                    that lies about how long is left.
                  */}
                  {on && (
                    <motion.span
                      key={index}
                      aria-hidden
                      className="absolute inset-x-6 bottom-0 h-[2px] origin-left rounded-full"
                      style={{ background: a.tone }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DWELL, ease: "linear" }}
                      onAnimationComplete={next}
                    />
                  )}
                </motion.button>
              </Reveal>
            );
          })}
        </div>

        {/* detail panel */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-border bg-surface/30"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  background: `radial-gradient(circle at 85% 0%, ${active.tone}, transparent 55%)`,
                }}
              />

              <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="min-w-0">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: `${active.tone}55`,
                      color: active.tone,
                    }}
                  >
                    <ActiveIcon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-fg">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {active.blurb}
                  </p>
                </div>

                <ul className="space-y-2.5">
                  {active.points.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                      className="flex items-start gap-3 rounded-xl border border-border bg-black/30 px-5 py-3.5"
                    >
                      <motion.span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: active.tone }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.55, 1, 0.55] }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          delay: i * 0.45,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="text-[13.5px] leading-relaxed text-muted">
                        {p}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
