"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import SoftGlow from "@/components/ui/SoftGlow";

/**
 * The standard opener for interior pages — eyebrow, headline, sub, optional
 * actions. Keeps every page landing on the same rhythm as the product and blog
 * heroes instead of each one inventing its own spacing.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-16">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-5 text-5xl font-extrabold tracking-[-0.03em] text-fg sm:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
