"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/* ------------------------------------------------------------------ */
/* Capsule-dot patterns — one per division, built from the brand tones */
/* Positions are generated deterministically (no random) so SSR and    */
/* the client render identical markup.                                 */
/* ------------------------------------------------------------------ */

const TONES = ["#cabfe1", "#b4d9ce", "#f5efd3", "#afa3bf"];
const BASE = "#f4f2f8";

type Cap = { x: number; y: number; r: number; c: string; accent: boolean };

function tone(i: number, every: number) {
  const accent = i % every === 0;
  return { accent, c: accent ? TONES[i % TONES.length] : BASE };
}

/* Dhundo — three diamonds: scanning, searching for the shape of a thing */
function diamondCaps(): Cap[] {
  const caps: Cap[] = [];
  const heights = [1, 3, 5, 3, 1];
  let i = 0;
  for (let cluster = 0; cluster < 3; cluster++) {
    for (let col = 0; col < heights.length; col++) {
      const count = heights[col];
      for (let k = 0; k < count; k++) {
        caps.push({
          x: 34 + cluster * 76 + col * 15,
          y: 90 - ((count - 1) * 20) / 2 + k * 20,
          r: 0,
          ...tone(i, 4),
        });
        i++;
      }
    }
  }
  return caps;
}

/* Banao — a dense, assembled cluster: the thing actually built */
function ovalCaps(): Cap[] {
  const caps: Cap[] = [];
  const cols = 11;
  const rows = 7;
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  let i = 0;
  for (let r0 = 0; r0 < rows; r0++) {
    for (let c0 = 0; c0 < cols; c0++) {
      const nx = (c0 - cx) / cx;
      const ny = (r0 - cy) / cy;
      if (nx * nx + ny * ny > 1.02) continue;
      caps.push({ x: 44 + c0 * 17, y: 30 + r0 * 20, r: 0, ...tone(i, 5) });
      i++;
    }
  }
  return caps;
}

/* Becho — a burst: the work radiating outward to its market */
function burstCaps(): Cap[] {
  const caps: Cap[] = [];
  const n = 34;
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2;
    const radius = 34 + (i % 3) * 17;
    caps.push({
      x: 130 + Math.cos(ang) * radius,
      y: 90 + Math.sin(ang) * radius,
      r: (ang * 180) / Math.PI + 90,
      ...tone(i, 3),
    });
  }
  return caps;
}

type Anim = "wave" | "ripple" | "spin";

/**
 * Each capsule sits in a <g> that owns its translate/rotate via the SVG
 * transform *attribute*, so the motion.rect inside is free to use CSS
 * transforms (y / scale) without the two fighting each other.
 */
function Pattern({ caps, anim }: { caps: Cap[]; anim: Anim }) {
  const cx = 130;
  const cy = 90;

  return (
    <svg viewBox="0 0 260 180" className="h-full w-full">
      <motion.g
        style={{ transformOrigin: "130px 90px" }}
        animate={anim === "spin" ? { rotate: 360 } : undefined}
        transition={
          anim === "spin"
            ? { duration: 46, repeat: Infinity, ease: "linear" }
            : undefined
        }
      >
        {caps.map((cap, i) => {
          // wave rolls left→right; ripple radiates out from the centre
          const dist = Math.hypot(cap.x - cx, cap.y - cy);
          const delay =
            anim === "wave"
              ? cap.x / 70
              : anim === "ripple"
                ? dist / 80
                : (i % 7) * 0.28;

          const glow = cap.accent
            ? [0.45, 1, 0.45]
            : [0.6, 0.95, 0.6];

          const animate =
            anim === "wave"
              ? { y: [0, -8, 0], opacity: glow }
              : anim === "ripple"
                ? { scale: [1, 1.35, 1], opacity: glow }
                : cap.accent
                  ? { opacity: [0.45, 1, 0.45] }
                  : undefined;

          return (
            <g
              key={i}
              transform={`translate(${cap.x} ${cap.y}) rotate(${cap.r})`}
            >
              <motion.rect
                x={-2.5}
                y={-7.5}
                width={5}
                height={15}
                rx={2.5}
                fill={cap.c}
                opacity={anim === "spin" && !cap.accent ? 0.82 : undefined}
                style={{ transformOrigin: "center" }}
                animate={animate}
                transition={
                  animate
                    ? {
                        duration: anim === "ripple" ? 2.8 : 2.4,
                        repeat: Infinity,
                        delay,
                        ease: "easeInOut",
                      }
                    : undefined
                }
              />
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}

const STEPS: {
  n: string;
  title: string;
  body: string;
  caps: Cap[];
  anim: Anim;
}[] = [
  {
    n: "001",
    title: "Dhundo",
    body: "Discovery & strategy call.",
    caps: diamondCaps(),
    anim: "wave",
  },
  {
    n: "002",
    title: "Banao",
    body: "Design, prototype & production support.",
    caps: ovalCaps(),
    anim: "ripple",
  },
  {
    n: "003",
    title: "Becho",
    body: "Go-to-market, sales & scale.",
    caps: burstCaps(),
    anim: "spin",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            How it works
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-5 text-4xl font-bold sm:text-6xl">
            Dhundo. Banao.
            <br />
            Becho.
          </h2>
        </Reveal>

        <div className="mt-14 grid rounded-3xl border border-border md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.1}
              className={`h-full ${
                i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""
              }`}
            >
              <div className="group flex h-full flex-col p-8">
                <span className="inline-flex h-7 w-12 items-center justify-center rounded-full border border-border font-mono text-[10px] text-muted">
                  {s.n}
                </span>

                <div className="my-8 h-[180px] transition-transform duration-500 ease-out group-hover:scale-105">
                  <Pattern caps={s.caps} anim={s.anim} />
                </div>

                <h3 className="text-2xl font-semibold text-fg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
