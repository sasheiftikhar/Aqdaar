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
  art,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
  /**
   * Optional decoration for the empty half beside the headline. Absolutely
   * positioned and scrimmed rather than gridded, so it can bleed off the right
   * edge — and so every page that passes nothing is laid out exactly as before.
   */
  art?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-bg pt-28 pb-16 sm:pt-36">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />

      {art && (
        <>
          {/* Narrow screens have no empty half to fill, so it drops behind the
              copy at low opacity instead of being cut in two. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-30 lg:w-[58%] lg:opacity-100">
            {art}
          </div>
          {/* keeps the headline readable where the two overlap */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent lg:via-bg/40" />
        </>
      )}

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Art bleeds in from the right, so the copy gives it room to land in
            rather than running underneath it. */}
        <div className={art ? "max-w-2xl" : undefined}>
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
          className="display mt-5 text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl"
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
      </div>
    </section>
  );
}
