"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * Two asks, one in each language the copy promises — the panel cycles between
 * them so the "Urdu or English" claim is the thing you actually watch happen.
 */
const PROMPTS = [
  {
    tag: "EN",
    dir: "ltr" as const,
    lang: "en",
    text: "Find me a gap in Karachi's logistics market and plan the build.",
    out: [
      { label: "Dhundo", line: "Mapped 14 operators · 3 underserved routes" },
      { label: "Banao", line: "Scoped MVP: driver app + dispatch console" },
      { label: "Becho", line: "Go-to-market: 2 pilot partners identified" },
    ],
  },
  {
    tag: "اردو",
    dir: "rtl" as const,
    lang: "ur",
    text: "ہمارے ادارے کے لیے ٹریننگ پروگرام بناؤ اور لانچ کرو۔",
    out: [
      { label: "Dhundo", line: "Skills gap mapped across 4 departments" },
      { label: "Banao", line: "8-week curriculum + LMS build" },
      { label: "Becho", line: "Enrolment funnel and campus rollout" },
    ],
  },
];

function PromptPanel() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [showOut, setShowOut] = useState(false);

  const prompt = PROMPTS[idx];

  // Type this prompt → reveal the answer → hold → hand over to the next language
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const { text } = PROMPTS[idx];

    setShowOut(false);
    setTyped(0);
    let n = 0;

    const type = () => {
      if (cancelled) return;
      n += 1;
      setTyped(n);
      if (n >= text.length) {
        t = setTimeout(() => {
          if (cancelled) return;
          setShowOut(true);
          t = setTimeout(
            () => setIdx((i) => (i + 1) % PROMPTS.length),
            5200
          );
        }, 400);
        return;
      }
      t = setTimeout(type, 45);
    };

    t = setTimeout(type, 700);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [idx]);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface/60 shadow-2xl">
      {/* prompt bar */}
      <div className="border-b border-border p-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-faint">
            Ask Studio
          </p>
          {/* the language badge flips with the prompt being typed */}
          <motion.span
            key={prompt.tag}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-md border border-border bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-accent"
          >
            {prompt.tag}
          </motion.span>
        </div>
        <div
          dir={prompt.dir}
          lang={prompt.lang}
          className="flex min-h-[52px] items-center rounded-xl border border-border bg-black/50 px-4 py-3"
        >
          <span className="text-[14px] leading-relaxed text-fg">
            {prompt.text.slice(0, typed)}
            <motion.span
              className="mx-0.5 inline-block h-4 w-px translate-y-[2px] bg-accent"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </span>
        </div>
      </div>

      {/* structured output */}
      <div className="min-h-[210px] p-6">
        <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.16em] text-faint">
          Studio responds
        </p>
        <div className="space-y-2.5">
          {prompt.out.map((o, i) => (
            <motion.div
              key={o.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-black/40 px-4 py-3"
              initial={{ opacity: 0, y: 10 }}
              animate={showOut ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: showOut ? i * 0.18 : 0 }}
            >
              <span className="bg-primary-gradient on-accent rounded-md px-2 py-0.5 text-[10px] font-bold">
                {o.label}
              </span>
              <span className="text-[13px] text-muted">{o.line}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NaturalLanguage() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
              Natural language
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-4xl font-bold text-fg sm:text-5xl">
              Just say what you need.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-muted">
              No forms, no briefs, no back-and-forth. Describe the outcome in
              plain words — Urdu or English — and Studio comes back with a plan
              you can act on.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14">
            <PromptPanel />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
