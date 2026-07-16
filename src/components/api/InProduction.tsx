"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";

/* Card 1: agent observability — reasoning traces streaming in */
const TRACE = [
  "Navigating to booking portal",
  "Detected login form",
  "Submitting credentials from vault",
  "Solving MFA challenge",
  "Reading confirmation details",
  "Returning structured output",
];

function ObservabilityCard() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const loop = setInterval(() => {
      setCount((c) => (c >= TRACE.length ? 1 : c + 1));
    }, 900);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5">
      <div className="h-[240px] overflow-hidden rounded-xl border border-border-soft bg-black/40 p-4">
        <div className="mb-3 flex items-center gap-2 text-[11px] text-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-running" />
          Live trace · agent_7F3a
        </div>
        <div className="space-y-1.5 font-mono text-[11.5px]">
          {TRACE.slice(0, count).map((line, i) => {
            const isLast = i === count - 1;
            return (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <span className={isLast ? "text-accent" : "text-done"}>
                  {isLast ? "▸" : "✓"}
                </span>
                <span className={isLast ? "text-fg" : "text-muted"}>{line}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
      <h4 className="mt-5 text-lg font-semibold text-fg">Agent observability</h4>
      <p className="mt-2 text-sm text-muted">
        Screenshots and reasoning traces expose every decision your agent makes,
        step by step.
      </p>
    </div>
  );
}

/* Card 2: structured output — schema validating field by field */
const FIELDS = [
  { key: "confirmation_number", type: "string", value: '"AQ-48213"' },
  { key: "hotel_name", type: "string", value: '"Ace Hotel"' },
  { key: "check_in", type: "string", value: '"2026-08-01"' },
  { key: "check_out", type: "string", value: '"2026-08-04"' },
  { key: "total_cost", type: "number", value: "612.00" },
];

function StructuredOutputCard() {
  const [valid, setValid] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      setValid(0);
      let n = 0;
      const t = setInterval(() => {
        n += 1;
        if (cancelled) return;
        setValid(n);
        if (n >= FIELDS.length) clearInterval(t);
      }, 500);
    };
    run();
    const loop = setInterval(run, 5000);
    return () => {
      cancelled = true;
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5">
      <div className="h-[240px] overflow-hidden rounded-xl border border-border-soft bg-black/40 p-4">
        <div className="mb-3 flex items-center justify-between text-[11px] text-faint">
          <span>schema.validate()</span>
          <AnimatePresence>
            {valid >= FIELDS.length && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded bg-done/15 px-2 py-0.5 font-semibold text-done"
              >
                ✓ valid
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="space-y-1.5 font-mono text-[11.5px]">
          {FIELDS.map((f, i) => {
            const ok = i < valid;
            return (
              <div
                key={f.key}
                className="flex items-center gap-2 rounded-md border border-border-soft bg-black/40 px-2.5 py-1.5"
              >
                <motion.span
                  animate={{
                    color: ok ? "#B4D9CE" : "#56565c",
                  }}
                  className="w-3"
                >
                  {ok ? "✓" : "·"}
                </motion.span>
                <span className="text-muted">{f.key}</span>
                <span className="ml-auto text-faint">
                  {ok ? f.value : f.type}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <h4 className="mt-5 text-lg font-semibold text-fg">Structured output</h4>
      <p className="mt-2 text-sm text-muted">
        Define a schema and get typed, validated JSON back every time — no
        parsing, no scraping glue.
      </p>
    </div>
  );
}

/* Card 3: throughput stat */
function ThroughputCard() {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      setN(Math.round(p * 12480));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5">
      <div className="flex h-[240px] flex-col items-center justify-center rounded-xl border border-border-soft bg-black/40 p-4">
        <p className="display text-6xl font-bold text-fg">
          {n.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-muted">concurrent sessions</p>
        <div className="mt-6 flex items-end gap-1.5">
          {[40, 65, 45, 80, 60, 95, 70].map((h, i) => (
            <motion.span
              key={i}
              className="w-2.5 rounded-sm bg-accent/70"
              initial={{ height: 4 }}
              whileInView={{ height: h }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            />
          ))}
        </div>
      </div>
      <h4 className="mt-5 text-lg font-semibold text-fg">Built for scale</h4>
      <p className="mt-2 text-sm text-muted">
        Run agents in parallel across your entire user base with automatic
        session isolation.
      </p>
    </div>
  );
}

export default function InProduction() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
        <Reveal>
          <h2 className="display max-w-2xl text-4xl font-bold sm:text-6xl">
            Everything agents need
            <br />
            in production
          </h2>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="h-full">
            <ObservabilityCard />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <StructuredOutputCard />
          </Reveal>
          <Reveal delay={0.16} className="h-full">
            <ThroughputCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
