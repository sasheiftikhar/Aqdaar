"use client";

import { motion } from "framer-motion";
import SoftGlow from "@/components/ui/SoftGlow";
import { ROUTES } from "@/lib/nav";

const MODULES = [
  { label: "Orientation", tone: "faint" },
  { label: "Dhundo · Start with the market", tone: "faint" },
  { label: "Gap analysis on your idea", tone: "accent" },
  { label: "Banao · Scope the build", tone: "muted" },
  { label: "Write the cut list", tone: "muted" },
  { label: "Review with Faseeh", tone: "mint" },
  { label: "Becho · Price the pilot", tone: "butter" },
];

const OUTLINE = [
  "Start with the market, not the idea.",
  "Map who already serves it — and where they leave people stranded.",
  "Cut the brief to the smallest real build.",
  "Price a first pilot without guessing.",
];

/** Three-dot "mentor is typing" tell. */
function TypingDots() {
  return (
    <span className="flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1 w-1 rounded-full bg-faint"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function WorkspaceMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0b0b0d] shadow-2xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded bg-black/40 px-2 py-0.5 text-[10.5px] text-faint">
          Cohort Board · Dexter Lab — Startup Bootcamp
        </span>
      </div>

      <div className="grid grid-cols-12">
        {/* module rail */}
        <aside className="col-span-4 border-r border-border bg-surface/30 p-3">
          <p className="px-1 pb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-faint">
            Modules
          </p>

          <div className="relative">
            {/* the highlight glides down the rail on its own */}
            <motion.span
              className="absolute inset-x-0 h-[26px] rounded-md bg-accent/10"
              animate={{ y: [52, 52, 78, 78, 130, 130, 52] }}
              transition={{
                duration: 12,
                times: [0, 0.2, 0.28, 0.5, 0.58, 0.9, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {MODULES.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.4 }}
                className={`relative mb-0.5 flex h-[26px] items-center gap-1.5 rounded-md px-2 text-[10px] ${
                  m.tone === "accent" ? "font-medium text-accent" : "text-muted"
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${
                    m.tone === "mint"
                      ? "bg-mint"
                      : m.tone === "butter"
                        ? "bg-butter"
                        : m.tone === "accent"
                          ? "bg-accent"
                          : "bg-faint"
                  }`}
                />
                <span className="truncate">{m.label}</span>
              </motion.div>
            ))}
          </div>

          {/* cohort progress creeping forward */}
          <div className="mt-3 px-1">
            <div className="flex items-center justify-between text-[8px] text-faint">
              <span>Week 2 of 4</span>
              <span>Batch 01</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/8">
              <motion.span
                className="bg-primary-gradient block h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "50%" }}
                transition={{ duration: 2.4, delay: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </aside>

        {/* lesson body */}
        <div className="col-span-8 p-4">
          <h3 className="text-[13px] font-bold text-fg">
            Week 02 · Gap analysis on your own idea
          </h3>
          <p className="mt-2 text-[10px] leading-relaxed text-muted">
            Most teams start with a solution and hunt for a problem to attach it
            to. This week runs the method backwards, on the idea you actually
            walked in with.
          </p>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-fg">
            What you&apos;ll leave with
            <motion.span
              className="inline-block h-[11px] w-[1.5px] bg-accent"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
            />
          </p>
          <ul className="mt-2 space-y-1.5">
            {OUTLINE.map((o, i) => (
              <motion.li
                key={o}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.12, duration: 0.5 }}
                className="flex gap-1.5 text-[10px] leading-relaxed text-muted"
              >
                <motion.span
                  className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent/60"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
                {o}
              </motion.li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["July", "Online", "DRI Faseeh Asghar"].map((t) => (
              <span
                key={t}
                className="rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[9px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* mentor thread — a strip along the bottom */}
      <div className="border-t border-border bg-surface/30 p-3">
        <p className="flex items-center gap-1.5 pb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-faint">
          Faseeh Asghar · DRI
          <TypingDots />
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="w-fit rounded-lg rounded-br-sm bg-accent/15 px-2.5 py-1.5 text-[9.5px] text-fg"
          >
            My idea just fell apart in week two.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="flex-1 rounded-lg rounded-bl-sm border border-border bg-surface-2 px-2.5 py-1.5 text-[9.5px] leading-relaxed text-muted"
          >
            Good — that&apos;s the week doing its job. Most people leave week two
            pointed somewhere different than they arrived. Bring the new one to
            review and we&apos;ll scope it together.
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function TrainingHero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-20">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12">
        {/* copy rail */}
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent"
          >
            Trainings
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-5 text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl"
          >
            Upskill with <span className="text-gradient">Aqdaar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted"
          >
            Bootcamps, skills series, and short courses — taught by the same
            people who run our client projects, on real briefs rather than
            exercises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#programs"
              className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Browse trainings
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={ROUTES.contact}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-5 py-3.5 text-[13.5px] text-muted transition-colors hover:border-accent/40 hover:text-fg"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-mint"
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              Talk to us about a cohort
              <span className="text-faint">↗</span>
            </a>
          </motion.div>

          {/* badge pair — the reference's award chips, in our palette */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <span className="flex items-center gap-2.5 rounded-lg border border-accent/40 bg-accent/[0.06] px-4 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-accent/20 text-[11px] font-bold text-accent">
                A
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-faint">
                  Next batches
                </span>
                <span className="block text-[13px] font-bold text-fg">
                  July &amp; August
                </span>
              </span>
              <span className="ml-1 text-[11px] font-semibold text-accent">
                ▲ 3
              </span>
            </span>

            <span className="flex items-center gap-2.5 rounded-lg border border-mint/40 bg-mint/[0.06] px-4 py-2">
              <span className="text-sm">🤝</span>
              <span className="text-left leading-tight">
                <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-faint">
                  Run with
                </span>
                <span className="block text-[13px] font-bold text-fg">
                  GMS Consultant &amp; Skillvention
                </span>
              </span>
            </span>
          </motion.div>
        </div>

        {/* the board itself */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-7"
        >
          <WorkspaceMock />

          {/* drifting pastel motes */}
          {[
            { c: "bg-accent", x: "-2%", y: "10%", d: 0 },
            { c: "bg-mint", x: "99%", y: "30%", d: 1.4 },
            { c: "bg-butter", x: "96%", y: "84%", d: 2.2 },
          ].map((m, i) => (
            <motion.span
              key={i}
              aria-hidden
              className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full ${m.c} opacity-60`}
              style={{ left: m.x, top: m.y }}
              animate={{ y: [0, -12, 0], opacity: [0.25, 0.7, 0.25] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: m.d,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
