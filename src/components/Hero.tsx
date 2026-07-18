"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIntroReady } from "@/components/intro/ready";
import { ROUTES } from "@/lib/nav";

/**
 * Entrance variants for everything in the hero.
 *
 * These are one-shot mount animations, so on a first open they would play out
 * and finish behind the intro loading screen, leaving a lifeless hero at the
 * exact moment the stairs reveal it. Driving them from variants lets the one
 * `animate` on the wrapper hold the whole hero at its first frame until the
 * intro hands over — framer propagates the label down to every child below
 * that declares `variants`, however deeply nested.
 */
const rise = (y: number) => ({
  wait: { opacity: 0, y },
  enter: { opacity: 1, y: 0 },
});

const fade = { wait: { opacity: 0 }, enter: { opacity: 1 } };

/* ------------------------------------------------------------------ */
/* One SVG holds the globe and the green pulses flowing along its lines */
/* ------------------------------------------------------------------ */

// Square coordinate space (900×900) — the globe is a centred square element,
// so it reliably scales to ~70% of the viewport width.
const CX = 450;
const CY = 450;
const R = 396; // circle nearly fills the 900 box, so the earth reads large
const ELL = [0.34, 0.66]; // ellipse ratios for lon/lat

const LIGHT = "rgba(255,255,255,0.12)";
const GREEN = "#B4D9CE";

/* A dashed segment that keeps travelling along a path/shape.
   Longer `len` + longer `duration` = a long, slow, clearly visible streak. */
const flow = (len: number, delay = 0, duration = 11) => ({
  strokeDasharray: `${len} 5000`,
  initial: { strokeDashoffset: 5000 + len },
  animate: { strokeDashoffset: 0 },
  transition: { duration, repeat: Infinity, ease: "linear" as const, delay },
});

function HeroGraphic() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 900 900"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {/* --- static globe wireframe --- */}
      <g stroke={LIGHT} strokeWidth="1">
        <circle cx={CX} cy={CY} r={R} />
        {ELL.map((k) => (
          <ellipse key={`lon${k}`} cx={CX} cy={CY} rx={R * k} ry={R} />
        ))}
        {ELL.map((k) => (
          <ellipse key={`lat${k}`} cx={CX} cy={CY} rx={R} ry={R * k} />
        ))}
        <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} />
        <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} />
      </g>

      {/* --- green pulses travelling along the globe's own lines --- */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={R}
        stroke={GREEN}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...flow(220, 0, 12)}
      />
      <motion.ellipse
        cx={CX}
        cy={CY}
        rx={R * ELL[1]}
        ry={R}
        stroke={GREEN}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...flow(180, 2, 13)}
      />
      <motion.ellipse
        cx={CX}
        cy={CY}
        rx={R}
        ry={R * ELL[1]}
        stroke={GREEN}
        strokeWidth="2.5"
        strokeLinecap="round"
        {...flow(180, 3.5, 13)}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Terminal                                                           */
/* ------------------------------------------------------------------ */

const TERMINAL: { text: string; tone: "comment" | "cmd" | "ok" | "plain" }[] = [
  { text: "# Aqdaar — idea to market, one roof", tone: "comment" },
  { text: "$ aqdaar start my-startup", tone: "cmd" },
  { text: "", tone: "plain" },
  { text: "# Dhundo — discover & plan", tone: "comment" },
  { text: "> mapping the opportunity ... ✅", tone: "ok" },
  { text: "", tone: "plain" },
  { text: "# Banao — build & produce", tone: "comment" },
  { text: "> shipping the product ... 🚀", tone: "ok" },
  { text: "", tone: "plain" },
  { text: "# Becho — sell & scale", tone: "comment" },
  { text: "> going to market ... 📈", tone: "ok" },
  { text: "", tone: "plain" },
  { text: "Live. Growing. Remembered.", tone: "ok" },
];

const TONE: Record<string, string> = {
  comment: "text-[#6b7280]",
  cmd: "text-[#e5e7eb]",
  ok: "text-[#B4D9CE]",
  plain: "text-transparent",
};

function Terminal() {
  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-[#1f2a22] bg-[#0c0c0d]/95 shadow-[0_25px_80px_-30px_rgba(180,217,206,0.5)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="p-5 font-mono text-[12.5px] leading-relaxed">
        {TERMINAL.map((line, i) => (
          <motion.div
            key={i}
            variants={fade}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.25 }}
            className={`whitespace-pre ${TONE[line.tone]}`}
          >
            {line.text || " "}
          </motion.div>
        ))}
        <motion.span
          className="inline-block h-3.5 w-2 bg-[#B4D9CE]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const LOGOS = [
  "GMS Consultant",
  "Skillvention",
  "Lp92.org",
  "Startup Grind Lahore",
  "NIC Karachi",
  "Katalyst Lab",
  "Habib University",
  "NED",
  "KU",
];

const THIRD_LINE = "Becho.";

export default function Hero() {
  const [typed, setTyped] = useState(0);
  const ready = useIntroReady();

  // Loop the third heading line forever: type → hold → erase → hold → repeat.
  // Held until the intro hands over, or the word would type itself out behind
  // the loading screen and be sitting there finished on reveal.
  useEffect(() => {
    if (!ready) return;

    let timer: ReturnType<typeof setTimeout>;
    let phase: "typing" | "deleting" = "typing";
    let n = 0;

    const tick = () => {
      if (phase === "typing") {
        n++;
        setTyped(n);
        if (n >= THIRD_LINE.length) {
          phase = "deleting";
          timer = setTimeout(tick, 1600); // hold on the full word
          return;
        }
        timer = setTimeout(tick, 95);
      } else {
        n--;
        setTyped(n);
        if (n <= 0) {
          phase = "typing";
          timer = setTimeout(tick, 500); // hold on empty before retyping
          return;
        }
        timer = setTimeout(tick, 55);
      }
    };

    timer = setTimeout(tick, 1400); // initial delay on load
    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <section id="top" className="relative overflow-hidden bg-bg pb-16">
      {/* hero top: earth + content, clipped so the earth ends at the pill */}
      <div className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
        {/* 76vw reads as a backdrop on a wide screen but shrinks to a small
            disc on a phone, so the earth scales up as the viewport narrows —
            wider than the screen and clipped by the parent, which keeps it
            reading as a horizon behind the copy rather than a logo above it. */}
        <div className="pointer-events-none absolute left-1/2 top-[140px] aspect-square w-[155vw] max-w-[1150px] -translate-x-1/2 sm:top-[130px] sm:w-[105vw] lg:top-[120px] lg:w-[76vw]">
          <HeroGraphic />
        </div>

        <motion.div
          className="relative mx-auto max-w-[820px] px-6 pt-28 pb-20 text-center"
          initial="wait"
          animate={ready ? "enter" : "wait"}
        >
          <h1 className="display text-[13vw] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-fg sm:text-6xl lg:text-[4rem]">
            <motion.span
              className="block"
              variants={rise(20)}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Dhundo.
            </motion.span>
            <motion.span
              className="block"
              variants={rise(20)}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Banao.
            </motion.span>
            <span className="block text-accent">
              {THIRD_LINE.slice(0, typed)}
              <motion.span
                className="ml-1 inline-block h-[0.72em] w-[0.06em] translate-y-[0.08em] bg-accent align-baseline"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </h1>

          <motion.p
            variants={rise(12)}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-6 max-w-xl text-lg font-medium text-fg/90"
          >
            Creating what History Can&apos;t ignore.
          </motion.p>

          <motion.p
            variants={rise(12)}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted"
          >
            We partner with founders, leaders, and organizations who want to
            define categories, not follow them — from discovery, to build, to
            market. You don&apos;t need another design agency. You need a
            kingmaker.
          </motion.p>

          <motion.div
            variants={rise(12)}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={ROUTES.consultation}
              className="bg-primary-gradient on-accent group flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Free Consultation
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={ROUTES.services}
              className="font-medium text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Explore Our Services
            </a>
          </motion.div>

          <motion.p
            variants={fade}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-7 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide text-muted"
          >
            <span style={{ color: "var(--color-butter)" }}>★</span>
            Trusted by 50+ Startups &amp; Institutions
          </motion.p>

          <motion.p
            variants={rise(8)}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-3 text-2xl text-accent"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Let&apos;s Build What the Future Will Remember
          </motion.p>

          <motion.div
            variants={rise(24)}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-12"
          >
            <Terminal />
          </motion.div>
        </motion.div>
      </div>

      {/* trusted-by — pill sits right at the earth's bottom edge */}
      <div className="relative mx-auto mt-6 max-w-[1200px] px-6">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-black px-8 py-6 sm:flex-row sm:gap-10">
          <p className="shrink-0 text-center text-[13px] font-bold uppercase leading-tight tracking-wide text-fg sm:max-w-[220px] sm:text-left">
            Trusted by the most ambitious teams
          </p>
          <div className="relative w-full flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
            <motion.div
              className="flex w-max gap-14 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map(
                (l, i) => (
                  <span
                    key={i}
                    className="text-lg font-bold tracking-tight text-white/30"
                  >
                    {l}
                  </span>
                )
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
