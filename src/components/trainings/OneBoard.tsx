"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/* ── card visuals ─────────────────────────────────────────────── */

/** Fanned material cards — the brief, the recording, the reference build. */
function LearnVisual() {
  const cards = [
    { label: "PDF", title: "Cohort brief", rot: -9, x: -6, tone: "#cabfe1" },
    { label: "MP4", title: "Session 03 replay", rot: 3, x: 40, tone: "#b4d9ce" },
    { label: "REPO", title: "Reference build", rot: 13, x: 86, tone: "#f5efd3" },
  ];
  return (
    <div className="relative mt-6 h-36">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          className="absolute bottom-0 w-28 rounded-lg border border-border bg-surface-2 p-2.5 shadow-xl"
          style={{ left: c.x }}
          initial={{ rotate: c.rot, y: 10, opacity: 0 }}
          whileInView={{ rotate: c.rot, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          {/* each card breathes on its own clock */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <span
              className="inline-block rounded px-1.5 py-0.5 text-[8px] font-bold text-black/70"
              style={{ background: c.tone }}
            >
              {c.label}
            </span>
            <p className="mt-2 text-[9.5px] font-medium leading-tight text-fg">
              {c.title}
            </p>
            <div className="mt-2 space-y-1">
              <span className="block h-1 w-full rounded bg-white/10" />
              <span className="block h-1 w-2/3 rounded bg-white/10" />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/** A worked outline — what a mentor-reviewed research note looks like. */
function ResearchVisual() {
  const rows = [
    "Operators mapped — 14",
    "Corridors covered — 3",
    "Unserved leg — return",
  ];
  return (
    <div className="relative mt-6 h-40 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-border bg-surface-2 p-4">
        {/* a slow highlight sweep, as if someone is reading it back */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          animate={{ x: ["-20%", "420%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />

        <div className="relative flex items-center gap-1.5">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-accent/20 text-[8px] text-accent">
            ✎
          </span>
          <span className="text-[10px] font-semibold text-fg">
            Route gap · working notes
          </span>
          <motion.span
            className="ml-auto text-[8px] text-mint"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            reviewed
          </motion.span>
        </div>

        <p className="relative mt-2.5 text-[9.5px] leading-relaxed text-muted">
          Fourteen operators run the same three corridors. Nobody prices the
          short-haul return leg
          <motion.span
            className="ml-[2px] inline-block h-[9px] w-[1.5px] translate-y-[1px] bg-accent"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </p>

        <div className="relative mt-3 space-y-1.5 border-l border-border pl-2.5">
          {rows.map((l, i) => (
            <p key={l} className="flex items-center gap-1.5 text-[9px] text-faint">
              <motion.span
                className="h-1 w-1 shrink-0 rounded-full bg-mint"
                animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/** The cohort board — every project in one place. */
const BOARDS = [
  {
    name: "Karachi Logistics",
    rows: [
      { t: "Operator interviews", c: "bg-mint" },
      { t: "Pricing teardown", c: "bg-accent" },
      { t: "Scope the MVP", c: "bg-butter" },
      { t: "Thursday review", c: "bg-faint" },
    ],
  },
  {
    name: "Campus Sprint",
    rows: [
      { t: "Brief drop — Saturday", c: "bg-butter" },
      { t: "Team formation", c: "bg-accent" },
      { t: "Mentor floor hours", c: "bg-mint" },
      { t: "Sunday demo panel", c: "bg-faint" },
    ],
  },
  {
    name: "ERP Rebuild",
    rows: [
      { t: "Floor walkthrough", c: "bg-accent" },
      { t: "What we refuse to build", c: "bg-butter" },
      { t: "Cutover plan", c: "bg-mint" },
      { t: "Ship without downtime", c: "bg-faint" },
    ],
  },
];

function OrganizeVisual() {
  const [board, setBoard] = useState(0);

  useEffect(() => {
    const loop = setInterval(
      () => setBoard((b) => (b + 1) % BOARDS.length),
      2800
    );
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative mt-6 h-36 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 flex gap-3 rounded-t-xl border border-b-0 border-border bg-surface-2 p-3.5">
        <div className="w-2/5 space-y-1 border-r border-border pr-2.5">
          {BOARDS.map((b, i) => (
            <motion.p
              key={b.name}
              className="truncate rounded px-1.5 py-1 text-[8.5px]"
              animate={{
                backgroundColor:
                  board === i ? "rgba(202,191,225,0.10)" : "rgba(0,0,0,0)",
                color: board === i ? "#cabfe1" : "#635c72",
              }}
              transition={{ duration: 0.4 }}
            >
              {b.name}
            </motion.p>
          ))}
        </div>

        {/* the task list swaps with the selected board */}
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={board}
              className="space-y-1.5"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
            >
              {BOARDS[board].rows.map((r, i) => (
                <div key={r.t} className="flex items-center gap-1.5">
                  <motion.span
                    className={`h-1 w-1 shrink-0 rounded-full ${r.c}`}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.35,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="truncate text-[8.5px] text-muted">{r.t}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** The mentor prompt bar — the reference's yellow "Ask" card, in lavender. */
function AskVisual() {
  return (
    <div className="relative mt-6">
      <motion.div
        className="rounded-2xl border border-white/15 bg-black/30 p-4 backdrop-blur-sm"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[13px] leading-relaxed text-fg">
          Pressure-test my gap analysis against{" "}
          <motion.span
            className="inline-block rounded-md bg-accent/25 px-1.5 py-0.5 text-accent"
            animate={{ backgroundColor: ["rgba(202,191,225,0.25)", "rgba(202,191,225,0.45)", "rgba(202,191,225,0.25)"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            @Karachi Logistics
          </motion.span>
          <motion.span
            className="ml-[2px] inline-block h-[12px] w-[2px] translate-y-[2px] bg-fg/70"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md border border-white/15 px-2 py-1 text-[9px] text-muted">
            💬 Ask
          </span>
          <span className="text-[10px] text-faint">@</span>
          <span className="text-[10px] text-faint">🌐</span>
          <motion.span
            className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] text-black/70"
            animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↑
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

/** The build view — the reference's blue "Write" card. */
const STEPS = ["Brief", "Users", "Scope", "Cut list", "Ship plan"];
const SHIP_LINES = [
  "Return-leg pricing, one corridor",
  "Operator sign-up, no dashboard yet",
  "Manual dispatch — on purpose",
];

function BuildVisual() {
  const [step, setStep] = useState(2);

  useEffect(() => {
    const loop = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2200);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="ml-2 text-[8px] text-white/40">
          scope.md — Karachi Logistics
        </span>
        <motion.span
          className="ml-auto text-[8px] text-mint"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ● saved
        </motion.span>
      </div>
      <div className="grid grid-cols-3">
        <div className="relative space-y-1 border-r border-white/10 p-3">
          {STEPS.map((s, i) => (
            <motion.p
              key={s}
              className="rounded px-1 text-[8px]"
              animate={{ color: step === i ? "#cabfe1" : "rgba(255,255,255,0.35)" }}
              transition={{ duration: 0.35 }}
            >
              {s}
            </motion.p>
          ))}
        </div>
        <div className="col-span-2 p-3">
          <p className="text-[10px] font-semibold text-fg">
            What ships in week six
          </p>
          <div className="mt-2 space-y-1.5">
            {SHIP_LINES.map((l, i) => (
              <motion.p
                key={l}
                className="flex gap-1 text-[8px] leading-relaxed text-white/45"
                animate={{ opacity: [0.35, 0.75, 0.35] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white/25">—</span>
                {l}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Paper-plane sketch — the reference's "Share" illustration, looping. */
function ShareVisual() {
  return (
    <div className="mt-6 flex h-36 items-center justify-center">
      <svg viewBox="0 0 120 90" className="h-28 w-36 text-accent/70">
        <motion.path
          d="M6 76 C 34 74, 58 60, 74 34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {/* the plane keeps taking off */}
        <motion.g
          animate={{ x: [0, 6, 0], y: [0, -6, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "90px", originY: "34px" }}
        >
          <path
            d="M72 36 L112 14 L96 54 L86 40 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M112 14 L86 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </motion.g>
      </svg>
    </div>
  );
}

/* ── card shell ───────────────────────────────────────────────── */

function Card({
  title,
  body,
  children,
  className = "",
  tone = "default",
}: {
  title: string;
  body: string;
  children?: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "build";
}) {
  const shell =
    tone === "accent"
      ? "border-accent/30 bg-[linear-gradient(135deg,#cabfe1_0%,#f5efd3_55%,#b4d9ce_100%)]"
      : tone === "build"
        ? "border-lavender-deep/30 bg-[linear-gradient(135deg,#3b3357_0%,#2a3f4e_50%,#25443f_100%)]"
        : "border-border bg-surface/40";

  return (
    <motion.div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7 ${shell} ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3
        className={`text-xl font-bold ${tone === "accent" ? "on-accent" : "text-fg"}`}
      >
        {title}
      </h3>
      <p
        className={`mt-2.5 text-[13.5px] leading-relaxed ${
          tone === "accent" ? "text-[#3f3a52]" : "text-muted"
        }`}
      >
        {body}
      </p>
      {children}
    </motion.div>
  );
}

/* ── section ──────────────────────────────────────────────────── */

export default function OneBoard() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="display text-center text-4xl font-bold text-fg sm:text-5xl">
            What every program includes
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-xl text-center text-[14.5px] leading-relaxed text-muted">
            Whichever program you pick, the cohort runs on one board — material,
            research, reviews, and the thing you&apos;re building, in one place
            and yours to keep.
          </p>
        </Reveal>

        {/* deliberately uneven: 33/67, then 58/42, then 67/33 */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-4">
            <Card
              title="Learn"
              body="Briefs, replays, slides, and reference builds land on your board — not in a folder you lose track of."
            >
              <LearnVisual />
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <Card
              title="Research"
              body="Run the Dhundo method on a live brief: size the opportunity, map who's already serving it, and find what the market is actually missing. Mentor-reviewed as you go."
            >
              <ResearchVisual />
            </Card>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-7">
            <Card
              title="Organize"
              body="Every note, project, and review in one board. Each cohort is a project — and it stays yours after the last session."
            >
              <OrganizeVisual />
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Card
              tone="accent"
              title="Ask"
              body="Ask whenever you're stuck. Faseeh and Shoaib run our client projects — so the answer comes with a real pilot attached, not a framework."
            >
              <AskVisual />
            </Card>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-8">
            <Card
              tone="build"
              title="Build"
              body="Focus on building: a scoped brief, real reviews, and something you can put in front of users by the end."
            >
              <BuildVisual />
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <Card
              title="Share"
              body="Graduate with a portfolio link you can send anywhere — the work, the method, and what you decided not to build."
            >
              <ShareVisual />
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
