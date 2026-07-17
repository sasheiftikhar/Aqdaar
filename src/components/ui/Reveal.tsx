"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIntroReady } from "@/components/intro/ready";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Lightweight scroll-in reveal. Fires once when the element enters the
 * viewport. Deliberately small movement — these are micro-animations, not
 * a scroll-jacked experience.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: RevealProps) {
  const ready = useIntroReady();

  return (
    <motion.div
      // `min-w-0` does nothing to a block in normal flow, but this wraps most of
      // the wide mocks on the site and those sit in grids — where the default
      // min-width:auto refuses to shrink below the content's min-content width.
      // A `whitespace-pre` code block or a fixed-width panel would otherwise
      // size its whole column to itself and drag the section off the screen.
      className={className ? `min-w-0 ${className}` : "min-w-0"}
      initial={{ opacity: 0, y }}
      // Resolves to the initial frame until the intro hands over: `once: true`
      // means anything already on screen behind the loading screen would
      // otherwise burn its single shot at animating while nobody could see it.
      // Note this stays a real target rather than going undefined — framer
      // enables the viewport observer based on this prop, and dropping it would
      // leave the observer unregistered and the element stuck hidden.
      whileInView={ready ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
