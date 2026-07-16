"use client";

/**
 * Stair-step page transition.
 *
 * Every internal navigation runs: stairs drop in from the top until the screen
 * is black -> the route swaps behind the black -> stairs retract upward to
 * reveal the new page. The overlay lives in the root layout and never
 * unmounts, so the route swap is always hidden behind opaque columns. That
 * sidesteps the App Router's lack of exit animations entirely — we never try
 * to animate the outgoing page, we just cover it.
 *
 * Navigation is intercepted at the document level rather than through a
 * <TransitionLink> wrapper: the site links with plain <a> tags in ~30 places,
 * and a single listener covers all of them plus anything added later.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ROUTES } from "@/lib/nav";

/** More columns = finer staircase, but a longer total sweep. Six reads well. */
const COLUMNS = 6;
/** How long one column takes to travel a full screen height. */
const DURATION = 0.42;
/** Offset between adjacent columns — this is what makes it a staircase. */
const STAGGER = 0.05;
/** easeInOutQuart — no hard start/stop at either end of the travel. */
const EASE = [0.76, 0, 0.24, 1] as const;
/** If a route never lands, don't strand the user behind a black screen. */
const NAV_TIMEOUT_MS = 2500;

/** Brand gradient endpoints — lavender to mint, matching .bg-primary-gradient. */
const LAVENDER = [202, 191, 225] as const;
const MINT = [180, 217, 206] as const;

/**
 * Each column's leading edge takes one step along the brand gradient, so the
 * six edges together read as a single lavender-to-mint sweep across the screen.
 */
function edgeColor(index: number, alpha: number) {
  const t = index / (COLUMNS - 1);
  const [r, g, b] = LAVENDER.map((from, i) =>
    Math.round(from + (MINT[i] - from) * t),
  );
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type Phase = "idle" | "covering" | "covered" | "revealing";

const container: Variants = {
  idle: {},
  covering: { transition: { staggerChildren: STAGGER } },
  covered: {},
  revealing: { transition: { staggerChildren: STAGGER } },
};

/**
 * `idle` and `revealing` share a resting position, so the revealing -> idle
 * reset is a no-op rather than a visible snap back down.
 */
const column: Variants = {
  idle: { y: "-100%" },
  covering: { y: "0%", transition: { duration: DURATION, ease: EASE } },
  covered: { y: "0%" },
  revealing: { y: "-100%", transition: { duration: DURATION, ease: EASE } },
};

/** Same-origin, same-tab, plain-left-click link — or null if we shouldn't touch it. */
function internalTarget(event: MouseEvent): URL | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  // Cmd/Ctrl/Shift/Alt-click means "new tab/window" — leave it to the browser.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }
  const node = event.target;
  if (!(node instanceof Element)) return null;
  return internalHref(node.closest("a"));
}

function internalHref(anchor: HTMLAnchorElement | null): URL | null {
  if (!anchor) return null;
  if (anchor.hasAttribute("download")) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  // Escape hatch: <a data-no-transition> navigates normally.
  if (anchor.dataset.noTransition !== undefined) return null;
  if (!anchor.getAttribute("href")) return null;

  // Resolving against the current URL also filters out tel:/mailto:, whose
  // origin is "null" and never matches.
  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }
  return url.origin === window.location.origin ? url : null;
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");

  /** Full href handed to the router, e.g. "/blog?tag=x#top". */
  const targetHref = useRef<string | null>(null);
  /** Pathname only — what `usePathname()` will report once the route lands. */
  const targetPath = useRef<string | null>(null);
  const targetHasHash = useRef(false);
  /** Read inside the listeners so they can stay registered once. */
  const phaseRef = useRef<Phase>("idle");
  const prefetched = useRef(new Set<string>());

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  /**
   * Warm a route's payload into the client cache. The stairs can only lift once
   * the next page is actually mounted behind them, so anything not fetched by
   * then is dead time the user spends staring at a black screen. Prefetching is
   * what removes that wait — it is the whole performance story here.
   */
  const prefetch = useCallback(
    (path: string) => {
      if (path === window.location.pathname) return;
      if (prefetched.current.has(path)) return;
      prefetched.current.add(path);
      router.prefetch(path);
    },
    [router],
  );

  /* Every page is static and small, so pull them all in once the page is idle
     rather than waiting for a hover that may never come (touch, keyboard). */
  useEffect(() => {
    if (reduceMotion) return;
    const warm = () => Object.values(ROUTES).forEach(prefetch);

    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const handle = idle(warm, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(handle);
    }
    const handle = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(handle);
  }, [prefetch, reduceMotion]);

  /* Intercept internal link clicks and route them through the animation. */
  useEffect(() => {
    function onPointerOver(event: PointerEvent) {
      const node = event.target;
      if (!(node instanceof Element)) return;
      const url = internalHref(node.closest("a"));
      if (url) prefetch(url.pathname);
    }

    function onClick(event: MouseEvent) {
      const url = internalTarget(event);
      if (!url) return;

      if (url.pathname === window.location.pathname) {
        // In-page anchor — let the CSS smooth-scroll do its thing.
        if (url.hash) return;
        // A bare "#" or a self-link: swallow it rather than jumping to top.
        event.preventDefault();
        return;
      }

      event.preventDefault();
      // Ignore clicks fired while a transition is already in flight.
      if (phaseRef.current !== "idle") return;

      const href = url.pathname + url.search + url.hash;

      if (reduceMotion) {
        router.push(href);
        return;
      }

      // Covers the case where hover never fired (touch, keyboard, fast click).
      prefetch(url.pathname);

      targetHref.current = href;
      targetPath.current = url.pathname;
      targetHasHash.current = Boolean(url.hash);
      setPhase("covering");
    }

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onPointerOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onPointerOver);
    };
  }, [router, reduceMotion, prefetch]);

  /* Screen is black: lift the stairs the moment the new route is on screen. */
  useEffect(() => {
    if (phase !== "covered") return;

    const landed = targetPath.current === null || pathname === targetPath.current;

    if (!landed) {
      const bail = setTimeout(() => setPhase("revealing"), NAV_TIMEOUT_MS);
      return () => clearTimeout(bail);
    }

    // globals.css sets `scroll-behavior: smooth` on <html>, which would make
    // the router's scroll-to-top animate — and it could still be gliding when
    // the reveal finishes. Force the jump while we're still covered.
    if (!targetHasHash.current) {
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previous;
    }

    // No dwell — reveal on the next painted frame. Two rAFs is the shortest
    // wait that still guarantees the new route has actually rendered, so the
    // stairs never lift off a stale page.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setPhase("revealing"));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [phase, pathname]);

  function onColumnComplete(definition: unknown) {
    if (definition === "covering") {
      setPhase("covered");
      if (targetHref.current) router.push(targetHref.current);
    } else if (definition === "revealing") {
      setPhase("idle");
      targetHref.current = null;
      targetPath.current = null;
    }
  }

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      variants={container}
      initial="idle"
      animate={phase}
      className="fixed inset-0 z-9999 overflow-hidden"
      // Opaque columns should also swallow clicks aimed at the covered page.
      style={{ pointerEvents: phase === "idle" ? "none" : "auto" }}
    >
      {Array.from({ length: COLUMNS }).map((_, index) => (
        <motion.div
          key={index}
          variants={column}
          // Columns stagger in DOM order, so the last one always settles last —
          // in both directions. Driving the phase machine off it is exact.
          onAnimationComplete={
            index === COLUMNS - 1 ? onColumnComplete : undefined
          }
          className="absolute top-0 bottom-0"
          style={{
            left: `calc(${index} * 100% / ${COLUMNS})`,
            // Percentage widths land on fractional pixels and would leave
            // hairline gaps mid-sweep. Each column overlaps the next by 1px so
            // the seam is covered by its own colour — a black outline here
            // would read as a border line between every stair.
            width: `calc(100% / ${COLUMNS} + 1px)`,
            // Black at the top so a fully-dropped stair still reads as a black
            // page, warming into the brand tint at the leading edge.
            background:
              "linear-gradient(to top, #241b3e 0%, #0d0a17 45%, #000000 100%)",
            willChange: "transform",
          }}
        >
          {/*
            The page background is already pure black, so a black stair would be
            invisible over empty regions — only detectable where it happens to
            cover text. This glow is what makes the staircase legible. It sits on
            the bottom of each column, which is the leading edge both on the way
            down and on the way back up, and it terminates abruptly at that edge
            — which is what defines the step, without drawing a literal line.
          */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
            style={{
              background: `linear-gradient(to top, ${edgeColor(index, 0.5)}, ${edgeColor(index, 0.14)} 42%, transparent 100%)`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
