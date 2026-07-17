"use client";

import { motion } from "framer-motion";
import WaveField from "@/components/services/WaveField";
import { CONSULT_HREF } from "@/lib/nav";

/**
 * Services opener — headline hard left, the ribbon filling the right half.
 *
 * The wave is absolutely positioned rather than gridded beside the text so it
 * can bleed off the right edge the way it does in the reference. On narrow
 * screens it drops behind the copy at low opacity instead of being cut.
 */
export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-20">
      {/* the ribbon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 lg:w-[62%] lg:opacity-100">
        <WaveField className="h-full w-full" />
      </div>
      {/* keeps the headline readable where the two overlap */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent lg:via-bg/40" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent"
          >
            What we do
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-5 text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl"
          >
            Everything it takes
            <br />
            to go from{" "}
            <span className="text-gradient">idea to market.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted"
          >
            Three divisions under one roof — discovery, build, and go-to-market.
            Start at any phase; the rest is there when you need it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={CONSULT_HREF}
              className="bg-primary-gradient on-accent group inline-flex items-center gap-3 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Get started
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-[15px] font-semibold text-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              How it works
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
