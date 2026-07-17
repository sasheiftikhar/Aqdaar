"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";
import {
  CATEGORIES,
  PROGRAMS,
  type Category,
  type Program,
} from "@/components/trainings/programs-data";

const ALL = "All programs" as const;
type Filter = typeof ALL | Category;
const FILTERS: Filter[] = [ALL, ...CATEGORIES];

/* ── card ─────────────────────────────────────────────────────── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
        {label}
      </span>
      <span className="text-right text-[12px] leading-snug text-muted">
        {value}
      </span>
    </div>
  );
}

function ProgramCard({
  p,
  on,
  onSelect,
}: {
  p: Program;
  on: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={onSelect}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface/40 p-6 text-left transition-colors"
      style={{ borderColor: on ? `${p.tone}66` : "var(--color-border)" }}
    >
      {/* tinted wash keyed to the program */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity"
        style={{
          background: `radial-gradient(circle at 80% 0%, ${p.tone}, transparent 62%)`,
          opacity: on ? 0.16 : 0.06,
        }}
      />

      <div className="relative flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
          {p.family}
        </span>
        <span className="ml-auto flex items-center gap-1 text-[9.5px] text-mint">
          <motion.span
            className="h-1 w-1 rounded-full bg-mint"
            animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          Enrolling
        </span>
      </div>

      <h3 className="relative mt-2 text-xl font-bold text-fg">{p.title}</h3>
      <p className="relative mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
        {p.blurb}
      </p>

      <div className="relative mt-5 divide-y divide-border border-t border-border pt-1">
        <Row label="DRI" value={p.dri} />
        <Row label="Partner" value={p.partner} />
        <Row label="Timeline" value={p.timeline} />
        <Row label="Location" value={p.location} />
      </div>

      <span
        className="relative mt-5 flex items-center gap-1.5 text-[12px] font-semibold"
        style={{ color: p.tone }}
      >
        View details
        <motion.span animate={{ x: on ? 3 : 0 }} transition={{ duration: 0.25 }}>
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

/* ── detail ───────────────────────────────────────────────────── */

function Detail({ p }: { p: Program }) {
  return (
    <motion.div
      key={p.slug}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-border bg-surface/30"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          background: `radial-gradient(circle at 85% 0%, ${p.tone}, transparent 55%)`,
        }}
      />
      {/* a slow sweep, so the panel never sits completely still */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
        animate={{ x: ["-30%", "560%"] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      <div className="relative grid grid-cols-1 gap-px bg-border lg:grid-cols-12">
        {/* curriculum */}
        <div className="bg-bg/60 p-7 lg:col-span-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
            Curriculum
          </p>
          <h3 className="mt-2 text-2xl font-bold text-fg">
            {p.family} — {p.title}
          </h3>

          <div className="mt-6 space-y-px overflow-hidden rounded-xl border border-border bg-border">
            {p.curriculum.map((c, i) => (
              <motion.div
                key={c.week}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                className="bg-bg p-4"
              >
                <div className="flex items-center gap-2.5">
                  <motion.span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: p.tone }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.55, 1, 0.55] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: i * 0.45,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-faint">
                    {c.week}
                  </span>
                  <span className="text-[13.5px] font-semibold text-fg">
                    {c.title}
                  </span>
                </div>
                <p className="mt-2 pl-4 text-[12.5px] leading-relaxed text-muted">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* schedule · instructor · partner · pricing */}
        <div className="bg-bg/60 p-7 lg:col-span-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
            Schedule &amp; batches
          </p>
          <div className="mt-3 space-y-2">
            {p.batches.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 rounded-lg border border-border bg-black/30 px-3.5 py-2.5"
              >
                <span
                  className="h-6 w-[3px] shrink-0 rounded-full"
                  style={{ background: p.tone }}
                />
                <span className="flex-1">
                  <span className="block text-[12px] font-semibold text-fg">
                    {b.when}
                  </span>
                  <span className="block text-[10.5px] text-faint">
                    {b.note}
                  </span>
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-faint">
                  {b.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* instructor */}
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
            Instructor
          </p>
          <div className="mt-3 flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-black/70"
              style={{ background: p.tone }}
            >
              {p.dri
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span>
              <span className="block text-[13.5px] font-semibold text-fg">
                {p.dri}
              </span>
              <span className="block text-[11px] text-accent">{p.driRole}</span>
            </span>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
            {p.driBio}
          </p>

          {/* partner */}
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
            In partnership with
          </p>
          {/*
            PARTNER LOGO SLOT — the wordmark stands in until artwork lands.
            Drop an <img> in here; the row height is already reserved.
          */}
          <div className="mt-3 flex h-14 items-center gap-3 rounded-xl border border-border bg-black/30 px-4">
            <span
              className="flex h-7 w-7 items-center justify-center rounded text-[11px] font-bold text-black/70"
              style={{ background: p.tone }}
            >
              {p.partner[0]}
            </span>
            <span className="text-[13px] font-semibold text-fg">
              {p.partner}
            </span>
          </div>

          {/* pricing */}
          <div className="mt-7 rounded-xl border border-border bg-black/30 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
                Pricing
              </span>
              <span className="text-[15px] font-bold text-fg">{p.fee}</span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-butter">
              <motion.span
                className="h-1 w-1 rounded-full bg-butter"
                animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {p.earlyBird}
            </p>
          </div>

          <a
            href={ROUTES.contact}
            className="bg-primary-gradient on-accent group mt-5 flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
          >
            Enrol now
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <p className="mt-3 text-center text-[11px] text-faint">
            Seats are limited so every cohort keeps a real instructor ratio.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── section ──────────────────────────────────────────────────── */

export default function Programs() {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [slug, setSlug] = useState(PROGRAMS[0].slug);

  const list = useMemo(
    () =>
      filter === ALL
        ? PROGRAMS
        : PROGRAMS.filter((p) => p.category === filter),
    [filter]
  );

  // the detail always follows a program that's actually on screen
  const current = list.find((p) => p.slug === slug) ?? list[0];

  return (
    <section id="programs" className="relative scroll-mt-24 bg-bg py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="display text-center text-4xl font-bold text-fg sm:text-5xl">
            Browse trainings
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-lg text-center text-[14.5px] text-muted">
            Three programs running July through August and beyond — each with a
            named owner and a partner behind it.
          </p>
        </Reveal>

        {/* category filter */}
        <Reveal delay={0.12}>
          <div className="scrollbar-none mt-9 flex justify-start gap-2 overflow-x-auto sm:justify-center">
            {FILTERS.map((f) => {
              const on = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 rounded-lg px-4 py-2 text-[12.5px] font-medium transition-colors ${
                    on
                      ? ""
                      : "border border-border bg-surface/50 hover:border-accent/40"
                  }`}
                >
                  {/* the gradient pill glides to whichever chip is on */}
                  {on && (
                    <motion.span
                      layoutId="chip-pill"
                      className="bg-primary-gradient absolute inset-0 rounded-lg"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span
                    className={`relative ${on ? "on-accent" : "text-muted hover:text-fg"}`}
                  >
                    {f}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* card grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProgramCard
                p={p}
                on={current?.slug === p.slug}
                onSelect={() => setSlug(p.slug)}
              />
            </Reveal>
          ))}
        </div>

        {/* detail */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {current && <Detail p={current} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
