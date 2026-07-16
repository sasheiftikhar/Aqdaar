"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The flowing ribbon behind the services hero.
 *
 * Every line is the same sine, drawn with its own phase and vertical offset,
 * multiplied by an envelope that starts near zero on the left and opens to full
 * width on the right — so the lines leave the headline as a tight bundle and fan
 * out across the empty half of the hero. That envelope is what makes it read as
 * one ribbon rather than twenty unrelated squiggles.
 *
 * Nothing here is per-frame: the paths are built once and each line just drifts
 * on its own loop, staggered by index, which is enough to sell the flow without
 * re-rendering an SVG sixty times a second.
 */

const W = 900;
const H = 600;
const LINES = 22;
const STEP = 18;

/** 0 near the left edge, 1 by the right — how far the ribbon has opened. */
function envelope(x: number) {
  const t = Math.min(Math.max(x / W, 0), 1);
  return 0.06 + 0.94 * t * t;
}

function buildLine(i: number) {
  const centred = i - (LINES - 1) / 2;
  const phase = i * 0.22;
  const amp = 52 + i * 1.6;
  const spread = 13;

  const points: string[] = [];
  for (let x = -40; x <= W + 40; x += STEP) {
    const env = envelope(x);
    const y =
      H / 2 +
      centred * spread * env +
      amp * env * Math.sin((x / W) * Math.PI * 2.1 + phase);
    points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M ${points.join(" L ")}`;
}

export default function WaveField({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const lines = useMemo(
    () => Array.from({ length: LINES }, (_, i) => buildLine(i)),
    [],
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id="wave-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cabfe1" stopOpacity="0" />
          <stop offset="28%" stopColor="#cabfe1" stopOpacity="0.85" />
          <stop offset="72%" stopColor="#b4d9ce" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b4d9ce" stopOpacity="0" />
        </linearGradient>
        {/* the bloom the lines sit in */}
        <radialGradient id="wave-glow" cx="0.6" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#cabfe1" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#cabfe1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill="url(#wave-glow)" />

      {lines.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="url(#wave-stroke)"
          strokeWidth={0.9}
          strokeLinecap="round"
          animate={
            reduced
              ? undefined
              : { y: [0, -9, 0, 9, 0], opacity: [0.5, 0.9, 0.5] }
          }
          transition={{
            duration: 9,
            delay: i * 0.16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ opacity: 0.6 }}
        />
      ))}
    </svg>
  );
}
