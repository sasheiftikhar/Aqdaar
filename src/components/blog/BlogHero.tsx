"use client";

import { motion } from "framer-motion";
import SoftGlow from "@/components/ui/SoftGlow";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-12">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent"
        >
          The Aqdaar blog
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-5 text-5xl font-extrabold tracking-[-0.03em] text-fg sm:text-6xl"
        >
          What we&apos;re <span className="text-gradient">building</span>,
          <br />
          and what we learned.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted"
        >
          Dispatches, case studies, and notes from the team — how projects
          actually run from first call to market.
        </motion.p>
      </div>
    </section>
  );
}
