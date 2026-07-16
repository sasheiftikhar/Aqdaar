"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

const SHAPED_AROUND = [
  "Your department, your stack, your timelines",
  "On campus, on the floor, or online",
  "Scoped by Mr. Shoaib himself",
];

export default function CorporateCta() {
  return (
    <section className="relative overflow-hidden bg-bg py-28">
      {/* dotted field rising and fading up */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1.4px)",
          backgroundSize: "11px 11px",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 10%, transparent 80%)",
          maskImage:
            "linear-gradient(to top, black 0%, black 10%, transparent 80%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(202,191,225,0.10), transparent)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Corporate training
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display mt-6 text-4xl font-bold text-fg sm:text-6xl">
            Need a custom bootcamp
            <br />
            for your team?
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
            We build the curriculum around your department, your stack, and your
            timelines. We have run these on campus and on factory floors.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {SHAPED_AROUND.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-border bg-surface/50 px-3.5 py-2 text-[12px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={ROUTES.contact}
              className="bg-primary-gradient on-accent group flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Corporate training inquiry
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#programs"
              className="rounded-xl border border-border bg-surface/50 px-7 py-3.5 font-medium text-fg transition-colors hover:bg-surface-2"
            >
              Browse trainings
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p
            className="mt-8 text-2xl text-accent"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Creating What History Can&apos;t Ignore
          </p>
        </Reveal>
      </div>
    </section>
  );
}
