"use client";

import { motion } from "framer-motion";
import SoftGlow from "@/components/ui/SoftGlow";
import { LEAD } from "@/components/consultation/consultation-data";

/**
 * The opener — headline, discovery-call CTA, and an orbiting-rings visual on
 * the right.
 *
 * Laid out straight onto the page like every other hero on the site. It used to
 * sit inside a bordered card, which made this the only page that opened with a
 * box around its headline.
 */

const RINGS = [
  { r: 78, dur: 26, dir: 1, tone: "#cabfe1" },
  { r: 58, dur: 19, dir: -1, tone: "#b4d9ce" },
  { r: 38, dur: 13, dir: 1, tone: "#f5efd3" },
];

function OrbitVisual() {
  return (
    <svg viewBox="0 0 220 200" className="h-full w-full" aria-hidden>
      {/* the rings themselves */}
      {RINGS.map((ring) => (
        <circle
          key={ring.r}
          cx={110}
          cy={100}
          r={ring.r}
          fill="none"
          stroke={ring.tone}
          strokeOpacity={0.18}
          strokeWidth={1}
        />
      ))}

      {/* a marker riding each ring, counter-rotating against its neighbours */}
      {RINGS.map((ring, i) => (
        <motion.g
          key={`orbit-${ring.r}`}
          style={{ transformOrigin: "110px 100px" }}
          animate={{ rotate: 360 * ring.dir }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
        >
          <motion.circle
            cx={110 + ring.r}
            cy={100}
            r={4}
            fill={ring.tone}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
          <circle
            cx={110 - ring.r}
            cy={100}
            r={2}
            fill={ring.tone}
            opacity={0.55}
          />
        </motion.g>
      ))}

      {/* the core — steady while everything else moves around it */}
      <motion.circle
        cx={110}
        cy={100}
        r={17}
        fill="url(#core)"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "110px 100px" }}
      />
      <circle cx={110} cy={100} r={17} fill="none" stroke="#cabfe1" strokeOpacity={0.5} />

      <defs>
        <linearGradient id="core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cabfe1" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#b4d9ce" stopOpacity={0.35} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function ConsultationHero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-28 pb-14 sm:pt-36">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />
      {/* the wash breathes rather than sitting flat */}
      <motion.div
        aria-hidden
        className="bg-soft-gradient pointer-events-none absolute -right-24 -top-32 h-[420px] w-[620px] rounded-full blur-[130px]"
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="display text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl"
              >
                Strategic Guidance
                <br />
                for <span className="text-gradient">Growth.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted"
              >
                Strategy, leadership, market entry, and growth — advised by the
                people who own the outcome. The first call is free and there is
                no pitch attached.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#discovery"
                  className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
                >
                  Book a Free Discovery Call
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <span className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-5 py-3.5 text-sm">
                  <span className="text-faint">DRI</span>
                  <span className="font-medium text-fg">{LEAD.name}</span>
                </span>
              </motion.div>
            </div>

          {/* orbit visual — floats gently so the hero never sits still */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <motion.div
              className="h-[280px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <OrbitVisual />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
