"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { PROGRAMS } from "@/components/trainings/programs-data";

const MONTHS = ["July", "August", "September", "October +"];

/**
 * Where each program sits on the calendar, as 1-indexed month columns.
 * Keyed by slug so it stays honest against `programs-data`.
 */
const SPANS: Record<string, { start: number; span: number; note: string }> = {
  "startup-bootcamp": { start: 1, span: 2, note: "Batch 01 · Batch 02" },
  "ai-for-everyone": { start: 1, span: 2, note: "Three campuses" },
  "digital-short-courses": { start: 2, span: 3, note: "Rolling intakes" },
};

export default function BatchCalendar() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <h2 className="display text-center text-4xl font-bold text-fg sm:text-5xl">
            Upcoming batches
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-lg text-center text-[14.5px] text-muted">
            July through August and beyond, across all three programs. Custom
            cohorts are scheduled around you.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-surface/30 p-5 sm:p-7">
            {/* month header */}
            <div className="grid grid-cols-4 gap-2 border-b border-border pb-3 pl-0 sm:pl-[190px]">
              {MONTHS.map((m) => (
                <span
                  key={m}
                  className="text-center text-[10px] font-bold uppercase tracking-[0.14em] text-faint"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* one row per program */}
            <div className="mt-4 space-y-3">
              {PROGRAMS.map((p, i) => {
                const s = SPANS[p.slug];
                if (!s) return null;
                return (
                  <div
                    key={p.slug}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center"
                  >
                    {/* program label */}
                    <div className="flex items-center gap-2 sm:w-[190px] sm:shrink-0 sm:pr-4">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: p.tone }}
                      />
                      <span className="truncate text-[12.5px] font-semibold text-fg">
                        {p.family} — {p.title}
                      </span>
                    </div>

                    {/* the bar itself — an overlay grid on the same tracks as
                        the gutters, so the span lands exactly on its months */}
                    <div className="relative flex-1">
                      <div className="grid grid-cols-4 gap-2">
                        {MONTHS.map((m) => (
                          <span
                            key={m}
                            className="h-11 rounded-lg border border-border/60 bg-black/20"
                          />
                        ))}
                      </div>

                      <div className="absolute inset-0 grid grid-cols-4 gap-2">
                        <motion.div
                          className="flex items-center overflow-hidden rounded-lg px-3"
                          style={{
                            gridColumn: `${s.start} / span ${s.span}`,
                            transformOrigin: "left",
                            background: `linear-gradient(90deg, ${p.tone}38, ${p.tone}18)`,
                            border: `1px solid ${p.tone}66`,
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileInView={{ scaleX: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 0.7,
                            delay: 0.15 + i * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {/* light travels the length of the bar */}
                          <motion.span
                            aria-hidden
                            className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{ x: ["-100%", "700%"] }}
                            transition={{
                              duration: 4.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                              delay: i * 0.6,
                              ease: "easeInOut",
                            }}
                          />
                          <span className="relative truncate text-[11px] font-medium text-fg/85">
                            {p.timeline}
                          </span>
                          <span className="relative ml-auto hidden truncate pl-2 text-[10px] text-fg/50 sm:block">
                            {s.note}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* legend */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
              {PROGRAMS.map((p) => (
                <span key={p.slug} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: p.tone }}
                  />
                  <span className="text-[11px] text-muted">
                    {p.location} · DRI {p.dri}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
