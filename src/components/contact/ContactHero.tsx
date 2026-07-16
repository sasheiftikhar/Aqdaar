"use client";

import { motion } from "framer-motion";
import SoftGlow from "@/components/ui/SoftGlow";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-16">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />

      <div className="relative mx-auto max-w-[820px] px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display text-5xl font-extrabold tracking-[-0.03em] text-fg sm:text-6xl lg:text-7xl"
        >
          Let&apos;s Talk Big
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-muted"
        >
          Idea, project, training, or partnership — start the conversation. A
          real person reads every message, and we reply faster than you&apos;d
          expect.
        </motion.p>

        {/* email pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-9 flex max-w-lg items-center gap-2 rounded-full border border-border bg-surface/60 py-2 pl-6 pr-2 backdrop-blur"
        >
          <span className="flex-1 truncate text-left text-sm text-muted">
            aqdaar.jamal@gmail.com
          </span>
          <a
            href="mailto:aqdaar.jamal@gmail.com"
            className="bg-primary-gradient on-accent shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            Book a Consultation →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
