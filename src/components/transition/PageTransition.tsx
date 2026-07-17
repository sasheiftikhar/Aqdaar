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
 *
 * The route can only be swapped once the stairs are all the way down, so
 * whatever the swap still has to fetch at that point is dead time the user
 * spends parked on a black screen. Two things keep that at zero, and between
 * them they are the whole performance story here:
 *
 *  1. Every route is warmed in the background shortly after first paint, so by
 *     the time anything is clicked the payload is usually already in hand.
 *  2. A click waits for its route to be warm before the stairs start moving
 *     (the `loading` phase). Any wait that's left therefore happens on the page
 *     the user is still looking at, rather than behind black — the animation
 *     itself only ever runs as one continuous drop-and-lift.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import IntroLoader from "@/components/intro/IntroLoader";
import { IntroReadyContext } from "@/components/intro/ready";
import {
  StairColumns,
  stairContainer,
  useStairCount,
} from "@/components/transition/stairs";
import { ROUTES } from "@/lib/nav";

const DEV = process.env.NODE_ENV === "development";

/**
 * Last resort if a route never lands. Generous in development, where routes
 * compile on first request and a cold page legitimately takes seconds; in
 * production every route is prefetched, so this should never trip.
 */
const NAV_BAIL_MS = DEV ? 15000 : 4000;
/**
 * How long a click will wait for its route before the stairs start anyway. This
 * is a backstop, not a tuning knob — it only exists so a hung request can't
 * swallow the click for good, and a warm route clears it in a single tick.
 */
const READY_CAP_MS = DEV ? 8000 : 2500;

/**
 * `intro` is the loading screen holding the landing page on first open, and
 * `loading` is a click waiting for its route. Neither has moved the stairs yet;
 * both hand off to `covering`, and from there the sequence is identical — the
 * intro simply has no route to push when it gets there.
 */
type Phase =
  | "intro"
  | "idle"
  | "loading"
  | "covering"
  | "covered"
  | "revealing";

/** Phases where the stairs are parked off screen and cover nothing. */
const RESTING = new Set<Phase>(["intro", "idle", "loading"]);

/**
 * The stairs only know `resting`/`covering`/`covered`/`revealing`, so the three
 * phases that differ only in what *this* component is waiting for all collapse
 * onto the same parked position.
 */
const stairPhase = (phase: Phase) => (RESTING.has(phase) ? "resting" : phase);

/** Same-origin, same-tab, plain-left-click link — or null if we shouldn't touch it. */
function internalTarget(event: MouseEvent): URL | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  // Cmd/Ctrl/Shift/Alt-click means "new tab/window" — leave it to the browser.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }

  const node = event.target;
  if (!(node instanceof Element)) return null;
  const anchor = node.closest("a");
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

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const stairCount = useStairCount();

  /*
   * The intro is decided exactly once, here, and never revisited: this
   * component lives in the root layout and so mounts once per document. That
   * gives the two rules for free — it runs on any fresh load of the landing
   * page, and never when you merely arrive at "/" through a link, because by
   * then this state is long since settled.
   *
   * `usePathname` is accurate during SSR, so the loader is already in the
   * server-rendered markup and there's no flash of the page underneath it.
   */
  const [phase, setPhase] = useState<Phase>(() =>
    pathname === ROUTES.home ? "intro" : "idle",
  );
  const [introDone, setIntroDone] = useState(() => pathname !== ROUTES.home);

  /** Full href handed to the router, e.g. "/blog?tag=x#top". */
  const targetHref = useRef<string | null>(null);
  /** Pathname only — what `usePathname()` will report once the route lands. */
  const targetPath = useRef<string | null>(null);
  const targetHasHash = useRef(false);
  /** Read inside the listener so it can stay registered once. */
  const phaseRef = useRef<Phase>("idle");
  /** path -> the in-flight (or settled) warm for it, so callers can await it. */
  const warmed = useRef(new Map<string, Promise<void>>());

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  /*
   * Hand the landing page its animations the moment the stairs start lifting,
   * not once they're gone — the hero is then animating in as it's uncovered,
   * rather than sitting there finished. Idempotent, and already true by the
   * time any ordinary navigation reaches `revealing`.
   */
  useEffect(() => {
    if (phase === "revealing") setIntroDone(true);
  }, [phase]);

  /** The loading screen is finished; sweep the stairs across and drop it. */
  const finishIntro = useCallback(() => setPhase("covering"), []);

  /**
   * Pull a route's payload into cache so the swap behind the black has nothing
   * left to wait for.
   *
   * `router.prefetch` is a no-op in development — Next bails out of it in
   * `createPrefetchURL` to keep compile times down — which leaves the dev swap
   * to compile the route from scratch, and a cold page here takes seconds. So
   * in dev we request the route ourselves and throw the reply away: we don't
   * want the bytes, we want the server to have compiled the page before the
   * stairs ever start.
   *
   * Repeat calls get the same promise back rather than a second request, which
   * is what lets a click await a warm the idle sweep already has in flight.
   */
  const warm = useCallback(
    (path: string): Promise<void> => {
      if (path === window.location.pathname) return Promise.resolve();

      const inFlight = warmed.current.get(path);
      if (inFlight) return inFlight;

      const job = (async () => {
        if (!DEV) {
          // Fire-and-forget: prefetch reports nothing back, but it lands long
          // before any click and `push` then reads it straight from cache.
          router.prefetch(path);
          return;
        }
        try {
          const response = await fetch(path, { credentials: "same-origin" });
          await response.body?.cancel();
        } catch {
          // Best-effort: a miss only costs a slower swap, so let the next
          // attempt re-warm it rather than caching the failure.
          warmed.current.delete(path);
        }
      })();

      warmed.current.set(path, job);
      return job;
    },
    [router],
  );

  /* Every page is static and small, so pull them all in once the page is idle
     rather than waiting for a hover that may never come (touch, keyboard). */
  useEffect(() => {
    let cancelled = false;

    const warmAll = async () => {
      for (const path of Object.values(ROUTES)) {
        if (cancelled) return;
        // Sequential: in dev each of these compiles a route, and firing all
        // twelve at once starves the same server we're about to navigate
        // against. In production `prefetch` returns immediately and the loop
        // costs nothing.
        await warm(path);
      }
    };

    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const handle = idle(() => void warmAll(), { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(handle);
      };
    }
    const handle = window.setTimeout(() => void warmAll(), 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [warm]);

  /* Intercept internal link clicks and route them through the animation. */
  useEffect(() => {
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

      targetHref.current = href;
      targetPath.current = url.pathname;
      targetHasHash.current = Boolean(url.hash);
      setPhase("loading");
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router, reduceMotion]);

  /* Hold the click until its route is in hand, so the stairs run start to
     finish without parking on black half way through. Normally the idle sweep
     gets there first and this resolves in a single tick. */
  useEffect(() => {
    if (phase !== "loading") return;

    const path = targetPath.current;
    if (path === null) {
      setPhase("covering");
      return;
    }

    let settled = false;
    const start = () => {
      if (settled) return;
      settled = true;
      setPhase("covering");
    };

    void warm(path).then(start);
    const cap = window.setTimeout(start, READY_CAP_MS);
    return () => {
      settled = true;
      window.clearTimeout(cap);
    };
  }, [phase, warm]);

  /* Screen is black: lift the stairs the moment the new route is on screen. */
  useEffect(() => {
    if (phase !== "covered") return;

    if (targetPath.current !== null && pathname !== targetPath.current) {
      // Still in flight. Revealing now would lift the stairs back onto the page
      // the user just left, so hold the black and wait. If it never lands, fall
      // back to a full page load — slow and ugly, but it puts the user on the
      // page they asked for, which pretending the navigation happened does not.
      const bail = window.setTimeout(() => {
        if (targetHref.current) window.location.href = targetHref.current;
      }, NAV_BAIL_MS);
      return () => window.clearTimeout(bail);
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

  // No stairs and no loading screen — just the page, animating normally.
  if (reduceMotion) {
    return (
      <IntroReadyContext.Provider value={true}>
        {children}
      </IntroReadyContext.Provider>
    );
  }

  return (
    <IntroReadyContext.Provider value={introDone}>
      {children}
      {/*
        Held through `covering` as well, not just `intro`. Dropping it the
        moment the bar hits 100% would reveal the landing page, and only then
        sweep the stairs over it and lift them off it again — the page arriving
        twice, once by accident. It stays until `covered` hides it, so the
        stairs are what takes it away.
      */}
      {!introDone && (phase === "intro" || phase === "covering") && (
        <IntroLoader onDone={finishIntro} />
      )}
      <motion.div
        aria-hidden
        variants={stairContainer}
        initial="resting"
        animate={stairPhase(phase)}
        className="fixed inset-0 z-9999 overflow-hidden"
        // Opaque columns should also swallow clicks aimed at the covered page.
        // Nothing is covered until the stairs are actually on screen, so stay
        // out of the way before that — the loading screen does its own blocking.
        style={{ pointerEvents: RESTING.has(phase) ? "none" : "auto" }}
      >
        <StairColumns
          count={stairCount}
          onColumnComplete={onColumnComplete}
          // `loading` counts: promoting the layers during the wait means the
          // drop that follows never pays for it.
          active={phase !== "idle" && phase !== "intro"}
        />
      </motion.div>
    </IntroReadyContext.Provider>
  );
}
