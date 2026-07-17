"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SoftGlow from "@/components/ui/SoftGlow";

/* The engine the headline names: one brief enters, three divisions carry it. */
const STAGES = [
  { title: "Dhundo", sub: "Discover the opportunity", tone: "#cabfe1" },
  { title: "Banao", sub: "Build the product", tone: "#b4d9ce" },
  { title: "Becho", sub: "Take it to market", tone: "#f5efd3" },
];

const STAGE_MS = 1800;

function CheckIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5l4 4L19 6"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The brief moves down the pipeline one division at a time, then the whole
 * run resets — the hero copy's "one place to discover, build, and take it to
 * market", shown rather than claimed.
 */
function StudioEngine() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const run = (i: number) => {
      if (cancelled) return;

      // pipeline finished — hold on the shipped state, then start over
      if (i >= STAGES.length) {
        t = setTimeout(() => {
          if (cancelled) return;
          setDone(0);
          setActive(0);
          run(0);
        }, 2800);
        return;
      }

      setActive(i);
      t = setTimeout(() => {
        if (cancelled) return;
        setDone(i + 1);
        run(i + 1);
      }, STAGE_MS);
    };

    run(0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  const shipped = done >= STAGES.length;

  return (
    <div className="relative">
      {/* ambient chips lifted straight from the sub-headline */}
      <motion.span
        className="absolute -left-3 top-16 z-20 hidden rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-muted shadow-xl sm:block"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-lavender align-middle" />
        No guesswork
      </motion.span>
      <motion.span
        className="absolute -right-3 bottom-24 z-20 hidden rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-muted shadow-xl sm:block"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-mint align-middle" />
        No gaps
      </motion.span>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-6 shadow-2xl">
        <div className="bg-soft-gradient pointer-events-none absolute inset-0 opacity-[0.05]" />

        {/* panel header */}
        <div className="relative flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary-gradient h-6 w-6 rounded-lg" />
            <span className="text-[13px] font-semibold text-fg">
              Aqdaar Studio
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-faint">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-mint"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        {/* what goes in */}
        <div className="relative mt-5 rounded-xl border border-border bg-black/50 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
            One brief in
          </p>
          <p className="mt-1.5 text-[13px] text-fg">
            &ldquo;Launch a logistics product in Karachi.&rdquo;
          </p>
        </div>

        {/* the three divisions */}
        <div className="relative mt-3 space-y-2.5">
          {STAGES.map((s, i) => {
            const isDone = i < done;
            const isRunning = i === active && !isDone;
            const isIdle = !isDone && !isRunning;

            return (
              <div key={s.title} className="relative">
                {/* rail between divisions, drawn as the brief passes down */}
                {i > 0 && (
                  <span className="absolute -top-2.5 left-[26px] h-2.5 w-px bg-border" />
                )}

                <motion.div
                  className="relative flex items-center gap-3 rounded-xl border px-3.5 py-3"
                  animate={{
                    borderColor: isIdle
                      ? "rgba(36,31,48,1)"
                      : `${s.tone}55`,
                    backgroundColor: isIdle
                      ? "rgba(0,0,0,0.4)"
                      : `${s.tone}0f`,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* node — number while pending, tick once it's carried */}
                  <motion.span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold"
                    animate={{
                      backgroundColor: isIdle
                        ? "rgba(255,255,255,0.05)"
                        : `${s.tone}26`,
                      color: isIdle ? "#635c72" : s.tone,
                      scale: isRunning ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      scale: { duration: 1.6, repeat: isRunning ? Infinity : 0 },
                      duration: 0.4,
                    }}
                  >
                    {isDone ? <CheckIcon /> : `0${i + 1}`}
                  </motion.span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        className="text-[13.5px] font-semibold"
                        animate={{ color: isIdle ? "#9d97ab" : "#f4f2f8" }}
                        transition={{ duration: 0.4 }}
                      >
                        {s.title}
                      </motion.span>
                      <span className="truncate text-[11px] text-faint">
                        {s.sub}
                      </span>
                    </div>

                    {/* progress fills only while that division holds the brief */}
                    <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.span
                        className="block h-full origin-left rounded-full"
                        style={{ background: s.tone }}
                        initial={false}
                        animate={{ scaleX: isDone ? 1 : isRunning ? [0, 1] : 0 }}
                        transition={{
                          duration: isRunning ? STAGE_MS / 1000 : 0.3,
                          ease: isRunning ? "linear" : "easeOut",
                        }}
                      />
                    </div>
                  </div>

                  <motion.span
                    className="shrink-0 font-mono text-[9.5px] uppercase tracking-wide"
                    animate={{ color: isIdle ? "#635c72" : s.tone }}
                    transition={{ duration: 0.4 }}
                  >
                    {isDone ? "done" : isRunning ? "running" : "queued"}
                  </motion.span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* what comes out */}
        <motion.div
          className="relative mt-3 flex items-center justify-between rounded-xl border px-4 py-3"
          animate={{
            borderColor: shipped ? "rgba(180,217,206,0.4)" : "rgba(36,31,48,1)",
            backgroundColor: shipped
              ? "rgba(180,217,206,0.07)"
              : "rgba(0,0,0,0.4)",
            opacity: shipped ? 1 : 0.45,
          }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-faint">
              In market
            </p>
            <motion.p
              className="mt-1 text-[13px] text-fg"
              animate={{ opacity: shipped ? 1 : 0.4 }}
              transition={{ duration: 0.4 }}
            >
              Product shipped · 2 pilot partners live
            </motion.p>
          </div>
          <motion.span
            className="flex h-7 w-7 items-center justify-center rounded-full text-mint"
            style={{ background: "rgba(180,217,206,0.18)" }}
            animate={{ scale: shipped ? [0.8, 1.15, 1] : 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <CheckIcon size={13} />
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

export default function AssistantHero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-24">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
        {/* ---------- left: the pitch ---------- */}
        <div className="text-center lg:text-left">
          <motion.a
            href="#studio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1.5 pl-4 pr-3 text-sm text-muted transition-colors hover:border-accent/50 hover:text-fg"
          >
            <span className="bg-primary-gradient on-accent rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              New
            </span>
            Introducing Aqdaar Studio
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-8 text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
          >
            Now anyone can
            <br />
            <span className="text-gradient">build big.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-muted lg:mx-0"
          >
            Aqdaar Studio is the engine behind Dhundo, Banao, and Becho — one
            place to discover the opportunity, build the product, and take it to
            market. No guesswork, no gaps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            <a
              href="#consult"
              className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Explore product
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* ---------- right: the engine, running ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <StudioEngine />
        </motion.div>
      </div>
    </section>
  );
}
