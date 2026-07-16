"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";

/* Everything a project touches — each one feeds the same core */
const SOURCES = [
  "Partner network",
  "Live events",
  "Trainings",
  "Market research",
  "Your brand",
  "Past projects",
];

const TONES = ["#cabfe1", "#b4d9ce", "#f5efd3"];

/* Geometry shared by the chips and the lines that feed them into the core */
const RADIUS = 145;
const CORE_GAP = 52; // clear the core disc
const CHIP_GAP = 24; // stop short of the chip

function nodeAt(i: number) {
  const angle = (i / SOURCES.length) * Math.PI * 2;
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS * 0.62;
  return {
    x,
    y,
    deg: (Math.atan2(y, x) * 180) / Math.PI,
    len: Math.hypot(x, y),
  };
}

function ContextOrbit() {
  return (
    <div className="relative mx-auto flex h-[320px] w-full max-w-[560px] items-center justify-center">
      {/* rings */}
      {[1, 2].map((r) => (
        <motion.span
          key={r}
          className="absolute rounded-full border border-border"
          style={{ width: r * 150 + 60, height: r * 150 + 60 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 40 + r * 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* feed lines — each source runs a pulse inward, into the core */}
      {SOURCES.map((s, i) => {
        const { deg, len } = nodeAt(i);
        const width = len - CORE_GAP - CHIP_GAP;
        const tone = TONES[i % TONES.length];

        return (
          // rotated rail; the wrapper owns the transform so motion can animate
          // scale on the child without clobbering it
          <span
            key={`line-${s}`}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-px origin-left"
            style={{
              width,
              transform: `rotate(${deg}deg) translateX(${CORE_GAP}px)`,
            }}
          >
            <motion.span
              className="absolute inset-0 origin-left"
              style={{
                background: `linear-gradient(to right, ${tone}00, ${tone}4d)`,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            />
            <motion.span
              className="absolute top-1/2 h-1.5 w-1.5 rounded-full"
              style={{ background: tone, translate: "-50% -50%" }}
              animate={{ left: [width, 0], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeIn",
                delay: i * 0.45,
              }}
            />
          </span>
        );
      })}

      {/* core */}
      <motion.span
        className="bg-primary-gradient relative z-10 flex h-24 w-24 items-center justify-center rounded-full text-center text-[11px] font-bold leading-tight"
        style={{ color: "#33304a" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Your
        <br />
        context
      </motion.span>

      {/* source chips positioned around the core */}
      {SOURCES.map((s, i) => {
        const { x, y } = nodeAt(i);
        return (
          <motion.span
            key={s}
            className="absolute z-10 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-muted"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              translate: "-50% -50%",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
          >
            <span
              className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
              style={{ background: TONES[i % TONES.length] }}
            />
            {s}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function ContextWindow() {
  return (
    <section className="relative overflow-hidden bg-bg py-24">
      <SoftGlow />
      <div className="relative mx-auto max-w-[1000px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
              Context window
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-4xl font-bold text-fg sm:text-5xl">
              It already knows
              <br />
              your business.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-muted">
              Every project we discover, build, and take to market feeds the same
              context — your market, your brand, your past work, our network. So
              the answer you get is never generic.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10">
            <ContextOrbit />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
