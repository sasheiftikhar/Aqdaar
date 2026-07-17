"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The partner names, drifting past.
 *
 * The list is rendered twice and the track travels exactly -50%, so at the end
 * of a loop the second copy sits precisely where the first started and the reset
 * is invisible. Two copies also guarantee the row is wider than any viewport,
 * which is what keeps a gap from ever appearing at the trailing edge.
 */
export default function PartnerMarquee({ items }: { items: string[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative overflow-hidden">
      {/* Names fade in and out at the edges rather than popping at a hard cut. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-24" />

      <motion.div
        className="flex w-max gap-3 py-1"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((name, index) => (
          <span
            key={`${name}-${index}`}
            // aria-hidden on the duplicates: the same names read twice is noise.
            aria-hidden={index >= items.length}
            className="whitespace-nowrap rounded-xl border border-border bg-surface/50 px-5 py-3 text-[13px] text-muted sm:text-[14px]"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
