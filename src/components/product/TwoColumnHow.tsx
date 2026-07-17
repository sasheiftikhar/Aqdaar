"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/* ---------- left card visual: a queue of everyday tasks clearing ---------- */

const TASKS = [
  "Market research deck",
  "Competitor teardown",
  "Pricing model",
  "Landing page copy",
  "Investor one-pager",
];

function TaskQueue() {
  return (
    <div className="space-y-2">
      {TASKS.map((t, i) => (
        <motion.div
          key={t}
          className="flex items-center gap-3 rounded-lg border border-border bg-black/40 px-3 py-2.5"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.09, duration: 0.4 }}
        >
          <motion.span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(180,217,206,0.18)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5l4 4L19 6"
                stroke="var(--color-mint)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
          <span className="truncate text-[13px] text-muted">{t}</span>
          <span className="ml-auto font-mono text-[10px] text-faint">done</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- right card visual: gaps being found and filled ---------- */

const CELLS = Array.from({ length: 24 });

function GapGrid() {
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {CELLS.map((_, i) => {
        const isGap = [3, 9, 14, 20].includes(i);
        return (
          <motion.span
            key={i}
            className="aspect-square rounded-[4px]"
            style={{
              background: isGap
                ? "var(--color-accent)"
                : "rgba(255,255,255,0.05)",
            }}
            animate={
              isGap
                ? { opacity: [0.25, 1, 0.25], scale: [1, 1.1, 1] }
                : undefined
            }
            transition={
              isGap
                ? { duration: 2.4, repeat: Infinity, delay: (i % 4) * 0.4 }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}

/* ---------- card shell ---------- */

function Card({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col rounded-3xl border border-border bg-surface/50 p-8 transition-colors hover:border-accent/40"
    >
      <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-mint">
        {eyebrow}
      </span>
      <h3 className="mt-3 text-2xl font-bold text-fg">{title}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-muted">{body}</p>

      <div className="mt-8 rounded-2xl border border-border-soft bg-black/30 p-5">
        {children}
      </div>
    </motion.div>
  );
}

export default function TwoColumnHow() {
  return (
    <section id="studio" className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal>
            <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
              The work that piles up,
              <br />
              and the work that pays off.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              Studio clears the groundwork so your team can spend its time on the
              things only your team can do.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <Card
              eyebrow="Everyday execution"
              title="Groundwork, handled"
              body="Research, decks, teardowns, first drafts — the tasks that eat a week get done in an afternoon, to a standard you'd actually ship."
            >
              <TaskQueue />
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <Card
              eyebrow="Find & fill gaps"
              title="Build new ideas"
              body="Studio maps where the opportunity actually is, spots what's missing in your market, and turns those gaps into things worth building."
            >
              <GapGrid />
              <p className="mt-4 text-[11px] text-faint">
                4 gaps found in this market
              </p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
