"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

/**
 * The page's closing action. Same dotted-field treatment as the site-wide
 * FinalCta, but the copy commits to the one thing this page is asking for.
 */
export default function DiscoveryCta() {
  return (
    <section
      id="discovery"
      className="relative flex min-h-[70vh] scroll-mt-24 items-center overflow-hidden"
    >
      <div
        aria-hidden
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
        aria-hidden
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
          <h2 className="display text-4xl font-bold sm:text-6xl">
            Schedule Your Free
            <br />
            Discovery Call.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-[15px] text-muted">
            Thirty minutes, no pitch. We take a limited number of engagements
            each quarter — reaching out early is worth it.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={ROUTES.contact}
              className="bg-primary-gradient on-accent group flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Book a Free Discovery Call
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={ROUTES.services}
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
