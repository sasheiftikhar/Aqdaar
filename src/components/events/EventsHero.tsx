"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SoftGlow from "@/components/ui/SoftGlow";
import { HERO_POSTS } from "@/components/events/eventData";

/**
 * Events opener — headline on the left, a live card stack on the right.
 *
 * The stack cycles the five event creatives: the front card peels away every few
 * seconds and the one behind it steps forward, so the hero shows the real posts
 * rather than an abstract motif. Depth is derived from each card's distance
 * behind the front one, which keeps the z-order and the transforms in sync no
 * matter where the cycle is.
 *
 * With reduced motion the cycling stops and the stack renders static.
 */

const INTERVAL = 3400;
const N = HERO_POSTS.length;

/**
 * Front card first, then progressively further back.
 *
 * The cards stay fully opaque — a translucent card would show the one behind it
 * through its own artwork and the stack would read as mud. Depth is sold by
 * offset, scale, and the scrim in SCRIM below.
 */
const DEPTH = [
  { x: 0, y: 0, rotate: -2.5, scale: 1, opacity: 1 },
  { x: 34, y: -22, rotate: 3.5, scale: 0.95, opacity: 1 },
  { x: 64, y: -42, rotate: 8.5, scale: 0.9, opacity: 1 },
];

/**
 * The card that just lost the front — it throws off to the left and fades,
 * rather than shrinking backwards into the stack it is supposed to be leaving.
 * That backwards retreat is what made the cycle read as a wobble instead of a
 * deal of cards.
 */
const OUT = { x: -120, y: 28, rotate: -15, scale: 0.96, opacity: 0 };

/** Parked at the back of the stack, invisible, waiting its turn to step up. */
const HIDDEN = { x: 64, y: -42, rotate: 8.5, scale: 0.9, opacity: 0 };

/**
 * `depth` counts backwards from the front, so the card at `n - 1` is the one
 * that was in front an instant ago — that's the throw. Anything between the
 * visible stack and that is parked out of sight.
 */
function poseFor(depth: number, n: number) {
  if (depth < DEPTH.length) return DEPTH[depth];
  if (depth === n - 1) return OUT;
  return HIDDEN;
}

/** How hard each depth is darkened, so the back of the stack recedes. */
const SCRIM = [0, 0.55, 0.78];

export default function EventsHero() {
  const reduced = useReducedMotion();
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setFront((f) => (f + 1) % N), INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative overflow-hidden bg-bg pt-36 pb-20">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <SoftGlow position="top" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-10">
        {/* left — the words */}
        <div className="min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl lg:text-6xl"
          >
            What&apos;s Happening
            <br />
            at <span className="text-gradient">Aqdaar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted"
          >
            Summits, bootcamps, and founder briefings across Karachi and beyond.
            Open to anyone building something.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            <a
              href="#feed"
              className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Explore Events
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* right — the stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
        >
          {/* the glow the cards sit on */}
          <div className="bg-primary-gradient pointer-events-none absolute inset-8 rounded-full opacity-[0.14] blur-3xl" />

          <div className="relative aspect-[4/5] w-full">
            {HERO_POSTS.map((post, i) => {
              const depth = (i - front + N) % N;
              const pose = poseFor(depth, N);

              return (
                <motion.div
                  key={post.post}
                  animate={pose}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ zIndex: N - depth }}
                  className="absolute inset-0 overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-black/60"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 340px, 460px"
                      priority={i === 0}
                      className="object-cover"
                    />

                    {/* depth scrim — darkens everything but the front card */}
                    <motion.div
                      animate={{ opacity: SCRIM[depth] ?? 0.78 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-black"
                    />

                    {/* only the front card is labelled — captions on the cards
                        behind it would collide with this one's */}
                    <motion.div
                      animate={{ opacity: depth === 0 ? 1 : 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-x-0 bottom-0"
                    >
                      <div className="h-28 bg-gradient-to-t from-black/95 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                          {post.status} · {post.category}
                        </span>
                        <p className="mt-1.5 line-clamp-2 text-[14px] font-bold leading-snug text-white">
                          {post.title}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* which card is up */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {HERO_POSTS.map((post, i) => (
              <button
                key={post.post}
                type="button"
                onClick={() => setFront(i)}
                aria-label={`Show ${post.title}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === front
                    ? "bg-primary-gradient w-7"
                    : "w-1.5 bg-border hover:bg-faint"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
