"use client";

/**
 * The staircase itself — the columns, their colours, and how they move.
 *
 * Shared so the page transition and the mobile menu read as the same gesture
 * rather than two drifting copies of it. Neither of them owns *when* the stairs
 * move: each drives that with its own `animate` label, and the phases here are
 * deliberately generic — `resting` (parked off the top), `covering` (dropped)
 * and back.
 */

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

/** More columns = finer staircase, but a longer total sweep. Six reads well. */
export const COLUMNS = 6;
/** Six across a phone is ~60px each — that reads as noise, not as steps. */
export const COLUMNS_MOBILE = 4;
/** How long one column takes to travel a full screen height. */
export const DURATION = 0.36;
/** Offset between adjacent columns — this is what makes it a staircase. */
export const STAGGER = 0.035;
/** easeInOutQuart — no hard start/stop at either end of the travel. */
export const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Renders at the desktop count and corrects on mount. The stairs are parked off
 * screen at rest, so a phone never sees the six it was served — by the time
 * anything drops, the count is already right.
 */
export function useStairCount() {
  const [count, setCount] = useState(COLUMNS);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const apply = () => setCount(query.matches ? COLUMNS_MOBILE : COLUMNS);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return count;
}

/** Brand gradient endpoints — lavender to mint, matching .bg-primary-gradient. */
const LAVENDER = [202, 191, 225] as const;
const MINT = [180, 217, 206] as const;

/**
 * Each column's leading edge takes one step along the brand gradient, so the
 * edges together read as a single lavender-to-mint sweep across the screen.
 */
export function edgeColor(index: number, count: number, alpha: number) {
  const t = count > 1 ? index / (count - 1) : 0;
  const [r, g, b] = LAVENDER.map((from, i) =>
    Math.round(from + (MINT[i] - from) * t),
  );
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Stagger lives on the parent, so whatever renders these must spread
 * `stairContainer` onto a motion element wrapping them.
 */
export const stairContainer: Variants = {
  covering: { transition: { staggerChildren: STAGGER } },
  revealing: { transition: { staggerChildren: STAGGER } },
};

export const stairColumn: Variants = {
  resting: { y: "-100%" },
  covering: { y: "0%", transition: { duration: DURATION, ease: EASE } },
  covered: { y: "0%" },
  revealing: { y: "-100%", transition: { duration: DURATION, ease: EASE } },
};

type StairColumnsProps = {
  /** How many columns. See `useStairCount`. */
  count: number;
  /** Fires per column; callers usually only care about the last one. */
  onColumnComplete?: (definition: unknown) => void;
  /** False while parked, so idle pages don't hold compositor layers. */
  active: boolean;
};

export function StairColumns({
  count,
  onColumnComplete,
  active,
}: StairColumnsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          variants={stairColumn}
          // Columns stagger in DOM order, so the last one always settles last —
          // in both directions. Driving a phase machine off it is exact.
          onAnimationComplete={
            index === count - 1 ? onColumnComplete : undefined
          }
          className="absolute top-0 bottom-0"
          style={{
            left: `calc(${index} * 100% / ${count})`,
            // Percentage widths land on fractional pixels and would leave
            // hairline gaps mid-sweep. Each column overlaps the next by 1px so
            // the seam is covered by its own colour — a black outline here
            // would read as a border line between every stair.
            width: `calc(100% / ${count} + 1px)`,
            // Black at the top so a fully-dropped stair still reads as a black
            // page, warming into the brand tint at the leading edge.
            background:
              "linear-gradient(to top, #241b3e 0%, #0d0a17 45%, #000000 100%)",
            // Raised before the drop so the layers are promoted during the
            // wait, but never at rest, where it would pin full-screen
            // compositor layers behind every page on the site for nothing.
            willChange: active ? "transform" : "auto",
          }}
        >
          {/*
            The page background is already pure black, so a black stair would be
            invisible over empty regions — only detectable where it happens to
            cover text. This glow is what makes the staircase legible. It sits on
            the bottom of each column, which is the leading edge both on the way
            down and on the way back up, and it terminates abruptly at that edge
            — which is what defines the step, without drawing a literal line.

            It stops 1px short of the column's right edge, because that last 1px
            is the overlap with the next column. Glow drawn into it lights up a
            hairline that the neighbour's staircase offset leaves uncovered — a
            bright seam down every boundary.
          */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-72"
            style={{
              width: "calc(100% - 1px)",
              background: `linear-gradient(to top, ${edgeColor(index, count, 0.5)}, ${edgeColor(index, count, 0.14)} 42%, transparent 100%)`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
