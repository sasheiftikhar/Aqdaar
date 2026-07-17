"use client";

/**
 * First-open loading screen for the landing page.
 *
 * The progress is real — it tracks fonts and subresources actually arriving —
 * but the landing page is static and small enough to be ready in a few hundred
 * milliseconds, which would reduce this to a flash. So the sequence is also
 * paced across MIN_MS, and whichever finishes last wins: a slow connection
 * extends it, a fast one still gets to read all six stages.
 *
 * Exiting is not this component's job. It calls `onDone` and the page
 * transition sweeps its stairs across, unmounting this from behind them.
 */

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** The Aqdaar arc — Dhundo, Banao, Becho — as six beats. */
const STAGES = [
  "Mapping the opportunity",
  "Validating the thesis",
  "Shaping the product",
  "Building to ship",
  "Going to market",
  "Built to be remembered",
];

/** Floor on the whole sequence, so every stage has time to land. */
const MIN_MS = 4500;
/** Progress parks here until the page reports itself genuinely loaded. */
const CEILING_UNTIL_LOADED = 0.92;

/** Radius in the ring's own 100×100 box. */
const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Above the navbar's z-50, and just under the transition's stairs at 9999 so
 * they can sweep across this on the way out. Set inline rather than through a
 * utility class: this is the one thing that must hold even if the stylesheet
 * is stale, because without it the navbar sits on top of the whole screen.
 */
const Z_INDEX = 9998;

type StageState = "done" | "active" | "todo";

const DOT_COLOR: Record<StageState, string> = {
  done: "#f4f2f8",
  active: "#cabfe1",
  todo: "rgba(255,255,255,0.25)",
};

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  const loaded = useRef(false);
  /* Held in a ref so a caller that re-creates `onDone` can't restart the run. */
  const done = useRef(onDone);
  done.current = onDone;

  /* The real signal: everything the document asked for has arrived. */
  useEffect(() => {
    const documentLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    void Promise.all([documentLoaded, document.fonts.ready]).then(() => {
      loaded.current = true;
    });
  }, []);

  /* Pace the bar, and hand over once the clock and the page both agree. */
  useEffect(() => {
    let frame = 0;
    const started = performance.now();

    const tick = () => {
      const paced = (performance.now() - started) / MIN_MS;
      const next = Math.min(paced, loaded.current ? 1 : CEILING_UNTIL_LOADED);
      setProgress(next);

      if (next >= 1) {
        done.current();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Nothing behind this is meant to be reachable while it's up. */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const active = Math.min(
    STAGES.length - 1,
    Math.floor(progress * STAGES.length),
  );

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-12 overflow-hidden bg-bg px-6 xl:gap-14"
      style={{ zIndex: Z_INDEX }}
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />

      <h2 className="display relative text-center text-3xl font-bold sm:text-5xl">
        <span className="text-gradient">We&apos;re building it.</span>
      </h2>

      {/* Progress rail — dots sit on the line, labels hang beneath. */}
      <div className="relative w-full max-w-4xl">
        <div className="relative h-0.5 w-full rounded-full bg-white/15">
          <motion.div
            className="bg-primary-gradient absolute inset-y-0 left-0 rounded-full"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.15, ease: "linear" }}
          />

          {STAGES.map((label, index) => {
            const state: StageState =
              index < active ? "done" : index === active ? "active" : "todo";

            return (
              // The translate lives on this wrapper, not the dot: framer writes
              // the dot's transform itself to animate scale, and would drop a
              // translate set through a utility class.
              <div
                key={label}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(index / (STAGES.length - 1)) * 100}%` }}
              >
                <motion.span
                  className="block h-2 w-2 rounded-full"
                  animate={{
                    scale: state === "active" ? 1.8 : 1,
                    backgroundColor: DOT_COLOR[state],
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            );
          })}
        </div>

        {/*
          Labels ride in a row of their own rather than hanging off the dots.
          The space above them is the same size as the flex gap that follows the
          rail, and the text centres inside the row — so it lands exactly halfway
          between the line and the ring. Keep `mt-*` in step with the column's
          `gap-*` or that stops being true.

          Six of these need roughly 150px each and the end two overhang the rail
          by half their width, so they only fit once the viewport is past ~1050px
          — hence `xl` and not `sm`. Narrower than that and they'd collide with
          each other and clip off the sides; the single active label covers it.
        */}
        <div className="relative mt-12 hidden h-3 xl:mt-14 xl:block">
          {STAGES.map((label, index) => (
            <span
              key={label}
              className={`absolute inset-y-0 flex -translate-x-1/2 items-center whitespace-nowrap text-[9px] font-bold uppercase leading-none tracking-[0.14em] transition-colors duration-300 ${
                index === active ? "text-fg" : "text-faint"
              }`}
              style={{ left: `${(index / (STAGES.length - 1)) * 100}%` }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Anything narrower gets the current stage only, centred. */}
        <p className="mt-12 text-center text-[10px] font-bold uppercase leading-none tracking-[0.16em] text-fg xl:hidden">
          {STAGES[active]}
        </p>
      </div>

      {/* Dotted ring, turning, with the honest number in the middle. */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="50"
            cy="50"
            r={RING_R}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="0.5 7"
          />
        </motion.svg>
        {/* Progress arc — starts at twelve o'clock rather than three. */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r={RING_R}
            stroke="#cabfe1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={`${progress * RING_C} ${RING_C}`}
          />
        </svg>
        <span className="font-mono text-sm font-bold tabular-nums text-fg">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}
