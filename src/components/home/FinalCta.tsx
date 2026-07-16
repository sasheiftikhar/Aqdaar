"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

export default function FinalCta() {
  return (
    <section
      id="consult"
      className="relative flex min-h-[80vh] items-center overflow-hidden"
    >
      {/* dotted field rising and fading up */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1.4px)",
          backgroundSize: "11px 11px",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 12%, transparent 88%)",
          maskImage:
            "linear-gradient(to top, black 0%, black 12%, transparent 88%)",
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
          <h2 className="display text-5xl font-bold sm:text-7xl">
            Ready to Grow Big?
            <br />
            Let&apos;s Talk.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-muted">
            Limited projects per quarter — Q3 slots open now.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="#consult"
              className="bg-primary-gradient on-accent group flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Book a Consultation
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#services"
              className="rounded-xl border border-border bg-surface/50 px-7 py-3.5 font-medium text-fg transition-colors hover:bg-surface-2"
            >
              Explore Our Services
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
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
